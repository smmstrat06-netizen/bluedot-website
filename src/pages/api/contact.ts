/**
 * Contact form relay. The browser posts here; this route checks the enquiry and
 * forwards it to the Make webhook in FORM_WEBHOOK_URL, which never leaves the server.
 */
import type { APIRoute } from "astro";
import { FORM_WEBHOOK_URL } from "astro:env/server";
import { EMAIL, isPhone } from "../../lib/contact";

export const prerender = false;

// Per visitor: at most 5 enquiries every 15 minutes. Counted per server instance, so it
// stops a script hammering the form rather than guaranteeing an exact global limit.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = times.length >= MAX_PER_WINDOW;
  if (!limited) times.push(now);
  recent.set(ip, times);

  if (recent.size > 5000) {
    for (const [key, list] of recent) if (now - list[list.length - 1] >= WINDOW_MS) recent.delete(key);
  }
  return limited;
}

const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // JSON only: another website can't make a visitor's browser send JSON here, since this route never answers CORS preflights
  if (!request.headers.get("content-type")?.includes("application/json")) return reply(415, { error: "unsupported" });

  const raw = await request.text();
  if (raw.length > 10_000) return reply(413, { error: "too_large" });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
  } catch {
    return reply(400, { error: "invalid" });
  }

  // Honeypot filled in: pretend it worked, forward nothing
  if (clean(body.website, 200)) return reply(200, { ok: true });

  const enquiry = {
    name: clean(body.name, 120),
    company: clean(body.company, 120),
    city: clean(body.city, 120),
    email: clean(body.email, 254),
    phone: clean(body.phone, 40),
    interest: Array.isArray(body.interest)
      ? body.interest.filter((v): v is string => typeof v === "string" && v.length <= 40).slice(0, 6)
      : [],
    message: clean(body.message, 5000),
    page: clean(body.page, 200),
    lang: body.lang === "fr" ? "fr" : "en",
    submittedAt: new Date().toISOString(),
  };

  if (!enquiry.name || !enquiry.company || !enquiry.city || !EMAIL.test(enquiry.email) || !isPhone(enquiry.phone)) {
    return reply(422, { error: "invalid" });
  }

  if (isRateLimited(clientAddress)) return reply(429, { error: "rate_limited" });

  if (!FORM_WEBHOOK_URL) {
    if (import.meta.env.DEV) {
      console.info("[BlueDot] FORM_WEBHOOK_URL is not set — enquiry not forwarded:", enquiry);
      return reply(200, { ok: true });
    }
    console.error("[BlueDot] FORM_WEBHOOK_URL is not set — enquiry could not be delivered.");
    return reply(503, { error: "not_configured" });
  }

  try {
    const response = await fetch(FORM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("[BlueDot] Could not forward enquiry:", error);
    return reply(502, { error: "delivery_failed" });
  }

  return reply(200, { ok: true });
};

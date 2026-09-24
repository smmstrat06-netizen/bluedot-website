/**
 * Contact form: prefill from ?interest=, inline validation, JSON submit.
 * Posts to the site's own /api/contact/ route, which forwards the enquiry to
 * the Make webhook server-side (see src/pages/api/contact.ts).
 */
import { EMAIL, isPhone } from "../lib/contact";

type Field = HTMLInputElement | HTMLTextAreaElement;

const ENDPOINT = "/api/contact/";

// Messages follow the page language (<html lang="fr-MA"> or "en")
const lang = document.documentElement.lang.startsWith("fr") ? "fr" : "en";

const text = {
  en: {
    name: "Please enter your full name.",
    company: "Please enter your company name.",
    city: "Please enter your city.",
    phone: "Please enter your phone number.",
    phoneInvalid: "Please enter a valid phone number, like 06 12 34 56 78 or +212 6 12 34 56 78.",
    email: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address, like name@company.com.",
    sending: "Sending…",
    send: "Send message",
    failed: "Sorry — your message couldn’t be sent. Please try again in a moment.",
    failedEmail: (email: string) => `Sorry — your message couldn’t be sent. Please try again, or email us at ${email}.`,
    tooMany: "You’ve sent several messages in a short time. Please try again in a few minutes.",
  },
  fr: {
    name: "Veuillez indiquer votre nom complet.",
    company: "Veuillez indiquer le nom de votre société.",
    city: "Veuillez indiquer votre ville.",
    phone: "Veuillez indiquer votre numéro de téléphone.",
    phoneInvalid: "Veuillez indiquer un numéro valide, par exemple 06 12 34 56 78 ou +212 6 12 34 56 78.",
    email: "Veuillez indiquer votre adresse e-mail.",
    emailInvalid: "Veuillez indiquer une adresse e-mail valide, par exemple nom@societe.ma.",
    sending: "Envoi en cours…",
    send: "Envoyer le message",
    failed: "Désolé, votre message n’a pas pu être envoyé. Veuillez réessayer dans un instant.",
    failedEmail: (email: string) =>
      `Désolé, votre message n’a pas pu être envoyé. Veuillez réessayer, ou écrivez-nous à ${email}.`,
    tooMany: "Vous avez envoyé plusieurs messages en peu de temps. Veuillez réessayer dans quelques minutes.",
  },
}[lang];

// Required fields only; the message is optional
const rules: Record<string, (value: string) => string> = {
  name: (v) => (v.trim() ? "" : text.name),
  company: (v) => (v.trim() ? "" : text.company),
  city: (v) => (v.trim() ? "" : text.city),
  phone: (v) => (!v.trim() ? text.phone : isPhone(v) ? "" : text.phoneInvalid),
  email: (v) => (!v.trim() ? text.email : EMAIL.test(v.trim()) ? "" : text.emailInvalid),
};

document.querySelectorAll<HTMLFormElement>("[data-contact-form]").forEach(initForm);

function initForm(form: HTMLFormElement) {
  const email = form.dataset.email ?? "";
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = form.querySelector<HTMLElement>("[data-submit-label]");
  const success = form.parentElement?.querySelector<HTMLElement>("[data-form-success]");

  prefillInterest(form);

  const fieldFor = (name: string) => form.elements.namedItem(name) as Field | null;

  const validate = (field: Field) => {
    const message = rules[field.name]?.(field.value) ?? "";
    const error = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
    if (error) error.textContent = message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    return !message;
  };

  for (const name of Object.keys(rules)) {
    const field = fieldFor(name);
    if (!field) continue;
    // Validate on blur once there's something to check; re-check live after an error
    field.addEventListener("blur", () => {
      if (field.value.trim() || field.hasAttribute("aria-invalid")) validate(field);
    });
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validate(field);
    });
  }

  const setLoading = (loading: boolean) => {
    if (!submit || !submitLabel) return;
    submit.disabled = loading;
    submit.setAttribute("aria-busy", String(loading));
    submitLabel.textContent = loading ? text.sending : text.send;
  };

  const showSuccess = (name: string) => {
    if (!success) return;
    const nameSlot = success.querySelector<HTMLElement>("[data-success-name]");
    if (nameSlot) nameSlot.textContent = name ? `, ${name.split(" ")[0]}` : "";
    form.hidden = true;
    success.hidden = false;
    success.focus();
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (status) status.textContent = "";

    const fields = Object.keys(rules)
      .map(fieldFor)
      .filter((f): f is Field => Boolean(f));
    const invalid = fields.filter((f) => !validate(f));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();

    // Honeypot filled in: pretend it worked, send nothing
    if (String(data.get("website") ?? "")) {
      showSuccess(name);
      return;
    }

    const payload = {
      name,
      company: String(data.get("company") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      interest: data.getAll("interest").map(String),
      message: String(data.get("message") ?? "").trim(),
      page: window.location.pathname,
      lang,
    };

    setLoading(true);
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 429) {
        if (status) status.textContent = text.tooMany;
        return;
      }
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      showSuccess(name);
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent = email ? text.failedEmail(email) : text.failed;
      }
    } finally {
      setLoading(false);
    }
  });
}

function prefillInterest(form: HTMLFormElement) {
  const interest = new URLSearchParams(window.location.search).get("interest");
  if (!interest) return;
  const values = interest === "all" ? ["consulting", "agency", "media"] : [interest];
  for (const value of values) {
    const box = form.querySelector<HTMLInputElement>(`input[name="interest"][value="${CSS.escape(value)}"]`);
    if (box) box.checked = true;
  }
}

/**
 * Contact form: prefill from ?interest=, inline validation, JSON submit.
 * The endpoint comes from PUBLIC_FORM_ENDPOINT. Without one, submissions are
 * simulated in development and fail visibly (with an email fallback) in production.
 */

type Field = HTMLInputElement | HTMLTextAreaElement;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Moroccan numbers (05/06/07…, +212…) or any international number written with + or 00
const isPhone = (value: string) => {
  const v = value.replace(/[\s.\-()]/g, "");
  if (/^0[5-7]\d{8}$/.test(v)) return true;
  if (/^(\+|00)212/.test(v)) return /^(\+|00)212[5-7]\d{8}$/.test(v);
  return /^(\+|00)[1-9]\d{7,14}$/.test(v);
};

// Required fields only; the message is optional
const rules: Record<string, (value: string) => string> = {
  name: (v) => (v.trim() ? "" : "Please enter your full name."),
  company: (v) => (v.trim() ? "" : "Please enter your company name."),
  city: (v) => (v.trim() ? "" : "Please enter your city."),
  phone: (v) =>
    !v.trim()
      ? "Please enter your phone number."
      : isPhone(v)
        ? ""
        : "Please enter a valid phone number, like 06 12 34 56 78 or +212 6 12 34 56 78.",
  email: (v) =>
    !v.trim()
      ? "Please enter your email address."
      : EMAIL.test(v.trim())
        ? ""
        : "Please enter a valid email address, like name@company.com.",
};

document.querySelectorAll<HTMLFormElement>("[data-contact-form]").forEach(initForm);

function initForm(form: HTMLFormElement) {
  const endpoint = form.dataset.endpoint ?? "";
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
    submitLabel.textContent = loading ? "Sending…" : "Send message";
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
    };

    setLoading(true);
    try {
      if (!endpoint) {
        if (import.meta.env.DEV) {
          await new Promise((resolve) => setTimeout(resolve, 900));
          console.info("[BlueDot] PUBLIC_FORM_ENDPOINT is not set — simulated submission:", payload);
          showSuccess(name);
          return;
        }
        throw new Error("Form endpoint not configured");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      showSuccess(name);
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent = email
          ? `Sorry — your message couldn’t be sent. Please try again, or email us at ${email}.`
          : "Sorry — your message couldn’t be sent. Please try again in a moment.";
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

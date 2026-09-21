/**
 * Global site settings. Values marked TODO are unknown and must be
 * supplied by BlueDot before launch — see README → "Content gaps".
 */
export const site = {
  name: "BlueDot",
  tagline: "Think. Create. Amplify.",
  description:
    "BlueDot brings marketing strategy, creative execution and media performance together under one roof — consulting, agency and media built around business impact.",
  locale: "en_US",
  // TODO: public contact email (also settable via PUBLIC_CONTACT_EMAIL)
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
  // TODO: JSON endpoint for the contact form (Formspree, Basin, own API…)
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? "",
  // TODO: add profile URLs; empty entries are not rendered
  social: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
  ],
} as const;

export const nav = [
  { label: "Consulting", href: "/consulting/", accent: "var(--think)" },
  { label: "Agency", href: "/agency/", accent: "var(--create)" },
  { label: "Media", href: "/media/", accent: "var(--amplify)" },
] as const;

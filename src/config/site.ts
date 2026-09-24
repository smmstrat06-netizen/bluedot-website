/**
 * Global site settings. Values marked TODO are unknown and must be
 * supplied by BlueDot before launch — see README → "Content gaps".
 */
export const site = {
  name: "BlueDot",
  tagline: "Think. Create. Amplify.",
  // Google Tag Manager container (public ID). Also lets Search Console verify the site.
  gtmId: "GTM-PP47N3SF",
  // TODO: public contact email (also settable via PUBLIC_CONTACT_EMAIL)
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
  // Office address: shown in the contact section and footer, and used in structured data
  address: {
    street: "3È Étage, Résidence Harmony, Rue de Larache",
    city: "Casablanca",
    postalCode: "20250",
    country: "MA",
    countryName: "Morocco",
  },
  // Empty entries are not rendered
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/bluedot-mktg" },
    { label: "Instagram", href: "" },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city} ${site.address.postalCode}, ${site.address.countryName}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
export const linkedin = site.social.find((s) => s.label === "LinkedIn")?.href ?? "";

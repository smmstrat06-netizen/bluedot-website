import { site } from "../config/site";
import { href, htmlLang, type Lang } from "../i18n";

const context = "https://schema.org";

export const organizationId = (base: URL) => new URL("/#organization", base).href;

const descriptions: Record<Lang, string> = {
  fr: "Agence de communication et de marketing digital à Casablanca : stratégie marketing, branding, contenus, sites web, événementiel et publicité digitale, réunis sous un même toit.",
  en: "Marketing and communication agency in Casablanca: marketing strategy, branding, content, websites, events and digital advertising under one roof.",
};

/** BlueDot as a local business, without @context so it can be nested */
function organization(base: URL, lang: Lang) {
  const sameAs = site.social.map((s) => s.href).filter(Boolean);
  return {
    "@type": "ProfessionalService",
    "@id": organizationId(base),
    name: site.name,
    url: new URL(href("home", lang), base).href,
    logo: new URL("/apple-touch-icon.png", base).href,
    image: new URL("/og/home.png", base).href,
    slogan: site.tagline,
    description: descriptions[lang],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Country", name: lang === "fr" ? "Maroc" : "Morocco" },
    knowsLanguage: ["fr", "en"],
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema(base: URL, lang: Lang) {
  return { "@context": context, ...organization(base, lang) };
}

export function websiteSchema(base: URL, lang: Lang) {
  return {
    "@context": context,
    "@type": "WebSite",
    name: site.name,
    url: new URL(href("home", lang), base).href,
    inLanguage: htmlLang[lang],
    publisher: { "@id": organizationId(base) },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

interface ServicePage {
  /** Service name, e.g. "Création de site web à Casablanca" */
  name: string;
  description: string;
  path: string;
  serviceType: string[];
  /** Breadcrumb trail after the home page */
  trail: { name: string; path: string }[];
}

export function serviceSchema(page: ServicePage, base: URL, lang: Lang) {
  const url = new URL(page.path, base).href;
  const home = { name: lang === "fr" ? "Accueil" : "Home", path: href("home", lang) };
  return [
    {
      "@context": context,
      "@type": "Service",
      name: page.name,
      description: page.description,
      url,
      serviceType: page.serviceType,
      areaServed: { "@type": "Country", name: lang === "fr" ? "Maroc" : "Morocco" },
      provider: organization(base, lang),
    },
    {
      "@context": context,
      "@type": "BreadcrumbList",
      itemListElement: [home, ...page.trail].map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: new URL(item.path, base).href,
      })),
    },
  ];
}

import { site } from "../config/site";
import type { Division } from "../data/divisions";

const context = "https://schema.org";

export const organizationId = (base: URL) => new URL("/#organization", base).href;

export function organizationSchema(base: URL) {
  const sameAs = site.social.map((s) => s.href).filter(Boolean);
  return {
    "@context": context,
    "@type": "Organization",
    "@id": organizationId(base),
    name: site.name,
    url: base.href,
    logo: new URL("/apple-touch-icon.png", base).href,
    slogan: site.tagline,
    description: site.description,
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(base: URL) {
  return {
    "@context": context,
    "@type": "WebSite",
    name: site.name,
    url: base.href,
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

export function divisionSchema(division: Division, base: URL) {
  const url = new URL(division.href, base).href;
  return [
    {
      "@context": context,
      "@type": "Service",
      name: `${site.name} ${division.name}`,
      description: division.seo.description,
      url,
      serviceType: division.capabilities,
      provider: organizationSchema(base),
    },
    {
      "@context": context,
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: base.href },
        { "@type": "ListItem", position: 2, name: division.name, item: url },
      ],
    },
  ];
}

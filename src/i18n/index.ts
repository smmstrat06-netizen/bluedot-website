/**
 * Bilingual routing. French is the default language at the site root,
 * English lives under /en/. Every page has an entry in `routes` so the
 * language toggle, hreflang tags and sitemap can pair equivalent pages.
 */

export const langs = ["fr", "en"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = "fr";

/** Values for <html lang>, hreflang and Open Graph */
export const htmlLang: Record<Lang, string> = { fr: "fr-MA", en: "en" };
export const ogLocale: Record<Lang, string> = { fr: "fr_MA", en: "en_US" };
export const langLabel: Record<Lang, string> = { fr: "Français", en: "English" };

export const routes = {
  home: { fr: "/", en: "/en/" },
  consulting: { fr: "/consulting/", en: "/en/consulting/" },
  agency: { fr: "/agency/", en: "/en/agency/" },
  media: { fr: "/media/", en: "/en/media/" },
  website: { fr: "/creation-site-web/", en: "/en/website-design/" },
  events: { fr: "/evenementiel/", en: "/en/events/" },
  contact: { fr: "/contact/", en: "/en/contact/" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

const withSlash = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function getLang(url: URL): Lang {
  const p = url.pathname;
  return p === "/en" || p.startsWith("/en/") ? "en" : "fr";
}

/** Localized path for a page, with an optional #hash or ?query suffix */
export function href(key: RouteKey, lang: Lang, suffix = ""): string {
  return routes[key][lang] + suffix;
}

/** Which route the current URL belongs to (undefined on 404) */
export function routeKeyFor(url: URL): RouteKey | undefined {
  const p = withSlash(url.pathname);
  return (Object.keys(routes) as RouteKey[]).find((k) => routes[k].fr === p || routes[k].en === p);
}

/** Equivalent page in each language, for the toggle and hreflang */
export function alternates(url: URL): Record<Lang, string> | undefined {
  const key = routeKeyFor(url);
  return key ? { fr: routes[key].fr, en: routes[key].en } : undefined;
}

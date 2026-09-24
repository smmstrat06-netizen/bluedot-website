// @ts-check
import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";
import { routes } from "./src/i18n/index.ts";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

// Production domain; SITE_URL (in .env or the hosting dashboard) overrides it.
const site = env.SITE_URL || "https://bluedot-mktg.com";

/** hreflang links for the sitemap: each page lists its French and English versions */
function withAlternates(item) {
  const path = new URL(item.url).pathname;
  const pair = Object.values(routes).find((r) => r.fr === path || r.en === path);
  if (!pair) return item;
  const abs = (p) => new URL(p, site).href;
  item.links = [
    { lang: "fr-MA", url: abs(pair.fr) },
    { lang: "en", url: abs(pair.en) },
    { lang: "x-default", url: abs(pair.fr) },
  ];
  return item;
}

export default defineConfig({
  site,
  trailingSlash: "always",
  // Pages stay static; only the contact form relay (src/pages/api/contact.ts) runs as a Vercel function
  adapter: vercel(),
  env: {
    schema: {
      // Make webhook that receives contact enquiries. Server-only: read at runtime, never sent to the browser.
      FORM_WEBHOOK_URL: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [sitemap({ filter: (page) => !page.includes("/404"), serialize: withAlternates })],
});

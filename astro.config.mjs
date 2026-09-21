// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

// TODO: set SITE_URL (in .env or the hosting dashboard) to BlueDot's production domain.
const site = env.SITE_URL || "https://www.bluedot.example";

export default defineConfig({
  site,
  trailingSlash: "always",
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});

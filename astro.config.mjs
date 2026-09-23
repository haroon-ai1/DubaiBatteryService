import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output — the whole site builds to plain HTML/CSS/JS in ./dist
// and is served by Cloudflare Workers Static Assets. No SSR adapter needed.
export default defineConfig({
  site: "https://dubaibatteryservice.com",
  output: "static",
  trailingSlash: "always", // matches the /service-name-dubai/ URL style in the brief
  integrations: [
    sitemap({
      // 404 is noindex; keep it out of the sitemap entirely.
      filter: (page) => !page.includes("/404"),
      // lastmod helps a low-authority new domain get recrawled after a
      // content change instead of waiting on Google's own schedule.
      serialize: (item) => ({
        ...item,
        lastmod: new Date().toISOString(),
        changefreq: item.url.endsWith(".com/") ? "weekly" : "monthly",
        priority: item.url.endsWith(".com/") ? 1.0 : 0.8,
      }),
    }),
  ],
  build: {
    format: "directory",
  },
});

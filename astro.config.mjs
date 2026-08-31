import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output — the whole site builds to plain HTML/CSS/JS in ./dist
// and is served by Cloudflare Workers Static Assets. No SSR adapter needed.
export default defineConfig({
  site: "https://dubaibatteryservice.com",
  output: "static",
  trailingSlash: "always", // matches the /service-name-dubai/ URL style in the brief
  integrations: [sitemap()],
  build: {
    format: "directory",
  },
});

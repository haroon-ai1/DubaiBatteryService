#!/usr/bin/env node
/**
 * Post-build validator. Runs against ./dist as part of `npm run build`,
 * and exits non-zero on failure so a broken build cannot be deployed.
 *
 * It exists because three defects shipped silently and none of them were
 * catchable by `astro check`:
 *
 *   1. Header/footer used bare fragments (#services, #faq, #areas…) that
 *      only resolve on the homepage. Six dead links on every one of the
 *      seven service pages, plus seven on the 404.
 *   2. The homepage linked to zero service pages, leaving
 *      /battery-delivery-dubai/ and /car-battery-prices-dubai/ with no
 *      inbound internal links from anywhere on the site.
 *   3. Nothing verified that a page emitting FAQPage schema emits exactly
 *      one, or that internal hrefs point at pages that were built.
 *
 * Zero dependencies — regex over the built HTML is enough here and keeps
 * the deploy path dependency-free.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = "dist";

/* ------------------------------------------------------------------ */
/* Collect built pages                                                 */
/* ------------------------------------------------------------------ */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** dist/foo/index.html -> /foo/ ; dist/index.html -> / ; dist/404.html -> /404.html */
function toRoute(file) {
  const rel = relative(DIST, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  return "/" + rel;
}

const files = walk(DIST);
if (files.length === 0) {
  console.error("check-links: no HTML found in ./dist — did the build run?");
  process.exit(1);
}

const routes = new Set(files.map(toRoute));
/** Pages that are indexable and therefore need inbound internal links. */
const indexable = new Set();
/** route -> Set of routes that link to it. Unique referrers, not raw hits. */
const inbound = new Map();
for (const r of routes) inbound.set(r, new Set());

/** Titles/descriptions are HTML-escaped in the output; measure the real text. */
function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&#8212;/g, "—");
}

const errors = [];
const warnings = [];

/* ------------------------------------------------------------------ */
/* Per-page checks                                                     */
/* ------------------------------------------------------------------ */

for (const file of files) {
  const route = toRoute(file);
  const html = readFileSync(file, "utf8");

  if (!/<meta name="robots" content="[^"]*noindex/i.test(html)) {
    indexable.add(route);
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of hrefs) {
    // 1. Same-page fragment must resolve on THIS page.
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (id && !ids.has(id)) {
        errors.push(`${route} — dead fragment "${href}" (no matching id on this page)`);
      }
      continue;
    }

    if (!href.startsWith("/")) continue; // external, tel:, mailto:, wa.me

    // 2. Internal link (with optional fragment) must point at a built page.
    const [path, frag] = href.split("#");
    const target = path === "" ? "/" : path;

    // Build assets and static files are not pages.
    if (
      target.startsWith("/_astro/") ||
      target.startsWith("/fonts/") ||
      /\.(css|js|map|png|jpe?g|svg|webp|avif|woff2?|xml|txt|webmanifest|ico|json)$/i.test(target)
    ) {
      continue;
    }

    if (!routes.has(target)) {
      errors.push(`${route} — internal link "${href}" targets a page that was not built`);
      continue;
    }

    if (target !== route) inbound.get(target).add(route);

    // 3. Cross-page fragment must resolve on the TARGET page.
    if (frag) {
      const targetFile = target === "/" ? join(DIST, "index.html") : join(DIST, target, "index.html");
      try {
        const targetHtml = readFileSync(targetFile, "utf8");
        if (!new RegExp(`\\sid="${frag}"`).test(targetHtml)) {
          errors.push(`${route} — "${href}" points at #${frag}, which does not exist on ${target}`);
        }
      } catch {
        /* already reported as an unbuilt target above */
      }
    }
  }

  // 4. Exactly one FAQPage block per URL — two is invalid structured data.
  const faqBlocks = (html.match(/"@type":"FAQPage"/g) || []).length;
  if (faqBlocks > 1) {
    errors.push(`${route} — ${faqBlocks} FAQPage blocks; a URL may have at most one`);
  }

  // 5. One <h1>.
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${route} — ${h1s} <h1> elements (expected exactly 1)`);

  // 6. Title / description length.
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="(.*?)">/s)?.[1] ?? "");
  if (title.length > 60) warnings.push(`${route} — title ${title.length} chars (>60, will truncate)`);
  if (desc.length > 155) warnings.push(`${route} — description ${desc.length} chars (>155, will truncate)`);
  if (!desc) errors.push(`${route} — missing meta description`);

  // 7. Canonical present.
  if (!/<link rel="canonical"/.test(html)) errors.push(`${route} — missing canonical`);
}

/* ------------------------------------------------------------------ */
/* Orphan check                                                        */
/* ------------------------------------------------------------------ */

for (const route of indexable) {
  if (route === "/") continue;
  if (inbound.get(route).size === 0) {
    errors.push(`${route} — ORPHAN: zero inbound internal links from any built page`);
  }
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

const pad = (n) => String(n).padStart(3);
console.log(`\ncheck-links: ${files.length} pages\n`);

const sorted = [...inbound.entries()].sort((a, b) => b[1].size - a[1].size);
for (const [route, refs] of sorted) {
  const tag = indexable.has(route) ? "" : "  (noindex)";
  console.log(`  ${pad(refs.size)} linking pages   ${route}${tag}`);
}

if (warnings.length) {
  console.log("\n  warnings:");
  for (const w of warnings) console.log(`    ! ${w}`);
}

if (errors.length) {
  console.error(`\n  ${errors.length} error(s):`);
  for (const e of errors) console.error(`    ✗ ${e}`);
  console.error("");
  process.exit(1);
}

console.log("\n  ✓ no dead fragments, no broken internal links, no orphans\n");

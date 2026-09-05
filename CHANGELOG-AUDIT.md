# Audit fixes applied

Every change below is verified against the built `./dist`, not just the
source. `npm run build` now fails if the structural ones regress.

## P0 — were blocking ranking and conversion

**1. Homepage linked to zero service pages; two pages fully orphaned.**
`ServicesIntro` fell back to `#get-help` for any service without a homepage
anchor, so `/battery-delivery-dubai/` and `/car-battery-prices-dubai/` had no
inbound internal links from anywhere on the site.
→ Added `path` to `ServiceMeta` and a derived `LINKED_SERVICES` list. The
homepage strip, footer and 404 all read from it, so a new service page cannot
be forgotten. Every indexable page now has **8 linking pages**.

**2. `/car-battery-prices-dubai/` contained no prices.**
Title and meta targeted "car battery prices"; H1, breadcrumb and body were a
generic service overview with zero AED/cost mentions.
→ Rewritten. H1, breadcrumb, eyebrow and schema aligned. Added an AED band
table (5 rows by chemistry/capacity), cost drivers, a five-question
quote-comparison section, and a cost-per-year section. 1,358 → 1,913 words.
Bands live in `siteConfig.pricing` with `showBands`, `lastReviewed` and a
verify-before-launch warning. Labelled on-page as indicative ranges, never
quotes. Also added a distinct `battery_prices` ServiceId so the generic
`battery_service` umbrella id stays generic.

**3. Header/footer nav was dead on every page but the homepage.**
Bare fragments (`#services`, `#faq`, `#areas`, `#replacement`,
`#battery-technology`) that only resolved on `/`. 6 dead links × 7 service
pages, 7 on the 404.
→ New `src/config/navigation.ts`. Nav is real routes; fragments are
root-relative (`/#faq`). `aria-current="page"` on the active item. Footer
split into Services (all 7 pages) + Guides columns.

**4. WhatsApp button failed contrast at 1.98:1.**
White on `#25d366`, on the primary conversion button.
→ `--whatsapp-ink` on the same brand green: **8.34:1**.

## P1

**5. Hero downloaded two images, both `fetchpriority="high"`.**
Two `<Picture>` elements art-directed by `display: none`; the preload scanner
ignores that, so mobile fetched ~63 KB instead of ~29 KB with two competing
LCP candidates.
→ One hand-rolled `<picture>` with `media` (Astro's `<Picture>` can't emit
it). `src/lib/heroImages.ts` resolves variants once so `index.astro` emits
matching `<link rel="preload" as="image">` per breakpoint. Verified: 1
picture, 1 `fetchpriority=high`, 2 media-scoped preloads.

**6. GA4 loaded in `<head>` ahead of the LCP image.**
→ `gtag()` defined immediately so nothing is dropped; the script loads on
`load` or first `pointerdown`/`keydown`/`touchstart`. Added `preconnect`.

**7. `--text-muted` failed AA at 2.97:1** — including the partner-routing
disclosure. → `#6e727a`, 4.83:1 on white / 4.58:1 on `--bg-soft`.
**`--red-bright` hover** 3.86:1 → `#d81733`, 5.13:1. A *brighter* red can't
reach 4.5:1 with white text, so the hover now darkens.

**8. The loudest CTA only scrolled.** The red "Get Battery Help" button led
to `#get-help` at the bottom of a ten-section page while WhatsApp sat quiet
beside it. → Hero now leads with filled WhatsApp + Call; the scroll-CTA is
the no-channel fallback. Hero previously had no Call button at all.

**9. Six of eight meta descriptions ran 183–216 chars** and were truncated
mid-CTA. → All ≤155. Over-length emergency title fixed. Homepage retitled
keyword-first. Dev-mode warnings added in `SeoHead`.

**10. Structured data was thin** (only `WebSite` + `BreadcrumbList`).
→ Added `Service` on all 7 service pages (`provider` gated behind
`entityVerified`) and `FAQPage` on all 8 content pages. New `FaqBlock`
component renders the visible `<details>` list *and* the JSON-LD from one
array, so schema can't drift from content. Verified parity 5=5 and 7=7.

**11. `<br>` in headings joined words.** The H1 extracted as "Car Battery
Servicein Dubai." → Fixed across 11 headings. Now extracts cleanly.

## P2

- `public/_headers` — CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy,
  frame-ancestors, plus immutable caching for `/_astro/*` and `/fonts/*`.
- `html_handling: "force-trailing-slash"` pinned to match `astro.config.mjs`.
- `lang="en-AE"` (was `en` while `og:locale` said `en_AE`).
- `og:image:width/height/alt` + `twitter:image:alt`.
- Sitemap `lastmod` / `changefreq` / `priority`; 404 excluded.
- **404 page**: was a dead `#get-help` button and a `/#services` link, and the
  sticky bar never appeared (its observer had no `#hero`). Now has live
  WhatsApp/Call, a full service list, a working help button via a new
  `helpHref` prop, and the sticky bar shows.
- Dead code removed: `ServicesIndex.astro`, `replacement-{desktop,mobile}.jpg`,
  `gen-placeholders.mjs`, the overridden `.safe-bottom` utility.
- Source images PNG → JPEG: **9.2 MB → 1.8 MB** repo, **12 MB → 5.2 MB** dist.
  Build output visually identical.
- `README.md` rewritten — it claimed homepage-only, no CTAs, no GA and
  placeholder art, all false, and documented the wrong config mechanism.
- `IMAGE-BRIEF.md` rewritten — it described placeholder art, two deleted
  files, and a 4:5 hero that is actually 4:3.

## New: `scripts/check-links.mjs`

Runs in `npm run build`, exits non-zero on failure. Asserts against real
built HTML: same-page and cross-page fragments resolve, internal links point
at built pages, **no indexable page has zero inbound links**, one `<h1>` per
page, at most one `FAQPage` per URL, canonical and description present.
Warns on long titles/descriptions.

## Not done

- **`/areas/` pages.** Nine pages of new content, not a fix. `AreaId` and
  `Coverage.astro` are already structured for it.
- **`pricing.bands` need verifying** against the partner's real list before
  launch. They are indicative market ranges, labelled as such.
- **`entityVerified` stays `false`.** Correct until real business details
  exist — but it means no `LocalBusiness` schema and no local-pack signal.

## Final state

```
astro check      0 errors / 0 warnings / 0 hints
build            9 pages, check-links passes
JS bundles       0 files
CSS              3.7 KB gz (layout) + 3.2 KB gz (page)
inbound links    8 linking pages for every indexable page
orphans          0  (was 2)
dead fragments   0  (was 6 per service page + 7 on 404)
contrast         all tokens pass WCAG AA on their surfaces
dist             5.2 MB  (was 12 MB)
```

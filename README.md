# Dubai Battery Service — dubaibatteryservice.com

Static Astro site, built to plain HTML/CSS and served by Cloudflare Workers
Static Assets. Nine pages: a homepage and seven service pages, plus a 404.

**Zero JavaScript bundles ship.** The only client-side code is a handful of
small inline progressive enhancements (scroll-driven header capsule, mobile
menu via native `<dialog>`, sticky CTA visibility, GA click delegation).

## Stack

| | |
|---|---|
| Framework | Astro 7, `output: "static"`, no UI framework |
| Styling | Hand-written CSS, token system in `src/styles/tokens.css` |
| Type font | Manrope Variable, self-hosted, latin subset, 28 KB |
| Images | Astro `astro:assets` — AVIF/WebP/JPEG, 3 widths each |
| Host | Cloudflare Workers Static Assets (`wrangler.jsonc`) |
| Analytics | GA4, deferred, PII-free custom events |

## Commands

```bash
npm install
npm run dev          # local dev server
npm run build        # astro build + scripts/check-links.mjs (fails on error)
npm run build:only   # astro build, skipping the validator
npm run check        # astro check — TypeScript diagnostics
npm run check:links  # re-run the validator against an existing ./dist
npm run preview      # serve ./dist locally
npm run deploy       # build (validated) then `wrangler deploy`
```

`npm run build` will **exit non-zero** if the link validator finds a problem.
That is deliberate — see below.

---

## `scripts/check-links.mjs`

Runs after every build and asserts, against the real `./dist` HTML:

- every same-page `#fragment` resolves to an `id` on that page
- every cross-page `/path/#fragment` resolves on the *target* page
- every internal link points at a page that was actually built
- **no indexable page has zero inbound internal links** (orphan check)
- exactly one `<h1>` per page
- at most one `FAQPage` JSON-LD block per URL
- a canonical and a meta description exist
- warns on titles over 60 chars and descriptions over 155

It exists because three real defects shipped that `astro check` could not
catch: header/footer fragments that only resolved on the homepage, two
service pages with no inbound links from anywhere on the site, and schema
that could silently drift from visible content. Do not remove it from the
build script.

---

## Configuration — `src/config/site.ts`

This is the **only** place business data, trust claims, partner routing and
third-party IDs are declared. Components must never hard-code a phone
number, a review count, a claim about hours, an analytics ID or a
WhatsApp URL.

Every field that is `null` represents a fact that has not been verified.
Components that would display such a fact check for `null` and render
nothing rather than fall back to placeholder copy.

### Currently live

| Field | Value | Effect |
|---|---|---|
| `partner.whatsappNumber` | set | WhatsApp CTAs render sitewide |
| `partner.callNumber` | set | Call CTAs render sitewide |
| `analytics.gaMeasurementId` | set | GA4 loads (deferred — see below) |
| `pricing.showBands` | `true` | Price table renders on `/car-battery-prices-dubai/` |
| `operationalMode` | `"lead-partner"` | Footer shows the informational-resource line |

### Still `null` — and what each one unlocks

| Field | Unlocks |
|---|---|
| `entityVerified: true` **+** `business.businessName` | `Organization` JSON-LD, and `provider` on every `Service` block |
| the above **+** `business.address` | `LocalBusiness` / `AutomotiveBusiness` JSON-LD |
| `claims.*` (hours, response time, warranty, reviews) | Trust copy. **No display component exists yet** — build one when you have real values; do not reverse-engineer copy to fit a null |
| `analytics.googleSiteVerification` | Adds the Search Console verification meta tag |
| `callTracking.number` + `enabled` | `getCallUrl()` prefers a tracking DID so the raw partner number never appears in the DOM |
| `leadEndpoint` | Prerequisite for any lead-capture form. **None exists** — a non-functional form is worse than no form |
| `brands.*`, `socialLinks` | Nothing yet; wired for future use |

### `entityVerified` is deliberately separate from `operationalMode`

Moving out of `"asset"` mode is **not** evidence that a verified business
entity exists. `entityVerified` is its own explicit flag and gates all
entity-asserting schema. Only set it to `true` once the business details
below it have actually been confirmed.

Understand the trade-off while it is `false`: no `LocalBusiness` schema
means effectively no local-pack signal, and "car battery dubai" is a
local-pack-dominated SERP. The honest path to fixing that is real,
verifiable business details — not flipping the flag.

### ⚠️ `pricing.bands` needs verifying before launch

The bands in `siteConfig.pricing` are **indicative Dubai market ranges**,
not partner pricing. The page labels them as such and prints
`pricing.lastReviewed` so a stale table is visibly stale. Confirm them
against the partner's actual current list, then bump `lastReviewed`.
Setting `showBands: false` withholds the table entirely and leaves the
page explaining cost *drivers* only.

---

## Lead routing — `src/lib/leads.ts`

Components that need a WhatsApp or call URL go through `getWhatsAppUrl()`
and `getCallUrl()`. Never build a `wa.me` or `tel:` link inline.

Both return `null` when no usable number is configured, and the calling
component then renders nothing — `hasWhatsAppChannel()` / `hasCallChannel()`
are the render guards. `normalizeCallNumber()` also returns `null` on a
malformed value, so a bad config can never ship a dead `tel:null`.

Outgoing WhatsApp message templates live here too. They must never contain
a phone number, a registration number, an IP, a GA client ID, a name, an
email, or any other PII.

## Analytics — `src/components/tracking/Analytics.astro`

- If `gaMeasurementId` is `null`, GA4 is not loaded at all. No script, no
  cookie, no network request.
- `gtag()` is defined immediately so events fired before the GA script
  arrives queue on `dataLayer` and are replayed. The script itself loads on
  `load`, or on the first `pointerdown`/`keydown`/`touchstart`, whichever
  comes first — so it never competes with the LCP hero image on a cold
  mobile connection, and a fast tap still gets measured.
- CTA tracking is a single delegated listener on `[data-lead-event]` with a
  strict event allow-list and a PII-free parameter set.
- `transport_type: "beacon"` so the hit survives the tap that hands the tab
  to WhatsApp or the dialer.
- The handler never calls `preventDefault()`. Analytics failure must never
  block a lead.

Two events only: `click_whatsapp` and `click_call`. Parameters: `page`,
`service`, `area`, `cta_location`, `partner`.

---

## Structured data

| Schema | Where | Gate |
|---|---|---|
| `WebSite` | every page | none — describes the site, not an entity |
| `BreadcrumbList` | service pages | emitted from the same array as the visible breadcrumb |
| `Service` | service pages | `provider` only attached when `entityVerified` |
| `FAQPage` | homepage + every service page | emitted from the same array `<FaqBlock>` renders |
| `Organization` | — | `entityVerified` + `businessName` |
| `LocalBusiness` | — | `entityVerified` + `businessName` + `address` |

The rule throughout: **schema is generated from the same data the page
displays.** `FaqBlock` renders the `<details>` list and the JSON-LD from one
array; the breadcrumb does the same. Never hand-maintain a second copy of
content inside a `<script>` tag.

At most one `FAQPage` per URL. The validator enforces it.

---

## Navigation — `src/config/navigation.ts`

**Rule: every href in a global component (header, footer, 404) must be
either a real route or a root-relative fragment (`/#faq`, never `#faq`).**

A bare fragment only resolves on the page that owns that `id`. The nav
previously used `#services`, `#replacement`, `#areas`, `#faq` and
`#battery-technology` — all homepage-only — so six links were dead on every
service page and seven on the 404.

The footer lists **every** service page, which is what guarantees no service
page can be orphaned: the footer is sitewide, so each service page always
has at least eight inbound internal links.

`LINKED_SERVICES` in `src/lib/services.ts` is the single source of the
service list. Adding a service page means adding it there; the homepage
strip, footer and 404 pick it up automatically.

---

## Imagery

Real photography, in `src/assets/images/` (never `public/` — assets there
skip Astro's optimisation pipeline). Sources are JPEG; the build emits AVIF,
WebP and JPEG at three widths each.

`src/config/serviceImages.ts` maps each `ServiceId` to three optional slots
(`hero` / `editorial` / `detail`). A `null` slot renders nothing at all — no
placeholder box, no broken `<img>`. Alt text lives with the image config, so
it travels when the image is replaced.

To activate a slot: drop the file into `src/assets/images/services/`, import
it in `serviceImages.ts`, and swap `null` for `{ src, alt }`. A broken path
fails the build rather than shipping a broken image.

### The hero is deliberately hand-rolled

`src/components/sections/Hero.astro` uses a raw `<picture>` with `media`
attributes rather than Astro's `<Picture>` component, because `<Picture>`
cannot emit `media` on its sources.

This matters. The hero previously rendered two `<Picture>` components
art-directed by CSS `display: none`. The preload scanner runs before CSS is
applied, so every mobile visitor downloaded the desktop set too, and both
were marked `fetchpriority="high"` — two competing candidates for the LCP
slot. `src/lib/heroImages.ts` resolves the variants once so `index.astro`
can emit a `<link rel="preload" as="image">` from the exact same srcset
strings. If those ever drift, the preload fetches a file the picture will
not use.

## Icons and OG image

`scripts/gen-icon.mjs` and `scripts/gen-og.mjs` rasterise the brand mark and
the 1200×630 OG image via `sharp`. Re-run with `node scripts/gen-og.mjs`
after changing the mark or the OG copy.

---

## Deploying

```bash
npm run deploy
```

`wrangler.jsonc` is an assets-only Worker — no server script.

- `not_found_handling: "404-page"` serves `dist/404.html` with a real 404
  status for unmatched routes.
- `html_handling: "force-trailing-slash"` is pinned rather than left on the
  `auto` default, so it provably matches `astro.config.mjs`'s
  `trailingSlash: "always"`. Without it, `/page` and `/page/` can both
  resolve and split signals across two URLs.

`public/_headers` ships security headers and cache policy. `/_astro/*` and
`/fonts/*` are content-hashed and cached immutably for a year; HTML must
revalidate so a content fix goes live immediately.

Verify after deploy:

```bash
curl -sI https://dubaibatteryservice.com/ | sort
curl -sI https://dubaibatteryservice.com/jump-start-dubai   # expect 308 -> trailing slash
```

If you add a third-party script, the CSP in `_headers` must be updated or it
will be blocked. `'unsafe-inline'` is present for `script-src` and
`style-src` because Astro inlines its scripts and scoped styles; a static
build cannot emit a nonce.

---

## Accessibility notes

All colour tokens meet WCAG AA (4.5:1) against the surfaces they are used
on. Two are non-obvious and should not be "corrected" back:

- **Filled WhatsApp buttons use dark ink, not white.** White on `#25d366`
  is 1.98:1. `--whatsapp-ink` on the same green is 8.34:1, and it still
  reads as WhatsApp.
- **The primary button's hover state darkens rather than brightens.** A
  brighter red cannot reach 4.5:1 against white text at 16px/600.

Also: `--focus-ring` is blue on purpose, so a focus outline is never read as
an error state. Manual `<br>` in a heading must have a space before it —
`<br>` is inline, and text extraction (including Google's, and Chrome's
accessible-name computation) joins the words across it otherwise.

---

## Not built yet

- **`/areas/` pages.** `AreaId` in `src/lib/services.ts` and
  `siteConfig.serviceAreas` are already wired for them, and `Coverage.astro`
  renders the districts as plain text specifically so the internal-link tree
  can be introduced without touching that layout. `car battery replacement
  dubai marina` and its siblings are the lowest-competition,
  highest-conversion terms in this niche and are the obvious next tier.
- **Lead-capture form.** Blocked on `leadEndpoint`.
- **Trust-signal display components.** Blocked on `claims.*`.
- **Blog / guides.** No route exists.

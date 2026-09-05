# Image art direction brief — Dubai Battery Service

Photography is **partially in place**. Six images ship; fourteen optional
slots are still empty and render as nothing (no placeholder box, no broken
`<img>`), so the site is complete without them.

This document specifies what exists, what the empty slots want, and the
content-integrity rules that apply before anything is published.

---

## 1. What ships today

| File | Size | Ratio | Used by |
|---|---|---|---|
| `images/hero-desktop.jpg` | 1280×941 | ~4:3 landscape | Homepage hero, ≥1024px |
| `images/hero-mobile.jpg` | 1200×800 | 3:2 landscape | Homepage hero, <1024px |
| `images/services/battery-delivery-dubai-hero.jpg` | 1536×1024 | 3:2 | `/battery-delivery-dubai/` hero |
| `images/services/battery-emergency-dubai-hero.jpg` | 1536×1024 | 3:2 | `/emergency-battery-service-dubai/` hero |
| `images/services/mobile-service-dubai-editorial.jpg` | 1536×1024 | 3:2 | `/mobile-battery-service-dubai/` editorial |
| `images/services/battery-prices-dubai-detail.jpg` | 1536×1024 | 3:2 | `/car-battery-prices-dubai/` detail |

All live under `src/assets/`. **Never put images in `public/`** — files there
bypass Astro's optimisation pipeline entirely and ship at full weight.

Sources are JPEG. They were originally 2 MB PNGs, which put 8 MB into every
`git clone` for no runtime benefit; the build output was identical. Supply
JPEG.

### The homepage hero pair are not interchangeable

`hero-desktop` and `hero-mobile` are **different crops of the same scene, not
one frame resized**. The hero uses a hand-rolled `<picture>` with `media`
attributes (see `src/lib/heroImages.ts`) so only the matching one is
downloaded. Replacing one without the other will produce a visible
composition break at the 64rem breakpoint.

---

## 2. Empty slots

`src/config/serviceImages.ts` gives every service three optional slots.
Filled slots are marked ●, empty ○:

| Service | hero | editorial | detail |
|---|:--:|:--:|:--:|
| Battery Replacement | ○ | ○ | ○ |
| Jump Start | ○ | ○ | ○ |
| Mobile Battery Service | ○ | ● | ○ |
| Battery Delivery | ● | ○ | ○ |
| Battery Testing | ○ | ○ | ○ |
| Emergency Battery Service | ● | ○ | ○ |
| Battery Prices | ○ | ○ | ● |

Priority order if you commission more: **Battery Replacement hero** (the
highest-value page, currently text-only), then **Battery Testing hero**, then
**Jump Start editorial**.

### Slot roles

- **hero** — 3:2 landscape, sits beside the H1. Scene-setting, wide. Without
  one the hero renders as a single measured text column, which is a
  deliberate fallback rather than a broken layout.
- **editorial** — 16:9, full prose width, breaks up long copy mid-page.
- **detail** — 4:3, capped at 40rem, aligns to the prose measure. Tight
  close-ups: a terminal, a label, a tester readout.

### How to add one

1. Drop the JPEG into `src/assets/images/services/`.
2. Import it in `src/config/serviceImages.ts`.
3. Replace `null` with `{ src, alt }`.

No component edits. `astro:assets` regenerates every AVIF/WebP/JPEG variant
and the `srcset`. A path that doesn't exist **fails the build** rather than
shipping a broken image.

Alt text lives in `serviceImages.ts` next to the source, not in the page, so
it travels when the image is replaced. The homepage hero's alt is
`HERO_ALT` in `src/lib/heroImages.ts`.

---

## 3. Art direction

Consistency across the set matters more than any single image being
striking. Everything must read as one shoot.

- **Light:** soft, directional, late-afternoon daylight. One dominant key
  from a low angle. No harsh midday sun, no flash, no coloured gels.
- **Palette:** neutral whites, greys and carbon black, with warm skin and
  metal tones. Muted overall. The page supplies the crimson accent — the
  photographs should not fight it.
- **Depth of field:** shallow but not extreme. Subject sharp, background
  softly separated. Avoid the over-blurred smartphone-portrait look.
- **Grade:** clean, slightly cool shadows, warm highlights, low contrast. No
  teal-and-orange, no heavy vignette, no added film grain.
- **Composition:** generous negative space. Heroes overlay a crimson bloom
  near one corner — keep that area quiet.
- **Vehicles:** modern, clean, premium, unbadged where practical. No visible
  number plates.
- **People:** hands and mid-body framing over faces. A visible face needs a
  model release, and must not be presented as an employee of a company that
  does not yet exist — see §4.

### Prompt starting point

If generating rather than shooting:

> editorial automotive photograph, technician's hands working at the open
> bonnet of a modern premium SUV, upscale Dubai podium car park, clean modern
> architecture softly out of focus, low golden-hour sunlight from camera left,
> shallow depth of field, muted neutral colour grade, generous empty space in
> the upper right, 3:2 composition, no text, no logos, no number plates

---

## 4. Content-integrity rules — read before publishing

Not stylistic preferences. Breaking these creates a legal or truthfulness
problem for an asset being prepared for sale.

- **No fabricated proof.** No award badges, review stars, certification
  logos, "authorised dealer" signage, or ratings composited into a frame.
- **No implied company that doesn't exist.** Uniforms, branded vans, workshop
  signage and name badges all assert an operating business. `entityVerified`
  is currently `false` in `src/config/site.ts`, and the footer states the
  site is an informational resource rather than a dispatched provider.
  Imagery must not contradict that — generic workwear, no branding.
- **No third-party marks** you don't hold rights to: battery brands, vehicle
  manufacturer badges, logos on clothing or equipment. Angle battery labels
  away or use an unbranded unit.
- **No real number plates.**
- **Model releases** for any identifiable person. This is commercial use.
- **If AI-generated**, confirm the generator's licence permits commercial use
  *and survives a sale of the asset*. Some licences are non-transferable,
  which matters specifically here.
- **Alt text must describe what the image actually shows.** If a replacement
  differs materially from the current description, update the `alt` in
  `serviceImages.ts` (service images) or `HERO_ALT` in `heroImages.ts`
  (homepage hero). Alt text that describes a photograph you swapped out is
  worse than no alt text.

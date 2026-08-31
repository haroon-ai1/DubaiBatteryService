# Image art direction brief — Dubai Battery Service homepage

The homepage currently ships **abstract tonal placeholders**, not photographs.
This document specifies the real image set that should replace them.

Hand this to a photographer, or use the prompts as a starting point in an
image-generation tool. Either way, review §6 before publishing anything.

---

## 1. How to swap images in

Drop the new files into `src/assets/images/` using the **exact filenames and
aspect ratios** in the table below, then run `npm run build`. No component
edits are required — `astro:assets` regenerates every AVIF/WebP/JPEG variant
and the `srcset` automatically.

| Filename | Aspect | Min source width | Used for |
|---|---|---|---|
| `hero-desktop.jpg` | 4:5 portrait | 1600px | Hero, ≥1024px viewports |
| `hero-mobile.jpg` | 3:2 landscape | 1400px | Hero, <1024px viewports |
| `replacement-desktop.jpg` | 4:3 landscape | 1600px | Editorial feature, ≥1024px |
| `replacement-mobile.jpg` | 4:3 landscape | 1200px | Editorial feature, <1024px |

Supply sRGB JPEGs at quality ~85. Don't pre-compress hard — Astro handles
compression, and a twice-compressed source looks worse at every size.

The hero pair are **different crops, not the same frame resized**. Shoot or
generate them as two deliberate compositions.

---

## 2. Art direction that applies to every image

Consistency across the set matters more than any single image being striking.
All four must read as one shoot.

- **Light:** soft, directional, late-afternoon daylight. One dominant key from
  a low angle. No harsh midday sun, no flash, no coloured gels.
- **Palette:** neutral whites, greys and carbon black, with warm skin/metal
  tones. Muted overall. The page supplies the crimson accent — the photographs
  should not fight it.
- **Depth of field:** shallow but not extreme. Subject sharp, background
  softly separated. Avoid the over-blurred smartphone-portrait look.
- **Colour grade:** clean and slightly cool in the shadows, warm in the
  highlights. Low contrast. No teal-and-orange grade, no heavy vignette,
  no film-emulation grain beyond what's naturally present.
- **Composition:** generous negative space. Every image has a specified empty
  zone (below) that the layout relies on — do not fill it.
- **Vehicles:** modern, clean, premium but unbadged where practical. A recent
  SUV or executive sedan. No visible number plates.
- **People:** hands and mid-body framing preferred over faces. If a face is
  visible you need a model release, and the person must not be presented as an
  employee of a company that does not yet exist (see §6).

---

## 3. `hero-desktop.jpg` — 4:5 portrait

**The most important image on the site.** It is the LCP element.

Subject: a technician's hands working at the open bonnet of a premium SUV,
shot from a slight three-quarter angle. The vehicle occupies the lower two
thirds. Upper third is open sky or clean architectural background.

- Setting: an upscale Dubai residential or podium car park — clean concrete,
  modern architecture, palms or a soft skyline suggestion in the far
  background, thrown well out of focus.
- Time: golden hour, sun low and behind camera-left.
- **Negative space:** keep the top-right quadrant clean and uncluttered. It
  sits nearest the headline and the crimson bloom overlays that corner.
- Mood: competent and calm. Nobody smiling at the camera.

> **Prompt starting point:** editorial automotive photograph, technician's hands
> working at the open bonnet of a modern premium SUV, upscale Dubai podium
> car park, clean modern architecture softly out of focus, low golden-hour
> sunlight from camera left, shallow depth of field, muted neutral colour
> grade, generous empty space in the upper right, vertical 4:5 composition,
> no text, no logos, no number plates

## 4. `hero-mobile.jpg` — 3:2 landscape

The same scene, **recomposed** for a wide frame — not a crop of the above.

Move in closer. The bonnet and the technician's hands fill more of the frame;
the architectural background reduces to a soft band. Keep the left third
relatively clean, since the mobile bloom sits there.

## 5. `replacement-desktop.jpg` / `replacement-mobile.jpg` — 4:3

Subject: a close editorial detail of battery replacement — a battery terminal,
a torque wrench on a hold-down clamp, or a battery being lowered into its
tray. Engine bay clean and modern.

- Framing: tight. This is a detail shot, not a scene.
- **Do not** show a battery with a visible manufacturer brand unless you have
  the right to use that brand's marks. Angle the label away or choose an
  unbranded unit.
- Light: same low warm key as the hero, with a soft fill so the engine bay
  doesn't go muddy.
- **Negative space:** keep one side (either) reasonably quiet. On desktop this
  image sits beside a column of text.

The mobile variant can be a tighter crop of the same frame here — unlike the
hero pair, this one doesn't change layout role between breakpoints.

---

## 6. Content-integrity rules — read before publishing

These are not stylistic preferences. Breaking them creates a legal or
truthfulness problem for a site being prepared for sale.

- **No fabricated proof.** No award badges, no review stars, no certification
  logos, no "authorised dealer" signage, no fake ratings composited into a
  photograph.
- **No implied company that doesn't exist.** Uniforms, branded vans, workshop
  signage and name badges all assert an operating business. While
  `operationalMode` is `"asset"` and `entityVerified` is `false`, imagery must
  stay conceptual — generic workwear, no branding.
- **No third-party marks** you don't have rights to: battery brands, vehicle
  manufacturer badges, visible logos on clothing or equipment.
- **No real number plates** — remove or angle them out.
- **Model releases** for any identifiable person, since this is commercial use.
- **If images are AI-generated**, check the generator's licence permits
  commercial use *and* survives a sale of the asset. Some licences are
  non-transferable, which matters here specifically.
- Alt text is already written in the components and describes a real scene.
  If your final images differ materially from the descriptions above, update
  the `alt` attributes in `Hero.astro` and `EditorialFeature.astro` to match
  what is actually shown.

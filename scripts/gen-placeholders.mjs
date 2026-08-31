/*
  Generates premium, minimal placeholder imagery for the homepage.

  These are DELIBERATELY ABSTRACT atmospheric tonal fields — soft light
  studies with a controlled crimson bloom and fine film grain. They are not
  illustrations and they do not depict vehicles, people or equipment.

  They exist so the layout reads as art-directed while real photography is
  commissioned. Replace the files in src/assets/images/ with real photos of
  the same dimensions and the components need no changes at all.
  See README "Image art direction brief" for the shot list.
*/
import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("src/assets/images", { recursive: true });

// Fine monochrome grain, composited at low opacity so the fields read as
// photographic rather than as flat CSS gradients.
function grain(width, height, strength = 10) {
  const px = width * height;
  const buf = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i++) {
    const n = 128 + (Math.random() - 0.5) * strength * 2;
    buf[i * 4] = n;
    buf[i * 4 + 1] = n;
    buf[i * 4 + 2] = n;
    buf[i * 4 + 3] = 26; // ~10% alpha
  }
  return sharp(buf, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

/*
  Each field: a light neutral base, a warm crimson bloom positioned to match
  where the real photograph's subject/light source should sit, and a soft
  carbon falloff to give tonal depth. Bloom position differs per image so the
  set reads as a coherent series shot under one lighting setup, not as four
  identical gradients.
*/
function field({ w, h, bloomX, bloomY, bloomR, depthX, depthY, warmth }) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="55%" stop-color="#F1F2F5" />
      <stop offset="100%" stop-color="#E2E5EA" />
    </linearGradient>
    <radialGradient id="bloom" cx="${bloomX}" cy="${bloomY}" r="${bloomR}">
      <stop offset="0%" stop-color="#E21C35" stop-opacity="${warmth}" />
      <stop offset="40%" stop-color="#E21C35" stop-opacity="${(warmth * 0.3).toFixed(3)}" />
      <stop offset="100%" stop-color="#E21C35" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="depth" cx="${depthX}" cy="${depthY}" r="0.85">
      <stop offset="0%" stop-color="#111215" stop-opacity="0.30" />
      <stop offset="55%" stop-color="#111215" stop-opacity="0.11" />
      <stop offset="100%" stop-color="#111215" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#base)" />
  <rect width="${w}" height="${h}" fill="url(#depth)" />
  <rect width="${w}" height="${h}" fill="url(#bloom)" />
</svg>`);
}

async function make(name, opts) {
  const { w, h } = opts;
  const base = await sharp(field(opts)).blur(opts.blur ?? 28).toBuffer();
  const noise = await grain(w, h, opts.grain ?? 10);
  await sharp(base)
    .composite([{ input: noise, blend: "overlay" }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`src/assets/images/${name}.jpg`);
  console.log(`  ${name}.jpg  ${w}x${h}`);
}

console.log("Generating placeholder tonal fields:");

// Hero — desktop portrait-ish crop, bloom low-right where the vehicle's
// front end and the warm key light should fall.
await make("hero-desktop", { w: 1280, h: 1600, bloomX: 0.62, bloomY: 0.68, bloomR: 0.72, depthX: 0.2, depthY: 0.15, warmth: 0.10 });
// Hero — mobile landscape crop, bloom recentred for the wider frame.
await make("hero-mobile", { w: 1200, h: 800, bloomX: 0.66, bloomY: 0.6, bloomR: 0.78, depthX: 0.18, depthY: 0.2, warmth: 0.095 });

// Editorial feature — engine-bay / replacement work. Cooler, bloom upper-left.
await make("replacement-desktop", { w: 1400, h: 1050, bloomX: 0.34, bloomY: 0.3, bloomR: 0.7, depthX: 0.78, depthY: 0.75, warmth: 0.075 });
await make("replacement-mobile", { w: 1000, h: 750, bloomX: 0.38, bloomY: 0.32, bloomR: 0.76, depthX: 0.75, depthY: 0.7, warmth: 0.075 });

console.log("done");

import sharp from "sharp";

// Apple touch icon: full-bleed square, no baked-in corner radius (iOS masks it itself)
const appleTouchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#111215" />
  <path d="M90 39 L56 96 H84 L78 141 L124 79 H96 Z" fill="#F5324C" />
</svg>`;

await sharp(Buffer.from(appleTouchSvg)).resize(180, 180).png().toFile("public/apple-touch-icon.png");

// Standalone PNG favicon fallback (32x32) for user agents that don't support SVG favicons
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect x="1" y="1" width="30" height="30" rx="9" fill="#111215" />
  <path d="M16 7 L10 17 H15 L14 25 L22 14 H17 Z" fill="#F5324C" />
</svg>`;

await sharp(Buffer.from(faviconSvg)).resize(48, 48).png().toFile("public/favicon-48x48.png");

console.log("icons written");

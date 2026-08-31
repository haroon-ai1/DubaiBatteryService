// Regenerates public/og-image.png from an inline SVG via sharp (declared as
// a devDependency in package.json — see README "Regenerating icons / OG
// image"). Text is rendered using the "Manrope" family for brand
// consistency, which sharp's underlying SVG rasterizer resolves through the
// OS's font system (fontconfig on Linux), not through package.json — if
// Manrope isn't installed as a system font when you run this, the text
// will silently fall back to a generic sans-serif instead of erroring.
import sharp from "sharp";

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E21C35" stop-opacity="0.16" />
      <stop offset="45%" stop-color="#E21C35" stop-opacity="0.07" />
      <stop offset="100%" stop-color="#E21C35" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#FFFFFF" />
  <circle cx="960" cy="230" r="420" fill="url(#glow)" />

  <!-- brand mark -->
  <rect x="72" y="60" width="56" height="56" rx="17" fill="#111215" />
  <path d="M100 74 L86 100 H97 L93 122 L114 92 H103 Z" fill="#F5324C" />
  <text x="144" y="98" font-family="Manrope ExtraLight" font-weight="600" font-size="26" fill="#111215">Dubai Battery Service</text>

  <!-- headline -->
  <text x="72" y="290" font-family="Manrope ExtraLight" font-weight="700" font-size="64" fill="#111215">Car Battery Service</text>
  <text x="72" y="364" font-family="Manrope ExtraLight" font-weight="700" font-size="64" fill="#111215">in Dubai.</text>

  <!-- tagline -->
  <text x="72" y="424" font-family="Manrope ExtraLight" font-weight="400" font-size="23" fill="#62666E">Replacement, mobile service, jump-starts and</text>
  <text x="72" y="456" font-family="Manrope ExtraLight" font-weight="400" font-size="23" fill="#62666E">testing information for drivers across the city.</text>

  <!-- decorative car silhouette, right side -->
  <g transform="translate(660,300)" opacity="0.92">
    <ellipse cx="270" cy="245" rx="205" ry="16" fill="#FFE8EC" opacity="0.7" />
    <path d="M50,200 C50,160 80,113 132,103 C192,90 260,88 306,93 C362,100 392,124 422,154 C462,164 500,170 520,194 C526,200 526,211 520,215 L60,215 C54,215 50,209 50,200 Z"
      fill="#FFFFFF" stroke="#111215" stroke-width="3" stroke-linejoin="round" />
    <path d="M138,107 C186,96 252,93 295,97 C344,103 370,122 393,147 L205,147 C180,147 160,138 138,122 Z"
      fill="#F8F9FB" stroke="#111215" stroke-width="2.5" stroke-linejoin="round" />
    <path d="M60,183 C180,190 380,190 515,183" fill="none" stroke="#E21C35" stroke-width="3" stroke-linecap="round" />
    <circle cx="136" cy="217" r="38" fill="#111215" />
    <circle cx="136" cy="217" r="16" fill="#F8F9FB" />
    <circle cx="426" cy="217" r="38" fill="#111215" />
    <circle cx="426" cy="217" r="16" fill="#F8F9FB" />
  </g>
</svg>`;

await sharp(Buffer.from(og)).resize(1200, 630).png().toFile("public/og-image.png");
console.log("og image written");

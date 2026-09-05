/**
 * Resolved hero image sets.
 *
 * WHY THIS EXISTS
 * ---------------
 * The hero previously rendered TWO <Picture> components — one desktop, one
 * mobile — art-directed by CSS `display: none`. The preload scanner runs
 * before CSS is applied, so `display: none` does not prevent the fetch:
 * every mobile visitor downloaded the desktop set as well (~34 KB of AVIF
 * nobody could see), and both were marked `fetchpriority="high"`, so the
 * browser had two competing candidates for the LCP slot.
 *
 * Astro's <Picture> can't emit `media` on its <source> elements, which is
 * what real art direction needs. So we resolve the variants with
 * `getImage()` here and hand-roll one <picture> in Hero.astro.
 *
 * Resolving them in a module (rather than inline in Hero.astro) means
 * BaseLayout can emit a matching `<link rel="preload" as="image">` in
 * <head> from the exact same srcset strings — if they ever drift, the
 * preload silently fetches a file the picture won't use.
 */

import { getImage } from "astro:assets";
import heroDesktop from "@/assets/images/hero-desktop.jpg";
import heroMobile from "@/assets/images/hero-mobile.jpg";

/** Viewport at which the desktop crop takes over. Must match Hero.astro's CSS. */
export const HERO_DESKTOP_MEDIA = "(min-width: 64rem)";
export const HERO_DESKTOP_SIZES = "55vw";
export const HERO_MOBILE_SIZES = "100vw";

async function variants(src: ImageMetadata, widths: number[]) {
  const [avif, webp, jpg] = await Promise.all([
    getImage({ src, format: "avif", widths, alt: "" }),
    getImage({ src, format: "webp", widths, alt: "" }),
    getImage({ src, format: "jpeg", widths, alt: "" }),
  ]);
  return {
    avif: avif.srcSet.attribute,
    webp: webp.srcSet.attribute,
    jpg: jpg.srcSet.attribute,
    fallback: jpg.src,
    width: src.width,
    height: src.height,
  };
}

export const heroDesktopSet = await variants(heroDesktop, [640, 900, 1280]);
export const heroMobileSet = await variants(heroMobile, [480, 780, 1200]);

/** Alt text describes what the photograph actually shows. Update in place. */
export const HERO_ALT =
  "Service technician at the open bonnet of a modern premium SUV, on a Dubai waterfront at golden hour.";

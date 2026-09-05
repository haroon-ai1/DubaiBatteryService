/**
 * Maps a service ID to its three image slots (hero / editorial / detail).
 *
 * Every slot is optional. When a slot is `null` the layout renders the
 * corresponding section text-only — no placeholder boxes, no broken
 * <img>. To activate a slot: drop the source into `src/assets/images/…`
 * (never `public/`), import it here, and swap `null` for
 * `{ src, alt }`.
 *
 * Alt text belongs with the image config, not with the calling page —
 * that way alt travels when the image is replaced.
 *
 * Rules:
 * - never reuse one image across services just to fill slots
 * - never point at files that are not on disk (the build will fail)
 * - never reuse a homepage image on a service page
 */

import type { ImageMetadata } from "astro";
import type { ServiceId } from "@/lib/services";

// -----------------------------------------------------------------------------
// Image sources. Astro's ImageMetadata is resolved at import time, so a broken
// path fails the build with a clear error rather than shipping a broken <img>.
// -----------------------------------------------------------------------------

import batteryDeliveryHero from "@/assets/images/services/battery-delivery-dubai-hero.jpg";
import batteryEmergencyHero from "@/assets/images/services/battery-emergency-dubai-hero.jpg";
import batteryPricesDetail from "@/assets/images/services/battery-prices-dubai-detail.jpg";
import mobileServiceEditorial from "@/assets/images/services/mobile-service-dubai-editorial.jpg";

export type ServiceImageSlot = "hero" | "editorial" | "detail";

export interface ServiceImageEntry {
  src: ImageMetadata;
  alt: string;
}

export interface ServiceImageSlots {
  hero: ServiceImageEntry | null;
  editorial: ServiceImageEntry | null;
  detail: ServiceImageEntry | null;
}

// -----------------------------------------------------------------------------
// Configured images. Slots without a source stay null; the layout and the
// ServiceImage component both render nothing at all for a null slot.
// -----------------------------------------------------------------------------

const EMPTY_SLOTS: ServiceImageSlots = { hero: null, editorial: null, detail: null };

export const SERVICE_IMAGES: Record<ServiceId, ServiceImageSlots> = {
  // `battery_service` is the generic umbrella id used by page-agnostic
  // CTAs. It has no page, so it has no image slots.
  battery_service: { ...EMPTY_SLOTS },
  battery_prices: {
    hero: null,
    editorial: null,
    detail: {
      src: batteryPricesDetail,
      alt:
        "Car battery label showing chemistry, capacity and cold-cranking-amp rating — the specification that decides both the correct replacement and its price.",
    },
  },
  battery_replacement: { ...EMPTY_SLOTS },
  mobile_battery_service: {
    hero: null,
    editorial: {
      src: mobileServiceEditorial,
      alt:
        "Mobile battery service technician testing and replacing a car battery at the vehicle's location in Dubai.",
    },
    detail: null,
  },
  jump_start: { ...EMPTY_SLOTS },
  battery_delivery: {
    hero: {
      src: batteryDeliveryHero,
      alt:
        "A car battery being delivered and fitted to a customer's vehicle at their location in Dubai.",
    },
    editorial: null,
    detail: null,
  },
  battery_testing: { ...EMPTY_SLOTS },
  emergency_battery_service: {
    hero: {
      src: batteryEmergencyHero,
      alt:
        "An emergency battery service call-out attending a stranded car in Dubai.",
    },
    editorial: null,
    detail: null,
  },
};

export function getServiceImage(
  service: ServiceId,
  slot: ServiceImageSlot
): ServiceImageEntry | null {
  return SERVICE_IMAGES[service]?.[slot] ?? null;
}

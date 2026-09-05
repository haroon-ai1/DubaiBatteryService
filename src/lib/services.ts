/**
 * Stable internal identifiers for services and CTA slots.
 *
 * These strings are wire-format: they show up in GA4 event parameters and
 * (indirectly, via message templates) in outgoing WhatsApp lead messages.
 * Rename with care — dashboards will need updating.
 */

export type ServiceId =
  | "battery_service"
  | "battery_prices"
  | "battery_replacement"
  | "mobile_battery_service"
  | "jump_start"
  | "battery_delivery"
  | "battery_testing"
  | "emergency_battery_service";

export type CtaLocation =
  // homepage
  | "hero_whatsapp"
  | "hero_call"
  | "quick_actions_whatsapp"
  | "quick_actions_call"
  | "service_whatsapp"
  | "service_call"
  | "sticky_mobile_whatsapp"
  | "sticky_mobile_call"
  | "final_cta_whatsapp"
  | "final_cta_call"
  // service pages — generic across pages; the `service` param already
  // distinguishes which page the tap came from.
  | "service_hero_whatsapp"
  | "service_hero_call"
  | "service_inline_whatsapp"
  | "service_final_whatsapp"
  | "service_final_call"
  // 404
  | "notfound_whatsapp"
  | "notfound_call";

/** Explicit page-context area IDs. Never inferred from the visitor's device. */
export type AreaId =
  | "dubai_marina"
  | "jlt"
  | "business_bay"
  | "downtown_dubai"
  | "jumeirah"
  | "jvc"
  | "al_barsha"
  | "deira"
  | "palm_jumeirah";

export interface ServiceMeta {
  id: ServiceId;
  label: string;
  /** Short one-line summary used in the services intro row. */
  short: string;
  /** Anchor id used on the homepage for in-page linking. */
  anchor: string | null;
  /**
   * Canonical route for this service's dedicated page, or `null` for the
   * generic umbrella id which has no page of its own.
   *
   * Components MUST prefer this over `anchor` when building links. A real
   * route passes link equity and resolves from every page; a bare fragment
   * does neither, and silently dead-ends on any page that isn't the
   * homepage. See `navLinks.ts` for the same rule applied to global nav.
   */
  path: string | null;
}

export const SERVICES: Record<ServiceId, ServiceMeta> = {
  /**
   * Generic umbrella id. Used by CTAs that aren't tied to one service
   * (hero, sticky bar, homepage final CTA) and as the WhatsApp message
   * fallback. Deliberately has no `path` — it is not a page.
   */
  battery_service: {
    id: "battery_service",
    label: "Battery Service",
    short: "General battery assistance and diagnosis.",
    anchor: null,
    path: null,
  },
  battery_replacement: {
    id: "battery_replacement",
    label: "Battery Replacement",
    short: "Correct chemistry, capacity and fitment for the vehicle.",
    anchor: "replacement",
    path: "/car-battery-replacement-dubai/",
  },
  jump_start: {
    id: "jump_start",
    label: "Jump Start",
    short: "Enough charge to start — and a check for what caused the drop.",
    anchor: "jump-start",
    path: "/jump-start-dubai/",
  },
  mobile_battery_service: {
    id: "mobile_battery_service",
    label: "Mobile Battery Service",
    short: "Assistance carried out at the vehicle's location.",
    anchor: null,
    path: "/mobile-battery-service-dubai/",
  },
  battery_delivery: {
    id: "battery_delivery",
    label: "Battery Delivery",
    short: "The right battery brought to the car and fitted on site.",
    anchor: null,
    path: "/battery-delivery-dubai/",
  },
  battery_testing: {
    id: "battery_testing",
    label: "Battery Testing",
    short: "Distinguishing a flat battery from a failing one, and checking charging.",
    anchor: null,
    path: "/battery-testing-dubai/",
  },
  emergency_battery_service: {
    id: "emergency_battery_service",
    label: "Emergency Battery Service",
    short: "Priority handling for stranded vehicles.",
    anchor: null,
    path: "/emergency-battery-service-dubai/",
  },
  battery_prices: {
    id: "battery_prices",
    label: "Battery Prices",
    short: "What sets the price of a replacement, and how to compare quotes.",
    anchor: null,
    path: "/car-battery-prices-dubai/",
  },
};

/**
 * The services that have their own page, in the order they should appear
 * in navigation and index strips. Derived rather than hand-listed so a
 * new service page can never be added to `SERVICES` and then forgotten
 * by the homepage — which is exactly how two pages ended up orphaned.
 */
export const LINKED_SERVICES: ServiceMeta[] = (
  [
    "battery_replacement",
    "jump_start",
    "mobile_battery_service",
    "battery_testing",
    "battery_delivery",
    "emergency_battery_service",
    "battery_prices",
  ] as const
).map((id) => SERVICES[id]);

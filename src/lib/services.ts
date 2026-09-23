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
  // global chrome
  | "header_call"
  | "header_whatsapp"
  | "mobile_menu_whatsapp"
  | "mobile_menu_call"
  | "sticky_mobile_whatsapp"
  | "sticky_mobile_call"
  | "footer_whatsapp"
  | "footer_call"
  // homepage
  | "hero_whatsapp"
  | "hero_call"
  | "service_whatsapp"
  | "final_cta_whatsapp"
  | "final_cta_call"
  // any inner page — the `service`, `area` and `page` params already say
  // which page / context the tap came from.
  | "service_hero_whatsapp"
  | "service_hero_call"
  | "service_inline_whatsapp"
  | "sidebar_whatsapp"
  | "sidebar_call"
  | "service_final_whatsapp"
  | "service_final_call"
  // 404
  | "notfound_whatsapp"
  | "notfound_call";

/**
 * Explicit page-context area id (the area page's slug, snake_cased).
 * Never inferred from the visitor's device or location.
 */
export type AreaId = string;

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

/**
 * Presentation copy for service cards (homepage grid, related blocks,
 * footer). Kept beside SERVICES so a new service can't ship without it.
 */
export const SERVICE_CARDS: Record<
  Exclude<ServiceId, "battery_service">,
  { icon: "battery" | "bolt" | "van" | "gauge" | "siren" | "tag" | "wrench"; title: string; text: string }
> = {
  battery_replacement: {
    icon: "battery",
    title: "Car Battery Replacement",
    text: "New battery matched to your car's spec, fitted where you're parked, old one taken for recycling.",
  },
  jump_start: {
    icon: "bolt",
    title: "Jump Start",
    text: "Car won't crank? A technician boosts it and checks whether the battery can actually hold a charge.",
  },
  mobile_battery_service: {
    icon: "wrench",
    title: "Mobile Battery Service",
    text: "Testing, replacement and registration done at your home, office, basement or roadside.",
  },
  battery_testing: {
    icon: "gauge",
    title: "Free Battery Test",
    text: "Battery health, cranking and alternator output checked on the spot — before you pay for a new battery.",
  },
  battery_delivery: {
    icon: "van",
    title: "Battery Delivery",
    text: "The right battery brought to your car and installed on site. No towing, no workshop queue.",
  },
  emergency_battery_service: {
    icon: "siren",
    title: "Emergency Battery Help",
    text: "Stranded on the road or in a car park at 2am? Priority dispatch, 24/7 across Dubai.",
  },
  battery_prices: {
    icon: "tag",
    title: "Battery Prices",
    text: "Indicative AED price bands by battery type, and what makes one quote higher than another.",
  },
};

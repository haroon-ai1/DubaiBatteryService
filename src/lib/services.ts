/**
 * Stable internal identifiers for services and CTA slots.
 *
 * These strings are wire-format: they show up in GA4 event parameters and
 * (indirectly, via message templates) in outgoing WhatsApp lead messages.
 * Rename with care — dashboards will need updating.
 */

export type ServiceId =
  | "battery_service"
  | "battery_replacement"
  | "mobile_battery_service"
  | "jump_start"
  | "battery_delivery"
  | "battery_testing"
  | "emergency_battery_service";

export type CtaLocation =
  | "hero_whatsapp"
  | "hero_call"
  | "service_whatsapp"
  | "service_call"
  | "sticky_mobile_whatsapp"
  | "sticky_mobile_call"
  | "final_cta_whatsapp"
  | "final_cta_call";

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
}

export const SERVICES: Record<ServiceId, ServiceMeta> = {
  battery_service: {
    id: "battery_service",
    label: "Battery Service",
    short: "General battery assistance and diagnosis.",
    anchor: null,
  },
  battery_replacement: {
    id: "battery_replacement",
    label: "Battery Replacement",
    short: "Correct chemistry, capacity and fitment for the vehicle.",
    anchor: "replacement",
  },
  jump_start: {
    id: "jump_start",
    label: "Jump Start",
    short: "Enough charge to start — and a check for what caused the drop.",
    anchor: "jump-start",
  },
  mobile_battery_service: {
    id: "mobile_battery_service",
    label: "Mobile Battery Service",
    short: "Assistance carried out at the vehicle's location.",
    anchor: null,
  },
  battery_delivery: {
    id: "battery_delivery",
    label: "Battery Delivery",
    short: "The right battery brought to the car and fitted on site.",
    anchor: null,
  },
  battery_testing: {
    id: "battery_testing",
    label: "Battery Testing",
    short: "Distinguishing a flat battery from a failing one, and checking charging.",
    anchor: null,
  },
  emergency_battery_service: {
    id: "emergency_battery_service",
    label: "Emergency Battery Service",
    short: "Priority handling for stranded vehicles.",
    anchor: null,
  },
};

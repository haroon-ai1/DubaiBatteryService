/**
 * Centralized lead-routing helpers.
 *
 * Components that need a WhatsApp or call URL must go through
 * `getWhatsAppUrl()` / `getCallUrl()` — never construct wa.me or tel:
 * links inline. Both return `null` when no configured number is available;
 * the caller must not render the CTA in that case.
 */

import { siteConfig } from "@/config/site";
import type { AreaId, CtaLocation, ServiceId } from "@/lib/services";

export interface LeadContext {
  service: ServiceId;
  ctaLocation: CtaLocation;
  /** Explicit page-context area — never inferred from the visitor. */
  area?: AreaId | null;
  /** Path of the current page — passed to GA4, not to WhatsApp. */
  page?: string;
}

/**
 * Fixed message templates per service. These are the exact strings the
 * driver will see pre-filled in WhatsApp. Never include:
 *  - phone numbers
 *  - vehicle registration numbers
 *  - IP address, GA client IDs, cookies
 *  - names, emails, or any other PII
 */
function baseMessage(service: ServiceId): string {
  switch (service) {
    case "battery_replacement":
      return "I need car battery replacement.";
    case "jump_start":
      return "I need a jump start.";
    case "mobile_battery_service":
      return "I need mobile battery service.";
    case "battery_delivery":
      return "I need battery delivery.";
    case "battery_testing":
      return "I need battery testing.";
    case "emergency_battery_service":
      return "I need emergency battery assistance.";
    case "battery_service":
    default:
      return "I need battery assistance.";
  }
}

function composeMessage(service: ServiceId): string {
  const { leadAttribution, partner } = siteConfig;
  const source = leadAttribution.sourceName;
  const salutation =
    leadAttribution.includePartnerNameInWhatsAppMessage && partner.name
      ? `Hi ${partner.name}, `
      : "Hi, ";
  const attribution = leadAttribution.enabled ? `I found you through ${source}. ` : "";
  return `${salutation}${attribution}${baseMessage(service)}`;
}

function normalizeWhatsAppNumber(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  // wa.me expects country-coded digits, minimum 8 to filter obvious garbage.
  return digits.length >= 8 ? digits : null;
}

function normalizeCallNumber(input: string): string | null {
  // Keep leading + and digits only.
  const cleaned = input.replace(/[^\d+]/g, "");
  if (!cleaned) return null;
  return cleaned.startsWith("+") ? cleaned : `+${cleaned.replace(/^\++/, "")}`;
}

/**
 * Build a wa.me URL for the configured partner with the correct pre-filled
 * message for this service context. Returns `null` when no partner
 * WhatsApp number is configured — the caller must not render the CTA.
 */
export function getWhatsAppUrl(ctx: LeadContext): string | null {
  const { partner } = siteConfig;
  if (!partner.enabled) return null;
  if (!partner.whatsappNumber) return null;
  const number = normalizeWhatsAppNumber(partner.whatsappNumber);
  if (!number) return null;
  const text = composeMessage(ctx.service);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Build a `tel:` URL. Prefers `callTracking.number` when enabled so raw
 * partner numbers don't leak into the DOM under a tracked scenario.
 * Returns `null` when no callable number is available.
 */
export function getCallUrl(_ctx: Pick<LeadContext, "ctaLocation">): string | null {
  const { partner, callTracking } = siteConfig;
  if (callTracking.enabled && callTracking.number) {
    return `tel:${normalizeCallNumber(callTracking.number)}`;
  }
  if (partner.enabled && partner.callNumber) {
    return `tel:${normalizeCallNumber(partner.callNumber)}`;
  }
  return null;
}

/**
 * Convenience: does *anything* live behind the call CTA right now?
 * Used to decide whether to render the button at all.
 */
export function hasCallChannel(): boolean {
  return getCallUrl({ ctaLocation: "hero_call" }) !== null;
}

/**
 * Convenience: does *anything* live behind the WhatsApp CTA right now?
 * The specific service doesn't matter for the render decision — the number
 * either exists or it doesn't.
 */
export function hasWhatsAppChannel(): boolean {
  return getWhatsAppUrl({
    service: "battery_service",
    ctaLocation: "hero_whatsapp",
  }) !== null;
}

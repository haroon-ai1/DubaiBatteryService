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

/**
 * The two lead-tracking events emitted by the site. Kept as an explicit
 * union so mistyped event names don't compile — the delegator in
 * `Analytics.astro` also enforces this at runtime via an allow-list.
 */
export type LeadEvent = "click_whatsapp" | "click_call";

export interface LeadContext {
  service: ServiceId;
  ctaLocation: CtaLocation;
  /** Explicit page-context area — never inferred from the visitor. */
  area?: AreaId | null;
  /** Path of the current page — passed to GA4, not to WhatsApp. */
  page?: string;
}

export interface LeadAttributesContext {
  event: LeadEvent;
  ctaLocation: CtaLocation;
  /** Only meaningful for WhatsApp leads. Omit for calls. */
  service?: ServiceId;
  /** Explicit page-context area. Omit / null → attribute is not emitted. */
  area?: AreaId | null;
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

/** Minimum plausible length for a country-coded number. Filters garbage. */
const MIN_DIGITS = 8;

/**
 * Reduce any input to bare country-coded digits.
 * Handles a leading `+` and the international `00` prefix
 * (e.g. "00971582424859" and "+971582424859" both yield "971582424859").
 */
function toInternationalDigits(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  return digits.length >= MIN_DIGITS ? digits : null;
}

/** wa.me expects digits only — no `+`, no spaces. */
function normalizeWhatsAppNumber(input: string): string | null {
  return toInternationalDigits(input);
}

/** tel: links use E.164 with a leading `+`. */
function normalizeCallNumber(input: string): string | null {
  const digits = toInternationalDigits(input);
  return digits ? `+${digits}` : null;
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
 * Returns `null` when no callable number is available — including when a
 * number is configured but fails normalization, so a malformed value can
 * never render as a dead `tel:null` link.
 */
export function getCallUrl(_ctx: Pick<LeadContext, "ctaLocation">): string | null {
  const { partner, callTracking } = siteConfig;

  const raw =
    callTracking.enabled && callTracking.number
      ? callTracking.number
      : partner.enabled && partner.callNumber
        ? partner.callNumber
        : null;

  if (!raw) return null;

  const number = normalizeCallNumber(raw);
  return number ? `tel:${number}` : null;
}

/**
 * Single source of the `data-lead-*` attribute set consumed by
 * `Analytics.astro`. CTA components must spread this onto their anchor
 * rather than write the attributes inline — the delegator's `dataset`
 * reads and these keys must never drift apart.
 *
 * `area` is omitted from the DOM when null so the delegator's
 * `dataset.leadArea || null` fallback stays authoritative and empty
 * strings do not clutter the markup.
 */
export function getLeadDataAttributes(
  ctx: LeadAttributesContext
): Record<string, string> {
  const attrs: Record<string, string> = {
    "data-lead-event": ctx.event,
    "data-lead-cta": ctx.ctaLocation,
  };
  if (ctx.service) {
    attrs["data-lead-service"] = ctx.service;
  }
  if (ctx.area) {
    attrs["data-lead-area"] = ctx.area;
  }
  return attrs;
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

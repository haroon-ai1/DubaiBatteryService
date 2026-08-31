/**
 * Centralized site configuration.
 *
 * This is the ONLY place business data, trust claims, and third-party IDs
 * are declared. Components must never hard-code a phone number, a review
 * count, a claim about hours/response time, or an analytics ID.
 *
 * Every field below that is `null` represents a fact we cannot currently
 * verify. Components that display such a fact must check for `null` and
 * render nothing rather than fall back to placeholder or invented copy.
 * See README section "Configuration" for the full list of what's pending.
 */

export type OperationalMode = "asset" | "lead-partner" | "operator";

export interface BusinessInfo {
  businessName: string | null;
  legalName: string | null;
  phone: string | null; // E.164, e.g. "+9715XXXXXXXX" — used to build tel: links
  phoneDisplay: string | null; // human-readable formatted string
  whatsapp: string | null; // digits only, no +, used to build wa.me links
  email: string | null;
  address: string | null;
  googleMapsUrl: string | null;
}

export interface TrustClaims {
  openingHours: string | null;
  responseTime: string | null;
  warranty: string | null;
  reviewRating: number | null; // e.g. 4.9
  reviewCount: number | null;
  yearsInBusiness: number | null;
  technicianCount: number | null;
  customerCount: number | null;
  licenseNumber: string | null;
}

export interface Brands {
  batteryBrands: string[];
  authorizedBrands: string[];
}

export interface Analytics {
  gaMeasurementId: string | null;
  googleSiteVerification: string | null;
  googleAdsConversionId: string | null;
  metaPixelId: string | null;
}

export interface SiteConfig {
  operationalMode: OperationalMode;

  /**
   * Explicit, manually-set proof that a real, verified business entity
   * exists behind this site. This is intentionally NOT derived from
   * operationalMode — moving out of "asset" mode is not itself evidence
   * of a verified entity. Only flip this to true once the business
   * details below have actually been confirmed.
   */
  entityVerified: boolean;

  siteName: string;
  siteUrl: string;
  locale: string;
  country: string;
  currency: string;

  defaultOgImage: string;

  business: BusinessInfo;
  claims: TrustClaims;
  serviceAreas: string[];
  brands: Brands;

  /** Where lead-form submissions go. Form only renders/submits when set. */
  leadEndpoint: string | null;

  analytics: Analytics;

  socialLinks: { label: string; url: string }[];
}

export const siteConfig: SiteConfig = {
  // "asset": informational site, no live operator behind it yet.
  // "lead-partner": requests are transparently forwarded to a named service partner.
  // "operator": a real, verified operator is running the service directly.
  operationalMode: "asset",

  // Do not set this to true without actual verification — see the interface
  // comment above. Schema output depends on it directly.
  entityVerified: false,

  siteName: "Dubai Battery Service",
  siteUrl: "https://dubaibatteryservice.com",
  locale: "en-AE",
  country: "AE",
  currency: "AED",

  defaultOgImage: "/og-image.png",

  business: {
    businessName: null,
    legalName: null,
    phone: null,
    phoneDisplay: null,
    whatsapp: null,
    email: null,
    address: null,
    googleMapsUrl: null,
  },

  claims: {
    openingHours: null,
    responseTime: null,
    warranty: null,
    reviewRating: null,
    reviewCount: null,
    yearsInBusiness: null,
    technicianCount: null,
    customerCount: null,
    licenseNumber: null,
  },

  // Areas we have genuine informational content for. Keep this in sync with
  // any /areas/ pages once they exist — do not list an area with no content.
  serviceAreas: [
    "Dubai Marina",
    "JLT",
    "Business Bay",
    "Downtown Dubai",
    "JVC",
    "Al Barsha",
    "Deira",
    "Palm Jumeirah",
  ],

  brands: {
    batteryBrands: [],
    authorizedBrands: [],
  },

  leadEndpoint: null,

  analytics: {
    gaMeasurementId: null,
    googleSiteVerification: null,
    googleAdsConversionId: null,
    metaPixelId: null,
  },

  socialLinks: [],
};

/**
 * True only when entityVerified has been explicitly set to true. Being out
 * of "asset" mode is NOT sufficient on its own — operationalMode governs
 * copy tone and lead-handling, not schema.org verification claims.
 */
export const hasVerifiedEntity = siteConfig.entityVerified === true;

export function buildTelHref(phone: string | null): string | null {
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;
}

export function buildWhatsAppHref(whatsapp: string | null, presetMessage?: string): string | null {
  if (!whatsapp) return null;
  const digits = whatsapp.replace(/\D/g, "");
  const text = presetMessage ? `?text=${encodeURIComponent(presetMessage)}` : "";
  return `https://wa.me/${digits}${text}`;
}

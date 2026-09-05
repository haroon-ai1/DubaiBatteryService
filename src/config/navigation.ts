/**
 * Global navigation links.
 *
 * RULE: every href in a *global* component (header, footer, 404) must be
 * either a real route or a ROOT-RELATIVE fragment (`/#faq`, never `#faq`).
 *
 * A bare fragment only resolves on the page that happens to own that id.
 * The previous nav used `#services`, `#replacement`, `#areas`, `#faq` and
 * `#battery-technology`, all of which exist only on the homepage — so
 * every one of them dead-ended on all seven service pages and the 404.
 * `scripts/check-links.mjs` now fails the build if that regresses.
 */

import { LINKED_SERVICES } from "@/lib/services";

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Primary nav. Real service routes only — these are the pages that need
 * to rank, and the header is the strongest sitewide internal link there is.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Replacement", href: "/car-battery-replacement-dubai/" },
  { label: "Jump-start", href: "/jump-start-dubai/" },
  { label: "Mobile service", href: "/mobile-battery-service-dubai/" },
  { label: "Testing", href: "/battery-testing-dubai/" },
  { label: "Prices", href: "/car-battery-prices-dubai/" },
];

/** Every service page, for the footer's services column. */
export const FOOTER_SERVICE_LINKS: NavLink[] = LINKED_SERVICES.map((s) => ({
  label: s.label,
  href: s.path as string,
}));

/**
 * Homepage-only sections. Root-relative so they work from anywhere —
 * from a service page these navigate home and then scroll.
 */
export const FOOTER_GUIDE_LINKS: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Battery chemistry", href: "/#battery-technology" },
  { label: "Areas covered", href: "/#areas" },
  { label: "FAQ", href: "/#faq" },
];

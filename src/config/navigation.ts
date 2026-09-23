/**
 * Global navigation.
 *
 * RULE: every href in a global component (header, footer, 404) is a real
 * route or a ROOT-RELATIVE fragment (`/#faq`, never `#faq`). A bare
 * fragment only resolves on the page that owns the id.
 * `scripts/check-links.mjs` fails the build if that regresses.
 */
import { LINKED_SERVICES, SERVICE_CARDS } from "@/lib/services";
import { AREAS, areaPath } from "@/data/areas";
import { MAKES, makePath } from "@/data/makes";
import { GUIDES, guidePath } from "@/data/guides";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

const serviceLinks: NavLink[] = LINKED_SERVICES.filter((s) => s.id !== "battery_prices").map((s) => ({
  label: SERVICE_CARDS[s.id as Exclude<typeof s.id, "battery_service">].title,
  href: s.path as string,
}));

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services/", children: serviceLinks },
  { label: "Prices", href: "/car-battery-prices-dubai/" },
  { label: "Areas", href: "/areas/" },
  { label: "Car makes", href: "/car-makes/" },
  { label: "Guides", href: "/guides/" },
];

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  ...serviceLinks,
  { label: "Car battery prices", href: "/car-battery-prices-dubai/" },
  { label: "Battery brands", href: "/car-battery-brands-dubai/" },
];

/** A curated subset — the full list lives on /areas/. */
export const FOOTER_AREA_LINKS: NavLink[] = AREAS.slice(0, 10).map((a) => ({
  label: a.short ?? a.name,
  href: areaPath(a),
}));

export const FOOTER_MAKE_LINKS: NavLink[] = MAKES.slice(0, 8).map((m) => ({
  label: m.short ?? m.name,
  href: makePath(m),
}));

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: "About & how it works", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Guides", href: "/guides/" },
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms of use", href: "/terms/" },
];

export const FOOTER_GUIDE_LINKS: NavLink[] = GUIDES.slice(0, 4).map((g) => ({
  label: g.title.replace(/\s*\(.*\)$/, ""),
  href: guidePath(g),
}));

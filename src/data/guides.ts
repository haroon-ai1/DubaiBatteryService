/**
 * Guide index. Each guide is its own page in src/pages/guides/{slug}.astro
 * and passes its entry from here to GuideLayout, so the index, cards,
 * Article schema and sitemap can never disagree about title or date.
 */
export interface Guide {
  slug: string;
  title: string;
  /** <= 60 chars, used as <title>. */
  seoTitle: string;
  /** <= 155 chars. */
  description: string;
  /** ISO date first published. */
  published: string;
  /** ISO date last meaningfully updated. */
  updated: string;
  readMinutes: number;
  category: "Troubleshooting" | "Buying advice" | "Care & maintenance";
}

export const GUIDES: Guide[] = [
  {
    slug: "signs-car-battery-is-dying",
    title: "9 signs your car battery is dying (and what to do in Dubai)",
    seoTitle: "9 Signs Your Car Battery Is Dying | Dubai Driver's Guide",
    description:
      "Slow crank, clicking, warning lights, a swollen case — the warning signs of a failing car battery, and when to test or replace it in Dubai's heat.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readMinutes: 6,
    category: "Troubleshooting",
  },
  {
    slug: "how-long-car-battery-lasts-uae",
    title: "How long does a car battery last in the UAE?",
    seoTitle: "How Long Does a Car Battery Last in the UAE Heat?",
    description:
      "Why UAE heat cuts car battery life to roughly 2–3 years, how AGM compares, and simple habits that help a battery last longer in Dubai.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readMinutes: 5,
    category: "Care & maintenance",
  },
  {
    slug: "agm-vs-efb-vs-conventional-battery",
    title: "AGM vs EFB vs conventional car batteries: which does your car need?",
    seoTitle: "AGM vs EFB vs Conventional Battery: Which Do You Need?",
    description:
      "The three car battery types explained in plain English — how to tell which your car was built for, and why downgrading costs more in the end.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readMinutes: 6,
    category: "Buying advice",
  },
  {
    slug: "car-wont-start-battery-or-alternator",
    title: "Car won't start: is it the battery, the alternator or the starter?",
    seoTitle: "Car Won't Start? Battery vs Alternator vs Starter",
    description:
      "Clicking, silence or a slow crank? Tell a flat battery from a bad alternator or starter motor in a few minutes — and what to do next in Dubai.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readMinutes: 6,
    category: "Troubleshooting",
  },
  {
    slug: "car-battery-care-dubai-summer",
    title: "Car battery care in a Dubai summer: 10 practical tips",
    seoTitle: "Car Battery Care in Dubai Summer: 10 Practical Tips",
    description:
      "Parking, short trips, travel and terminal care — ten practical ways to protect your car battery through a Dubai summer and avoid a no-start.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readMinutes: 5,
    category: "Care & maintenance",
  },
  {
    slug: "what-to-do-car-battery-dies-dubai",
    title: "Car battery died in Dubai? What to do, step by step",
    seoTitle: "Car Battery Died in Dubai? What to Do, Step by Step",
    description:
      "Stuck with a dead battery on the road, in a basement or at the mall? A calm, step-by-step plan for getting moving again safely in Dubai.",
    published: "2026-09-24",
    updated: "2026-09-24",
    readMinutes: 5,
    category: "Troubleshooting",
  },
];

export const guidePath = (g: Guide) => `/guides/${g.slug}/`;
export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

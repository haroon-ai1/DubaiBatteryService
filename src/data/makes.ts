/**
 * Car makes with their own page at /{slug}-battery-replacement-dubai/.
 *
 * Specs here are deliberately given as TYPICAL RANGES and patterns, not
 * part numbers: the exact battery depends on model year, engine and trim,
 * and the page says so. The on-page promise is "we confirm against your
 * car before fitting", which is what actually happens.
 */

export interface MakeModel {
  name: string;
  /** Typical battery type(s) and capacity band for current-generation GCC cars. */
  battery: string;
}

export interface Make {
  slug: string;
  name: string;
  /** Short name for chips / tight UI. Defaults to name. */
  short?: string;
  /** One-liner for cards and meta. */
  hook: string;
  /** 2–3 sentences unique to this make. */
  intro: string;
  models: MakeModel[];
  /** Does a battery change typically need registration/coding on recent models? */
  registration: "usually" | "some-models" | "rarely";
  /** Make-specific technical note. */
  note: string;
}

export const MAKES: Make[] = [
  {
    slug: "toyota",
    name: "Toyota",
    hook: "Land Cruiser, Prado, Camry, Corolla, Hilux, Fortuner — fitted where you're parked.",
    intro:
      "Toyota is the most common make on UAE roads, from the Corolla and Camry to the Land Cruiser, Prado and Hilux. Most petrol Toyotas without stop-start use conventional flooded or maintenance-free batteries, while hybrids carry a separate 12 V auxiliary battery that also fails with age.",
    models: [
      { name: "Land Cruiser / LC 300", battery: "Large conventional or AGM, typically 80–105 Ah" },
      { name: "Prado / Fortuner", battery: "Conventional, typically 70–90 Ah" },
      { name: "Camry / Camry Hybrid", battery: "Conventional 55–70 Ah; hybrid uses a 12 V AGM auxiliary" },
      { name: "Corolla / Yaris", battery: "Conventional, typically 35–55 Ah" },
      { name: "Hilux", battery: "Conventional, typically 70–90 Ah" },
      { name: "RAV4 / RAV4 Hybrid", battery: "Conventional or AGM depending on trim" },
    ],
    registration: "rarely",
    note:
      "Toyota hybrids (Camry, RAV4, Corolla Cross hybrids) have a 12 V auxiliary battery — usually AGM — that powers the car's electronics. When it fails the car won't enter READY mode even though the big hybrid pack is fine. It's replaced on site like a normal battery.",
  },
  {
    slug: "nissan",
    name: "Nissan",
    hook: "Patrol, X-Trail, Altima, Sunny, Kicks — the right battery, fitted on site.",
    intro:
      "Nissan is a staple in Dubai, led by the Patrol and followed by the X-Trail, Pathfinder, Altima, Sunny and Kicks. The Patrol in particular draws a lot of power — big engine, heavy electrical load, long idles with the air conditioning running — and needs a large, heat-tolerant battery.",
    models: [
      { name: "Patrol (Y62 / Y63)", battery: "Large conventional or AGM, typically 80–105 Ah" },
      { name: "Pathfinder / X-Terra", battery: "Conventional, typically 65–80 Ah" },
      { name: "X-Trail", battery: "Conventional or EFB, typically 55–75 Ah" },
      { name: "Altima", battery: "Conventional, typically 55–70 Ah" },
      { name: "Sunny / Kicks", battery: "Conventional, typically 40–55 Ah" },
    ],
    registration: "rarely",
    note:
      "A Patrol that has had aftermarket accessories added — extra lights, dash cams, fridges, amplifiers — puts extra load on the battery. If yours goes flat repeatedly, ask for a parasitic-drain check alongside the battery test.",
  },
  {
    slug: "lexus",
    name: "Lexus",
    hook: "LX, GX, RX, ES and IS batteries, including hybrid 12 V auxiliaries.",
    intro:
      "Lexus shares much of its engineering with Toyota, but Lexus models are more heavily equipped electrically and many are hybrids. The LX and GX need large batteries; the RX, ES and NX hybrids have a 12 V auxiliary battery that is often AGM.",
    models: [
      { name: "LX 600 / LX 570", battery: "Large conventional or AGM, typically 80–105 Ah" },
      { name: "GX", battery: "Conventional, typically 70–90 Ah" },
      { name: "RX / RX Hybrid", battery: "Conventional or 12 V AGM auxiliary (hybrid)" },
      { name: "ES / ES Hybrid", battery: "Conventional or 12 V AGM auxiliary (hybrid)" },
      { name: "IS / NX", battery: "Conventional or AGM depending on engine" },
    ],
    registration: "rarely",
    note:
      "On Lexus hybrids, a weak 12 V auxiliary battery can show up as warning lights or a car that won't go into READY, not as a slow crank. A quick test confirms it before anything is replaced.",
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    hook: "Pajero, Montero Sport, Outlander, ASX, Attrage batteries in Dubai.",
    intro:
      "Mitsubishi is popular in the UAE for tough, simple SUVs like the Pajero and Montero Sport as well as everyday cars like the Attrage, ASX and Outlander. Most use conventional flooded batteries and are straightforward to replace on site.",
    models: [
      { name: "Pajero", battery: "Conventional, typically 70–90 Ah" },
      { name: "Montero Sport", battery: "Conventional, typically 65–80 Ah" },
      { name: "Outlander", battery: "Conventional, typically 55–70 Ah" },
      { name: "ASX / Eclipse Cross", battery: "Conventional, typically 50–65 Ah" },
      { name: "Attrage / Mirage", battery: "Conventional, typically 35–45 Ah" },
    ],
    registration: "rarely",
    note:
      "Pajeros and Montero Sports used off-road or for desert trips see a lot of vibration. The hold-down clamp matters as much as the battery — a loose battery can crack internally.",
  },
  {
    slug: "honda",
    name: "Honda",
    hook: "Accord, Civic, CR-V, Pilot and City batteries — tested, supplied and fitted.",
    intro:
      "Honda's Accord, Civic, CR-V, Pilot and City are common on Dubai roads. Many recent Hondas with idle-stop use EFB batteries, while older and non-stop-start models use conventional batteries.",
    models: [
      { name: "Accord", battery: "Conventional or EFB, typically 50–70 Ah" },
      { name: "Civic / City", battery: "Conventional or EFB, typically 40–55 Ah" },
      { name: "CR-V", battery: "Conventional or EFB, typically 50–70 Ah" },
      { name: "Pilot", battery: "Conventional, typically 60–75 Ah" },
    ],
    registration: "some-models",
    note:
      "Some recent Hondas with a battery sensor on the negative terminal benefit from a reset after the change, so idle-stop behaves correctly. The technician checks this on the day.",
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    hook: "Elantra, Accent, Tucson, Santa Fe, Sonata — on-site battery replacement.",
    intro:
      "Hyundai's Accent, Elantra, Sonata, Tucson and Santa Fe are widely driven in Dubai, including as company and ride-hail cars that do high daily mileage. Most use conventional or maintenance-free batteries; some newer stop-start versions specify EFB or AGM.",
    models: [
      { name: "Accent / Elantra", battery: "Conventional, typically 45–60 Ah" },
      { name: "Sonata", battery: "Conventional or AGM, typically 60–75 Ah" },
      { name: "Tucson", battery: "Conventional or AGM, typically 60–80 Ah" },
      { name: "Santa Fe / Palisade", battery: "Conventional or AGM, typically 70–90 Ah" },
    ],
    registration: "some-models",
    note:
      "High-mileage Hyundais used for work wear their batteries faster. If the car is your income, mention it — a same-visit replacement after the test keeps downtime to a minimum.",
  },
  {
    slug: "kia",
    name: "Kia",
    hook: "Sportage, Sorento, Picanto, Pegas, K5 — battery replacement at your location.",
    intro:
      "Kia shares platforms and batteries with Hyundai. The Picanto and Pegas are small-car staples, while the Sportage, Sorento and Telluride are popular family SUVs. Most take conventional batteries; some newer mild-hybrid and stop-start trims specify AGM.",
    models: [
      { name: "Picanto / Pegas", battery: "Conventional, typically 35–45 Ah" },
      { name: "Cerato / K5", battery: "Conventional, typically 50–65 Ah" },
      { name: "Sportage", battery: "Conventional or AGM, typically 60–80 Ah" },
      { name: "Sorento / Telluride", battery: "Conventional or AGM, typically 70–90 Ah" },
    ],
    registration: "some-models",
    note:
      "Check whether your Kia has stop-start (an 'A' button with an arrow circling it). If it does, it needs an EFB or AGM battery, not a basic flooded one.",
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    short: "Mercedes",
    hook: "AGM batteries and registration for C, E, S-Class, GLE, GLS and G-Class.",
    intro:
      "Almost every recent Mercedes-Benz uses an AGM main battery, and many also carry a small auxiliary battery that supports stop-start and the electronics. Fitting the wrong type or skipping registration is the most common reason a new battery in a Mercedes fails early.",
    models: [
      { name: "C-Class / CLA / A-Class", battery: "AGM, typically 70–80 Ah" },
      { name: "E-Class / GLC", battery: "AGM, typically 80–95 Ah" },
      { name: "S-Class / GLE / GLS", battery: "AGM, typically 92–105 Ah, plus auxiliary" },
      { name: "G-Class", battery: "AGM, typically 92–105 Ah" },
    ],
    registration: "usually",
    note:
      "When the auxiliary battery fails you'll often see a 'Malfunction auxiliary battery' or stop-start warning. It's a separate, smaller battery and can be tested and replaced on site.",
  },
  {
    slug: "bmw",
    name: "BMW",
    hook: "AGM batteries with registration (IBS) for 3, 5, 7 Series, X5, X6 and X7.",
    intro:
      "BMW uses an intelligent battery sensor (IBS) and a battery management system that tracks the battery's age and adjusts charging. Every battery change on a modern BMW should be registered — otherwise the car keeps charging the new battery as if it were the old, worn one.",
    models: [
      { name: "1 / 2 / 3 Series", battery: "AGM, typically 70–80 Ah" },
      { name: "4 / 5 Series / X3 / X4", battery: "AGM, typically 80–92 Ah" },
      { name: "7 Series / X5 / X6 / X7", battery: "AGM, typically 92–105 Ah" },
    ],
    registration: "usually",
    note:
      "Many BMWs have the battery in the boot, not under the bonnet, with a remote jump point up front. Tell us the model so the technician comes prepared for a boot-mounted battery.",
  },
  {
    slug: "land-rover",
    name: "Land Rover & Range Rover",
    short: "Range Rover",
    hook: "Range Rover, Sport, Velar, Defender and Discovery — AGM fitted and registered.",
    intro:
      "Range Rover, Range Rover Sport, Velar, Defender and Discovery are extremely electrically demanding vehicles. They use large AGM batteries, often with an auxiliary battery as well, and are sensitive to low voltage — a weak battery can trigger a cascade of unrelated-looking warnings.",
    models: [
      { name: "Range Rover / Range Rover Sport", battery: "AGM, typically 90–105 Ah, often with auxiliary" },
      { name: "Velar / Evoque", battery: "AGM, typically 70–90 Ah" },
      { name: "Defender (new)", battery: "AGM, typically 90–105 Ah, plus auxiliary" },
      { name: "Discovery / Discovery Sport", battery: "AGM, typically 80–105 Ah" },
    ],
    registration: "usually",
    note:
      "If your Range Rover shows several warnings at once (suspension, parking sensors, 'Low battery – switch off systems'), test the battery before booking a diagnostic — low voltage is a common cause.",
  },
  {
    slug: "chevrolet",
    name: "Chevrolet & GMC",
    short: "Chevrolet",
    hook: "Tahoe, Yukon, Silverado, Traverse, Malibu — heavy-duty batteries fitted on site.",
    intro:
      "Chevrolet and GMC trucks and SUVs — Tahoe, Suburban, Yukon, Silverado, Sierra and Traverse — are common in the UAE. The big V8 SUVs use large batteries, and many recent GM models have stop-start that calls for AGM.",
    models: [
      { name: "Tahoe / Suburban / Yukon", battery: "Conventional or AGM, typically 80–100 Ah" },
      { name: "Silverado / Sierra", battery: "Conventional or AGM, typically 80–100 Ah" },
      { name: "Traverse / Captiva", battery: "Conventional or AGM, typically 60–80 Ah" },
      { name: "Malibu / Spark", battery: "Conventional or AGM, typically 45–70 Ah" },
    ],
    registration: "some-models",
    note:
      "Many GM trucks use US group sizes (for example 48/H6 or 94R/H7) rather than the Japanese sizes common in the UAE. Matching the size and terminal layout matters — send a photo of the label if unsure.",
  },
  {
    slug: "ford",
    name: "Ford",
    hook: "Explorer, Expedition, Edge, F-150, Ranger, Mustang — battery replacement in Dubai.",
    intro:
      "Ford's Explorer, Expedition, Edge, Ranger, F-150 and Mustang are all common in Dubai. Most recent Fords with auto start-stop use AGM batteries and have a battery monitoring system that should be reset after a change.",
    models: [
      { name: "Explorer / Expedition", battery: "AGM or conventional, typically 70–92 Ah" },
      { name: "F-150 / Ranger", battery: "AGM or conventional, typically 70–92 Ah" },
      { name: "Edge / Territory", battery: "AGM or conventional, typically 60–80 Ah" },
      { name: "Mustang", battery: "AGM or conventional, typically 60–80 Ah" },
    ],
    registration: "some-models",
    note:
      "On Fords with a battery monitoring sensor, skipping the reset can cause stop-start to stop working or the car to undercharge the new battery. The technician resets it after fitting where the car requires it.",
  },
];

export function makePath(m: Make): string {
  return `/${m.slug}-battery-replacement-dubai/`;
}

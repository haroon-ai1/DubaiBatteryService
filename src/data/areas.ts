/**
 * Dubai areas with their own landing page at
 * /car-battery-replacement-{slug}/.
 *
 * Every area carries its OWN written paragraphs (intro, access, local
 * notes). The page template adds shared service facts around them, but
 * the area-specific copy is what keeps these pages from being thin
 * near-duplicates — do not add an area without writing its paragraphs.
 */

export type AreaKind = "towers" | "villas" | "mixed" | "business" | "industrial";

export interface Area {
  slug: string;
  name: string;
  /** Short name used in tight UI (chips). Defaults to name. */
  short?: string;
  zone: "Dubai Marina & JLT" | "Central Dubai" | "Old Dubai" | "Villa communities" | "New Dubai" | "East Dubai";
  kind: AreaKind;
  /** One-sentence hook used in cards and meta descriptions. */
  hook: string;
  /** 2–3 sentences unique to this area. */
  intro: string;
  /** Where cars are actually parked here and what that means for the job. */
  access: string;
  /** A local detail worth knowing (traffic, heat, typical cars, etc.). */
  local: string;
  landmarks: string[];
  /** Slugs of neighbouring areas (must exist in AREAS). */
  nearby: string[];
}

export const AREAS: Area[] = [
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    zone: "Dubai Marina & JLT",
    kind: "towers",
    hook: "Tower basements, valet bays and waterfront parking — covered day and night.",
    intro:
      "Dubai Marina is almost entirely high-rise, which means most dead batteries here are discovered in a basement car park rather than on the street. A car that sits for a week while its owner travels, parked on a lower level with the air conditioning of the building but none of the airflow of the open road, is the classic Marina call-out.",
    access:
      "Most Marina towers have multi-level basement parking with height limits around 2.1 m. Technicians arrive with a compact service vehicle and portable equipment, so the job is normally done at your bay. It helps to tell us the tower name, the basement level and whether security needs to log a visitor vehicle.",
    local:
      "Traffic along Al Marsa Street and the Marina Walk loop is slow in the evenings, so share a precise pin when you message — it saves minutes finding the right entrance ramp.",
    landmarks: ["Marina Walk", "Marina Mall", "Dubai Marina Metro", "Al Marsa Street"],
    nearby: ["jbr", "jlt", "palm-jumeirah", "al-barsha"],
  },
  {
    slug: "jbr",
    name: "JBR (Jumeirah Beach Residence)",
    short: "JBR",
    zone: "Dubai Marina & JLT",
    kind: "towers",
    hook: "Battery help at JBR — residents' basements, The Walk and beach-side parking.",
    intro:
      "JBR combines residential towers with one of the city's busiest beachfront strips. Batteries here fail in two ways: slowly, in residents' cars that sit in basement parking, and suddenly, when a visitor returns to a car that has been baking in an open-air beach lot all afternoon.",
    access:
      "Resident parking in the JBR clusters is underground and accessed from The Walk service roads. Visitor and beach parking is open-air. Both are reachable — let us know which cluster (Shams, Amwaj, Rimal, Bahar, Murjan or Sadaf) or which public lot you're in.",
    local:
      "Weekend and holiday traffic on JBR's single-lane loop can be heavy. If you're in a paid public lot, keep your ticket valid while you wait so the car isn't moved.",
    landmarks: ["The Walk", "The Beach", "Ain Dubai / Bluewaters", "JBR clusters"],
    nearby: ["dubai-marina", "palm-jumeirah", "jlt"],
  },
  {
    slug: "jlt",
    name: "Jumeirah Lake Towers (JLT)",
    short: "JLT",
    zone: "Dubai Marina & JLT",
    kind: "mixed",
    hook: "Home and office towers across all JLT clusters, A to Z.",
    intro:
      "JLT is a mix of residential and office towers arranged in lettered clusters around the lakes. Office workers who come down at 6pm to a car that won't turn over make up a large share of JLT call-outs — the battery was fine that morning, and eight hours in a hot podium car park finished it off.",
    access:
      "Parking is split between tower basements, podium levels and open surface lots around each cluster. Send the cluster letter and tower name; the technician will come to the bay rather than asking you to move the car.",
    local:
      "Sheikh Zayed Road and the JLT interchange are the main approach, so response is usually quick from the Marina side. The JLT Metro stations make it easy to meet the technician if you've walked away from the car.",
    landmarks: ["JLT lakes", "DMCC Metro", "JLT Metro", "Cluster towers A–Z"],
    nearby: ["dubai-marina", "jbr", "al-barsha", "jvc"],
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    zone: "Dubai Marina & JLT",
    kind: "mixed",
    hook: "Villas on the fronds, Shoreline apartments and hotel parking on the Palm.",
    intro:
      "The Palm has two very different call-out patterns: apartment residents on the trunk (Shoreline, Golden Mile, Tiara) whose cars sit in basements, and villa owners on the fronds with larger SUVs and premium cars that often need AGM batteries and electronic battery registration.",
    access:
      "Frond villas usually have a driveway or carport, which makes for an easy job. For trunk apartments and hotels, share the building name and parking level. Gate security on the fronds may call you to confirm the visit.",
    local:
      "Many Palm vehicles are European or large SUVs — Range Rover, Mercedes, BMW, Land Cruiser — so tell us the exact model. The right AGM/EFB battery and registration tool come with the technician.",
    landmarks: ["The Crescent", "Golden Mile", "Shoreline Apartments", "Nakheel Mall"],
    nearby: ["dubai-marina", "jbr", "jumeirah", "al-barsha"],
  },
  {
    slug: "al-barsha",
    name: "Al Barsha",
    zone: "New Dubai",
    kind: "mixed",
    hook: "Al Barsha 1, 2 and 3, Barsha Heights and around Mall of the Emirates.",
    intro:
      "Al Barsha mixes low-rise apartment blocks, villas in Barsha 2 and 3, and the busy retail core around Mall of the Emirates. A lot of Barsha cars are street-parked or in open-air building lots, which means full daytime sun — one of the hardest environments in the city for a battery.",
    access:
      "Street parking and open building lots make for fast, straightforward jobs. If you're at the mall, tell us the car-park zone and level; the technician will come to you rather than asking you to exit.",
    local:
      "Barsha is well-connected by Sheikh Zayed Road and Al Khail Road, so response from either side of the city tends to be quick.",
    landmarks: ["Mall of the Emirates", "Barsha Heights (Tecom)", "Al Barsha Pond Park", "Sheikh Zayed Road"],
    nearby: ["al-quoz", "jvc", "jlt", "dubai-hills-estate"],
  },
  {
    slug: "jvc",
    name: "Jumeirah Village Circle (JVC)",
    short: "JVC",
    zone: "New Dubai",
    kind: "mixed",
    hook: "Apartments, townhouses and villas across every JVC district.",
    intro:
      "JVC is one of Dubai's densest residential communities — mid-rise apartment buildings, townhouses and villas across its districts. Many residents commute daily on Al Khail and Hessa Street, so short-hop driving and constant heat soak are common reasons batteries give out here.",
    access:
      "Most JVC buildings have podium or basement parking; townhouses and villas have driveways. JVC's circular road layout can be confusing, so please share a live location pin rather than just a building name.",
    local:
      "Neighbouring JVT, Al Barsha South and Sports City are covered too — if you're on the edge of JVC, just send the pin.",
    landmarks: ["Circle Mall", "JVC districts 10–18", "Hessa Street", "Al Khail Road"],
    nearby: ["al-barsha", "motor-city", "dubai-hills-estate", "jlt"],
  },
  {
    slug: "motor-city",
    name: "Motor City & Sports City",
    short: "Motor City",
    zone: "New Dubai",
    kind: "mixed",
    hook: "Uptown Motor City, Green Community, Sports City and nearby.",
    intro:
      "Motor City and Dubai Sports City sit side by side off Hessa Street and Sheikh Mohammed Bin Zayed Road. The area has a lot of mid-rise apartments plus townhouses and villas in Green Community, and a higher-than-average share of performance and enthusiast cars.",
    access:
      "Apartment buildings typically have covered podium parking; villas and townhouses have driveways. Both are easy to reach. If you're at the Autodrome or a sports venue, share the exact car-park gate.",
    local:
      "Performance and modified cars often run AGM batteries or non-standard sizes. Send a photo of the battery label and we'll confirm the correct replacement before the technician sets off.",
    landmarks: ["Dubai Autodrome", "Uptown Motor City", "Green Community", "Dubai Sports City"],
    nearby: ["jvc", "arabian-ranches", "dubai-hills-estate", "al-barsha"],
  },
  {
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    short: "Dubai Hills",
    zone: "Villa communities",
    kind: "villas",
    hook: "Villas, townhouses and apartments around Dubai Hills Mall and Park.",
    intro:
      "Dubai Hills Estate is a newer master community — villas and townhouses around the golf course, apartment buildings near the mall and park. Cars here skew newer, which means more stop-start systems, more EFB and AGM batteries, and more vehicles that need registration after a battery change.",
    access:
      "Villa driveways and townhouse carports are easy access. For the apartment buildings, share the building name and parking level. Community security may ask for the technician's details at the gate.",
    local:
      "Newer cars are less forgiving of the wrong battery type. Tell us the make, model and year so the correct stop-start battery comes with the technician.",
    landmarks: ["Dubai Hills Mall", "Dubai Hills Park", "Dubai Hills Golf Club", "Al Khail Road"],
    nearby: ["al-barsha", "arabian-ranches", "jvc", "al-quoz"],
  },
  {
    slug: "arabian-ranches",
    name: "Arabian Ranches",
    zone: "Villa communities",
    kind: "villas",
    hook: "Villa driveway battery replacement across Arabian Ranches 1, 2 and 3.",
    intro:
      "Arabian Ranches is gated villa living with plenty of family SUVs — Land Cruisers, Patrols, Pajeros and Range Rovers. The most common call is a car that's been parked in the driveway for a few days over summer and simply won't start on a school morning.",
    access:
      "Driveway jobs are the easiest there are. Gate security will usually need your villa number and name to let the technician in; letting them know in advance speeds things up.",
    local:
      "Large SUVs usually take big batteries (often 80–105 Ah), and many recent models need AGM. Having the model and year ready means the right size arrives the first time.",
    landmarks: ["Arabian Ranches Golf Club", "Ranches Souk", "Al Qudra Road", "Arabian Ranches 2 & 3"],
    nearby: ["motor-city", "dubai-hills-estate", "jvc"],
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    short: "Downtown",
    zone: "Central Dubai",
    kind: "towers",
    hook: "Towers, hotels and Dubai Mall parking around Burj Khalifa.",
    intro:
      "Downtown Dubai is towers, hotels and the Dubai Mall car parks — which between them hold thousands of cars at any moment. A good share of Downtown call-outs are visitors who come back to a car that won't start after an evening at the Fountain or the mall.",
    access:
      "Downtown towers have deep basements and the Dubai Mall parking is split into named zones (Grand, Cinema, Fashion and so on). Tell us the zone, level and nearest pillar number, and keep the car where it is — the technician comes to the bay.",
    local:
      "Evening traffic around the Boulevard and Financial Centre Road is heavy. A precise pin and parking zone save more time than anything else here.",
    landmarks: ["Burj Khalifa", "The Dubai Mall", "Mohammed Bin Rashid Boulevard", "Dubai Opera"],
    nearby: ["business-bay", "difc", "al-quoz", "jumeirah"],
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    zone: "Central Dubai",
    kind: "business",
    hook: "Office and residential towers along the Canal — basements and podiums.",
    intro:
      "Business Bay is dense with office towers and newer residential buildings along the Dubai Water Canal. Weekday office parking and cars that sit through long working days in hot podium levels are the typical pattern — the battery is fine at 8am and flat at 7pm.",
    access:
      "Nearly all parking is in tower basements or multi-level podiums. Share the building name, level and bay number. Some office towers ask visitor vehicles to register at the ramp — if yours does, mention it when you message.",
    local:
      "Al Khail Road, Sheikh Zayed Road and the Canal bridges surround the district, so reaching Business Bay is quick even at peak times.",
    landmarks: ["Dubai Water Canal", "Bay Avenue", "Business Bay Metro", "Marasi Drive"],
    nearby: ["downtown-dubai", "difc", "al-quoz", "jumeirah"],
  },
  {
    slug: "difc",
    name: "DIFC",
    zone: "Central Dubai",
    kind: "business",
    hook: "Gate Village, office towers and hotel parking in DIFC.",
    intro:
      "DIFC is Dubai's financial district: office towers, Gate Village, restaurants and hotels. Many cars here are premium European saloons — BMW, Mercedes, Audi, Porsche — that use AGM batteries and need the new battery registered to the car's electronics after fitting.",
    access:
      "Parking is mostly in building basements and the central DIFC car parks. Tell us the car-park name, level and bay; the technician brings portable equipment down to the car.",
    local:
      "If your car is a recent European model, mention it when you message. Fitting the right AGM battery without registering it is one of the most common reasons a new battery fails early.",
    landmarks: ["Gate Village", "ICD Brookfield Place", "Emirates Towers", "Financial Centre Metro"],
    nearby: ["downtown-dubai", "business-bay", "jumeirah", "bur-dubai"],
  },
  {
    slug: "jumeirah",
    name: "Jumeirah",
    zone: "Central Dubai",
    kind: "villas",
    hook: "Villas and beach roads across Jumeirah 1, 2 and 3 and Umm Suqeim.",
    intro:
      "Jumeirah — from Jumeirah 1 near La Mer down through Umm Suqeim — is mostly villas and low-rise, with Jumeirah Beach Road and Al Wasl Road as its spines. Cars live on driveways and street-side bays in full sun, which is hard on batteries through the summer months.",
    access:
      "Driveways and street parking make for quick jobs. For beach and park car parks, share the gate or entrance you used so the technician parks close by.",
    local:
      "Al Wasl Road and Jumeirah Beach Road both run the length of the district, so tell us the nearest landmark or cross street along with your pin.",
    landmarks: ["La Mer", "Kite Beach", "Burj Al Arab", "Al Wasl Road"],
    nearby: ["downtown-dubai", "al-quoz", "palm-jumeirah", "business-bay"],
  },
  {
    slug: "al-quoz",
    name: "Al Quoz",
    zone: "Central Dubai",
    kind: "industrial",
    hook: "Workshops, warehouses, galleries and residential Al Quoz 1–4.",
    intro:
      "Al Quoz is Dubai's workshop and warehouse district, with Alserkal Avenue's galleries and residential pockets mixed in. Commercial vehicles, pickups and fleet cars are common here, as are cars left at a garage whose battery has gone flat while waiting for a part.",
    access:
      "Most parking is open-air on the street or in warehouse yards. Share the warehouse number or plot, and let us know if the vehicle is inside a closed yard so the technician can be let in.",
    local:
      "Pickups, vans and light commercials often use larger or heavy-duty batteries. Send a photo of the existing label for a quick, correct match.",
    landmarks: ["Alserkal Avenue", "Al Quoz Industrial 1–4", "Al Khail Road", "Times Square Center"],
    nearby: ["al-barsha", "downtown-dubai", "business-bay", "jumeirah"],
  },
  {
    slug: "bur-dubai",
    name: "Bur Dubai",
    zone: "Old Dubai",
    kind: "mixed",
    hook: "Karama, Mankhool, Oud Metha and around BurJuman.",
    intro:
      "Bur Dubai covers some of the city's oldest and busiest neighbourhoods — Mankhool, Karama, Oud Metha and the area around BurJuman. Parking is tight and mostly on-street or in older building lots, and cars are often left parked for days at a time.",
    access:
      "Street parking and small building lots are the norm. A precise pin is essential in Bur Dubai's narrow streets; if you're in a paid street bay, the technician can usually pull in alongside.",
    local:
      "Older and high-mileage cars are common here. A quick battery and alternator test on arrival confirms whether it's really the battery before anything is replaced.",
    landmarks: ["BurJuman", "Karama", "Mankhool", "Dubai Creek (Bur Dubai side)"],
    nearby: ["deira", "difc", "downtown-dubai", "al-quoz"],
  },
  {
    slug: "deira",
    name: "Deira",
    zone: "Old Dubai",
    kind: "mixed",
    hook: "Deira, Al Rigga, Port Saeed and around City Centre Deira.",
    intro:
      "Deira is historic, commercial and densely built, from the souks by the Creek to Al Rigga, Port Saeed and City Centre Deira. Many vehicles here are working cars — taxis, delivery vans, family saloons — that rack up heavy daily use in the heat.",
    access:
      "On-street parking, building lots and mall car parks. In Deira's busier streets the technician will call when close to agree the exact meeting point.",
    local:
      "If the car is a working vehicle, tell us — getting it back on the road fast matters, and the technician will prioritise a same-visit replacement where the test calls for it.",
    landmarks: ["City Centre Deira", "Al Rigga", "Port Saeed", "Gold Souk"],
    nearby: ["bur-dubai", "al-qusais", "mirdif", "international-city"],
  },
  {
    slug: "al-qusais",
    name: "Al Qusais",
    zone: "East Dubai",
    kind: "mixed",
    hook: "Al Qusais residential, industrial areas and Al Nahda border.",
    intro:
      "Al Qusais spans residential blocks, schools and the Al Qusais industrial areas near the Sharjah border. Many residents commute on Airport Road and Damascus Street, and plenty of cars sit outdoors all day — tough on batteries from May to October.",
    access:
      "Open building lots, street parking and industrial yards. Share the building or plot and a pin; the technician will call on approach.",
    local:
      "We cover the Dubai side of Al Nahda and Al Qusais. For Sharjah addresses just across the border, message first so we can confirm availability.",
    landmarks: ["Al Qusais Industrial Area", "Al Nahda (Dubai)", "Damascus Street", "Stadium Metro"],
    nearby: ["deira", "mirdif", "international-city"],
  },
  {
    slug: "mirdif",
    name: "Mirdif",
    zone: "East Dubai",
    kind: "villas",
    hook: "Villas and Uptown Mirdif — driveway battery replacement.",
    intro:
      "Mirdif is a long-established villa community near the airport, with Uptown Mirdif and City Centre Mirdif as its hubs. Family cars and SUVs parked on driveways in full sun are the norm, and summer is when most Mirdif batteries give up.",
    access:
      "Driveway and street-side parking — the easiest access there is. For City Centre Mirdif, share the parking colour zone and level.",
    local:
      "Mirdif is close to the airport road network, so response times are usually good from both Deira and the Al Khawaneej side.",
    landmarks: ["City Centre Mirdif", "Uptown Mirdif", "Mushrif Park", "Airport Road"],
    nearby: ["deira", "al-qusais", "international-city", "dubai-silicon-oasis"],
  },
  {
    slug: "international-city",
    name: "International City",
    zone: "East Dubai",
    kind: "mixed",
    hook: "Every International City cluster, plus Warsan and Dragon Mart.",
    intro:
      "International City is a large residential district of country-themed clusters, next to Dragon Mart. Parking is almost all open-air, directly in the sun, which shortens battery life noticeably compared with covered parking.",
    access:
      "Open lots beside each building. The clusters look similar, so send the cluster name, building number and a pin.",
    local:
      "If you're shopping at Dragon Mart, tell us the entrance number nearest your car — the car parks there are huge.",
    landmarks: ["Dragon Mart", "China / England / France clusters", "Warsan", "Al Awir Road"],
    nearby: ["dubai-silicon-oasis", "mirdif", "al-qusais", "deira"],
  },
  {
    slug: "dubai-silicon-oasis",
    name: "Dubai Silicon Oasis",
    short: "Silicon Oasis",
    zone: "East Dubai",
    kind: "mixed",
    hook: "DSO apartments, villas and tech-park offices off Al Ain Road.",
    intro:
      "Dubai Silicon Oasis combines a technology park with residential towers and villa clusters, just off the Dubai–Al Ain Road. It's a commuter area: many cars do a short drive to the office and back, which never fully recharges a battery that's already weakened by the heat.",
    access:
      "Apartment basements and podiums, villa driveways and office surface lots. Share the building or villa name plus a pin.",
    local:
      "Short commutes are a common cause of repeat flat batteries. The on-site test checks the charging system too, so you know whether it's the battery or something else.",
    landmarks: ["DSO Headquarters", "Silicon Central Mall", "Dubai–Al Ain Road", "Cedre Villas"],
    nearby: ["international-city", "mirdif", "al-qusais"],
  },
];

export const AREA_BY_SLUG = new Map(AREAS.map((a) => [a.slug, a]));

export function areaPath(a: Area): string {
  return `/car-battery-replacement-${a.slug}/`;
}

export function areaId(a: Area): string {
  return a.slug.replace(/-/g, "_");
}

export const AREA_ZONES = [
  "Dubai Marina & JLT",
  "New Dubai",
  "Villa communities",
  "Central Dubai",
  "Old Dubai",
  "East Dubai",
] as const;

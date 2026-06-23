// Service-area facts — single source of truth for location coverage.
// Mirrors standards/company-facts.md ("Service area") and the verified
// 221-zip list extracted from porch_home_warranty_zips.xlsx.
//
// IMPORTANT: this data is rendered as static, server-side HTML on
// /service-area so search crawlers can reach every city, county and zip
// without executing JS. Keep it copy-safe (advertising language, no
// definitive guarantees) and edit coverage here, not in components.
//
// In-home appliance service only — TV, audio and commercial microwave
// work is drop-off at the Lincoln shop regardless of zip.

export interface ZipRegion {
  /** Display name for the region heading. */
  name: string;
  /** Two-letter state code. */
  state: "NE" | "IA";
  /** Short, benefit-led description of what the region covers. */
  description: string;
  /** Covered zip codes within this region. */
  zips: string[];
}

export const ZIP_REGIONS: ZipRegion[] = [
  {
    name: "Lincoln (city)",
    state: "NE",
    description: "Every Lincoln zip code, our home base since 1947.",
    zips: [
      "68501", "68502", "68503", "68504", "68505", "68506", "68507", "68508",
      "68509", "68510", "68512", "68514", "68516", "68517", "68520", "68521",
      "68522", "68523", "68524", "68526", "68527", "68528", "68529", "68531",
      "68532", "68542", "68544", "68572", "68583", "68588",
    ],
  },
  {
    name: "Lincoln metro & surrounding communities",
    state: "NE",
    description: "The towns and rural routes ringing Lincoln.",
    zips: [
      "68401", "68402", "68403", "68404", "68405", "68407", "68409", "68410",
      "68413", "68417", "68418", "68419", "68422", "68423", "68424", "68428",
      "68430", "68434", "68438", "68443", "68444", "68445", "68446", "68448",
      "68453", "68454", "68455", "68460", "68461", "68462", "68463", "68464",
      "68465", "68467",
    ],
  },
  {
    name: "Omaha (city)",
    state: "NE",
    description: "Greater Omaha, east to the Missouri River.",
    zips: [
      "68101", "68102", "68103", "68104", "68105", "68106", "68107", "68108",
      "68109", "68110", "68111", "68112", "68114", "68116", "68117", "68118",
      "68119", "68120", "68122", "68123", "68124", "68127", "68128", "68130",
      "68131", "68132", "68133", "68134", "68135", "68136", "68137", "68138",
      "68139", "68142", "68144", "68145", "68147", "68152", "68154", "68155",
      "68157", "68164", "68172", "68175", "68176", "68178", "68179", "68180",
      "68181", "68182", "68183", "68197", "68198",
    ],
  },
  {
    name: "Omaha metro & eastern suburbs",
    state: "NE",
    description: "The Sarpy, Saunders and Washington county suburbs around Omaha.",
    zips: [
      "68002", "68003", "68005", "68007", "68008", "68009", "68010", "68014",
      "68015", "68016", "68017", "68018", "68022", "68023", "68025", "68026",
      "68028", "68033", "68034", "68036", "68037", "68040", "68041", "68042",
      "68046", "68048", "68050", "68054", "68056", "68058", "68059", "68064",
      "68065", "68066", "68068", "68069", "68070", "68073",
    ],
  },
  {
    name: "Council Bluffs",
    state: "IA",
    description: "Council Bluffs and the surrounding western Iowa communities.",
    zips: [
      "51501", "51502", "51503", "51510", "51526", "51534", "51542", "51548",
      "51551", "51561", "51576",
    ],
  },
  {
    name: "Southeast Nebraska",
    state: "NE",
    description: "Nebraska City, Ashland, Seward and the wider southeast.",
    zips: [
      "68301", "68304", "68307", "68310", "68313", "68314", "68316", "68317",
      "68319", "68320", "68321", "68324", "68328", "68329", "68330", "68331",
      "68332", "68333", "68336", "68338", "68339", "68341", "68343", "68344",
      "68346", "68347", "68348", "68349", "68351", "68354", "68357", "68358",
      "68359", "68360", "68364", "68366", "68368", "68371", "68372", "68379",
      "68382",
    ],
  },
  {
    name: "North & central Nebraska",
    state: "NE",
    description: "Communities along the corridor toward central Nebraska.",
    zips: ["68621", "68626", "68635", "68648", "68649"],
  },
  {
    name: "Grand Island",
    state: "NE",
    description: "Grand Island and the central Nebraska towns nearby.",
    zips: ["68801", "68802", "68803", "68810", "68818", "68832", "68841", "68843", "68865"],
  },
];

/** Flat list of every covered zip — handy for counts and lookups. */
export const COVERED_ZIPS: string[] = ZIP_REGIONS.flatMap((r) => r.zips);

/** Total covered zip codes (advertised as "200+"). */
export const COVERED_ZIP_COUNT = COVERED_ZIPS.length;

export interface ServedPlace {
  name: string;
  state: "NE" | "IA";
}

/** Cities called out by name (schema.org areaServed + on-page list). */
export const SERVED_CITIES: ServedPlace[] = [
  { name: "Lincoln", state: "NE" },
  { name: "Omaha", state: "NE" },
  { name: "Grand Island", state: "NE" },
  { name: "Council Bluffs", state: "IA" },
  { name: "Nebraska City", state: "NE" },
  { name: "Ashland", state: "NE" },
  { name: "Seward", state: "NE" },
];

/** Counties called out by name (schema.org areaServed + on-page list). */
export const SERVED_COUNTIES: ServedPlace[] = [
  { name: "Lancaster County", state: "NE" },
  { name: "Douglas County", state: "NE" },
  { name: "Saunders County", state: "NE" },
  { name: "Cass County", state: "NE" },
  { name: "Saline County", state: "NE" },
];

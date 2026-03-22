// 221 covered zip codes extracted from porch_home_warranty_zips.xlsx
// Appliance in-home service only — TV/Audio/Commercial are drop-off at Lincoln shop

export const COVERED_ZIPS = [
  // Council Bluffs, IA
  "51501","51502","51503","51510","51526","51534","51542","51548",
  "51551","51561","51576",
  // Omaha Metro East (NE side)
  "68002","68003","68005","68007","68008","68009","68010","68014",
  "68015","68016","68017","68018","68022","68023","68025","68026",
  "68028","68033","68034","68036","68037","68040","68041","68042",
  "68046","68048","68050","68054","68056","68058","68059","68064",
  "68065","68066","68068","68069","68070","68073",
  // Omaha City
  "68101","68102","68103","68104","68105","68106","68107","68108",
  "68109","68110","68111","68112","68114","68116","68117","68118",
  "68119","68120","68122","68123","68124","68127","68128","68130",
  "68131","68132","68133","68134","68135","68136","68137","68138",
  "68139","68142","68144","68145","68147","68152","68154","68155",
  "68157","68164","68172","68175","68176","68178","68179","68180",
  "68181","68182","68183","68197","68198",
  // Southeast Nebraska
  "68301","68304","68307","68310","68313","68314","68316","68317",
  "68319","68320","68321","68324","68328","68329","68330","68331",
  "68332","68333","68336","68338","68339","68341","68343","68344",
  "68346","68347","68348","68349","68351","68354","68357","68358",
  "68359","68360","68364","68366","68368","68371","68372","68382",
  "68379",
  // Lincoln Metro
  "68401","68402","68403","68404","68405","68407","68409","68410",
  "68413","68417","68418","68419","68422","68423","68424","68428",
  "68430","68434","68438","68443","68444","68445","68446","68448",
  "68453","68454","68455","68460","68461","68462","68463","68464",
  "68465","68467",
  // Lincoln City
  "68501","68502","68503","68504","68505","68506","68507","68508",
  "68509","68510","68512","68514","68516","68517","68520","68521",
  "68522","68523","68524","68526","68527","68528","68529","68531",
  "68532","68542","68544","68572","68583","68588",
  // North / Central Nebraska
  "68621","68626","68635","68648","68649",
  // Grand Island
  "68801","68802","68803","68810","68818","68832","68841","68843",
  "68865",
] as const;

// Lincoln city + immediate Lincoln metro zips
const LINCOLN_ZIPS = new Set<string>(
  COVERED_ZIPS.filter((z) => z.startsWith("685") || z.startsWith("684"))
);

// Omaha city + immediate Omaha metro zips (includes Bellevue, Papillion, etc.)
const OMAHA_ZIPS = new Set<string>(
  COVERED_ZIPS.filter((z) => z.startsWith("681") || z.startsWith("680"))
);

// Council Bluffs (Omaha-adjacent, same tier)
const COUNCIL_BLUFFS_ZIPS = new Set<string>(
  COVERED_ZIPS.filter((z) => z.startsWith("515"))
);

/**
 * Returns the diagnostic fee for a given zip code.
 * - Drop-off services (TV, audio, commercial): always $42.90
 * - In-home (Lincoln/Omaha/Council Bluffs area): $149.08
 * - In-home (extended — Grand Island, SE NE, etc.): $175.08
 * - Not covered: null
 * All fees are deductible toward the final repair.
 */
export function getDiagnosticFee(zip: string): {
  amount: string;
  tier: "lincoln-omaha" | "extended";
} | null {
  if (LINCOLN_ZIPS.has(zip) || OMAHA_ZIPS.has(zip) || COUNCIL_BLUFFS_ZIPS.has(zip)) {
    return { amount: "$149.08", tier: "lincoln-omaha" };
  }
  if ((COVERED_ZIPS as readonly string[]).includes(zip)) {
    return { amount: "$175.08", tier: "extended" };
  }
  return null;
}

export const SERVICE_REGIONS = [
  {
    name: "Lincoln",
    state: "NE",
    description: "All Lincoln zip codes + surrounding communities",
    center: { lat: 40.8136, lng: -96.7026 },
    zips: COVERED_ZIPS.filter((z) => z.startsWith("685")),
  },
  {
    name: "Omaha",
    state: "NE",
    description: "Greater Omaha metro area",
    center: { lat: 41.2565, lng: -95.9345 },
    zips: COVERED_ZIPS.filter((z) => z.startsWith("681")),
  },
  {
    name: "Council Bluffs",
    state: "IA",
    description: "Council Bluffs and surrounding Iowa communities",
    center: { lat: 41.2619, lng: -95.8608 },
    zips: COVERED_ZIPS.filter((z) => z.startsWith("515")),
  },
  {
    name: "Southeast Nebraska",
    state: "NE",
    description: "Southeast Nebraska communities",
    center: { lat: 40.5, lng: -96.8 },
    zips: COVERED_ZIPS.filter(
      (z) => z.startsWith("683") || z.startsWith("684") || z === "68379"
    ),
  },
  {
    name: "Grand Island",
    state: "NE",
    description: "Grand Island and central Nebraska",
    center: { lat: 40.9247, lng: -98.3420 },
    zips: COVERED_ZIPS.filter((z) => z.startsWith("688")),
  },
  {
    name: "North Omaha Suburbs",
    state: "NE",
    description: "North and west Omaha suburbs",
    center: { lat: 41.35, lng: -96.15 },
    zips: COVERED_ZIPS.filter(
      (z) =>
        ["68002","68003","68007","68022","68023","68025","68026","68028",
         "68033","68034","68064","68066","68068","68069","68070","68073",
         "68621","68626","68635","68648","68649"].includes(z)
    ),
  },
] as const;

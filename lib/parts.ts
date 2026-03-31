export interface DiagnosisGuide {
  noiseTriage: Array<{
    noise: string;
    verdict: string;
    detail: string;
  }>;
  noSpinNote: string;
  repairSteps: string[];
}

export interface Part {
  id: string;
  slug: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  condition: "new" | "refurbished" | "used";
  availability: "in_stock" | "out_of_stock" | "preorder" | "backorder";
  mpn: string;
  image_link: string;
  category: string;
  // Extended detail fields (optional — render conditionally on product detail page)
  specs?: Record<string, string>;
  symptoms?: string[];
  compatibleModels?: Array<{ brand: string; model: string; description: string }>;
  replacesPartNumbers?: string[];
  installNotes?: string;
  diagnosisGuide?: DiagnosisGuide;
}

export const OEM_PARTS: Part[] = [
  {
    id: "MET-PART-001",
    slug: "samsung-dc31-00055g-dryer-drive-motor",
    title: "Samsung OEM Dryer Drive Motor DC31-00055G",
    description:
      "Genuine Samsung OEM replacement drive motor (DC31-00055G) for front-load dryers. This factory-original 120V, 1/3 HP induction motor drives the drum belt assembly, restoring proper rotation and resolving grinding noise, failure-to-start, and mid-cycle shutdown faults. Direct fit for 500+ Samsung and Kenmore front-load dryer models including DV2xx, DV3xx, and DV36J series. Supplied new in OEM packaging — same part installed at the factory.",
    brand: "Samsung",
    price: 54.29,
    condition: "new",
    availability: "in_stock",
    mpn: "DC31-00055G",
    image_link: "https://lh3.googleusercontent.com/placeholder-DC31-00055G",
    category: "Home & Garden > Appliances > Appliance Accessories > Washer & Dryer Parts & Accessories",
    specs: {
      "Part Type": "Dryer Drive Motor (Induction)",
      "Voltage": "120V / 60Hz",
      "Amperage": "6.2A",
      "Power": "1/3 HP",
      "Speed": "1725 RPM",
      "Thermal Class": "Class B",
      "Dimensions": '10-1/8" L × 5-7/8" W × 5-3/8" H',
      "Weight": "9 lbs",
      "Condition": "New — Genuine OEM",
    },
    symptoms: [
      "Drum not turning or spinning",
      "Motor hums but won't start",
      "Mechanical grinding noise during operation",
      "Drive belt not engaging or slipping",
      "Dryer stops mid-cycle unexpectedly",
    ],
    compatibleModels: [
      { brand: "Samsung", model: "DV210AEW",    description: "21\" Compact Electric Dryer (White)" },
      { brand: "Samsung", model: "DV220AEW",    description: "Electric Dryer (White)" },
      { brand: "Samsung", model: "DV231AEW",    description: "Electric Dryer (White)" },
      { brand: "Samsung", model: "DV231AGW",    description: "Gas Dryer (White)" },
      { brand: "Samsung", model: "DV330AEB",    description: "Electric Dryer (Black)" },
      { brand: "Samsung", model: "DV331AER",    description: "Electric Dryer (Red)" },
      { brand: "Samsung", model: "DV331AEW",    description: "Electric Dryer (White)" },
      { brand: "Samsung", model: "DV331AGR",    description: "Gas Dryer (Red)" },
      { brand: "Samsung", model: "DV331AGW",    description: "Gas Dryer (White)" },
      { brand: "Samsung", model: "DV350AEP",    description: "Electric Dryer (Platinum)" },
      { brand: "Samsung", model: "DV350AGP",    description: "Gas Dryer (Platinum)" },
      { brand: "Samsung", model: "DV361EWBEWR", description: "Electric Dryer (White/Red)" },
      { brand: "Samsung", model: "DV361GWBEWR", description: "Gas Dryer (White/Red)" },
      { brand: "Samsung", model: "DV363EWBEUF", description: "Electric Dryer — Canadian Model" },
      { brand: "Samsung", model: "DV365ETBGWR", description: "Electric Dryer (White/Red)" },
      { brand: "Samsung", model: "DV365GTBGWR", description: "Gas Dryer (White/Red)" },
      { brand: "Samsung", model: "DV36J4000EW", description: "Electric Dryer (White)" },
      { brand: "Samsung", model: "DV36J4000GW", description: "Gas Dryer (White)" },
      { brand: "Kenmore", model: "402.89032011", description: "Elite Front Load Electric Dryer" },
      { brand: "Kenmore", model: "402.89032012", description: "Elite Front Load Electric Dryer" },
      { brand: "Kenmore", model: "402.99032011", description: "Elite Front Load Electric Dryer" },
      { brand: "Kenmore", model: "402.99032012", description: "Elite Front Load Electric Dryer" },
    ],
    replacesPartNumbers: [
      "DC31-00055D",
      "DC31-00055H",
      "DFS270ZSEL1",
      "DFS270ZSEL3",
      "AP5331095",
      "AP5332630",
      "PS4204647",
      "PS4204648",
      "EAP4204648",
      "3989877",
      "2813208",
      "LP055H",
    ],
    installNotes:
      "Access the motor by removing the top panel, then front panel and drum. Compatible with both electric (AEW/AEB) and gas (AGW/AGR) Samsung dryer variants. Professional installation available — contact us to schedule.",
    diagnosisGuide: {
      noiseTriage: [
        {
          noise: "Mechanical grinding",
          verdict: "Motor likely needed",
          detail:
            "A deep grinding sound from the motor housing during a run cycle typically indicates bearing failure inside the motor. This part fixes that.",
        },
        {
          noise: "Scratching or scraping on the tub",
          verdict: "Not the motor",
          detail:
            "An intermittent scratching sound that changes with drum position means something is contacting the drum — check the drum seal, felt strips, or a foreign object caught between the drum and housing.",
        },
        {
          noise: "Rumbling or vibrating",
          verdict: "Check the blower fan first",
          detail:
            "Vibration is usually lint packed into the blower fan, not motor failure. The fan spins fast and even a small imbalance causes rumbling. Clean the fan before replacing the motor.",
        },
      ],
      noSpinNote:
        "A drum that won't spin is not always a bad motor. Before ordering, start a cycle and listen: are relays clicking on the main board? Use a multimeter to check that the motor terminals are receiving voltage. If the motor has power but won't run, it may be the motor. If there's no power at the motor, the fault is likely the main board, UI board, or wire harness — not the motor.",
      repairSteps: [
        "Confirm the diagnosis above, then unplug the dryer from the wall.",
        "Remove the top panel screws — check the rear edge of the top and the bottom lip of the top frame. Lift the top panel off.",
        "Remove front panel screws along the bottom lip. Disconnect any wire harnesses running to the door switch or moisture sensor on the door frame.",
        "Lift the front panel up to release the retaining clips at the top. For the UI control panel, push it back to pop the side clips, then pull it free.",
        "With the front removed, the drum is visible. The motor sits behind the blower fan at the rear of the drum, connected to the exhaust duct.",
        "Inspect the blower fan for lint. If the dryer was vibrating, a lint-packed fan is the likely cause — clean it and test before continuing.",
        "Remove the drum: reach under and unhook the drive belt from the idler pulley while holding tension, then pull the drum straight out.",
        "Remove the blower fan — it is reverse-thread, so turn it clockwise to loosen. If the fan is fused to the shaft, it may need to be forcibly removed; the fan housing can be broken to free the motor.",
        "Unscrew the motor from the blower duct assembly. Disconnect the motor wiring harness.",
        "Install the new motor, reconnect the harness, reassemble in reverse order. Reconnect belt to idler pulley before reinstalling drum.",
      ],
    },
  },
];

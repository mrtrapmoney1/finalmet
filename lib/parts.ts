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
  compatibleModels?: string[];
  replacesPartNumbers?: string[];
  installNotes?: string;
}

export const OEM_PARTS: Part[] = [
  {
    id: "MET-PART-001",
    slug: "samsung-dc31-00055g-dryer-drive-motor",
    title: "Samsung OEM Dryer Drive Motor DC31-00055G",
    description:
      "Genuine Samsung OEM induction dryer motor. Replaces the motor that turns the drive belt spinning the drum. Fixes drum-not-turning, motor-hums-but-won't-start, and loud-rumbling faults. Compatible with 500+ Samsung and Kenmore dryer models.",
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
      "Condition": "New — Genuine OEM",
    },
    symptoms: [
      "Drum not turning or spinning",
      "Motor hums but won't start",
      "Loud rumbling, squealing, or thumping during operation",
      "Dryer stops mid-cycle unexpectedly",
      "Drive belt not engaging or slipping",
    ],
    compatibleModels: [
      "Kenmore 402.89032011",
      "Kenmore 402.89032012",
      "Kenmore 402.99032011",
      "Kenmore 402.99032012",
      "Samsung DV210AEW",
      "Samsung DV220AEW",
      "Samsung DV231AEW",
      "Samsung DV231AGW",
      "Samsung DV330AEB",
      "Samsung DV331AER",
      "Samsung DV331AEW",
      "Samsung DV331AGR",
      "Samsung DV331AGW",
      "Samsung DV350AEP",
      "Samsung DV350AGP",
      "Samsung DV361EWBEWR",
      "Samsung DV361GWBEWR",
      "Samsung DV363EWBEUF",
      "Samsung DV365ETBGWR",
      "Samsung DV365GTBGWR",
      "Samsung DV36J4000EW",
      "Samsung DV36J4000GW",
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
      "Moderate DIY repair. Disconnect power before servicing. Access the motor by removing the dryer's front panel and drum. Compatible with both electric (AEW/AEB) and gas (AGW/AGR) Samsung dryer variants. Professional installation available — contact us to schedule.",
  },
];

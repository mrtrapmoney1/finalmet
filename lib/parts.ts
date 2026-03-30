export interface Part {
  id: string;
  slug: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  condition: "new" | "refurbished" | "used";
  availability: "in_stock" | "out_of_stock" | "preorder" | "backorder";
  mpn: string; // Manufacturer Part Number
  image_link: string;
  category: string; // Used for Google Product Category or local categorization
}

export const OEM_PARTS: Part[] = [
  {
    id: "MET-PART-001",
    slug: "samsung-da97-15217z-ice-maker",
    title: "Samsung OEM Ice Maker Assembly DA97-15217Z",
    description: "Genuine OEM Samsung refrigerator ice maker assembly. Fixes issues with ice production. Compatible with select French Door models.",
    brand: "Samsung",
    price: 145.99,
    condition: "new",
    availability: "in_stock",
    mpn: "DA97-15217Z",
    image_link: "https://lh3.googleusercontent.com/placeholder-DA97-15217Z", // Replace with valid image later
    category: "Home & Garden > Appliances > Appliance Accessories > Refrigerator Parts & Accessories",
  },
  {
    id: "MET-PART-002",
    slug: "lg-eap61687704-drain-pump",
    title: "LG OEM Washing Machine Drain Pump EAP61687704",
    description: "Original LG washer drain pump and motor assembly. Direct factory replacement for front loading machines displaying OE error codes.",
    brand: "LG",
    price: 68.50,
    condition: "new",
    availability: "in_stock",
    mpn: "EAP61687704",
    image_link: "https://lh3.googleusercontent.com/placeholder-EAP61687704",
    category: "Home & Garden > Appliances > Appliance Accessories > Washer & Dryer Parts & Accessories",
  },
  {
    id: "MET-PART-003",
    slug: "ge-wb44x10016-bake-element",
    title: "GE OEM Bake Element WB44x10016",
    description: "Genuine GE 240V bottom bake heating element for electric ranges and ovens. Restores even heating for baking.",
    brand: "GE Appliances",
    price: 35.00,
    condition: "new",
    availability: "in_stock",
    mpn: "WB44x10016",
    image_link: "https://lh3.googleusercontent.com/placeholder-WB44x10016",
    category: "Home & Garden > Appliances > Appliance Accessories > Oven & Stove Parts & Accessories",
  },
  {
    id: "MET-PART-004",
    slug: "whirlpool-w10311524-fridge-filter",
    title: "Whirlpool EveryDrop Refrigerator Water Filter 4 (W10311524)",
    description: "Whirlpool OEM water filter block for side-by-side and bottom freezer refrigerators. Reduces 28 contaminants.",
    brand: "Whirlpool",
    price: 54.99,
    condition: "new",
    availability: "in_stock",
    mpn: "W10311524",
    image_link: "https://lh3.googleusercontent.com/placeholder-W10311524",
    category: "Home & Garden > Appliances > Appliance Accessories > Refrigerator Parts & Accessories",
  },
  {
    id: "MET-PART-005",
    slug: "electrolux-137221600-door-lock",
    title: "Electrolux OEM Washer Door Lock Assembly 137221600",
    description: "Factory direct replacement door latch lock assembly for Frigidaire and Electrolux front load washing machines.",
    brand: "Electrolux",
    price: 82.25,
    condition: "new",
    availability: "in_stock",
    mpn: "137221600",
    image_link: "https://lh3.googleusercontent.com/placeholder-137221600",
    category: "Home & Garden > Appliances > Appliance Accessories > Washer & Dryer Parts & Accessories",
  }
];

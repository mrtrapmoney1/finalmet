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
    slug: "samsung-dc31-00055g-dryer-drive-motor",
    title: "Samsung OEM Dryer Drive Motor DC31-00055G",
    description:
      "Genuine Samsung OEM induction dryer motor. Replaces the motor that drives the belt spinning the drum — resolves no-heat, drum-not-turning, and loud-rumbling dryer faults. Compatible with 500+ Samsung and Kenmore dryer models including DV45H7000EW, DV48H7400EW, DV42H5000GW, DV45H7200EW, and DV338AEB. Also replaces DC31-00055D, DC31-00055H, PS4204647, AP5331095, DFS270ZSEL1, DFS270ZSEL3.",
    brand: "Samsung",
    price: 89.95,
    condition: "new",
    availability: "in_stock",
    mpn: "DC31-00055G",
    image_link: "https://lh3.googleusercontent.com/placeholder-DC31-00055G",
    category: "Home & Garden > Appliances > Appliance Accessories > Washer & Dryer Parts & Accessories",
  },
];

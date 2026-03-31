// lib/content.ts
// ─────────────────────────────────────────────────────────────────────────────
// CONTENT SLOTS — editable by operators and AI assistants.
// Each slot has a clear type. Replace placeholder strings with real content.
// ─────────────────────────────────────────────────────────────────────────────

// ── Testimonials ─────────────────────────────────────────────────────────────
// Add customer testimonials here. Each needs: author name, body text, optional
// star rating (1-5), optional location, and optional service type.

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  serviceType?: "appliance" | "tv" | "audio" | "commercial" | "parts";
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  date?: string; // ISO 8601: "2026-01-15"
  source?: "google" | "bbb" | "direct";
}

export const TESTIMONIALS: Testimonial[] = [
  // ── PLACEHOLDER — replace with real customer reviews ──
  {
    id: "t-001",
    author: "Sarah M.",
    location: "Lincoln, NE",
    serviceType: "appliance",
    rating: 5,
    body: "PLACEHOLDER: Add your first testimonial here. Include what was repaired, how the service went, and why you'd recommend Metro TV & Appliances.",
    date: "2026-01-01",
    source: "google",
  },
  {
    id: "t-002",
    author: "James K.",
    location: "Omaha, NE",
    serviceType: "tv",
    rating: 5,
    body: "PLACEHOLDER: Add a TV repair testimonial here.",
    date: "2026-01-15",
    source: "google",
  },
  {
    id: "t-003",
    author: "Linda H.",
    location: "Lincoln, NE",
    serviceType: "commercial",
    rating: 5,
    body: "PLACEHOLDER: Add a commercial microwave repair testimonial here.",
    date: "2026-02-01",
    source: "google",
  },
];

// ── Team Members ──────────────────────────────────────────────────────────────
// Add technicians, staff, or ownership info here. Each needs: name, title,
// optional bio, optional photo URL, optional years of experience.

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photoUrl?: string; // Must be hosted on lh3.googleusercontent.com or local /public path
  yearsExperience?: number;
  specialties?: string[];
}

export const TEAM: TeamMember[] = [
  // ── PLACEHOLDER — add real team members ──
  {
    id: "staff-001",
    name: "PLACEHOLDER: Technician Name",
    title: "Lead Appliance Technician",
    bio: "PLACEHOLDER: Add a short bio. Include factory training certifications and specialties.",
    photoUrl: undefined, // Replace with real photo URL when available
    yearsExperience: undefined,
    specialties: ["Samsung", "LG", "GE Appliances"],
  },
];

// ── Announcements ─────────────────────────────────────────────────────────────
// Time-limited banners shown at the top of pages or in a section.
// Set `active: false` to hide without deleting.

export interface Announcement {
  id: string;
  active: boolean;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  expiresAt?: string; // ISO 8601
}

export const ANNOUNCEMENTS: Announcement[] = [
  // ── PLACEHOLDER — set active: true and fill in to show a banner ──
  {
    id: "ann-001",
    active: false,
    headline: "PLACEHOLDER: Seasonal promotion or announcement headline",
    body: "PLACEHOLDER: Supporting text for the announcement.",
    ctaLabel: "Learn More",
    ctaHref: "/contact",
    expiresAt: "2026-12-31",
  },
];

// ── Featured Photos ────────────────────────────────────────────────────────────
// Gallery photos for the shop, team, or completed repairs.
// photoUrl must be on lh3.googleusercontent.com or a local /public path.

export interface FeaturedPhoto {
  id: string;
  photoUrl: string;
  altText: string;
  caption?: string;
  category?: "shop" | "team" | "repair" | "parts";
}

export const FEATURED_PHOTOS: FeaturedPhoto[] = [
  // ── PLACEHOLDER — add real photos ──
  {
    id: "photo-001",
    photoUrl: "/docs/metro-logo.png", // Replace with actual shop/team photo
    altText: "Metro TV & Appliances Lincoln NE",
    caption: "PLACEHOLDER: Add a caption for this photo.",
    category: "shop",
  },
];

// ── Store Copy ─────────────────────────────────────────────────────────────────
// Text shown on the /products page and individual product pages.
// Update when running promotions or changing store policies.

export const STORE_COPY = {
  heroTagline: "Genuine OEM parts — stocked locally in Lincoln, NE.",
  heroBody:
    "We carry factory-authorized OEM parts for Samsung, LG, GE, Electrolux, and Whirlpool. Order in-person, pick up same day.",
  purchaseNote:
    "All parts are available for in-store pickup at 1107 North Cotner Blvd, Lincoln, NE. Call us to confirm availability or to order.",
  emptyStateMessage:
    "Don't see your part? Call us — we have access to the full manufacturer parts catalog.",
  // PLACEHOLDER: Add shipping policy when online ordering is enabled.
  shippingPolicy: undefined as string | undefined,
} as const;

// ── Hero Copy ──────────────────────────────────────────────────────────────────
// The homepage hero body text shown to consumers. Defaults to placeholder copy
// if not updated. Replace the PLACEHOLDER body with consumer-facing language.

export const HERO_COPY = {
  // Shown below the "Factory-Authorized Repair in Lincoln, NE" subheading
  body:
    "We find the real cause, give you an honest estimate, and fix it right the first time — using original manufacturer parts, not cheaper substitutes.",
  // Trust callout badges shown below the body (max 4)
  badges: [
    "Samsung Authorized",
    "BBB Accredited",
    "200+ Zip Codes",
    "OEM Parts Only",
  ] as string[],
} as const;

// Static demo data for the dog food platform.
// All prices and figures are illustrative samples, not real retailer data.

export type FoodType = "dry" | "wet" | "grain-free" | "puppy" | "senior";
export type Store = "Chewy" | "PetSmart" | "Walmart" | "Costco" | "Amazon";

export interface PriceRow {
  store: Store;
  price: number;
  unit: string; // e.g. "30 lb bag"
  pricePerLb: number;
  inStock: boolean;
  shipping: string;
}

export interface Product {
  id: string;
  brand: string;
  line: string;
  tagline: string;
  types: FoodType[];
  protein: string;
  rating: number; // 1–5
  kcalPerCup: number;
  ingredients: string[];
  prices: PriceRow[];
  badges?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "blue-life-protection-chicken",
    brand: "Blue Buffalo",
    line: "Life Protection — Chicken & Brown Rice",
    tagline: "Workhorse kibble. Real chicken first, no by-products.",
    types: ["dry"],
    protein: "Chicken",
    rating: 4.4,
    kcalPerCup: 369,
    ingredients: [
      "Deboned chicken",
      "Brown rice",
      "Barley",
      "Oatmeal",
      "Chicken meal",
    ],
    badges: ["No by-products", "LifeSource Bits"],
    prices: [
      {
        store: "Chewy",
        price: 58.98,
        unit: "30 lb bag",
        pricePerLb: 1.97,
        inStock: true,
        shipping: "Free over $49",
      },
      {
        store: "PetSmart",
        price: 62.99,
        unit: "30 lb bag",
        pricePerLb: 2.1,
        inStock: true,
        shipping: "Free curbside",
      },
      {
        store: "Walmart",
        price: 54.97,
        unit: "30 lb bag",
        pricePerLb: 1.83,
        inStock: true,
        shipping: "Free over $35",
      },
      {
        store: "Amazon",
        price: 56.49,
        unit: "30 lb bag",
        pricePerLb: 1.88,
        inStock: true,
        shipping: "Prime",
      },
    ],
  },
  {
    id: "kirkland-natures-domain-salmon",
    brand: "Kirkland Signature",
    line: "Nature's Domain Salmon Meal & Sweet Potato",
    tagline: "Costco's quiet champion. Grain-free, absurdly cheap per pound.",
    types: ["dry", "grain-free"],
    protein: "Salmon",
    rating: 4.6,
    kcalPerCup: 363,
    ingredients: [
      "Salmon meal",
      "Sweet potatoes",
      "Peas",
      "Potatoes",
      "Canola oil",
    ],
    badges: ["Best value", "Grain-free"],
    prices: [
      {
        store: "Costco",
        price: 42.99,
        unit: "35 lb bag",
        pricePerLb: 1.23,
        inStock: true,
        shipping: "In-warehouse",
      },
      {
        store: "Amazon",
        price: 64.99,
        unit: "35 lb bag",
        pricePerLb: 1.86,
        inStock: true,
        shipping: "Prime",
      },
    ],
  },
  {
    id: "purina-pro-plan-puppy",
    brand: "Purina Pro Plan",
    line: "Puppy Chicken & Rice Formula",
    tagline: "DHA from real fish for brain and vision development.",
    types: ["dry", "puppy"],
    protein: "Chicken",
    rating: 4.7,
    kcalPerCup: 410,
    ingredients: [
      "Chicken",
      "Rice",
      "Corn gluten meal",
      "Whole grain wheat",
      "Fish oil",
    ],
    badges: ["DHA from fish oil", "Vet recommended"],
    prices: [
      {
        store: "Chewy",
        price: 64.98,
        unit: "34 lb bag",
        pricePerLb: 1.91,
        inStock: true,
        shipping: "Free over $49",
      },
      {
        store: "PetSmart",
        price: 67.99,
        unit: "34 lb bag",
        pricePerLb: 2.0,
        inStock: false,
        shipping: "Out of stock",
      },
      {
        store: "Walmart",
        price: 59.97,
        unit: "34 lb bag",
        pricePerLb: 1.76,
        inStock: true,
        shipping: "Free over $35",
      },
    ],
  },
  {
    id: "hills-science-diet-senior-7plus",
    brand: "Hill's Science Diet",
    line: "Adult 7+ Senior Chicken Meal & Rice",
    tagline: "Easy on the joints, easy on the gut. Built for old souls.",
    types: ["dry", "senior"],
    protein: "Chicken",
    rating: 4.5,
    kcalPerCup: 366,
    ingredients: [
      "Chicken meal",
      "Whole grain wheat",
      "Cracked pearled barley",
      "Whole grain sorghum",
      "Brown rice",
    ],
    badges: ["Senior formula", "Joint support"],
    prices: [
      {
        store: "Chewy",
        price: 71.99,
        unit: "33 lb bag",
        pricePerLb: 2.18,
        inStock: true,
        shipping: "Free over $49",
      },
      {
        store: "PetSmart",
        price: 74.99,
        unit: "33 lb bag",
        pricePerLb: 2.27,
        inStock: true,
        shipping: "Free curbside",
      },
      {
        store: "Amazon",
        price: 69.49,
        unit: "33 lb bag",
        pricePerLb: 2.11,
        inStock: true,
        shipping: "Prime",
      },
    ],
  },
  {
    id: "wellness-core-grain-free-original",
    brand: "Wellness CORE",
    line: "Grain-Free Original Turkey & Chicken",
    tagline: "High-protein, no fillers. The CrossFit of kibble.",
    types: ["dry", "grain-free"],
    protein: "Turkey",
    rating: 4.6,
    kcalPerCup: 389,
    ingredients: [
      "Deboned turkey",
      "Turkey meal",
      "Chicken meal",
      "Peas",
      "Lentils",
    ],
    badges: ["High protein", "Grain-free"],
    prices: [
      {
        store: "Chewy",
        price: 79.98,
        unit: "26 lb bag",
        pricePerLb: 3.08,
        inStock: true,
        shipping: "Free over $49",
      },
      {
        store: "PetSmart",
        price: 82.99,
        unit: "26 lb bag",
        pricePerLb: 3.19,
        inStock: true,
        shipping: "Free curbside",
      },
    ],
  },
  {
    id: "merrick-grain-free-real-beef",
    brand: "Merrick",
    line: "Grain-Free Real Beef + Sweet Potato",
    tagline: "Beef as the first ingredient. No corn, no wheat, no soy.",
    types: ["dry", "grain-free"],
    protein: "Beef",
    rating: 4.5,
    kcalPerCup: 387,
    ingredients: [
      "Deboned beef",
      "Lamb meal",
      "Salmon meal",
      "Sweet potatoes",
      "Peas",
    ],
    badges: ["Grain-free", "Real beef #1"],
    prices: [
      {
        store: "Chewy",
        price: 74.98,
        unit: "22 lb bag",
        pricePerLb: 3.41,
        inStock: true,
        shipping: "Free over $49",
      },
      {
        store: "Amazon",
        price: 76.99,
        unit: "22 lb bag",
        pricePerLb: 3.5,
        inStock: true,
        shipping: "Prime",
      },
    ],
  },
  {
    id: "pedigree-chopped-ground-wet",
    brand: "Pedigree",
    line: "Chopped Ground Dinner — Beef Variety (Wet)",
    tagline: "Cheap, palatable wet food. Mixers and toppers, daily option.",
    types: ["wet"],
    protein: "Beef",
    rating: 4.1,
    kcalPerCup: 370,
    ingredients: [
      "Sufficient water",
      "Meat by-products",
      "Beef",
      "Liver",
      "Wheat flour",
    ],
    prices: [
      {
        store: "Walmart",
        price: 14.98,
        unit: "12 × 22 oz cans",
        pricePerLb: 0.91,
        inStock: true,
        shipping: "Free over $35",
      },
      {
        store: "Chewy",
        price: 17.88,
        unit: "12 × 22 oz cans",
        pricePerLb: 1.08,
        inStock: true,
        shipping: "Free over $49",
      },
    ],
  },
  {
    id: "open-farm-grass-fed-beef",
    brand: "Open Farm",
    line: "Grass-Fed Beef Wet Recipe",
    tagline: "Traceable, ethically sourced. Premium wet food.",
    types: ["wet", "grain-free"],
    protein: "Beef",
    rating: 4.7,
    kcalPerCup: 415,
    ingredients: ["Beef broth", "Beef", "Beef liver", "Pumpkin", "Coconut oil"],
    badges: ["Traceable sourcing", "Grain-free"],
    prices: [
      {
        store: "Chewy",
        price: 47.88,
        unit: "12 × 12.5 oz cans",
        pricePerLb: 5.1,
        inStock: true,
        shipping: "Free over $49",
      },
      {
        store: "Amazon",
        price: 51.99,
        unit: "12 × 12.5 oz cans",
        pricePerLb: 5.55,
        inStock: false,
        shipping: "Out of stock",
      },
    ],
  },
];

export interface Recall {
  id: string;
  date: string;
  brand: string;
  product: string;
  reason: string;
  severity: "Class I" | "Class II" | "Class III";
  source: string;
}

export const RECALLS: Recall[] = [
  {
    id: "fda-2024-mid-america",
    date: "2024-09-12",
    brand: "Mid America Pet Food",
    product: "Victor Super Premium Dog Food (multiple varieties)",
    reason: "Salmonella contamination potential",
    severity: "Class I",
    source: "FDA",
  },
  {
    id: "fda-2024-purina",
    date: "2024-04-02",
    brand: "Purina",
    product: "Pro Plan Veterinary Diets El Elemental (limited lots)",
    reason: "Elevated vitamin D levels",
    severity: "Class II",
    source: "FDA",
  },
  {
    id: "fda-2023-darwins",
    date: "2023-11-17",
    brand: "Darwin's Natural Pet Products",
    product: "ZooLogics Duck Meals for Dogs",
    reason: "Salmonella detected during routine sampling",
    severity: "Class I",
    source: "FDA",
  },
  {
    id: "fda-2023-blue-ridge",
    date: "2023-07-21",
    brand: "Blue Ridge Beef",
    product: "Kitten Mix and Kitten Grind",
    reason: "Listeria monocytogenes contamination",
    severity: "Class I",
    source: "FDA",
  },
  {
    id: "fda-2023-primal",
    date: "2023-03-15",
    brand: "Primal Pet Foods",
    product: "Raw Frozen Patties for Dogs (chicken)",
    reason: "Potential Listeria contamination — voluntary recall",
    severity: "Class II",
    source: "FDA",
  },
  {
    id: "fda-2022-freshpet",
    date: "2022-08-09",
    brand: "Freshpet",
    product: "Select Small Dog Bite Size Beef & Egg Recipe",
    reason: "Possible Salmonella contamination, single lot",
    severity: "Class II",
    source: "FDA",
  },
];

export const STORE_LOGOS: Record<Store, { color: string; tag: string }> = {
  Chewy: { color: "oklch(0.62 0.16 250)", tag: "Subscribe & Save 5–10%" },
  PetSmart: { color: "oklch(0.55 0.20 25)", tag: "Treats Rewards 8x" },
  Walmart: { color: "oklch(0.55 0.18 245)", tag: "Rollback prices" },
  Costco: { color: "oklch(0.50 0.20 25)", tag: "Members only" },
  Amazon: { color: "oklch(0.78 0.16 70)", tag: "Prime delivery" },
};

export function cheapestPrice(p: Product): PriceRow {
  return [...p.prices].sort((a, b) => a.pricePerLb - b.pricePerLb)[0];
}

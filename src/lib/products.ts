// Local assets import (Agar aapke assets folder me images hain)
import classicImg from "@/assets/product-classic.jpg";
import periImg from "@/assets/product-peri.jpg";
import pinksaltImg from "@/assets/product-pinksalt.jpg";
import pudinaImg from "@/assets/product-pudina.jpg";
import creamImg from "@/assets/product-cream.jpg";
import rawImg from "@/assets/product-raw.jpg";

export type ProductCategory = "flavoured" | "raw";

export interface Product {
  id: string;
  name: string;
  flavour: string;
  weight: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  category: ProductCategory;
  note: string;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: "classic-salted",
    name: "Classic Roasted & Salted Makhana",
    flavour: "Roasted & Salted",
    weight: "100g",
    price: 199,
    mrp: 249,
    rating: 4.9,
    reviews: 412,
    image: classicImg,
    tag: "Best Seller",
    category: "flavoured",
    note: "Slow-roasted in cold-pressed oil with a whisper of rock salt.",
    inStock: true,
  },
  {
    id: "peri-peri",
    name: "Peri Peri & Tangy Masala Makhana",
    flavour: "Peri Peri Masala",
    weight: "100g",
    price: 219,
    mrp: 279,
    rating: 4.8,
    reviews: 318,
    image: periImg,
    tag: "Spicy",
    category: "flavoured",
    note: "Fiery peri peri with a tangy amchur finish. Zero artificial colour.",
    inStock: true,
  },
  {
    id: "pink-salt-jumbo",
    name: "Himalayan Pink Salt Jumbo Makhana",
    flavour: "Himalayan Pink Salt",
    weight: "250g",
    price: 449,
    mrp: 549,
    rating: 4.9,
    reviews: 265,
    image: pinksaltImg,
    tag: "Jumbo Grade",
    category: "flavoured",
    note: "Hand-graded 6+ suta jumbo pops. Extra big, extra crunchy.",
    inStock: true,
  },
  {
    id: "pudina",
    name: "Pudina Mint Makhana",
    flavour: "Pudina Mint",
    weight: "100g",
    price: 209,
    mrp: 259,
    rating: 4.7,
    reviews: 188,
    image: pudinaImg,
    tag: "New",
    category: "flavoured",
    note: "Fresh mint and black salt — refreshing evening snack.",
    inStock: true,
  },
  {
    id: "cream-onion",
    name: "Cream & Onion Makhana",
    flavour: "Cream & Onion",
    weight: "Pack of 3 × 75g",
    price: 499,
    mrp: 629,
    rating: 4.8,
    reviews: 231,
    image: creamImg,
    tag: "Family Pack",
    category: "flavoured",
    note: "Creamy, savoury and kid-approved. Three packs, one happy pantry.",
    inStock: true,
  },
  {
    id: "raw-phool",
    name: "Raw Premium Grade Phool Makhana",
    flavour: "Raw / Unroasted",
    weight: "250g",
    price: 379,
    mrp: 459,
    rating: 4.9,
    reviews: 496,
    image: rawImg,
    tag: "Kitchen Staple",
    category: "raw",
    note: "For kheer, curries and vrat recipes. Sun-dried, never bleached.",
    inStock: true,
  },
];

// E-commerce business configuration constants
export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_FEE = 49;
export const COUPON_CODE = "SEVAARTH10";

// Reusable Helper Queries
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function calculateDiscount(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
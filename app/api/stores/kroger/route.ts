import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 min

// Kroger OAuth token endpoint
const KROGER_TOKEN_URL = "https://api.kroger.com/v1/connect/oauth2/token";
const KROGER_PRODUCTS_URL = "https://api.kroger.com/v1/products";

// These come from environment variables — set KROGER_CLIENT_ID and KROGER_CLIENT_SECRET
// in your .env.local. Sign up at https://developer.kroger.com/
async function getKrogerToken(): Promise<string> {
  const clientId = process.env.KROGER_CLIENT_ID;
  const clientSecret = process.env.KROGER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Kroger API credentials");
  }

  const creds = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(KROGER_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=product.compact",
    next: { revalidate: 1700 }, // token lives 1800s, refresh a bit before
  });

  if (!res.ok) throw new Error(`Kroger token error: ${res.status}`);
  const data = await res.json();
  return data.access_token as string;
}

export interface KrogerProduct {
  id: string;
  brand: string;
  description: string;
  priceRegular: number | null;
  priceSale: number | null;
  inStock: boolean;
  size: string;
  upc: string;
}

const DOG_FOOD_TERMS = [
  "blue buffalo dog food",
  "purina pro plan dog",
  "hill's science diet dog",
  "royal canin dog",
  "iams dog food",
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // Optional: filter by location ID
  const locationId = searchParams.get("locationId") ?? undefined;

  try {
    const token = await getKrogerToken();
    const allProducts: KrogerProduct[] = [];

    for (const term of DOG_FOOD_TERMS) {
      const params = new URLSearchParams({
        "filter.term": term,
        "filter.limit": "10",
        ...(locationId ? { "filter.locationId": locationId } : {}),
      });

      const res = await fetch(`${KROGER_PRODUCTS_URL}?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: 1800 },
      });

      if (!res.ok) continue;

      const data = await res.json();
      const items = data.data ?? [];

      for (const item of items) {
        const price = item.items?.[0]?.price;
        const size =
          item.items?.[0]?.size ??
          item.description?.match(/\d+[\s.]?lb/i)?.[0] ??
          "";
        allProducts.push({
          id: item.productId,
          brand: item.brand ?? item.description?.split(" ")[0] ?? "Unknown",
          description: item.description ?? "",
          priceRegular: price?.regular ?? null,
          priceSale: price?.promo ?? null,
          inStock: item.items?.[0]?.fulfillment?.inStore ?? false,
          size,
          upc: item.upc ?? "",
        });
      }
    }

    // Deduplicate by UPC
    const seen = new Set<string>();
    const unique = allProducts.filter((p) => {
      if (seen.has(p.upc)) return false;
      seen.add(p.upc);
      return true;
    });

    return NextResponse.json({
      products: unique,
      store: "Kroger",
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Kroger API error:", err);
    return NextResponse.json(
      {
        products: [],
        store: "Kroger",
        error: String(err),
        updatedAt: null,
      },
      { status: 200 }
    );
  }
}

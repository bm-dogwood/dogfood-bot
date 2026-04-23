import { NextResponse } from "next/server";

const KROGER_TOKEN_URL = "https://api.kroger.com/v1/connect/oauth2/token";
const KROGER_LOCATIONS_URL = "https://api.kroger.com/v1/locations";

async function getKrogerToken(): Promise<string> {
  const clientId = process.env.KROGER_CLIENT_ID;
  const clientSecret = process.env.KROGER_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Missing Kroger credentials");

  const creds = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(KROGER_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=product.compact",
    next: { revalidate: 1700 },
  });

  if (!res.ok) throw new Error(`Token error: ${res.status}`);
  const data = await res.json();
  return data.access_token as string;
}

export interface KrogerLocation {
  locationId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  chain: string;
  distance: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const zip = searchParams.get("zip");

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: "Invalid ZIP code" }, { status: 400 });
  }

  try {
    const token = await getKrogerToken();

    const params = new URLSearchParams({
      "filter.zipCode.near": zip,
      "filter.radiusInMiles": "20",
      "filter.limit": "5",
    });

    const res = await fetch(`${KROGER_LOCATIONS_URL}?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Locations error: ${res.status}`);

    const data = await res.json();
    const locations: KrogerLocation[] = (data.data ?? []).map(
      (loc: {
        locationId: string;
        name: string;
        address?: {
          addressLine1?: string;
          city?: string;
          state?: string;
          zipCode?: string;
        };
        chain?: string;
        distance?: number;
      }) => ({
        locationId: loc.locationId,
        name: loc.name,
        address: loc.address?.addressLine1 ?? "",
        city: loc.address?.city ?? "",
        state: loc.address?.state ?? "",
        zip: loc.address?.zipCode ?? "",
        chain: loc.chain ?? "Kroger",
        distance: loc.distance ?? 0,
      })
    );

    return NextResponse.json({ locations, zip });
  } catch (err) {
    console.error("Kroger locations error:", err);
    return NextResponse.json(
      { locations: [], zip, error: String(err) },
      { status: 200 }
    );
  }
}

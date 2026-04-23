import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour ISR

interface FDARecallResult {
  recall_initiation_date?: string;
  classification?: string;
  recalling_firm?: string;
  product_description?: string;
  reason_for_recall?: string;
  voluntary_mandated?: string;
}

export interface RecallItem {
  id: string;
  date: string;
  severity: "Class I" | "Class II" | "Class III";
  brand: string;
  product: string;
  reason: string;
  source: string;
}

export async function GET() {
  try {
    // FDA openFDA animal & veterinary enforcement API
    const url =
      "https://api.fda.gov/animalandveterinary/event.json?" +
      new URLSearchParams({
        search: 'product_type:"Food/Feed"',
        limit: "100",
        sort: "report_date:desc",
      });

    // Fallback: use the food recall enforcement endpoint filtered for pet food
    const recallUrl =
      "https://api.fda.gov/food/enforcement.json?" +
      new URLSearchParams({
        search:
          '(product_description:"dog food" OR product_description:"pet food" OR product_description:"dog" OR recalling_firm:"Blue Buffalo" OR recalling_firm:"Hill\'s" OR recalling_firm:"Royal Canin" OR recalling_firm:"Purina")',
        limit: "50",
        sort: "recall_initiation_date:desc",
      });

    const res = await fetch(recallUrl, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "DogfoodBot/1.0" },
    });

    if (!res.ok) {
      throw new Error(`FDA API error: ${res.status}`);
    }

    const data = await res.json();
    const results: FDARecallResult[] = data.results ?? [];

    const recalls: RecallItem[] = results
      .filter((r) => r.classification)
      .map((r, i) => {
        const raw = (r.product_description ?? "").trim();
        // Extract a short brand name from the product description
        const brand = raw.split(/[,\s–-]/)[0].slice(0, 40) || "Unknown Brand";
        const product = raw.slice(0, 120) || "See full description";

        let severity: RecallItem["severity"] = "Class II";
        if (r.classification === "Class I") severity = "Class I";
        else if (r.classification === "Class III") severity = "Class III";

        const dateRaw = r.recall_initiation_date ?? "";
        const date = dateRaw
          ? new Date(
              dateRaw.slice(0, 4) +
                "-" +
                dateRaw.slice(4, 6) +
                "-" +
                dateRaw.slice(6, 8)
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Date unknown";

        return {
          id: `fda-${i}-${dateRaw}`,
          date,
          severity,
          brand,
          product,
          reason: r.reason_for_recall?.slice(0, 300) ?? "See FDA notice",
          source: r.voluntary_mandated?.includes("Voluntary")
            ? "Voluntary"
            : "FDA Mandated",
        };
      });

    return NextResponse.json({ recalls, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("FDA recall fetch failed:", err);
    // Return empty so UI can show fallback
    return NextResponse.json(
      { recalls: [], error: "Failed to fetch FDA data", updatedAt: null },
      { status: 200 }
    );
  }
}

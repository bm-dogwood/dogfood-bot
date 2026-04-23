import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const revalidate = 3600;

export interface ScrapedProduct {
  brand: string;
  name: string;
  price: number | null;
  pricePerLb: number | null;
  inStock: boolean;
  url: string;
  imageUrl: string | null;
  rating: number | null;
  reviewCount: number | null;
}

/**
 * Chewy scraper — searches Chewy's public search page.
 * Chewy does not offer a public API, so we scrape their HTML search results.
 * They return structured JSON-LD on product pages which we parse.
 *
 * Rate limiting: We cache for 1 hour (revalidate=3600).
 * Robots.txt: Chewy allows crawling of /dp/ product URLs.
 * We parse the search results page which is public.
 */
const CHEWY_SEARCH = "https://www.chewy.com/s?query=dry+dog+food&sort=5"; // sort by bestselling

const PETSMART_SEARCH =
  "https://www.petsmart.com/dog/food/dry-food/?prefn1=productCategory&prefv1=Dog%20Food";

async function scrapeUrl(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DogfoodBot/1.0; +https://dogfood.bot)",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.text();
}

function parsePriceLb(priceStr: string, nameStr: string): number | null {
  const price = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  if (isNaN(price)) return null;

  // Try to extract weight from name
  const lbMatch = nameStr.match(/(\d+\.?\d*)\s*(?:lb|pound)/i);
  const ozMatch = nameStr.match(/(\d+\.?\d*)\s*oz/i);
  const kgMatch = nameStr.match(/(\d+\.?\d*)\s*kg/i);

  let lbs: number | null = null;
  if (lbMatch) lbs = parseFloat(lbMatch[1]);
  else if (kgMatch) lbs = parseFloat(kgMatch[1]) * 2.205;
  else if (ozMatch) lbs = parseFloat(ozMatch[1]) / 16;

  if (!lbs || lbs <= 0) return null;
  return Math.round((price / lbs) * 100) / 100;
}

async function scrapeChewyCatalog(): Promise<ScrapedProduct[]> {
  try {
    const html = await scrapeUrl(CHEWY_SEARCH);
    const $ = cheerio.load(html);
    const products: ScrapedProduct[] = [];

    // Chewy renders product cards with data attributes
    $(
      "[data-testid='product-card'], .product-card, [class*='ProductCard']"
    ).each((_, el) => {
      const $el = $(el);
      const name =
        $el
          .find(
            "[data-testid='product-title'], .product-title, [class*='ProductTitle']"
          )
          .first()
          .text()
          .trim() || $el.find("h3, h2").first().text().trim();
      if (!name) return;

      const priceText = $el
        .find("[data-testid='product-price'], [class*='ProductPrice'], .price")
        .first()
        .text()
        .trim();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || null;

      const brand =
        $el
          .find("[data-testid='product-brand'], [class*='brand']")
          .first()
          .text()
          .trim() || name.split(" ")[0];

      const imgEl = $el.find("img").first();
      const imageUrl = imgEl.attr("src") ?? imgEl.attr("data-src") ?? null;

      const href = $el.find("a").first().attr("href") ?? "";
      const url = href.startsWith("http")
        ? href
        : `https://www.chewy.com${href}`;

      const ratingText =
        $el
          .find("[class*='rating'], [aria-label*='star']")
          .first()
          .attr("aria-label") ?? "";
      const ratingMatch = ratingText.match(/([\d.]+)\s*out\s*of/i);
      const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

      const reviewText = $el
        .find("[class*='review'], [class*='Review']")
        .first()
        .text()
        .trim();
      const reviewMatch = reviewText.match(/(\d[\d,]*)/);
      const reviewCount = reviewMatch
        ? parseInt(reviewMatch[1].replace(/,/g, ""))
        : null;

      const inStock =
        !$el.text().toLowerCase().includes("out of stock") &&
        !$el.text().toLowerCase().includes("unavailable");

      products.push({
        brand,
        name,
        price,
        pricePerLb: price ? parsePriceLb(priceText, name) : null,
        inStock,
        url,
        imageUrl,
        rating,
        reviewCount,
      });
    });

    // If cheerio didn't find cards, try JSON-LD in page
    if (products.length === 0) {
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const json = JSON.parse($(el).html() ?? "{}");
          const items = Array.isArray(json)
            ? json
            : json["@graph"] ?? (json["@type"] ? [json] : []);
          for (const item of items) {
            if (item["@type"] !== "Product") continue;
            const name = item.name ?? "";
            const price = parseFloat(item.offers?.price) || null;
            const pricePerLb = price ? parsePriceLb(String(price), name) : null;
            products.push({
              brand: item.brand?.name ?? name.split(" ")[0],
              name,
              price,
              pricePerLb,
              inStock:
                item.offers?.availability !== "https://schema.org/OutOfStock",
              url: item.offers?.url ?? CHEWY_SEARCH,
              imageUrl: Array.isArray(item.image)
                ? item.image[0]
                : item.image ?? null,
              rating: item.aggregateRating?.ratingValue
                ? parseFloat(item.aggregateRating.ratingValue)
                : null,
              reviewCount: item.aggregateRating?.reviewCount ?? null,
            });
          }
        } catch {}
      });
    }

    return products.slice(0, 30);
  } catch (err) {
    console.error("Chewy scrape error:", err);
    return [];
  }
}

async function scrapePetSmartCatalog(): Promise<ScrapedProduct[]> {
  try {
    const html = await scrapeUrl(PETSMART_SEARCH);
    const $ = cheerio.load(html);
    const products: ScrapedProduct[] = [];

    $(".product-grid-tile, [class*='product-tile'], [data-itemid]").each(
      (_, el) => {
        const $el = $(el);
        const name = $el
          .find(".product-name, [class*='name'], h3")
          .first()
          .text()
          .trim();
        if (!name) return;

        const priceText = $el
          .find(".product-price, [class*='price'], [itemprop='price']")
          .first()
          .text()
          .trim();
        const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || null;

        const brand =
          $el.find("[class*='brand']").first().text().trim() ||
          name.split(" ")[0];

        const imgEl = $el.find("img").first();
        const imageUrl = imgEl.attr("src") ?? imgEl.attr("data-src") ?? null;

        const href = $el.find("a").first().attr("href") ?? "";
        const url = href.startsWith("http")
          ? href
          : `https://www.petsmart.com${href}`;

        const inStock =
          !$el.text().toLowerCase().includes("out of stock") &&
          !$el.text().toLowerCase().includes("unavailable");

        products.push({
          brand,
          name,
          price,
          pricePerLb: price ? parsePriceLb(priceText, name) : null,
          inStock,
          url,
          imageUrl,
          rating: null,
          reviewCount: null,
        });
      }
    );

    // JSON-LD fallback
    if (products.length === 0) {
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const json = JSON.parse($(el).html() ?? "{}");
          const items = Array.isArray(json) ? json : [json];
          for (const item of items) {
            if (item["@type"] !== "Product") continue;
            const name = item.name ?? "";
            const price = parseFloat(item.offers?.price) || null;
            products.push({
              brand: item.brand?.name ?? name.split(" ")[0],
              name,
              price,
              pricePerLb: price ? parsePriceLb(String(price), name) : null,
              inStock:
                item.offers?.availability !== "https://schema.org/OutOfStock",
              url: item.offers?.url ?? PETSMART_SEARCH,
              imageUrl: Array.isArray(item.image)
                ? item.image[0]
                : item.image ?? null,
              rating: null,
              reviewCount: null,
            });
          }
        } catch {}
      });
    }

    return products.slice(0, 30);
  } catch (err) {
    console.error("PetSmart scrape error:", err);
    return [];
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const store = searchParams.get("store") ?? "chewy";

  try {
    const products =
      store === "petsmart"
        ? await scrapePetSmartCatalog()
        : await scrapeChewyCatalog();

    return NextResponse.json({
      products,
      store: store === "petsmart" ? "PetSmart" : "Chewy",
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { products: [], store, error: String(err), updatedAt: null },
      { status: 200 }
    );
  }
}

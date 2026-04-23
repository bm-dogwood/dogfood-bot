// app/stores/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import type { KrogerProduct } from "@/app/api/stores/kroger/route";
import type { ScrapedProduct } from "@/app/api/stores/scrape/route";
import { Marquee } from "@/components/Marquee";

// ─── Types ────────────────────────────────────────────────────────────────────
type StoreKey = "Chewy" | "PetSmart" | "Kroger";

interface StoreResult {
  store: StoreKey;
  products: (KrogerProduct | ScrapedProduct)[];
  updatedAt: string | null;
  error?: string;
  loading: boolean;
}

const STORE_META: Record<
  StoreKey,
  { color: string; tag: string; order: number }
> = {
  Chewy: {
    color: "#0074E8",
    tag: "Online-only · Free 1–2 day shipping over $49",
    order: 0,
  },
  PetSmart: {
    color: "#D4282A",
    tag: "Retail + online · Same-day pickup available",
    order: 1,
  },
  Kroger: {
    color: "#003DB2",
    tag: "Grocery + fuel rewards · Near you by ZIP",
    order: 2,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getPrice(p: KrogerProduct | ScrapedProduct): number | null {
  if ("priceRegular" in p) return p.priceSale ?? p.priceRegular;
  return p.price;
}

function getPricePerLb(p: KrogerProduct | ScrapedProduct): number | null {
  return "pricePerLb" in p ? p.pricePerLb : null;
}

function getName(p: KrogerProduct | ScrapedProduct): string {
  if ("description" in p) return p.description;
  return p.name;
}

function getInStock(p: KrogerProduct | ScrapedProduct): boolean {
  return p.inStock;
}

function computeStoreStats(products: (KrogerProduct | ScrapedProduct)[]) {
  const pplValues = products
    .map(getPricePerLb)
    .filter((v): v is number => v !== null);

  const avgPpl =
    pplValues.length > 0
      ? pplValues.reduce((a, b) => a + b, 0) / pplValues.length
      : 0;

  const cheapest =
    pplValues.length > 0
      ? products.reduce((best, cur) => {
          const bv = getPricePerLb(best) ?? Infinity;
          const cv = getPricePerLb(cur) ?? Infinity;
          return cv < bv ? cur : best;
        })
      : null;

  const stockedPct =
    products.length > 0
      ? Math.round((products.filter(getInStock).length / products.length) * 100)
      : 0;

  return { avgPpl, cheapest, stockedPct };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StoresPage() {
  const [storeData, setStoreData] = useState<Record<StoreKey, StoreResult>>({
    Chewy: { store: "Chewy", products: [], updatedAt: null, loading: true },
    PetSmart: {
      store: "PetSmart",
      products: [],
      updatedAt: null,
      loading: true,
    },
    Kroger: { store: "Kroger", products: [], updatedAt: null, loading: true },
  });

  const fetchStore = useCallback(async (key: StoreKey) => {
    try {
      let url = "";
      if (key === "Kroger") {
        url = "/api/stores/kroger";
      } else {
        url = `/api/stores/scrape?store=${key.toLowerCase()}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setStoreData((prev) => ({
        ...prev,
        [key]: {
          store: key,
          products: data.products ?? [],
          updatedAt: data.updatedAt,
          error: data.error,
          loading: false,
        },
      }));
    } catch (err) {
      setStoreData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          error: String(err),
          loading: false,
        },
      }));
    }
  }, []);

  useEffect(() => {
    fetchStore("Chewy");
    fetchStore("PetSmart");
    fetchStore("Kroger");
  }, [fetchStore]);

  const stores = (Object.keys(STORE_META) as StoreKey[]).map((key) => {
    const data = storeData[key];
    const stats = computeStoreStats(data.products);
    return { key, ...data, ...stats };
  });

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            · Section 02 · The store wars ·
          </span>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.9] md:text-8xl">
            Three aisles.
            <br />
            Live prices.
          </h1>
          <p className="mt-6 max-w-2xl text-foreground/75">
            We pull live data from Kroger&apos;s official API and scrape Chewy
            &amp; PetSmart in real time. Prices and stock signals refresh
            hourly.
          </p>
        </div>
      </section>

      {/* ─── Marquee ──────────────────────────────────────────────────────── */}
      <section className="border-b border-border py-5">
        <Marquee
          reverse
          items={stores.flatMap((s) => [
            <span key={s.store} className="font-display text-3xl font-black">
              {s.store}
            </span>,
            <span
              key={s.store + "tag"}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            >
              {STORE_META[s.store].tag}
            </span>,
          ])}
        />
      </section>

      {/* ─── Store cards ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {stores.map((s, i) => (
            <article
              key={s.store}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 transition-all hover:-translate-y-1 hover:border-primary md:p-10"
              style={{
                backgroundImage: `radial-gradient(600px 300px at 100% 0%, color-mix(in oklab, ${
                  STORE_META[s.store].color
                } 18%, transparent), transparent 60%)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Store №{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-5xl font-black leading-none md:text-6xl">
                    {s.store}
                  </h2>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/70">
                    {STORE_META[s.store].tag}
                  </p>
                </div>
                <div
                  className="h-14 w-14 rounded-full transition-transform group-hover:scale-110"
                  style={{ background: STORE_META[s.store].color }}
                />
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
                {s.loading ? (
                  <>
                    {[0, 1, 2].map((j) => (
                      <div key={j} className="animate-pulse">
                        <div className="h-7 w-16 rounded bg-muted" />
                        <div className="mt-1 h-3 w-12 rounded bg-muted" />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <Stat
                      label="Avg $/lb"
                      value={s.avgPpl ? `$${s.avgPpl.toFixed(2)}` : "—"}
                    />
                    <Stat label="In stock" value={`${s.stockedPct}%`} />
                    <Stat
                      label="Listings"
                      value={s.products.length.toString()}
                    />
                  </>
                )}
              </div>

              {/* Best deal */}
              {s.loading ? (
                <div className="mt-6 animate-pulse space-y-2">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-5 w-40 rounded bg-muted" />
                  <div className="h-8 w-24 rounded bg-muted" />
                </div>
              ) : s.error && s.products.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-border p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.store === "Kroger"
                      ? "Add KROGER_CLIENT_ID + KROGER_CLIENT_SECRET to .env.local to enable live Kroger prices."
                      : "Could not scrape live data. Retailer may have updated their HTML."}
                  </p>
                </div>
              ) : s.cheapest ? (
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    Best deal at this store
                  </p>
                  <p className="mt-2 font-display text-xl font-bold leading-tight">
                    {s.cheapest && "brand" in s.cheapest
                      ? s.cheapest.brand
                      : ""}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {getName(s.cheapest).slice(0, 80)}
                  </p>
                  {getPricePerLb(s.cheapest) && (
                    <p className="mt-2 font-display text-3xl font-black text-primary">
                      ${getPricePerLb(s.cheapest)!.toFixed(2)}
                      <span className="ml-1 font-mono text-xs font-normal text-muted-foreground">
                        /lb
                      </span>
                    </p>
                  )}
                  {!getPricePerLb(s.cheapest) && getPrice(s.cheapest) && (
                    <p className="mt-2 font-display text-3xl font-black text-primary">
                      ${getPrice(s.cheapest)!.toFixed(2)}
                    </p>
                  )}
                </div>
              ) : null}

              <Link
                href="/compare"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest underline-grow"
              >
                See all {s.store} prices →
              </Link>
            </article>
          ))}
        </div>

        {/* Cross-reference table */}
        <div className="mt-20 rounded-3xl border border-border bg-card/40 p-8 md:p-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            · Live snapshot ·
          </span>
          <h3 className="mt-2 font-display text-4xl font-black md:text-5xl">
            Cheapest listing per store
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The single lowest-priced product we found at each retailer, right
            now.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 font-mono text-[10px] uppercase tracking-widest">
                    Store
                  </th>
                  <th className="py-3 font-mono text-[10px] uppercase tracking-widest">
                    Product
                  </th>
                  <th className="py-3 text-right font-mono text-[10px] uppercase tracking-widest">
                    Price
                  </th>
                  <th className="py-3 text-right font-mono text-[10px] uppercase tracking-widest">
                    $/lb
                  </th>
                </tr>
              </thead>
              <tbody>
                {stores.map((s) => {
                  if (s.loading) {
                    return (
                      <tr key={s.store} className="border-b border-border/40">
                        <td className="py-4 font-display font-bold">
                          {s.store}
                        </td>
                        <td className="py-4" colSpan={3}>
                          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                        </td>
                      </tr>
                    );
                  }
                  if (!s.cheapest) {
                    return (
                      <tr key={s.store} className="border-b border-border/40">
                        <td className="py-4 font-display font-bold">
                          {s.store}
                        </td>
                        <td className="py-4 text-muted-foreground" colSpan={3}>
                          {s.error ? "API unavailable" : "No data"}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={s.store} className="border-b border-border/40">
                      <td className="py-4 font-display text-lg font-bold">
                        {s.store}
                      </td>
                      <td className="py-4 max-w-xs">
                        <p className="font-display font-bold">
                          {"brand" in s.cheapest ? s.cheapest.brand : "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getName(s.cheapest).slice(0, 60)}
                        </p>
                      </td>
                      <td className="py-4 text-right font-mono">
                        {getPrice(s.cheapest)
                          ? `$${getPrice(s.cheapest)!.toFixed(2)}`
                          : "—"}
                      </td>
                      <td className="py-4 text-right font-mono font-bold text-primary">
                        {getPricePerLb(s.cheapest)
                          ? `$${getPricePerLb(s.cheapest)!.toFixed(2)}`
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ZIP-based Kroger locator teaser */}
        <div className="mt-10 rounded-3xl border border-dashed border-border p-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            · Kroger near you ·
          </p>
          <p className="mt-3 mx-auto max-w-xl text-foreground/80">
            Kroger&apos;s API supports location-aware pricing. Enter your ZIP on
            the home page to find your nearest Kroger banner store and see real
            local shelf prices.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-mono text-xs uppercase tracking-widest underline"
          >
            Search by ZIP →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-black md:text-3xl">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

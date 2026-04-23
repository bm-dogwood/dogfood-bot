// app/compare/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import { PRODUCTS, FoodType, cheapestPrice, type Product } from "@/lib/data";

const FILTERS: { id: "all" | FoodType; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "dry", label: "Dry" },
  { id: "wet", label: "Wet" },
  { id: "grain-free", label: "Grain-free" },
  { id: "puppy", label: "Puppy" },
  { id: "senior", label: "Senior" },
];

type SortOption = "price" | "rating" | "brand";
type TypeOption = "all" | FoodType;

function useCompareSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const zip = searchParams.get("zip") || "";
  const type = (searchParams.get("type") as TypeOption) || "all";
  const sort = (searchParams.get("sort") as SortOption) || "price";

  const setParams = (
    updates: Partial<{ zip: string; type: TypeOption; sort: SortOption }>
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/compare?${params.toString()}`);
  };

  return { zip, type, sort, setParams };
}

function ComparePageContent() {
  const { zip, type, sort, setParams } = useCompareSearchParams();
  const [open, setOpen] = useState<string | null>(null);

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (type !== "all")
      list = list.filter((p) => p.types.includes(type as FoodType));
    if (sort === "price")
      list.sort(
        (a, b) => cheapestPrice(a).pricePerLb - cheapestPrice(b).pricePerLb
      );
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "brand") list.sort((a, b) => a.brand.localeCompare(b.brand));
    return list;
  }, [type, sort]);

  return (
    <div>
      {/* Page hero */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-end justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                · Section 01 · Price compare ·
              </span>
              <h1 className="mt-3 font-display text-5xl font-black leading-[0.9] md:text-8xl">
                The bowl
                <br />
                ledger.
              </h1>
            </div>
            <div className="hidden text-right md:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                ZIP
              </p>
              <p className="font-display text-4xl font-black text-foreground">
                {zip || "—"}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {zip ? "estimated local pricing" : "no zip set"}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setParams({ type: f.id })}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  type === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card/40 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="mx-3 hidden h-5 w-px bg-border md:inline-block" />
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Sort
              </span>
              {(["price", "rating", "brand"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setParams({ sort: s })}
                  className={`font-mono text-[11px] uppercase tracking-[0.2em] underline-grow ${
                    sort === s ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        {products.length === 0 ? (
          <Empty />
        ) : (
          <ul className="space-y-5">
            {products.map((p, i) => (
              <ProductRow
                key={p.id}
                product={p}
                index={i}
                open={open === p.id}
                onToggle={() => setOpen(open === p.id ? null : p.id)}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}

function ProductRow({
  product,
  index,
  open,
  onToggle,
}: {
  product: Product;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const cheap = cheapestPrice(product);
  return (
    <li className="overflow-hidden rounded-3xl border border-border bg-card/50 transition-colors hover:border-foreground/30">
      <button
        onClick={onToggle}
        className="grid w-full grid-cols-12 items-center gap-4 p-6 text-left md:gap-8 md:p-8"
      >
        <span className="col-span-1 font-mono text-xs text-muted-foreground md:text-sm">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <div className="col-span-11 md:col-span-5">
          <div className="flex flex-wrap items-center gap-2">
            {product.types.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-2 font-display text-2xl font-black leading-tight md:text-3xl">
            {product.brand}
          </h3>
          <p className="text-sm text-foreground/70">{product.line}</p>
        </div>

        <div className="col-span-6 md:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Cheapest at
          </p>
          <p className="font-display text-xl font-bold">{cheap.store}</p>
        </div>

        <div className="col-span-6 md:col-span-2 text-right md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Per lb
          </p>
          <p className="font-display text-3xl font-black text-primary">
            ${cheap.pricePerLb.toFixed(2)}
          </p>
        </div>

        <div className="col-span-12 flex items-center justify-end md:col-span-2 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
            {open ? "Hide stores" : "All stores"}
            <span
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-border bg-background/60 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Store ladder
              </h4>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-2 font-mono text-[10px] uppercase tracking-widest">
                      Store
                    </th>
                    <th className="py-2 font-mono text-[10px] uppercase tracking-widest">
                      Bag
                    </th>
                    <th className="py-2 font-mono text-[10px] uppercase tracking-widest">
                      Total
                    </th>
                    <th className="py-2 text-right font-mono text-[10px] uppercase tracking-widest">
                      $/lb
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...product.prices]
                    .sort((a, b) => a.pricePerLb - b.pricePerLb)
                    .map((row) => {
                      const best = row.pricePerLb === cheap.pricePerLb;
                      return (
                        <tr
                          key={row.store}
                          className="border-b border-border/50"
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold">
                                {row.store}
                              </span>
                              {best && (
                                <span className="ribbon bg-primary px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary-foreground">
                                  Best
                                </span>
                              )}
                              {!row.inStock && (
                                <span className="font-mono text-[9px] uppercase tracking-widest text-destructive">
                                  Out
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {row.shipping}
                            </span>
                          </td>
                          <td className="py-3 text-foreground/80">
                            {row.unit}
                          </td>
                          <td className="py-3 font-display font-bold">
                            ${row.price.toFixed(2)}
                          </td>
                          <td className="py-3 text-right font-mono font-bold text-primary">
                            ${row.pricePerLb.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="md:col-span-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Inside the bag
              </h4>
              <p className="mt-3 italic text-foreground/80">
                "{product.tagline}"
              </p>
              <div className="mt-5 grid grid-cols-3 gap-4 border-y border-border py-5">
                <Mini label="Rating" value={product.rating.toFixed(1)} />
                <Mini label="kcal/cup" value={product.kcalPerCup.toString()} />
                <Mini label="Protein" value={product.protein} />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                First 5 ingredients
              </p>
              <ol className="mt-2 space-y-1 text-sm">
                {product.ingredients.map((i, idx) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-muted-foreground">
                      0{idx + 1}
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ol>
              {product.badges && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-black">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-3xl border border-dashed border-border p-16 text-center">
      <p className="font-display text-3xl font-black">
        No bowls match those filters.
      </p>
      <p className="mt-2 text-muted-foreground">
        Try a different food type or clear the filter.
      </p>
    </div>
  );
}

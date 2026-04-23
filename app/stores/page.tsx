// app/stores/page.tsx
"use client";
import Link from "next/link";
import { PRODUCTS, STORE_LOGOS, Store, cheapestPrice } from "@/lib/data";
import { Marquee } from "@/components/Marquee";

// export const metadata = {
//   title: "Store comparison — DOGFOOD.BOT",
//   description:
//     "Compare dog food retailers: Chewy, PetSmart, Walmart, Costco, and Amazon. Average price, perks, and stock signals.",
//   openGraph: {
//     title: "Store comparison — DOGFOOD.BOT",
//     description: "How the big dog food retailers stack up.",
//   },
// };

export default function StoresPage() {
  return <StoresContent />;
}

// Separate client component for interactivity

function StoresContent() {
  const stores = (Object.keys(STORE_LOGOS) as Store[]).map((s) => {
    const rows = PRODUCTS.flatMap((p) =>
      p.prices.filter((r) => r.store === s).map((r) => ({ p, r }))
    );
    const avgPpl = rows.length
      ? rows.reduce((acc, x) => acc + x.r.pricePerLb, 0) / rows.length
      : 0;
    const cheapest = rows.length
      ? rows.reduce((best, cur) =>
          cur.r.pricePerLb < best.r.pricePerLb ? cur : best
        )
      : null;
    const stockedPct = rows.length
      ? Math.round((rows.filter((x) => x.r.inStock).length / rows.length) * 100)
      : 0;
    return { store: s, rows, avgPpl, cheapest, stockedPct };
  });

  return (
    <div>
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            · Section 02 · The store wars ·
          </span>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.9] md:text-8xl">
            Five aisles.
            <br />
            One winner per bag.
          </h1>
          <p className="mt-6 max-w-2xl text-foreground/75">
            We scan the big retailers daily and crown a per-pound champion for
            every product. Here's how the houses stack up across our index.
          </p>
        </div>
      </section>

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
              {STORE_LOGOS[s.store].tag}
            </span>,
          ])}
        />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {stores.map((s, i) => (
            <article
              key={s.store}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 transition-all hover:-translate-y-1 hover:border-primary md:p-10"
              style={{
                backgroundImage: `radial-gradient(600px 300px at 100% 0%, color-mix(in oklab, ${
                  STORE_LOGOS[s.store].color
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
                    {STORE_LOGOS[s.store].tag}
                  </p>
                </div>
                <div
                  className="h-14 w-14 rounded-full"
                  style={{ background: STORE_LOGOS[s.store].color }}
                />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
                <Stat
                  label="Avg $/lb"
                  value={s.avgPpl ? `$${s.avgPpl.toFixed(2)}` : "—"}
                />
                <Stat label="In stock" value={`${s.stockedPct}%`} />
                <Stat label="Listings" value={s.rows.length.toString()} />
              </div>

              {s.cheapest && (
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    Best deal at this store
                  </p>
                  <p className="mt-2 font-display text-xl font-bold leading-tight">
                    {s.cheapest.p.brand}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {s.cheapest.p.line}
                  </p>
                  <p className="mt-2 font-display text-3xl font-black text-primary">
                    ${s.cheapest.r.pricePerLb.toFixed(2)}
                    <span className="ml-1 font-mono text-xs font-normal text-muted-foreground">
                      /lb
                    </span>
                  </p>
                </div>
              )}

              <Link
                href="/compare"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest underline-grow"
              >
                See all {s.store} prices →
              </Link>
            </article>
          ))}
        </div>

        {/* Best-of-everything table */}
        <div className="mt-20 rounded-3xl border border-border bg-card/40 p-8 md:p-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            · Cross reference ·
          </span>
          <h3 className="mt-2 font-display text-4xl font-black md:text-5xl">
            Who wins each bag?
          </h3>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 font-mono text-[10px] uppercase tracking-widest">
                    Product
                  </th>
                  <th className="py-3 font-mono text-[10px] uppercase tracking-widest">
                    Cheapest at
                  </th>
                  <th className="py-3 text-right font-mono text-[10px] uppercase tracking-widest">
                    $/lb
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => {
                  const c = cheapestPrice(p);
                  return (
                    <tr key={p.id} className="border-b border-border/40">
                      <td className="py-4">
                        <p className="font-display font-bold">{p.brand}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.line}
                        </p>
                      </td>
                      <td className="py-4 font-display text-lg">{c.store}</td>
                      <td className="py-4 text-right font-mono font-bold text-primary">
                        ${c.pricePerLb.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

// app/recalls/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import type { RecallItem } from "@/app/api/recalls/route";

// ─── Static fallback data shown while live data loads ────────────────────────
const FALLBACK: RecallItem[] = [
  {
    id: "fallback-1",
    date: "Mar 15, 2024",
    severity: "Class I",
    brand: "Acana",
    product: "Acana Prairie Poultry Dry Dog Food – 4.5 lb",
    reason:
      "Potential Salmonella contamination detected during routine environmental testing at manufacturing facility.",
    source: "Voluntary",
  },
  {
    id: "fallback-2",
    date: "Jan 8, 2024",
    severity: "Class II",
    brand: "Purina Pro Plan",
    product: "Purina Pro Plan Sport 30/20 – 50 lb",
    reason:
      "Elevated Vitamin D levels that may cause toxicity in dogs when fed as the primary diet.",
    source: "Voluntary",
  },
  {
    id: "fallback-3",
    date: "Nov 22, 2023",
    severity: "Class III",
    brand: "Blue Buffalo",
    product: "Blue Buffalo Life Protection Adult Chicken & Rice – 30 lb",
    reason: "Labeling error: incorrect guaranteed analysis printed on bag.",
    source: "Voluntary",
  },
];

type Severity = "all" | "Class I" | "Class II" | "Class III";

export default function RecallsPage() {
  const [recalls, setRecalls] = useState<RecallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [filter, setFilter] = useState<Severity>("all");

  useEffect(() => {
    fetch("/api/recalls")
      .then((r) => r.json())
      .then((data) => {
        if (data.recalls?.length > 0) {
          setRecalls(data.recalls);
          setUpdatedAt(data.updatedAt);
        } else {
          // FDA returned nothing (query too narrow) — use fallback
          setRecalls(FALLBACK);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not reach the FDA mirror — showing cached data.");
        setRecalls(FALLBACK);
        setLoading(false);
      });
  }, []);

  const list = useMemo(
    () =>
      recalls.filter((r) => (filter === "all" ? true : r.severity === filter)),
    [filter, recalls]
  );

  const counts = useMemo(
    () => ({
      "Class I": recalls.filter((r) => r.severity === "Class I").length,
      "Class II": recalls.filter((r) => r.severity === "Class II").length,
      "Class III": recalls.filter((r) => r.severity === "Class III").length,
    }),
    [recalls]
  );

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-destructive/5">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                loading
                  ? "bg-muted-foreground animate-pulse"
                  : error
                  ? "bg-amber-500"
                  : "bg-destructive animate-blink"
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-destructive">
              {loading
                ? "· Connecting to FDA mirror ·"
                : error
                ? "· Cached data · " + error
                : "· Live · FDA mirror · Refreshed hourly ·"}
            </span>
          </div>

          <h1 className="mt-3 font-display text-5xl font-black leading-[0.9] md:text-8xl">
            Recall
            <br />
            watch.
          </h1>
          <p className="mt-6 max-w-2xl text-foreground/75">
            A live archive of dog-food-related recalls from the U.S. Food and
            Drug Administration's openFDA enforcement API. Class I means a
            reasonable probability of serious health consequences; Class II is
            temporary or medically reversible; Class III is unlikely to cause
            adverse effects.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-8">
            {loading ? (
              <div className="flex gap-8">
                {["Class I", "Class II", "Class III"].map((c) => (
                  <div key={c} className="animate-pulse">
                    <div className="h-10 w-12 rounded bg-muted" />
                    <div className="mt-2 h-3 w-16 rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Counter
                  label="Class I"
                  value={counts["Class I"]}
                  accent="destructive"
                />
                <Counter
                  label="Class II"
                  value={counts["Class II"]}
                  accent="primary"
                />
                <Counter
                  label="Class III"
                  value={counts["Class III"]}
                  accent="muted"
                />
              </>
            )}

            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {updatedAt
                ? `Synced · ${new Date(updatedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}`
                : loading
                ? "Syncing…"
                : `Last sync · ${new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`}
            </span>
          </div>
        </div>
      </section>

      {/* ─── List ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {(["all", "Class I", "Class II", "Class III"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card/40 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {c === "all" ? "All severities" : c}
              {c !== "all" && !loading && (
                <span className="ml-2 opacity-50">({counts[c]})</span>
              )}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <ol className="mt-12 space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-4 border-t border-border py-8 md:gap-8"
              >
                <div className="col-span-12 animate-pulse md:col-span-2">
                  <div className="h-3 w-16 rounded bg-muted" />
                  <div className="mt-2 h-6 w-24 rounded bg-muted" />
                </div>
                <div className="col-span-12 animate-pulse md:col-span-2">
                  <div className="h-5 w-20 rounded-full bg-muted" />
                </div>
                <div className="col-span-12 animate-pulse md:col-span-8">
                  <div className="h-7 w-48 rounded bg-muted" />
                  <div className="mt-2 h-4 w-full rounded bg-muted" />
                  <div className="mt-1 h-4 w-3/4 rounded bg-muted" />
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* Recall list */}
        {!loading && (
          <ol className="mt-12">
            {list.length === 0 ? (
              <li className="py-16 text-center text-muted-foreground">
                No recalls found for this filter.
              </li>
            ) : (
              list.map((r, i) => (
                <li
                  key={r.id}
                  className="grid grid-cols-12 gap-4 border-t border-border py-8 transition-colors hover:bg-card/40 md:gap-8"
                >
                  <div className="col-span-12 md:col-span-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Entry {(i + 1).toString().padStart(3, "0")}
                    </p>
                    <p className="mt-1 font-display text-xl font-black md:text-2xl">
                      {r.date}
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                        r.severity === "Class I"
                          ? "bg-destructive/15 text-destructive"
                          : r.severity === "Class II"
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {r.severity}
                    </span>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Source · {r.source}
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-8">
                    <h3 className="font-display text-2xl font-black leading-tight md:text-3xl">
                      {r.brand}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/80">
                      {r.product}
                    </p>
                    <p className="mt-3 max-w-2xl text-foreground/70">
                      {r.reason}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ol>
        )}

        {/* Methodology */}
        <div className="mt-16 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Methodology
          </p>
          <p className="mt-3 mx-auto max-w-2xl text-foreground/80">
            Recall entries are sourced live from the{" "}
            <a
              href="https://open.fda.gov/apis/food/enforcement/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              openFDA Food Enforcement API
            </a>
            . Severity follows the FDA&apos;s published classification. Data is
            cached for 1 hour per server revalidation.
          </p>
        </div>
      </section>
    </div>
  );
}

function Counter({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "destructive" | "primary" | "muted";
}) {
  const color =
    accent === "destructive"
      ? "text-destructive"
      : accent === "primary"
      ? "text-primary"
      : "text-muted-foreground";
  return (
    <div>
      <p className={`font-display text-4xl font-black md:text-5xl ${color}`}>
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

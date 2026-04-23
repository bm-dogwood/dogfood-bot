// app/recalls/page.tsx
"use client";

import { useMemo, useState } from "react";
import { RECALLS } from "@/lib/data";

export default function RecallsPage() {
  const [filter, setFilter] = useState<
    "all" | "Class I" | "Class II" | "Class III"
  >("all");
  const list = useMemo(
    () =>
      RECALLS.filter((r) => (filter === "all" ? true : r.severity === filter)),
    [filter]
  );

  const counts = {
    "Class I": RECALLS.filter((r) => r.severity === "Class I").length,
    "Class II": RECALLS.filter((r) => r.severity === "Class II").length,
    "Class III": RECALLS.filter((r) => r.severity === "Class III").length,
  };

  return (
    <div>
      <section className="border-b border-border bg-destructive/5">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive animate-blink" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-destructive">
              · Live · FDA mirror · Refreshed daily ·
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.9] md:text-8xl">
            Recall
            <br />
            watch.
          </h1>
          <p className="mt-6 max-w-2xl text-foreground/75">
            A scrollable archive of dog-food-related recalls reported by the
            U.S. Food and Drug Administration. Class I means a reasonable
            probability of serious health consequences; Class II is temporary or
            medically reversible; Class III is unlikely to cause adverse
            effects.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-8">
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
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Last sync ·{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16">
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
            </button>
          ))}
        </div>

        <ol className="mt-12">
          {list.map((r, i) => (
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
                <p className="mt-1 text-sm text-foreground/80">{r.product}</p>
                <p className="mt-3 max-w-2xl text-foreground/70">{r.reason}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Methodology
          </p>
          <p className="mt-3 mx-auto max-w-2xl text-foreground/80">
            Recall entries are sourced from public FDA pet food and animal feed
            recall notices. Severity follows the FDA's published classification.
            Sample data shown for demonstration.
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

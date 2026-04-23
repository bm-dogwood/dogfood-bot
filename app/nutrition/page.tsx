// app/nutrition/page.tsx

"use client";

import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import kibble from "@/public/kibble.jpeg";

// export const metadata = {
//   title: "Nutrition lab — DOGFOOD.BOT",
//   description:
//     "Side-by-side dog food nutrition comparison. Calories per cup, ingredients, protein source, and quality flags.",
//   openGraph: {
//     title: "Nutrition lab — DOGFOOD.BOT",
//     description: "Compare dog food nutrition, decoded.",
//   },
// };

export default function NutritionPage() {
  return <NutritionContent />;
}

// Separate client component for interactivity

import { useMemo, useState } from "react";

function NutritionContent() {
  const [a, setA] = useState(PRODUCTS[0].id);
  const [b, setB] = useState(PRODUCTS[1].id);

  const A = useMemo(() => PRODUCTS.find((p) => p.id === a)!, [a]);
  const B = useMemo(() => PRODUCTS.find((p) => p.id === b)!, [b]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 opacity-25">
          <Image src={kibble} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-32">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            · Section 04 · The lab ·
          </span>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.85] md:text-8xl">
            Read the
            <br />
            <span className="italic text-primary">label</span> like
            <br />a vet would.
          </h1>
          <p className="mt-6 max-w-2xl text-foreground/80">
            Pick two foods. We line up the kcal, the protein source, the first
            five ingredients, and the quality flags. No buzzwords. No marketing.
            Just the panel.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <ProductPicker
            label="Bowl A"
            tone="primary"
            value={a}
            onChange={setA}
          />
          <ProductPicker
            label="Bowl B"
            tone="accent"
            value={b}
            onChange={setB}
          />
        </div>

        {/* Versus Header */}
        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Card>
            <Tag color="primary">Bowl A</Tag>
            <h2 className="mt-2 font-display text-3xl font-black md:text-5xl">
              {A.brand}
            </h2>
            <p className="text-sm text-foreground/70">{A.line}</p>
          </Card>
          <div className="flex justify-center">
            <span className="font-display text-7xl font-black text-primary md:text-8xl">
              vs
            </span>
          </div>
          <Card>
            <Tag color="accent">Bowl B</Tag>
            <h2 className="mt-2 font-display text-3xl font-black md:text-5xl">
              {B.brand}
            </h2>
            <p className="text-sm text-foreground/70">{B.line}</p>
          </Card>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <NutritionPanel p={A} other={B} />
          <NutritionPanel p={B} other={A} />
        </div>

        {/* Quality flags */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <FlagsCard p={A} />
          <FlagsCard p={B} />
        </div>
      </section>
    </div>
  );
}

function ProductPicker({
  label,
  value,
  onChange,
  tone,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  tone: "primary" | "accent";
}) {
  return (
    <label className="block">
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.3em] ${
          tone === "primary" ? "text-primary" : "text-accent"
        }`}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none rounded-2xl border border-border bg-card/60 px-5 py-4 font-display text-xl font-bold focus:border-primary focus:outline-none"
      >
        {PRODUCTS.map((p) => (
          <option key={p.id} value={p.id} className="bg-background">
            {p.brand} — {p.line}
          </option>
        ))}
      </select>
    </label>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card/50 p-7">
      {children}
    </div>
  );
}

function Tag({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "primary" | "accent";
}) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.3em] ${
        color === "primary" ? "text-primary" : "text-accent"
      }`}
    >
      {children}
    </span>
  );
}

function NutritionPanel({
  p,
  other,
}: {
  p: (typeof PRODUCTS)[number];
  other: (typeof PRODUCTS)[number];
}) {
  const rows = [
    {
      label: "Calories / cup",
      value: p.kcalPerCup,
      otherVal: other.kcalPerCup,
      suffix: " kcal",
    },
    {
      label: "Rating (community)",
      value: p.rating,
      otherVal: other.rating,
      suffix: " / 5",
    },
  ];
  return (
    <Card>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Guaranteed analysis
      </h3>
      <div className="mt-4 divide-y divide-border">
        {rows.map((r) => {
          const better = r.value > r.otherVal;
          return (
            <div
              key={r.label}
              className="flex items-center justify-between py-4"
            >
              <span className="text-sm text-foreground/80">{r.label}</span>
              <span className="flex items-baseline gap-2">
                <span
                  className={`font-display text-2xl font-black ${
                    better ? "text-primary" : ""
                  }`}
                >
                  {r.value}
                  <span className="font-mono text-xs font-normal text-muted-foreground">
                    {r.suffix}
                  </span>
                </span>
              </span>
            </div>
          );
        })}
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-foreground/80">Primary protein</span>
          <span className="font-display text-xl font-bold">{p.protein}</span>
        </div>
      </div>

      <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        First 5 ingredients
      </h3>
      <ol className="mt-3 space-y-2">
        {p.ingredients.map((i, idx) => (
          <li
            key={i}
            className="flex items-baseline gap-3 border-b border-border/40 pb-2"
          >
            <span className="font-mono text-xs text-muted-foreground">
              0{idx + 1}
            </span>
            <span className="text-foreground/90">{i}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function FlagsCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  const flags = [
    {
      ok: !p.ingredients.some((i) => /by-product/i.test(i)),
      label: "No by-products",
    },
    { ok: p.types.includes("grain-free"), label: "Grain-free option" },
    {
      ok: /chicken|salmon|beef|turkey|lamb|fish/i.test(p.ingredients[0]),
      label: "Real meat first",
    },
    { ok: p.protein.length > 0, label: "Single-source protein" },
    { ok: p.kcalPerCup >= 360, label: "Energy-dense (≥360 kcal/cup)" },
  ];
  return (
    <Card>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Quality flags · {p.brand}
      </h3>
      <ul className="mt-4 space-y-3">
        {flags.map((f) => (
          <li key={f.label} className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                f.ok
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {f.ok ? "✓" : "—"}
            </span>
            <span
              className={
                f.ok ? "text-foreground" : "text-muted-foreground line-through"
              }
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

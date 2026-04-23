// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import heroDog from "@/public/hero.png";
import kibble from "@/public/kibble.jpeg";
import puppy from "@/public/puppy.jpeg";
import senior from "@/public/senior.jpeg";
import terrier from "@/public/terrier.jpeg";
import bowl from "@/public/bowl.jpeg";
import { Marquee } from "@/components/Marquee";
import { ZipSearch } from "@/components/ZipSearch";
import { PRODUCTS, RECALLS, cheapestPrice } from "@/lib/data";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const featured = PRODUCTS.slice(0, 3);
  const latestRecall = RECALLS[0];

  return (
    <>
      {/* HERO — magazine cover, dog blended into background */}
      <section className="relative overflow-hidden">
        {/* Free-floating dog cutout, anchored to right edge, gazing toward the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[58%] md:block lg:w-[52%]"
        >
          {/* radial wash behind the dog so it feels lit, not pasted */}
          <div className="absolute right-[-10%] top-1/2 h-[120%] w-[90%] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--amber-kibble)_22%,transparent)_0%,transparent_60%)] blur-2xl" />
          <Image
            src={heroDog}
            alt=""
            className="absolute bottom-0 right-[-4%] h-[108%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
            width={1080}
            height={1600}
            priority
          />
          {/* bottom fade so the dog dissolves into the page */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
          {/* left fade so the title stays readable on top of the fur */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-16 pt-10 md:grid-cols-12 md:gap-8 md:px-10 md:pb-32 md:pt-14">
          {/* Left: cover lines */}
          <div className="md:col-span-8">
            <CoverMasthead />

            <h1 className="mt-8 font-display text-[64px] font-black leading-[0.85] tracking-[-0.04em] md:text-[140px]">
              The
              <br />
              <span className="italic text-primary">cheapest</span>
              <br />
              bowl in
              <br />
              <span className="text-stroke">your zip.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              An independent index of{" "}
              <span className="text-foreground">dog food prices</span>,{" "}
              <span className="text-foreground">ingredient quality</span>, and{" "}
              <span className="text-foreground">FDA recalls</span>. Punch in
              your ZIP. We do the sniffing.
            </p>

            <div className="mt-10 max-w-xl">
              <ZipSearch />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8 md:max-w-xl">
              <Stat label="Brands tracked" value="148" />
              <Stat label="Stores indexed" value="5" />
              <Stat label="Recalls archived" value="312" />
            </div>
          </div>

          {/* Right column: editorial annotations floating over the dog */}
          <div className="relative hidden md:col-span-4 md:block">
            <div className="absolute right-0 top-2 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary animate-blink" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                Cover dog №07
              </span>
            </div>

            <div className="absolute right-0 top-32 max-w-[200px] text-right">
              <div className="ml-auto h-px w-16 bg-border" />
              <p className="mt-3 font-display text-xl italic leading-tight">
                "I'd like the salmon, please."
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Murphy · 6yr · Golden Retriever
              </p>
            </div>

            <div className="absolute -right-2 bottom-8 h-32 w-32 rotate-[-8deg] flex items-center justify-center rounded-full bg-primary p-4 text-center shadow-2xl animate-tilt">
              <span className="font-display text-sm font-black uppercase leading-tight text-primary-foreground">
                Sniff
                <br />
                tested
                <br />
                approved
              </span>
            </div>
          </div>

          {/* Mobile-only dog (centered, since the absolute layer is hidden on mobile) */}
          <div className="relative -mt-4 md:hidden">
            <Image
              src={heroDog}
              alt="Editorial portrait of a golden retriever looking toward the headline"
              className="mx-auto block h-auto w-3/4 max-w-sm drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
              width={1080}
              height={1600}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-border bg-card/30 py-5">
          <Marquee
            items={[
              <Tag key="t1">No affiliate spam</Tag>,
              <Tag key="t2">Updated daily</Tag>,
              <Tag key="t3">Real ingredient panels</Tag>,
              <Tag key="t4">FDA recall mirror</Tag>,
              <Tag key="t5">Per-pound math, done right</Tag>,
              <Tag key="t6">Built by dog people</Tag>,
              <Tag key="t7">5 stores · 1 bowl</Tag>,
            ]}
          />
        </div>
      </section>

      {/* SECTION 02 — Features grid */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeader
          number="02"
          kicker="Inside the bowl"
          title="Five tools, one index."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          <FeatureCard
            href="/compare"
            tone="primary"
            className="md:col-span-7 md:row-span-2"
            tag="01 · Price compare"
            title="Compare every brand & bag."
            body="Sort by price-per-pound across dry, wet, grain-free, puppy, and senior recipes. Filter by protein. See exactly how much a bowl costs."
            image={kibble.src}
            big
          />
          <FeatureCard
            href="/stores"
            className="md:col-span-5"
            tag="02 · Store map"
            title="Chewy, PetSmart, Walmart, Costco."
            body="Side-by-side store pricing. We surface who's cheapest, who's in stock, who ships free."
            image={bowl.src}
          />
          <FeatureCard
            href="/recalls"
            tone="alert"
            className="md:col-span-5"
            tag="03 · Recall feed"
            title="FDA alerts. Live."
            body="A scrollable archive of every recent recall, with class severity and date."
            image={terrier.src}
          />
          <FeatureCard
            href="/nutrition"
            className="md:col-span-6"
            tag="04 · Nutrition lab"
            title="Ingredients, decoded."
            body="Side-by-side guaranteed analysis. Calories per cup. By-product checker. No marketing fluff."
            image={senior.src}
          />
          <FeatureCard
            href="/compare?type=puppy"
            className="md:col-span-6"
            tag="05 · Life-stage filters"
            title="Puppy, adult, senior."
            body="Every recipe tagged for life stage and dietary need so you stop scrolling and start feeding."
            image={puppy.src}
          />
        </div>
      </section>

      {/* SECTION 03 — Recall ticker / cheapest right now */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 px-0 md:grid-cols-2">
          <div className="border-b border-border p-10 md:border-b-0 md:border-r md:p-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-destructive">
              · Recall watch · Live ·
            </span>
            <h3 className="mt-4 font-display text-4xl font-black leading-tight md:text-5xl">
              Latest FDA alert
            </h3>
            <div className="mt-8 rounded-2xl border border-destructive/40 bg-destructive/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-destructive">
                  {latestRecall.severity} · {latestRecall.date}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Source · {latestRecall.source}
                </span>
              </div>
              <h4 className="mt-3 font-display text-2xl font-bold">
                {latestRecall.brand}
              </h4>
              <p className="mt-1 text-sm text-foreground/80">
                {latestRecall.product}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {latestRecall.reason}
              </p>
              <Link
                href="/recalls"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground underline-grow"
              >
                View full archive →
              </Link>
            </div>
          </div>

          <div className="p-10 md:p-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              · Cheapest right now ·
            </span>
            <h3 className="mt-4 font-display text-4xl font-black leading-tight md:text-5xl">
              The deal sniff.
            </h3>
            <ul className="mt-8 space-y-4">
              {featured.map((p, i) => {
                const cheap = cheapestPrice(p);
                return (
                  <li key={p.id}>
                    <Link
                      href="/compare"
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:border-primary"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          0{i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-display text-lg font-bold leading-tight">
                            {p.brand}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {p.line}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          {cheap.store}
                        </p>
                        <p className="font-display text-2xl font-black text-primary">
                          ${cheap.pricePerLb.toFixed(2)}
                          <span className="ml-1 font-mono text-xs font-normal text-muted-foreground">
                            /lb
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 04 — Big quote / manifesto */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <SectionHeader
          number="04"
          kicker="Manifesto"
          title="A bowl is a contract."
        />
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Your dog can't read a label.{" "}
              <span className="text-primary">We can.</span> So we built a free
              tool that compares every brand, every bag, every store, every
              recall — without taking a cut from any of them.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
              <Stat label="Independent" value="100%" />
              <Stat label="Affiliate links" value="Zero" />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border grain-overlay">
              <Image
                src={terrier}
                alt="Studio portrait of a scruffy terrier mid-bark"
                className="h-full w-full object-cover"
                width={1024}
                height={1024}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <p className="font-display text-xl italic leading-tight">
                  "Pay attention."
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Reggie · 4yr
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="relative overflow-hidden rounded-[40px] border border-border bg-gradient-to-br from-primary/20 via-card to-card p-10 text-center md:p-20 grain-overlay">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            · Step one ·
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] md:text-7xl">
            Drop a ZIP.
            <br />
            <span className="italic text-primary">Save the bowl.</span>
          </h2>
          <div className="mx-auto mt-10 max-w-2xl">
            <ZipSearch />
          </div>
        </div>
      </section>
    </>
  );
}

function CoverMasthead() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
        Vol. 04 · Issue 12
      </span>
      <span className="h-px w-10 bg-border" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        The dog food index
      </span>
      <span className="h-px w-10 bg-border" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        $0.00 — free for dogs
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-black md:text-4xl">
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/80">
      {children}
    </span>
  );
}

function SectionHeader({
  number,
  kicker,
  title,
}: {
  number: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
      <div className="md:col-span-2">
        <span className="font-display text-7xl font-black text-primary md:text-8xl">
          {number}
        </span>
      </div>
      <div className="md:col-span-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          · {kicker} ·
        </span>
        <h2 className="mt-2 font-display text-5xl font-black leading-[0.95] md:text-7xl">
          {title}
        </h2>
        <div className="dotted-divider mt-8" />
      </div>
    </div>
  );
}

function FeatureCard({
  href,
  tone = "default",
  className = "",
  tag,
  title,
  body,
  image,
  big = false,
}: {
  href: string;
  tone?: "default" | "primary" | "alert";
  className?: string;
  tag: string;
  title: string;
  body: string;
  image: string;
  big?: boolean;
}) {
  const toneRing =
    tone === "primary"
      ? "hover:border-primary"
      : tone === "alert"
      ? "hover:border-destructive"
      : "hover:border-foreground/40";
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/60 p-7 transition-all hover:-translate-y-1 ${toneRing} ${className}`}
    >
      <div className="absolute inset-0 -z-10 opacity-30 transition-opacity group-hover:opacity-50">
        <Image src={image} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/30" />
      </div>

      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          {tag}
        </span>
        <h3
          className={`mt-4 font-display font-black leading-[0.95] ${
            big ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-4 max-w-md text-foreground/75 ${
            big ? "text-base md:text-lg" : "text-sm"
          }`}
        >
          {body}
        </p>
      </div>

      <div
        className={`mt-8 flex items-center gap-2 font-mono uppercase tracking-widest ${
          big ? "text-sm" : "text-xs"
        }`}
      >
        Open
        <span className="inline-block transition-transform group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  );
}

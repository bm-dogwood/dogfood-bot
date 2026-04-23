"use client";

import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-border bg-card/40">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-5xl font-black leading-[0.9]">
              Better bowls.
              <br />
              <span className="text-stroke-amber">Better prices.</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              DOGFOOD.BOT is an independent index of dog food pricing,
              ingredients, and recalls. We are not affiliated with any retailer.
              Sample data shown for demonstration.
            </p>
          </div>

          <FooterCol
            title="Tools"
            links={[
              { href: "/compare", label: "Price compare" },
              { href: "/nutrition", label: "Nutrition lab" },
              { href: "/stores", label: "Store map" },
              { href: "/recalls", label: "FDA recalls" },
            ]}
          />
          <FooterCol
            title="Eat by"
            links={[
              { href: "/compare?type=dry", label: "Dry kibble" },
              { href: "/compare?type=wet", label: "Wet food" },
              { href: "/compare?type=grain-free", label: "Grain-free" },
              { href: "/compare?type=puppy", label: "Puppy" },
              { href: "/compare?type=senior", label: "Senior" },
            ]}
          />
          <FooterCol
            title="The fine print"
            links={[
              { href: "/", label: "About the index" },
              { href: "/recalls", label: "How we source recalls" },
              { href: "/nutrition", label: "Nutrition methodology" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © {year} dogfood.bot — issue №
            {(year - 2020).toString().padStart(2, "0")}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Built for the dogs · not the algorithm
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-foreground/80 underline-grow"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

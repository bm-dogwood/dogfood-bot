"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/compare", label: "Compare" },
  { href: "/stores", label: "Stores" },
  { href: "/recalls", label: "Recalls" },
  { href: "/nutrition", label: "Nutrition" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-2xl font-black leading-none">
              D
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent animate-blink" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-black tracking-tight">
              DOGFOOD<span className="text-primary">.BOT</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              A bowl-first index
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`underline-grow font-mono text-xs uppercase tracking-[0.2em] hover:text-foreground ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/compare"
            className="hidden rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.03] md:inline-block"
          >
            Find cheapest
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border md:hidden"
          >
            <span
              className={`h-px w-5 bg-foreground transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-foreground transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-display text-3xl font-black ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {item.label}.
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

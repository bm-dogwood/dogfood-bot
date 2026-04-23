"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ZipSearch({ size = "lg" }: { size?: "lg" | "md" }) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = /^\d{5}$/.test(zip);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    // Navigate with query param
    router.push(`/compare?zip=${zip}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`group relative flex w-full items-stretch overflow-hidden rounded-full border border-border bg-card/80 backdrop-blur-xl transition-all focus-within:border-primary focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--amber-kibble)_25%,transparent)] ${
        size === "lg" ? "h-16 md:h-20" : "h-14"
      }`}
    >
      <span
        className={`flex items-center pl-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground ${
          size === "lg" ? "md:text-xs" : ""
        }`}
      >
        ZIP
      </span>

      <input
        inputMode="numeric"
        maxLength={5}
        value={zip}
        onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
        placeholder="94110"
        className={`flex-1 bg-transparent px-4 font-display font-black tracking-tight text-foreground placeholder:text-muted-foreground/50 focus:outline-none ${
          size === "lg" ? "text-3xl md:text-5xl" : "text-2xl"
        }`}
        aria-label="Enter your ZIP code"
      />

      <button
        type="submit"
        className={`flex shrink-0 items-center gap-2 bg-primary px-6 font-mono font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] md:px-10 ${
          size === "lg" ? "text-xs md:text-sm" : "text-xs"
        }`}
      >
        Sniff prices
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      {touched && !valid && (
        <span className="pointer-events-none absolute -bottom-7 left-6 font-mono text-[10px] uppercase tracking-widest text-destructive">
          Need 5 digits, friend
        </span>
      )}
    </form>
  );
}

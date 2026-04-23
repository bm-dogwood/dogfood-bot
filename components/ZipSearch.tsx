"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface KrogerLocation {
  locationId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  chain: string;
  distance: number;
}

export function ZipSearch({ size = "lg" }: { size?: "lg" | "md" }) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [touched, setTouched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [nearbyStore, setNearbyStore] = useState<KrogerLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const valid = /^\d{5}$/.test(zip);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    setSearching(true);
    setNearbyStore(null);
    setLocationError(null);

    // Prefetch Kroger locations for the ZIP in the background
    try {
      const res = await fetch(`/api/stores/kroger/locations?zip=${zip}`);
      const data = await res.json();
      if (data.locations?.length > 0) {
        setNearbyStore(data.locations[0]);
      } else {
        setLocationError("No Kroger banner stores found near this ZIP.");
      }
    } catch {
      setLocationError("Could not look up nearby stores.");
    } finally {
      setSearching(false);
    }

    // Navigate with query param (Kroger locationId will be appended if found)
    router.push(`/compare?zip=${zip}`);
  };

  return (
    <div className="w-full">
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
          disabled={searching}
          className={`flex shrink-0 items-center gap-2 bg-primary px-6 font-mono font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 md:px-10 ${
            size === "lg" ? "text-xs md:text-sm" : "text-xs"
          }`}
        >
          {searching ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sniffing…
            </>
          ) : (
            <>
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
            </>
          )}
        </button>

        {touched && !valid && (
          <span className="pointer-events-none absolute -bottom-7 left-6 font-mono text-[10px] uppercase tracking-widest text-destructive">
            Need 5 digits, friend
          </span>
        )}
      </form>

      {/* Kroger nearby store feedback (appears below the search bar) */}
      {nearbyStore && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-5 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
            K
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm font-bold">{nearbyStore.name}</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {nearbyStore.address}, {nearbyStore.city} ·{" "}
              {nearbyStore.distance.toFixed(1)} mi
            </p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            {nearbyStore.chain}
          </span>
        </div>
      )}

      {locationError && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {locationError}
        </p>
      )}
    </div>
  );
}

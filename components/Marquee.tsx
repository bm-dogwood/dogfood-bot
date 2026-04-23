"use client";

import { ReactNode } from "react";

export function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
}) {
  // Duplicate so loop is seamless
  const doubled = [...items, ...items];
  return (
    <div className={`ticker-mask overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center gap-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-12">
            {item}
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-primary" />;
}

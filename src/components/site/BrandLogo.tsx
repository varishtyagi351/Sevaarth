import React from "react";
import defaultLogo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  src?: string;
  className?: string;
  showTagline?: boolean;
}

export function BrandLogo({
  src = defaultLogo,
  className,
  showTagline = true,
}: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-3 sm:gap-3.5 select-none py-1", className)}>
      {/* Bada Brand Emblem */}
      <div className="relative flex shrink-0 items-center justify-center">
        <img
          src={src}
          alt="Sevaarth Logo"
          loading="eager"
          decoding="async"
          className="h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Prominent Brand Name & Tagline */}
      <div className="flex flex-col justify-center text-left leading-tight">
        <span className="font-display text-2xl sm:text-3xl md:text-[28px] font-bold tracking-tight text-primary">
          Sevaarth
        </span>
        {showTagline && (
          <span className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700/85 dark:text-amber-400">
            From Tradition to Nutrition
          </span>
        )}
      </div>
    </div>
  );
}

export default BrandLogo;
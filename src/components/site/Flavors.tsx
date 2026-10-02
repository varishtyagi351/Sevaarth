
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export function Flavors() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable arrow buttons
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -320 : 320;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="flavors" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      {/* Section Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-6 md:mb-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">
            Upcoming
          </p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Six Ways to Snack Clean
          </h2>
          <p className="mt-1.5 max-w-md text-xs text-muted-foreground sm:text-sm">
            Roasted in small batches, never fried. Swipe or scroll to explore the range.
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            disabled={!canScrollLeft}
            onClick={() => handleScroll("left")}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-muted active:scale-95",
              !canScrollLeft && "cursor-not-allowed opacity-40 hover:bg-background"
            )}
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            disabled={!canScrollRight}
            onClick={() => handleScroll("right")}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-muted active:scale-95",
              !canScrollRight && "cursor-not-allowed opacity-40 hover:bg-background"
            )}
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Cards Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-1 sm:mx-0 sm:gap-5 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <a
            key={p.id}
            href="#shop"
            className="group w-[230px] shrink-0 snap-start transition-transform focus:outline-none sm:w-[260px] md:w-[280px]"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
              {/* Product Image Frame */}
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.flavour || p.name}
                  loading="lazy"
                  width={912}
                  height={912}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Card Meta */}
              <div className="p-4 sm:p-5">
                <h3 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                  {p.flavour}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {p.note}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Flavors;
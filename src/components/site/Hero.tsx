
import { Leaf, Droplets, Dumbbell, Sprout, Star } from "lucide-react";
import heroImg from "./../../assets/hero-makhana.jpg";

const badges = [
  { icon: Leaf, label: "100% Organic" },
  { icon: Droplets, label: "Zero Trans Fat" },
  { icon: Dumbbell, label: "High Protein" },
  { icon: Sprout, label: "Farm Sourced" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-muted/40 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Column: Heading, Pitch & CTAs */}
        <div className="flex flex-col items-start text-left">
          {/* Tagline Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
            <Leaf className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Mithila, Bihar</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl sm:leading-[1.12]">
            Pure, Roasted &amp; Handpicked Makhana Straight from Mithila
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Rooted in tradition, packed with natural nutrition. 100% gluten-free, guilt-free
            superfood snacking for modern living.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#shop"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95"
            >
              Shop Best Sellers
            </a>
            <a
              href="#flavors"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground shadow-sm transition-all hover:bg-muted active:scale-95"
            >
              Explore Flavors
            </a>
          </div>

          {/* Key Value Badges */}
          <ul className="mt-10 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {badges.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 rounded-xl border border-border bg-background/90 p-2.5 shadow-sm backdrop-blur-sm"
              >
                <b.icon className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="truncate text-xs font-semibold text-foreground/85">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Hero Visual Image with Floating Social Proof */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Ambient Glow */}
          <div className="absolute -inset-2 rounded-[2.5rem] bg-amber-500/10 blur-2xl dark:bg-amber-400/5 sm:-inset-4" />

          {/* Hero Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-border/80 bg-muted shadow-2xl">
            <img
              src={heroImg}
              alt="Bowl of freshly roasted Sevaarth organic makhana"
              width={1408}
              height={1408}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating Rating Card */}
          <div className="absolute bottom-4 left-4 rounded-2xl border border-border/90 bg-background/95 p-3.5 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:p-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-foreground sm:text-2xl">4.9</span>
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
            </div>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              1,900+ Happy Snackers
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
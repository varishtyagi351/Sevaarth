import React from "react";
import { Award, HeartHandshake, Sparkles, Sprout, CheckCircle2 } from "lucide-react";

export function Story() {
  return (
    <section id="story" className="scroll-mt-20 bg-[#FAF8F5] py-16 sm:py-24 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            <Sprout className="h-3.5 w-3.5" /> Our Roots &amp; Heritage
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Rooted in Tradition, Harvested with Purity
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
            Sevaarth Organics brings you the ancient superfood directly from the tranquil lotus wetlands of Mithila, Bihar[cite: 1, 2]. We bridge generational harvesting wisdom with modern culinary hygiene.
          </p>
        </div>

        {/* Story Grid */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column: Image Collage */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 shadow-xl dark:border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087"
                alt="Mithila Makhana Harvesting"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Floating Highlight Badge */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95 sm:right-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-800 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-stone-900 dark:text-white">GI Tag Certified</p>
                  <p className="text-xs text-stone-500">Mithila Makhana Authenticity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Commitments */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-emerald-950 dark:text-emerald-300">
              Why Sevaarth Is More Than Just a Snack
            </h3>
            
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Every foxnut is handpicked by experienced local farmers who harvest the seeds from deep water ponds, wash them in clean water, and sun-dry them naturally without bleach or sulfur treatments.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <h4 className="mt-2 text-sm font-bold">Zero Chemicals</h4>
                <p className="mt-1 text-xs text-stone-500">Unbleached natural white pops with authentic crunch.</p>
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
                <HeartHandshake className="h-5 w-5 text-emerald-700" />
                <h4 className="mt-2 text-sm font-bold">Fair Farmer Share</h4>
                <p className="mt-1 text-xs text-stone-500">Direct trade sourcing ensuring honest wages to farming families.</p>
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
                <Sparkles className="h-5 w-5 text-emerald-700" />
                <h4 className="mt-2 text-sm font-bold">Olive Oil Roasted</h4>
                <p className="mt-1 text-xs text-stone-500">Lightly toasted in cold-pressed olive oil for heart health.</p>
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
                <Sprout className="h-5 w-5 text-emerald-700" />
                <h4 className="mt-2 text-sm font-bold">Sustainably Packed</h4>
                <p className="mt-1 text-xs text-stone-500">Airtight multi-layer freshness pouch to retain crunch.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Story;
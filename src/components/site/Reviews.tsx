import React from "react";
import { BadgeCheck, Star } from "lucide-react";

interface ReviewItem {
  name: string;
  city: string;
  text: string;
}

const reviews: ReviewItem[] = [
  {
    name: "Ananya Sharma",
    city: "Bengaluru",
    text: "The peri peri pack is dangerously good — crunchy till the last piece and not oily at all. My 4 pm chips habit is officially over.",
  },
  {
    name: "Rohit Verma",
    city: "Pune",
    text: "Jumbo pink salt makhana is genuinely jumbo. Big, light pops with a clean salty finish. Reordered twice in a month.",
  },
  {
    name: "Dr. Meera Iyer",
    city: "Chennai",
    text: "I recommend these to my diabetic patients. Raw phool makhana quality is excellent for kheer too — no bleached smell.",
  },
  {
    name: "Kabir Anand",
    city: "Delhi",
    text: "Packaging arrived sealed and fresh. Cream & onion pack of 3 disappeared in a week thanks to the kids.",
  },
];

export function Reviews() {
  return (
    <section className="bg-primary py-12 text-primary-foreground sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Verified Buyers
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Loved for the Crunch
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs text-primary-foreground/80 sm:text-sm">
            Real feedback from thousands of healthy snackers across India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/15 sm:p-6"
            >
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-300 text-amber-300"
                    />
                  ))}
                </div>

                <blockquote className="mt-3 text-xs leading-relaxed text-white/90 sm:text-sm">
                  “{r.text}”
                </blockquote>
              </div>

              <figcaption className="mt-5 flex items-center gap-2 border-t border-white/10 pt-3 text-xs">
                <BadgeCheck className="h-4 w-4 shrink-0 text-amber-300" />
                <span className="truncate font-semibold text-white">{r.name}</span>
                <span className="shrink-0 text-white/70">· {r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reviews;
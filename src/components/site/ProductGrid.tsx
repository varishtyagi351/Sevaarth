import React, { useEffect, useState } from "react";
import { Star, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { products as fallbackProducts } from "@/lib/products";

// Unified Product Type
interface DisplayProduct {
  id: string | number;
  name: string;
  weight: string;
  image: string;
  tag?: string | null;
  rating?: number;
  reviews?: number;
  note?: string;
}

function ProductCard({ product }: { product: DisplayProduct }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* Product Image & Badge Tag */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Dynamic Badge Tag */}
        {product.tag && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
            <Sparkles className="h-3 w-3" />
            {product.tag}
          </span>
        )}
      </div>

      {/* Card Details (Showcase View) */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span>{product.rating || 5.0}</span>
          <span className="font-normal text-muted-foreground">
            ({product.reviews || 28} reviews)
          </span>
        </div>

        {/* Product Name */}
        <h3 className="mt-2 text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {product.name}
        </h3>

        {/* Net Weight */}
        <p className="mt-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
          Net Weight: {product.weight}
        </p>

        {/* Optional Note / Description */}
        {product.note && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {product.note}
          </p>
        )}
      </div>
    </article>
  );
}

export function ProductGrid() {
  const [items, setItems] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Supabase database se live products fetch
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setItems(data);
        } else {
          // Agar Supabase me koi data na ho to fallback catalog show hoga
          setItems(fallbackProducts as DisplayProduct[]);
        }
      } catch (err) {
        console.error("Error loading products from Supabase:", err);
        setItems(fallbackProducts as DisplayProduct[]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section
      id="product"
      className="scroll-mt-24 bg-muted/30 py-12 sm:py-16 lg:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">
            Handpicked &amp; Slow Roasted
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Explore the Sevaarth Pantry
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Every pack is hand-popped, slow-roasted, and sealed within 24 hours to preserve authentic crunch.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-xs font-medium text-muted-foreground">
              Loading pantry items...
            </p>
          </div>
        ) : (
          /* Responsive Product Showcase Grid */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

        {/* Section Footer Note */}
        <p id="raw" className="mt-10 text-center text-xs leading-relaxed text-muted-foreground sm:mt-12">
          Looking for raw or jumbo grade? The Phool Makhana and Himalayan Pink Salt Jumbo packs
          above are graded 6+ suta quality.
        </p>
      </div>
    </section>
  );
}

export default ProductGrid;
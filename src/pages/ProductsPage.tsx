import React, { useEffect, useState } from "react";
import { 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  Loader2, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  Truck,
  Leaf,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header, AnnouncementBar } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { useCart } from "@/lib/cart";
import { supabase } from "@/lib/supabase";
import { products as fallbackProducts } from "@/lib/products";
import { toast } from "sonner";

interface ShopProduct {
  id: string | number;
  name: string;
  price: number;
  mrp?: number | null;
  weight: string;
  image: string;
  tag?: string | null;
  rating?: number;
  reviews?: number;
}

function ShopProductCard({ product }: { product: ShopProduct }) {
  const { addItem, setCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
      });
    }
    toast.success(`${quantity}x ${product.name} added to cart!`);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
    setCartOpen(true);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-stone-800 dark:bg-stone-900/90">
      
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dynamic Tag */}
        {product.tag && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-800/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-50 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-amber-300" />
            {product.tag}
          </span>
        )}

        {/* Discount Badge */}
        {discountPercent && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        
        {/* Rating and Weight Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-semibold text-stone-800 dark:text-stone-200">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || 5.0}</span>
            <span className="text-[11px] text-stone-500 font-normal">
              ({product.reviews || 28})
            </span>
          </div>

          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            {product.weight}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2.5 text-lg font-bold text-stone-900 transition-colors group-hover:text-emerald-800 dark:text-white dark:group-hover:text-emerald-400 line-clamp-1">
          {product.name}
        </h3>

        {/* Pricing Box */}
        <div className="mt-3 flex items-baseline gap-2 border-b border-stone-100 pb-4 dark:border-stone-800">
          <span className="text-2xl font-black text-emerald-900 dark:text-emerald-400">
            ₹{product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-stone-500 line-through">
              ₹{product.mrp}
            </span>
          )}
          <span className="ml-auto text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
            Incl. all taxes
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-stone-50 px-3.5 py-1.5 dark:bg-stone-800/60">
          <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
            Quantity
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="grid h-7 w-7 place-items-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:bg-stone-100 active:scale-90 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[16px] text-center text-sm font-bold text-stone-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="grid h-7 w-7 place-items-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:bg-stone-100 active:scale-90 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* CTA Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-700/20 bg-emerald-50 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-900 transition-all hover:bg-emerald-100 active:scale-95 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add To Cart
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-800 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
          >
            <Zap className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            Buy Now
          </button>
        </div>

      </div>
    </article>
  );
}

export function ProductsPage() {
  const [items, setItems] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setItems(data);
        } else {
          setItems(fallbackProducts as ShopProduct[]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setItems(fallbackProducts as ShopProduct[]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filterTabs = ["All", "Roasted", "Jumbo Grade", "Flavored", "Raw"];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#FAF8F5] font-sans text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">Pantry Store</span>
          </div>

          {/* Premium Store Header Banner */}
          <div className="mt-6 rounded-3xl border border-stone-200/80 bg-gradient-to-b from-stone-50 to-white p-6 text-center shadow-xs sm:p-10 dark:border-stone-800 dark:from-stone-900 dark:to-stone-950">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-[11px] font-bold tracking-wider text-amber-900 dark:bg-amber-950 dark:text-amber-300">
              <Award className="h-3.5 w-3.5" /> 100% Authentic Mithila Origin
            </span>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">
              The Sevaarth Pantry Collection
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-xs text-stone-600 sm:text-sm dark:text-stone-400">
              Slow roasted in pure olive oil &amp; seasoned with authentic Indian herbs. Directly sourced from the lotus ponds of Bihar.
            </p>

            {/* Filter Tabs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeFilter === tab
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Highlights Strip */}
          <div className="my-8 grid grid-cols-2 gap-3 border-y border-stone-200/80 py-4 sm:grid-cols-4 dark:border-stone-800">
            <div className="flex items-center gap-2.5">
              <Leaf className="h-5 w-5 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs font-bold">100% Organic</p>
                <p className="text-[10px] text-stone-500">Zero preservatives</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="h-5 w-5 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs font-bold">Free Shipping</p>
                <p className="text-[10px] text-stone-500">On all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs font-bold">Lab Tested</p>
                <p className="text-[10px] text-stone-500">Highest food safety</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs font-bold">Jumbo Grade 6+</p>
                <p className="text-[10px] text-stone-500">Maximum crunchiness</p>
              </div>
            </div>
          </div>

          {/* Products Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
              <p className="mt-3 text-xs font-semibold text-stone-500">
                Pantry load ho rahi hai...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

export default ProductsPage;
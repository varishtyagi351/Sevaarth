import { useEffect } from "react";
import { CartProvider } from "@/lib/cart";
import { AnnouncementBar, Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Flavors } from "@/components/site/Flavors";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Story } from "@/components/site/Story";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Reviews } from "@/components/site/Reviews";

export function HomePage() {
  // Pure React SEO Meta Updater (Bina kisi heavy third-party library ke)
  useEffect(() => {
    document.title = "Sevaarth | Organic Mithila Makhana — From Tradition to Nutrition";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Shop 100% organic, handpicked Mithila makhana from Sevaarth. Roasted flavours, jumbo pink salt and raw phool makhana. Free shipping over ₹499."
    );

    // Smooth scroll restoration on load
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <CartProvider>
      <div className="relative flex min-h-screen w-full flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/10 selection:text-primary">
        {/* Top Promotional Bar */}
        <AnnouncementBar />

        {/* Sticky Navbar */}
        <Header />

        {/* Main Content Flow */}
        <main className="flex-1">
          <Hero />
          <Flavors />
          <ProductGrid />
          <Story />
          <Reviews />
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Global Slide-over Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default HomePage;
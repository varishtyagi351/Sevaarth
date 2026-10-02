import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar, Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Flavors } from "@/components/site/Flavors";
import { StoryPage } from "@/pages/StoryPage";
import { Reviews } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { ProductsPage } from "@/pages/ProductsPage";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { ContactPage } from "@/pages/ContactPage";

function Storefront() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/15 selection:text-primary">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <Flavors />
        <Reviews />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          {/* Main Home Storefront */}
          <Route path="/" element={<Storefront />} />

          {/* Dedicated Products Shop Page */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Portal */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Storefront />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
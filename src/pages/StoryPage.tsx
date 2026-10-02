import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header, AnnouncementBar } from "@/components/site/Header";
import { Story } from "@/components/site/Story";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";

export function StoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#FAF8F5] font-sans text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-stone-500">
            <Link
              to="/"
              className="inline-flex items-center gap-1 transition-colors hover:text-emerald-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Our Story
            </span>
          </div>

          {/* Story Content */}
          <Story />
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

export default StoryPage;
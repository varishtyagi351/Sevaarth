import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  ShieldAlert,
} from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { useCart } from "@/lib/cart";
import { useUserRole } from "@/lib/useUserRole";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Story", href: "/story" },
  { label: "Contact Us", href: "/contact" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-3 py-1.5 text-center text-[10px] leading-tight font-medium tracking-wide sm:text-xs">
        <p className="truncate">
          🌾 100% Organic &amp; Handpicked Mithila Makhana
        </p>
      </div>
    </div>
  );
}

export function Header() {
  const navigate = useNavigate();
  const { count, setCartOpen } = useCart();
  const { isAdmin } = useUserRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast(`Searching for "${searchQuery}"...`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-2.5">
        
        {/* Brand Logo Link */}
        <Link to="/" className="flex shrink-0 items-center outline-none">
          <BrandLogo />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden items-center justify-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="relative text-xs font-semibold text-foreground/80 transition-colors hover:text-primary xl:text-sm after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          <button
            type="button"
            aria-label="Toggle Search"
            onClick={() => setSearchOpen((prev) => !prev)}
            className="grid h-8 w-8 place-items-center rounded-full text-foreground/75 transition-colors hover:bg-muted hover:text-foreground active:scale-95 sm:h-9 sm:w-9"
          >
            <Search className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>

          <button
            type="button"
            aria-label="View Wishlist"
            onClick={() => toast("Wishlist saved for later ♥")}
            className="hidden h-9 w-9 place-items-center rounded-full text-foreground/75 transition-colors hover:bg-muted hover:text-foreground active:scale-95 md:grid"
          >
            <Heart className="h-[18px] w-[18px]" />
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            aria-label="Open Shopping Cart"
            onClick={() => setCartOpen(true)}
            className="relative grid h-8 w-8 place-items-center rounded-full text-foreground/75 transition-colors hover:bg-muted hover:text-foreground active:scale-95 sm:h-9 sm:w-9"
          >
            <ShoppingBag className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shadow-sm sm:h-5 sm:min-w-[20px] sm:text-[10px]">
                {count}
              </span>
            )}
          </button>

          {/* Admin Badge */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-amber-600/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 transition-all hover:bg-amber-500/20 dark:text-amber-400"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          )}

          {/* Auth Controls */}
          <div className="flex items-center pl-1 sm:pl-1.5 border-l border-border/80">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 sm:px-3.5 sm:py-1.5 sm:text-xs"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 ring-2 ring-primary/20",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="grid h-8 w-8 place-items-center rounded-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground active:scale-95 lg:hidden sm:h-9 sm:w-9"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/70 bg-muted/40 px-3 py-2.5 sm:px-6 sm:py-3">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm sm:px-4 sm:py-2"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roasted, jumbo, peri peri makhana..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-border/80 bg-background/98 px-4 pb-5 pt-2 shadow-xl backdrop-blur-lg lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-xs font-semibold text-foreground/90 transition-colors hover:bg-muted hover:text-primary sm:text-sm"
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin");
                }}
                className="mt-2 flex w-full items-center gap-2 rounded-lg border border-amber-600/30 bg-amber-500/10 px-3 py-2.5 text-xs font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-400"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Go to Admin Portal</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
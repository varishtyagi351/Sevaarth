import React, { Component, type ReactNode } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

// Pure React Error Boundary (Bypasses third-party router crash hooks)
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class RouteErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Layout caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6">
          <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-lg sm:p-8">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive sm:h-16 sm:w-16">
              <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              This page didn't load
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {this.state.error?.message ||
                "Something went wrong on our end. You can try refreshing or head back home."}
            </p>

            <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm transition-all hover:bg-muted active:scale-95 sm:text-sm"
              >
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

// 404 Page Component
export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-lg sm:p-8">
        <h1 className="text-6xl font-extrabold tracking-tight text-primary sm:text-7xl">404</h1>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Page Not Found
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        <div className="mt-6 w-full sm:w-auto">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 sm:w-auto sm:text-sm"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

// Main Layout
export function RootLayout() {
  const location = useLocation();

  // Route switch par smooth top scroll
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <RouteErrorBoundary>
      <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/15 selection:text-primary">
        <Outlet />
        <Toaster position="bottom-right" richColors />
      </div>
    </RouteErrorBoundary>
  );
}

export default RootLayout;
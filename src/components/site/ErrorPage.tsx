import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorPage({
  title = "This page didn't load",
  message = "Something went wrong on our end. You can try refreshing the page or head back home.",
  onRetry,
}: ErrorPageProps) {
  const handleReload = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-8 sm:px-6">
      {/* Centered Responsive Card */}
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-lg transition-all sm:p-8">
        
        {/* Subtle Icon Badge */}
        <div className="grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive sm:h-16 sm:w-16">
          <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>

        {/* Heading & Description */}
        <h1 className="mt-5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {message}
        </p>

        {/* Action Buttons (Mobile: Stacked, Desktop: Row) */}
        <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleReload}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>

          <a
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm transition-all hover:bg-muted active:scale-95 sm:text-sm"
          >
            <Home className="h-4 w-4" />
            Go Home
          </a>
        </div>

        {/* Subtle Support Note */}
        <p className="mt-6 text-[11px] text-muted-foreground">
          If the problem continues, check your internet connection or try again shortly.
        </p>

      </div>
    </main>
  );
}

export default ErrorPage;
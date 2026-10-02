import React, { useState } from "react";
import { AlertOctagon, Check, Copy, X } from "lucide-react";
import { type CapturedErrorInfo } from "@/lib/telemetry";

interface ErrorTelemetryModalProps {
  errorInfo: CapturedErrorInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ErrorTelemetryModal({
  errorInfo,
  isOpen,
  onClose,
}: ErrorTelemetryModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !errorInfo) return null;

  const serializedData = JSON.stringify(errorInfo, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(serializedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all sm:max-h-[80vh]">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-destructive" />
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Diagnostic Report
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close error report"
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-xs text-destructive sm:text-sm">
            <p className="font-semibold">{errorInfo.message}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Path: <code className="font-mono text-foreground">{errorInfo.route}</code>
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Stack &amp; Payload
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
            <pre className="max-h-52 overflow-x-auto rounded-xl border border-border bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-foreground/80 [scrollbar-width:thin]">
              {serializedData}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-border bg-muted/30 px-5 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
          >
            Dismiss
          </button>
        </footer>

      </div>
    </div>
  );
}

export default ErrorTelemetryModal;
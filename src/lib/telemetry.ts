export type ErrorSeverity = "error" | "warning" | "info";

export interface ErrorEventOptions {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: ErrorSeverity;
  context?: Record<string, unknown>;
}

export interface CapturedErrorInfo {
  message: string;
  stack?: string;
  route: string;
  timestamp: string;
  severity: ErrorSeverity;
  context: Record<string, unknown>;
}

export function reportAppError(
  error: unknown,
  options: ErrorEventOptions = {}
): CapturedErrorInfo {
  const {
    mechanism = "manual",
    severity = "error",
    context = {},
  } = options;

  let message = "Unknown error occurred";
  let stack: string | undefined = undefined;

  // Handle Fetch / API Responses
  if (error instanceof Response) {
    message = `HTTP Response ${error.status}: ${error.statusText || "Request failed"} ${error.url ? `at ${error.url}` : ""}`;
  } else if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  } else if (typeof error === "string") {
    message = error;
  } else {
    try {
      message = JSON.stringify(error);
    } catch {
      message = String(error);
    }
  }

  const payload: CapturedErrorInfo = {
    message,
    stack,
    route: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: new Date().toISOString(),
    severity,
    context: {
      mechanism,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "SSR",
      ...context,
    },
  };

  // Development console formatted log
  if (import.meta.env?.DEV) {
    console.groupCollapsed(`%c[App Monitor - ${severity.toUpperCase()}] ${message}`, "color: #ef4444; font-weight: bold;");
    console.info("Route:", payload.route);
    console.info("Context:", payload.context);
    if (stack) console.info("Stack Trace:\n", stack);
    console.groupEnd();
  }

  return payload;
}
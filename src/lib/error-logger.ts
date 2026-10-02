// Browser & Client-side Safe Error Formatter and Tracker

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 10_000; // 10 seconds memory retention
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` [Status: ${value}]` : "";
}

export function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;

  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!isErrorLike(current)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "Caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${current.stack ?? `${current.name}:${current.message}`}${status}`);
    current = (current as { cause?: unknown }).cause;
  }

  return parts.join("\n\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

export function recordError(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// Global window error listener for unhandled rejections
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    recordError(event.error ?? event.message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    recordError(event.reason);
  });
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let _client: PrismaClient | null = null;
let _initFailed = false;

function getClient(): PrismaClient | null {
  if (_initFailed) return null;
  if (_client) return _client;

  try {
    const client = globalThis.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
    _client = client;
    return _client;
  } catch {
    _initFailed = true;
    return null;
  }
}

// Proxy forwards every property access to the real client.
// When the client can't be created (missing DATABASE_URL), the proxy
// returns a no-op function so callers don't crash at import time —
// errors surface at the service layer where they're caught.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    if (!client) {
      // Return a function that rejects, matching how Prisma query methods work
      return () => Promise.reject(new Error("DATABASE_URL is not configured."));
    }
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

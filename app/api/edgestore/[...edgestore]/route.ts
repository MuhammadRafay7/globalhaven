import { NextRequest } from "next/server";

// EdgeStore credentials are optional. When missing, return 503 so the
// build doesn't crash and the app still runs without upload support.
const credentialsMissing =
  !process.env.EDGE_STORE_ACCESS_KEY || !process.env.EDGE_STORE_SECRET_KEY;

function unavailable(_req: NextRequest): Response {
  return Response.json(
    { error: "EdgeStore is not configured on this server." },
    { status: 503 }
  );
}

// Lazy-load the real handler only when credentials exist.
// Using a factory function prevents the EdgeStore SDK from running its
// credential check at module-evaluation time during the Next.js build.
async function getHandler() {
  const { initEdgeStore } = await import("@edgestore/server");
  const { createEdgeStoreNextHandler } = await import(
    "@edgestore/server/adapters/next/app"
  );
  const es = initEdgeStore.create();
  const edgeStoreRouter = es.router({ publicFiles: es.fileBucket() });
  return createEdgeStoreNextHandler({ router: edgeStoreRouter });
}

let cachedHandler: Awaited<ReturnType<typeof getHandler>> | null = null;

async function route(req: NextRequest): Promise<Response> {
  if (credentialsMissing) return unavailable(req);
  if (!cachedHandler) cachedHandler = await getHandler();
  return cachedHandler(req);
}

export { route as GET, route as POST };

// Type-only export consumed by lib/edgestore.ts
export type EdgeStoreRouter = any;

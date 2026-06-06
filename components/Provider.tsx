"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "./ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const edgestoreEnabled = process.env.NEXT_PUBLIC_EDGESTORE_ENABLED === "true";

const Providers = ({ children }: PropsWithChildren) => {
  const inner = (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--card)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );

  if (!edgestoreEnabled) return inner;

  return <EdgeStoreProvider>{inner}</EdgeStoreProvider>;
};

export default Providers;

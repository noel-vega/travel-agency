"use client";
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}

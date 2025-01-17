"use client";
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "./theme-toggle";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Toaster } from "sonner";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex w-full border-b">
          <SidebarTrigger />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <div className="max-w-7xl mx-auto w-full px-4 py-8">{children}</div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}

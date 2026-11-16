"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { ContextualAIAssistant } from "@/components/ai/ContextualAIAssistant";
import { useApp } from "@/context/AppContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check if current route is the public landing page
  const isLandingPage = pathname === "/";

  // Check if current route is an authentication or onboarding route
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/onboarding");

  // Route Protection: Unauthenticated users attempting to access internal dashboard routes get redirected
  useEffect(() => {
    if (!isAuthenticated && !isAuthRoute && !isLandingPage) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthRoute, isLandingPage, router]);

  // Landing page renders in standalone public mode with top navigation
  if (isLandingPage) {
    return <main className="min-h-screen bg-white dark:bg-[#0c0d12]">{children}</main>;
  }

  // Auth pages render in standalone clean layout without sidebar/header
  if (isAuthRoute) {
    return <main className="min-h-screen bg-white dark:bg-[#0c0d12]">{children}</main>;
  }

  // If not authenticated yet and accessing internal pages, show clean loading state while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0d0f14] text-slate-500 text-xs">
        Verifying authorization credentials...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* Structured Left Sidebar */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">{children}</div>
        </main>
      </div>

      {/* Global Command-K Search Dialog */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Contextual AI Assistant Panel (Invoked on-demand from Header or Study Tools) */}
      <ContextualAIAssistant />
    </div>
  );
}

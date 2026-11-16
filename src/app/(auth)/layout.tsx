"use client";

import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand.config";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-50 dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation Bar */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0c0d12]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              {BRAND_CONFIG.shortName}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Learning Systems
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Centered Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white dark:bg-[#161822] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card space-y-6">
          {children}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="py-6 px-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>COPPA & FERPA Compliant • 256-Bit SSL Encrypted Academic Infrastructure</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand.config";
import { ShieldCheck, GraduationCap, Award, CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left / Main: Auth Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
        <div>
          {/* Brand header */}
          <Link href="/login" className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                Standardized Learning Systems
              </span>
            </div>
          </Link>

          {children}
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>&copy; {new Date().getFullYear()} {BRAND_CONFIG.legalName}</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">FERPA & Security</span>
          </div>
        </div>
      </div>

      {/* Right: Editorial & Institutional Trust Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-900 text-white flex-col justify-between p-12 lg:p-16 border-l border-slate-800 relative overflow-hidden select-none">
        {/* Subtle geometric background lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-slate-300" /> Enterprise Academic Platform
          </span>
          <span className="text-slate-400">SOC2 Type II • ISO 27001 Certified</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-block px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium">
            Standardized Testing Research & Methodology
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Academic rigor meets cognitive learning science.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Calibrated against historical testing distributions from the College Board, ETS, GMAC, and NTA.
            Trusted by university candidates, admissions advisors, and lifelong learners globally.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <div className="text-2xl font-bold text-white">99.4%</div>
              <div className="text-slate-400 mt-0.5">Item psychometric accuracy rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">+140 Pts</div>
              <div className="text-slate-400 mt-0.5">Average SAT score improvement</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Used by students across 80+ partner institutions</span>
          <span className="text-slate-400 font-medium">v{BRAND_CONFIG.version}</span>
        </div>
      </div>
    </div>
  );
}


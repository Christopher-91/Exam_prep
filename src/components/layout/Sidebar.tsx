"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Layers,
  Compass,
  Calendar,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Puzzle,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { profile, flashcards, tasks, activeRole } = useApp();

  const dueFlashcardCount = flashcards.filter(
    (c) => new Date(c.dueDate) <= new Date()
  ).length;

  const pendingTaskCount = tasks.filter((t) => t.status !== "completed").length;

  const navItems = [
    {
      title: "Overview",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Exam Preparation",
      href: "/exam-prep",
      icon: GraduationCap,
      badge: BRAND_CONFIG.supportedExams.find((e) => e.id === profile.selectedExam)?.code || "SAT",
      isExamBadge: true,
    },
    {
      title: "Study Materials",
      href: "/study-materials",
      icon: BookOpen,
    },
    {
      title: "Flashcards",
      href: "/flashcards",
      icon: Layers,
      badge: dueFlashcardCount > 0 ? `${dueFlashcardCount}` : undefined,
    },
    {
      title: "Interactive Learning",
      href: "/interactive-learning",
      icon: Puzzle,
    },
    {
      title: "Career Counselling",
      href: "/career-counselling",
      icon: Compass,
    },
    {
      title: "Study Planner",
      href: "/study-planner",
      icon: Calendar,
      badge: pendingTaskCount > 0 ? `${pendingTaskCount}` : undefined,
    },
    {
      title: "Analytics & Readiness",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-white border-r border-slate-200 select-none transition-all duration-200 z-30 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 font-bold text-xs tracking-tight shadow-sm">
            A
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-900 tracking-tight leading-none">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                Learning Systems
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors hidden md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Role Pill Banner */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px]">
            <span className="text-slate-500 font-medium">Workspace</span>
            <span className="font-semibold text-slate-900 capitalize flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              {activeRole}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors relative group",
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 transition-colors",
                    item.isExamBadge
                      ? "bg-slate-100 text-slate-600"
                      : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Administration workspace link */}
        <div className="pt-2 border-t border-slate-100 my-1.5">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors group",
              pathname === "/admin"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
            )}
            title={collapsed ? "Admin Workspace" : undefined}
          >
            <ShieldCheck
              className={cn(
                "w-4 h-4 shrink-0",
                pathname === "/admin" ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )}
            />
            {!collapsed && (
              <>
                <span className="flex-1 truncate">Admin Console</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                  Staff
                </span>
              </>
            )}
          </Link>
        </div>
      </nav>

      {/* Bottom Goal Widget ("Candidate Goal") */}
      {!collapsed && (
        <div className="p-3.5 m-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Candidate Goal</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {profile.targetScore} ({BRAND_CONFIG.supportedExams.find((e) => e.id === profile.selectedExam)?.code})
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: "76%" }} />
          </div>
          <div className="text-[10px] text-slate-400 pt-0.5 flex items-center justify-between">
            <span>Exam Date:</span>
            <span className="font-medium text-slate-600">
              {new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Layers,
  Sparkles,
  Compass,
  Calendar,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  Brain,
  Award,
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
      roles: ["student", "parent", "professional", "admin"],
    },
    {
      title: "Exam Preparation",
      href: "/exam-prep",
      icon: GraduationCap,
      badge: BRAND_CONFIG.supportedExams.find((e) => e.id === profile.selectedExam)?.code || "SAT",
      roles: ["student", "parent", "admin"],
    },
    {
      title: "Study Materials",
      href: "/study-materials",
      icon: BookOpen,
      roles: ["student", "professional", "admin"],
    },
    {
      title: "Flashcards",
      href: "/flashcards",
      icon: Layers,
      badge: dueFlashcardCount > 0 ? `${dueFlashcardCount} due` : undefined,
      badgeColor: "bg-indigo-100 text-indigo-700",
      roles: ["student", "professional", "admin"],
    },
    {
      title: "Interactive Learning",
      href: "/interactive-learning",
      icon: Sparkles,
      badge: "Kids 3-12",
      badgeColor: "bg-emerald-100 text-emerald-700",
      roles: ["student", "parent", "admin"],
    },
    {
      title: "Career Counselling",
      href: "/career-counselling",
      icon: Compass,
      roles: ["student", "professional", "admin"],
    },
    {
      title: "Study Planner",
      href: "/study-planner",
      icon: Calendar,
      badge: pendingTaskCount > 0 ? `${pendingTaskCount}` : undefined,
      roles: ["student", "parent", "professional", "admin"],
    },
    {
      title: "Analytics & Readiness",
      href: "/analytics",
      icon: BarChart3,
      roles: ["student", "parent", "professional", "admin"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["student", "parent", "professional", "admin"],
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-white border-r border-slate-200/80 transition-all duration-300 z-30 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                EdTech Ecosystem
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors hidden md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Pill Banner */}
      {!collapsed && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/60">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Role
            </span>
            <span className="text-xs font-semibold text-indigo-700 capitalize flex items-center gap-1">
              <Award className="w-3 h-3 text-indigo-600" />
              {activeRole} Mode
            </span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative",
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              {!collapsed && (
                <span className="flex-1 truncate">{item.title}</span>
              )}
              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0",
                    item.badgeColor || "bg-slate-100 text-slate-600"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Administration link */}
        <div className="pt-2 border-t border-slate-100 my-2">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
              pathname === "/admin"
                ? "bg-slate-900 text-white font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
            title={collapsed ? "Admin Workspace" : undefined}
          >
            <ShieldCheck
              className={cn(
                "w-4 h-4 shrink-0",
                pathname === "/admin" ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-600"
              )}
            />
            {!collapsed && (
              <>
                <span className="flex-1 truncate">Admin Workspace</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold">
                  Staff
                </span>
              </>
            )}
          </Link>
        </div>
      </nav>

      {/* Footer Streak & Target Card */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              Exam Goal
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {profile.streakDays}d Streak
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Target Score</span>
            <span className="text-sm font-bold text-indigo-300">
              {profile.targetScore} ({BRAND_CONFIG.supportedExams.find((e) => e.id === profile.selectedExam)?.code})
            </span>
          </div>
          <div className="w-full bg-slate-700/60 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-indigo-400 h-full rounded-full transition-all duration-500"
              style={{ width: "78%" }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-right">
            Exam Date: {new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>
      )}
    </aside>
  );
}


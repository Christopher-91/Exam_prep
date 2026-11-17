"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Code2,
  Calendar,
  Layers,
  Puzzle,
  Compass,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  ShieldCheck,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const { profile, flashcards, tasks, activeRole, logout } = useApp();

  const dueFlashcards = flashcards.filter(
    (c) => new Date(c.dueDate) <= new Date()
  ).length;

  const pendingTasks = tasks.filter((t) => t.status !== "completed").length;

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-white dark:bg-[#0c0d12] border-r border-slate-200 dark:border-slate-800/80 select-none transition-all duration-200 z-30 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200 dark:border-slate-800/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 font-bold text-xs tracking-tight shadow-sm group-hover:scale-105 transition-transform">
            <span>A</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                Learning Systems
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-[#1a1d26] transition-colors hidden md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scroll Container */}
      <nav className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
        {/* PREP MODULES */}
        <div>
          {!collapsed && (
            <div className="px-2.5 pb-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              PREP
            </div>
          )}

          <div className="space-y-0.5">
            {/* Dashboard */}
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/dashboard"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Dashboard" : undefined}
            >
              <LayoutDashboard
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/dashboard"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">Dashboard</span>}
            </Link>

            {/* Exam Preparation */}
            <Link
              href="/exam-prep"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/exam-prep" || pathname.startsWith("/exam-prep/mock-test") || pathname.startsWith("/exam-prep/results")
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Exam Preparation" : undefined}
            >
              <GraduationCap
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/exam-prep"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">Prep Hub</span>}
            </Link>

            {/* Adaptive Practice */}
            {!collapsed ? (
              <div>
                <button
                  onClick={() => setPracticeOpen(!practiceOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    pathname.startsWith("/exam-prep/adaptive")
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>Adaptive Practice</span>
                  </div>
                  {practiceOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {practiceOpen && (
                  <div className="ml-6 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5 mt-0.5">
                    <Link
                      href="/exam-prep/adaptive?topic=math"
                      className="block px-2 py-1 text-[11px] rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#14161f] transition-colors"
                    >
                      Math Problems
                    </Link>
                    <Link
                      href="/exam-prep/adaptive?topic=verbal"
                      className="block px-2 py-1 text-[11px] rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#14161f] transition-colors"
                    >
                      Reading & Writing
                    </Link>
                    <Link
                      href="/exam-prep/adaptive?topic=diagnostic"
                      className="block px-2 py-1 text-[11px] rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#14161f] transition-colors"
                    >
                      Diagnostic Test
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/exam-prep/adaptive"
                className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#14161f]"
                title="Adaptive Practice"
              >
                <Code2 className="w-4 h-4" />
              </Link>
            )}

            {/* Study Materials */}
            <Link
              href="/study-materials"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/study-materials"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Study Materials" : undefined}
            >
              <BookOpen
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/study-materials"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">Study Materials</span>}
            </Link>

            {/* Study Planner */}
            <Link
              href="/study-planner"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/study-planner"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Study Planner" : undefined}
            >
              <Calendar
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/study-planner"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">Study Planner</span>
                  {pendingTasks > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {pendingTasks}
                    </span>
                  )}
                </>
              )}
            </Link>

            {/* Flashcards SM-2 */}
            <Link
              href="/flashcards"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/flashcards"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Flashcards SM-2" : undefined}
            >
              <Layers
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/flashcards"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">Flashcards SM-2</span>
                  {dueFlashcards > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                      {dueFlashcards}
                    </span>
                  )}
                </>
              )}
            </Link>
          </div>
        </div>

        {/* ADDITIONAL */}
        <div>
          {!collapsed && (
            <div className="px-2.5 pb-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              ADDITIONAL
            </div>
          )}

          <div className="space-y-0.5">
            {/* Interactive Learning / STEM Labs */}
            <Link
              href="/interactive-learning"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/interactive-learning"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Interactive Learning" : undefined}
            >
              <Puzzle
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/interactive-learning"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">STEM Sandbox</span>}
            </Link>

            {/* Career Counselling */}
            <Link
              href="/career-counselling"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/career-counselling"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Career Counselling" : undefined}
            >
              <Compass
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/career-counselling"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">Career Guidance</span>}
            </Link>

            {/* Analytics */}
            <Link
              href="/analytics"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/analytics"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Analytics" : undefined}
            >
              <BarChart3
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/analytics"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">Analytics & Readiness</span>}
            </Link>

            {/* Settings */}
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/settings"
                  ? "bg-slate-100 dark:bg-[#181a24] text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#14161f] font-medium"
              )}
              title={collapsed ? "Settings" : undefined}
            >
              <Settings
                className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === "/settings"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              />
              {!collapsed && <span className="flex-1 truncate">Settings</span>}
            </Link>
          </div>
        </div>

        {/* Administration link */}
        {activeRole === "admin" && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                pathname === "/admin"
                  ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              {!collapsed && <span className="truncate">Admin Console</span>}
            </Link>
          </div>
        )}
      </nav>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
        <button
          onClick={() => window.alert("Customer support: support@acuitysystems.edu")}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#161820] transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          {!collapsed && <span>Contact support</span>}
        </button>

        {/* Quick User Log out or Profile */}
        {!collapsed && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs px-2 text-slate-500 dark:text-slate-400">
            <span className="truncate font-medium">{profile.name}</span>
            <button
              onClick={logout}
              className="text-slate-400 hover:text-rose-500 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

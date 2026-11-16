"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Flame,
  Coins,
  ChevronDown,
  CheckCircle2,
  Bell,
  User as UserIcon,
  LogOut,
  Sparkles,
} from "lucide-react";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserRole } from "@/lib/types";

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    profile,
    activeRole,
    setActiveRole,
    selectedExam,
    setSelectedExam,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    logout,
  } = useApp();

  const [showExamMenu, setShowExamMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const examMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (examMenuRef.current && !examMenuRef.current.contains(e.target as Node)) {
        setShowExamMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setShowNotifMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getModuleTitle = () => {
    if (pathname === "/dashboard" || pathname === "/") return "Dashboard";
    if (pathname.startsWith("/exam-prep/mock-test")) return "Exam Simulation";
    if (pathname.startsWith("/exam-prep/results")) return "Diagnostic Report";
    if (pathname.startsWith("/exam-prep/adaptive")) return "Adaptive Practice";
    if (pathname.startsWith("/exam-prep")) return "Prep Hub";
    if (pathname.startsWith("/study-materials")) return "Study Materials";
    if (pathname.startsWith("/flashcards")) return "Flashcards SM-2";
    if (pathname.startsWith("/interactive-learning")) return "Interactive Learning";
    if (pathname.startsWith("/career-counselling")) return "Career Counselling";
    if (pathname.startsWith("/study-planner")) return "Planly Planner";
    if (pathname.startsWith("/analytics")) return "Analytics";
    if (pathname.startsWith("/admin")) return "Admin Console";
    if (pathname.startsWith("/settings")) return "Settings";
    return "Learning";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="h-14 bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0 transition-colors">
      {/* Left: Breadcrumbs & Target Exam Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Prep</span>
          <span className="text-xs text-slate-300 dark:text-slate-600">/</span>
          <h1 className="text-xs md:text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
            {getModuleTitle()}
          </h1>
        </div>

        {/* Exam Target Selector Pill */}
        <div className="relative ml-2" ref={examMenuRef}>
          <button
            onClick={() => setShowExamMenu(!showExamMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-[#1a1d26] dark:hover:bg-[#222634] border border-slate-200 dark:border-slate-800 rounded-md transition-colors"
          >
            <span>{BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam)?.code || "SAT"}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showExamMenu && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-[#161820] rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in duration-75">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                Examination Target
              </div>
              {BRAND_CONFIG.supportedExams.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => {
                    setSelectedExam(exam.id as SupportedExamId);
                    setShowExamMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#1f2330] transition-colors ${
                    selectedExam === exam.id
                      ? "bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-semibold"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <div>
                    <div>{exam.name}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{exam.provider} • Max {exam.maxScore}</div>
                  </div>
                  {selectedExam === exam.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Search, Coins, Streak, Plus, ThemeToggle, Profile (Matches TakeUForward layout) */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search Command-K Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-[#161820] border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-[#1c202a] transition-colors"
          title="Search anything (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] bg-white dark:bg-[#101217] border border-slate-200 dark:border-slate-700 rounded text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Coins Pill Widget (TakeUForward style: 🪙 120) */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-900/50 cursor-pointer hover:bg-amber-100/80 dark:hover:bg-amber-950/50 transition-colors"
          title="Earn coins by completing problems and mock tests"
        >
          <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="tabular-nums">120</span>
        </div>

        {/* Streak Pill Widget (TakeUForward style: 🔥 14) */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-200/80 dark:border-orange-900/50 cursor-pointer hover:bg-orange-100/80 dark:hover:bg-orange-950/50 transition-colors"
          title="14-day study streak! Practice daily to keep it alive"
        >
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span className="tabular-nums">14</span>
        </div>

        {/* TakeUForward "+ Plus" Upgrade Pill Button */}
        <button
          onClick={() => router.push("/settings")}
          className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-400/60 dark:border-amber-500/40 transition-colors shadow-2xs"
          title="Upgrade to Acuity Plus for unlimited AI diagnostic tests"
        >
          <span className="text-amber-600 dark:text-amber-400 font-bold">+</span>
          <span>Plus</span>
        </button>

        {/* Light / Dark Mode Toggle (Default: Light Mode) */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-[#1a1d26] relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-[#0c0d12]" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white dark:bg-[#161820] rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in duration-75">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-800 dark:text-white">Notifications ({unreadCount})</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[10px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-3 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1f2330] transition-colors ${
                      !n.read ? "bg-slate-50/70 dark:bg-slate-800/40" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-white">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 text-left hover:opacity-90 transition-opacity"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
            />
            <div className="hidden lg:block">
              <div className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{profile.name}</div>
              <div className="text-[10px] text-slate-400 capitalize">{activeRole}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-[#161820] rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs animate-in fade-in duration-75">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">{profile.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{profile.email}</div>
              </div>

              {/* Role Switcher Section */}
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Switch Role View
              </div>
              <div className="px-1.5 space-y-0.5">
                {[
                  { id: "student" as UserRole, label: "Student Mode" },
                  { id: "parent" as UserRole, label: "Parent Mode" },
                  { id: "professional" as UserRole, label: "Professional Mode" },
                  { id: "admin" as UserRole, label: "Admin Console" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRole(r.id);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                      activeRole === r.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 font-semibold text-indigo-700 dark:text-indigo-300"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                    }`}
                  >
                    <span>{r.label}</span>
                    {activeRole === r.id && <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Active</span>}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 mt-1.5 pt-1.5 px-1.5">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/settings");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-[#1f2330] text-slate-700 dark:text-slate-200 text-xs flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" /> Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

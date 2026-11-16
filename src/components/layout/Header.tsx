"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  CheckCircle2,
  Clock,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/lib/types";
import { Modal } from "@/components/common/Modal";

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

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showExamMenu, setShowExamMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const examMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
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
    if (pathname === "/") return "Overview";
    if (pathname.startsWith("/exam-prep/mock-test")) return "Examination Simulation";
    if (pathname.startsWith("/exam-prep/results")) return "Diagnostic Score Report";
    if (pathname.startsWith("/exam-prep/adaptive")) return "Adaptive Assessment";
    if (pathname.startsWith("/exam-prep")) return "Exam Preparation";
    if (pathname.startsWith("/study-materials")) return "Study Materials";
    if (pathname.startsWith("/flashcards")) return "Flashcards & Recall";
    if (pathname.startsWith("/interactive-learning")) return "Interactive Learning";
    if (pathname.startsWith("/career-counselling")) return "Career Guidance";
    if (pathname.startsWith("/study-planner")) return "Study Planner";
    if (pathname.startsWith("/analytics")) return "Analytics & Readiness";
    if (pathname.startsWith("/admin")) return "Administrative Workspace";
    if (pathname.startsWith("/settings")) return "Settings";
    return "Learning Platform";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Left: Breadcrumbs & Active Module */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Platform</span>
          <span className="text-xs text-slate-300">/</span>
          <h1 className="text-xs md:text-sm font-semibold text-slate-900 tracking-tight">
            {getModuleTitle()}
          </h1>
        </div>

        {/* Exam switcher pill */}
        <div className="relative ml-2" ref={examMenuRef}>
          <button
            onClick={() => setShowExamMenu(!showExamMenu)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition-colors"
          >
            <span>{BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam)?.code || "SAT"}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showExamMenu && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-md shadow-md border border-slate-200 py-1 z-50 animate-in fade-in duration-75">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Examination Target
              </div>
              {BRAND_CONFIG.supportedExams.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => {
                    setSelectedExam(exam.id as SupportedExamId);
                    setShowExamMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedExam === exam.id ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  <div>
                    <div>{exam.name}</div>
                    <div className="text-[10px] text-slate-400">{exam.provider} • Max {exam.maxScore}</div>
                  </div>
                  {selectedExam === exam.id && <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Search, Notifications, Profile, Role Switcher */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition-colors"
          title="Search (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] bg-white border border-slate-200 rounded text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-slate-900 ring-2 ring-white" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-md shadow-md border border-slate-200 py-1.5 z-50 animate-in fade-in duration-75">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-800">Notifications ({unreadCount})</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[10px] font-medium text-slate-500 hover:text-slate-900"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                      !n.read ? "bg-slate-50/70" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 text-left hover:opacity-90"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-7 h-7 rounded-full border border-slate-200 object-cover"
            />
            <div className="hidden lg:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">{profile.name}</div>
              <div className="text-[10px] text-slate-400 capitalize">{activeRole}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-md shadow-md border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in duration-75">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-bold text-slate-900">{profile.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{profile.email}</div>
              </div>

              {/* Role Switcher Section */}
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
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
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      activeRole === r.id ? "bg-slate-100 font-semibold text-slate-950" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{r.label}</span>
                    {activeRole === r.id && <span className="text-[10px] font-bold text-slate-900">Active</span>}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 mt-1.5 pt-1.5 px-1.5">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/settings");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" /> Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-rose-50 text-rose-700 text-xs flex items-center gap-2 transition-colors"
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

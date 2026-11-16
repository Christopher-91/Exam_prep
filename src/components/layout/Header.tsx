"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  HelpCircle,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { useApp } from "@/context/AppContext";
import { useAIModal } from "@/context/AIModalContext";
import { UserRole } from "@/lib/types";
import { Modal } from "@/components/common/Modal";

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const {
    profile,
    activeRole,
    setActiveRole,
    selectedExam,
    setSelectedExam,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();
  const { openAssistant } = useAIModal();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showExamMenu, setShowExamMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const examMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute active module title
  const getModuleTitle = () => {
    if (pathname === "/") return "Ecosystem Overview";
    if (pathname.startsWith("/exam-prep")) return "AI Exam Preparation";
    if (pathname.startsWith("/study-materials")) return "Resource Library & Notes";
    if (pathname.startsWith("/flashcards")) return "Spaced Repetition & Recall";
    if (pathname.startsWith("/interactive-learning")) return "Interactive STEM for Children";
    if (pathname.startsWith("/career-counselling")) return "Career Guidance & Job Match";
    if (pathname.startsWith("/study-planner")) return "Study Planner & Tasks";
    if (pathname.startsWith("/analytics")) return "Predictive Readiness Analytics";
    if (pathname.startsWith("/admin")) return "Administrative Workspace";
    if (pathname.startsWith("/settings")) return "Account & System Preferences";
    return "Learning Platform";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const rolesList: { id: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
    {
      id: "student",
      label: "Student",
      icon: GraduationCap,
      desc: "Exam prep, flashcard review, assignments & readiness",
    },
    {
      id: "parent",
      label: "Parent",
      icon: Users,
      desc: "Child STEM progress, screen time & activity controls",
    },
    {
      id: "professional",
      label: "Working Professional",
      icon: Briefcase,
      desc: "Career transitions, skill gap analysis & counselling",
    },
    {
      id: "admin",
      label: "Administrator",
      icon: ShieldCheck,
      desc: "Question bank authoring, audit logs & publishing",
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side: Module breadcrumb & Exam badge */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm md:text-base font-bold text-slate-900 tracking-tight">
              {getModuleTitle()}
            </h1>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              v{BRAND_CONFIG.version}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block">
            Target: <span className="font-semibold text-slate-600 uppercase">{selectedExam}</span> • Exam Date:{" "}
            {new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Exam Switcher Quick Pill */}
        <div className="relative ml-2" ref={examMenuRef}>
          <button
            onClick={() => setShowExamMenu(!showExamMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            {BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam)?.name || "Exam"}
            <span className="text-[10px] text-indigo-400">▼</span>
          </button>

          {showExamMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Active Exam
              </div>
              {BRAND_CONFIG.supportedExams.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => {
                    setSelectedExam(exam.id as SupportedExamId);
                    setShowExamMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedExam === exam.id ? "bg-indigo-50/60 font-semibold text-indigo-700" : "text-slate-700"
                  }`}
                >
                  <div>
                    <div className="font-medium">{exam.name}</div>
                    <div className="text-[10px] text-slate-400">{exam.provider} • Max {exam.maxScore}</div>
                  </div>
                  {selectedExam === exam.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Global Search, Role Switcher, AI Assistant, Notifications, User */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-all text-left"
          title="Search across exams, materials, flashcards, careers (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search platform...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded text-slate-400 font-mono shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* AI Quick Assistant Pill */}
        <button
          onClick={() => openAssistant({ module: pathname.replace("/", "") || "overview" })}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg hover:from-indigo-700 hover:to-indigo-800 shadow-sm transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span className="hidden sm:inline">AI Tutor</span>
        </button>

        {/* Role Switcher Menu */}
        <div className="relative" ref={roleMenuRef}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span className="capitalize">{activeRole}</span>
            <span className="text-[10px] text-slate-400">▼</span>
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100">
              <div className="px-3 py-1 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Experience Mode
              </div>
              <div className="p-1 space-y-1">
                {rolesList.map((role) => {
                  const Icon = role.icon;
                  const isSelected = activeRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        setActiveRole(role.id);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                        isSelected ? "bg-indigo-50 text-indigo-900" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-md mt-0.5 ${
                          isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold flex items-center justify-between">
                          {role.label}
                          {isSelected && <span className="text-[10px] font-medium text-indigo-600">Active</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{role.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-800">Notifications ({unreadCount} new)</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[10px] font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markNotificationAsRead(item.id)}
                    className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                      !item.read ? "bg-indigo-50/40" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{item.title}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help & Support */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          title="Help & System Guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
          />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-none">{profile.name}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{profile.email}</div>
          </div>
        </div>
      </div>

      {/* Help & Support Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title={`${BRAND_CONFIG.shortName} Ecosystem Guide`}
        description="Comprehensive user guide, exam scoring methodologies, and platform resources"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
            <h4 className="font-semibold text-indigo-900 text-sm mb-1">
              About {BRAND_CONFIG.name}
            </h4>
            <p className="text-indigo-800 leading-relaxed">
              {BRAND_CONFIG.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border border-slate-200 rounded-lg">
              <h5 className="font-semibold text-slate-900 mb-1">Exam Prep & Adaptive Tests</h5>
              <p className="text-slate-500">
                Official scoring for SAT (400-1600), GRE (260-340), GMAT (205-805), and JEE Main (+4/-1). Adaptive test engine dynamically adjusts question difficulty based on consecutive accuracy.
              </p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg">
              <h5 className="font-semibold text-slate-900 mb-1">SM-2 Spaced Repetition</h5>
              <p className="text-slate-500">
                Active recall schedule expands intervals based on your self-ratings (Again, Hard, Good, Easy) for 90%+ long-term retention.
              </p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg">
              <h5 className="font-semibold text-slate-900 mb-1">Interactive STEM for Kids</h5>
              <p className="text-slate-500">
                Interactive real-time simulations (Gravity orbital physics, visual algebra balance, fraction explorer) designed for ages 3-12.
              </p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg">
              <h5 className="font-semibold text-slate-900 mb-1">Predictive Readiness Engine</h5>
              <p className="text-slate-500">
                Data-driven probability model that calculates estimated score ranges, confidence bands, and limiting topic bottlenecks.
              </p>
            </div>
          </div>

          <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">Support Desk</div>
              <div className="text-slate-500">{BRAND_CONFIG.supportEmail} • Helpline: {BRAND_CONFIG.counsellingHelpline}</div>
            </div>
            <a
              href={`mailto:${BRAND_CONFIG.supportEmail}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-medium"
            >
              Contact Support <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Modal>
    </header>
  );
}


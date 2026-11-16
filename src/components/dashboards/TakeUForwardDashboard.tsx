"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pin,
  Plus,
  ArrowRight,
  Clock,
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  HelpCircle,
  FileText,
  Boxes,
  Database,
  Calculator,
  Compass,
  X,
  Play,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand.config";
import { cn } from "@/lib/utils";

export function TakeUForwardDashboard() {
  const router = useRouter();
  const { profile, tasks, flashcards, mockTests, toggleTask } = useApp();

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", emoji: "☀️" };
    if (hour < 18) return { text: "Good afternoon", emoji: "👋" };
    return { text: "Good evening", emoji: "🌙" };
  };
  const greeting = getGreeting();

  // Pinned subjects state
  const [pinnedSubjects, setPinnedSubjects] = useState([
    {
      id: "math-patterns",
      title: "Digital SAT Math: Algebra & Quad",
      icon: "📐",
      progress: 68,
      totalQuestions: 140,
      completedQuestions: 95,
      href: "/exam-prep/adaptive?topic=math",
    },
    {
      id: "rw-craft",
      title: "Reading & Writing: Craft & Structure",
      icon: "📖",
      progress: 42,
      totalQuestions: 110,
      completedQuestions: 46,
      href: "/exam-prep/adaptive?topic=verbal",
    },
  ]);

  const [showPinModal, setShowPinModal] = useState(false);
  const [showPotdModal, setShowPotdModal] = useState(false);
  const [potdAnswer, setPotdAnswer] = useState<string | null>(null);
  const [potdSubmitted, setPotdSubmitted] = useState(false);

  // Available subjects to pin
  const availableToPin = [
    { id: "geo-trig", title: "Geometry & Advanced Trigonometry", icon: "📐" },
    { id: "info-ideas", title: "Information and Ideas: Text Inferences", icon: "💡" },
    { id: "adv-mechanics", title: "Physics Mechanics & Vectors", icon: "⚛️" },
    { id: "chem-kinetics", title: "Chemical Kinetics & Thermodynamics", icon: "🧪" },
  ];

  const handleAddPin = (sub: typeof availableToPin[0]) => {
    setPinnedSubjects([
      ...pinnedSubjects,
      {
        id: sub.id,
        title: sub.title,
        icon: sub.icon,
        progress: 10,
        totalQuestions: 80,
        completedQuestions: 8,
        href: "/exam-prep/adaptive",
      },
    ]);
    setShowPinModal(false);
  };

  const handleUnpin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPinnedSubjects(pinnedSubjects.filter((s) => s.id !== id));
  };

  // Curated Sheets (TakeUForward sheet models)
  const popularTopics = [
    {
      id: "sat-1600",
      title: "SAT 1600 — Master Exam Patterns",
      icon: FileText,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40",
      totalTopics: 179,
      hours: 65,
      badge: "High-Yield",
      href: "/exam-prep",
    },
    {
      id: "complete-sat",
      title: "Complete Digital SAT Prep Sheet",
      icon: BookOpen,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/40",
      totalTopics: 495,
      hours: 132,
      badge: "A2Z Comprehensive",
      href: "/exam-prep",
    },
    {
      id: "stem-physics",
      title: "JEE & Physics Mechanics Mastery",
      icon: Boxes,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40",
      totalTopics: 72,
      hours: 31,
      badge: "Interactive Labs",
      href: "/interactive-learning",
    },
    {
      id: "gre-gmat",
      title: "GRE & GMAT Reasoning Blueprint",
      icon: Database,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/40",
      totalTopics: 217,
      hours: 27,
      badge: "Executive",
      href: "/study-materials",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout matching TakeUForward */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT / MAIN COLUMN (approx 70% width: 8 of 12 cols) ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Greeting Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>{greeting.text}</span>
              <span>{greeting.emoji}</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              The day gets heavy around now. Good to see you still going.
            </p>
          </div>

          {/* 2. "Pin your subjects" Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Pin className="w-3.5 h-3.5 text-slate-400 rotate-45" />
                <span>Pin your subjects</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Pinned Subject Cards */}
              {pinnedSubjects.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.href}
                  className="group relative p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-subtle flex flex-col justify-between h-32"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{sub.icon}</span>
                      <button
                        onClick={(e) => handleUnpin(sub.id, e)}
                        className="text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition-colors p-0.5"
                        title="Unpin subject"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mt-2 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {sub.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                      <span>{sub.completedQuestions}/{sub.totalQuestions} solved</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{sub.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${sub.progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}

              {/* "+" Dashed Add Card (Matches screenshot directly) */}
              <button
                onClick={() => setShowPinModal(true)}
                className="h-32 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-[#13151c]/50 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1c202a] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shadow-2xs">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium">Pin subject</span>
              </button>
            </div>
          </div>

          {/* 3. PLANLY Banner (Matches screenshot directly) */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151720] p-5 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-md">
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 px-2 py-0.5 rounded-md">
                PLANLY — Your personal planner
              </span>
              <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Know what to study every day and readjust as you go
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              {/* Avatar Stack */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white dark:border-[#151720] flex items-center justify-center text-[9px] text-white font-bold">R</div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-[#151720] flex items-center justify-center text-[9px] text-white font-bold">A</div>
                  <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white dark:border-[#151720] flex items-center justify-center text-[9px] text-white font-bold">S</div>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  60K+ plans created with Planly
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => router.push("/study-planner")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Build my plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4. "Explore Popular Topics" Curated Sheets (Matches TakeUForward screenshot) */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Explore Popular Topics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {popularTopics.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <Link
                    key={topic.id}
                    href={topic.href}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-card transition-all flex flex-col justify-between h-40 group"
                  >
                    <div>
                      {/* Topic Icon */}
                      <div className={cn("w-9 h-9 rounded-lg border flex items-center justify-center mb-3", topic.iconBg)}>
                        <IconComponent className={cn("w-4 h-4", topic.iconColor)} />
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {topic.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-slate-400" />
                        <span>{topic.totalTopics} total topics</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{topic.hours} hrs</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (approx 30% width: 4 of 12 cols) ================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: One-stop platform Pro card (Matches screenshot directly) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                One-stop platform
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                Too many tabs open?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Time lost never comes back. Find the best of all at <span className="font-semibold text-amber-600 dark:text-amber-400">one place</span>.
              </p>
            </div>

            <button
              onClick={() => router.push("/settings")}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Upgrade to Plus
            </button>
          </div>

          {/* Card 2: Problem Of The Day ↗ (Matches screenshot directly) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowPotdModal(true)}
                className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
              >
                <span>Problem Of The Day</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>

              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 px-2 py-0.5 rounded-full tabular-nums">
                +20 🪙
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>6 hrs left</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                Polynomial Remainder Theorem & Modular Constraints in Quadratics
              </p>
            </div>

            <button
              onClick={() => setShowPotdModal(true)}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Solve Problem</span>
            </button>
          </div>

          {/* Card 3: Daily Planner Checklist (Matches screenshot directly) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>Daily Planner</span>
              </h3>
              <Link
                href="/study-planner"
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                View full
              </Link>
            </div>

            {/* Checklist items */}
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all",
                    task.status === "completed"
                      ? "bg-slate-50 dark:bg-[#12141c] border-slate-200/60 dark:border-slate-800 text-slate-400 line-through"
                      : "bg-white dark:bg-[#181a24] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium leading-snug">{task.title}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{task.estimatedMinutes} mins</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/study-planner"
              className="block w-full py-1.5 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#13151c] hover:bg-slate-100 dark:hover:bg-[#1a1d26] rounded-lg transition-colors border border-slate-200 dark:border-slate-800"
            >
              Add Today&apos;s Target
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MODAL: Pin a Subject ================= */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161820] rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pin className="w-4 h-4 text-indigo-600" />
                <span>Pin a Subject to Dashboard</span>
              </h3>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a module to pin for rapid 1-click access:
              </p>
              <div className="space-y-1.5">
                {availableToPin.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleAddPin(sub)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{sub.icon}</span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {sub.title}
                      </span>
                    </div>
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowPinModal(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: Problem Of The Day ================= */}
      {showPotdModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#161820] rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Problem Of The Day
                </span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 px-2 py-0.5 rounded-full">
                  +20 🪙
                </span>
              </div>
              <button
                onClick={() => setShowPotdModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
              <div className="p-3 bg-slate-50 dark:bg-[#12141c] rounded-lg border border-slate-200/80 dark:border-slate-800 font-mono text-xs leading-relaxed">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">
                  Digital SAT Hard Question (Math Module 2):
                </p>
                <p>
                  Let \( P(x) = x^4 - 2x^3 + kx - 12 \). If \( (x - 3) \) is a factor of \( P(x) \), what is the value of the constant \( k \)?
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {[
                  { key: "A", val: "-5" },
                  { key: "B", val: "-3" },
                  { key: "C", val: "5" },
                  { key: "D", val: "9" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setPotdAnswer(opt.key);
                      setPotdSubmitted(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors text-xs font-medium",
                      potdAnswer === opt.key
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-500"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#1a1d26] text-slate-800 dark:text-slate-200"
                    )}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px]">
                      {opt.key}
                    </span>
                    <span>k = {opt.val}</span>
                  </button>
                ))}
              </div>

              {potdSubmitted && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Correct! By Remainder Theorem: P(3) = 0</span>
                  </div>
                  <p className="mt-1 text-[11px] opacity-90">
                    \( 3^4 - 2(3^3) + 3k - 12 = 81 - 54 + 3k - 12 = 15 + 3k = 0 \implies k = -5 \).
                    You earned +20 coins!
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Resets in 6h 14m</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPotdModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  disabled={!potdAnswer || potdSubmitted}
                  onClick={() => setPotdSubmitted(true)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
                >
                  {potdSubmitted ? "Solved (+20 🪙)" : "Submit Answer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

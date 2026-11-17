"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  Play,
  TrendingUp,
  ArrowRight,
  Edit3,
  X,
  Target,
  Sparkles,
  Award,
  Plus,
  FileText,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Flame,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { computePredictiveReadiness } from "@/lib/readiness-engine";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export function StudentDashboard() {
  const {
    profile,
    setProfile,
    selectedExam,
    setSelectedExam,
    tasks,
    toggleTask,
    flashcards,
    scheduleBlocks,
    testResults,
  } = useApp();

  const [showEditTargetModal, setShowEditTargetModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [editScore, setEditScore] = useState(profile.targetScore || 1520);
  const [editDate, setEditDate] = useState(profile.targetDate || "");
  const [editHours, setEditHours] = useState(profile.dailyStudyTargetHours || 2.0);

  // Pinned subjects state
  const [pinnedSubjects, setPinnedSubjects] = useState([
    {
      id: "sat-full",
      title: "Digital SAT (98 Qs)",
      exam: "sat",
      count: "98 questions",
      duration: "134 mins",
      link: "/exam-prep/mock-test/sat-mock-full-98",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/40",
    },
    {
      id: "gre-full",
      title: "GRE General (55 Qs)",
      exam: "gre",
      count: "55 questions",
      duration: "118 mins",
      link: "/exam-prep/mock-test/gre-mock-full-55",
      color: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/40",
    },
    {
      id: "gmat-full",
      title: "GMAT Focus (64 Qs)",
      exam: "gmat",
      count: "64 questions",
      duration: "135 mins",
      link: "/exam-prep/mock-test/gmat-mock-full-64",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/40",
    },
  ]);

  const examDetails = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam);
  const readiness = computePredictiveReadiness(
    selectedExam,
    profile.targetScore,
    profile.targetDate,
    testResults
  );

  const dueFlashcards = flashcards.filter((c) => new Date(c.dueDate) <= new Date());
  const pendingTasks = tasks.filter((t) => t.status !== "completed");

  // Dynamic greeting by hour
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning 👋" : currentHour < 17 ? "Good afternoon 👋" : "Good evening 👋";
  const greetingSubtext =
    currentHour < 12
      ? "A fresh morning for high-yield active recall. Good to see you starting strong."
      : currentHour < 17
      ? "The day gets heavy around now. Good to see you still going."
      : "Wrap up today's target milestones and consolidate your knowledge.";

  // Real-time calculation of today's study hours from completed tasks
  const completedTodayMinutes = tasks
    .filter((t) => t.status === "completed")
    .reduce((acc, t) => acc + (t.estimatedMinutes || 30), 0);
  const completedTodayHours = parseFloat((completedTodayMinutes / 60).toFixed(1));
  const goalHours = profile.dailyStudyTargetHours || 2.0;
  const progressPercentage = Math.min(100, Math.round((completedTodayHours / goalHours) * 100));
  const remainingHours = Math.max(0, parseFloat((goalHours - completedTodayHours).toFixed(1)));

  // Real empirical chart data from actual test results
  const chartData =
    testResults.length > 0
      ? testResults.map((t, idx) => ({
          test: t.testTitle.length > 18 ? `Attempt ${idx + 1}` : t.testTitle,
          score: t.scaledScore,
          target: profile.targetScore,
        }))
      : [];

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => {
      const updated = {
        ...prev,
        targetScore: Number(editScore),
        targetDate: editDate,
        dailyStudyTargetHours: Number(editHours),
      };
      try {
        localStorage.setItem("acuity_profile", JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
    setShowEditTargetModal(false);
  };

  const handleTogglePin = (sub: typeof pinnedSubjects[0]) => {
    if (pinnedSubjects.some((s) => s.id === sub.id)) {
      setPinnedSubjects(pinnedSubjects.filter((s) => s.id !== sub.id));
    } else {
      setPinnedSubjects([...pinnedSubjects, sub]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Subtitle Matching Screenshot 1 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {greeting}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {greetingSubtext}
        </p>
      </div>

      {/* Main Grid: Left 2 Columns & Right 1 Column (Matching Screenshot 1 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT MAIN CONTENT (8 COLS) ================= */}
        <div className="lg:col-span-8 space-y-7">
          {/* 1. Pin Your Subjects Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Pin your subjects</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {pinnedSubjects.length} pinned
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Dotted Plus Pin Box */}
              <button
                onClick={() => setShowPinModal(true)}
                className="w-24 h-24 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shrink-0 group"
                title="Pin an exam subject"
              >
                <Plus className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">Pin</span>
              </button>

              {/* Pinned Items */}
              {pinnedSubjects.map((sub) => (
                <div
                  key={sub.id}
                  className="h-24 min-w-[170px] p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between transition-colors shadow-2xs relative group"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {sub.title}
                    </span>
                    <button
                      onClick={() => handleTogglePin(sub)}
                      className="text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 text-xs p-0.5"
                      title="Unpin subject"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                      <span>{sub.count}</span>
                      <span>•</span>
                      <span>{sub.duration}</span>
                    </div>
                    <Link
                      href={sub.link}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-0.5"
                    >
                      <span>Practice</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Personal Planner Banner (Matching Screenshot 1 banner) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] p-6 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                  <span>Study Planner — Your personal roadmap</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  Know what to study every day and readjust as you go
                </h3>
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#12141c]">
                      A
                    </div>
                    <div className="w-5 h-5 rounded-full bg-sky-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#12141c]">
                      R
                    </div>
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#12141c]">
                      S
                    </div>
                  </div>
                  <span>60K+ plans created with Study Planner</span>
                </div>
              </div>

              <div className="shrink-0">
                <Link href="/study-planner">
                  <button className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap">
                    <span>Build my plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Explore Popular Topics / Exams (Matching Screenshot 1 Grid) */}
          <div className="space-y-3.5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Explore Popular Topics & Question Sets
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Sheet 1: SAT 98 Qs */}
              <Link
                href="/exam-prep/mock-test/sat-mock-full-98"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-100 dark:border-indigo-900/40">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      Digital SAT 98-Question Master Sheet
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      54 RW + 44 Math questions
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>98 total topics</span>
                  <span>134 mins</span>
                </div>
              </Link>

              {/* Sheet 2: GRE 55 Qs */}
              <Link
                href="/exam-prep/mock-test/gre-mock-full-55"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-100 dark:border-sky-900/40">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                      GRE General 55-Question Official Sheet
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      1 AW + 27 Verbal + 27 Quant
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>55 total topics</span>
                  <span>118 mins</span>
                </div>
              </Link>

              {/* Sheet 3: GMAT 64 Qs */}
              <Link
                href="/exam-prep/mock-test/gmat-mock-full-64"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-100 dark:border-emerald-900/40">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      GMAT Focus 64-Question Simulation
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      21 Quant + 23 Verbal + 20 DI
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>64 total topics</span>
                  <span>135 mins</span>
                </div>
              </Link>

              {/* Sheet 4: Quantitative Problem Solving */}
              <Link
                href="/exam-prep/adaptive?topic=math"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-xs border border-violet-100 dark:border-violet-900/40">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                      Advanced Quantitative Problem Solving
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Algebra, rates, number theory
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>44 total topics</span>
                  <span>35 hrs</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR COLUMN (4 COLS) ================= */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: One-Stop Platform Banner (Matching Screenshot 1) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] p-5 shadow-xs space-y-3">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              One-stop platform
            </span>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Too many tabs open?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Time lost never comes back. Find authentic questions, adaptive drills, and diagnostic reports all at one place.
              </p>
            </div>
            <Link href="/pricing" className="block pt-1">
              <button className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white text-xs font-semibold transition-colors">
                Upgrade to Plus
              </button>
            </Link>
          </div>

          {/* Card 2: Problem Of The Day (Matching Screenshot 1) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <Link
                href="/exam-prep/adaptive"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors"
              >
                <span>Problem Of The Day</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                +20 XP
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#161822] border border-slate-200/80 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  SAT Quadratic Roots
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>6 hrs left</span>
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                If x² - 8x + k = 0 has exactly one real solution, what is the value of constant k?
              </p>
            </div>

            <Link href="/exam-prep/adaptive?topic=math" className="block">
              <button className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#161822] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                Solve Problem
              </button>
            </Link>
          </div>

          {/* Card 3: Daily Planner (Matching Screenshot 1) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12141c] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Daily Planner
              </span>
              <Link
                href="/study-planner"
                className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#161822] cursor-pointer transition-colors"
                >
                  <button
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      task.status === "completed"
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {task.status === "completed" && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium leading-snug truncate ${
                        task.status === "completed"
                          ? "line-through text-slate-400"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {task.estimatedMinutes} mins • {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>{completedTodayHours} / {goalHours} hrs logged</span>
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {progressPercentage}% today
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOWER SECTION: 4 KPI PERFORMANCE METRICS ================= */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Performance Readiness & Analytics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active test metrics for {profile.name} (Target: {profile.targetScore})
            </p>
          </div>
          <button
            onClick={() => setShowEditTargetModal(true)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit Target Goal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Predicted Score Interval */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Predicted Score Interval
              </span>
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
              </span>
              <span className="text-xs font-medium text-slate-400">/ {examDetails?.maxScore}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 px-2 py-0.5 rounded-full text-xs font-semibold">
                ▲ {readiness.improvementTrend}
              </span>
              <span className="text-slate-400 font-medium">Confidence: {readiness.confidenceScore}%</span>
            </div>
          </Card>

          {/* Card 2: Daily Study Target */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Daily Study Target
              </span>
              <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {completedTodayHours} hrs
              </span>
              <span className="text-xs font-medium text-slate-400">/ {goalHours} hrs goal</span>
            </div>
            <div className="mt-3.5 space-y-1.5">
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-0.5">
                <span>{progressPercentage}% completed</span>
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {remainingHours > 0 ? `${remainingHours} hrs left` : "Goal achieved!"}
                </span>
              </div>
            </div>
          </Card>

          {/* Card 3: Active Recall Queue */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Recall Queue
              </span>
              <div className="w-9 h-9 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {dueFlashcards.length} cards
              </span>
              <span className="text-xs font-medium text-slate-400">due today</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">{flashcards.length} total across decks</span>
              <Link href="/flashcards" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Review →
              </Link>
            </div>
          </Card>

          {/* Card 4: Preparation Consistency */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Preparation Consistency
              </span>
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {profile.streakDays || 1} Day{profile.streakDays === 1 ? "" : "s"}
              </span>
              <span className="text-xs font-medium text-slate-400">active streak</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">{profile.totalStudyHours || 1.5} hrs logged</span>
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 px-2 py-0.5 rounded-full text-xs font-semibold">
                Live Tracker
              </span>
            </div>
          </Card>
        </div>

        {/* Score Trajectory Chart vs Target Benchmark */}
        <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
          <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Score Trajectory vs. Target Benchmark
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Empirical score tracking across official administrations against goal {profile.targetScore}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/40 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                Goal: {profile.targetScore}
              </span>
            </div>
          </CardHeader>

          {chartData.length === 0 ? (
            <div className="h-48 w-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 dark:bg-[#12141c]/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                No Practice Tests Logged Yet
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                Take an official simulation (SAT 98 Qs, GRE 55 Qs, or GMAT 64 Qs) to calculate your authentic baseline.
              </p>
              <Link href="/exam-prep/mock-test/sat-mock-full-98" className="pt-1">
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors">
                  Take SAT 98-Question Simulation
                </button>
              </Link>
            </div>
          ) : (
            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="test" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis domain={[1100, examDetails?.maxScore || 1600]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", fontSize: "12px", border: "none" }} />
                  <ReferenceLine y={profile.targetScore} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: `Target ${profile.targetScore}`, fill: "#94a3b8", fontSize: 10, position: "insideTopRight" }} />
                  <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreGradient)" dot={{ r: 4, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }} name="Scaled Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* Edit Target Goal Modal */}
      {showEditTargetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161822] border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full shadow-xl space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Edit Target Score & Test Date
              </h3>
              <button
                onClick={() => setShowEditTargetModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTarget} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Score (Max: {examDetails?.maxScore})
                </label>
                <input
                  type="number"
                  value={editScore}
                  onChange={(e) => setEditScore(Number(e.target.value))}
                  min={examDetails?.minScore || 400}
                  max={examDetails?.maxScore || 1600}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#12141c] text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Exam Date
                </label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#12141c] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Study Goal (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={editHours}
                  onChange={(e) => setEditHours(Number(e.target.value))}
                  min="0.5"
                  max="12"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#12141c] text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditTargetModal(false)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pin Subject Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161822] border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md w-full shadow-xl space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pin an Examination Subject
              </h3>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Pin your target subject tests for one-click access directly from your dashboard:
            </p>

            <div className="space-y-2">
              {[
                {
                  id: "sat-full",
                  title: "Digital SAT (98 Qs)",
                  exam: "sat",
                  count: "98 questions",
                  duration: "134 mins",
                  link: "/exam-prep/mock-test/sat-mock-full-98",
                  color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/40",
                },
                {
                  id: "sat-rw",
                  title: "SAT Reading & Writing (54 Qs)",
                  exam: "sat",
                  count: "54 questions",
                  duration: "64 mins",
                  link: "/exam-prep/mock-test/sat-rw-54",
                  color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/40",
                },
                {
                  id: "sat-math",
                  title: "SAT Mathematics (44 Qs)",
                  exam: "sat",
                  count: "44 questions",
                  duration: "70 mins",
                  link: "/exam-prep/mock-test/sat-math-44",
                  color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/40",
                },
                {
                  id: "gre-full",
                  title: "GRE General (55 Qs)",
                  exam: "gre",
                  count: "55 questions",
                  duration: "118 mins",
                  link: "/exam-prep/mock-test/gre-mock-full-55",
                  color: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/40",
                },
                {
                  id: "gmat-full",
                  title: "GMAT Focus (64 Qs)",
                  exam: "gmat",
                  count: "64 questions",
                  duration: "135 mins",
                  link: "/exam-prep/mock-test/gmat-mock-full-64",
                  color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/40",
                },
                {
                  id: "aptitude-math",
                  title: "Campus Quantitative Aptitude (Math)",
                  exam: "placement",
                  count: "TCS, Infosys, Accenture",
                  duration: "Placement Drills",
                  link: "/aptitude-practice/math",
                  color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/40",
                },
                {
                  id: "aptitude-english",
                  title: "Campus Verbal Ability (English)",
                  exam: "placement",
                  count: "Cognizant, Wipro, Deloitte",
                  duration: "Placement Drills",
                  link: "/aptitude-practice/english",
                  color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/40",
                },
              ].map((item) => {
                const isPinned = pinnedSubjects.some((s) => s.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#12141c] transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.count} • {item.duration}
                      </div>
                    </div>
                    <button
                      onClick={() => handleTogglePin(item)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        isPinned
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
                      }`}
                    >
                      {isPinned ? "Pinned ✓" : "+ Pin"}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPinModal(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

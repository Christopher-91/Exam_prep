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
  const [editScore, setEditScore] = useState(profile.targetScore || 1520);
  const [editDate, setEditDate] = useState(profile.targetDate || "2027-05-08");
  const [editHours, setEditHours] = useState(profile.dailyStudyTargetHours || 2.0);

  const examDetails = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam);
  const readiness = computePredictiveReadiness(
    selectedExam,
    profile.targetScore,
    profile.targetDate,
    testResults
  );

  const dueFlashcards = flashcards.filter((c) => new Date(c.dueDate) <= new Date());
  const pendingTasks = tasks.filter((t) => t.status !== "completed");

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60 rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide">
              {examDetails?.name.toUpperCase()} CANDIDATE
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Exam in {readiness.daysRemaining} days ({new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})
            </span>
            <button
              onClick={() => setShowEditTargetModal(true)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold ml-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Goal / Date</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Welcome back, <strong className="text-slate-900 dark:text-white font-semibold">{profile.name}</strong>. Target score: <strong className="text-slate-900 dark:text-white font-semibold">{profile.targetScore}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/exam-prep/adaptive">
            <button className="bg-white dark:bg-[#161822] hover:bg-slate-50 dark:hover:bg-[#1e2230] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold rounded-lg px-4 py-2 text-xs transition-colors shadow-2xs">
              Adaptive Practice
            </button>
          </Link>
          <Link href="/exam-prep/mock-test/sat-mock-1">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 text-xs shadow-sm transition-colors">
              Launch Full Exam Simulation
            </button>
          </Link>
        </div>
      </div>

      {/* 4 KPI Performance Metric Cards */}
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
            {testResults.length === 0 ? (
              <span className="text-2xl font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
              </span>
            ) : (
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
              </span>
            )}
            <span className="text-xs font-medium text-slate-400">/ {examDetails?.maxScore}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            {testResults.length === 0 ? (
              <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                Baseline (Diagnostic Needed)
              </span>
            ) : (
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 px-2 py-0.5 rounded-full text-xs font-semibold">
                ▲ {readiness.improvementTrend}
              </span>
            )}
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
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
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
                {remainingHours > 0 ? `${remainingHours} hrs remaining` : "Goal achieved!"}
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
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
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
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
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

      {/* Main Content Layout: Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Score Trajectory & Mock Test Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Trajectory Chart */}
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
              <div className="h-60 w-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 dark:bg-[#12141c]/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    No Practice Tests Logged Yet
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mt-0.5 leading-relaxed">
                    Take a diagnostic mock test to calculate your authentic baseline score and plot your personalized score curve against your {profile.targetScore} target.
                  </p>
                </div>
                <Link href="/exam-prep/mock-test/sat-mock-1">
                  <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors">
                    Take Diagnostic Baseline Test
                  </button>
                </Link>
              </div>
            ) : (
              <div className="h-60 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.14} />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="test"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={[1100, examDetails?.maxScore || 1600]}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "12px",
                        border: "none",
                      }}
                    />
                    <ReferenceLine
                      y={profile.targetScore}
                      stroke="#94a3b8"
                      strokeDasharray="4 4"
                      label={{
                        value: `Target ${profile.targetScore}`,
                        fill: "#94a3b8",
                        fontSize: 10,
                        position: "insideTopRight",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#4f46e5"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#scoreGradient)"
                      dot={{ r: 4, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }}
                      name="Scaled Score"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>

          {/* Today's Structured Focus Sessions */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Scheduled Focus Sessions
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Time-blocked practice allocations for today
                </CardDescription>
              </div>
              <Link href="/study-planner">
                <Button variant="ghost" size="xs">
                  Full Planner →
                </Button>
              </Link>
            </CardHeader>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {scheduleBlocks.map((block) => (
                <div
                  key={block.id}
                  className="py-3 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-[#12141c]/60 transition-colors px-1 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                        block.completed
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40"
                          : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/40"
                      }`}
                    >
                      {block.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Play className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </span>
                    <div>
                      <div
                        className={`font-semibold ${
                          block.completed
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {block.topic}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {block.time} • {block.durationMinutes} mins • {block.subject}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                      block.completed
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/40"
                    }`}
                  >
                    {block.completed ? "Completed" : "Scheduled"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Mock Examination Log */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Examination Log & Verified Results
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Official scaled scores recorded from completed tests
                </CardDescription>
              </div>
              <Link href="/exam-prep">
                <Button variant="outline" size="xs">
                  All Tests
                </Button>
              </Link>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-left data-table">
                <thead>
                  <tr>
                    <th>Examination Administration</th>
                    <th>Date</th>
                    <th>Accuracy</th>
                    <th>Scaled Score</th>
                    <th>Percentile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
                        No examination attempts recorded yet. Completed full tests and diagnostics will log here with detailed score reports.
                      </td>
                    </tr>
                  ) : (
                    testResults.map((res) => (
                      <tr key={res.id}>
                        <td className="font-semibold text-slate-900 dark:text-white">{res.testTitle}</td>
                        <td className="text-slate-500">{new Date(res.completedAt).toLocaleDateString()}</td>
                        <td className="text-slate-600 dark:text-slate-300 font-medium">{res.accuracyPercentage}%</td>
                        <td className="font-bold text-slate-900 dark:text-white tabular-nums">
                          {res.scaledScore} / {res.maxScore}
                        </td>
                        <td>
                          <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/40 rounded-full px-2 py-0.5 text-xs font-semibold">
                            {res.percentile}th %tile
                          </span>
                        </td>
                        <td>
                          <Link
                            href={`/exam-prep/results/${res.id}`}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-xs"
                          >
                            Report →
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Diagnostic Bottlenecks, Tasks & Flashcards */}
        <div className="space-y-6">
          {/* Diagnostic Bottleneck Analysis */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <CardTitle className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Diagnostic Bottleneck Analysis
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  High-leverage focus areas for score lift
                </CardDescription>
              </div>
            </CardHeader>

            <div className="space-y-3 text-xs">
              {readiness.limitingFactors.map((f, i) => (
                <div
                  key={i}
                  className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-lg p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white">{f.topic}</span>
                    <span className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 px-2 py-0.5 rounded text-xs font-semibold">
                      {f.impactOnScore}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {f.recommendedAction}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Academic Tasks */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Academic Tasks
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {pendingTasks.length} pending items
                </CardDescription>
              </div>
              <Link href="/study-planner">
                <Button variant="ghost" size="xs">
                  Manage
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-2 text-xs">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-[#161822] flex items-start gap-2.5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1">
                    <div
                      className={`text-xs font-medium ${
                        task.status === "completed"
                          ? "line-through text-slate-400 dark:text-slate-500"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Due: {task.dueDate} • {task.priority.toUpperCase()} priority
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Daily Flashcard Recall */}
          <Card hover={false} className="p-5 bg-white dark:bg-[#161822] border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
              Active Recall Queue
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3.5 leading-relaxed">
              Review your {dueFlashcards.length} scheduled cards today to lock in high-frequency vocabulary and formulas.
            </p>
            <Link href="/flashcards" className="block">
              <Button variant="primary" size="sm" className="w-full justify-center">
                Review Queue ({dueFlashcards.length})
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Edit Target & Exam Date Modal */}
      {showEditTargetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161822] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Customize Target Score & Exam Date
                </h3>
              </div>
              <button
                onClick={() => setShowEditTargetModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTarget} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Examination Target
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value as SupportedExamId)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12141c] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none"
                >
                  {BRAND_CONFIG.supportedExams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} (Max {ex.maxScore})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Target Score Goal (Max {examDetails?.maxScore})
                </label>
                <input
                  type="number"
                  value={editScore}
                  onChange={(e) => setEditScore(Number(e.target.value))}
                  min={400}
                  max={examDetails?.maxScore || 1600}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12141c] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Scheduled Exam Date
                </label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12141c] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Daily Study Goal (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="12"
                  value={editHours}
                  onChange={(e) => setEditHours(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12141c] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditTargetModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  TrendingUp,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand.config";
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
    selectedExam,
    tasks,
    toggleTask,
    flashcards,
    scheduleBlocks,
    testResults,
  } = useApp();

  const examDetails = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam);
  const readiness = computePredictiveReadiness(
    selectedExam,
    profile.targetScore,
    profile.targetDate,
    testResults
  );

  const dueFlashcards = flashcards.filter((c) => new Date(c.dueDate) <= new Date());
  const pendingTasks = tasks.filter((t) => t.status !== "completed");

  // Chart data: test results progression
  const chartData = [
    { test: "Diagnostic", score: 1390, target: profile.targetScore },
    { test: "Practice 1", score: 1420, target: profile.targetScore },
    { test: "Sectional 2", score: 1450, target: profile.targetScore },
    { test: "Mock 1", score: 1470, target: profile.targetScore },
    { test: "Projected", score: readiness.estimatedScoreMax, target: profile.targetScore },
  ];

  return (
    <div className="space-y-6">
      {/* Clean Page Header with Visual Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide">
              {examDetails?.name.toUpperCase()} CANDIDATE
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">
              Exam in {readiness.daysRemaining} days ({new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Academic Performance Overview
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Targeting score of <strong className="text-slate-900 font-semibold">{profile.targetScore}</strong> ({readiness.readinessPercentage}% readiness index).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/exam-prep/adaptive">
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-lg px-4 py-2 text-xs transition-colors shadow-2xs">
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

      {/* 4 Revitalized KPI Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Predicted Score Interval */}
        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Predicted Score Interval
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
            </span>
            <span className="text-xs font-medium text-slate-400">/ {examDetails?.maxScore}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              ▲ {readiness.improvementTrend}
            </span>
            <span className="text-slate-400 font-medium">Confidence: {readiness.confidenceScore}%</span>
          </div>
        </Card>

        {/* Card 2: Daily Study Target */}
        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Daily Study Target
            </span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">1.8 hrs</span>
            <span className="text-xs font-medium text-slate-400">/ {profile.dailyStudyTargetHours} hrs goal</span>
          </div>
          <div className="mt-3.5 space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: "52%" }} />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 pt-0.5">
              <span>52% completed</span>
              <span className="font-semibold text-slate-600">1.7 hrs remaining</span>
            </div>
          </div>
        </Card>

        {/* Card 3: Active Recall Queue */}
        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Recall Queue
            </span>
            <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {dueFlashcards.length} cards
            </span>
            <span className="text-xs font-medium text-slate-400">due today</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{flashcards.length} total across decks</span>
            <Link href="/flashcards" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Review →
            </Link>
          </div>
        </Card>

        {/* Card 4: Preparation Consistency */}
        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Preparation Consistency
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {profile.streakDays} Days
            </span>
            <span className="text-xs font-medium text-slate-400">continuous</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{profile.totalStudyHours} total hrs</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              On Track
            </span>
          </div>
        </Card>
      </div>

      {/* Main Content Layout: Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Score Trend, Schedule, and Mock Test Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Trajectory Chart with Soft Vertical Gradient */}
          <Card hover={false} className="p-5">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                  Score Trajectory vs. Target Benchmark
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Tracking calibration across standardized administrations against benchmark {profile.targetScore}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Goal: {profile.targetScore}
                </span>
              </div>
            </CardHeader>

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
                    domain={[1200, 1600]}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "6px",
                      fontSize: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.12)",
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
          </Card>

          {/* Today's Structured Schedule */}
          <Card hover={false} className="p-5">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                  Scheduled Focus Sessions
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Time-blocked study allocation for peak morning focus
                </CardDescription>
              </div>
              <Link href="/study-planner">
                <Button variant="ghost" size="xs">
                  Full Planner →
                </Button>
              </Link>
            </CardHeader>

            <div className="divide-y divide-slate-100 text-xs">
              {scheduleBlocks.map((block) => (
                <div
                  key={block.id}
                  className="py-3 flex items-center justify-between hover:bg-slate-50/70 transition-colors px-1 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                        block.completed
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}
                    >
                      {block.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Play className="w-3 h-3 text-indigo-600" />
                      )}
                    </span>
                    <div>
                      <div
                        className={`font-semibold ${
                          block.completed ? "line-through text-slate-400" : "text-slate-900"
                        }`}
                      >
                        {block.topic}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {block.time} • {block.durationMinutes} mins • {block.subject}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                      block.completed
                        ? "bg-slate-100 text-slate-600 border-slate-200"
                        : "bg-indigo-50 text-indigo-700 border-indigo-200"
                    }`}
                  >
                    {block.completed ? "Completed" : "Scheduled"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Mock Examination Log (Data Table Format) */}
          <Card hover={false} className="p-5">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                  Examination Log & Verified Results
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Official scaled score conversions
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
                  {testResults.map((res) => (
                    <tr key={res.id}>
                      <td className="font-semibold text-slate-900">{res.testTitle}</td>
                      <td className="text-slate-500">{new Date(res.completedAt).toLocaleDateString()}</td>
                      <td className="text-slate-600 font-medium">{res.accuracyPercentage}%</td>
                      <td className="font-bold text-slate-900 tabular-nums">
                        {res.scaledScore} / {res.maxScore}
                      </td>
                      <td>
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2 py-0.5 text-xs font-semibold">
                          {res.percentile}th %tile
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/exam-prep/results/${res.id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                        >
                          Report →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column (1 span): Limiting Bottlenecks & Tasks */}
        <div className="space-y-6">
          {/* Limiting Factors Diagnostic Bottleneck Analysis */}
          <Card hover={false} className="p-5 border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 mb-3">
              <div>
                <CardTitle className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Diagnostic Bottleneck Analysis
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Highest leverage topics for score improvement
                </CardDescription>
              </div>
            </CardHeader>

            <div className="space-y-3 text-xs">
              {readiness.limitingFactors.map((f, i) => (
                <div key={i} className="bg-amber-50/50 border border-amber-200/80 rounded-lg p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{f.topic}</span>
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-xs font-semibold">
                      {f.impactOnScore}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{f.recommendedAction}</p>
                </div>
              ))}

              <div className="text-[11px] text-slate-400 leading-normal pt-1">
                * Note: Score predictions represent statistical simulations derived from mock variance and pacing.
              </div>
            </div>
          </Card>

          {/* Pending Tasks */}
          <Card hover={false} className="p-5">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">Academic Tasks</CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
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
                  className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-white flex items-start gap-2.5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1">
                    <div
                      className={`text-xs font-medium ${
                        task.status === "completed" ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Due: {task.dueDate} • {task.priority.toUpperCase()} priority
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Spaced Repetition Callout */}
          <Card hover={false} className="p-5 border-slate-200">
            <h4 className="font-bold text-xs text-slate-900 mb-1">Daily Flashcard Queue</h4>
            <p className="text-xs text-slate-500 mb-3.5 leading-relaxed">
              Clear your {dueFlashcards.length} scheduled cards to maintain the SuperMemo SM-2 retention threshold.
            </p>
            <Link href="/flashcards" className="block">
              <Button variant="primary" size="sm" className="w-full justify-center">
                Review Queue ({dueFlashcards.length})
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

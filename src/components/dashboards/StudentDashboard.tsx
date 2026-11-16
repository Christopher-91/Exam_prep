"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Flame,
  Clock,
  Layers,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  TrendingUp,
  Sparkles,
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
    { test: "Sectional 1", score: 1420, target: profile.targetScore },
    { test: "Sectional 2", score: 1450, target: profile.targetScore },
    { test: "Mock Test 1", score: 1470, target: profile.targetScore },
    { test: "AI Projected", score: readiness.estimatedScoreMax, target: profile.targetScore },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {examDetails?.name || selectedExam.toUpperCase()} Candidate
              </span>
              <span className="text-xs text-slate-400">
                • {readiness.daysRemaining} days until examination
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Good morning, {profile.name.split(" ")[0]}!
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Your predictive readiness is currently{" "}
              <strong className="text-indigo-300">{readiness.readinessPercentage}%</strong> with an estimated score
              band of <strong className="text-white">{readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}</strong>.
              Focusing on your limiting factors today will provide maximum score lift.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/exam-prep/adaptive">
              <Button variant="primary" size="md" className="gap-2 bg-indigo-500 hover:bg-indigo-600 shadow-md">
                <Sparkles className="w-4 h-4 text-indigo-100" /> Start AI Adaptive Drill
              </Button>
            </Link>
            <Link href="/exam-prep">
              <Button variant="secondary" size="md" className="border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
                Exam Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Predicted Score</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
            </span>
            <span className="text-xs text-slate-400">/ {examDetails?.maxScore}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              ▲ {readiness.improvementTrend}
            </span>
            <span className="text-slate-400">Confidence: {readiness.confidenceScore}%</span>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Daily Study Target</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1.8 hrs</span>
            <span className="text-xs text-slate-400">/ {profile.dailyStudyTargetHours} hrs goal</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: "52%" }} />
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Due Flashcards (SM-2)</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{dueFlashcards.length} cards</span>
            <span className="text-xs text-amber-600 font-medium">Due today</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Total cards: {flashcards.length}</span>
            <Link href="/flashcards" className="text-purple-600 font-semibold hover:underline">
              Review queue →
            </Link>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Consistency & Streak</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{profile.streakDays} Days</span>
            <span className="text-xs text-emerald-600 font-medium">On Track</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{profile.totalStudyHours} hrs logged</span>
            <span className="text-indigo-600 font-medium">Top 5% consistency</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Left Column (Schedule & Diagnostics) + Right Column (Readiness & Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Progression Chart */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">Score Progression & Target Trajectory</CardTitle>
                <CardDescription>
                  Tracking calibration across mock exams against target score ({profile.targetScore})
                </CardDescription>
              </div>
              <Badge variant="primary">Target: {profile.targetScore}</Badge>
            </CardHeader>
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="test" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
                  <YAxis domain={[1200, 1600]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreGrad)"
                    name="Your Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Today's Time-Blocked Schedule */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" /> Today's Time-Blocked Schedule
                </CardTitle>
                <CardDescription>Structured according to your peak focus morning preference</CardDescription>
              </div>
              <Link href="/study-planner">
                <Button variant="ghost" size="xs">
                  Full Planner →
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-2.5">
              {scheduleBlocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    block.completed
                      ? "bg-slate-50/70 border-slate-200 opacity-75"
                      : "bg-white border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                        block.completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {block.completed ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">{block.topic}</div>
                      <div className="text-[11px] text-slate-400">
                        {block.time} • {block.durationMinutes} mins • {block.subject}
                      </div>
                    </div>
                  </div>
                  <Badge variant={block.completed ? "success" : "neutral"}>
                    {block.completed ? "Done" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Mock Test History */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">Recent Mock Test Results</CardTitle>
                <CardDescription>Verified attempts calibrated with official section curves</CardDescription>
              </div>
              <Link href="/exam-prep">
                <Button variant="outline" size="xs">
                  Take New Test
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {testResults.slice(0, 2).map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{res.testTitle}</span>
                      <Badge variant="primary">{res.percentile}th Percentile</Badge>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Completed on {new Date(res.completedAt).toLocaleDateString()} • {res.accuracyPercentage}% accuracy •{" "}
                      {res.correctCount}/{res.totalQuestions} correct
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-indigo-600">{res.scaledScore}</div>
                      <div className="text-[10px] text-slate-400">out of {res.maxScore}</div>
                    </div>
                    <Link href={`/exam-prep/results/${res.id}`}>
                      <Button variant="outline" size="xs">
                        Review Explanations
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (1 span) */}
        <div className="space-y-6">
          {/* Predictive Readiness Breakdown */}
          <Card className="bg-gradient-to-b from-indigo-50/50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between w-full">
                <span>AI Readiness Forecast</span>
                <span className="text-xs text-indigo-600 font-bold">{readiness.readinessPercentage}%</span>
              </CardTitle>
              <CardDescription>Statistical estimate based on mock test variance</CardDescription>
            </CardHeader>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Confidence Level</span>
                  <span className="font-semibold">{readiness.confidenceScore}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${readiness.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Limiting factors */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Key Limiting Bottlenecks
                </span>
                <div className="space-y-2">
                  {readiness.limitingFactors.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-xs">
                      <div className="flex items-center justify-between text-amber-900 font-semibold">
                        <span>{f.topic}</span>
                        <span className="text-[11px] text-amber-700">{f.impactOnScore}</span>
                      </div>
                      <p className="text-[11px] text-amber-800 mt-1 leading-snug">{f.recommendedAction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-100 text-[11px] text-slate-500 leading-snug">
                * Note: Score predictions are statistical simulations derived from mock test variance, not guaranteed examination scores.
              </div>
            </div>
          </Card>

          {/* Active Recall Flashcards Queue */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600" /> Flashcard Queue
                </CardTitle>
                <CardDescription>Daily SM-2 spaced repetition</CardDescription>
              </div>
              <Badge variant="warning">{dueFlashcards.length} Due</Badge>
            </CardHeader>

            <p className="text-xs text-slate-600 mb-3">
              Clear your daily queue to maintain your 94% 30-day retention rate.
            </p>

            <Link href="/flashcards">
              <Button variant="primary" size="sm" className="w-full justify-center">
                Start Daily Review Session
              </Button>
            </Link>
          </Card>

          {/* Upcoming Study Tasks */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">Pending Assignments</CardTitle>
                <CardDescription>{pendingTasks.length} tasks scheduled</CardDescription>
              </div>
              <Link href="/study-planner">
                <Button variant="ghost" size="xs">
                  View All
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-white flex items-start gap-2.5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1">
                    <div
                      className={`text-xs font-medium ${
                        task.status === "completed" ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>Due: {task.dueDate}</span>
                      <span>•</span>
                      <span className="capitalize">{task.priority} Priority</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


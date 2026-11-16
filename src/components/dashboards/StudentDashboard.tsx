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
  LineChart,
  Line,
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
    { test: "Practice 1", score: 1420, target: profile.targetScore },
    { test: "Sectional 2", score: 1450, target: profile.targetScore },
    { test: "Mock 1", score: 1470, target: profile.targetScore },
    { test: "Projected", score: readiness.estimatedScoreMax, target: profile.targetScore },
  ];

  return (
    <div className="space-y-6">
      {/* Clean Page Header (No oversized gradient banner) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {examDetails?.name} Candidate
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-600">
              Exam in {readiness.daysRemaining} days ({new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Academic Performance Overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Targeting score of <strong>{profile.targetScore}</strong> ({readiness.readinessPercentage}% readiness index).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/exam-prep/adaptive">
            <Button variant="outline" size="sm">
              Adaptive Practice
            </Button>
          </Link>
          <Link href="/exam-prep/mock-test/sat-mock-1">
            <Button variant="primary" size="sm">
              Launch Full Exam Simulation
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Predicted Score Interval</span>
            <span className="text-[10px] font-semibold text-slate-400">95% CI</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
            </span>
            <span className="text-xs text-slate-400">/ {examDetails?.maxScore}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-medium">▲ {readiness.improvementTrend}</span>
            <span className="text-slate-400">Confidence: {readiness.confidenceScore}%</span>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Daily Preparation Allocation</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">1.8 hrs</span>
            <span className="text-xs text-slate-400">/ {profile.dailyStudyTargetHours} hrs goal</span>
          </div>
          <div className="mt-2.5">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-slate-900 h-full rounded-full" style={{ width: "52%" }} />
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Recall Due Queue</span>
            <Layers className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{dueFlashcards.length} cards</span>
            <span className="text-xs text-slate-500">due today</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">{flashcards.length} total across decks</span>
            <Link href="/flashcards" className="font-semibold text-slate-900 hover:underline">
              Review →
            </Link>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Preparation Consistency</span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{profile.streakDays} Days</span>
            <span className="text-xs text-slate-500">continuous</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">{profile.totalStudyHours} total hrs</span>
            <span className="text-slate-600 font-medium">Regular pacing</span>
          </div>
        </Card>
      </div>

      {/* Main Content Layout: Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Score Trend, Schedule, and Mock Test Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Trajectory Chart */}
          <Card hover={false}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Score Trajectory vs. Target Benchmark</CardTitle>
                <CardDescription>
                  Tracking calibration across standardized administrations against benchmark {profile.targetScore}
                </CardDescription>
              </div>
              <Badge variant="neutral">Goal: {profile.targetScore}</Badge>
            </CardHeader>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="test" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis domain={[1200, 1600]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "4px",
                      fontSize: "11px",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#0f172a"
                    strokeWidth={2}
                    dot={{ r: 3.5, fill: "#0f172a" }}
                    name="Scaled Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Today's Structured Schedule (Table/List format, not inside individual bubbles) */}
          <Card hover={false}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Scheduled Focus Sessions</CardTitle>
                <CardDescription>Time-blocked study allocation for peak morning focus</CardDescription>
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
                  className="py-3 flex items-center justify-between hover:bg-slate-50/60 transition-colors px-1"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] ${
                        block.completed ? "bg-slate-100 text-slate-500" : "bg-slate-900 text-white"
                      }`}
                    >
                      {block.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Play className="w-2.5 h-2.5" />}
                    </span>
                    <div>
                      <div className={`font-semibold ${block.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                        {block.topic}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {block.time} • {block.durationMinutes} mins • {block.subject}
                      </div>
                    </div>
                  </div>

                  <Badge variant={block.completed ? "neutral" : "primary"}>
                    {block.completed ? "Completed" : "Scheduled"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Mock Examination Log (Data Table Format) */}
          <Card hover={false}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Examination Log & Verified Results</CardTitle>
                <CardDescription>Official scaled score conversions</CardDescription>
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
                      <td className="text-slate-600">{res.accuracyPercentage}%</td>
                      <td className="font-bold text-slate-900">{res.scaledScore} / {res.maxScore}</td>
                      <td>
                        <Badge variant="neutral">{res.percentile}th %tile</Badge>
                      </td>
                      <td>
                        <Link href={`/exam-prep/results/${res.id}`} className="text-slate-900 hover:underline font-semibold text-xs">
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
          {/* Limiting Factors Diagnostic */}
          <Card hover={false} className="bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-slate-500">
                Diagnostic Bottleneck Analysis
              </CardTitle>
              <CardDescription>Highest leverage topics for score improvement</CardDescription>
            </CardHeader>

            <div className="space-y-3 pt-1 text-xs">
              {readiness.limitingFactors.map((f, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 rounded space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{f.topic}</span>
                    <span className="text-[11px] text-slate-500">{f.impactOnScore}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{f.recommendedAction}</p>
                </div>
              ))}

              <div className="text-[11px] text-slate-400 leading-normal pt-1">
                * Note: Score predictions represent statistical simulations derived from mock variance and pacing.
              </div>
            </div>
          </Card>

          {/* Pending Tasks */}
          <Card hover={false}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Academic Tasks</CardTitle>
                <CardDescription>{pendingTasks.length} pending items</CardDescription>
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
                  className="p-2.5 rounded border border-slate-100 hover:border-slate-200 bg-white flex items-start gap-2.5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-slate-900 focus:ring-slate-900"
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
          <Card hover={false} className="border-slate-200">
            <h4 className="font-semibold text-xs text-slate-900 mb-1">Daily Flashcard Queue</h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
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

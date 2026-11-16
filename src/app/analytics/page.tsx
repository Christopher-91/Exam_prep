"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Brain,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand.config";
import { computePredictiveReadiness } from "@/lib/readiness-engine";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Cell,
} from "recharts";

export default function AnalyticsPage() {
  const { profile, selectedExam, testResults } = useApp();

  const activeExam = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam);
  const readiness = computePredictiveReadiness(
    selectedExam,
    profile.targetScore,
    profile.targetDate,
    testResults
  );

  // Speed vs Accuracy Data
  const speedVsAccuracyData = [
    { section: "Algebra & Functions", accuracy: 92, avgSeconds: 58 },
    { section: "Advanced Math", accuracy: 88, avgSeconds: 74 },
    { section: "Data Analysis", accuracy: 76, avgSeconds: 88 },
    { section: "Geometry & Trig", accuracy: 64, avgSeconds: 105 },
    { section: "Reading Comprehension", accuracy: 84, avgSeconds: 65 },
    { section: "Grammar & Conventions", accuracy: 94, avgSeconds: 42 },
  ];

  // Subject Study Distribution Data
  const studyDistribution = [
    { subject: "Mathematics", hours: 42.5, color: "#4f46e5" },
    { subject: "Reading & Writing", hours: 28.0, color: "#0ea5e9" },
    { subject: "Flashcard Recall", hours: 14.0, color: "#a855f7" },
  ];

  // Score progression
  const progressionData = testResults.map((t, idx) => ({
    name: `Test ${idx + 1}`,
    score: t.scaledScore,
    percentile: t.percentile,
  })).reverse();

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> AI Predictive Readiness Engine
              </span>
              <span className="text-xs text-slate-400">• Psychometric Modeling</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Performance Analytics & Predictive Forecasting</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Real-time statistical extrapolation of your official examination performance, pacing bottlenecks, speed
              versus accuracy tradeoffs, and topic mastery distributions.
            </p>
          </div>

          <Link href="/exam-prep/adaptive">
            <Button variant="primary" size="md" className="gap-2 bg-indigo-500 hover:bg-indigo-600">
              <Sparkles className="w-4 h-4" /> Calibrate with Adaptive Test
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Predictive Readiness Gauge & Bottleneck Card */}
      <Card className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-indigo-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Estimated Score Callout */}
          <div className="text-center md:text-left space-y-1">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
              Official Scaled Score Forecast
            </span>
            <div className="text-4xl font-black text-slate-900">
              {readiness.estimatedScoreMin} – {readiness.estimatedScoreMax}
            </div>
            <p className="text-xs text-slate-500">
              Target: <strong className="text-slate-800">{readiness.targetScore}</strong> ({activeExam?.name})
            </p>
            <div className="pt-2">
              <Badge variant="success" className="font-bold text-xs">
                {readiness.readinessPercentage}% Readiness Index
              </Badge>
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Model Confidence Band</span>
              <span className="font-bold text-indigo-600">{readiness.confidenceScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${readiness.confidenceScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Based on {testResults.length} completed mock examinations. Confidence will reach 95%+ upon completing 4
              full-length simulations.
            </p>
          </div>

          {/* Key Limiting Bottleneck */}
          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 space-y-2">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Primary Limiting Bottleneck
            </span>
            <div className="font-bold text-xs text-slate-900">{readiness.limitingFactors[0]?.topic}</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {readiness.limitingFactors[0]?.recommendedAction}
            </p>
          </div>
        </div>

        {/* Disclaimer Alert */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            * <strong>Methodology Disclaimer:</strong> Predictions represent probabilistic statistical estimates
            derived from your historical mock variance, response pacing, and difficulty weightings. They are diagnostic
            targets and not guaranteed official test outcomes.
          </span>
        </div>
      </Card>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed vs Accuracy Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Speed vs. Accuracy Tradeoff Analysis</CardTitle>
            <CardDescription>Accuracy percentage by topic alongside average seconds per question</CardDescription>
          </CardHeader>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speedVsAccuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="section" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="accuracy" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Accuracy (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Score Progression Trajectory */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Historical Mock Score Trajectory</CardTitle>
            <CardDescription>Scaled score progression across attempts</CardDescription>
          </CardHeader>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
                <YAxis domain={[1200, 1600]} tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                  name="Scaled Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Topic Mastery Distribution & Study Time Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic Mastery List (2 spans) */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Topic-Level Mastery & Deficit Breakdown</CardTitle>
              <CardDescription>Granular performance mapping across active exam blueprint</CardDescription>
            </CardHeader>

            <div className="space-y-4 pt-1">
              {[
                { topic: "Linear & Systems of Equations", accuracy: 96, status: "mastered" },
                { topic: "Quadratics & Vieta's Theorem", accuracy: 92, status: "mastered" },
                { topic: "Rhetorical Vocabulary in Context", accuracy: 90, status: "mastered" },
                { topic: "Command of Paired Evidence", accuracy: 68, status: "moderate" },
                { topic: "Nonlinear Coordinate Geometry", accuracy: 62, status: "weak" },
                { topic: "Exponential Growth & Decay Models", accuracy: 58, status: "weak" },
              ].map((item, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{item.topic}</span>
                    <span className="font-bold text-slate-700">{item.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.accuracy >= 85
                          ? "bg-emerald-500"
                          : item.accuracy >= 65
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Study Time Allocation */}
        <Card className="p-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Study Time Distribution</CardTitle>
            <CardDescription>{profile.totalStudyHours} total hours logged</CardDescription>
          </CardHeader>

          <div className="space-y-4 text-xs pt-2">
            {studyDistribution.map((item, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-bold text-slate-800">{item.subject}</span>
                </div>
                <span className="font-semibold text-slate-600">{item.hours} hrs</span>
              </div>
            ))}

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 leading-snug">
              💡 <strong>AI Recommendation:</strong> Reallocate 30 mins from Vocabulary to Nonlinear Coordinate
              Geometry this week for optimal score lift.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


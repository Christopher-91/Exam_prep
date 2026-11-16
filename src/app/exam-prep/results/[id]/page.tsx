"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { BRAND_CONFIG } from "@/config/brand.config";
import { formatTimeSpent } from "@/lib/utils";

export default function ExamResultsPage() {
  const router = useRouter();
  const params = useParams();
  const resultId = params?.id as string;
  const { testResults, mockTests } = useApp();

  const [filterMode, setFilterMode] = useState<"all" | "incorrect" | "correct">("all");

  const result = testResults.find((r) => r.id === resultId) || testResults[0];
  const test = mockTests.find((t) => t.id === result?.testId) || mockTests[0];

  if (!result) {
    return (
      <div className="p-12 text-center text-slate-500">
        <p className="text-sm font-medium">Evaluation record not found.</p>
        <Link href="/exam-prep" className="text-xs text-slate-900 underline mt-2 inline-block">
          Return to Exam Preparation Hub
        </Link>
      </div>
    );
  }

  const examDetails = BRAND_CONFIG.supportedExams.find((e) => e.id === result.examId);

  // Filter questions for the question-by-question review
  const questionsToDisplay = (test?.questions || []).filter((q) => {
    const ans = result.answers[q.id];
    const isCorrect = ans?.isCorrect ?? (ans?.selectedOptionId === q.correctOptionId);
    if (filterMode === "correct") return isCorrect;
    if (filterMode === "incorrect") return !isCorrect;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation & Page Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
          <Link href="/exam-prep" className="hover:text-slate-900 transition-colors">
            Exam Preparation
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Diagnostic Score Report</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Official Diagnostic Score Report
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Completed on {new Date(result.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • Calibrated to official {examDetails?.provider} score curves
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export PDF
            </Button>
            <Link href="/exam-prep">
              <Button variant="primary" size="sm">
                Return to Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Official Score Card Showcase */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 uppercase">
                {result.examId} • Simulation Result
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {result.testTitle}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{result.testTitle}</h2>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Standardized assessment report showing psychometric scaled score, percentile rank among peer cohorts, and granular sectional breakdowns.
            </p>
          </div>

          {/* Scaled Score Callout */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center min-w-[240px]">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Standardized Scaled Score
            </span>
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {result.scaledScore}
              <span className="text-base font-normal text-slate-400"> / {result.maxScore}</span>
            </div>
            <div className="mt-2.5 flex items-center justify-center gap-2">
              <Badge variant="neutral" className="font-semibold text-xs bg-slate-200/80 text-slate-800">
                {result.percentile}th Percentile
              </Badge>
              <span className="text-xs text-emerald-700 font-medium">{result.accuracyPercentage}% Accuracy</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Items Attempted</span>
            <span className="font-semibold text-slate-900 text-sm mt-0.5 block">
              {result.answeredCount} of {result.totalQuestions}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Correct Answers</span>
            <span className="font-semibold text-emerald-700 text-sm mt-0.5 block">
              {result.correctCount} items ({result.accuracyPercentage}%)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Incorrect Answers</span>
            <span className="font-semibold text-rose-700 text-sm mt-0.5 block">
              {result.incorrectCount} items missed
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Total Duration</span>
            <span className="font-semibold text-slate-900 text-sm mt-0.5 block">
              {formatTimeSpent(result.timeSpentSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Diagnostic Evaluation & Performance Synthesis */}
      <Card className="p-5 border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-900">
            Psychometric & Pedagogical Performance Evaluation
          </CardTitle>
          <CardDescription>Synthesized cognitive diagnosis of submitted test items</CardDescription>
        </CardHeader>

        <div className="space-y-4 pt-1 text-xs">
          <p className="text-slate-700 leading-relaxed font-normal">{result.aiFeedback?.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-emerald-950">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block mb-1">Demonstrated Strengths</span>
              <ul className="list-disc list-inside space-y-1 text-emerald-900">
                {result.aiFeedback?.strengths.map((s, i) => (
                  <li key={i} className="leading-snug">{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-rose-50/60 border border-rose-200 text-rose-950">
              <span className="text-[11px] font-bold text-rose-800 uppercase block mb-1">Areas for Score Lift</span>
              <ul className="list-disc list-inside space-y-1 text-rose-900">
                {result.aiFeedback?.weaknesses.map((w, i) => (
                  <li key={i} className="leading-snug">{w}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900">
              <span className="text-[11px] font-bold text-slate-800 uppercase block mb-1">Prescribed Focus Plan</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {result.aiFeedback?.suggestedFocus.map((f, i) => (
                  <li key={i} className="leading-snug">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Section & Topic Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Table */}
        <Card className="p-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Sectional Performance Breakdown</CardTitle>
            <CardDescription>Accuracy and scaled score per test section</CardDescription>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {result.sectionBreakdown?.map((sec, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{sec.sectionName}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{sec.timeSpentMinutes} mins elapsed</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-sm">
                    {sec.score} / {sec.maxScore}
                  </div>
                  <div className="text-[11px] text-slate-500">{sec.accuracy}% accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Topic Table */}
        <Card className="p-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Topic Mastery Breakdown</CardTitle>
            <CardDescription>Conceptual accuracy and mastery classification</CardDescription>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {result.topicBreakdown?.map((top, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{top.topic}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {top.correct} of {top.total} correct
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-slate-700">{top.accuracy}%</span>
                  <Badge variant={top.status === "strong" ? "success" : top.status === "moderate" ? "warning" : "danger"}>
                    {top.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Question-by-Question Review */}
      <Card className="p-5">
        <CardHeader className="flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm">Detailed Item-by-Item Review</CardTitle>
            <CardDescription>Review questions, chosen responses, and detailed explanations</CardDescription>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 rounded transition-colors ${
                filterMode === "all" ? "bg-white font-semibold text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({(test?.questions || []).length})
            </button>
            <button
              onClick={() => setFilterMode("incorrect")}
              className={`px-3 py-1 rounded transition-colors ${
                filterMode === "incorrect" ? "bg-white font-semibold text-rose-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Missed ({result.incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-3 py-1 rounded transition-colors ${
                filterMode === "correct" ? "bg-white font-semibold text-emerald-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Correct ({result.correctCount})
            </button>
          </div>
        </CardHeader>

        <div className="space-y-4 pt-2">
          {questionsToDisplay.map((q, idx) => {
            const ans = result.answers[q.id];
            const isCorrect = ans?.isCorrect ?? (ans?.selectedOptionId === q.correctOptionId);
            const userChoice = ans?.selectedOptionId;

            return (
              <div
                key={q.id}
                className={`p-4 md:p-5 rounded-lg border text-xs space-y-3 ${
                  isCorrect ? "bg-white border-slate-200" : "bg-rose-50/20 border-rose-200"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Question {idx + 1}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{q.section}</span>
                    <span className="text-slate-400">({q.topic})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <Badge variant="success" className="gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct
                      </Badge>
                    ) : (
                      <Badge variant="danger" className="gap-1 font-medium">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Incorrect
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Prompt */}
                <p className="text-sm font-normal text-slate-900 leading-relaxed whitespace-pre-line">{q.prompt}</p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isUserPick = userChoice === opt.id;
                    const isRightOption = q.correctOptionId === opt.id;

                    let optClass = "bg-white border-slate-200 text-slate-700";
                    if (isRightOption) {
                      optClass = "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium";
                    } else if (isUserPick && !isRightOption) {
                      optClass = "bg-rose-50/80 border-rose-400 text-rose-950 font-medium";
                    }

                    return (
                      <div key={opt.id} className={`p-2.5 rounded-md border flex items-center justify-between ${optClass}`}>
                        <span>
                          <strong className="mr-1.5">{opt.id}.</strong> {opt.text}
                        </span>
                        {isRightOption && <span className="text-[10px] text-emerald-700 font-semibold">✓ Correct Key</span>}
                        {isUserPick && !isRightOption && (
                          <span className="text-[10px] text-rose-700 font-semibold">✗ Your Choice</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-600" /> Solution & Rationale:
                  </div>
                  <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                  {q.aiHint && (
                    <div className="text-[11px] text-slate-800 font-medium pt-1">
                      💡 Strategy Note: {q.aiHint}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <Link href="/exam-prep">
          <Button variant="outline" size="md">
            ← Return to Exam Preparation Hub
          </Button>
        </Link>
        <Link href="/exam-prep/adaptive">
          <Button variant="primary" size="md" className="gap-2">
            Practice Missed Concepts in Adaptive Drill <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

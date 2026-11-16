"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  BarChart3,
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
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
  const test = mockTests.find((t) => t.id === result.testId) || mockTests[0];

  if (!result) {
    return (
      <div className="p-8 text-center text-slate-500">
        Results record not found. <Link href="/exam-prep" className="text-indigo-600 underline">Return to Exam Prep</Link>
      </div>
    );
  }

  const examDetails = BRAND_CONFIG.supportedExams.find((e) => e.id === result.examId);

  // Filter questions for the question-by-question review
  const questionsToDisplay = test.questions.filter((q) => {
    const ans = result.answers[q.id];
    const isCorrect = ans?.isCorrect ?? (ans?.selectedOptionId === q.correctOptionId);
    if (filterMode === "correct") return isCorrect;
    if (filterMode === "incorrect") return !isCorrect;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Score Showcase */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                {result.examId} • Assessment Complete
              </span>
              <span className="text-xs text-slate-400">
                Completed on {new Date(result.completedAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{result.testTitle}</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Psychometric assessment calibrated using official {examDetails?.provider} sectional distributions.
            </p>
          </div>

          {/* Scaled Score Callout */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center min-w-[220px]">
            <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-300 font-semibold mb-1">
              <Trophy className="w-4 h-4 text-amber-400" /> Scaled Score
            </div>
            <div className="text-4xl font-extrabold text-white">
              {result.scaledScore}
              <span className="text-sm font-normal text-slate-400"> / {result.maxScore}</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Badge variant="primary" className="bg-indigo-500 text-white font-bold">
                {result.percentile}th Percentile
              </Badge>
              <span className="text-xs text-emerald-400 font-medium">{result.accuracyPercentage}% Accuracy</span>
            </div>
          </div>
        </div>

        {/* Mini stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Questions Answered</span>
            <span className="font-bold text-white text-sm">
              {result.answeredCount} / {result.totalQuestions}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Correct Items</span>
            <span className="font-bold text-emerald-400 text-sm">{result.correctCount} correct</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Incorrect Items</span>
            <span className="font-bold text-rose-400 text-sm">{result.incorrectCount} missed</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Time Elapsed</span>
            <span className="font-bold text-white text-sm">{formatTimeSpent(result.timeSpentSeconds)}</span>
          </div>
        </div>
      </div>

      {/* AI Pedagogical Feedback Card */}
      <Card className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 border-indigo-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2 text-indigo-950">
            <Sparkles className="w-4 h-4 text-indigo-600" /> AI Diagnostic Performance Feedback
          </CardTitle>
          <CardDescription>Synthesized cognitive evaluation of your responses</CardDescription>
        </CardHeader>

        <div className="space-y-4 pt-1 text-xs">
          <p className="text-slate-800 leading-relaxed font-medium">{result.aiFeedback?.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-950">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block mb-1">Key Strengths</span>
              <ul className="list-disc list-inside space-y-1 text-emerald-900">
                {result.aiFeedback?.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-950">
              <span className="text-[11px] font-bold text-rose-800 uppercase block mb-1">Areas for Lift</span>
              <ul className="list-disc list-inside space-y-1 text-rose-900">
                {result.aiFeedback?.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-950">
              <span className="text-[11px] font-bold text-indigo-800 uppercase block mb-1">Next Action Items</span>
              <ul className="list-disc list-inside space-y-1 text-indigo-900">
                {result.aiFeedback?.suggestedFocus.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Section & Topic Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Sectional Performance Breakdown</CardTitle>
            <CardDescription>Accuracy and scaled scores by exam section</CardDescription>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {result.sectionBreakdown?.map((sec, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">{sec.sectionName}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{sec.timeSpentMinutes} mins time spent</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-600 text-sm">
                    {sec.score} / {sec.maxScore}
                  </div>
                  <div className="text-[11px] text-slate-500">{sec.accuracy}% accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Topic Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Topic Mastery Breakdown</CardTitle>
            <CardDescription>Granular conceptual accuracy tracking</CardDescription>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {result.topicBreakdown?.map((top, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">{top.topic}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {top.correct} of {top.total} correct
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm">Comprehensive Item-by-Item Review</CardTitle>
            <CardDescription>Examine every question, correct choice, and deep rationale</CardDescription>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === "all" ? "bg-white font-semibold text-slate-900 shadow-2xs" : "text-slate-600"
              }`}
            >
              All ({test.questions.length})
            </button>
            <button
              onClick={() => setFilterMode("incorrect")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === "incorrect" ? "bg-white font-semibold text-rose-700 shadow-2xs" : "text-slate-600"
              }`}
            >
              Missed ({result.incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === "correct" ? "bg-white font-semibold text-emerald-700 shadow-2xs" : "text-slate-600"
              }`}
            >
              Correct ({result.correctCount})
            </button>
          </div>
        </CardHeader>

        <div className="space-y-6 pt-2">
          {questionsToDisplay.map((q, idx) => {
            const ans = result.answers[q.id];
            const isCorrect = ans?.isCorrect ?? (ans?.selectedOptionId === q.correctOptionId);
            const userChoice = ans?.selectedOptionId;

            return (
              <div
                key={q.id}
                className={`p-4 md:p-5 rounded-xl border text-xs space-y-3 transition-colors ${
                  isCorrect ? "bg-white border-slate-200" : "bg-rose-50/30 border-rose-200"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">Question {idx + 1}</span>
                    <span className="text-slate-500">• {q.section}</span>
                    <span className="text-slate-400">({q.topic})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <Badge variant="success" className="gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct
                      </Badge>
                    ) : (
                      <Badge variant="danger" className="gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Incorrect
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Prompt */}
                <p className="text-sm font-medium text-slate-900 leading-relaxed whitespace-pre-line">{q.prompt}</p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isUserPick = userChoice === opt.id;
                    const isRightOption = q.correctOptionId === opt.id;

                    let optClass = "bg-white border-slate-200 text-slate-700";
                    if (isRightOption) {
                      optClass = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                    } else if (isUserPick && !isRightOption) {
                      optClass = "bg-rose-50 border-rose-500 text-rose-950 font-semibold";
                    }

                    return (
                      <div key={opt.id} className={`p-2.5 rounded-lg border flex items-center justify-between ${optClass}`}>
                        <span>
                          <strong>{opt.id}.</strong> {opt.text}
                        </span>
                        {isRightOption && <span className="text-[10px] text-emerald-700 font-bold">✓ Correct Key</span>}
                        {isUserPick && !isRightOption && (
                          <span className="text-[10px] text-rose-700 font-bold">✗ Your Choice</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Pedagogical Explanation:
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                  {q.aiHint && (
                    <div className="text-[11px] text-indigo-700 font-medium pt-1">
                      💡 Pro Strategy: {q.aiHint}
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
            ← Back to Exam Preparation Hub
          </Button>
        </Link>
        <Link href="/exam-prep/adaptive">
          <Button variant="primary" size="md" className="gap-2">
            Practice Missed Concepts with AI Adaptive Drill <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}


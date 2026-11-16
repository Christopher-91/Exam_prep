"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Calculator,
  Save,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { QuestionAttemptStatus, TestAttemptAnswer, TestAttemptResult } from "@/lib/types";
import { calculateExamScore, formatDuration } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";

export default function MockTestTakingPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params?.id as string;
  const { mockTests, submitTestResult } = useApp();

  const test = mockTests.find((t) => t.id === testId) || mockTests[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(test.durationMinutes * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDesmosCalculator, setShowDesmosCalculator] = useState(false);

  // User answers and status map
  const [answers, setAnswers] = useState<Record<string, TestAttemptAnswer>>(() => {
    const initial: Record<string, TestAttemptAnswer> = {};
    test.questions.forEach((q, idx) => {
      initial[q.id] = {
        questionId: q.id,
        selectedOptionId: undefined,
        timeSpentSeconds: 0,
        status: idx === 0 ? "unanswered" : "not_visited",
      };
    });
    return initial;
  });

  const currentQuestion = test.questions[currentIndex] || test.questions[0];
  const currentAnswer = answers[currentQuestion.id];

  // Timer countdown
  useEffect(() => {
    if (isTimerPaused || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest(); // auto-submit on timeout
          return 0;
        }
        return prev - 1;
      });
      // Increment time spent on current question
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          timeSpentSeconds: (prev[currentQuestion.id]?.timeSpentSeconds || 0) + 1,
        },
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerPaused, secondsRemaining, currentQuestion.id]);

  // Navigate to question and mark as visited/unanswered if not answered
  const handleSelectQuestion = (index: number) => {
    const targetQ = test.questions[index];
    if (!targetQ) return;
    setAnswers((prev) => {
      const existing = prev[targetQ.id];
      if (existing.status === "not_visited") {
        return {
          ...prev,
          [targetQ.id]: { ...existing, status: "unanswered" },
        };
      }
      return prev;
    });
    setCurrentIndex(index);
  };

  // Option selection
  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => {
      const curr = prev[currentQuestion.id];
      const isMarked = curr.status === "marked_for_review" || curr.status === "answered_and_marked";
      const newStatus: QuestionAttemptStatus = isMarked ? "answered_and_marked" : "answered";

      return {
        ...prev,
        [currentQuestion.id]: {
          ...curr,
          selectedOptionId: optionId,
          status: newStatus,
          isCorrect: optionId === currentQuestion.correctOptionId,
        },
      };
    });
  };

  // Toggle mark for review
  const handleToggleMarkForReview = () => {
    setAnswers((prev) => {
      const curr = prev[currentQuestion.id];
      const hasAnswer = Boolean(curr.selectedOptionId);

      let newStatus: QuestionAttemptStatus;
      if (curr.status === "marked_for_review") {
        newStatus = hasAnswer ? "answered" : "unanswered";
      } else if (curr.status === "answered_and_marked") {
        newStatus = "answered";
      } else {
        newStatus = hasAnswer ? "answered_and_marked" : "marked_for_review";
      }

      return {
        ...prev,
        [currentQuestion.id]: { ...curr, status: newStatus },
      };
    });
  };

  // Clear current response
  const handleClearResponse = () => {
    setAnswers((prev) => {
      const curr = prev[currentQuestion.id];
      const isMarked = curr.status === "answered_and_marked" || curr.status === "marked_for_review";
      return {
        ...prev,
        [currentQuestion.id]: {
          ...curr,
          selectedOptionId: undefined,
          status: isMarked ? "marked_for_review" : "unanswered",
        },
      };
    });
  };

  // Calculate final score and submit
  const handleSubmitTest = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let answeredCount = 0;

    const topicStats: Record<string, { total: number; correct: number }> = {};
    const sectionStats: Record<string, { score: number; maxScore: number; correct: number; total: number; time: number }> = {};

    test.questions.forEach((q) => {
      const ans = answers[q.id];
      const isAns = Boolean(ans?.selectedOptionId);
      if (isAns) answeredCount += 1;

      const isCorr = ans?.selectedOptionId === q.correctOptionId;
      if (isCorr) correctCount += 1;
      else if (isAns) incorrectCount += 1;

      // Topic breakdown
      if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
      topicStats[q.topic].total += 1;
      if (isCorr) topicStats[q.topic].correct += 1;

      // Section breakdown
      if (!sectionStats[q.section]) {
        sectionStats[q.section] = { score: 0, maxScore: 0, correct: 0, total: 0, time: 0 };
      }
      sectionStats[q.section].total += 1;
      sectionStats[q.section].time += (ans?.timeSpentSeconds || 60) / 60;
      if (isCorr) sectionStats[q.section].correct += 1;
    });

    const scoreMetrics = calculateExamScore(test.examId, correctCount, incorrectCount, test.totalQuestions);

    const sectionBreakdown = Object.entries(sectionStats).map(([secName, val]) => ({
      sectionName: secName,
      score: Math.round((val.correct / val.total) * (test.examId === "sat" ? 800 : test.examId === "gre" ? 170 : 100)),
      maxScore: test.examId === "sat" ? 800 : test.examId === "gre" ? 170 : 100,
      accuracy: Math.round((val.correct / val.total) * 100),
      timeSpentMinutes: Math.round(val.time),
    }));

    const topicBreakdown = Object.entries(topicStats).map(([topName, val]) => {
      const acc = Math.round((val.correct / val.total) * 100);
      return {
        topic: topName,
        accuracy: acc,
        total: val.total,
        correct: val.correct,
        status: acc >= 75 ? ("strong" as const) : acc >= 50 ? ("moderate" as const) : ("weak" as const),
      };
    });

    const attemptResult: TestAttemptResult = {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      examId: test.examId,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: test.durationMinutes * 60 - secondsRemaining,
      totalQuestions: test.totalQuestions,
      answeredCount,
      correctCount,
      incorrectCount,
      rawScore: correctCount,
      scaledScore: scoreMetrics.scaledScore,
      maxScore: scoreMetrics.maxScore,
      percentile: scoreMetrics.percentile,
      accuracyPercentage: scoreMetrics.accuracy,
      sectionBreakdown,
      topicBreakdown,
      answers,
      aiFeedback: {
        summary: `You achieved a ${scoreMetrics.scaledScore}/${scoreMetrics.maxScore} (${scoreMetrics.percentile}th percentile) with ${scoreMetrics.accuracy}% overall accuracy.`,
        strengths: topicBreakdown.filter((t) => t.status === "strong").map((t) => t.topic),
        weaknesses: topicBreakdown.filter((t) => t.status !== "strong").map((t) => t.topic),
        suggestedFocus: ["Review explanation steps for missed items", "Practice 15 adaptive drills on weak topics"],
      },
    };

    submitTestResult(attemptResult);
    setShowSubmitModal(false);
    router.push(`/exam-prep/results/${attemptResult.id}`);
  };

  // Status counts for review modal and palette
  const countAnswered = Object.values(answers).filter(
    (a) => a.status === "answered" || a.status === "answered_and_marked"
  ).length;
  const countMarked = Object.values(answers).filter(
    (a) => a.status === "marked_for_review" || a.status === "answered_and_marked"
  ).length;
  const countUnanswered = test.totalQuestions - countAnswered;

  const getStatusColor = (status: QuestionAttemptStatus, isCurrent: boolean) => {
    if (isCurrent) return "ring-2 ring-indigo-600 bg-indigo-50 text-indigo-900 font-bold border-indigo-500";
    switch (status) {
      case "answered":
        return "bg-emerald-600 text-white border-emerald-600 font-semibold";
      case "answered_and_marked":
        return "bg-purple-600 text-white border-purple-600 font-semibold";
      case "marked_for_review":
        return "bg-amber-500 text-white border-amber-500 font-semibold";
      case "unanswered":
        return "bg-rose-50 text-rose-700 border-rose-300 font-semibold";
      case "not_visited":
      default:
        return "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-slate-50 -m-4 md:-m-6 lg:-m-8">
      {/* Test Bar Header */}
      <header className="h-14 bg-slate-900 text-white px-4 md:px-6 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
            {test.examId}
          </span>
          <h2 className="text-xs md:text-sm font-semibold truncate max-w-xs md:max-w-md">{test.title}</h2>
          <span className="text-xs text-slate-400 hidden sm:inline">• {currentQuestion.section}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Scientific Calculator Tool Toggle */}
          <button
            onClick={() => setShowDesmosCalculator(!showDesmosCalculator)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            title="Toggle Built-in Desmos Calculator"
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
              secondsRemaining < 300
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                : "bg-slate-800 text-indigo-300 border-slate-700"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDuration(secondsRemaining)}</span>
          </div>

          {/* Final Finish Button */}
          <Button
            variant="primary"
            size="xs"
            onClick={() => setShowSubmitModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            Submit Exam
          </Button>
        </div>
      </header>

      {/* Main Examination Body: Split into Question Area and Palette Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Question Prompt and Answer Selection */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 md:p-8 bg-white border-r border-slate-200">
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-between">
            {/* Question Top Metadata & Mark for Review */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    Question {currentIndex + 1} of {test.totalQuestions}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {currentQuestion.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkForReview}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      currentAnswer?.status === "marked_for_review" ||
                      currentAnswer?.status === "answered_and_marked"
                        ? "bg-amber-50 text-amber-800 border-amber-300 font-semibold"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      {currentAnswer?.status === "marked_for_review" ||
                      currentAnswer?.status === "answered_and_marked"
                        ? "Marked for Review"
                        : "Mark for Review"}
                    </span>
                  </button>

                  <button
                    onClick={handleClearResponse}
                    disabled={!currentAnswer?.selectedOptionId}
                    className="text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Clear Choice
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="py-6 text-sm md:text-base text-slate-900 font-medium leading-relaxed whitespace-pre-line">
                {currentQuestion.prompt}
              </div>

              {/* Options */}
              <div className="space-y-3 mt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer?.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-all ${
                        isSelected
                          ? "bg-indigo-50/80 border-indigo-600 text-indigo-950 font-semibold shadow-sm ring-1 ring-indigo-600"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50/60"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 border border-slate-300"
                        }`}
                      >
                        {opt.id}
                      </div>
                      <div className="flex-1 leading-snug">{opt.text}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Nav Controls */}
            <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => handleSelectQuestion(currentIndex - 1)}
                className="gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>

              <div className="text-xs text-slate-400">
                {countAnswered} of {test.totalQuestions} Answered
              </div>

              {currentIndex < test.totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSelectQuestion(currentIndex + 1)}
                  className="gap-1.5"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Review & Submit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question Palette & Section Overview */}
        <aside className="w-72 bg-slate-50 p-4 border-l border-slate-200 hidden md:flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Question Navigator</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Jump to any question instantly</p>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {test.questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCur = idx === currentIndex;
                const colorClass = getStatusColor(ans?.status || "not_visited", isCur);

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`h-9 rounded-lg border text-xs flex items-center justify-center transition-all ${colorClass}`}
                    title={`Question ${idx + 1}: ${ans?.status.replace("_", " ")}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-[11px] pt-4 border-t border-slate-200 text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Answered ({countAnswered})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span>Marked for Review ({countMarked})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-rose-50 border border-rose-300" />
                <span>Unanswered ({countUnanswered})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
                <span>Not Visited</span>
              </div>
            </div>
          </div>

          {/* Quick Submit CTA */}
          <div className="pt-4 border-t border-slate-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowSubmitModal(true)}
              className="w-full justify-center"
            >
              End Section & Submit
            </Button>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Confirm Examination Submission"
        description="Verify your attempt summary before final scoring is computed"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="p-2">
              <span className="block text-lg font-bold text-emerald-600">{countAnswered}</span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Answered</span>
            </div>
            <div className="p-2">
              <span className="block text-lg font-bold text-rose-600">{countUnanswered}</span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Unanswered</span>
            </div>
            <div className="p-2">
              <span className="block text-lg font-bold text-amber-600">{countMarked}</span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Marked</span>
            </div>
          </div>

          {countUnanswered > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You still have <strong>{countUnanswered} unanswered</strong> question(s). In tests without negative
                marking (like the Digital SAT), guessing is always advantageous!
              </span>
            </div>
          )}

          <p className="text-slate-500 text-xs">
            Once submitted, your answers will be locked, scoring algorithms will compute your section percentiles, and
            the AI diagnostic report will be compiled.
          </p>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setShowSubmitModal(false)}>
              Return to Test
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitTest} className="bg-emerald-600 hover:bg-emerald-700">
              Confirm & View Results
            </Button>
          </div>
        </div>
      </Modal>

      {/* Embedded Desmos Calculator Drawer / Modal */}
      {showDesmosCalculator && (
        <div className="fixed bottom-4 right-4 z-50 w-96 bg-white rounded-xl shadow-2xl border border-slate-300 p-3 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Digital SAT Graphing Calculator</span>
            </div>
            <button
              onClick={() => setShowDesmosCalculator(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
          <div className="h-64 bg-slate-900 rounded-lg p-3 text-white flex flex-col justify-between font-mono text-xs">
            <div className="text-right text-emerald-400 text-lg">f(x) = 3x² - 8x + 16</div>
            <div className="grid grid-cols-4 gap-1 text-center">
              {["sin", "cos", "tan", "√", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map(
                (btn, i) => (
                  <button key={i} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200">
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


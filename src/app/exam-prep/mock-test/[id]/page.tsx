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
  Calculator,
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
  const [showCalculator, setShowCalculator] = useState(false);
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>("all");

  // Answers and status
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

  useEffect(() => {
    if (isTimerPaused || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
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

  
  const handleEssayChange = (text: string) => {
    setAnswers((prev) => {
      const curr = prev[currentQuestion.id];
      const isMarked = curr.status === "marked_for_review" || curr.status === "answered_and_marked";
      const hasText = text.trim().length > 0;
      const newStatus: QuestionAttemptStatus = isMarked
        ? (hasText ? "answered_and_marked" : "marked_for_review")
        : (hasText ? "answered" : "unanswered");

      return {
        ...prev,
        [currentQuestion.id]: {
          ...curr,
          essayResponse: text,
          selectedOptionId: hasText ? "essay-submitted" : undefined,
          isCorrect: hasText ? true : false,
          status: newStatus,
        },
      };
    });
  };

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

      if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
      topicStats[q.topic].total += 1;
      if (isCorr) topicStats[q.topic].correct += 1;

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
        summary: `Scaled score: ${scoreMetrics.scaledScore}/${scoreMetrics.maxScore} (${scoreMetrics.percentile}th percentile) with ${scoreMetrics.accuracy}% accuracy.`,
        strengths: topicBreakdown.filter((t) => t.status === "strong").map((t) => t.topic),
        weaknesses: topicBreakdown.filter((t) => t.status !== "strong").map((t) => t.topic),
        suggestedFocus: ["Review diagnostic rationales for incorrect items", "Drill targeted practice sets in weak topics"],
      },
    };

    submitTestResult(attemptResult);
    setShowSubmitModal(false);
    router.push(`/exam-prep/results/${attemptResult.id}`);
  };

  const countAnswered = Object.values(answers).filter(
    (a) => a.status === "answered" || a.status === "answered_and_marked"
  ).length;
  const countMarked = Object.values(answers).filter(
    (a) => a.status === "marked_for_review" || a.status === "answered_and_marked"
  ).length;
  const countUnanswered = test.totalQuestions - countAnswered;

  const getStatusStyle = (status: QuestionAttemptStatus, isCurrent: boolean) => {
    if (isCurrent) return "ring-2 ring-slate-950 font-bold bg-white text-slate-950 border-slate-950";
    switch (status) {
      case "answered":
        return "bg-slate-900 text-white border-slate-900 font-semibold";
      case "answered_and_marked":
        return "bg-slate-800 text-amber-300 border-amber-500 font-semibold";
      case "marked_for_review":
        return "bg-amber-50 text-amber-900 border-amber-400 font-semibold";
      case "unanswered":
        return "bg-slate-100 text-slate-700 border-slate-300";
      case "not_visited":
      default:
        return "bg-white text-slate-400 border-slate-200 hover:border-slate-300";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
      {/* Official Testing Bar */}
      <header className="h-12 bg-slate-900 text-white px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {test.examId} Simulation
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-200 font-medium truncate max-w-xs">{currentQuestion.section}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Graphing Calculator</span>
          </button>

          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold ${
              secondsRemaining < 300
                ? "bg-rose-900/80 text-rose-200 border border-rose-700 animate-pulse"
                : "bg-slate-800 text-slate-200 border border-slate-700"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDuration(secondsRemaining)}</span>
          </div>

          <Button
            variant="secondary"
            size="xs"
            onClick={() => setShowSubmitModal(true)}
            className="bg-white text-slate-900 hover:bg-slate-100 font-semibold"
          >
            End Section
          </Button>
        </div>
      </header>

      {/* Main Testing Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem Prompt and Radio Options */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-10 border-r border-slate-200">
          <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
            <div>
              {/* Question metadata & review flag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase">
                    Question {currentIndex + 1} of {test.totalQuestions}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">{currentQuestion.topic}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkForReview}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                      currentAnswer?.status === "marked_for_review" ||
                      currentAnswer?.status === "answered_and_marked"
                        ? "bg-amber-50 text-amber-900 border-amber-300 font-semibold"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Flag className="w-3 h-3 text-amber-500" />
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
                    className="text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="py-6 text-sm text-slate-900 font-medium leading-relaxed whitespace-pre-line">
                {currentQuestion.prompt}
              </div>

              {/* Options or Essay Interface */}
              {currentQuestion.questionType === "essay" ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                    <div className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                      <span>Analytical Writing Task Instructions</span>
                    </div>
                    {currentQuestion.essayPrompt ||
                      "Plan and compose an analytical response addressing the issue above. Support your position with pertinent evidence and historical or contemporary examples."}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium text-slate-700">Type your essay response:</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 font-mono">
                          {currentAnswer?.essayResponse?.trim()
                            ? currentAnswer.essayResponse.trim().split(/\s+/).length
                            : 0}{" "}
                          words
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono">
                          {currentAnswer?.essayResponse?.length || 0} chars
                        </span>
                      </div>
                    </div>
                    <textarea
                      value={currentAnswer?.essayResponse || ""}
                      onChange={(e) => handleEssayChange(e.target.value)}
                      placeholder="Begin typing your analytical essay response here..."
                      className="w-full h-80 p-4 text-sm font-sans rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none resize-y leading-relaxed text-slate-900 bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentAnswer?.selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs md:text-sm flex items-start gap-3 transition-colors ${
                          isSelected
                            ? "bg-indigo-50/50 border-indigo-600 text-slate-950 font-semibold ring-1 ring-indigo-600"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected ? "bg-indigo-600 text-white" : "border border-slate-300 text-slate-600 bg-white"
                          }`}
                        >
                          {opt.id}
                        </div>
                        <div className="flex-1 leading-snug">{opt.text}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 mt-8 border-t border-slate-200 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => handleSelectQuestion(currentIndex - 1)}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>

              <div className="text-xs text-slate-500">
                {countAnswered} of {test.totalQuestions} Answered
              </div>

              {currentIndex < test.totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSelectQuestion(currentIndex + 1)}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Review Section
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question Palette Navigator */}
        <aside className="w-72 bg-slate-50 p-4 border-l border-slate-200 hidden md:flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="pb-2.5 border-b border-slate-200 mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Question Navigator</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Jump directly to any item</p>
            </div>

            {/* Section filter tabs */}
            {Array.from(new Set(test.questions.map((q) => q.section))).length > 1 && (
              <div className="flex flex-wrap gap-1 mb-3 pb-2 border-b border-slate-200">
                <button
                  onClick={() => setActiveSectionFilter("all")}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    activeSectionFilter === "all"
                      ? "bg-slate-900 text-white font-semibold"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  All ({test.totalQuestions})
                </button>
                {Array.from(new Set(test.questions.map((q) => q.section))).map((sec) => {
                  const secCount = test.questions.filter((q) => q.section === sec).length;
                  return (
                    <button
                      key={sec}
                      onClick={() => setActiveSectionFilter(sec)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors truncate max-w-[130px] ${
                        activeSectionFilter === sec
                          ? "bg-indigo-600 text-white font-semibold"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                      title={sec}
                    >
                      {sec.split(" ")[0]} ({secCount})
                    </button>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-5 gap-1.5 mb-5 max-h-96 overflow-y-auto pr-1">
              {test.questions
                .map((q, idx) => ({ q, originalIndex: idx }))
                .filter((item) => activeSectionFilter === "all" || item.q.section === activeSectionFilter)
                .map(({ q, originalIndex: idx }) => {
                  const ans = answers[q.id];
                  const isCur = idx === currentIndex;
                  const styleClass = getStatusStyle(ans?.status || "not_visited", isCur);

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(idx)}
                      className={`h-8 rounded border text-xs flex items-center justify-center transition-colors ${styleClass}`}
                      title={`${q.section} - Q${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
            </div>

            {/* Legend */}
            <div className="space-y-1.5 text-[11px] pt-3 border-t border-slate-200 text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-slate-900" />
                <span>Answered ({countAnswered})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-amber-50 border border-amber-400" />
                <span>Marked for Review ({countMarked})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-300" />
                <span>Unanswered ({countUnanswered})</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowSubmitModal(true)}
              className="w-full justify-center"
            >
              Submit Section
            </Button>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Confirm Examination Submission"
        description="Verify your responses before final scoring is computed"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200 rounded text-center">
            <div>
              <div className="text-base font-bold text-slate-900">{countAnswered}</div>
              <div className="text-[10px] text-slate-500 uppercase">Answered</div>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">{countUnanswered}</div>
              <div className="text-[10px] text-slate-500 uppercase">Unanswered</div>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">{countMarked}</div>
              <div className="text-[10px] text-slate-500 uppercase">Marked</div>
            </div>
          </div>

          {countUnanswered > 0 && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You have {countUnanswered} unanswered question(s). Unanswered questions are scored as 0 marks.
              </span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setShowSubmitModal(false)}>
              Return to Test
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitTest}>
              Confirm Submission
            </Button>
          </div>
        </div>
      </Modal>

      {/* Scientific Graphing Calculator Modal */}
      {showCalculator && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-lg shadow-lg border border-slate-300 p-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
            <span className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-slate-600" /> Graphing Tool
            </span>
            <button onClick={() => setShowCalculator(false)} className="text-slate-400 hover:text-slate-700 text-xs">
              ✕
            </button>
          </div>
          <div className="h-52 bg-slate-900 rounded p-3 text-white font-mono text-xs flex flex-col justify-between">
            <div className="text-right text-emerald-400 text-sm">f(x) = 2x² - 7x + 3</div>
            <div className="grid grid-cols-4 gap-1 text-center">
              {["sin", "cos", "tan", "√", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map(
                (btn, i) => (
                  <button key={i} className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-[11px]">
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

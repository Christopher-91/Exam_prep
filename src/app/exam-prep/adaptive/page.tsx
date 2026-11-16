"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  Award,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { Question, QuestionDifficulty } from "@/lib/types";
import { AIService, AIExplanationResult } from "@/lib/ai-service";

export default function AdaptiveTestingPage() {
  const { selectedExam, profile } = useApp();

  const [thetaAbility, setThetaAbility] = useState<number>(0.4); // latent ability score (-3 to +3)
  const [currentDifficulty, setCurrentDifficulty] = useState<QuestionDifficulty>("medium");
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<AIExplanationResult | null>(null);

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "q-adaptive-1",
    examId: selectedExam,
    section: "Mathematics",
    topic: "Quadratic Systems & Factoring",
    difficulty: "medium",
    prompt: "If 2x² - 7x + 3 = 0, what is the sum of the possible values of x?",
    options: [
      { id: "A", text: "7/2" },
      { id: "B", text: "3/2" },
      { id: "C", text: "-7/2" },
      { id: "D", text: "5" },
    ],
    correctOptionId: "A",
    explanation: "By Vieta's formulas, for any quadratic ax² + bx + c = 0, the sum of roots is -b/a. Here a = 2, b = -7, so sum = -(-7)/2 = 7/2. Alternatively, factor (2x - 1)(x - 3) = 0 => x = 1/2 or x = 3, sum = 1/2 + 3 = 7/2.",
    aiHint: "Apply Vieta's root theorem: Sum = -b/a",
    status: "approved",
  });

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optId);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctOptionId;

    // Adjust ability parameter θ (Item Response Theory calibration)
    let nextDiff: QuestionDifficulty = currentDifficulty;
    let newTheta = thetaAbility;

    if (isCorrect) {
      newTheta = Math.min(2.8, thetaAbility + 0.35);
      const newConsec = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsec);
      setConsecutiveIncorrect(0);

      if (newConsec >= 1) {
        nextDiff = "hard";
      }
    } else {
      newTheta = Math.max(-2.5, thetaAbility - 0.4);
      const newConsec = consecutiveIncorrect + 1;
      setConsecutiveIncorrect(newConsec);
      setConsecutiveCorrect(0);

      if (newConsec >= 1) {
        nextDiff = "easy";
      }
    }

    setThetaAbility(Number(newTheta.toFixed(2)));
    setCurrentDifficulty(nextDiff);

    // Fetch deep pedagogical explanation from AI layer
    const explanation = await AIService.explainQuestion({
      questionPrompt: currentQuestion.prompt,
      options: currentQuestion.options,
      correctOptionId: currentQuestion.correctOptionId,
      userSelectedOptionId: selectedOption,
      examId: selectedExam,
      topic: currentQuestion.topic,
    });
    setAiExplanation(explanation);
  };

  const handleNextQuestion = async () => {
    setIsGenerating(true);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAiExplanation(null);
    setQuestionCount((prev) => prev + 1);

    try {
      const generated = await AIService.generateQuestion({
        examId: selectedExam,
        subject: currentQuestion.section,
        topic: currentDifficulty === "hard" ? "Advanced Algebraic Polynomials" : "Linear Systems",
        difficulty: currentDifficulty,
      });
      setCurrentQuestion(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Convert theta to estimated percentile (-3 to +3 mapped to 1st - 99th percentile)
  const estimatedPercentile = Math.min(
    99,
    Math.max(1, Math.round(50 + thetaAbility * 18.5))
  );

  // Calculate gauge position percentage for theta (-3 = 0%, 0 = 50%, +3 = 100%)
  const gaugePercent = Math.min(100, Math.max(0, ((thetaAbility + 3) / 6) * 100));

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation & Page Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
          <Link href="/exam-prep" className="hover:text-slate-900 transition-colors">
            Exam Preparation
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Adaptive Diagnostic Engine</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Adaptive Diagnostic Assessment
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Item Response Theory (IRT) dynamic calibration calibrated for {selectedExam.toUpperCase()}. Difficulty scales continuously based on demonstrated latent ability.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/exam-prep">
              <Button variant="outline" size="sm">
                Exit to Test Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Latent Ability Calibration Bar (Psychometric Meter) */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-mono text-sm font-bold">
              θ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900">Latent Cognitive Ability Parameter</span>
                <span className="text-[10px] text-slate-400 font-mono">(SEM ±0.18)</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Current estimate: <span className="font-semibold text-slate-900">{thetaAbility > 0 ? `+${thetaAbility}` : thetaAbility}</span> • Standardized Percentile: <span className="font-semibold text-slate-900">{estimatedPercentile}th %tile</span>
              </div>
            </div>
          </div>

          {/* Visual Scale from -3 to +3 */}
          <div className="w-full md:w-80 space-y-1.5">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-3.0 (Foundational)</span>
              <span>0.0 (Median)</span>
              <span>+3.0 (Advanced)</span>
            </div>
            <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-slate-800 rounded-full transition-all duration-300"
                style={{ width: `${gaugePercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Item #{questionCount}</span>
              <span className="font-medium text-slate-700 capitalize">Current Tier: {currentDifficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Adaptive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Spans: The Question Presentation Card */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  Item {questionCount}
                </span>
                <span className="text-xs text-slate-500">{currentQuestion.section}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-700 font-medium">{currentQuestion.topic}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Calibrated Level:</span>
                <Badge
                  variant={
                    currentDifficulty === "easy"
                      ? "success"
                      : currentDifficulty === "medium"
                      ? "warning"
                      : "danger"
                  }
                >
                  {currentDifficulty.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Prompt */}
            <div className="py-6 text-sm md:text-base font-normal text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQuestion.prompt}
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = opt.id === currentQuestion.correctOptionId;

                let containerClasses = "border-slate-200 hover:border-slate-300 bg-white";
                let badgeClasses = "bg-slate-100 text-slate-700 border-slate-300";

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    containerClasses = "bg-emerald-50/70 border-emerald-500 text-emerald-950 font-medium";
                    badgeClasses = "bg-emerald-600 text-white border-emerald-600";
                  } else if (isSelected && !isCorrect) {
                    containerClasses = "bg-rose-50/70 border-rose-400 text-rose-950";
                    badgeClasses = "bg-rose-600 text-white border-rose-600";
                  } else {
                    containerClasses = "border-slate-200 opacity-50 bg-white";
                    badgeClasses = "bg-slate-100 text-slate-400 border-slate-200";
                  }
                } else if (isSelected) {
                  containerClasses = "bg-slate-50 border-slate-900 text-slate-900 font-medium ring-1 ring-slate-900";
                  badgeClasses = "bg-slate-900 text-white border-slate-900";
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs md:text-sm flex items-start gap-3 transition-colors ${containerClasses}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 border ${badgeClasses}`}
                    >
                      {opt.id}
                    </div>
                    <div className="flex-1 leading-relaxed pt-0.5">{opt.text}</div>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions Bar */}
            <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
              {!isAnswerSubmitted ? (
                <Button
                  variant="primary"
                  size="md"
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                >
                  Confirm Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNextQuestion}
                  loading={isGenerating}
                  className="gap-2"
                >
                  Proceed to Next Item <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {currentQuestion.aiHint && !isAnswerSubmitted && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>Strategic Clue: {currentQuestion.aiHint}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Diagnostic Breakdown Card */}
          {aiExplanation && (
            <Card className="p-5 border-slate-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-700" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Diagnostic Analysis & Methodological Solution
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Item #{questionCount} Review</span>
              </div>

              <div className="text-xs space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-slate-900 block mb-0.5">Solution Rationale:</span>
                  <p className="text-slate-700 leading-relaxed">{aiExplanation.whyCorrect}</p>
                </div>

                {aiExplanation.whyUserWasWrong && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-900">
                    <strong className="block text-[11px] font-semibold text-rose-950 mb-0.5">
                      Distractor Analysis & Cognitive Error:
                    </strong>
                    <p className="leading-relaxed">{aiExplanation.whyUserWasWrong}</p>
                  </div>
                )}

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                  <strong className="block text-[11px] font-semibold text-slate-900 mb-0.5">
                    Foundational Principle:
                  </strong>
                  <p className="leading-relaxed">{aiExplanation.underlyingConcept}</p>
                </div>

                <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-slate-800 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-900 block mb-0.5">Test Strategy:</span>
                    <span className="leading-relaxed">{aiExplanation.proTip}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right 1 Span: Session Telemetry & Recommendations */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-slate-500">
                Session Telemetry
              </CardTitle>
            </CardHeader>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Items Calibrated</span>
                <span className="font-semibold text-slate-900">{questionCount}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Operating Difficulty</span>
                <span className="font-semibold text-slate-900 capitalize">{currentDifficulty}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Consecutive Success</span>
                <span className="font-semibold text-slate-900">
                  {consecutiveCorrect > 0 ? `${consecutiveCorrect} correct in a row` : "Recalibrating"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Section Weight</span>
                <span className="font-semibold text-slate-900">{currentQuestion.section}</span>
              </div>
            </div>
          </Card>

          <Card className="border-amber-200 bg-amber-50/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> Topic Pacing Observation
              </CardTitle>
            </CardHeader>
            <div className="text-xs text-amber-900 space-y-2">
              <p className="leading-relaxed">
                Response latency is 20% higher than average on <strong>Quadratic Factoring</strong>. Reviewing roots and Vieta's formulas will yield a 15–20 point gain.
              </p>
              <Link
                href="/study-materials"
                className="inline-block text-slate-900 font-semibold underline text-[11px] hover:text-slate-700"
              >
                Access Algebraic Review Notes →
              </Link>
            </div>
          </Card>

          <Card>
            <div className="p-2 space-y-2">
              <h5 className="font-semibold text-xs text-slate-900">Full-Length Benchmark</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Diagnostic drills isolate conceptual limits. For timing and pacing across sections, complete an official full-length simulation.
              </p>
              <Link href="/exam-prep" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  View Full Mock Tests
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

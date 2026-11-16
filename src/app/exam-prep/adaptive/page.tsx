"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
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

  // Convert theta to estimated percentile
  const estimatedPercentile = Math.min(
    99,
    Math.max(20, Math.round(50 + thetaAbility * 20))
  );

  return (
    <div className="space-y-6">
      {/* Engine Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Item Response Theory (IRT) Engine
              </span>
              <span className="text-xs text-slate-400">• Dynamic Difficulty Calibration</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Adaptive Assessment & Diagnostic Engine</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Questions automatically scale in real-time according to your demonstrated cognitive ability. The AI
              identifies persistent misconceptions, detects guessing patterns, and isolates conceptual blindspots.
            </p>
          </div>

          {/* Latency Ability Meter */}
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 text-right min-w-[200px]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Latent Ability (θ)</span>
            <div className="text-xl font-bold text-indigo-400 flex items-baseline justify-end gap-1.5">
              <span>{thetaAbility > 0 ? `+${thetaAbility}` : thetaAbility}</span>
              <span className="text-xs text-slate-300">({estimatedPercentile}th %tile)</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-medium">
              Target Level: {currentDifficulty.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Adaptive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Spans: The Adaptive Question Card */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  Item #{questionCount}
                </span>
                <span className="text-xs text-slate-500">{currentQuestion.topic}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Difficulty:</span>
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
            <div className="py-6 text-sm md:text-base font-medium text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQuestion.prompt}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = opt.id === currentQuestion.correctOptionId;

                let stateClasses = "border-slate-200 hover:border-slate-300 hover:bg-slate-50";
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    stateClasses = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                  } else if (isSelected && !isCorrect) {
                    stateClasses = "bg-rose-50 border-rose-500 text-rose-950 font-medium";
                  } else {
                    stateClasses = "border-slate-200 opacity-60";
                  }
                } else if (isSelected) {
                  stateClasses = "bg-indigo-50 border-indigo-600 text-indigo-950 font-semibold ring-1 ring-indigo-600";
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-all ${stateClasses}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isAnswerSubmitted && isCorrect
                          ? "bg-emerald-600 text-white"
                          : isAnswerSubmitted && isSelected && !isCorrect
                          ? "bg-rose-600 text-white"
                          : isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-600 border border-slate-300"
                      }`}
                    >
                      {opt.id}
                    </div>
                    <div className="flex-1 leading-snug">{opt.text}</div>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions Bar */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              {!isAnswerSubmitted ? (
                <Button
                  variant="primary"
                  size="md"
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                  className="gap-2"
                >
                  Verify Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNextQuestion}
                  loading={isGenerating}
                  className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  Next Adaptive Item <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {currentQuestion.aiHint && !isAnswerSubmitted && (
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hint: {currentQuestion.aiHint}</span>
                </div>
              )}
            </div>
          </Card>

          {/* AI Explanation Accordion/Card */}
          {aiExplanation && (
            <Card className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-indigo-200 p-5 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
                <Brain className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  AI Deep Pedagogical Explanation
                </h4>
              </div>

              <div className="text-xs space-y-2.5">
                <p className="text-slate-800 leading-relaxed font-medium">{aiExplanation.whyCorrect}</p>
                {aiExplanation.whyUserWasWrong && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200/80 rounded-lg text-rose-900">
                    <strong className="block text-[11px] mb-0.5">Misconception Analysis:</strong>
                    {aiExplanation.whyUserWasWrong}
                  </div>
                )}
                <div className="p-2.5 bg-slate-100/80 rounded-lg text-slate-700">
                  <strong className="block text-[11px] text-slate-900 mb-0.5">Core Principle:</strong>
                  {aiExplanation.underlyingConcept}
                </div>
                <div className="p-2.5 bg-indigo-100/60 rounded-lg text-indigo-900 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{aiExplanation.proTip}</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right 1 Span: Real-time Telemetry & Recommendations */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-slate-500">
                Adaptive Telemetry
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Items Attempted</span>
                <span className="font-bold text-slate-800">{questionCount}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Difficulty Trend</span>
                <span className="font-semibold text-indigo-600 capitalize">{currentDifficulty}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Streak Status</span>
                <span className="font-semibold text-emerald-600">
                  {consecutiveCorrect > 0 ? `${consecutiveCorrect} correct streak` : "Resetting"}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-amber-50/50 border-amber-200/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Topic Weakness Alerts
              </CardTitle>
            </CardHeader>
            <div className="text-xs text-amber-900 space-y-2">
              <p className="leading-snug">
                The algorithm detected a 25% hesitation increase on <strong>Nonlinear Coordinate Geometry</strong>.
              </p>
              <Link href="/study-materials" className="inline-block text-indigo-700 font-semibold underline text-[11px]">
                Read 12-Minute Circle Geometry Notes →
              </Link>
            </div>
          </Card>

          <Card>
            <div className="text-center p-2">
              <h5 className="font-bold text-xs text-slate-800">Ready to simulate full exam?</h5>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                Transition to a full timed mock test to benchmark pacing across all sections.
              </p>
              <Link href="/exam-prep" className="block">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  Exit to Full Mock Tests
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Zap,
  ArrowRight,
  Filter,
  Building2,
  GraduationCap,
  Sparkles,
  ChevronRight,
  RotateCcw,
  HelpCircle,
  BookMarked,
  Clock,
  Award,
} from "lucide-react";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import {
  APTITUDE_QUESTIONS,
  AptitudeQuestion,
  PLACEMENT_COMPANIES,
  MATH_TOPICS,
  ENGLISH_TOPICS,
  PLACEMENT_FORMULA_CHEAT_SHEET,
} from "@/lib/questions/aptitude-questions";

interface AptitudePracticeHubProps {
  initialSection?: "all" | "Math" | "English";
}

export function AptitudePracticeHub({ initialSection = "all" }: AptitudePracticeHubProps) {
  const [activeSection, setActiveSection] = useState<"all" | "Math" | "English">(initialSection);
  const [selectedCompany, setSelectedCompany] = useState<string>("All Companies");
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);

  // Active question index in filtered list
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // User session stats
  const [sessionResults, setSessionResults] = useState<Record<string, { selected: string; isCorrect: boolean }>>({});

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return APTITUDE_QUESTIONS.filter((q) => {
      if (activeSection !== "all" && q.section !== activeSection) return false;
      if (selectedCompany !== "All Companies" && !q.companyTags.includes(selectedCompany)) return false;
      if (selectedTopic !== "All Topics" && q.topic !== selectedTopic) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [activeSection, selectedCompany, selectedTopic, selectedDifficulty]);

  const currentQuestion: AptitudeQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectSection = (sec: "all" | "Math" | "English") => {
    setActiveSection(sec);
    setSelectedTopic("All Topics");
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
  };

  const handleSelectCompany = (comp: string) => {
    setSelectedCompany(comp);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    setSessionResults((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedOptionId, isCorrect },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
  };

  const solvedCount = Object.keys(sessionResults).length;
  const correctCount = Object.values(sessionResults).filter((r) => r.isCorrect).length;
  const accuracyRate = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;

  const currentTopics = activeSection === "English" ? ENGLISH_TOPICS : MATH_TOPICS;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Campus Placement Aptitude</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                COLLEGE RECRUITMENT CALIBRATION
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">TCS NQT • Infosys • Accenture • Cognizant • Wipro</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Campus Recruitment Aptitude Practice
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive Quantitative Aptitude (Math) and Verbal Ability (English) drills engineered for on-campus and off-campus company placement tests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFormulaSheet(!showFormulaSheet)}
              className="gap-1.5 text-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              {showFormulaSheet ? "Hide Cheat Sheet" : "Speed Tricks Cheat Sheet"}
            </Button>
            <Link href="/exam-prep">
              <Button variant="secondary" size="sm" className="text-xs">
                Back to Prep Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Target Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Placement Cutoff Target</span>
          <span className="font-bold text-slate-900 text-sm">
            75%+ <span className="text-slate-400 text-xs font-normal">(Avg. Tier-1 Cutoff)</span>
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Questions Practiced</span>
          <span className="font-bold text-slate-900 text-sm">
            {solvedCount} <span className="text-slate-400 text-xs font-normal">/ {APTITUDE_QUESTIONS.length} Available</span>
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Session Accuracy</span>
          <span className="font-bold text-emerald-600 text-sm">
            {solvedCount > 0 ? `${accuracyRate}%` : "No Drills Yet"}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Speed Benchmark</span>
          <span className="font-bold text-slate-900 text-sm">
            ≤ 60s <span className="text-slate-400 text-xs font-normal">per question</span>
          </span>
        </div>
      </div>

      {/* Speed Tricks Cheat Sheet (Collapsible) */}
      {showFormulaSheet && (
        <Card className="p-5 border-amber-200 bg-amber-50/30 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                High-Frequency Placement Formulas & Speed Shortcuts
              </h3>
            </div>
            <span className="text-[11px] text-amber-800 font-medium">Memory Retention Aid</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {PLACEMENT_FORMULA_CHEAT_SHEET.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">{item.topic}</span>
                <p className="text-slate-600 text-[11px] font-mono leading-relaxed bg-slate-50 p-1.5 rounded border border-slate-100">
                  {item.formula}
                </p>
                <p className="text-[11px] text-amber-900 pt-0.5">
                  <strong className="font-semibold text-amber-950">Speed Trick:</strong> {item.speedRule}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Section Switcher (All / Math / English) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Math Card / Tab */}
        <button
          onClick={() => handleSelectSection("Math")}
          className={`text-left p-4 rounded-xl border transition-all ${
            activeSection === "Math"
              ? "bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <Badge variant={activeSection === "Math" ? "primary" : "neutral"}>
              {APTITUDE_QUESTIONS.filter((q) => q.section === "Math").length} Questions
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Quantitative Aptitude (Math)</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Time & Work, Speed Distance & Trains, Profit & Loss, Alligations, Combinatorics, Probability, Number Systems, and Interest formulas.
          </p>
        </button>

        {/* English Card / Tab */}
        <button
          onClick={() => handleSelectSection("English")}
          className={`text-left p-4 rounded-xl border transition-all ${
            activeSection === "English"
              ? "bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <Badge variant={activeSection === "English" ? "success" : "neutral"}>
              {APTITUDE_QUESTIONS.filter((q) => q.section === "English").length} Questions
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Verbal Ability (English)</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Spotting Errors, Para Jumbles, Reading Comprehension inferences, Parallelism, Vocabulary in Context, Cloze Tests, and Critical Reasoning.
          </p>
        </button>
      </div>

      {/* Company Filter Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" /> Filter by Target Company Hiring Pattern:
          </span>
          <span className="text-[11px] text-slate-400">
            Showing {filteredQuestions.length} calibrated question{filteredQuestions.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {PLACEMENT_COMPANIES.map((company) => (
            <button
              key={company}
              onClick={() => handleSelectCompany(company)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCompany === company
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Filters: Topic & Difficulty */}
      <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Topic:</span>
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setCurrentIndex(0);
              handleReset();
            }}
            className="px-2.5 py-1.5 rounded border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {currentTopics.map((top) => (
              <option key={top} value={top}>
                {top}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setCurrentIndex(0);
              handleReset();
            }}
            className="px-2.5 py-1.5 rounded border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Tiers</option>
            <option value="easy">Easy (Foundational)</option>
            <option value="medium">Medium (Standard Placement)</option>
            <option value="hard">Hard (Tier-1 Advanced)</option>
          </select>
        </div>

        {(selectedTopic !== "All Topics" || selectedCompany !== "All Companies" || selectedDifficulty !== "all") && (
          <button
            onClick={() => {
              setSelectedCompany("All Companies");
              setSelectedTopic("All Topics");
              setSelectedDifficulty("all");
              setCurrentIndex(0);
              handleReset();
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 ml-auto text-[11px]"
          >
            <RotateCcw className="w-3 h-3" /> Clear Filters
          </button>
        )}
      </div>

      {/* Main Interactive Question Solver */}
      {filteredQuestions.length === 0 ? (
        <Card className="p-8 text-center text-slate-500">
          <p className="text-sm font-semibold text-slate-800">No questions match the current filter selection.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the company or topic filters above.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCompany("All Companies");
              setSelectedTopic("All Topics");
              setSelectedDifficulty("all");
            }}
            className="mt-4"
          >
            Reset All Filters
          </Button>
        </Card>
      ) : (
        currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Spans: The Active Question Workspace */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-6">
                {/* Question Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      Item {currentIndex + 1} of {filteredQuestions.length}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {currentQuestion.section}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-800">{currentQuestion.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentQuestion.companyTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                    <Badge
                      variant={
                        currentQuestion.difficulty === "easy"
                          ? "success"
                          : currentQuestion.difficulty === "medium"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {currentQuestion.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Optional Passage Box for Reading Comprehension */}
                {currentQuestion.passage && (
                  <div className="my-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Reading Passage
                    </span>
                    {currentQuestion.passage}
                  </div>
                )}

                {/* Question Prompt */}
                <div className="py-5 text-sm md:text-base font-normal text-slate-900 leading-relaxed whitespace-pre-line">
                  {currentQuestion.prompt}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrect = opt.id === currentQuestion.correctOptionId;

                    let containerClasses = "border-slate-200 hover:border-slate-300 bg-white";
                    let badgeClasses = "bg-slate-100 text-slate-700 border-slate-300";

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        containerClasses = "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium";
                        badgeClasses = "bg-emerald-600 text-white border-emerald-600";
                      } else if (isSelected && !isCorrect) {
                        containerClasses = "bg-rose-50/80 border-rose-400 text-rose-950";
                        badgeClasses = "bg-rose-600 text-white border-rose-600";
                      } else {
                        containerClasses = "border-slate-200 opacity-50 bg-white";
                        badgeClasses = "bg-slate-100 text-slate-400 border-slate-200";
                      }
                    } else if (isSelected) {
                      containerClasses = "bg-indigo-50/60 border-indigo-600 text-indigo-950 font-medium ring-1 ring-indigo-600";
                      badgeClasses = "bg-indigo-600 text-white border-indigo-600";
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

                {/* Action Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {!isAnswerSubmitted ? (
                      <Button
                        variant="primary"
                        size="md"
                        disabled={!selectedOptionId}
                        onClick={handleSubmitAnswer}
                      >
                        Confirm Answer
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleNextQuestion}
                        className="gap-2"
                      >
                        Next Placement Question <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}

                    {isAnswerSubmitted && (
                      <Button variant="outline" size="md" onClick={handleReset}>
                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Try Again
                      </Button>
                    )}
                  </div>

                  {/* Hint Toggle */}
                  {currentQuestion.hint && !isAnswerSubmitted && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 font-medium bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {showHint ? "Hide Clue" : "Need a Clue?"}
                    </button>
                  )}
                </div>

                {/* Pre-Submission Hint */}
                {showHint && !isAnswerSubmitted && currentQuestion.hint && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[11px] font-semibold text-amber-950 mb-0.5">
                        Strategic Placement Clue:
                      </strong>
                      <p className="leading-relaxed">{currentQuestion.hint}</p>
                    </div>
                  </div>
                )}
              </Card>

              {/* Solution & Speed Trick Box (Appears after answer confirmation) */}
              {isAnswerSubmitted && (
                <Card className="p-5 border-slate-300 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-slate-800" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Detailed Solution & Placement Derivation
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Answer: Option ({currentQuestion.correctOptionId})
                    </span>
                  </div>

                  {/* Speed Trick Box */}
                  {currentQuestion.speedTrick && (
                    <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Zap className="w-4 h-4 text-amber-600" />
                        <span>30-Second Placement Speed Trick:</span>
                      </div>
                      <p className="leading-relaxed font-medium">{currentQuestion.speedTrick}</p>
                    </div>
                  )}

                  {/* Formula Reference */}
                  {currentQuestion.formula && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                      <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wide">
                        Core Formula / Rule Applied:
                      </span>
                      <code className="text-indigo-700 font-mono text-[11px] block">
                        {currentQuestion.formula}
                      </code>
                    </div>
                  )}

                  {/* Full Step-by-Step Derivation */}
                  <div className="text-xs space-y-2">
                    <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wide">
                      Step-by-Step Explanation:
                    </span>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </Card>
              )}
            </div>

            {/* Right 1 Span: Session Telemetry & Quick Navigation */}
            <div className="space-y-4">
              {/* Question Navigator */}
              <Card>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Question Navigator ({filteredQuestions.length})
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">Jump to question</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto">
                    {filteredQuestions.map((q, idx) => {
                      const result = sessionResults[q.id];
                      let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";

                      if (result) {
                        btnStyle = result.isCorrect
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-rose-600 text-white border-rose-600";
                      } else if (idx === currentIndex) {
                        btnStyle = "bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/20";
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentIndex(idx);
                            handleReset();
                          }}
                          className={`h-8 rounded text-xs font-semibold border flex items-center justify-center transition-colors ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentIndex === 0}
                      onClick={handlePrevQuestion}
                      className="text-xs flex-1"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentIndex === filteredQuestions.length - 1}
                      onClick={handleNextQuestion}
                      className="text-xs flex-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Placement Companies Highlight */}
              <Card className="p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" /> Target Recruitment Drives
                </h4>
                <div className="text-xs text-slate-600 space-y-2">
                  <p className="leading-relaxed">
                    Aptitude forms the elimination round in 95% of on-campus placement drives. Scoring above 75% in under 50 seconds per question guarantees shortlisting for technical rounds.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {["TCS NQT", "Infosys DSE", "Accenture", "Cognizant", "Wipro NLTH", "Amazon OA"].map((c) => (
                      <span
                        key={c}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Quick Links Card */}
              <Card className="p-4 space-y-2 text-xs">
                <h5 className="font-semibold text-slate-900">Adaptive IRT Practice</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Looking for Item Response Theory calibration for SAT, GRE, or GMAT?
                </p>
                <Link href="/exam-prep/adaptive" className="block pt-1">
                  <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                    Switch to Adaptive Practice →
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )
      )}
    </div>
  );
}

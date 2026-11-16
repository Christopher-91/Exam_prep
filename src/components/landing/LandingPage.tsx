"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Flame,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  FileText,
  Boxes,
  Database,
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
  Brain,
  Sliders,
  Laptop,
  Check,
  X,
  Target,
  GraduationCap,
} from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useApp } from "@/context/AppContext";

export function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useApp();
  const [activeSheetTab, setActiveSheetTab] = useState<"sat" | "jee" | "gre" | "neet">("sat");

  // Curated Sheets Data
  const sheetData = {
    sat: {
      title: "Complete Digital SAT Prep Sheet",
      tagline: "The definitive 495-topic roadmap covering every Hard Math pattern and Reading craft type.",
      topics: 495,
      hours: 132,
      difficulty: { easy: "25%", medium: "50%", hard: "25%" },
      modules: [
        { name: "Algebra: Linear Equations & Inequalities", count: 48, status: "High Yield" },
        { name: "Advanced Math: Quadratics & Polynomial Factors", count: 76, status: "Essential" },
        { name: "Problem-Solving & Data Analysis: Scatterplots & Rates", count: 52, status: "High Yield" },
        { name: "Geometry & Trigonometry: Circle Theorems & SOH-CAH-TOA", count: 38, status: "Mastery" },
        { name: "Reading & Writing: Craft & Structure (Vocabulary in Context)", count: 94, status: "High Yield" },
        { name: "Reading & Writing: Information and Ideas (Central Idea & Claims)", count: 86, status: "Essential" },
        { name: "Expression of Ideas: Transitions & Rhetorical Synthesis", count: 101, status: "High Yield" },
      ],
    },
    jee: {
      title: "JEE Main & Advanced Mastery Blueprint",
      tagline: "Rigorous problem sheets spanning Mechanics, Calculus, Electromagnetism, and Physical Chemistry.",
      topics: 380,
      hours: 185,
      difficulty: { easy: "15%", medium: "45%", hard: "40%" },
      modules: [
        { name: "Mechanics: Newton's Laws, Rotational Dynamics & Inertia", count: 65, status: "Crucial" },
        { name: "Calculus: Limits, Continuity & Definite Integrals", count: 78, status: "Crucial" },
        { name: "Electromagnetism: Gauss's Law, Ampere's Law & Induction", count: 82, status: "High Yield" },
        { name: "Organic Chemistry: Reaction Mechanisms & Stereochemistry", count: 70, status: "High Yield" },
        { name: "Thermodynamics & Heat Transfer: Carnot Engine & Entropy", count: 85, status: "Essential" },
      ],
    },
    gre: {
      title: "GRE General Quantitative & Verbal Blueprint",
      tagline: "Target 330+ with pattern-based quantitative reasoning and high-frequency Tier 1 vocabulary.",
      topics: 260,
      hours: 90,
      difficulty: { easy: "20%", medium: "50%", hard: "30%" },
      modules: [
        { name: "Quantitative Comparison: Number Properties & Divisibility", count: 54, status: "High Yield" },
        { name: "Data Interpretation: Multi-variable Tables & Graphs", count: 42, status: "Essential" },
        { name: "Text Completion: Double & Triple Blank Logic Clues", count: 68, status: "Mastery" },
        { name: "Sentence Equivalence: Synonym Pairs & Nuanced Connotations", count: 52, status: "High Yield" },
        { name: "Analytical Writing: Issue Essay Thesis & Evidence Structures", count: 44, status: "Core" },
      ],
    },
    neet: {
      title: "NEET UG Medical High-Yield Biology & Chemistry",
      tagline: "Strict NCERT alignment, conceptual botany, zoology, and chemical kinetics.",
      topics: 340,
      hours: 140,
      difficulty: { easy: "30%", medium: "50%", hard: "20%" },
      modules: [
        { name: "Human Physiology: Circulation, Respiration & Neural Control", count: 90, status: "Highest Yield" },
        { name: "Genetics & Molecular Basis of Inheritance", count: 84, status: "Crucial" },
        { name: "Cell Biology & Biomolecules: Enzymes & Nucleic Acids", count: 62, status: "Essential" },
        { name: "Physical & Inorganic Chemistry: Coordination Compounds & Equilibrium", count: 104, status: "High Yield" },
      ],
    },
  };

  const activeSheet = sheetData[activeSheetTab];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-950 dark:selection:text-indigo-200">
      {/* ================= 1. CLEAN TAKEUFORWARD NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                takeuforward style
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#sheets" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Curated Sheets
            </a>
            <Link href="/exam-prep/adaptive" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Adaptive Practice
            </Link>
            <Link href="/study-planner" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Planly
            </Link>
            <Link href="/flashcards" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              SM-2 Flashcards
            </Link>
            <Link href="/interactive-learning" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              STEM Sandbox
            </Link>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Why Us
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle (Light/Dark mode) */}
            <ThemeToggle />

            {/* Authenticated vs Guest links */}
            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-block px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ================= 2. HERO INTRODUCTION ================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>2026 DIGITAL SAT & COMPETITIVE EXAM SYLLABUS UPDATED</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Master Competitive Exams with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Structured Curated Sheets</span>.
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            No endless random practice questions. Follow battle-tested topic sheets, adaptive psychometric diagnostic tests, and active recall flashcards engineered for top percentiles.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => router.push(isAuthenticated ? "/dashboard" : "/signup")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>{isAuthenticated ? "Open Dashboard" : "Start Preparing Free"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#sheets"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 dark:bg-[#161820] dark:text-slate-200 dark:hover:bg-[#1e2230] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Explore Curated Sheets</span>
            </a>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-100 dark:border-slate-800/80 max-w-4xl mx-auto">
            <div className="p-3 text-center">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">60,000+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Active Candidates</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">12,000+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Pattern Questions</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums tracking-tight">99.4%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Psychometric IRT Accuracy</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tight">+140 pts</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Average SAT Score Lift</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. CURATED TOPIC SHEETS (THE TAKEUFORWARD SHEET MODEL) ================= */}
      <section id="sheets" className="py-16 md:py-20 bg-slate-50/50 dark:bg-[#0f1118]/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Curated Topic Sheets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Don&apos;t practice blindly. Master exact patterns.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Each sheet breaks down the entire syllabus into bite-sized, high-yield topics organized from fundamentals to hard difficulty.
            </p>
          </div>

          {/* Exam Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {[
              { id: "sat" as const, label: "Digital SAT (A2Z)", code: "SAT" },
              { id: "jee" as const, label: "JEE Main & Advanced", code: "JEE" },
              { id: "gre" as const, label: "GRE General", code: "GRE" },
              { id: "neet" as const, label: "NEET Medical", code: "NEET" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSheetTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeSheetTab === tab.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white dark:bg-[#161820] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Sheet Card Display */}
          <div className="bg-white dark:bg-[#161820] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-card space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                  Official Blueprint
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {activeSheet.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                  {activeSheet.tagline}
                </p>
              </div>

              {/* Sheet Stats & CTA */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{activeSheet.topics} Topics</div>
                  <div className="text-[11px] text-slate-400">~{activeSheet.hours} hours estimated</div>
                </div>

                <Link
                  href="/dashboard"
                  className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Start Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Modules List inside Sheet */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Included High-Yield Modules
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeSheet.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#12141c]/50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-white dark:bg-[#1a1d26] border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-500">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {mod.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400">{mod.count} patterns</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/60">
                        {mod.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. THE 4 PILLARS OF ACUITY ================= */}
      <section id="features" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Comprehensive Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Engineered for Deep Academic Preparation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Four unified systems that replace disconnected test banks, notes, and timers with an intelligent workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1: IRT Testing */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Adaptive IRT Test Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Item Response Theory calculates question difficulty (\(b\)) and discrimination (\(a\)) to adapt real-time, matching authentic multi-stage exams.
              </p>
              <Link
                href="/exam-prep"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
              >
                <span>Try simulation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Planly Dynamic Scheduler */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Planly Dynamic Scheduler
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter your test date and target score. Planly generates customized day-by-day practice blocks and automatically recalibrates if you miss a day.
              </p>
              <Link
                href="/study-planner"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
              >
                <span>Build your plan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: Spaced Repetition (SM-2) */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                SuperMemo SM-2 Recall
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Active recall flashcards for high-frequency vocabulary, formulas, and grammar rules. Algorithmic review intervals prevent memory decay.
              </p>
              <Link
                href="/flashcards"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline pt-1"
              >
                <span>Explore decks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4: Interactive STEM Sandbox */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Interactive STEM Labs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Manipulate pendulums, projectile trajectories, and coordinate transformations visually in real-time to internalize physics and geometry principles.
              </p>
              <Link
                href="/interactive-learning"
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline pt-1"
              >
                <span>Launch labs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. COMPARISON MATRIX ================= */}
      <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-[#0f1118]/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Serious Students Switch to {BRAND_CONFIG.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Comparing modern structured preparation with legacy alternatives.
            </p>
          </div>

          <div className="bg-white dark:bg-[#161820] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#12141c]">
                    <th className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                    <th className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20">{BRAND_CONFIG.shortName} Platform</th>
                    <th className="p-3.5 font-semibold text-slate-500">Coaching Centers</th>
                    <th className="p-3.5 font-semibold text-slate-500">Random Tabs / YouTube</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">Curated Topic Sheets</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400 bg-indigo-50/20 dark:bg-indigo-950/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Exhaustive (495 topics)
                    </td>
                    <td className="p-3.5 text-slate-500">Rigid printouts</td>
                    <td className="p-3.5 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Scattered & incomplete</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">Adaptive IRT Engine</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400 bg-indigo-50/20 dark:bg-indigo-950/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Authentic CollegeBoard scale
                    </td>
                    <td className="p-3.5 text-slate-500">Fixed monthly paper tests</td>
                    <td className="p-3.5 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> None</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">Spaced Repetition (SM-2)</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400 bg-indigo-50/20 dark:bg-indigo-950/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Algorithmic active recall
                    </td>
                    <td className="p-3.5 text-slate-500">Manual rote memorization</td>
                    <td className="p-3.5 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Passive video watching</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">Planly Study Scheduler</td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400 bg-indigo-50/20 dark:bg-indigo-950/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Self-adjusting daily quotas
                    </td>
                    <td className="p-3.5 text-slate-500">Inflexible batch schedule</td>
                    <td className="p-3.5 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Constant procrastination</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. FINAL CALL TO ACTION ================= */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Stop losing hours across open browser tabs.
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Join 60,000+ candidates who simplified their entire competitive exam roadmap into one clean, distraction-free workspace.
          </p>
          <div className="pt-2">
            <button
              onClick={() => router.push(isAuthenticated ? "/dashboard" : "/signup")}
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>{isAuthenticated ? "Launch Dashboard Now" : "Create Free Candidate Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= 7. TAKEUFORWARD CLEAN FOOTER ================= */}
      <footer className="py-12 bg-white dark:bg-[#0c0d12] text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {BRAND_CONFIG.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The modern ecosystem for competitive exam preparation. Structured curated sheets, psychometric adaptive testing, and spaced repetition.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Curated Sheets
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/exam-prep" className="hover:text-indigo-600 dark:hover:text-white">SAT 1600 Patterns</Link></li>
              <li><Link href="/exam-prep" className="hover:text-indigo-600 dark:hover:text-white">Digital SAT A2Z Sheet</Link></li>
              <li><Link href="/exam-prep" className="hover:text-indigo-600 dark:hover:text-white">JEE Mechanics Sheet</Link></li>
              <li><Link href="/exam-prep" className="hover:text-indigo-600 dark:hover:text-white">GRE Quant Blueprint</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Platform
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-white">Dashboard</Link></li>
              <li><Link href="/study-planner" className="hover:text-indigo-600 dark:hover:text-white">Planly Scheduler</Link></li>
              <li><Link href="/flashcards" className="hover:text-indigo-600 dark:hover:text-white">SM-2 Flashcards</Link></li>
              <li><Link href="/interactive-learning" className="hover:text-indigo-600 dark:hover:text-white">STEM Labs</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Security & Legal
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-slate-400">COPPA & FERPA Compliant</span></li>
              <li><span className="text-slate-400">Privacy Policy</span></li>
              <li><span className="text-slate-400">Terms of Service</span></li>
              <li><span className="text-slate-400">Security Practices</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

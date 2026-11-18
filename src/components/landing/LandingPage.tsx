"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  CreditCard,
  ChevronDown,
  ArrowRight,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
  Boxes,
  Database,
  Target,
  GraduationCap,
  Sparkles,
  Check,
  X,
  Users,
  TrendingUp,
  Award,
  Zap,
  Briefcase,
  Flame,
  BookOpen,
  ShieldCheck,
  Star,
  Heart,
} from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useApp } from "@/context/AppContext";

export function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  // Hero interactive widget state
  const [examCategory, setExamCategory] = useState<"undergrad" | "grad" | "placement">("undergrad");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("30 days");
  const [activeSheetTab, setActiveSheetTab] = useState<"sat" | "jee" | "gre" | "neet" | "aptitude">("sat");
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);

  // Topics for the right-hand hero widget with semantic vibrant color accents
  const undergradTopics = [
    { name: "Digital SAT (Full 98 Qs)", count: 98, link: "/exam-prep/mock-test/sat-mock-full-98", color: "indigo" },
    { name: "Reading & Writing Craft", count: 54, link: "/exam-prep/adaptive?topic=verbal", color: "emerald" },
    { name: "Hard SAT Mathematics", count: 44, link: "/exam-prep/adaptive?topic=math", color: "indigo" },
    { name: "Linear Systems & Matrices", count: 28, link: "/exam-prep/adaptive?topic=math", color: "sky" },
    { name: "Quadratics & Parabolas", count: 22, link: "/exam-prep/adaptive?topic=math", color: "violet" },
    { name: "Words in Context", count: 32, link: "/exam-prep/adaptive?topic=verbal", color: "amber" },
    { name: "Cross-Text Evidence", count: 24, link: "/exam-prep/adaptive?topic=verbal", color: "rose" },
    { name: "Standard English Conventions", count: 26, link: "/exam-prep/adaptive?topic=verbal", color: "emerald" },
    { name: "Trigonometry & Circles", count: 18, link: "/exam-prep/adaptive?topic=math", color: "sky" },
  ];

  const gradTopics = [
    { name: "GRE General (Full 55 Qs)", count: 55, link: "/exam-prep/mock-test/gre-mock-full-55", color: "sky" },
    { name: "GMAT Focus (Full 64 Qs)", count: 64, link: "/exam-prep/mock-test/gmat-mock-full-64", color: "emerald" },
    { name: "Verbal Reasoning (RC & TC)", count: 27, link: "/exam-prep/adaptive?topic=verbal", color: "indigo" },
    { name: "Quantitative Comparison", count: 27, link: "/exam-prep/adaptive?topic=quant", color: "sky" },
    { name: "GMAT Problem Solving", count: 21, link: "/exam-prep/adaptive?topic=quant", color: "amber" },
    { name: "Critical Reasoning Logic", count: 23, link: "/exam-prep/adaptive?topic=verbal", color: "rose" },
    { name: "GMAT Data Insights (MSR)", count: 20, link: "/exam-prep/adaptive?topic=data", color: "violet" },
    { name: "High-Yield Tier 1 Vocab", count: 16, link: "/exam-prep/adaptive?topic=vocab", color: "emerald" },
    { name: "Analytical Writing Issue Task", count: 1, link: "/exam-prep/mock-test/gre-mock-full-55", color: "indigo" },
  ];

  const placementTopics = [
    { name: "TCS NQT Quantitative", count: 32, link: "/aptitude-practice/math", color: "violet" },
    { name: "Speed, Time & Trains", count: 20, link: "/aptitude-practice/math", color: "indigo" },
    { name: "Time & Work Efficiency", count: 24, link: "/aptitude-practice/math", color: "amber" },
    { name: "Profit & Successive Discount", count: 18, link: "/aptitude-practice/math", color: "emerald" },
    { name: "Spotting Errors (Grammar)", count: 26, link: "/aptitude-practice/english", color: "rose" },
    { name: "Para Jumbles Sequence", count: 19, link: "/aptitude-practice/english", color: "sky" },
    { name: "Infosys & Wipro Aptitude", count: 35, link: "/aptitude-practice", color: "violet" },
    { name: "Accenture & Cognizant Verbal", count: 28, link: "/aptitude-practice/english", color: "emerald" },
    { name: "30-Sec Speed Tricks Sheet", count: 12, link: "/aptitude-practice", color: "amber" },
  ];

  const currentTopicList =
    examCategory === "undergrad"
      ? undergradTopics
      : examCategory === "grad"
      ? gradTopics
      : placementTopics;

  const filteredTopics = currentTopicList.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colorStyles: Record<string, string> = {
    indigo:
      "bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100 hover:border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60 dark:hover:bg-indigo-900/40",
    emerald:
      "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60 dark:hover:bg-emerald-900/40",
    sky:
      "bg-sky-50 text-sky-700 border-sky-200/80 hover:bg-sky-100 hover:border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60 dark:hover:bg-sky-900/40",
    amber:
      "bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100 hover:border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60 dark:hover:bg-amber-900/40",
    violet:
      "bg-purple-50 text-purple-700 border-purple-200/80 hover:bg-purple-100 hover:border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/60 dark:hover:bg-purple-900/40",
    rose:
      "bg-rose-50 text-rose-700 border-rose-200/80 hover:bg-rose-100 hover:border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60 dark:hover:bg-rose-900/40",
  };

  // Curated Sheets Data
  const sheetData = {
    sat: {
      title: "Complete Digital SAT Prep Sheet",
      tagline: "495 high-yield patterns covering Hard Math, Desmos heuristics, and Reading craft analysis.",
      topics: 495,
      hours: 132,
      badgeColor: "bg-indigo-500 text-white",
      headerGradient: "from-indigo-50/90 via-white to-purple-50/40 dark:from-indigo-950/40 dark:via-[#161820] dark:to-purple-950/20",
      accentBorder: "border-indigo-200 dark:border-indigo-800",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
      modules: [
        { name: "Algebra: Linear Equations & Systems", count: 48, status: "High Yield", statusColor: "amber" },
        { name: "Advanced Math: Quadratics & Polynomial Factors", count: 76, status: "Essential", statusColor: "indigo" },
        { name: "Data Analysis: Scatterplots, Probabilities & Rates", count: 52, status: "High Yield", statusColor: "amber" },
        { name: "Geometry & Trig: Circle Theorems & SOH-CAH-TOA", count: 38, status: "Mastery", statusColor: "violet" },
        { name: "Reading & Writing: Craft & Structure (Vocab in Context)", count: 94, status: "Crucial", statusColor: "emerald" },
        { name: "Information & Ideas: Central Idea & Evidence Inferences", count: 86, status: "Essential", statusColor: "indigo" },
        { name: "Expression of Ideas: Rhetorical Synthesis & Transitions", count: 101, status: "High Yield", statusColor: "amber" },
      ],
    },
    jee: {
      title: "JEE Main & Advanced Mastery Blueprint",
      tagline: "Rigorous problem sets spanning Mechanics, Calculus, Electromagnetism, and Physical Chemistry.",
      topics: 380,
      hours: 185,
      badgeColor: "bg-amber-600 text-white",
      headerGradient: "from-amber-50/90 via-white to-orange-50/40 dark:from-amber-950/40 dark:via-[#161820] dark:to-orange-950/20",
      accentBorder: "border-amber-200 dark:border-amber-800",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      modules: [
        { name: "Mechanics: Newton's Laws, Rotational Motion & Inertia", count: 65, status: "Crucial", statusColor: "emerald" },
        { name: "Calculus: Limits, Continuity & Definite Integrals", count: 78, status: "Crucial", statusColor: "emerald" },
        { name: "Electromagnetism: Gauss's Law, Ampere's Law & Induction", count: 82, status: "High Yield", statusColor: "amber" },
        { name: "Organic Chemistry: Reaction Mechanisms & Stereochemistry", count: 70, status: "High Yield", statusColor: "amber" },
        { name: "Thermodynamics & Heat Transfer: Carnot Engine & Entropy", count: 85, status: "Essential", statusColor: "indigo" },
      ],
    },
    gre: {
      title: "GRE General Quantitative & Verbal Blueprint",
      tagline: "Target 330+ with pattern-based quantitative reasoning and high-frequency Tier 1 vocabulary.",
      topics: 260,
      hours: 90,
      badgeColor: "bg-sky-600 text-white",
      headerGradient: "from-sky-50/90 via-white to-blue-50/40 dark:from-sky-950/40 dark:via-[#161820] dark:to-blue-950/20",
      accentBorder: "border-sky-200 dark:border-sky-800",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
      modules: [
        { name: "Quantitative Comparison: Number Properties & Divisibility", count: 54, status: "High Yield", statusColor: "amber" },
        { name: "Data Interpretation: Multi-variable Tables & Graphs", count: 42, status: "Essential", statusColor: "indigo" },
        { name: "Text Completion: Double & Triple Blank Logic Clues", count: 68, status: "Mastery", statusColor: "violet" },
        { name: "Sentence Equivalence: Synonym Pairs & Nuanced Connotations", count: 52, status: "Crucial", statusColor: "emerald" },
        { name: "Analytical Writing: Issue Essay Thesis & Evidence Structures", count: 44, status: "Core", statusColor: "sky" },
      ],
    },
    neet: {
      title: "NEET UG Medical High-Yield Biology & Chemistry",
      tagline: "Strict NCERT alignment, conceptual botany, zoology, and chemical kinetics.",
      topics: 340,
      hours: 140,
      badgeColor: "bg-emerald-600 text-white",
      headerGradient: "from-emerald-50/90 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-[#161820] dark:to-teal-950/20",
      accentBorder: "border-emerald-200 dark:border-emerald-800",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      modules: [
        { name: "Human Physiology: Circulation, Respiration & Neural Control", count: 90, status: "Highest Yield", statusColor: "rose" },
        { name: "Genetics & Molecular Basis of Inheritance", count: 84, status: "Crucial", statusColor: "emerald" },
        { name: "Cell Biology & Biomolecules: Enzymes & Nucleic Acids", count: 62, status: "Essential", statusColor: "indigo" },
        { name: "Physical Chemistry: Chemical Equilibrium & Kinetics", count: 104, status: "High Yield", statusColor: "amber" },
      ],
    },
    aptitude: {
      title: "Campus Recruitment Aptitude Blueprint (Math & English)",
      tagline: "High-frequency problem patterns and 30-second speed tricks for TCS NQT, Infosys, Accenture, Cognizant, and Wipro.",
      topics: 280,
      hours: 65,
      badgeColor: "bg-purple-600 text-white",
      headerGradient: "from-purple-50/90 via-white to-pink-50/40 dark:from-purple-950/40 dark:via-[#161820] dark:to-pink-950/20",
      accentBorder: "border-purple-200 dark:border-purple-800",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      modules: [
        { name: "Time & Work: Efficiency, Alternate Days & Pipes", count: 42, status: "High Yield", statusColor: "amber" },
        { name: "Speed, Distance & Trains: Relative Velocity", count: 36, status: "Crucial", statusColor: "emerald" },
        { name: "Commercial Math: Successive Discounts & Alligations", count: 48, status: "High Yield", statusColor: "amber" },
        { name: "Combinatorics & Probability: Balls, Dice & Words", count: 34, status: "Essential", statusColor: "indigo" },
        { name: "Verbal: Subject-Verb Agreement & Dangling Modifiers", count: 52, status: "Highest Yield", statusColor: "rose" },
        { name: "Verbal: Para Jumbles & Cohesive Sequence Pairing", count: 38, status: "High Yield", statusColor: "amber" },
        { name: "Critical Reasoning: Assumption Weakening & Syllogisms", count: 30, status: "Mastery", statusColor: "violet" },
      ],
    },
  };

  const activeSheet = sheetData[activeSheetTab];

  const statusBadgeStyles: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    violet: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    rose: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
    sky: "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800",
  };

  return (
    <div className="min-h-screen bg-slate-50/40 dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-950 dark:selection:text-indigo-200 relative overflow-x-hidden">
      {/* ================= 1. CLEAN TOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo with Vibrant Indigo Accent */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase mt-0.5">
                Learning Systems
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {/* Dashboard Link */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Dashboard</span>
            </Link>

            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExploreMenuOpen(!exploreMenuOpen)}
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Curriculum & Tracks</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {exploreMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#161820] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Standardized Exams
                  </div>
                  <Link
                    href="/exam-prep"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    <span>Digital SAT (98 Qs)</span>
                  </Link>
                  <Link
                    href="/exam-prep"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    <span>GRE General (55 Qs)</span>
                  </Link>
                  <Link
                    href="/exam-prep"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    <span>GMAT Focus (64 Qs)</span>
                  </Link>

                  <div className="px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-t border-slate-100 dark:border-slate-800 mt-1">
                    Specialized Preparation
                  </div>
                  <Link
                    href="/aptitude-practice"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    <span>Campus Placement Aptitude</span>
                  </Link>
                  <Link
                    href="/exam-prep/adaptive"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    <span>Adaptive IRT Diagnostic</span>
                  </Link>
                  <Link
                    href="/flashcards"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    <span>SM-2 Spaced Flashcards</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Campus Aptitude Link */}
            <Link
              href="/aptitude-practice"
              className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Campus Placements</span>
            </Link>

            {/* Pricing */}
            <Link
              href="/settings"
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              <span>Pricing</span>
            </Link>
          </nav>

          {/* Right Actions: Theme Toggle & Get Started */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all shadow-sm shadow-indigo-500/20 flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => router.push("/signup")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all shadow-sm shadow-indigo-500/20 flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= 2. HERO SECTION ================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Hero Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Vibrant Learner Count Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/50 dark:via-purple-950/40 dark:to-pink-950/30 text-xs font-semibold text-indigo-900 dark:text-indigo-200 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>1,80,000+ candidates enrolled</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  98.4% Pass Rate
                </span>
              </div>

              {/* Big Bold Headline with vibrant gradient highlight */}
              <h1 className="text-3xl sm:text-5xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                One Stop <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-300 bg-clip-text text-transparent">
                    Learning Platform
                  </span>
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3 text-indigo-500/80"
                    viewBox="0 0 250 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9C50 3 150 2 248 8"
                      stroke="url(#hero-gradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="hero-gradient" x1="2" y1="9" x2="248" y2="8" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4f46e5" />
                        <stop offset="0.5" stopColor="#9333ea" />
                        <stop offset="1" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                <br />
                for Competitive Exams & Placements
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Prepare for <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Digital SAT, JEE, GRE, GMAT</strong>, and <strong className="text-purple-600 dark:text-purple-400 font-semibold">Campus Placements</strong> with structured topic roadmaps, 30-second speed tricks, and cognitive recall calibrated for top scores.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => router.push(isAuthenticated ? "/dashboard" : "/signup")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-50 dark:bg-[#161820] dark:hover:bg-[#1d202a] text-xs font-semibold text-slate-900 dark:text-white transition-all shadow-subtle text-center"
                >
                  Start Learning for free
                </button>

                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold transition-all shadow-sm shadow-indigo-500/25 flex items-center justify-center gap-1.5"
                >
                  <span>Explore Roadmaps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Widget with Colorful Badges */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-[#12141c]/90 backdrop-blur-md p-6 shadow-card space-y-4 relative">
                {/* Decorative corner tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 px-2.5 py-0.5 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Curated Sets</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Targeted Question Banks & Drills
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Problem sets tailored for competitive admissions and campus hiring tests.
                  </p>
                </div>

                {/* Inner Card Container */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161822] p-4 space-y-3.5 shadow-subtle">
                  {/* Category Pills (Undergrad / Graduate / Campus Placements) */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#101218] rounded-lg text-xs border border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setExamCategory("undergrad")}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          examCategory === "undergrad"
                            ? "bg-indigo-600 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Undergrad (SAT/JEE)
                      </button>
                      <button
                        onClick={() => setExamCategory("grad")}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          examCategory === "grad"
                            ? "bg-sky-600 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Graduate (GRE/GMAT)
                      </button>
                      <button
                        onClick={() => setExamCategory("placement")}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          examCategory === "placement"
                            ? "bg-purple-600 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Placements (TCS/Infy)
                      </button>
                    </div>

                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101218] text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                    >
                      <option value="30 days">30 days roadmap</option>
                      <option value="60 days">60 days roadmap</option>
                      <option value="90 days">90 days roadmap</option>
                    </select>
                  </div>

                  {/* Search bar inside widget */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search topics (e.g. Quadratics, Trains, Error Spotting)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101218] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Colourful Topic Badges with question counts */}
                  <div className="flex flex-wrap gap-2 pt-1 max-h-52 overflow-y-auto">
                    {filteredTopics.map((topic, i) => (
                      <Link
                        key={i}
                        href={topic.link}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          colorStyles[topic.color] || colorStyles.indigo
                        }`}
                      >
                        <span>{topic.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/70 dark:bg-black/40 font-mono font-bold tabular-nums">
                          {topic.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. VIBRANT PLATFORM HIGHLIGHT STATS BAND ================= */}
      <section className="py-8 bg-white dark:bg-[#0f1118] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/25">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                  180,000+
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Enrolled Candidates
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                  +185 pts
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Average Score Uplift
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/25">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                  495+
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Curated Topic Blueprints
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
              <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/25">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                  25+ Drives
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Campus Placement Formats
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. CURATED TOPIC SHEETS ================= */}
      <section id="sheets" className="py-16 md:py-20 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Topic Sheets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Don&apos;t practice blindly. Master exact patterns.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Each sheet breaks down the entire syllabus into bite-sized, high-yield topics organized from fundamentals to hard difficulty.
            </p>
          </div>

          {/* Exam Tabs with Distinct Brand Colors */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {[
              { id: "sat" as const, label: "Digital SAT (A2Z)", colorClass: "hover:border-indigo-400", activeClass: "bg-indigo-600 text-white shadow-sm" },
              { id: "jee" as const, label: "JEE Main & Advanced", colorClass: "hover:border-amber-400", activeClass: "bg-amber-600 text-white shadow-sm" },
              { id: "gre" as const, label: "GRE General", colorClass: "hover:border-sky-400", activeClass: "bg-sky-600 text-white shadow-sm" },
              { id: "neet" as const, label: "NEET Medical", colorClass: "hover:border-emerald-400", activeClass: "bg-emerald-600 text-white shadow-sm" },
              { id: "aptitude" as const, label: "Campus Aptitude", colorClass: "hover:border-purple-400", activeClass: "bg-purple-600 text-white shadow-sm" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSheetTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  activeSheetTab === tab.id
                    ? tab.activeClass
                    : `bg-white dark:bg-[#161820] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 ${tab.colorClass}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Sheet Card Display with Header Gradient */}
          <div className="bg-white dark:bg-[#161820] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden space-y-6">
            <div className={`p-6 md:p-8 bg-gradient-to-r ${activeSheet.headerGradient} border-b border-slate-100 dark:border-slate-800/80`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${activeSheet.badgeColor}`}>
                    Official Blueprint
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    {activeSheet.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                    {activeSheet.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {activeSheet.topics} Topics
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">~{activeSheet.hours} hours estimated</div>
                  </div>

                  <Link
                    href={activeSheetTab === "aptitude" ? "/aptitude-practice" : "/dashboard"}
                    className={`px-5 py-2.5 rounded-xl ${activeSheet.buttonColor} text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm`}
                  >
                    <span>Start Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Modules List inside Sheet */}
            <div className="p-6 md:p-8 pt-0 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Included High-Yield Modules
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeSheet.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-[#12141c]/60 flex items-center justify-between text-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-white dark:bg-[#1a1d26] border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {mod.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 font-medium">{mod.count} patterns</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusBadgeStyles[mod.statusColor]}`}>
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

      {/* ================= 5. THE PLATFORM PILLARS (COLOURFUL CARDS) ================= */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0c0d12] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Comprehensive Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineered for Deep Academic Mastery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Five unified subsystems replacing disconnected test banks, paper notes, and disjointed videos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Pillar 1: IRT Testing (Indigo/Violet) */}
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-card hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
                  <Target className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                  Psychometric IRT
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Adaptive Diagnostic Test Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Calculates question difficulty parameter (\(b\)) and latent cognitive ability (\(\theta\)) in real-time, matching authentic multi-stage exams like Digital SAT & GRE.
                </p>
              </div>
              <Link
                href="/exam-prep/adaptive"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
              >
                <span>Launch Diagnostic Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Campus Placements (Purple/Fuchsia) */}
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-card hover:border-purple-400 dark:hover:border-purple-600 transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-500/25">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
                  College Placements
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Campus Aptitude Hub (Math & English)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Calibrated for TCS NQT, Infosys, Accenture, Cognizant, and Wipro recruitment drives with 30-second speed shortcuts, LCM methods, and error spotting.
                </p>
              </div>
              <Link
                href="/aptitude-practice"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
              >
                <span>Practice Campus Aptitude</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: Dynamic Study Scheduler (Emerald/Teal) */}
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-card hover:border-emerald-400 dark:hover:border-emerald-600 transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                  Adaptive Schedule
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Dynamic Study Planner & Cadence
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Set target exam dates and score intervals. Automatically generates time-blocked study sessions, syncs iCal calendars, and auto-recalibrates if a day is missed.
                </p>
              </div>
              <Link
                href="/study-planner"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
              >
                <span>View Study Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4: Spaced Repetition SM-2 (Amber/Orange) */}
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-card hover:border-amber-400 dark:hover:border-amber-600 transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                  Memory Retention
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  SuperMemo SM-2 Active Recall
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Intelligent spaced repetition decks for high-frequency vocabulary, formulas, and grammar rules. Mathematically eliminates the Ebbinghaus forgetting curve.
                </p>
              </div>
              <Link
                href="/flashcards"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
              >
                <span>Practice Flashcard Decks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 5: Interactive STEM Sandbox (Sky/Blue) */}
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-card hover:border-sky-400 dark:hover:border-sky-600 transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
                  <Boxes className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400">
                  Interactive Physics
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Interactive STEM Sandbox Labs
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Manipulate pendulums, projectile trajectories, kinematics, and geometric coordinate transformations in live real-time simulation canvases.
                </p>
              </div>
              <Link
                href="/interactive-learning"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
              >
                <span>Launch Interactive Labs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 6: Official Full Simulations (Rose/Red) */}
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-card hover:border-rose-400 dark:hover:border-rose-600 transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
                  Exam Simulation
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Official Timed Full Mock Tests
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Standard test timers, Desmos calculator integration, sectional breaks, and official scoring conversions for 98-question SAT, 55-question GRE, and 64-question GMAT.
                </p>
              </div>
              <Link
                href="/exam-prep"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
              >
                <span>Take Full Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. COMPARISON MATRIX ================= */}
      <section className="py-16 md:py-20 bg-slate-50/60 dark:bg-[#0f1118]/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Serious Students Switch to {BRAND_CONFIG.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Comparing modern structured preparation with legacy alternatives.
            </p>
          </div>

          <div className="bg-white dark:bg-[#161820] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#12141c]">
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                    <th className="p-4 font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 border-x border-indigo-200/60 dark:border-indigo-800/60">
                      {BRAND_CONFIG.shortName} Platform
                    </th>
                    <th className="p-4 font-semibold text-slate-500">Coaching Centers</th>
                    <th className="p-4 font-semibold text-slate-500">Scattered Online Tabs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Curated Topic Sheets</td>
                    <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-indigo-50/40 dark:bg-indigo-950/20 border-x border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Exhaustive (495 topics)
                    </td>
                    <td className="p-4 text-slate-500">Rigid paper printouts</td>
                    <td className="p-4 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Incomplete & scattered</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Adaptive IRT Engine</td>
                    <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-indigo-50/40 dark:bg-indigo-950/20 border-x border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Real-time psychometric \(\theta\)
                    </td>
                    <td className="p-4 text-slate-500">Fixed paper tests</td>
                    <td className="p-4 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> None</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Campus Placement Aptitude</td>
                    <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-indigo-50/40 dark:bg-indigo-950/20 border-x border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> 30-sec shortcuts for TCS/Infy
                    </td>
                    <td className="p-4 text-slate-500">Outdated generic math</td>
                    <td className="p-4 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Unorganized video lectures</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Spaced Repetition (SM-2)</td>
                    <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-indigo-50/40 dark:bg-indigo-950/20 border-x border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Algorithmic active recall
                    </td>
                    <td className="p-4 text-slate-500">Rote memorization</td>
                    <td className="p-4 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Passive re-reading</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Dynamic Study Planner</td>
                    <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-indigo-50/40 dark:bg-indigo-950/20 border-x border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500" /> Day-by-day auto-adjusting
                    </td>
                    <td className="p-4 text-slate-500">Inflexible batch timing</td>
                    <td className="p-4 text-slate-400 flex items-center gap-1"><X className="w-3.5 h-3.5 text-rose-400" /> Constant procrastination</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. COMMUNITY SUPPORT & DONATION ================= */}
      <section className="py-10 md:py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/80 dark:from-[#131522] dark:via-[#11131c] dark:to-[#161424] border border-indigo-200/70 dark:border-indigo-900/40 p-6 sm:p-8 md:p-10 text-center relative overflow-hidden shadow-card">
          <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
            {/* Heading requested by the user */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Help Us Keep Acuity Free
            </h2>

            {/* Description requested by the user */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Join thousands of students who use our platform every day. Your donation allows us to continue providing unbiased, data-driven exam prep without paywalls.
            </p>

            {/* Donate Now Button linking to Buy Me a Coffee with Bootstrap Dollar Icon */}
            <div className="pt-2">
              <a
                href="https://buymeacoffee.com/chris27"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Official Bootstrap Currency Dollar Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-currency-dollar shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.253-.33-1.62-.777-1.62-1.603 0-.933.727-1.64 1.848-1.777v3.38zm1.043 1.956v3.428c1.378-.152 1.97-.837 1.97-1.748 0-.968-.617-1.523-1.97-1.68z" />
                </svg>
                <span>Donate Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. CLEAN FOOTER ================= */}
      <footer className="py-12 bg-white dark:bg-[#0c0d12] text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                A
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {BRAND_CONFIG.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The modern ecosystem for standardized exam and campus placement preparation. Structured curated sheets, psychometric adaptive testing, and spaced repetition.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Curated Sheets
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/exam-prep" className="hover:text-indigo-600 dark:hover:text-white">SAT 1600 Patterns</Link></li>
              <li><Link href="/exam-prep" className="hover:text-indigo-600 dark:hover:text-white">Digital SAT A2Z Sheet</Link></li>
              <li><Link href="/aptitude-practice" className="hover:text-purple-600 dark:hover:text-white">Campus Aptitude (TCS/Infy)</Link></li>
              <li><Link href="/exam-prep" className="hover:text-sky-600 dark:hover:text-white">GRE Quant Blueprint</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Platform Tracks
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-white">Dashboard</Link></li>
              <li><Link href="/aptitude-practice/math" className="hover:text-indigo-600 dark:hover:text-white">Placement Math</Link></li>
              <li><Link href="/aptitude-practice/english" className="hover:text-emerald-600 dark:hover:text-white">Placement English</Link></li>
              <li><Link href="/study-planner" className="hover:text-indigo-600 dark:hover:text-white">Study Planner</Link></li>
              <li><Link href="/flashcards" className="hover:text-amber-600 dark:hover:text-white">SM-2 Flashcards</Link></li>
              <li><Link href="/interactive-learning" className="hover:text-sky-600 dark:hover:text-white">STEM Labs</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Security & Legal
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-slate-400">COPPA & FERPA Compliant</span></li>
              <li><span className="text-slate-400">Privacy Policy</span></li>
              <li><span className="text-slate-400">Terms of Service</span></li>
              <li><span className="text-slate-400">Security Standards</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
} from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useApp } from "@/context/AppContext";

export function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  // Hero interactive widget state
  const [examCategory, setExamCategory] = useState<"undergrad" | "grad">("undergrad");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("30 days");
  const [activeSheetTab, setActiveSheetTab] = useState<"sat" | "jee" | "gre" | "neet">("sat");
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);

  // Topics for the right-hand hero widget (Tailored to competitive exams)
  const undergradTopics = [
    { name: "Digital SAT Math", count: 340, link: "/exam-prep/adaptive?topic=math" },
    { name: "Reading & Writing", count: 290, link: "/exam-prep/adaptive?topic=verbal" },
    { name: "JEE Mechanics", count: 310, link: "/exam-prep/adaptive?topic=physics" },
    { name: "Calculus & Limits", count: 265, link: "/exam-prep/adaptive?topic=math" },
    { name: "Organic Chemistry", count: 220, link: "/exam-prep/adaptive?topic=chem" },
    { name: "NEET Physiology", count: 380, link: "/exam-prep/adaptive?topic=bio" },
    { name: "Genetics & DNA", count: 240, link: "/exam-prep/adaptive?topic=bio" },
    { name: "Coordinate Geometry", count: 180, link: "/exam-prep/adaptive?topic=math" },
    { name: "Thermodynamics", count: 215, link: "/exam-prep/adaptive?topic=physics" },
    { name: "Electromagnetism", count: 250, link: "/exam-prep/adaptive?topic=physics" },
  ];

  const gradTopics = [
    { name: "GRE Quantitative", count: 280, link: "/exam-prep/adaptive?topic=quant" },
    { name: "Verbal Reasoning", count: 265, link: "/exam-prep/adaptive?topic=verbal" },
    { name: "GMAT Data Insights", count: 190, link: "/exam-prep/adaptive?topic=data" },
    { name: "Text Completion", count: 210, link: "/exam-prep/adaptive?topic=vocab" },
    { name: "Critical Reasoning", count: 230, link: "/exam-prep/adaptive?topic=verbal" },
    { name: "Sentence Equivalence", count: 195, link: "/exam-prep/adaptive?topic=vocab" },
    { name: "Problem Solving", count: 240, link: "/exam-prep/adaptive?topic=quant" },
    { name: "Analytical Writing", count: 120, link: "/exam-prep/adaptive?topic=awa" },
  ];

  const currentTopicList = examCategory === "undergrad" ? undergradTopics : gradTopics;
  const filteredTopics = currentTopicList.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Curated Sheets Data
  const sheetData = {
    sat: {
      title: "Complete Digital SAT Prep Sheet",
      tagline: "495 high-yield patterns covering Hard Math, Desmos heuristics, and Reading craft analysis.",
      topics: 495,
      hours: 132,
      modules: [
        { name: "Algebra: Linear Equations & Systems", count: 48, status: "High Yield" },
        { name: "Advanced Math: Quadratics & Polynomial Factors", count: 76, status: "Essential" },
        { name: "Data Analysis: Scatterplots, Probabilities & Rates", count: 52, status: "High Yield" },
        { name: "Geometry & Trig: Circle Theorems & SOH-CAH-TOA", count: 38, status: "Mastery" },
        { name: "Reading & Writing: Craft & Structure (Vocabulary in Context)", count: 94, status: "High Yield" },
        { name: "Information & Ideas: Central Idea & Evidence Inferences", count: 86, status: "Essential" },
        { name: "Expression of Ideas: Rhetorical Synthesis & Transitions", count: 101, status: "High Yield" },
      ],
    },
    jee: {
      title: "JEE Main & Advanced Mastery Blueprint",
      tagline: "Rigorous problem sets spanning Mechanics, Calculus, Electromagnetism, and Physical Chemistry.",
      topics: 380,
      hours: 185,
      modules: [
        { name: "Mechanics: Newton's Laws, Rotational Motion & Inertia", count: 65, status: "Crucial" },
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
      modules: [
        { name: "Human Physiology: Circulation, Respiration & Neural Control", count: 90, status: "Highest Yield" },
        { name: "Genetics & Molecular Basis of Inheritance", count: 84, status: "Crucial" },
        { name: "Cell Biology & Biomolecules: Enzymes & Nucleic Acids", count: 62, status: "Essential" },
        { name: "Physical Chemistry: Chemical Equilibrium & Kinetics", count: 104, status: "High Yield" },
      ],
    },
  };

  const activeSheet = sheetData[activeSheetTab];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-950 dark:selection:text-indigo-200">
      {/* ================= 1. CLEAN TOP NAVBAR (Matches Screenshot) ================= */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
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
                Learning Systems
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Matching Screenshot: Dashboard, Explore v, Pricing) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {/* Dashboard Link (Opens current website page with vertical navbar) */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExploreMenuOpen(!exploreMenuOpen)}
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Explore</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {exploreMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#161820] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Curriculum
                  </div>
                  <Link
                    href="/exam-prep"
                    onClick={() => setExploreMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    Digital SAT & ACT
                  </Link>
                  <Link
                    href="/exam-prep/adaptive"
                    onClick={() => setExploreMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    Adaptive Practice Engine
                  </Link>
                  <Link
                    href="/flashcards"
                    onClick={() => setExploreMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    SM-2 Spaced Recall
                  </Link>
                  <Link
                    href="/interactive-learning"
                    onClick={() => setExploreMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f2330]"
                  >
                    STEM Sandbox Labs
                  </Link>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              href="/settings"
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pricing</span>
            </Link>
          </nav>

          {/* Right Actions: Theme Toggle & Get Started */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => router.push("/signup")}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= 2. HERO SECTION (Matching Attached Screenshot) ================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Hero Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Learner Count Pill (Matches screenshot pill) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141620] text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>1,80,000+ candidates enrolled</span>
              </div>

              {/* Big Bold Headline with curved underline on Platform (Matches screenshot layout) */}
              <h1 className="text-3xl sm:text-5xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                One Stop <br />
                <span className="relative inline-block">
                  Learning Platform
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3 text-indigo-500/80"
                    viewBox="0 0 250 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9C50 3 150 2 248 8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                <br />
                for Competitive Exams
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Prepare for Digital SAT, JEE, GRE, GMAT, and NEET with structured topic roadmaps,
                adaptive diagnostic practice, and cognitive recall built for results.
              </p>

              {/* Dual Action Buttons (Matches screenshot: Start Learning for free / Explore plus ->) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => router.push(isAuthenticated ? "/dashboard" : "/signup")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-50 dark:bg-[#161820] dark:hover:bg-[#1d202a] text-xs font-semibold text-slate-900 dark:text-white transition-all shadow-subtle text-center"
                >
                  Start Learning for free
                </button>

                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Explore Roadmaps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Widget (Tailored to Our Website, mirroring the screenshot's interactive right card) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#12141c] p-6 shadow-card space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Exam-Specific Question Banks
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Problem sets tailored for your target score and examination
                  </p>
                </div>

                {/* Inner Card Container (Matches screenshot inner card) */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161822] p-4 space-y-3.5 shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Curated Categories</span>
                  </div>

                  {/* Tabs: Undergraduate / Graduate / Timeframe */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#101218] rounded-lg text-xs">
                      <button
                        onClick={() => setExamCategory("undergrad")}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          examCategory === "undergrad"
                            ? "bg-white dark:bg-[#1e2230] text-slate-900 dark:text-white shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Undergraduate
                      </button>
                      <button
                        onClick={() => setExamCategory("grad")}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          examCategory === "grad"
                            ? "bg-white dark:bg-[#1e2230] text-slate-900 dark:text-white shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        Graduate
                      </button>
                    </div>

                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101218] text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                    >
                      <option value="30 days">30 days prep</option>
                      <option value="60 days">60 days prep</option>
                      <option value="90 days">90 days prep</option>
                    </select>
                  </div>

                  {/* Search bar inside widget */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search subjects, topics, or formulas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101218] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Topic Badges with question counts (Mirroring the Flipkart, Swiggy badges from the screenshot) */}
                  <div className="flex flex-wrap gap-2 pt-1 max-h-48 overflow-y-auto">
                    {filteredTopics.map((topic, i) => (
                      <Link
                        key={i}
                        href={topic.link}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#12141c] hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-xs font-medium text-slate-800 dark:text-slate-200 group"
                      >
                        <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {topic.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-semibold tabular-nums">
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

      {/* ================= 3. CURATED TOPIC SHEETS ================= */}
      <section id="sheets" className="py-16 md:py-20 bg-slate-50/50 dark:bg-[#0f1118]/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
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
              { id: "sat" as const, label: "Digital SAT (A2Z)" },
              { id: "jee" as const, label: "JEE Main & Advanced" },
              { id: "gre" as const, label: "GRE General" },
              { id: "neet" as const, label: "NEET Medical" },
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

      {/* ================= 4. THE 4 PLATFORM PILLARS ================= */}
      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
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
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Dynamic Study Scheduler */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161820] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Dynamic Study Planner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Set your exam date and target score. The planner generates customized day-by-day practice blocks and automatically recalibrates if you miss a day.
              </p>
              <Link
                href="/study-planner"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
              >
                <span>View planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                <ArrowRight className="w-3.5 h-3.5" />
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
                <ArrowRight className="w-3.5 h-3.5" />
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
                    <th className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20">
                      {BRAND_CONFIG.shortName} Platform
                    </th>
                    <th className="p-3.5 font-semibold text-slate-500">Coaching Centers</th>
                    <th className="p-3.5 font-semibold text-slate-500">Random Tabs / Videos</th>
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
                      <Check className="w-4 h-4 text-emerald-500" /> Authentic adaptive scale
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
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">Dynamic Study Scheduler</td>
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
            Join candidates who simplified their entire competitive exam roadmap into one clean, distraction-free workspace.
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

      {/* ================= 7. CLEAN FOOTER ================= */}
      <footer className="py-12 bg-white dark:bg-[#0c0d12] text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
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

          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Platform
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-white">Dashboard</Link></li>
              <li><Link href="/study-planner" className="hover:text-indigo-600 dark:hover:text-white">Study Planner</Link></li>
              <li><Link href="/flashcards" className="hover:text-indigo-600 dark:hover:text-white">SM-2 Flashcards</Link></li>
              <li><Link href="/interactive-learning" className="hover:text-indigo-600 dark:hover:text-white">STEM Labs</Link></li>
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

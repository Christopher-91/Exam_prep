"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Clock,
  Play,
  CheckCircle2,
  Calendar,
  Layers,
  Settings2,
  HelpCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";

export default function ExamPrepPage() {
  const { profile, setProfile, selectedExam, setSelectedExam, mockTests, testResults } = useApp();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Onboarding/Config Form State
  const [targetScore, setTargetScore] = useState(profile.targetScore);
  const [targetDate, setTargetDate] = useState(profile.targetDate);
  const [prepLevel, setPrepLevel] = useState(profile.currentPrepLevel);
  const [dailyHours, setDailyHours] = useState(profile.dailyStudyTargetHours);

  const activeExam = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam);

  // Filter tests by selected exam and type
  const examTests = mockTests.filter((t) => t.examId === selectedExam);
  const filteredTests = selectedFilter === "all" ? examTests : examTests.filter((t) => t.type === selectedFilter);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      targetScore: Number(targetScore),
      targetDate,
      currentPrepLevel: prepLevel,
      dailyStudyTargetHours: Number(dailyHours),
    }));
    setShowConfigModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> {activeExam?.name} Preparation Hub
              </span>
              <span className="text-xs text-slate-400">• Provider: {activeExam?.provider}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">AI-Powered Examination Center</h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Prepare with precision using adaptive question models, full-length timed simulations, section drills, and
              instant psychometric results calibrated to official College Board, ETS, GMAC, and NTA curves.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowConfigModal(true)}
              className="gap-2 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <Settings2 className="w-4 h-4" /> Configure Goal
            </Button>
            <Link href="/exam-prep/adaptive">
              <Button variant="primary" size="md" className="gap-2 bg-indigo-500 hover:bg-indigo-600 shadow-md">
                <Sparkles className="w-4 h-4" /> Adaptive AI Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Current Exam Blueprint Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Target Score</span>
            <span className="font-bold text-white text-sm">
              {profile.targetScore} / {activeExam?.maxScore}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Target Date</span>
            <span className="font-bold text-white text-sm">
              {new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Prep Level</span>
            <span className="font-bold text-indigo-300 text-sm capitalize">{profile.currentPrepLevel}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Daily Study Hours</span>
            <span className="font-bold text-white text-sm">{profile.dailyStudyTargetHours} hrs / day</span>
          </div>
        </div>
      </div>

      {/* Examination Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {BRAND_CONFIG.supportedExams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setSelectedExam(exam.id as SupportedExamId)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
              selectedExam === exam.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{exam.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded ${
                selectedExam === exam.id ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 text-slate-500"
              }`}
            >
              Max {exam.maxScore}
            </span>
          </button>
        ))}
      </div>

      {/* Filter Tabs for Test Types */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          {[
            { id: "all", label: "All Formats" },
            { id: "full_length", label: "Full-Length Mocks" },
            { id: "section_wise", label: "Sectional Practice" },
            { id: "topic_specific", label: "Topic Drills" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedFilter === tab.id
                  ? "bg-slate-900 text-white font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link href="/exam-prep/adaptive" className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline">
          <Sparkles className="w-3.5 h-3.5" /> Launch AI Adaptive Engine →
        </Link>
      </div>

      {/* Mock Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.map((test) => (
          <Card key={test.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={test.type === "full_length" ? "primary" : "secondary"}>
                  {test.type.replace("_", " ").toUpperCase()}
                </Badge>
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {test.durationMinutes} mins
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{test.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {test.instructions?.[0] || "Standard timed assessment with official sectional scoring and explanation breakdown."}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {test.totalQuestions} Questions
                </span>
                <span>•</span>
                <span className="capitalize text-slate-500">Difficulty: {test.difficulty}</span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <Link href={`/exam-prep/mock-test/${test.id}`} className="w-full block">
                <Button variant="primary" size="sm" className="w-full justify-center gap-1.5">
                  <Play className="w-3.5 h-3.5" /> Start Practice Simulation
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        {/* Adaptive AI Practice Card */}
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="primary" className="bg-indigo-600 text-white">
                DYNAMIC ADAPTIVE
              </Badge>
              <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Real-time
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1">AI Adaptive Question Engine</h3>
            <p className="text-xs text-slate-600 mt-1">
              Continuously estimates your latent ability θ. When you answer correctly, difficulty scales up; when you
              stumble, diagnostic prompts pinpoint the exact conceptual bottleneck.
            </p>

            <div className="flex items-center gap-2 text-xs text-indigo-700 mt-4 pt-3 border-t border-indigo-100 font-medium">
              <span>✓ Item Response Theory (IRT)</span>
              <span>•</span>
              <span>Instant AI Explanations</span>
            </div>
          </div>

          <div className="pt-4 mt-2">
            <Link href="/exam-prep/adaptive" className="w-full block">
              <Button variant="primary" size="sm" className="w-full justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700">
                <Sparkles className="w-3.5 h-3.5" /> Launch Adaptive Engine
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Goal Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={`Configure ${activeExam?.name} Target Goal`}
        description="Personalize your target examination parameters to calibrate adaptive recommendations"
        maxWidth="md"
      >
        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Target Score / Percentile</label>
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              max={activeExam?.maxScore}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              required
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Max possible score: {activeExam?.maxScore}</span>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Examination Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Current Preparation Level</label>
            <select
              value={prepLevel}
              onChange={(e) => setPrepLevel(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              <option value="beginner">Beginner (Starting fresh with fundamentals)</option>
              <option value="intermediate">Intermediate (Familiar with content, refining speed)</option>
              <option value="advanced">Advanced (Aiming for 99th percentile)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Available Daily Study Hours</label>
            <input
              type="number"
              step="0.5"
              min="1"
              max="8"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowConfigModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Preparation Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


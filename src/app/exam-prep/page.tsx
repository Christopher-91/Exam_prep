"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  Play,
  CheckCircle2,
  Calendar,
  Settings2,
  FileText,
  Sliders,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";

export default function ExamPrepPage() {
  const { profile, setProfile, selectedExam, setSelectedExam, mockTests } = useApp();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const [targetScore, setTargetScore] = useState(profile.targetScore);
  const [targetDate, setTargetDate] = useState(profile.targetDate);
  const [prepLevel, setPrepLevel] = useState(profile.currentPrepLevel);
  const [dailyHours, setDailyHours] = useState(profile.dailyStudyTargetHours);

  const activeExam = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam);

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
      {/* Clean Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {activeExam?.name} Curriculum & Simulations
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">{activeExam?.provider}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Examination Preparation & Simulation Hub
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full-length diagnostic simulations, sectional tests, and item response adaptive drills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowConfigModal(true)}>
            <Settings2 className="w-3.5 h-3.5" /> Target Goals
          </Button>
          <Link href="/exam-prep/adaptive">
            <Button variant="primary" size="sm">
              Adaptive Practice Engine
            </Button>
          </Link>
        </div>
      </div>

      {/* Target Blueprint Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-lg border border-slate-200 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Score</span>
          <span className="font-bold text-slate-900 text-sm">
            {profile.targetScore} <span className="text-slate-400 text-xs">/ {activeExam?.maxScore}</span>
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Examination Date</span>
          <span className="font-bold text-slate-900 text-sm">
            {profile.targetDate
              ? new Date(profile.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "Not Set"}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Preparation Level</span>
          <span className="font-semibold text-slate-900 text-sm capitalize">{profile.currentPrepLevel}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Pacing Allocation</span>
          <span className="font-bold text-slate-900 text-sm">{profile.dailyStudyTargetHours} hrs / day</span>
        </div>
      </div>

      {/* Examination Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {BRAND_CONFIG.supportedExams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setSelectedExam(exam.id as SupportedExamId)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md border text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedExam === exam.id
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>{exam.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded ${
                selectedExam === exam.id ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"
              }`}
            >
              Max {exam.maxScore}
            </span>
          </button>
        ))}
      </div>

      {/* Format Filters */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto font-medium">
          {[
            { id: "all", label: "All Formats" },
            { id: "full_length", label: "Full Simulations" },
            { id: "section_wise", label: "Sectional Tests" },
            { id: "topic_specific", label: "Topic Drills" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded transition-colors ${
                selectedFilter === tab.id
                  ? "bg-slate-900 text-white font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Link href="/exam-prep/adaptive" className="text-xs font-semibold text-slate-900 hover:underline">
          Launch Adaptive Diagnostic Engine →
        </Link>
      </div>

      {/* Test List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.map((test) => (
          <Card key={test.id} hover={false} className="flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="neutral">
                  {(test.type || "full_length").replace("_", " ").toUpperCase()}
                </Badge>
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {test.durationMinutes} mins
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{test.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {test.instructions?.[0] || "Standard timed simulation with official sectional scoring."}
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
                  <Play className="w-3 h-3" /> Begin Test Simulation
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        {/* Adaptive Assessment Card */}
        <Card hover={false} className="border-slate-300 bg-slate-50/50 flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="primary">ADAPTIVE IRT</Badge>
              <span className="text-[11px] text-slate-600 font-medium">Psychometric</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1">Item Response Adaptive Practice</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Dynamically estimates latent ability ($\theta$). Scales question difficulty based on consecutive response
              accuracy and isolates conceptual bottlenecks.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-700 mt-4 pt-3 border-t border-slate-200 font-medium">
              <span>✓ Difficulty Equating</span>
              <span>•</span>
              <span>Diagnostic Hints</span>
            </div>
          </div>

          <div className="pt-4 mt-2">
            <Link href="/exam-prep/adaptive" className="w-full block">
              <Button variant="secondary" size="sm" className="w-full justify-center">
                Launch Adaptive Practice
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Goal Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={`Configure ${activeExam?.name} Target Parameters`}
        description="Update your examination goal to recalibrate predictive score intervals"
        maxWidth="md"
      >
        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Target Scaled Score</label>
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              max={activeExam?.maxScore}
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
              required
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Max possible score: {activeExam?.maxScore}</span>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Scheduled Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Preparation Level</label>
            <select
              value={prepLevel}
              onChange={(e) => setPrepLevel(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
            >
              <option value="beginner">Beginner (Reviewing core foundations)</option>
              <option value="intermediate">Intermediate (Refining timed accuracy)</option>
              <option value="advanced">Advanced (Targeting 99th percentile)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Daily Study Target (Hours)</label>
            <input
              type="number"
              step="0.5"
              min="1"
              max="8"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowConfigModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Parameters
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

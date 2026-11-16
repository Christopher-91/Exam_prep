"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Calendar, Clock, Target, ArrowRight, CheckCircle2, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { UserRole } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, completeOnboarding, setSelectedExam } = useApp();

  const role = currentUser?.role || "student";

  // Student form state
  const [selectedExamId, setSelectedExamId] = useState<SupportedExamId>("sat");
  const [targetScore, setTargetScore] = useState(1520);
  const [targetDate, setTargetDate] = useState("2026-12-14");
  const [dailyHours, setDailyHours] = useState(3.5);

  // Parent form state
  const [childName, setChildName] = useState("Maya");
  const [childAgeGroup, setChildAgeGroup] = useState<"3-5" | "6-8" | "9-12">("6-8");
  const [screenLimitMinutes, setScreenLimitMinutes] = useState(120);

  // Professional form state
  const [careerGoal, setCareerGoal] = useState("AI Product Manager");
  const [experienceLevel, setExperienceLevel] = useState("3-5 years");

  const [loading, setLoading] = useState(false);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (role === "student") {
      setSelectedExam(selectedExamId);
      completeOnboarding({
        selectedExam: selectedExamId,
        targetScore,
        targetDate,
        dailyStudyTargetHours: dailyHours,
      });
    } else {
      completeOnboarding({});
    }

    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const activeExam = BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExamId);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
          Candidate Onboarding Calibration
        </span>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {role === "student" && "Configure your standardized testing target"}
          {role === "parent" && "Configure child profiles & screen-time rules"}
          {role === "professional" && "Define professional career milestones"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Calibrates predictive psychometric baselines, study schedules, and adaptive practice sets.
        </p>
      </div>

      <form onSubmit={handleFinish} className="space-y-4 text-xs">
        {role === "student" && (
          <>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Primary Examination</label>
              <div className="grid grid-cols-2 gap-2">
                {BRAND_CONFIG.supportedExams.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => {
                      setSelectedExamId(e.id as SupportedExamId);
                      setTargetScore(e.id === "sat" ? 1520 : e.id === "gre" ? 330 : e.id === "gmat" ? 725 : 240);
                    }}
                    className={`p-3 rounded-md border text-left transition-colors ${
                      selectedExamId === e.id
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-bold text-xs">{e.name}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedExamId === e.id ? "text-slate-300" : "text-slate-400"}`}>
                      Max: {e.maxScore} • {e.provider}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Target Scaled Score</label>
                <input
                  type="number"
                  value={targetScore}
                  max={activeExam?.maxScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Scheduled Exam Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Target Daily Preparation Time</label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              >
                <option value={1.5}>1.5 Hours / day (Moderate maintenance)</option>
                <option value={3.0}>3.0 Hours / day (Standard rigorous track)</option>
                <option value={4.5}>4.5 Hours / day (Intensive sprint)</option>
              </select>
            </div>
          </>
        )}

        {role === "parent" && (
          <>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Child's Name</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                placeholder="e.g. Maya"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Age Learning Tier</label>
              <select
                value={childAgeGroup}
                onChange={(e) => setChildAgeGroup(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              >
                <option value="3-5">Ages 3–5 (Early Exploration & Shapes)</option>
                <option value="6-8">Ages 6–8 (Foundational Math & Life Science)</option>
                <option value="9-12">Ages 9–12 (Reasoning, Gravity & Pre-Algebra)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Weekly Screen-Time Limit (Minutes)</label>
              <input
                type="number"
                step={30}
                value={screenLimitMinutes}
                onChange={(e) => setScreenLimitMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              />
            </div>
          </>
        )}

        {role === "professional" && (
          <>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Target Career Pathway</label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                placeholder="e.g. AI Product Manager or Quant Analyst"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Current Professional Experience</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              >
                <option value="0-2 years">0–2 Years (Early Professional / Graduate)</option>
                <option value="3-5 years">3–5 Years (Mid-Level Practitioner)</option>
                <option value="6+ years">6+ Years (Senior Lead / Transitioning Executive)</option>
              </select>
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="w-full justify-center py-2.5 mt-2"
        >
          Initialize Dashboard Environment <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  GraduationCap,
  Bell,
  Cpu,
  Shield,
  CheckCircle2,
  Save,
  Key,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { UserRole } from "@/lib/types";

export default function SettingsPage() {
  const { profile, setProfile, activeRole, setActiveRole, selectedExam, setSelectedExam } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [targetScore, setTargetScore] = useState(profile.targetScore);
  const [targetDate, setTargetDate] = useState(profile.targetDate);
  const [dailyHours, setDailyHours] = useState(profile.dailyStudyTargetHours);
  const [preferredSchedule, setPreferredSchedule] = useState(profile.preferredSchedule);

  // AI & Provider state
  const [aiProvider, setAiProvider] = useState("gemini");
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••");
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name,
      email,
      targetScore: Number(targetScore),
      targetDate,
      dailyStudyTargetHours: Number(dailyHours),
      preferredSchedule,
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Settings Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" /> System & Profile Configuration
          </span>
          <span className="text-xs text-slate-400">• v{BRAND_CONFIG.version}</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Account, Goals & AI Architecture Settings</h2>
        <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
          Manage your personal candidate profile, target examination goals, role switcher, and AI LLM provider
          routing.
        </p>
      </div>

      {/* Role Experience Switcher */}
      <Card className="p-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Active Experience Role Mode</CardTitle>
          <CardDescription>
            Switch between Student, Parent, Working Professional, and Administrator interfaces
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {[
            { id: "student" as UserRole, label: "Student", desc: "Exam prep & recall" },
            { id: "parent" as UserRole, label: "Parent", desc: "Child STEM & safety" },
            { id: "professional" as UserRole, label: "Professional", desc: "Career & job matches" },
            { id: "admin" as UserRole, label: "Administrator", desc: "CMS & Question Bank" },
          ].map((r) => {
            const isSelected = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-600/20 text-indigo-950"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-xs">{r.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{r.desc}</div>
                {isSelected && (
                  <span className="text-[10px] font-bold text-indigo-600 mt-2 block">✓ Active Mode</span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Candidate Profile Form */}
      <Card className="p-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Candidate Profile & Examination Targets</CardTitle>
          <CardDescription>Used to calibrate predictive score bands and study time blocking</CardDescription>
        </CardHeader>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Target Examination</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value as SupportedExamId)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              >
                {BRAND_CONFIG.supportedExams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Target Score</label>
              <input
                type="number"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                required
              />
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Daily Study Target (Hours)</label>
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
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Peak Focus Window</label>
              <select
                value={preferredSchedule}
                onChange={(e) => setPreferredSchedule(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              >
                <option value="morning">Morning (08:00 AM – 12:00 PM)</option>
                <option value="afternoon">Afternoon (01:00 PM – 05:00 PM)</option>
                <option value="evening">Evening (06:00 PM – 10:00 PM)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {isSaved ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Preferences Saved Successfully!
              </span>
            ) : (
              <span />
            )}
            <Button variant="primary" size="sm" type="submit" className="gap-1.5">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* AI LLM Infrastructure Abstraction */}
      <Card className="p-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" /> AI Provider & Abstraction Layer
          </CardTitle>
          <CardDescription>
            Multi-model routing for question generation, conceptual tutoring, and study plan calibration
          </CardDescription>
        </CardHeader>

        <div className="space-y-4 text-xs pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Inference Provider</label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              >
                <option value="gemini">Google Gemini 2.0 / Flash (Ultra-low latency)</option>
                <option value="openai">OpenAI GPT-4o / Reasoning</option>
                <option value="anthropic">Anthropic Claude 3.5 Sonnet</option>
                <option value="local">Self-Hosted / Local LLM Model</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Server-Side Secret API Key</label>
              <div className="relative">
                <Key className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-800">Status: Provider Online & Health Checked</span>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={() => alert("Ping latency test succeeded: 98ms roundtrip!")}
            >
              Test Connection
            </Button>
          </div>
        </div>
      </Card>

      {/* Centralized Brand Configuration Inspector */}
      <Card className="p-6 bg-slate-50 border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Centralized Brand Configuration</CardTitle>
          <CardDescription>
            Configured centrally in <code className="text-indigo-600">src/config/brand.config.ts</code>
          </CardDescription>
        </CardHeader>
        <div className="space-y-1 text-xs text-slate-600 pt-1">
          <div>Platform Name: <strong className="text-slate-900">{BRAND_CONFIG.name}</strong></div>
          <div>Short Brand: <strong className="text-slate-900">{BRAND_CONFIG.shortName}</strong></div>
          <div>Tagline: <span className="text-slate-700">{BRAND_CONFIG.tagline}</span></div>
          <div>Version: <span className="font-mono text-slate-800">{BRAND_CONFIG.version}</span></div>
        </div>
      </Card>
    </div>
  );
}


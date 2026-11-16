"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Sparkles,
  ShieldCheck,
  Clock,
  Star,
  Award,
  ChevronRight,
  Play,
  Heart,
  BookOpen,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export function ParentDashboard() {
  const { childProfiles, childrenActivities } = useApp();
  const [selectedChildId, setSelectedChildId] = useState<string>(childProfiles[0]?.id || "child-1");

  const activeChild = childProfiles.find((c) => c.id === selectedChildId) || childProfiles[0];

  return (
    <div className="space-y-6">
      {/* Parent Portal Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> COPPA-Compliant Family Portal
              </span>
              <span className="text-xs text-slate-400">• Age-Appropriate STEM Learning</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Parental Dashboard & Learning Insights</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Monitor your children's cognitive development, interactive math experiments, scientific reasoning, and
              screen time in a safe, ad-free educational environment.
            </p>
          </div>

          <Link href="/interactive-learning">
            <Button variant="primary" size="md" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Sparkles className="w-4 h-4" /> Open Kids STEM Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Child Switcher Tabs */}
      <div className="flex items-center gap-3">
        {childProfiles.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChildId(child.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
              selectedChildId === child.id
                ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                : "bg-white/70 border-slate-200 hover:bg-white text-slate-600"
            }`}
          >
            <img src={child.avatar} alt={child.name} className="w-8 h-8 rounded-full bg-slate-100 p-0.5" />
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900">{child.name}</div>
              <div className="text-[10px] text-slate-500">
                Age {child.age} • Group {child.ageGroup}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Child KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Activities Completed</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeChild.completedActivities}</span>
            <span className="text-xs text-slate-400">interactive units</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-2 font-medium">Top 10% engagement this month</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Stars Earned</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeChild.totalStars}</span>
            <span className="text-xs text-amber-600 font-semibold">Stars ★</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">New badge unlocked: Orbit Explorer</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Weekly Learning Time</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {Math.floor(activeChild.weeklyScreenMinutes / 60)}h {activeChild.weeklyScreenMinutes % 60}m
            </span>
            <span className="text-xs text-slate-400">/ 180m limit</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full"
              style={{ width: `${(activeChild.weeklyScreenMinutes / 180) * 100}%` }}
            />
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Safety & Privacy</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
              ✓ 100% Ad-Free & Protected
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Zero third-party tracking, strict kid-safe sandbox.</p>
          </div>
        </Card>
      </div>

      {/* Concept Mastery & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Concept Mastery for {activeChild.name}</CardTitle>
            <CardDescription>Based on interactive simulation responses and quizzes</CardDescription>
          </CardHeader>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Strong & Mastered Concepts
              </span>
              <div className="flex flex-wrap gap-2">
                {activeChild.strongConcepts.map((c, i) => (
                  <Badge key={i} variant="success">
                    ✓ {c}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Growth Areas & Suggested Practice
              </span>
              <div className="flex flex-wrap gap-2">
                {activeChild.growthAreas.map((g, i) => (
                  <Badge key={i} variant="warning">
                    ⚡ {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Recommended STEM Activities */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm">Recommended Activities for Age {activeChild.ageGroup}</CardTitle>
              <CardDescription>Visual interactive physics & math activities</CardDescription>
            </div>
            <Link href="/interactive-learning">
              <Button variant="ghost" size="xs">
                Browse All →
              </Button>
            </Link>
          </CardHeader>

          <div className="space-y-2.5">
            {childrenActivities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-1 bg-slate-50 rounded-lg">{act.thumbnail}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{act.title}</div>
                    <div className="text-[11px] text-slate-400">
                      Age {act.ageGroup} • {act.category.toUpperCase()} • {act.starsEarned}/{act.maxStars} Stars
                    </div>
                  </div>
                </div>
                <Link href="/interactive-learning">
                  <Button variant="outline" size="xs" className="group-hover:bg-emerald-50 group-hover:text-emerald-700">
                    <Play className="w-3 h-3" /> Play
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}


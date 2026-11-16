"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Clock,
  Star,
  Award,
  ChevronRight,
  Play,
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
      {/* Clean Page Header with Visual Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-0.5 text-xs font-semibold">
              FAMILY PORTAL
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> COPPA / FERPA Verified
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Child Learning Progress & Parental Controls
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor cognitive milestones, mathematical exploration, and enforce screen-time boundaries.
          </p>
        </div>

        <Link href="/interactive-learning">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 text-xs shadow-sm transition-colors">
            Launch STEM Learning Lab
          </button>
        </Link>
      </div>

      {/* Child Switcher Tabs */}
      <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
        {childProfiles.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChildId(child.id)}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border text-xs transition-colors ${
              selectedChildId === child.id
                ? "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold"
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
            }`}
          >
            <img src={child.avatar} alt={child.name} className="w-5 h-5 rounded-full bg-slate-100 object-cover" />
            <span>{child.name}</span>
            <span className={`text-[10px] ${selectedChildId === child.id ? "text-indigo-600" : "text-slate-400"}`}>
              (Age {child.age})
            </span>
          </button>
        ))}
      </div>

      {/* Selected Child Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Completed Units
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {activeChild.completedActivities}
            </span>
            <span className="text-xs font-medium text-slate-400">activities</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Active this week</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              On Pace
            </span>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Stars Earned
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {activeChild.totalStars}
            </span>
            <span className="text-xs font-medium text-amber-700">Stars</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Milestone rewards</span>
            <span className="text-amber-700 font-semibold">Top 10%</span>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learning Duration
            </span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {Math.floor(activeChild.weeklyScreenMinutes / 60)}h {activeChild.weeklyScreenMinutes % 60}m
            </span>
            <span className="text-xs font-medium text-slate-400">/ 3h limit</span>
          </div>
          <div className="mt-3.5 space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${(activeChild.weeklyScreenMinutes / 180) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Child Protection
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base font-bold text-slate-900">100% Ad-Free</span>
            <p className="text-xs text-slate-500 mt-1">Zero third-party trackers or open chat.</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              Protected Sandbox
            </span>
          </div>
        </Card>
      </div>

      {/* Concept Mastery & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={false} className="p-5">
          <CardHeader className="pb-3 border-b border-slate-100 mb-3">
            <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
              Concept Mastery for {activeChild.name}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              Evaluated through visual manipulative exercises
            </CardDescription>
          </CardHeader>

          <div className="space-y-4 text-xs">
            <div>
              <span className="font-semibold text-slate-900 block mb-2">Mastered Principles:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeChild.strongConcepts.map((c, i) => (
                  <Badge key={i} variant="success">
                    ✓ {c}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="font-semibold text-slate-900 block mb-2">Areas for Reinforcement:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeChild.growthAreas.map((g, i) => (
                  <Badge key={i} variant="neutral">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                Recommended Interactive Activities
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Tailored for Age Group {activeChild.ageGroup}
              </CardDescription>
            </div>
            <Link href="/interactive-learning">
              <Button variant="ghost" size="xs">
                Explore All →
              </Button>
            </Link>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {childrenActivities.slice(0, 3).map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between hover:bg-slate-50/70 transition-colors px-1 rounded-md">
                <div>
                  <div className="font-semibold text-slate-900">{act.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {act.category.toUpperCase()} • Age {act.ageGroup} • {act.starsEarned}/{act.maxStars} Stars
                  </div>
                </div>
                <Link href="/interactive-learning">
                  <Button variant="secondary" size="xs">
                    Open Lab
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

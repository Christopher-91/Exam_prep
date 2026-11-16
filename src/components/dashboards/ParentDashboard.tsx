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
      {/* Clean Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Family & Young Learner Portal
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> COPPA / FERPA Compliant
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Child Learning Progress & Parental Controls
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor cognitive milestones, mathematical exploration, and enforce screen-time boundaries.
          </p>
        </div>

        <Link href="/interactive-learning">
          <Button variant="primary" size="sm">
            Launch STEM Learning Lab
          </Button>
        </Link>
      </div>

      {/* Child Switcher Tabs */}
      <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
        {childProfiles.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChildId(child.id)}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md border text-xs transition-colors ${
              selectedChildId === child.id
                ? "bg-slate-900 text-white border-slate-900 font-semibold"
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
            }`}
          >
            <img src={child.avatar} alt={child.name} className="w-5 h-5 rounded-full bg-slate-100" />
            <span>{child.name}</span>
            <span className={`text-[10px] ${selectedChildId === child.id ? "text-slate-300" : "text-slate-400"}`}>
              (Age {child.age})
            </span>
          </button>
        ))}
      </div>

      {/* Selected Child Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Completed Interactive Units</span>
            <Award className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{activeChild.completedActivities}</span>
            <span className="text-xs text-slate-400">activities</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Active this week</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Stars Earned</span>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{activeChild.totalStars}</span>
            <span className="text-xs text-amber-700 font-medium">Stars</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Consistent engagement</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Weekly Learning Duration</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">
              {Math.floor(activeChild.weeklyScreenMinutes / 60)}h {activeChild.weeklyScreenMinutes % 60}m
            </span>
            <span className="text-xs text-slate-400">/ 3h limit</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-slate-900 h-full rounded-full"
              style={{ width: `${(activeChild.weeklyScreenMinutes / 180) * 100}%` }}
            />
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Environment Safety</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm font-semibold text-emerald-800">100% Ad-Free & Protected</span>
            <p className="text-[11px] text-slate-400 mt-1">Zero third-party trackers or external chat.</p>
          </div>
        </Card>
      </div>

      {/* Concept Mastery & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={false}>
          <CardHeader className="pb-3">
            <CardTitle>Concept Mastery for {activeChild.name}</CardTitle>
            <CardDescription>Evaluated through visual manipulative exercises</CardDescription>
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

        <Card hover={false}>
          <CardHeader className="flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recommended Interactive Activities</CardTitle>
              <CardDescription>Tailored for Age Group {activeChild.ageGroup}</CardDescription>
            </div>
            <Link href="/interactive-learning">
              <Button variant="ghost" size="xs">
                Explore All →
              </Button>
            </Link>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {childrenActivities.slice(0, 3).map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{act.title}</div>
                  <div className="text-[11px] text-slate-400">
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

"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Compass,
  TrendingUp,
  Target,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Video,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export function ProfessionalDashboard() {
  const { careerProfiles, bookings, counsellors } = useApp();

  const topCareer = careerProfiles[0];
  const upcomingBooking = bookings.find((b) => b.status === "confirmed");

  return (
    <div className="space-y-6">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Career Acceleration Mode
              </span>
              <span className="text-xs text-slate-400">• AI Trait & Skill Matching</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Professional Growth & Career Navigator</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Identify strategic market opportunities, close mission-critical skill gaps, and book sessions with
              verified industry mentors and admissions experts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/career-counselling">
              <Button variant="primary" size="md" className="gap-2 bg-sky-600 hover:bg-sky-700 text-white">
                <Compass className="w-4 h-4" /> Career Explorer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Professional Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Top Career Match</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900">{topCareer?.title || "AI Product Manager"}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">{topCareer?.matchScore}% Match Score</div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Median: {topCareer?.medianSalary}</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Industry Growth</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">+32%</span>
            <span className="text-xs text-emerald-600 font-medium">Faster than avg</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">High demand in Tech & AI</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Counselling Session</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-bold text-slate-900">
              {upcomingBooking ? upcomingBooking.date : "None booked"}
            </span>
            <div className="text-[11px] text-indigo-600 font-medium mt-0.5">
              {upcomingBooking ? upcomingBooking.counsellorName : "Select an expert"}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {upcomingBooking ? "1:1 Strategy Meeting" : "Free 15-min discovery"}
          </p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Skill Alignment</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">82%</span>
            <span className="text-xs text-slate-400">Readiness</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: "82%" }} />
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Career Paths (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">AI-Recommended Career Paths</CardTitle>
                <CardDescription>
                  Synthesized from your cognitive aptitudes, quantitative skills, and work preferences
                </CardDescription>
              </div>
              <Link href="/career-counselling">
                <Button variant="ghost" size="xs">
                  Compare Paths →
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {careerProfiles.map((cp) => (
                <div
                  key={cp.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 bg-white space-y-2 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{cp.title}</span>
                        <Badge variant="primary">{cp.category}</Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{cp.overview}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{cp.matchScore}%</div>
                      <div className="text-[10px] text-slate-400">Match score</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-700">Salary: {cp.medianSalary}</span>
                    <span className="text-slate-500">Growth: {cp.demandGrowth}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Active Bookings & Skill Gap Closing */}
        <div className="space-y-6">
          {/* Active Booking */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Video className="w-4 h-4 text-sky-600" /> Upcoming Strategy Session
              </CardTitle>
              <CardDescription>Confirmed appointment</CardDescription>
            </CardHeader>

            {upcomingBooking ? (
              <div className="p-3 bg-sky-50/70 border border-sky-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-950">{upcomingBooking.counsellorName}</span>
                  <Badge variant="success">Confirmed</Badge>
                </div>
                <div className="text-xs text-sky-900">
                  📅 {upcomingBooking.date} • ⏰ {upcomingBooking.timeSlot}
                </div>
                <p className="text-[11px] text-sky-800 leading-snug">{upcomingBooking.preSessionNotes}</p>
                <a
                  href={upcomingBooking.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-medium mt-2"
                >
                  Join Meeting Room
                </a>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No active session scheduled. Book a 1:1 strategy session with an expert.
              </div>
            )}
          </Card>

          {/* Missing Skills to Bridge */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Targeted Skill Gaps
              </CardTitle>
              <CardDescription>Bridge these to maximize candidacy for Senior roles</CardDescription>
            </CardHeader>

            <div className="space-y-2.5">
              {topCareer?.missingSkillsForUser?.map((skill, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-semibold text-slate-800">{skill}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Recommended: DeepLearning.AI Certificate</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


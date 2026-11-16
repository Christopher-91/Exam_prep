"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Briefcase,
  TrendingUp,
  Target,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Video,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export function ProfessionalDashboard() {
  const { careerProfiles, bookings } = useApp();

  const topCareer = careerProfiles[0];
  const upcomingBooking = bookings.find((b) => b.status === "confirmed");

  return (
    <div className="space-y-6">
      {/* Clean Page Header with Visual Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-0.5 text-xs font-semibold">
              EXECUTIVE TRACK
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">GMAT / GRE Strategy</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Career Strategy & Skill Gap Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Benchmark credentials, identify market demand, and schedule 1:1 strategy meetings with admissions advisors.
          </p>
        </div>

        <Link href="/career-counselling">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 text-xs shadow-sm transition-colors">
            Explore Career Pathways
          </button>
        </Link>
      </div>

      {/* 4 Professional Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Primary Career Match
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-base font-bold text-slate-900 truncate">{topCareer?.title}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-0.5">{topCareer?.matchScore}% Aptitude Match</div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Median Comp</span>
            <span className="font-semibold text-slate-900">{topCareer?.medianSalary}</span>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Market Demand Trend
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {topCareer?.demandGrowth.split(" ")[0]}
            </span>
            <span className="text-xs text-slate-400">faster than avg</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Tech & Frontier AI</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              High Growth
            </span>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Admissions Advisory
            </span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold text-slate-900 block truncate">
              {upcomingBooking ? upcomingBooking.date : "None scheduled"}
            </span>
            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
              {upcomingBooking ? upcomingBooking.counsellorName : "Schedule 1:1 strategy session"}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Advisory Staff</span>
            <span className="text-indigo-600 font-semibold">Verified</span>
          </div>
        </Card>

        <Card hover={false} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Skill Readiness Index
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">82%</span>
            <span className="text-xs font-medium text-slate-400">qualified</span>
          </div>
          <div className="mt-3.5 space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: "82%" }} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: Recommended Careers & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Careers (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          <Card hover={false} className="p-5">
            <CardHeader className="flex-row items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                  Recommended Career Pathways
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Calibrated against your quantitative and cognitive assessments
                </CardDescription>
              </div>
              <Link href="/career-counselling">
                <Button variant="ghost" size="xs">
                  Compare Matrices →
                </Button>
              </Link>
            </CardHeader>

            <div className="divide-y divide-slate-100 text-xs">
              {careerProfiles.map((cp) => (
                <div key={cp.id} className="py-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{cp.title}</span>
                        <Badge variant="neutral">{cp.category}</Badge>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed">{cp.overview}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-slate-900 tabular-nums">{cp.matchScore}%</div>
                      <div className="text-[10px] text-slate-400">Alignment</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                    <span>Compensation: <strong className="text-slate-900 font-semibold">{cp.medianSalary}</strong></span>
                    <span>Growth: <strong className="text-emerald-700 font-semibold">{cp.demandGrowth}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Upcoming Session & Skill Gaps */}
        <div className="space-y-6">
          <Card hover={false} className="p-5">
            <CardHeader className="pb-3 border-b border-slate-100 mb-3">
              <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                Confirmed Strategy Consultation
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Upcoming 1:1 advisory appointment
              </CardDescription>
            </CardHeader>

            {upcomingBooking ? (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{upcomingBooking.counsellorName}</span>
                  <Badge variant="success">Confirmed</Badge>
                </div>
                <div className="text-slate-600 text-[11px]">
                  {upcomingBooking.date} • {upcomingBooking.timeSlot}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{upcomingBooking.preSessionNotes}</p>
                <a
                  href={upcomingBooking.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold mt-2 shadow-sm transition-colors"
                >
                  Enter Meeting Room
                </a>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No active session booked. Browse vetted graduate advisors.
              </div>
            )}
          </Card>

          <Card hover={false} className="p-5">
            <CardHeader className="pb-3 border-b border-slate-100 mb-3">
              <CardTitle className="text-sm font-bold text-slate-900 tracking-tight">
                Identified Skill Gaps
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Prerequisites to target for competitive candidacy
              </CardDescription>
            </CardHeader>

            <div className="space-y-2 text-xs">
              {topCareer?.missingSkillsForUser?.map((skill, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60">
                  <div className="font-semibold text-slate-900">{skill}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Recommended: Specialized Certification</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

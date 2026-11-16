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
      {/* Clean Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Professional Trajectory & Graduate Preparation
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-medium">GMAT / GRE Executive Track</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Career Strategy & Skill Gap Analysis
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Benchmark credentials, identify market demand, and schedule 1:1 strategy meetings with admissions advisors.
          </p>
        </div>

        <Link href="/career-counselling">
          <Button variant="primary" size="sm">
            Explore Career Pathways
          </Button>
        </Link>
      </div>

      {/* 4 Professional Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Primary Career Match</span>
            <Target className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className="text-base font-bold text-slate-900 truncate">{topCareer?.title}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-0.5">{topCareer?.matchScore}% Aptitude Match</div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Median: {topCareer?.medianSalary}</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Market Demand Trend</span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{topCareer?.demandGrowth.split(" ")[0]}</span>
            <span className="text-xs text-slate-500">much faster than avg</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">High demand across AI/Tech</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Admissions Consultation</span>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2">
            <span className="text-sm font-bold text-slate-900 block truncate">
              {upcomingBooking ? upcomingBooking.date : "None scheduled"}
            </span>
            <div className="text-[11px] text-slate-600 mt-0.5 truncate">
              {upcomingBooking ? upcomingBooking.counsellorName : "Schedule 1:1 strategy session"}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Verified Graduate Advisor</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Skill Readiness Index</span>
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">82%</span>
            <span className="text-xs text-slate-500">qualified</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: "82%" }} />
          </div>
        </Card>
      </div>

      {/* Main Grid: Recommended Careers & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Careers (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          <Card hover={false}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Recommended Career Pathways</CardTitle>
                <CardDescription>Calibrated against your quantitative and cognitive assessments</CardDescription>
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
                      <div className="text-base font-bold text-slate-900">{cp.matchScore}%</div>
                      <div className="text-[10px] text-slate-400">Match score</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                    <span>Compensation: <strong className="text-slate-800">{cp.medianSalary}</strong></span>
                    <span>Growth: {cp.demandGrowth}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Upcoming Session & Skill Gaps */}
        <div className="space-y-6">
          <Card hover={false}>
            <CardHeader className="pb-3">
              <CardTitle>Confirmed Strategy Consultation</CardTitle>
              <CardDescription>Upcoming 1:1 advisory appointment</CardDescription>
            </CardHeader>

            {upcomingBooking ? (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded space-y-2 text-xs">
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
                  className="block text-center w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium mt-2"
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

          <Card hover={false}>
            <CardHeader className="pb-3">
              <CardTitle>Identified Skill Gaps</CardTitle>
              <CardDescription>Prerequisites to target for competitive candidacy</CardDescription>
            </CardHeader>

            <div className="space-y-2 text-xs">
              {topCareer?.missingSkillsForUser?.map((skill, i) => (
                <div key={i} className="p-2.5 rounded border border-slate-200 bg-slate-50/60">
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

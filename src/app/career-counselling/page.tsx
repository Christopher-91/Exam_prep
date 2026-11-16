"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Briefcase,
  TrendingUp,
  Target,
  Calendar,
  Star,
  CheckCircle2,
  AlertCircle,
  Video,
  ArrowRight,
  BookOpen,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { CareerProfile, CareerCounsellor, CounsellingBooking } from "@/lib/types";

export default function CareerCounsellingPage() {
  const { careerProfiles, counsellors, bookings, addBooking } = useApp();

  const [activeTab, setActiveTab] = useState<"explorer" | "compare" | "assessment" | "counsellors">("explorer");

  // Comparison state
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([
    careerProfiles[0]?.id || "career-ai-pm",
    careerProfiles[1]?.id || "career-data-architect",
  ]);

  // Booking Modal state
  const [selectedCounsellor, setSelectedCounsellor] = useState<CareerCounsellor | null>(null);
  const [bookingDate, setBookingDate] = useState("2026-11-24");
  const [bookingTime, setBookingTime] = useState("04:00 PM - 04:45 PM EST");
  const [preSessionNotes, setPreSessionNotes] = useState("");

  // Assessment Quiz State
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, string>>({});
  const [assessmentFinished, setAssessmentFinished] = useState(false);

  const assessmentQuestions = [
    {
      q: "When tackling a complex challenge, which activity brings you the highest energy?",
      opts: [
        "Architecting algorithmic solutions & quantitative mathematical models",
        "Aligning teams, setting product roadmaps & translating user needs into specifications",
        "Synthesizing market arbitrage, balance sheets & financial investments",
        "Conducting scientific laboratory research & biological experiments",
      ],
    },
    {
      q: "Which work environment aligns best with your professional values?",
      opts: [
        "High-velocity technology startup developing frontier AI systems",
        "Quantitative hedge fund or financial institution with analytical rigor",
        "Global enterprise leading strategic cross-functional product initiatives",
        "Academic or research institute with pure discovery focus",
      ],
    },
    {
      q: "How would you rate your natural problem-solving preference?",
      opts: [
        "Heavily data-driven: I rely on statistical distributions and regression models",
        "Strategic: I balance user empathy, technical feasibility, and business unit economics",
        "Empirical: I design controlled experiments and analyze empirical variance",
      ],
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCounsellor) return;

    addBooking({
      counsellorId: selectedCounsellor.id,
      counsellorName: selectedCounsellor.name,
      date: bookingDate,
      timeSlot: bookingTime,
      status: "confirmed",
      preSessionNotes: preSessionNotes || "Discussing career roadmap and admissions strategy.",
      meetingLink: `https://meet.acuitylearning.org/room-${Date.now()}`,
    });

    setSelectedCounsellor(null);
    setPreSessionNotes("");
    alert("Counselling consultation confirmed. Meeting invitation details have been issued.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Career Advisory & Professional Trajectory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Industry salary benchmarks, skill gap diagnostics, and 1:1 strategy consultations with verified practitioners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("assessment")}
            className="gap-1.5"
          >
            <Target className="w-4 h-4 text-slate-600" /> Complete Aptitude Assessment
          </Button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab("explorer")}
          className={`px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeTab === "explorer"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Career Explorer
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeTab === "compare"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Pathways Comparison
        </button>
        <button
          onClick={() => setActiveTab("assessment")}
          className={`px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeTab === "assessment"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          RIASEC Assessment
        </button>
        <button
          onClick={() => setActiveTab("counsellors")}
          className={`px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeTab === "counsellors"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Verified Counsellors ({counsellors.length})
        </button>
      </div>

      {/* Tab 1: Career Explorer */}
      {activeTab === "explorer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerProfiles.map((cp) => (
              <Card key={cp.id} className="flex flex-col justify-between p-5 border-slate-200">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="neutral">{cp.category}</Badge>
                    <span className="text-xs font-bold text-emerald-700">{cp.matchScore}% Alignment</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2">{cp.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cp.overview}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Median Compensation:</span>
                      <span className="font-semibold text-slate-900">{cp.medianSalary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Industry Growth Rate:</span>
                      <span className="font-semibold text-emerald-700">{cp.demandGrowth}</span>
                    </div>
                  </div>

                  {/* Missing Skills Alert */}
                  {cp.missingSkillsForUser && cp.missingSkillsForUser.length > 0 && (
                    <div className="mt-3 p-3 rounded-md bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-semibold text-slate-900 block text-[11px] mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-500" /> Skill Gaps to Bridge:
                      </span>
                      <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-600">
                        {cp.missingSkillsForUser.map((sk, i) => (
                          <li key={i}>{sk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedForCompare([cp.id, careerProfiles.find((c) => c.id !== cp.id)?.id || ""]);
                      setActiveTab("compare");
                    }}
                    className="w-full justify-center"
                  >
                    Compare Career Path →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Side-by-Side Comparison */}
      {activeTab === "compare" && (
        <Card className="p-6 border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">Side-by-Side Career Evaluation Matrix</CardTitle>
            <CardDescription>
              Direct benchmark of responsibilities, educational pathways, and growth trajectories
            </CardDescription>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {selectedForCompare.map((id) => {
              const cp = careerProfiles.find((c) => c.id === id) || careerProfiles[0];
              return (
                <div key={cp.id} className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{cp.title}</h4>
                      <span className="text-[11px] text-slate-500">{cp.category}</span>
                    </div>
                    <Badge variant="success" className="text-xs">
                      {cp.matchScore}% Match
                    </Badge>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block mb-0.5">Median Compensation</span>
                    <p className="text-slate-900 font-semibold">{cp.medianSalary}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block mb-0.5">Industry Growth Projection</span>
                    <p className="text-emerald-700 font-semibold">{cp.demandGrowth}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">Educational Prerequisites</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {cp.requiredQualifications.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">Essential Competencies</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {cp.essentialSkills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">Typical Progression Milestones</span>
                    <div className="space-y-1 text-slate-600">
                      {cp.careerProgression.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-slate-900 font-bold">{i + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tab 3: Interactive Career Assessment */}
      {activeTab === "assessment" && (
        <Card className="p-6 max-w-2xl mx-auto border-slate-200">
          {!assessmentFinished ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Assessment Question {assessmentStep + 1} of {assessmentQuestions.length}
                </span>
                <span className="text-xs text-slate-400">RIASEC Aptitude Alignment</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 leading-relaxed">
                {assessmentQuestions[assessmentStep].q}
              </h3>

              <div className="space-y-2">
                {assessmentQuestions[assessmentStep].opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAssessmentAnswers((prev) => ({ ...prev, [assessmentStep]: opt }));
                      if (assessmentStep < assessmentQuestions.length - 1) {
                        setAssessmentStep((prev) => prev + 1);
                      } else {
                        setAssessmentFinished(true);
                      }
                    }}
                    className="w-full text-left p-3.5 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-xs font-normal text-slate-800 transition-colors flex items-center justify-between group"
                  >
                    <span className="leading-snug">{opt}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Career Trait Assessment Completed</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your primary RIASEC orientation is <strong>Investigative & Enterprising</strong>. You show strong natural affinity for Quantitative Modeling, Engineering Product Strategy, and Empirical Analytics.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setAssessmentFinished(false);
                  setAssessmentStep(0);
                  setActiveTab("explorer");
                }}
              >
                View Calibrated Career Matches
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* Tab 4: 1:1 Expert Counsellor Booking */}
      {activeTab === "counsellors" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {counsellors.map((c) => (
              <Card key={c.id} className="p-5 flex flex-col justify-between border-slate-200">
                <div>
                  <div className="flex items-start gap-4">
                    <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-lg object-cover border border-slate-200" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                      <p className="text-xs text-slate-500">{c.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="flex items-center text-amber-600 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                          {c.rating}
                        </span>
                        <span className="text-slate-400">({c.reviewCount} reviews)</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600">{c.experienceYears} yrs experience</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{c.bio}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                    {c.specialization.map((sp, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-900">{c.hourlyRate}</span>
                    <span className="block text-[10px] text-slate-500">{c.nextAvailableSlot}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedCounsellor(c)}
                    className="gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Schedule Consultation
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Active Bookings Summary */}
          {bookings.length > 0 && (
            <Card className="p-5 border-slate-200">
              <CardTitle className="text-sm mb-3">Your Scheduled Advisory Appointments</CardTitle>
              <div className="space-y-3 text-xs">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{b.counsellorName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        📅 {b.date} • ⏰ {b.timeSlot}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">{b.preSessionNotes}</div>
                    </div>
                    <a
                      href={b.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-medium text-xs flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Conference Room
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Booking Form Modal */}
      <Modal
        isOpen={Boolean(selectedCounsellor)}
        onClose={() => setSelectedCounsellor(null)}
        title={`Schedule Advisory Session with ${selectedCounsellor?.name}`}
        description="Select date, time slot, and provide background context"
        maxWidth="md"
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Preferred Consultation Date</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Time Slot</label>
            <select
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
            >
              <option value="02:00 PM - 02:45 PM EST">02:00 PM - 02:45 PM EST</option>
              <option value="04:00 PM - 04:45 PM EST">04:00 PM - 04:45 PM EST</option>
              <option value="06:30 PM - 07:15 PM EST">06:30 PM - 07:15 PM EST</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Pre-Session Goals / Focus Areas</label>
            <textarea
              rows={3}
              value={preSessionNotes}
              onChange={(e) => setPreSessionNotes(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-md text-xs"
              placeholder="What specific career transitions or graduate admissions questions would you like to discuss?"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setSelectedCounsellor(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Confirm Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Briefcase,
  TrendingUp,
  Target,
  Sparkles,
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
      meetingLink: `https://meet.apexlearn.ai/room-${Date.now()}`,
    });

    setSelectedCounsellor(null);
    setPreSessionNotes("");
    alert("Counselling session successfully confirmed! A calendar invite has been generated.");
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Career Discovery & Professional Trajectory
              </span>
              <span className="text-xs text-slate-400">• Intelligent Skill-Gap Analysis</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">AI Career Counselling & Exploration Hub</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Explore high-growth career pathways, compare salary trajectories side-by-side, analyze your missing skill
              gaps, and book 1:1 strategy meetings with verified admissions and tech leaders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setActiveTab("assessment")}
              className="gap-1.5 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <Sparkles className="w-4 h-4 text-sky-300" /> Take Career Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab("explorer")}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            activeTab === "explorer"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Career Explorer & Recommendations
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            activeTab === "compare"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Side-by-Side Comparison
        </button>
        <button
          onClick={() => setActiveTab("assessment")}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            activeTab === "assessment"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Career Aptitude Assessment
        </button>
        <button
          onClick={() => setActiveTab("counsellors")}
          className={`px-3.5 py-2 rounded-xl transition-colors ${
            activeTab === "counsellors"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Book 1:1 Expert Counsellor ({counsellors.length})
        </button>
      </div>

      {/* Tab 1: Career Explorer */}
      {activeTab === "explorer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerProfiles.map((cp) => (
              <Card key={cp.id} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary">{cp.category}</Badge>
                    <span className="text-sm font-extrabold text-emerald-600">{cp.matchScore}% Match</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">{cp.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cp.overview}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Median Salary:</span>
                      <span className="font-bold text-slate-900">{cp.medianSalary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Market Demand:</span>
                      <span className="font-semibold text-emerald-600">{cp.demandGrowth}</span>
                    </div>
                  </div>

                  {/* Missing Skills Alert */}
                  {cp.missingSkillsForUser && cp.missingSkillsForUser.length > 0 && (
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                      <span className="font-bold block text-[11px] mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-600" /> Skill Gaps to Bridge:
                      </span>
                      <ul className="list-disc list-inside text-[11px] space-y-0.5 text-amber-800">
                        {cp.missingSkillsForUser.map((sk, i) => (
                          <li key={i}>{sk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-2">
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
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Side-by-Side Career Evaluation Matrix</CardTitle>
            <CardDescription>
              Direct benchmark of responsibilities, educational pathways, and growth trajectories
            </CardDescription>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {selectedForCompare.map((id) => {
              const cp = careerProfiles.find((c) => c.id === id) || careerProfiles[0];
              return (
                <div key={cp.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{cp.title}</h4>
                      <span className="text-[11px] text-slate-500">{cp.category}</span>
                    </div>
                    <Badge variant="success" className="text-xs">
                      {cp.matchScore}% Match
                    </Badge>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Median Compensation</span>
                    <p className="text-slate-900 font-semibold">{cp.medianSalary}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Industry Growth Projection</span>
                    <p className="text-emerald-700 font-semibold">{cp.demandGrowth}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Educational Prerequisites</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {cp.requiredQualifications.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Essential Skills</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cp.essentialSkills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Typical Progression</span>
                    <div className="space-y-1 text-slate-600">
                      {cp.careerProgression.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-indigo-600 font-bold">{i + 1}.</span>
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
        <Card className="p-6 max-w-2xl mx-auto">
          {!assessmentFinished ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Question {assessmentStep + 1} of {assessmentQuestions.length}
                </span>
                <span className="text-xs text-slate-400">RIASEC Aptitude Alignment</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-relaxed">
                {assessmentQuestions[assessmentStep].q}
              </h3>

              <div className="space-y-2.5">
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
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-xs font-medium text-slate-800 transition-all flex items-center justify-between group"
                  >
                    <span>{opt}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Career Trait Assessment Completed!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your primary RIASEC orientation is <strong>Investigative & Enterprising</strong>. You show exceptional
                natural affinity for AI Product Leadership, Statistical Architecture, and Quantitative Strategy.
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
              <Card key={c.id} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-4">
                    <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{c.name}</h4>
                      <p className="text-xs text-slate-500">{c.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                          {c.rating}
                        </span>
                        <span className="text-slate-400">({c.reviewCount} reviews)</span>
                        <span>•</span>
                        <span className="text-slate-600">{c.experienceYears} yrs experience</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 leading-relaxed">{c.bio}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                    {c.specialization.map((sp, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{c.hourlyRate}</span>
                    <span className="block text-[10px] text-emerald-600 font-semibold">{c.nextAvailableSlot}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedCounsellor(c)}
                    className="gap-1.5 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Session
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Active Bookings Summary */}
          {bookings.length > 0 && (
            <Card className="p-6">
              <CardTitle className="text-sm mb-3">Your Scheduled Counselling Appointments</CardTitle>
              <div className="space-y-3 text-xs">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{b.counsellorName}</div>
                      <div className="text-[11px] text-slate-500">
                        📅 {b.date} • ⏰ {b.timeSlot}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">{b.preSessionNotes}</div>
                    </div>
                    <a
                      href={b.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Video Room
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
        title={`Book Strategy Session with ${selectedCounsellor?.name}`}
        description="Select your preferred date & time and submit background notes"
        maxWidth="md"
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Preferred Date</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Time Slot</label>
            <select
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              <option value="02:00 PM - 02:45 PM EST">02:00 PM - 02:45 PM EST</option>
              <option value="04:00 PM - 04:45 PM EST">04:00 PM - 04:45 PM EST</option>
              <option value="06:30 PM - 07:15 PM EST">06:30 PM - 07:15 PM EST</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Pre-Session Goals / Questions</label>
            <textarea
              rows={3}
              value={preSessionNotes}
              onChange={(e) => setPreSessionNotes(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
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


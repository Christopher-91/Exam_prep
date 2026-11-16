"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Star,
  ShieldCheck,
  Award,
  Play,
  CheckCircle2,
  Atom,
  Flame,
  Brain,
  Compass,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { KidsActivity, KidsAgeGroup } from "@/lib/types";
import { GravitySim } from "@/components/kids/GravitySim";
import { BalanceScale } from "@/components/kids/BalanceScale";
import { FractionExplorer } from "@/components/kids/FractionExplorer";

export default function InteractiveLearningPage() {
  const { childrenActivities, completeKidsActivity, childProfiles } = useApp();

  const [activeAgeGroup, setActiveAgeGroup] = useState<KidsAgeGroup>("6-8");
  const [activeSimulation, setActiveSimulation] = useState<KidsActivity | null>(null);

  const filteredActivities = childrenActivities.filter((a) => a.ageGroup === activeAgeGroup);

  const handleLaunchActivity = (act: KidsActivity) => {
    setActiveSimulation(act);
  };

  const handleSimulationComplete = () => {
    if (activeSimulation) {
      completeKidsActivity(activeSimulation.id, 3);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kids Studio Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive STEM Studio (Ages 3–12)
              </span>
              <span className="text-xs text-slate-400">• Playful Math & Physics Sandbox</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Hands-On Science & Mathematical Discovery</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Explore gravitational orbital mechanics, solve algebraic balance scales, and manipulate visual fractions
              through interactive physical simulations and visual games.
            </p>
          </div>

          <Link href="/">
            <Button
              variant="outline"
              size="md"
              className="gap-1.5 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Parent Overview
            </Button>
          </Link>
        </div>
      </div>

      {/* Age Group Tiers Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            id: "3-5" as KidsAgeGroup,
            title: "Ages 3–5: Early Exploration",
            desc: "Counting safari, visual shapes, colors & animal patterns",
            badge: "Preschool & Kinder",
          },
          {
            id: "6-8" as KidsAgeGroup,
            title: "Ages 6–8: Foundational STEM",
            desc: "Visual fractions, balance scale equations & animal biology",
            badge: "Elementary",
          },
          {
            id: "9-12" as KidsAgeGroup,
            title: "Ages 9–12: Reasoning & Physics",
            desc: "Orbital gravity simulations, pre-algebra & ecosystems",
            badge: "Middle Years",
          },
        ].map((tier) => {
          const isSelected = activeAgeGroup === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveAgeGroup(tier.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                  : "bg-white/80 border-slate-200 hover:bg-white text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{tier.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isSelected ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tier.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{tier.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredActivities.map((act) => (
          <Card key={act.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl p-1 bg-slate-50 rounded-xl">{act.thumbnail}</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>
                    {act.starsEarned} / {act.maxStars} Stars
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">{act.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{act.description}</p>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <Badge variant="primary">{act.category.toUpperCase()}</Badge>
                <span className="text-slate-400">• Age {act.ageGroup}</span>
                {act.isCompleted && (
                  <span className="text-emerald-600 font-semibold ml-auto flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 mt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleLaunchActivity(act)}
                className="w-full justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700"
              >
                <Play className="w-3.5 h-3.5" /> Launch Interactive Experience
              </Button>
            </div>
          </Card>
        ))}

        {/* Bonus Quick Exploration Card */}
        <Card className="border-dashed border-2 border-emerald-300 bg-emerald-50/40 flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-sm font-bold text-emerald-950">More Scientific Demonstrations</h3>
            <p className="text-xs text-emerald-800 mt-1">
              New virtual laboratory experiments added weekly, including ecosystem food webs and optical light prisms.
            </p>
          </div>
          <div className="pt-4 mt-2">
            <span className="text-[11px] font-semibold text-emerald-700">COPPA & FERPA Compliant</span>
          </div>
        </Card>
      </div>

      {/* Interactive Simulation Modal */}
      <Modal
        isOpen={Boolean(activeSimulation)}
        onClose={() => setActiveSimulation(null)}
        title={activeSimulation?.title}
        description={`Interactive STEM Lab • Age Group: ${activeSimulation?.ageGroup} • ${activeSimulation?.category.toUpperCase()}`}
        maxWidth="3xl"
      >
        <div className="space-y-4">
          {activeSimulation?.interactiveType === "gravity" && (
            <GravitySim onComplete={handleSimulationComplete} />
          )}
          {activeSimulation?.interactiveType === "balance_scale" && (
            <BalanceScale onComplete={handleSimulationComplete} />
          )}
          {activeSimulation?.interactiveType === "fraction_explorer" && (
            <FractionExplorer onComplete={handleSimulationComplete} />
          )}
          {(activeSimulation?.interactiveType === "counting_safari" ||
            activeSimulation?.interactiveType === "shapes_colors") && (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-5xl">🦁 🐘 🦒</div>
              <h4 className="text-base font-bold text-slate-800">Safari Animal Counting & Pattern Matching</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Count the animals on the savannah and select the corresponding number card to earn gold stars!
              </p>
              <div className="flex items-center justify-center gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      if (n === 3) {
                        alert("★ Correct! There are 3 animals! 3 Stars Awarded!");
                        handleSimulationComplete();
                      } else {
                        alert("Try again! Count the animals carefully.");
                      }
                    }}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-indigo-200 hover:border-indigo-600 font-bold text-lg text-indigo-700 shadow-sm flex items-center justify-center transition-all hover:scale-105"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setActiveSimulation(null)}>
              Exit Simulation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


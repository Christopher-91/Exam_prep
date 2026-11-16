"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
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
  const { childrenActivities, completeKidsActivity } = useApp();

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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Interactive STEM & Science Studio
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hands-on physical simulations, algebraic balance puzzles, and visual fractions for young learners (Ages 3–12).
          </p>
        </div>

        <Link href="/">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Parent Portal Overview
          </Button>
        </Link>
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
              className={`p-4 rounded-lg border text-left transition-all ${
                isSelected
                  ? "bg-white border-slate-900 shadow-xs ring-1 ring-slate-900 text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{tier.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
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
          <Card key={act.id} className="flex flex-col justify-between p-5 border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 bg-slate-50 rounded-lg border border-slate-100 inline-block">{act.thumbnail}</span>
                <div className="flex items-center gap-1 text-amber-600 font-semibold text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>
                    {act.starsEarned} / {act.maxStars} Stars
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-1">{act.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{act.description}</p>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <Badge variant="neutral">{act.category.toUpperCase()}</Badge>
                <span className="text-slate-400">• Age {act.ageGroup}</span>
                {act.isCompleted && (
                  <span className="text-emerald-700 font-semibold ml-auto flex items-center gap-1 text-[11px]">
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
                className="w-full justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" /> Launch Activity
              </Button>
            </div>
          </Card>
        ))}

        {/* Informational Standard Card */}
        <Card className="p-5 border-dashed border-slate-300 bg-slate-50/60 flex flex-col justify-between">
          <div>
            <div className="text-2xl mb-2">🔬</div>
            <h3 className="text-sm font-semibold text-slate-900">Curriculum-Aligned STEM Units</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Demonstrations adhere to NGSS (Next Generation Science Standards) and Common Core Math practices.
            </p>
          </div>
          <div className="pt-4 mt-2">
            <span className="text-[11px] font-medium text-slate-600">COPPA & FERPA Student Data Compliant</span>
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
            <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 space-y-4">
              <div className="text-5xl">🦁 🐘 🦒</div>
              <h4 className="text-base font-bold text-slate-900">Safari Animal Counting & Pattern Matching</h4>
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
                    className="w-12 h-12 rounded-lg bg-white border border-slate-300 hover:border-slate-900 font-bold text-lg text-slate-900 shadow-2xs flex items-center justify-center transition-colors"
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

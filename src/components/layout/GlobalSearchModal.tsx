"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  GraduationCap,
  BookOpen,
  Layers,
  Sparkles,
  Compass,
  Calendar,
  ArrowRight,
  X,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { mockTests, studyMaterials, decks, childrenActivities, careerProfiles, tasks } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle or open
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search across modules
  const filteredTests = mockTests.filter(
    (t) => t.title.toLowerCase().includes(q) || t.examId.toLowerCase().includes(q)
  );

  const filteredMaterials = studyMaterials.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.topic.toLowerCase().includes(q)
  );

  const filteredDecks = decks.filter(
    (d) => d.title.toLowerCase().includes(q) || d.subject.toLowerCase().includes(q)
  );

  const filteredActivities = childrenActivities.filter((a) =>
    a.title.toLowerCase().includes(q)
  );

  const filteredCareers = careerProfiles.filter(
    (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
  );

  const filteredTasks = tasks.filter(
    (t) => t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q)
  );

  const totalResults =
    filteredTests.length +
    filteredMaterials.length +
    filteredDecks.length +
    filteredActivities.length +
    filteredCareers.length +
    filteredTasks.length;

  const navigateTo = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[75vh]">
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exams, tests, flashcards, study notes, career paths, tasks..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-200/60"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4">
          {totalResults === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No matching resources found for "{query}". Try "SAT", "Math", "AI", or "Gravity".
            </div>
          ) : (
            <>
              {/* Mock Tests */}
              {filteredTests.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3 h-3 text-indigo-500" /> Mock Tests & Practice
                  </div>
                  <div className="space-y-1">
                    {filteredTests.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => navigateTo(`/exam-prep/mock-test/${t.id}`)}
                        className="w-full text-left p-2 rounded-lg text-xs hover:bg-indigo-50/60 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">{t.title}</div>
                          <div className="text-[10px] text-slate-400">
                            {t.examId.toUpperCase()} • {t.durationMinutes} mins • {t.totalQuestions} Questions
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Materials */}
              {filteredMaterials.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-sky-500" /> Study Notes & Cheat Sheets
                  </div>
                  <div className="space-y-1">
                    {filteredMaterials.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => navigateTo("/study-materials")}
                        className="w-full text-left p-2 rounded-lg text-xs hover:bg-sky-50/60 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">{m.title}</div>
                          <div className="text-[10px] text-slate-400">
                            {m.subject} • {m.topic} • {m.readTimeMinutes}m read
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flashcards */}
              {filteredDecks.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-purple-500" /> Flashcard Decks
                  </div>
                  <div className="space-y-1">
                    {filteredDecks.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => navigateTo("/flashcards")}
                        className="w-full text-left p-2 rounded-lg text-xs hover:bg-purple-50/60 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">{d.title}</div>
                          <div className="text-[10px] text-slate-400">
                            {d.subject} • {d.totalCards} cards • {d.dueTodayCount} due
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Profiles */}
              {filteredCareers.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-emerald-500" /> Career Paths
                  </div>
                  <div className="space-y-1">
                    {filteredCareers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => navigateTo("/career-counselling")}
                        className="w-full text-left p-2 rounded-lg text-xs hover:bg-emerald-50/60 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">{c.title}</div>
                          <div className="text-[10px] text-slate-400">
                            {c.category} • Match: {c.matchScore}% • Salary: {c.medianSalary}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Kids Interactive Activities */}
              {filteredActivities.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Kids STEM Activities
                  </div>
                  <div className="space-y-1">
                    {filteredActivities.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => navigateTo("/interactive-learning")}
                        className="w-full text-left p-2 rounded-lg text-xs hover:bg-amber-50/60 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">
                            {a.thumbnail} {a.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Age: {a.ageGroup} • {a.category}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {filteredTasks.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-rose-500" /> Study Tasks & Planner
                  </div>
                  <div className="space-y-1">
                    {filteredTasks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => navigateTo("/study-planner")}
                        className="w-full text-left p-2 rounded-lg text-xs hover:bg-rose-50/60 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">{t.title}</div>
                          <div className="text-[10px] text-slate-400">
                            Due: {t.dueDate} • Priority: {t.priority.toUpperCase()}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Users,
  GraduationCap,
  Layers,
  Database,
  Plus,
  Search,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { Modal } from "@/components/common/Modal";
import { Question } from "@/lib/types";

export function AdminDashboard() {
  const { mockTests, auditLogs, approveQuestion, addCustomQuestion } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // New question form state
  const [newPrompt, setNewPrompt] = useState("");
  const [newSection, setNewSection] = useState("Mathematics");
  const [newTopic, setNewTopic] = useState("Algebra");
  const [newDiff, setNewDiff] = useState<"easy" | "medium" | "hard">("medium");
  const [newOptA, setNewOptA] = useState("");
  const [newOptB, setNewOptB] = useState("");
  const [newOptC, setNewOptC] = useState("");
  const [newOptD, setNewOptD] = useState("");
  const [correctOpt, setCorrectOpt] = useState("A");
  const [explanation, setExplanation] = useState("");

  // Gather questions across tests
  const allQuestions = mockTests.flatMap((t) => t.questions);
  const pendingCount = allQuestions.filter((q) => q.status === "pending_review").length;

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt || !newOptA || !newOptB) return;

    const newQ: Question = {
      id: `q-custom-${Date.now()}`,
      examId: "sat",
      section: newSection,
      topic: newTopic,
      difficulty: newDiff,
      prompt: newPrompt,
      options: [
        { id: "A", text: newOptA },
        { id: "B", text: newOptB },
        { id: "C", text: newOptC || "Option C" },
        { id: "D", text: newOptD || "Option D" },
      ],
      correctOptionId: correctOpt,
      explanation: explanation || "Verified standard explanation.",
      status: "approved",
    };

    addCustomQuestion(newQ);
    setShowAddModal(false);
    // Reset form
    setNewPrompt("");
    setNewOptA("");
    setNewOptB("");
    setNewOptC("");
    setNewOptD("");
    setExplanation("");
  };

  return (
    <div className="space-y-6">
      {/* Admin Portal Header */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Staff Administrator Workspace
              </span>
              <span className="text-xs text-slate-400">• Role-Based Access Control</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Curriculum, Question Bank & Content Governance</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Review and approve AI-generated test items, configure examination blueprints, manage user roles, and
              audit curriculum publishing pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowAddModal(true)}
              className="gap-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" /> Author New Item
            </Button>
            <Link href="/admin">
              <Button variant="secondary" size="md" className="border border-slate-700 bg-slate-800">
                Full CMS Studio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Admin Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Question Pool</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{allQuestions.length * 12}</span>
            <span className="text-xs text-slate-400">items</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-2 font-medium">99.4% psychometric validity</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Candidates</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">14,820</span>
            <span className="text-xs text-slate-400">enrolled</span>
          </div>
          <p className="text-[11px] text-sky-600 mt-2 font-medium">+18% growth month-over-month</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending AI Review Queue</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{pendingCount || 3}</span>
            <span className="text-xs text-amber-600 font-semibold">Awaiting sign-off</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">SLA: 24h faculty turnaround</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">System Audit Trail</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{auditLogs.length} events</span>
            <span className="text-xs text-slate-400">logged</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Zero compliance violations</p>
        </Card>
      </div>

      {/* Main Grid: Question Approval Queue & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Question Bank Review Table (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">Active Test Items & Approval Status</CardTitle>
                <CardDescription>Review AI-generated and faculty-authored test questions</CardDescription>
              </div>
              <Badge variant="neutral">Total {allQuestions.length} Loaded</Badge>
            </CardHeader>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              {allQuestions.map((q) => (
                <div key={q.id} className="py-3 px-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                        {q.examId}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">{q.section}</span>
                      <span className="text-xs text-slate-400">• {q.topic}</span>
                      <Badge
                        variant={
                          q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "warning" : "danger"
                        }
                      >
                        {q.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-2">{q.prompt}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={q.status === "pending_review" ? "warning" : "success"}>
                      {q.status === "pending_review" ? "Pending Review" : "Approved"}
                    </Badge>
                    {q.status === "pending_review" && (
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => approveQuestion(q.id)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Audit Trail */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Administrative Audit Trail</CardTitle>
              <CardDescription>Verified system and faculty actions</CardDescription>
            </CardHeader>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{log.action}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{log.details}</p>
                  <div className="text-[10px] text-indigo-600 font-medium">By: {log.user}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Author Question Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Author Question into Exam Bank"
        description="Add a verified problem item to the official test repository"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Section</label>
              <select
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Reading and Writing">Reading and Writing</option>
                <option value="Quantitative Reasoning">Quantitative Reasoning</option>
                <option value="Verbal Reasoning">Verbal Reasoning</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Topic</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="e.g. Quadratic Equations"
                required
              />
            </div>
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Difficulty</label>
              <select
                value={newDiff}
                onChange={(e) => setNewDiff(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-700 mb-1 block">Question Prompt</label>
            <textarea
              rows={3}
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter clear mathematical or conceptual problem prompt..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Option A</label>
              <input
                type="text"
                value={newOptA}
                onChange={(e) => setNewOptA(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Option text A"
                required
              />
            </div>
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Option B</label>
              <input
                type="text"
                value={newOptB}
                onChange={(e) => setNewOptB(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Option text B"
                required
              />
            </div>
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Option C</label>
              <input
                type="text"
                value={newOptC}
                onChange={(e) => setNewOptC(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Option text C"
              />
            </div>
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Option D</label>
              <input
                type="text"
                value={newOptD}
                onChange={(e) => setNewOptD(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Option text D"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-slate-700 mb-1 block">Correct Option</label>
              <select
                value={correctOpt}
                onChange={(e) => setCorrectOpt(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="font-medium text-slate-700 mb-1 block">Detailed Explanation</label>
              <input
                type="text"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                placeholder="Why the correct option is rigorously justified..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save & Publish Item
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


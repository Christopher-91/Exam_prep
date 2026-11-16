"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  Users,
  Plus,
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

  const allQuestions = mockTests.flatMap((t) => t.questions);
  const pendingCount = allQuestions.filter((q) => q.status === "pending_review").length;

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt || !newOptA || !newOptB) return;

    const newQ: Question = {
      id: `q-cust-${Date.now()}`,
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
    setNewPrompt("");
    setNewOptA("");
    setNewOptB("");
    setNewOptC("");
    setNewOptD("");
    setExplanation("");
  };

  return (
    <div className="space-y-6">
      {/* Clean Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Academic Administration & Governance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-medium">RBAC Level 3 Clearance</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Curriculum, Item Pool & Platform Control
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit item difficulty calibrations, review submissions, and manage candidate accounts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus className="w-3.5 h-3.5" /> Author New Item
          </Button>
          <Link href="/admin">
            <Button variant="primary" size="sm">
              Full Admin Console
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Admin Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Verified Item Repository</span>
            <Database className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{allQuestions.length * 12}</span>
            <span className="text-xs text-slate-400">items</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Psychometrically calibrated</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Enrolled Candidates</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">14,820</span>
            <span className="text-xs text-slate-400">candidates</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Active this academic term</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Items Pending Review</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{pendingCount || 2}</span>
            <span className="text-xs text-amber-700 font-semibold">in queue</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Faculty sign-off SLA: 24h</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Audit Trail Log</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{auditLogs.length}</span>
            <span className="text-xs text-slate-400">events logged</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Zero compliance incidents</p>
        </Card>
      </div>

      {/* Main Grid: Item Approval Table & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card hover={false}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Question Bank & Approval Pipeline</CardTitle>
                <CardDescription>Review and certify faculty items before release</CardDescription>
              </div>
              <Badge variant="neutral">{allQuestions.length} Items Loaded</Badge>
            </CardHeader>

            <div className="divide-y divide-slate-100 text-xs">
              {allQuestions.map((q) => (
                <div key={q.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 uppercase">
                        {q.examId}
                      </span>
                      <span className="font-semibold text-slate-900">{q.section}</span>
                      <span className="text-slate-400">• {q.topic}</span>
                      <Badge variant={q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "neutral" : "danger"}>
                        {q.difficulty}
                      </Badge>
                    </div>
                    <p className="text-slate-700 line-clamp-2 leading-relaxed">{q.prompt}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={q.status === "pending_review" ? "warning" : "success"}>
                      {q.status === "pending_review" ? "Pending Review" : "Approved"}
                    </Badge>
                    {q.status === "pending_review" && (
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => approveQuestion(q.id)}
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

        {/* Right: Audit Log */}
        <div className="space-y-6">
          <Card hover={false}>
            <CardHeader className="pb-3">
              <CardTitle>System Audit Log</CardTitle>
              <CardDescription>Verified faculty and system events</CardDescription>
            </CardHeader>

            <div className="space-y-3 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded border border-slate-200 bg-slate-50/60 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{log.details}</p>
                  <div className="text-[10px] text-slate-500 font-medium">By: {log.user}</div>
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
        title="Author Standardized Item into Repository"
        description="Add a verified problem item to the active testing bank"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Curriculum Section</label>
              <select
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Reading and Writing">Reading and Writing</option>
                <option value="Quantitative Reasoning">Quantitative Reasoning</option>
                <option value="Verbal Reasoning">Verbal Reasoning</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Topic Classification</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                placeholder="e.g. Quadratic Equations"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Difficulty Calibration</label>
              <select
                value={newDiff}
                onChange={(e) => setNewDiff(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Item Prompt / Problem Statement</label>
            <textarea
              rows={3}
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded text-xs"
              placeholder="Enter clear mathematical or analytical problem statement..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option A</label>
              <input
                type="text"
                value={newOptA}
                onChange={(e) => setNewOptA(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option B</label>
              <input
                type="text"
                value={newOptB}
                onChange={(e) => setNewOptB(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option C</label>
              <input
                type="text"
                value={newOptC}
                onChange={(e) => setNewOptC(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option D</label>
              <input
                type="text"
                value={newOptD}
                onChange={(e) => setNewOptD(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Correct Answer Key</label>
              <select
                value={correctOpt}
                onChange={(e) => setCorrectOpt(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="font-semibold text-slate-700 mb-1 block">Standardized Explanation</label>
              <input
                type="text"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                placeholder="Pedagogical rationale..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save & Authorize Item
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Database,
  Users,
  Settings,
  BookOpen,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  Award,
  Calendar,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG, SupportedExamId } from "@/config/brand.config";
import { Question } from "@/lib/types";

export default function AdminWorkspacePage() {
  const { mockTests, auditLogs, approveQuestion, addCustomQuestion, profile } = useApp();

  const [activeTab, setActiveTab] = useState<"questions" | "exams" | "users" | "audit">("questions");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>("all");

  // Add question state
  const [newPrompt, setNewPrompt] = useState("");
  const [newExam, setNewExam] = useState<SupportedExamId>("sat");
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

  const filteredQuestions = allQuestions.filter((q) => {
    const matchesSearch =
      q.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = selectedExamFilter === "all" || q.examId === selectedExamFilter;
    return matchesSearch && matchesExam;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt || !newOptA || !newOptB) return;

    const newQ: Question = {
      id: `q-adm-${Date.now()}`,
      examId: newExam,
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
    alert("Test item successfully authored and published to official item bank.");
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Institutional Administration & Content Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Curriculum blueprints, question item authoring, candidate directories, and platform audit compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" /> Author New Item
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab("questions")}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === "questions"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Question Bank Management ({allQuestions.length})
        </button>
        <button
          onClick={() => setActiveTab("exams")}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === "exams"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Examination Blueprints ({BRAND_CONFIG.supportedExams.length})
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === "users"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Candidate Directory
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === "audit"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Platform Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Question Bank Management */}
      {activeTab === "questions" && (
        <Card className="p-5 border-slate-200">
          <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <CardTitle className="text-sm">Item Repository & Approval Pipeline</CardTitle>
              <CardDescription>Review, approve, and verify pedagogical test items</CardDescription>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or topics..."
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <select
                value={selectedExamFilter}
                onChange={(e) => setSelectedExamFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700"
              >
                <option value="all">All Exams</option>
                {BRAND_CONFIG.supportedExams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.code}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>

          <div className="divide-y divide-slate-100 overflow-x-auto text-xs">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[10px] uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {q.examId}
                    </span>
                    <span className="font-semibold text-slate-900 text-xs">{q.section}</span>
                    <span className="text-slate-400">• {q.topic}</span>
                    <Badge
                      variant={
                        q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "warning" : "danger"
                      }
                    >
                      {q.difficulty}
                    </Badge>
                  </div>
                  <p className="text-slate-800 font-normal line-clamp-2 leading-relaxed">{q.prompt}</p>
                  <p className="text-[11px] text-slate-500">Correct Key: Option ({q.correctOptionId})</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={q.status === "pending_review" ? "warning" : "success"}>
                    {q.status === "pending_review" ? "Pending Review" : "Approved & Live"}
                  </Badge>
                  {q.status === "pending_review" && (
                    <Button
                      variant="primary"
                      size="xs"
                      onClick={() => approveQuestion(q.id)}
                    >
                      Approve Item
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 2: Examination Blueprints */}
      {activeTab === "exams" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRAND_CONFIG.supportedExams.map((exam) => (
            <Card key={exam.id} className="p-5 border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{exam.name}</h3>
                  <span className="text-xs text-slate-400">Administered by {exam.provider}</span>
                </div>
                <Badge variant="neutral" className="text-xs">
                  Max: {exam.maxScore}
                </Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">Scoring Model:</span>
                  <p className="text-slate-600">{exam.scoringFormula}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">Standard Duration:</span>
                  <p className="text-slate-600">{exam.defaultDurationMinutes} minutes</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-0.5">Curriculum Sections:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exam.sections.map((sec, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Users Table */}
      {activeTab === "users" && (
        <Card className="p-5 border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Candidate & Role Directory</CardTitle>
            <CardDescription>Role assignments, activity statuses, and access permissions</CardDescription>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              {
                name: "Alexander Vance",
                email: "alexander.vance@stanford.edu",
                role: "Student",
                exam: "SAT",
                streak: "14 days",
                status: "Active",
              },
              {
                name: "Sarah Vance (Parent)",
                email: "sarah.vance@gmail.com",
                role: "Parent",
                exam: "N/A",
                streak: "7 days",
                status: "Active",
              },
              {
                name: "David K. Miller",
                email: "david.miller@mckinsey.com",
                role: "Working Professional",
                exam: "GMAT",
                streak: "21 days",
                status: "Active",
              },
              {
                name: "Dr. Elena Rostova",
                email: "elena.rostova@mit.edu",
                role: "Counsellor / Staff",
                exam: "GRE/SAT",
                streak: "45 days",
                status: "Verified",
              },
            ].map((u, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="neutral">{u.role}</Badge>
                  <span className="text-slate-500 font-medium">{u.exam}</span>
                  <Badge variant="success">{u.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === "audit" && (
        <Card className="p-5 border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Platform Audit Trail</CardTitle>
            <CardDescription>Immutable record of content, scoring, and role updates</CardDescription>
          </CardHeader>

          <div className="space-y-2.5 text-xs pt-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{log.action}</span>
                  <span className="text-[11px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-600 leading-snug">{log.details}</p>
                <div className="text-[10px] text-slate-500 font-medium">User: {log.user}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

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
              <label className="font-semibold text-slate-700 mb-1 block">Exam Target</label>
              <select
                value={newExam}
                onChange={(e) => setNewExam(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
              >
                {BRAND_CONFIG.supportedExams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Topic</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                placeholder="e.g. Quadratic Equations"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Difficulty</label>
              <select
                value={newDiff}
                onChange={(e) => setNewDiff(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Question Prompt</label>
            <textarea
              rows={3}
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-md text-xs"
              placeholder="Enter clear mathematical or conceptual problem prompt..."
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
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                placeholder="Option text A"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option B</label>
              <input
                type="text"
                value={newOptB}
                onChange={(e) => setNewOptB(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                placeholder="Option text B"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option C</label>
              <input
                type="text"
                value={newOptC}
                onChange={(e) => setNewOptC(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                placeholder="Option text C"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Option D</label>
              <input
                type="text"
                value={newOptD}
                onChange={(e) => setNewOptD(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                placeholder="Option text D"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Correct Option</label>
              <select
                value={correctOpt}
                onChange={(e) => setCorrectOpt(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="font-semibold text-slate-700 mb-1 block">Detailed Explanation</label>
              <input
                type="text"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                placeholder="Why the correct option is justified..."
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

"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Download,
  CalendarCheck,
  RotateCw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { StudyTask, TaskPriority } from "@/lib/types";
import { AIService } from "@/lib/ai-service";

export default function StudyPlannerPage() {
  const { tasks, addTask, toggleTask, deleteTask, scheduleBlocks, selectedExam, profile } = useApp();

  const [activeView, setActiveView] = useState<"daily" | "tasks">("daily");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showCalendarSyncModal, setShowCalendarSyncModal] = useState(false);
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("Mathematics");
  const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("medium");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskMinutes, setTaskMinutes] = useState(45);

  // External calendar sync statuses
  const [googleConnected, setGoogleConnected] = useState(true);
  const [outlookConnected, setOutlookConnected] = useState(false);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      subject: taskSubject,
      examId: selectedExam,
      dueDate: taskDueDate,
      priority: taskPriority,
      status: "todo",
      estimatedMinutes: Number(taskMinutes),
      description: taskDesc,
      subtasks: [
        { id: `st-sub-1`, title: "Review foundational principles", completed: false },
        { id: `st-sub-2`, title: "Complete timed exercises", completed: false },
      ],
    });

    setTaskTitle("");
    setTaskDesc("");
    setShowAddTaskModal(false);
  };

  const handleAutoGeneratePlan = async () => {
    setIsGeneratingSchedule(true);
    try {
      const generated = await AIService.generateSmartSchedule(
        selectedExam,
        profile.dailyStudyTargetHours,
        profile.priorities
      );
      generated.forEach((t) => addTask(t));
      alert("Adaptive study schedule updated: 3 focused task blocks added.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingSchedule(false);
    }
  };

  // Export iCal .ics file
  const handleExportICS = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Acuity Learning Systems//Study Planner//EN\nBEGIN:VEVENT\nSUMMARY:Acuity SAT Focused Math Drill\nDTSTART:20261118T090000Z\nDTEND:20261118T103000Z\nDESCRIPTION:Quadratic Equations and Desmos Shortcuts\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `acuity-${selectedExam}-study-plan.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Study Schedule & Task Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Time-blocked study sessions, workload balancing, and calendar synchronization calibrated for {selectedExam.toUpperCase()}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoGeneratePlan}
            loading={isGeneratingSchedule}
            className="gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" /> Recalibrate Schedule
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddTaskModal(true)}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Task
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCalendarSyncModal(true)}
            className="gap-1.5"
          >
            <CalendarCheck className="w-4 h-4 text-slate-600" /> Sync Calendar
          </Button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveView("daily")}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeView === "daily"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Daily Time-Blocked Focus
        </button>
        <button
          onClick={() => setActiveView("tasks")}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeView === "tasks"
              ? "bg-slate-900 text-white font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Task Queue & Subtasks ({tasks.length})
        </button>
      </div>

      {/* Active View: Daily Time Blocking */}
      {activeView === "daily" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule List (2 spans) */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5 border-slate-200">
              <CardHeader className="flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-sm">Today's Time Blocks</CardTitle>
                  <CardDescription>
                    Paced to ensure balanced cognitive load and active recall retention
                  </CardDescription>
                </div>
                <Badge variant="neutral" className="font-semibold text-xs">
                  {profile.dailyStudyTargetHours} hrs target
                </Badge>
              </CardHeader>

              <div className="space-y-2.5 pt-2">
                {scheduleBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`p-3.5 rounded-lg border flex items-center justify-between transition-colors ${
                      block.completed
                        ? "bg-slate-50 border-slate-200 opacity-60"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs ${
                          block.completed
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {block.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{block.topic}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {block.time} • {block.durationMinutes} mins • {block.subject}
                        </div>
                      </div>
                    </div>

                    <Badge variant={block.completed ? "success" : "warning"}>
                      {block.completed ? "COMPLETED" : "SCHEDULED"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Summary */}
          <div className="space-y-4">
            <Card className="p-5 border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-wider text-slate-500">Official Exam Target</CardTitle>
                <CardDescription>{selectedExam.toUpperCase()} Test Date</CardDescription>
              </CardHeader>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1 mt-2">
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {Math.max(
                    1,
                    Math.round(
                      (new Date(profile.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    )
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-700">Days Remaining</div>
                <p className="text-[11px] text-slate-500 pt-1">Target Score: {profile.targetScore}</p>
              </div>
            </Card>

            <Card className="p-5 border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-wider text-slate-500">Calendar Synchronization</CardTitle>
                <CardDescription>Export study sessions to your personal calendar</CardDescription>
              </CardHeader>

              <div className="space-y-2.5 pt-2 text-xs">
                <Button variant="outline" size="sm" onClick={handleExportICS} className="w-full justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download iCal (.ics)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCalendarSyncModal(true)}
                  className="w-full justify-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" /> Configure Calendar Sync
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Active View: Tasks Table */}
      {activeView === "tasks" && (
        <Card className="p-5 border-slate-200">
          <CardHeader className="flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm">Study Task Queue & Assignments</CardTitle>
              <CardDescription>Track individual study items, practice problems, and subtasks</CardDescription>
            </div>
            <Button variant="primary" size="xs" onClick={() => setShowAddTaskModal(true)}>
              + Add New Task
            </Button>
          </CardHeader>

          <div className="divide-y divide-slate-100 text-xs">
            {tasks.map((task) => (
              <div key={task.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleTask(task.id)}
                    className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <div
                      className={`font-semibold text-xs ${
                        task.status === "completed" ? "line-through text-slate-400" : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </div>
                    {task.description && <p className="text-slate-500 text-[11px]">{task.description}</p>}

                    {/* Subtasks */}
                    {task.subtasks && task.subtasks.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {task.subtasks.map((st) => (
                          <span
                            key={st.id}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1"
                          >
                            ✓ {st.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant={
                      task.priority === "high" ? "danger" : task.priority === "medium" ? "warning" : "neutral"
                    }
                  >
                    {task.priority.toUpperCase()}
                  </Badge>
                  <span className="text-slate-500 text-[11px]">{task.dueDate}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        title="Create Study Task or Assignment"
        description="Add a structured learning assignment to your active schedule"
        maxWidth="md"
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              placeholder="e.g. Master Vieta's formulas and solve 15 problems"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Subject</label>
              <input
                type="text"
                value={taskSubject}
                onChange={(e) => setTaskSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                placeholder="Mathematics, Verbal..."
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Due Date</label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Priority</label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 mb-1 block">Estimated Duration</label>
              <select
                value={taskMinutes}
                onChange={(e) => setTaskMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              >
                <option value={20}>20 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Description & Instructions</label>
            <textarea
              rows={2}
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md text-xs"
              placeholder="Key concepts to focus on..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAddTaskModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Calendar Integration Modal */}
      <Modal
        isOpen={showCalendarSyncModal}
        onClose={() => setShowCalendarSyncModal(false)}
        title="External Calendar Synchronization"
        description="Connect with Google Calendar or Microsoft Outlook Calendar"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-800">
                G
              </div>
              <div>
                <div className="font-semibold text-slate-900">Google Calendar</div>
                <div className="text-[11px] text-slate-500">
                  {googleConnected ? "Connected (alexander.vance@stanford.edu)" : "Not connected"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setGoogleConnected(!googleConnected)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                googleConnected ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-slate-900 text-white"
              }`}
            >
              {googleConnected ? "Disconnect" : "Connect"}
            </button>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-800">
                O
              </div>
              <div>
                <div className="font-semibold text-slate-900">Microsoft Outlook Calendar</div>
                <div className="text-[11px] text-slate-500">
                  {outlookConnected ? "Connected (MS Graph API)" : "Not connected"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOutlookConnected(!outlookConnected)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                outlookConnected ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-slate-900 text-white"
              }`}
            >
              {outlookConnected ? "Disconnect" : "Connect"}
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-600 text-[11px] leading-relaxed">
            * When enabled, study sessions and scheduled mock examinations automatically populate your personal
            calendar with 15-minute reminders.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setShowCalendarSyncModal(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

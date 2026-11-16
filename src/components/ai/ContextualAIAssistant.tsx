"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  Layers,
  Compass,
  Calendar,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useAIModal } from "@/context/AIModalContext";
import { useApp } from "@/context/AppContext";
import { AIService, AIChatMessage } from "@/lib/ai-service";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useRouter } from "next/navigation";

export function ContextualAIAssistant() {
  const router = useRouter();
  const { isOpen, closeAssistant, activeContext, initialPrompt } = useAIModal();
  const { profile, selectedExam, tasks, flashcards } = useApp();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: `Welcome back, ${profile.name.split(" ")[0]}! I'm your **${BRAND_CONFIG.shortName} AI Learning Copilot**. I have synced with your ${selectedExam.toUpperCase()} progress, active tasks, and memory retention curves.`,
      timestamp: "Just now",
      suggestedActions: [
        { label: "Predict My Score Readiness", action: "view_analytics" },
        { label: "Generate 5-Question Drill", action: "start_drill" },
        { label: "Optimize Today's Study Plan", action: "generate_plan" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle prefilled prompt when opening
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const aiReply = await AIService.getContextualAssistantResponse(
        text,
        activeContext.module,
        {
          examName: BRAND_CONFIG.supportedExams.find((e) => e.id === selectedExam)?.name,
          streak: profile.streakDays,
          weakTopics: profile.priorities,
        }
      );
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "system",
          text: "An error occurred while connecting to the AI inference engine. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (action === "view_analytics") {
      closeAssistant();
      router.push("/analytics");
    } else if (action === "start_drill") {
      closeAssistant();
      router.push("/exam-prep/adaptive");
    } else if (action === "generate_plan") {
      closeAssistant();
      router.push("/study-planner");
    } else if (action === "start_review") {
      closeAssistant();
      router.push("/flashcards");
    } else if (action === "compare_careers") {
      closeAssistant();
      router.push("/career-counselling");
    } else if (action === "launch_sim_gravity") {
      closeAssistant();
      router.push("/interactive-learning");
    } else {
      handleSendMessage(`Help me with action: ${action}`);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white border-l border-slate-200/90 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-900 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-xs tracking-tight text-white">
              <span>{BRAND_CONFIG.shortName} AI Assistant</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/30 text-indigo-200 rounded font-normal">
                Online
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span>Context:</span>
              <span className="text-indigo-300 uppercase font-medium">{activeContext.module}</span>
              <span>•</span>
              <span className="text-slate-300">{selectedExam.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={closeAssistant}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Context Badge Bar */}
      <div className="px-4 py-2 bg-indigo-50/70 border-b border-indigo-100/60 flex items-center justify-between text-[11px] text-indigo-900">
        <span className="flex items-center gap-1.5 font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
          Target: {profile.targetScore} by {new Date(profile.targetDate).toLocaleDateString()}
        </span>
        <span className="text-[10px] text-indigo-600 font-semibold">Active Recall Ready</span>
      </div>

      {/* Messages stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              {msg.sender === "ai" ? (
                <>
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-[10px] font-semibold text-slate-600">Apex AI</span>
                </>
              ) : msg.sender === "user" ? (
                <>
                  <span className="text-[10px] font-semibold text-slate-600">You</span>
                  <User className="w-3.5 h-3.5 text-slate-600" />
                </>
              ) : null}
              <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none shadow-sm"
                  : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Action buttons embedded in message */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {msg.suggestedActions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleActionClick(act.action)}
                      className="px-2.5 py-1 text-[11px] font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-200/80 transition-colors flex items-center gap-1"
                    >
                      {act.label} <ChevronRight className="w-3 h-3 text-indigo-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-1">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span>AI is analyzing exam blueprints and formulation...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleSendMessage("Explain the difference between permutations and combinations")}
          className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          Permutations vs Combinations
        </button>
        <button
          onClick={() => handleSendMessage("How does the SM-2 algorithm calculate interval increases?")}
          className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          Explain SM-2 Spaced Repetition
        </button>
        <button
          onClick={() => handleSendMessage("What are the top 3 high-paying careers matching my profile?")}
          className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          Top Matching Careers
        </button>
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t border-slate-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask anything about ${selectedExam.toUpperCase()}, tasks, concepts...`}
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}


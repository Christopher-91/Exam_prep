"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { ContextualAIAssistant } from "@/components/ai/ContextualAIAssistant";
import { useAIModal } from "@/context/AIModalContext";
import { Sparkles } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isOpen, openAssistant } = useAIModal();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Floating AI Assistant Trigger (when assistant is closed) */}
      {!isOpen && (
        <button
          onClick={() => openAssistant()}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-black text-white rounded-full shadow-xl hover:shadow-2xl border border-slate-700/50 transition-all duration-200 active:scale-95 group"
          title="Open AI Learning Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs font-semibold tracking-tight pr-1">Apex AI</span>
        </button>
      )}

      {/* Global Search Dialog (Cmd+K) */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Contextual AI Assistant Panel */}
      <ContextualAIAssistant />
    </div>
  );
}


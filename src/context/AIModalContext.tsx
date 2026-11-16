"use client";

import React, { createContext, useContext, useState } from "react";

export interface AIContextData {
  module: string;
  topic?: string;
  examName?: string;
  details?: Record<string, any>;
}

interface AIModalContextType {
  isOpen: boolean;
  openAssistant: (context?: AIContextData, initialPrompt?: string) => void;
  closeAssistant: () => void;
  activeContext: AIContextData;
  initialPrompt?: string;
}

const AIModalContext = createContext<AIModalContextType | undefined>(undefined);

export function AIModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContext, setActiveContext] = useState<AIContextData>({ module: "general" });
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  const openAssistant = (context?: AIContextData, prompt?: string) => {
    if (context) setActiveContext(context);
    setInitialPrompt(prompt);
    setIsOpen(true);
  };

  const closeAssistant = () => {
    setIsOpen(false);
    setInitialPrompt(undefined);
  };

  return (
    <AIModalContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        activeContext,
        initialPrompt,
      }}
    >
      {children}
    </AIModalContext.Provider>
  );
}

export function useAIModal() {
  const context = useContext(AIModalContext);
  if (!context) {
    throw new Error("useAIModal must be used within an AIModalProvider");
  }
  return context;
}


"use client";

import React, { useState } from "react";
import {
  Layers,
  Plus,
  RotateCw,
  CheckCircle2,
  Clock,
  TrendingUp,
  Brain,
  Tag,
  Search,
  Filter,
  Play,
  Flame,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { Flashcard, FlashcardDeck } from "@/lib/types";
import { ReviewRating, getEstimatedRetention, isCardDue } from "@/lib/spaced-repetition";
import { AIService } from "@/lib/ai-service";

export default function FlashcardsPage() {
  const { decks, flashcards, reviewCard, addFlashcard, createDeck, profile } = useApp();

  const [activeDeckId, setActiveDeckId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Review mode modal
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Creation modals
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showAiGenModal, setShowAiGenModal] = useState(false);
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);

  // Form states
  const [manualFront, setManualFront] = useState("");
  const [manualBack, setManualBack] = useState("");
  const [manualTags, setManualTags] = useState("");
  const [manualDeckId, setManualDeckId] = useState(decks[0]?.id || "deck-sat-math");

  // AI Gen state
  const [notesToConvert, setNotesToConvert] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  // Create Deck state
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckSubject, setNewDeckSubject] = useState("Mathematics");
  const [newDeckDesc, setNewDeckDesc] = useState("");

  // Filtered cards
  const displayedCards = flashcards.filter((c) => {
    const matchesDeck = activeDeckId === "all" || c.deckId === activeDeckId;
    const matchesSearch =
      c.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.back.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDeck && matchesSearch;
  });

  // Due cards queue
  const dueQueue = flashcards.filter((c) => {
    const isDue = isCardDue(c.dueDate);
    const matchesDeck = activeDeckId === "all" || c.deckId === activeDeckId;
    return isDue && matchesDeck;
  });

  const estimatedRetention = getEstimatedRetention(flashcards);

  // Launch review session
  const startReviewSession = () => {
    if (dueQueue.length === 0) {
      alert("No cards currently due in this deck! Review intervals are up to date.");
      return;
    }
    setReviewIndex(0);
    setIsFlipped(false);
    setIsReviewOpen(true);
  };

  const handleRateCard = (rating: ReviewRating) => {
    const currentCard = dueQueue[reviewIndex];
    if (!currentCard) return;

    reviewCard(currentCard.id, rating);
    setIsFlipped(false);

    if (reviewIndex < dueQueue.length - 1) {
      setReviewIndex((prev) => prev + 1);
    } else {
      setIsReviewOpen(false);
      alert("Daily Review Queue Completed! Spaced repetition intervals have been recalculated.");
    }
  };

  const handleManualCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFront || !manualBack) return;
    const tags = manualTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    addFlashcard(manualDeckId, manualFront, manualBack, tags);
    setManualFront("");
    setManualBack("");
    setManualTags("");
    setShowCreateCardModal(false);
  };

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notesToConvert) return;
    setAiGenerating(true);
    try {
      const generated = await AIService.generateFlashcardsFromNotes(notesToConvert, "Study Notes");
      generated.forEach((g) => {
        addFlashcard(manualDeckId, g.front, g.back, g.tags);
      });
      setNotesToConvert("");
      setShowAiGenModal(false);
      alert(`Successfully generated ${generated.length} active recall flashcards.`);
    } catch (err) {
      console.error(err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleCreateDeckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle) return;
    createDeck(newDeckTitle, newDeckSubject, newDeckDesc);
    setNewDeckTitle("");
    setNewDeckDesc("");
    setShowCreateDeckModal(false);
  };

  const currentReviewCard = dueQueue[reviewIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Active Recall & Flashcard Decks</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            SuperMemo SM-2 spaced repetition protocol for long-term retention. Self-rate retrieval difficulty to optimize memory consolidation intervals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAiGenModal(true)}
            className="gap-1.5"
          >
            <FileText className="w-4 h-4 text-slate-500" /> Generate from Notes
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCreateCardModal(true)}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Card
          </Button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cards Due Today</span>
            <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{dueQueue.length}</span>
            <span className="text-xs text-slate-500">ready for review</span>
          </div>
          <Button
            variant="primary"
            size="xs"
            onClick={startReviewSession}
            disabled={dueQueue.length === 0}
            className="w-full mt-3 justify-center gap-1"
          >
            <Play className="w-3 h-3" /> Start Review Session ({dueQueue.length})
          </Button>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Estimated Retention</span>
            <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{estimatedRetention}%</span>
            <span className="text-xs text-emerald-700 font-medium">Calibrated</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: `${estimatedRetention}%` }} />
          </div>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Review Streak</span>
            <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">
              <Flame className="w-4 h-4 text-slate-700" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{profile.streakDays} Days</span>
            <span className="text-xs text-slate-500">consecutive</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">No review lapses recorded today</p>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Cards</span>
            <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{flashcards.length}</span>
            <span className="text-xs text-slate-400">across {decks.length} decks</span>
          </div>
          <button
            onClick={() => setShowCreateDeckModal(true)}
            className="text-[11px] text-slate-900 hover:text-slate-700 font-medium block mt-3 underline"
          >
            + Create New Deck
          </button>
        </Card>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveDeckId("all")}
          className={`px-3 py-1.5 rounded-md border text-xs font-medium whitespace-nowrap transition-colors ${
            activeDeckId === "all"
              ? "bg-slate-900 text-white border-slate-900 font-semibold"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          All Decks ({flashcards.length})
        </button>
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => setActiveDeckId(deck.id)}
            className={`px-3 py-1.5 rounded-md border text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeDeckId === deck.id
                ? "bg-slate-900 text-white border-slate-900 font-semibold"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>{deck.title}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded ${
                activeDeckId === deck.id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {flashcards.filter((c) => c.deckId === deck.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards Table */}
      <Card className="p-5 border-slate-200">
        <CardHeader className="flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm">Flashcards Directory</CardTitle>
            <CardDescription>Active recall prompts, SM-2 ease factors and next review interval</CardDescription>
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, answers, tags..."
              className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </CardHeader>

        <div className="divide-y divide-slate-100 overflow-x-auto text-xs">
          {displayedCards.map((card) => {
            const isDue = isCardDue(card.dueDate);

            return (
              <div key={card.id} className="py-3 px-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-xs">{card.front}</span>
                    <Badge
                      variant={
                        card.state === "mastered"
                          ? "success"
                          : card.state === "review"
                          ? "primary"
                          : card.state === "learning"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {card.state.toUpperCase()}
                    </Badge>
                    {isDue && <Badge variant="danger">DUE TODAY</Badge>}
                  </div>
                  <p className="text-slate-600 text-xs line-clamp-1">{card.back}</p>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {card.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 shrink-0">
                  <div>
                    <span className="block text-slate-400 text-[10px]">Interval</span>
                    <span className="font-semibold text-slate-800">{card.interval} days</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px]">Ease (EF)</span>
                    <span className="font-semibold text-slate-800">{card.easeFactor}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px]">Repetitions</span>
                    <span className="font-semibold text-slate-800">{card.repetition}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Review Mode Distraction-Free Modal */}
      <Modal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title={`Active Recall Review (${reviewIndex + 1} of ${dueQueue.length})`}
        description="Attempt mental recall before flipping the card to check accuracy"
        maxWidth="xl"
      >
        {currentReviewCard ? (
          <div className="space-y-6">
            {/* The Flashcard (Interactive Flip) */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[220px] p-6 rounded-lg bg-white border border-slate-300 cursor-pointer flex flex-col justify-between shadow-2xs hover:border-slate-400 transition-all text-center select-none"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {!isFlipped ? "Prompt / Question (Click to reveal solution)" : "Verified Solution / Key Concept"}
              </div>

              <div className="my-auto py-6">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                  {!isFlipped ? currentReviewCard.front : currentReviewCard.back}
                </h3>
              </div>

              <div className="text-[11px] text-slate-400">
                {!isFlipped ? "Click anywhere on the card to flip" : "Select recall difficulty below to recalculate interval"}
              </div>
            </div>

            {/* SM-2 Rating Buttons (Only shown when flipped) */}
            {isFlipped ? (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block text-center">
                  Retrieval Effort Rating
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleRateCard(1)}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 text-center transition-colors"
                  >
                    <span className="block font-semibold text-xs">Again [1]</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">&lt; 10 mins</span>
                  </button>

                  <button
                    onClick={() => handleRateCard(2)}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 text-center transition-colors"
                  >
                    <span className="block font-semibold text-xs">Hard [2]</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">2 days</span>
                  </button>

                  <button
                    onClick={() => handleRateCard(3)}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 text-center transition-colors"
                  >
                    <span className="block font-semibold text-xs">Good [3]</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">4 days</span>
                  </button>

                  <button
                    onClick={() => handleRateCard(4)}
                    className="p-3 rounded-lg border border-slate-900 bg-slate-900 text-white text-center transition-colors hover:bg-slate-800"
                  >
                    <span className="block font-semibold text-xs">Easy [4]</span>
                    <span className="text-[10px] text-slate-300 mt-0.5 block">7 days</span>
                  </button>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsFlipped(true)}
                className="w-full justify-center"
              >
                Reveal Answer
              </Button>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">No active card in review queue.</div>
        )}
      </Modal>

      {/* Manual Add Card Modal */}
      <Modal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        title="Add Single Flashcard"
        description="Author an active recall prompt and verified solution"
      >
        <form onSubmit={handleManualCreate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Select Deck</label>
            <select
              value={manualDeckId}
              onChange={(e) => setManualDeckId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
            >
              {decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.subject})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Front (Question / Prompt)</label>
            <textarea
              rows={3}
              value={manualFront}
              onChange={(e) => setManualFront(e.target.value)}
              placeholder="e.g., What is Vieta's formula for the product of roots in ax² + bx + c = 0?"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Back (Verified Answer)</label>
            <textarea
              rows={3}
              value={manualBack}
              onChange={(e) => setManualBack(e.target.value)}
              placeholder="e.g., Product of roots = c/a"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Tags (comma-separated)</label>
            <input
              type="text"
              value={manualTags}
              onChange={(e) => setManualTags(e.target.value)}
              placeholder="algebra, formulas, roots"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateCardModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Card
            </Button>
          </div>
        </form>
      </Modal>

      {/* AI Generate Cards Modal */}
      <Modal
        isOpen={showAiGenModal}
        onClose={() => setShowAiGenModal(false)}
        title="Generate Flashcards from Notes"
        description="Convert lecture notes, cheatsheets, or textbook passages into active recall pairs"
      >
        <form onSubmit={handleAiGenerate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Paste Study Notes or Textbook Excerpt</label>
            <textarea
              rows={6}
              value={notesToConvert}
              onChange={(e) => setNotesToConvert(e.target.value)}
              placeholder="Paste notes on quadratic equations, kinematics, biological cell mitosis, or economic principles..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Destination Deck</label>
            <select
              value={manualDeckId}
              onChange={(e) => setManualDeckId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
            >
              {decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.subject})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAiGenModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={aiGenerating}>
              Extract & Generate
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Deck Modal */}
      <Modal
        isOpen={showCreateDeckModal}
        onClose={() => setShowCreateDeckModal(false)}
        title="Create New Flashcard Deck"
        description="Group flashcards by syllabus module or subject topic"
      >
        <form onSubmit={handleCreateDeckSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Deck Title</label>
            <input
              type="text"
              value={newDeckTitle}
              onChange={(e) => setNewDeckTitle(e.target.value)}
              placeholder="e.g., SAT Advanced Trigonometry & Radians"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Subject Domain</label>
            <select
              value={newDeckSubject}
              onChange={(e) => setNewDeckSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Reading & Writing">Reading & Writing</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Vocabulary">Vocabulary</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Description</label>
            <input
              type="text"
              value={newDeckDesc}
              onChange={(e) => setNewDeckDesc(e.target.value)}
              placeholder="e.g., High-yield unit circle values, sine rules, and identities"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateDeckModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Create Deck
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

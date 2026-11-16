"use client";

import React, { useState } from "react";
import {
  Layers,
  Sparkles,
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
      alert("No cards currently due in this deck! Excellent job staying on top of your recall intervals.");
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
      alert("Daily Review Queue Completed! Your SM-2 memory curves have been updated.");
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
      const generated = await AIService.generateFlashcardsFromNotes(notesToConvert, "AI Study Notes");
      generated.forEach((g) => {
        addFlashcard(manualDeckId, g.front, g.back, g.tags);
      });
      setNotesToConvert("");
      setShowAiGenModal(false);
      alert(`Successfully generated ${generated.length} high-yield active recall flashcards!`);
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
      {/* Flashcard Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> SuperMemo SM-2 Active Recall Engine
              </span>
              <span className="text-xs text-slate-400">• Spaced Repetition Protocol</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Active Recall & Flashcard Decks</h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Achieve 90%+ long-term retention using mathematically calibrated spaced repetition. Self-rate recall
              difficulty to adjust future review intervals exponentially.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowAiGenModal(true)}
              className="gap-1.5 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <Sparkles className="w-4 h-4 text-indigo-300" /> AI From Notes
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowCreateCardModal(true)}
              className="gap-1.5 bg-indigo-500 hover:bg-indigo-600"
            >
              <Plus className="w-4 h-4" /> Add Card
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cards Due Today</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{dueQueue.length}</span>
            <span className="text-xs text-rose-600 font-medium">ready to review</span>
          </div>
          <Button
            variant="primary"
            size="xs"
            onClick={startReviewSession}
            disabled={dueQueue.length === 0}
            className="w-full mt-3 justify-center gap-1 bg-indigo-600"
          >
            <Play className="w-3 h-3" /> Start Review ({dueQueue.length})
          </Button>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Estimated Retention</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{estimatedRetention}%</span>
            <span className="text-xs text-emerald-600 font-medium">Stable</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${estimatedRetention}%` }} />
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Review Streak</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{profile.streakDays} Days</span>
            <span className="text-xs text-amber-600 font-semibold">Active Streak</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Zero review lapses today</p>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Cards in Decks</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{flashcards.length}</span>
            <span className="text-xs text-slate-400">across {decks.length} decks</span>
          </div>
          <button
            onClick={() => setShowCreateDeckModal(true)}
            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold block mt-3"
          >
            + Create New Deck
          </button>
        </Card>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveDeckId("all")}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-colors ${
            activeDeckId === "all"
              ? "bg-slate-900 text-white font-semibold"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          All Decks ({flashcards.length})
        </button>
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => setActiveDeckId(deck.id)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeDeckId === deck.id
                ? "bg-indigo-600 text-white font-semibold border-indigo-600"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>{deck.title}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeDeckId === deck.id ? "bg-indigo-700 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {flashcards.filter((c) => c.deckId === deck.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards Table / Grid */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm">Flashcards in Selected Workspace</CardTitle>
            <CardDescription>Active recall prompts, SM-2 ease factors and next review interval</CardDescription>
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search front, back, tags..."
              className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    <span className="font-bold text-slate-900 text-xs">{card.front}</span>
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
                    {isDue && <Badge variant="danger">DUE</Badge>}
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
        title={`Review Queue (${reviewIndex + 1} of ${dueQueue.length})`}
        description="Active recall retrieval: Attempt recall before revealing back"
        maxWidth="xl"
      >
        {currentReviewCard ? (
          <div className="space-y-6">
            {/* The Flashcard (Interactive Flip) */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[220px] p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 border-2 border-indigo-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow transition-all text-center select-none"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                {!isFlipped ? "Question / Prompt (Tap to reveal answer)" : "Verified Answer / Formula"}
              </div>

              <div className="my-auto py-4">
                <h3 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                  {!isFlipped ? currentReviewCard.front : currentReviewCard.back}
                </h3>
              </div>

              <div className="text-[11px] text-slate-400">
                {!isFlipped ? "Click anywhere to flip" : "How well did you recall this concept?"}
              </div>
            </div>

            {/* SM-2 Rating Buttons (Only shown when flipped) */}
            {isFlipped ? (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block text-center">
                  Rate Retrieval Effort (Calculates Next Review Date)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleRateCard(1)}
                    className="p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-center transition-colors"
                  >
                    <span className="block font-bold text-xs">Again [1]</span>
                    <span className="text-[10px] text-rose-600 mt-0.5 block">&lt; 10 mins</span>
                  </button>

                  <button
                    onClick={() => handleRateCard(2)}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-center transition-colors"
                  >
                    <span className="block font-bold text-xs">Hard [2]</span>
                    <span className="text-[10px] text-amber-600 mt-0.5 block">2 days</span>
                  </button>

                  <button
                    onClick={() => handleRateCard(3)}
                    className="p-3 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-center transition-colors"
                  >
                    <span className="block font-bold text-xs">Good [3]</span>
                    <span className="text-[10px] text-sky-600 mt-0.5 block">4 days</span>
                  </button>

                  <button
                    onClick={() => handleRateCard(4)}
                    className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-center transition-colors"
                  >
                    <span className="block font-bold text-xs">Easy [4]</span>
                    <span className="text-[10px] text-emerald-600 mt-0.5 block">7 days</span>
                  </button>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsFlipped(true)}
                className="w-full justify-center bg-indigo-600"
              >
                Reveal Answer
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">Queue finished!</div>
        )}
      </Modal>

      {/* Manual Add Card Modal */}
      <Modal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        title="Add Flashcard to Deck"
        description="Craft an active recall prompt and answer pair"
        maxWidth="lg"
      >
        <form onSubmit={handleManualCreate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Target Deck</label>
            <select
              value={manualDeckId}
              onChange={(e) => setManualDeckId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              {decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.subject})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Front (Question or Concept Prompt)</label>
            <textarea
              rows={3}
              value={manualFront}
              onChange={(e) => setManualFront(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. What is the discriminant formula for a quadratic equation?"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Back (Verified Answer or Explanation)</label>
            <textarea
              rows={3}
              value={manualBack}
              onChange={(e) => setManualBack(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. Δ = b² - 4ac. If Δ > 0, 2 real roots; if Δ = 0, 1 real root; if Δ < 0, 2 complex roots."
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Tags (comma-separated)</label>
            <input
              type="text"
              value={manualTags}
              onChange={(e) => setManualTags(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              placeholder="SAT, Math, Algebra, Quadratic"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateCardModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Card into Queue
            </Button>
          </div>
        </form>
      </Modal>

      {/* AI Generate Cards from Notes Modal */}
      <Modal
        isOpen={showAiGenModal}
        onClose={() => setShowAiGenModal(false)}
        title="AI Flashcard Synthesizer"
        description="Paste lecture notes, book excerpts, or formulas to auto-generate active recall cards"
        maxWidth="lg"
      >
        <form onSubmit={handleAiGenerate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Target Deck</label>
            <select
              value={manualDeckId}
              onChange={(e) => setManualDeckId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            >
              {decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.subject})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Study Notes / Content Text</label>
            <textarea
              rows={5}
              value={notesToConvert}
              onChange={(e) => setNotesToConvert(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
              placeholder="Paste raw text, revision summaries, or formula excerpts here..."
              required
            />
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              The AI analyzes cognitive retrieval anchors, eliminates trivia distractors, and outputs high-yield active
              recall cards.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAiGenModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={aiGenerating} className="gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Generate Active Recall Cards
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Deck Modal */}
      <Modal
        isOpen={showCreateDeckModal}
        onClose={() => setShowCreateDeckModal(false)}
        title="Create Flashcard Deck"
        description="Organize cards by subject or specific examination domain"
        maxWidth="md"
      >
        <form onSubmit={handleCreateDeckSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Deck Title</label>
            <input
              type="text"
              value={newDeckTitle}
              onChange={(e) => setNewDeckTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              placeholder="e.g. GRE High-Frequency Vocabulary"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Subject</label>
            <input
              type="text"
              value={newDeckSubject}
              onChange={(e) => setNewDeckSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              placeholder="e.g. Verbal Reasoning"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Description</label>
            <textarea
              rows={2}
              value={newDeckDesc}
              onChange={(e) => setNewDeckDesc(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              placeholder="What this deck aims to memorize..."
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


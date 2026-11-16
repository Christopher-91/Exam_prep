import { Flashcard, FlashcardState } from "./types";

export type ReviewRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SM2Result {
  interval: number; // days until next review
  repetition: number;
  easeFactor: number;
  dueDate: string; // ISO date
  state: FlashcardState;
  nextIntervalText: string;
}

/**
 * SuperMemo 2 (SM-2) Spaced Repetition Algorithm
 * Grade 1 (Again): Complete blackout, reset repetition to 0, interval 1 day
 * Grade 2 (Hard): Correct response with serious difficulty, small increase
 * Grade 3 (Good): Correct response after a hesitation, standard interval
 * Grade 4 (Easy): Perfect recall, interval bonus
 */
export function calculateSM2(
  card: Pick<Flashcard, "interval" | "repetition" | "easeFactor" | "state">,
  rating: ReviewRating
): SM2Result {
  let repetition = card.repetition;
  let easeFactor = card.easeFactor || 2.5;
  let interval = card.interval || 0;
  let state: FlashcardState = card.state;

  // Grade translation to 0-5 scale for SM-2 formula:
  // Rating 1 -> grade 1 (lapse)
  // Rating 2 -> grade 3 (hard pass)
  // Rating 3 -> grade 4 (good pass)
  // Rating 4 -> grade 5 (easy pass)
  const grade = rating === 1 ? 1 : rating === 2 ? 3 : rating === 3 ? 4 : 5;

  if (grade < 3) {
    // Failed recall
    repetition = 0;
    interval = 1; // 1 day or 10 min
    state = "learning";
  } else {
    // Successful recall
    if (repetition === 0) {
      interval = 1;
      state = "learning";
    } else if (repetition === 1) {
      interval = rating === 4 ? 6 : rating === 2 ? 2 : 4;
      state = "review";
    } else {
      let multiplier = easeFactor;
      if (rating === 2) multiplier = Math.max(1.2, easeFactor * 0.85); // Hard penalty
      if (rating === 4) multiplier = easeFactor * 1.3; // Easy bonus

      interval = Math.round(interval * multiplier);
      if (repetition >= 4 && interval > 21) {
        state = "mastered";
      } else {
        state = "review";
      }
    }
    repetition += 1;
  }

  // Update ease factor (SM-2 standard formula): EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;
  if (easeFactor > 3.0) easeFactor = 3.0;

  // Calculate next due date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  let nextIntervalText = `${interval}d`;
  if (interval === 0 || rating === 1) nextIntervalText = "10m";
  else if (interval === 1) nextIntervalText = "1d";
  else if (interval < 30) nextIntervalText = `${interval}d`;
  else nextIntervalText = `${Math.round(interval / 30)}mo`;

  return {
    interval,
    repetition,
    easeFactor: Number(easeFactor.toFixed(2)),
    dueDate: nextDate.toISOString(),
    state,
    nextIntervalText,
  };
}

export function isCardDue(dueDateString: string): boolean {
  const due = new Date(dueDateString);
  const now = new Date();
  return due <= now;
}

export function getEstimatedRetention(cards: Flashcard[]): number {
  if (!cards.length) return 0;
  const mastered = cards.filter((c) => c.state === "mastered").length;
  const review = cards.filter((c) => c.state === "review").length;
  const learning = cards.filter((c) => c.state === "learning").length;
  
  const score = (mastered * 1.0 + review * 0.8 + learning * 0.4) / cards.length;
  return Math.round(score * 100);
}


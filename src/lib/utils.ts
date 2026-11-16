import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SupportedExamId } from "@/config/brand.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatTimeSpent(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  if (remainingSecs === 0) return `${mins}m`;
  return `${mins}m ${remainingSecs}s`;
}

export function calculateExamScore(
  examId: SupportedExamId,
  correctCount: number,
  incorrectCount: number,
  totalQuestions: number
): { scaledScore: number; maxScore: number; percentile: number; accuracy: number } {
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  switch (examId) {
    case "sat": {
      // SAT scaled 400 - 1600
      const scaled = Math.min(1600, Math.max(400, Math.round(400 + (correctCount / totalQuestions) * 1200)));
      const percentile = Math.min(99, Math.max(15, Math.round(Math.pow(scaled / 1600, 3) * 100)));
      return { scaledScore: scaled, maxScore: 1600, percentile, accuracy };
    }
    case "gre": {
      // GRE scaled 260 - 340
      const scaled = Math.min(340, Math.max(260, Math.round(260 + (correctCount / totalQuestions) * 80)));
      const percentile = Math.min(99, Math.max(10, Math.round(Math.pow((scaled - 260) / 80, 2) * 98) + 2));
      return { scaledScore: scaled, maxScore: 340, percentile, accuracy };
    }
    case "gmat": {
      // GMAT Focus scaled 205 - 805 (steps of 10)
      const rawStep = Math.round((correctCount / totalQuestions) * 60);
      const scaled = 205 + rawStep * 10;
      const percentile = Math.min(99, Math.max(8, Math.round(Math.pow((scaled - 205) / 600, 2.5) * 95) + 4));
      return { scaledScore: scaled, maxScore: 805, percentile, accuracy };
    }
    case "jee-main": {
      // JEE Main +4 / -1 / 0, total 300
      const rawScore = correctCount * 4 - incorrectCount * 1;
      const percentile = Math.min(99.9, Math.max(1, Number(((correctCount / totalQuestions) * 99).toFixed(1))));
      return { scaledScore: Math.max(0, rawScore), maxScore: 300, percentile, accuracy };
    }
    default:
      return { scaledScore: correctCount * 10, maxScore: totalQuestions * 10, percentile: accuracy, accuracy };
  }
}


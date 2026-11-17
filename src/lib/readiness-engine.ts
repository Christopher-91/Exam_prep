import { SupportedExamId } from "@/config/brand.config";
import { PredictiveReadiness, TestAttemptResult } from "./types";

export function computePredictiveReadiness(
  examId: SupportedExamId,
  targetScore: number,
  targetDate: string,
  testHistory: TestAttemptResult[]
): PredictiveReadiness {
  const targetTime = targetDate ? new Date(targetDate).getTime() : 0;
  const now = new Date().getTime();
  const daysRemaining = targetDate && !isNaN(targetTime) && targetTime > now
    ? Math.max(0, Math.round((targetTime - now) / (1000 * 60 * 60 * 24)))
    : 0;

  if (!testHistory.length) {
    // Default baseline when no tests taken yet
    const baselineScores: Record<SupportedExamId, { min: number; max: number; target: number }> = {
      sat: { min: 1100, max: 1250, target: 1500 },
      gre: { min: 295, max: 310, target: 325 },
      gmat: { min: 585, max: 645, target: 715 },
      "jee-main": { min: 120, max: 160, target: 240 },
    };
    const b = baselineScores[examId] || { min: 50, max: 70, target: 100 };

    return {
      examId,
      targetScore: targetScore || b.target,
      estimatedScoreMin: b.min,
      estimatedScoreMax: b.max,
      readinessPercentage: 48,
      confidenceScore: 35, // Low confidence without completed mock tests
      daysRemaining,
      limitingFactors: [
        {
          topic: "Diagnostic Baseline Required",
          currentAccuracy: 0,
          impactOnScore: "High",
          recommendedAction: "Complete a full diagnostic mock test to calibrate AI predictions.",
        },
      ],
      strengthTopics: ["Fundamental Concepts"],
      dailyStudyRecommendationHours: 2.5,
      improvementTrend: "Awaiting baseline tests",
    };
  }

  // Calculate weighted average score (recent tests weighted more heavily)
  let weightedSum = 0;
  let totalWeight = 0;
  testHistory.forEach((attempt, index) => {
    const weight = 1 + index * 0.5; // more recent attempts have higher weight
    weightedSum += attempt.scaledScore * weight;
    totalWeight += weight;
  });

  const weightedAverage = Math.round(weightedSum / totalWeight);

  // Measure volatility/variance
  const variance =
    testHistory.reduce((acc, curr) => acc + Math.pow(curr.scaledScore - weightedAverage, 2), 0) /
    testHistory.length;
  const stdDev = Math.round(Math.sqrt(variance));

  // Range band depends on stdDev and number of completed attempts
  const spread = Math.max(20, Math.min(80, stdDev || 35));
  const estimatedScoreMin = Math.round(weightedAverage - spread * 0.7);
  const estimatedScoreMax = Math.round(weightedAverage + spread * 0.9);

  // Confidence increases with more mock tests (30% + 15% per test, capped at 96%)
  const confidenceScore = Math.min(96, Math.max(45, 30 + testHistory.length * 14));

  // Readiness percentage compared to user's target score
  const readinessPercentage = Math.min(
    99,
    Math.max(25, Math.round((weightedAverage / (targetScore || weightedAverage * 1.1)) * 100))
  );

  // Aggregate topic accuracies
  const topicStats: Record<string, { total: number; correct: number }> = {};
  testHistory.forEach((attempt) => {
    attempt.topicBreakdown?.forEach((t) => {
      if (!topicStats[t.topic]) topicStats[t.topic] = { total: 0, correct: 0 };
      topicStats[t.topic].total += t.total;
      topicStats[t.topic].correct += t.correct;
    });
  });

  const limitingFactors = [];
  const strengthTopics = [];

  for (const [topic, stats] of Object.entries(topicStats)) {
    const acc = Math.round((stats.correct / stats.total) * 100);
    if (acc < 65) {
      limitingFactors.push({
        topic,
        currentAccuracy: acc,
        impactOnScore: acc < 50 ? "-40 to -60 pts" : "-20 to -35 pts",
        recommendedAction: `Focus on ${topic} revision notes and practice 20 adaptive drill questions.`,
      });
    } else if (acc >= 80) {
      strengthTopics.push(topic);
    }
  }

  // Fallbacks if topicStats was sparse
  if (limitingFactors.length === 0) {
    limitingFactors.push({
      topic: "Complex Multi-Step Problem Solving",
      currentAccuracy: 62,
      impactOnScore: "-30 pts",
      recommendedAction: "Review pacing and eliminate answer traps during timed sections.",
    });
  }

  if (strengthTopics.length === 0) {
    strengthTopics.push("Core Arithmetic & Reading Comprehension");
  }

  const latestScore = testHistory[testHistory.length - 1].scaledScore;
  const firstScore = testHistory[0].scaledScore;
  const diff = latestScore - firstScore;
  const improvementTrend =
    diff >= 0 ? `+${diff} pts across ${testHistory.length} tests` : `${diff} pts (Score volatility detected)`;

  return {
    examId,
    targetScore,
    estimatedScoreMin,
    estimatedScoreMax,
    readinessPercentage,
    confidenceScore,
    daysRemaining,
    limitingFactors: limitingFactors.slice(0, 3),
    strengthTopics: strengthTopics.slice(0, 4),
    dailyStudyRecommendationHours: Math.max(1.5, Math.min(4.5, Number(((100 - readinessPercentage) / 20).toFixed(1)))),
    improvementTrend,
  };
}


import { SupportedExamId } from "@/config/brand.config";

export type UserRole = "student" | "parent" | "professional" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  activeRole: UserRole;
  selectedExam: SupportedExamId;
  targetDate: string; // ISO date string
  targetScore: number;
  currentPrepLevel: "beginner" | "intermediate" | "advanced";
  dailyStudyTargetHours: number;
  streakDays: number;
  totalStudyHours: number;
  preferredSchedule: "morning" | "afternoon" | "evening";
  priorities: string[];
}

export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  examId: SupportedExamId;
  section: string;
  topic: string;
  difficulty: QuestionDifficulty;
  prompt: string;
  codeSnippet?: string;
  diagramUrl?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  aiHint?: string;
  status?: "approved" | "pending_review" | "draft";
  author?: string;
  timesAttempted?: number;
  accuracyRate?: number;
}

export type QuestionAttemptStatus = 
  | "not_visited" 
  | "unanswered" 
  | "answered" 
  | "marked_for_review" 
  | "answered_and_marked";

export interface MockTest {
  id: string;
  title: string;
  examId: SupportedExamId;
  type: "full_length" | "section_wise" | "topic_specific" | "diagnostic" | "adaptive" | "timed_practice";
  section?: string;
  topic?: string;
  durationMinutes: number;
  totalQuestions: number;
  difficulty: "mixed" | "easy" | "medium" | "hard";
  questions: Question[];
  instructions: string[];
}

export interface TestAttemptAnswer {
  questionId: string;
  selectedOptionId?: string;
  timeSpentSeconds: number;
  status: QuestionAttemptStatus;
  isCorrect?: boolean;
}

export interface TestAttemptResult {
  id: string;
  testId: string;
  testTitle: string;
  examId: SupportedExamId;
  completedAt: string;
  timeSpentSeconds: number;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  rawScore: number;
  scaledScore: number;
  maxScore: number;
  percentile: number;
  accuracyPercentage: number;
  sectionBreakdown: {
    sectionName: string;
    score: number;
    maxScore: number;
    accuracy: number;
    timeSpentMinutes: number;
  }[];
  topicBreakdown: {
    topic: string;
    accuracy: number;
    total: number;
    correct: number;
    status: "strong" | "moderate" | "weak";
  }[];
  answers: Record<string, TestAttemptAnswer>;
  aiFeedback: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    suggestedFocus: string[];
  };
}

// Spaced Repetition Flashcard Types
export type FlashcardState = "new" | "learning" | "review" | "mastered";

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  tags: string[];
  examId?: SupportedExamId;
  subject?: string;
  // SM-2 parameters
  interval: number; // in days
  repetition: number;
  easeFactor: number; // starts at 2.5
  dueDate: string; // ISO string
  state: FlashcardState;
  lastReviewed?: string;
  reviewCount: number;
  lapses: number;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  examId?: SupportedExamId;
  subject: string;
  totalCards: number;
  dueTodayCount: number;
  masteredCount: number;
  color: string;
}

// Study Materials
export type StudyMaterialType = "notes" | "formula_sheet" | "revision_guide" | "video" | "practice_pdf";

export interface StudyMaterial {
  id: string;
  title: string;
  examId: SupportedExamId;
  subject: string;
  topic: string;
  type: StudyMaterialType;
  description: string;
  readTimeMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  downloadUrl?: string;
  fileSize?: string;
  videoDuration?: string;
  contentMarkdown?: string;
  isBookmarked?: boolean;
}

// Interactive Learning for Children
export type KidsAgeGroup = "3-5" | "6-8" | "9-12";

export interface KidsActivity {
  id: string;
  title: string;
  ageGroup: KidsAgeGroup;
  category: "math" | "science" | "logic";
  thumbnail: string;
  description: string;
  starsEarned: number;
  maxStars: number;
  isCompleted: boolean;
  interactiveType: "gravity" | "balance_scale" | "fraction_explorer" | "counting_safari" | "shapes_colors";
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  ageGroup: KidsAgeGroup;
  avatar: string;
  completedActivities: number;
  totalStars: number;
  weeklyScreenMinutes: number;
  strongConcepts: string[];
  growthAreas: string[];
}

// Career Counselling
export interface CareerAssessmentResult {
  id: string;
  completedAt: string;
  dominantTraits: {
    trait: string;
    score: number; // 0 - 100
    description: string;
  }[];
  topStrengths: string[];
  workPreferences: string[];
}

export interface CareerProfile {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  demandGrowth: string; // e.g. "+22% (Much faster than average)"
  medianSalary: string;
  overview: string;
  requiredQualifications: string[];
  essentialSkills: string[];
  careerProgression: string[];
  whyRecommended: string[];
  missingSkillsForUser?: string[];
  recommendedCourses: {
    title: string;
    provider: string;
    duration: string;
    url?: string;
  }[];
}

export interface CareerCounsellor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  specialization: string[];
  hourlyRate: string;
  bio: string;
  nextAvailableSlot: string;
  availableDays: string[];
}

export interface CounsellingBooking {
  id: string;
  counsellorId: string;
  counsellorName: string;
  date: string;
  timeSlot: string;
  status: "confirmed" | "completed" | "cancelled";
  preSessionNotes: string;
  meetingLink: string;
}

// Task & Study Planner
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "completed";

export interface StudyTask {
  id: string;
  title: string;
  description?: string;
  subject: string;
  examId?: SupportedExamId;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedMinutes: number;
  subtasks: { id: string; title: string; completed: boolean }[];
  isAiGenerated?: boolean;
}

export interface StudyScheduleBlock {
  id: string;
  time: string; // e.g. "09:00 - 10:30"
  subject: string;
  topic: string;
  type: "concept_review" | "practice_questions" | "flashcards" | "mock_test" | "revision";
  durationMinutes: number;
  completed: boolean;
}

// Predictive Readiness
export interface PredictiveReadiness {
  examId: SupportedExamId;
  targetScore: number;
  estimatedScoreMin: number;
  estimatedScoreMax: number;
  readinessPercentage: number;
  confidenceScore: number; // 0 - 100
  daysRemaining: number;
  limitingFactors: {
    topic: string;
    currentAccuracy: number;
    impactOnScore: string;
    recommendedAction: string;
  }[];
  strengthTopics: string[];
  dailyStudyRecommendationHours: number;
  improvementTrend: "+12 pts this week" | "+40 pts this month" | string;
}

// Admin & Question Management
export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}


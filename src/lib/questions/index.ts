import { MockTest, Question } from "@/lib/types";
import { SAT_QUESTIONS } from "./sat-questions";
import { GRE_QUESTIONS } from "./gre-questions";
import { GMAT_QUESTIONS } from "./gmat-questions";

export { SAT_QUESTIONS } from "./sat-questions";
export { GRE_QUESTIONS } from "./gre-questions";
export { GMAT_QUESTIONS } from "./gmat-questions";

export const ALL_OFFICIAL_QUESTIONS: Question[] = [
  ...SAT_QUESTIONS,
  ...GRE_QUESTIONS,
  ...GMAT_QUESTIONS,
];

// 1. Digital SAT Official 98-Question Full Simulation (134 mins)
export const SAT_FULL_MOCK_TEST: MockTest = {
  id: "sat-mock-full-98",
  examId: "sat",
  title: "Digital SAT Official Full-Length Simulation (98 Questions)",
  description: "Authentic full-length Digital SAT paper format: 54 Reading & Writing questions (Modules 1 & 2) and 44 Math questions (Modules 1 & 2). 2 hours and 14 minutes testing time.",
  type: "full_length",
  durationMinutes: 134,
  totalQuestions: 98,
  difficulty: "medium",
  instructions: [
    "Section 1: 54 Reading and Writing questions across two 27-question timed modules (64 minutes).",
    "Section 2: 44 Mathematics questions across two 22-question timed modules (70 minutes).",
    "Graphing calculator permitted throughout the entire Mathematics section.",
  ],
  questions: SAT_QUESTIONS,
  sections: [
    {
      id: "sec-sat-rw-1",
      name: "Reading and Writing - Module 1",
      durationMinutes: 32,
      questionIds: SAT_QUESTIONS.filter((q) => q.section === "Reading and Writing" && q.moduleNumber === 1).map((q) => q.id),
    },
    {
      id: "sec-sat-rw-2",
      name: "Reading and Writing - Module 2",
      durationMinutes: 32,
      questionIds: SAT_QUESTIONS.filter((q) => q.section === "Reading and Writing" && q.moduleNumber === 2).map((q) => q.id),
    },
    {
      id: "sec-sat-m-1",
      name: "Mathematics - Module 1",
      durationMinutes: 35,
      questionIds: SAT_QUESTIONS.filter((q) => q.section === "Mathematics" && q.moduleNumber === 1).map((q) => q.id),
    },
    {
      id: "sec-sat-m-2",
      name: "Mathematics - Module 2",
      durationMinutes: 35,
      questionIds: SAT_QUESTIONS.filter((q) => q.section === "Mathematics" && q.moduleNumber === 2).map((q) => q.id),
    },
  ],
  isAdaptive: true,
};

// 2. GRE Official Shorter General Test Full Simulation (55 Questions, 118 mins)
export const GRE_FULL_MOCK_TEST: MockTest = {
  id: "gre-mock-full-55",
  examId: "gre",
  title: "GRE General Official Full-Length Exam (55 Questions)",
  description: "Authentic shorter GRE General format: 1 Analytical Writing Issue task (30m), 27 Verbal Reasoning questions (Modules 1 & 2), and 27 Quantitative Reasoning questions (Modules 1 & 2). 1 hour and 58 minutes testing time.",
  type: "full_length",
  durationMinutes: 118,
  totalQuestions: 55,
  difficulty: "hard",
  instructions: [
    "Section 1: Analytical Writing 'Analyze an Issue' essay task (30 minutes).",
    "Section 2: 27 Verbal Reasoning questions across Module 1 (12 Qs, 18m) and Module 2 (15 Qs, 23m).",
    "Section 3: 27 Quantitative Reasoning questions across Module 1 (12 Qs, 21m) and Module 2 (15 Qs, 26m).",
  ],
  questions: GRE_QUESTIONS,
  sections: [
    {
      id: "sec-gre-aw",
      name: "Analytical Writing (Issue Task)",
      durationMinutes: 30,
      questionIds: GRE_QUESTIONS.filter((q) => q.section === "Analytical Writing").map((q) => q.id),
    },
    {
      id: "sec-gre-v-1",
      name: "Verbal Reasoning - Module 1",
      durationMinutes: 18,
      questionIds: GRE_QUESTIONS.filter((q) => q.section === "Verbal Reasoning" && q.moduleNumber === 1).map((q) => q.id),
    },
    {
      id: "sec-gre-v-2",
      name: "Verbal Reasoning - Module 2",
      durationMinutes: 23,
      questionIds: GRE_QUESTIONS.filter((q) => q.section === "Verbal Reasoning" && q.moduleNumber === 2).map((q) => q.id),
    },
    {
      id: "sec-gre-q-1",
      name: "Quantitative Reasoning - Module 1",
      durationMinutes: 21,
      questionIds: GRE_QUESTIONS.filter((q) => q.section === "Quantitative Reasoning" && q.moduleNumber === 1).map((q) => q.id),
    },
    {
      id: "sec-gre-q-2",
      name: "Quantitative Reasoning - Module 2",
      durationMinutes: 26,
      questionIds: GRE_QUESTIONS.filter((q) => q.section === "Quantitative Reasoning" && q.moduleNumber === 2).map((q) => q.id),
    },
  ],
  isAdaptive: true,
};

// 3. GMAT Focus Edition Full-Length Simulation (64 Questions, 135 mins)
export const GMAT_FULL_MOCK_TEST: MockTest = {
  id: "gmat-mock-full-64",
  examId: "gmat",
  title: "GMAT Focus Edition Full-Length Simulation (64 Questions)",
  description: "Authentic GMAT Focus Edition format: 21 Quantitative Reasoning (Problem Solving; no geometry), 23 Verbal Reasoning (Critical Reasoning & Reading Comprehension; no sentence correction), and 20 Data Insights. 2 hours and 15 minutes testing time.",
  type: "full_length",
  durationMinutes: 135,
  totalQuestions: 64,
  difficulty: "hard",
  instructions: [
    "Section 1: 21 Quantitative Reasoning questions (45 minutes, Problem Solving; no geometry).",
    "Section 2: 23 Verbal Reasoning questions (45 minutes, Critical Reasoning and Reading Comprehension; no sentence correction).",
    "Section 3: 20 Data Insights questions (45 minutes, Data Sufficiency, Multi-Source, Table Analysis, Two-Part Analysis).",
  ],
  questions: GMAT_QUESTIONS,
  sections: [
    {
      id: "sec-gmat-quant",
      name: "Quantitative Reasoning (Problem Solving)",
      durationMinutes: 45,
      questionIds: GMAT_QUESTIONS.filter((q) => q.section === "Quantitative Reasoning").map((q) => q.id),
    },
    {
      id: "sec-gmat-verbal",
      name: "Verbal Reasoning (CR & RC)",
      durationMinutes: 45,
      questionIds: GMAT_QUESTIONS.filter((q) => q.section === "Verbal Reasoning").map((q) => q.id),
    },
    {
      id: "sec-gmat-di",
      name: "Data Insights (DS, MSR, Table, Two-Part)",
      durationMinutes: 45,
      questionIds: GMAT_QUESTIONS.filter((q) => q.section === "Data Insights").map((q) => q.id),
    },
  ],
  isAdaptive: true,
};

// Sectional Practice Mocks
export const SAT_RW_SECTION_MOCK: MockTest = {
  id: "sat-rw-54",
  examId: "sat",
  title: "Digital SAT Reading & Writing Section (54 Questions)",
  description: "Complete 54-question Reading and Writing battery across Modules 1 & 2.",
  type: "section_wise",
  durationMinutes: 64,
  totalQuestions: 54,
  difficulty: "medium",
  instructions: [
    "54 questions covering Craft & Structure, Information & Ideas, Standard English Conventions, and Expression of Ideas.",
  ],
  questions: SAT_QUESTIONS.filter((q) => q.section === "Reading and Writing"),
  sections: [
    {
      id: "sec-sat-rw-all",
      name: "Reading and Writing (Modules 1 & 2)",
      durationMinutes: 64,
      questionIds: SAT_QUESTIONS.filter((q) => q.section === "Reading and Writing").map((q) => q.id),
    },
  ],
  isAdaptive: true,
};

export const SAT_MATH_SECTION_MOCK: MockTest = {
  id: "sat-math-44",
  examId: "sat",
  title: "Digital SAT Mathematics Section (44 Questions)",
  description: "Complete 44-question Mathematics battery across Modules 1 & 2.",
  type: "section_wise",
  durationMinutes: 70,
  totalQuestions: 44,
  difficulty: "medium",
  instructions: [
    "44 questions covering Algebra, Advanced Math, Problem Solving & Data Analysis, and Geometry & Trigonometry.",
  ],
  questions: SAT_QUESTIONS.filter((q) => q.section === "Mathematics"),
  sections: [
    {
      id: "sec-sat-m-all",
      name: "Mathematics (Modules 1 & 2)",
      durationMinutes: 70,
      questionIds: SAT_QUESTIONS.filter((q) => q.section === "Mathematics").map((q) => q.id),
    },
  ],
  isAdaptive: true,
};

export const OFFICIAL_MOCK_TESTS: MockTest[] = [
  SAT_FULL_MOCK_TEST,
  GRE_FULL_MOCK_TEST,
  GMAT_FULL_MOCK_TEST,
  SAT_RW_SECTION_MOCK,
  SAT_MATH_SECTION_MOCK,
];

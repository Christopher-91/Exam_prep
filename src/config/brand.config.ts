/**
 * Centralized Branding Configuration
 * Clean enterprise EdTech design identity.
 * Rebrand the entire platform by modifying properties in this file.
 */

export const BRAND_CONFIG = {
  name: "Acuity Learning Systems",
  shortName: "Acuity",
  legalName: "Acuity Educational Technologies, Inc.",
  tagline: "Standardized Examination Preparation & Cognitive Development Platform",
  description: "An enterprise-grade learning system providing rigorous examination preparation, spaced repetition memory retention, interactive STEM simulations, and career guidance.",
  version: "3.0.0",
  
  supportEmail: "support@acuityedu.com",
  admissionsHelpline: "+1 (800) 428-2848",
  
  // Theme & Restrained Palette
  theme: {
    primaryColor: "#1e3a8a", // Refined Oxford Navy
    primaryDark: "#0f172a",  // Slate 900
    accentColor: "#2563eb",  // Classic Royal Blue
    neutralBackground: "#f8fafc", // Clean Slate 50
    neutralBorder: "#e2e8f0",    // Crisp Slate 200
  },

  // Supported Examinations (Strictly Official Testing Specifications)
  supportedExams: [
    {
      id: "sat",
      name: "Digital SAT",
      code: "SAT",
      provider: "College Board",
      maxScore: 1600,
      minScore: 400,
      totalQuestions: 98,
      defaultDurationMinutes: 134, // 2 hours 14 minutes
      sections: ["Reading and Writing (54 questions)", "Mathematics (44 questions)"],
      sectionDetails: [
        { name: "Reading and Writing", questions: 54, durationMinutes: 64, modules: 2 },
        { name: "Mathematics", questions: 44, durationMinutes: 70, modules: 2 },
      ],
      scoringFormula: "Scaled 400–1600 (Reading & Writing 200–800, Mathematics 200–800)",
      description: "98 total questions (54 Reading and Writing, 44 Math). Total Testing Time: 2 hours and 14 minutes (134 minutes)."
    },
    {
      id: "gre",
      name: "GRE General Test",
      code: "GRE",
      provider: "Educational Testing Service (ETS)",
      maxScore: 340,
      minScore: 260,
      totalQuestions: 55, // 54 questions + 1 essay
      defaultDurationMinutes: 118, // About 1 hour 58 minutes
      sections: ["Analytical Writing (1 essay)", "Verbal Reasoning (27 questions)", "Quantitative Reasoning (27 questions)"],
      sectionDetails: [
        { name: "Analytical Writing", questions: 1, durationMinutes: 30, modules: 1 },
        { name: "Verbal Reasoning", questions: 27, durationMinutes: 41, modules: 2 },
        { name: "Quantitative Reasoning", questions: 27, durationMinutes: 47, modules: 2 },
      ],
      scoringFormula: "Scaled 130–170 Verbal, 130–170 Quant, 0.0–6.0 Analytical Writing",
      description: "54 to 55 total questions (27 Verbal Reasoning, 27 Quantitative Reasoning, plus 1 Analytical Writing essay task). Total Testing Time: About 1 hour and 58 minutes."
    },
    {
      id: "gmat",
      name: "GMAT Focus Edition",
      code: "GMAT",
      provider: "Graduate Management Admission Council (GMAC)",
      maxScore: 805,
      minScore: 205,
      totalQuestions: 64,
      defaultDurationMinutes: 135, // 2 hours 15 minutes
      sections: ["Quantitative Reasoning (21 questions)", "Verbal Reasoning (23 questions)", "Data Insights (20 questions)"],
      sectionDetails: [
        { name: "Quantitative Reasoning", questions: 21, durationMinutes: 45, modules: 1 },
        { name: "Verbal Reasoning", questions: 23, durationMinutes: 45, modules: 1 },
        { name: "Data Insights", questions: 20, durationMinutes: 45, modules: 1 },
      ],
      scoringFormula: "Scaled 205–805 in 10-point intervals (Sectional scores 60–90)",
      description: "64 total questions (21 Quantitative Reasoning, 23 Verbal Reasoning, 20 Data Insights). Total Testing Time: 2 hours and 15 minutes."
    },
    {
      id: "jee-main",
      name: "JEE Main",
      code: "JEE",
      provider: "National Testing Agency (NTA)",
      maxScore: 300,
      minScore: -75,
      sections: ["Physics", "Chemistry", "Mathematics"],
      defaultDurationMinutes: 180,
      scoringFormula: "+4 marks for correct, -1 mark for incorrect, 0 for unattempted",
      description: "National engineering entrance assessment for premier technical universities."
    }
  ]
};

export type SupportedExamId = "sat" | "gre" | "gmat" | "jee-main";

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

  // Supported Examinations
  supportedExams: [
    {
      id: "sat",
      name: "Digital SAT",
      code: "SAT",
      provider: "College Board",
      maxScore: 1600,
      minScore: 400,
      sections: ["Reading & Writing", "Mathematics"],
      defaultDurationMinutes: 134,
      scoringFormula: "Scaled 400–1600 (Sectional equating 200–800)",
      description: "Standardized undergraduate college admissions examination."
    },
    {
      id: "gre",
      name: "GRE General Test",
      code: "GRE",
      provider: "Educational Testing Service (ETS)",
      maxScore: 340,
      minScore: 260,
      sections: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
      defaultDurationMinutes: 118,
      scoringFormula: "Scaled 130–170 per section + 0–6 Analytical Writing",
      description: "Graduate school admissions assessment measuring verbal, quantitative, and analytical reasoning."
    },
    {
      id: "gmat",
      name: "GMAT Focus Edition",
      code: "GMAT",
      provider: "Graduate Management Admission Council (GMAC)",
      maxScore: 805,
      minScore: 205,
      sections: ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
      defaultDurationMinutes: 135,
      scoringFormula: "Scaled 205–805 in 10-point score intervals",
      description: "Graduate business school admissions examination."
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

/**
 * Centralized Branding Configuration
 * Change [Platform Name], company details, and default themes here.
 */

export const BRAND_CONFIG = {
  // Centralized brand name - change here to update across the entire platform
  name: "ApexLearn AI",
  shortName: "ApexLearn",
  legalName: "ApexLearn Education Inc.",
  tagline: "Intelligent Learning, Exam Preparation & Career Acceleration Ecosystem",
  description: "A unified AI-powered educational platform bringing together competitive exam prep, personalized spaced repetition, interactive STEM for young learners, career counselling, and academic productivity.",
  version: "2.4.0",
  
  supportEmail: "support@apexlearn.ai",
  counsellingHelpline: "+1 (800) 555-APEX",
  
  // Theme & Appearance
  theme: {
    primaryColor: "#4f46e5", // Indigo 600
    accentColor: "#0ea5e9", // Sky 500
    successColor: "#10b981", // Emerald 500
    warningColor: "#f59e0b", // Amber 500
    dangerColor: "#ef4444", // Rose 500
    neutralDark: "#0f172a", // Slate 900
    neutralBorder: "#e2e8f0", // Slate 200
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
      sections: ["Reading and Writing", "Mathematics"],
      defaultDurationMinutes: 134,
      scoringFormula: "Scaled 400-1600 (200-800 per section)",
      description: "Standardized admissions test widely used for college admissions in the United States."
    },
    {
      id: "gre",
      name: "GRE General Test",
      code: "GRE",
      provider: "ETS",
      maxScore: 340,
      minScore: 260,
      sections: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
      defaultDurationMinutes: 118,
      scoringFormula: "130-170 per section + 0-6 AWA",
      description: "Graduate school entry exam measuring verbal, quantitative, and analytical writing skills."
    },
    {
      id: "gmat",
      name: "GMAT Focus Edition",
      code: "GMAT",
      provider: "GMAC",
      maxScore: 805,
      minScore: 205,
      sections: ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
      defaultDurationMinutes: 135,
      scoringFormula: "Scaled 205-805 (in 10-point increments)",
      description: "Premier assessment for admission to graduate business programs globally."
    },
    {
      id: "jee-main",
      name: "JEE Main",
      code: "JEE",
      provider: "NTA",
      maxScore: 300,
      minScore: -75,
      sections: ["Physics", "Chemistry", "Mathematics"],
      defaultDurationMinutes: 180,
      scoringFormula: "+4 for correct, -1 for incorrect, 0 for unattempted",
      description: "National-level entrance exam for top engineering institutes including NITs and IIITs."
    }
  ]
};

export type SupportedExamId = "sat" | "gre" | "gmat" | "jee-main";


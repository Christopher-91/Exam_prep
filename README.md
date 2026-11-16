# Acuity Learning Systems — Institutional Examination & Academic Intelligence Platform

An enterprise-grade educational SaaS platform designed for universities, secondary schools, students, parents, and working professionals. Acuity unifies psychometric competitive exam preparation, SuperMemo SM-2 active recall spaced repetition, interactive STEM simulations for young learners, career advisory, and academic productivity into a minimalist, information-oriented ecosystem.

---

## Architectural & Design Philosophy

Acuity Learning Systems adheres strictly to an **established enterprise EdTech design standard**:
- **Information-Dense & Minimalist**: Restrained Oxford Navy (`#1e3a8a`), slate charcoal text (`#0f172a`), neutral fills (`#f8fafc`), hairline borders (`#e2e8f0`), and generous whitespace.
- **No AI Startup Clutter**: Elimination of excessive gradients, glowing purple themes, floating chat bubbles, sparkle icons, and decorative gimmicks.
- **Underlying Intelligence**: AI and psychometrics operate as underlying analytical engines (Item Response Theory, latent ability estimation, spaced repetition memory curves), not as superficial branding.

---

## Key Modules & Capabilities

### 1. Complete Authentication & Route Protection Suite
- **Institutional Login (`/login`)**: Email/password authentication, show/hide password toggle, Remember Me persistence, Google SSO, and 1-click demo role credentials (Student, Parent, Professional, Admin).
- **Candidate Registration (`/signup`)**: Full name, email, password confirmation, account role classification (Student, Parent, Professional), and terms confirmation.
- **Account Recovery & Verification**:
  - `/forgot-password`: Automated password reset link dispatch.
  - `/reset-password`: Secure credential update interface.
  - `/verify-email`: 6-digit OTP code verification.
- **Contextual Onboarding (`/onboarding`)**: Post-registration questionnaire tailored to candidate role:
  - *Student*: Target examination (SAT, GRE, GMAT, JEE), target score, target examination date, and daily study hours.
  - *Parent*: Child profile setup, age tier assignment, and screen time preferences.
  - *Professional*: Target career track, years of experience, and desired compensation range.
- **Route Guarding**: Protected routes redirect unauthenticated users to `/login`. Sign-out clears local persistence and returns to sign-in.

### 2. Psychometric Exam Preparation Hub (`/exam-prep`)
- Comprehensive preparation for **Digital SAT, GRE General Test, GMAT Focus Edition, and JEE Main** (extensible schema).
- Official testing software interface with persistent countdown timer, question navigator palette, Desmos-compatible graphing calculator, mark-for-review flags, and submission confirmation.
- **Item Response Theory (IRT) Adaptive Diagnostic Engine (`/exam-prep/adaptive`)**: Real-time calibration of latent cognitive ability ($\theta$) mapped across standardized percentile distributions.
- **Official Score Report (`/exam-prep/results/[id]`)**: Standardized scaled scores, percentile ranks, sectional accuracy tables, distractor analysis, and detailed pedagogical explanations.

### 3. Spaced Repetition & Flashcards (`/flashcards`)
- Mathematically calibrated **SuperMemo SM-2 spaced repetition protocol** adjusting review intervals based on retrieval difficulty ratings (`Again [1]`, `Hard [2]`, `Good [3]`, `Easy [4]`).
- Fast automated card generation from raw lecture notes or textbook excerpts.
- Multi-deck management with ease factor and repetition interval tracking.

### 4. Interactive STEM Studio for Young Learners (`/interactive-learning`)
- **Three age-tiered environments**:
  - *Ages 3–5*: Early Exploration (counting safari, shape & color pattern recognition)
  - *Ages 6–8*: Foundational STEM (fractions, balance scale equations, biological life sciences)
  - *Ages 9–12*: Reasoning & Physics (orbital gravity, algebraic balance puzzles, ecosystems)
- **3 Live Canvas & SVG Simulations**:
  - *Gravity & Orbit Simulator*: Real-time orbital mechanics engine with adjustable gravitational mass and velocity vectors.
  - *Visual Algebra Balance Scale*: Interactive balance scale to isolate unknown variables $[X]$.
  - *Fraction Explorer & Slicer*: Equivalence fraction bars and geometric pizza divisions.
- 100% ad-free, COPPA/FERPA student data compliant sandbox.

### 5. Career Advisory & Professional Trajectory (`/career-counselling`)
- Interactive RIASEC career aptitude assessment with domain matching.
- Comprehensive career profiles with growth projections, median compensation, and educational requirements.
- Side-by-side career comparison matrix.
- Skill gap diagnostics isolating areas to bridge for targeted transitions.
- 1:1 verified expert advisor booking system with calendar invitations and video room links.

### 6. Academic Productivity & Study Planner (`/study-planner`)
- Time-blocked study schedule aligned with peak cognitive performance windows.
- Task management queue with priority tags, subtask checklists, and deadline tracking.
- Workload balancing and calendar synchronization with Google Calendar and Microsoft Outlook.
- **1-Click `.ICS` iCal file export**.

### 7. Performance Analytics & Readiness Forecasting (`/analytics`)
- Statistical score band forecasting model with confidence intervals.
- Limiting bottleneck identification with targeted study recommendations.
- Speed vs. accuracy tradeoff visualizations.

### 8. Institutional Administration & Content Governance (`/admin`)
- Test item authoring and pedagogical approval pipeline.
- Examination blueprints and scoring model configurations.
- Candidate directory and platform audit compliance trail.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Design Tokens**: Centralized enterprise palette in `globals.css`
- **Visualizations**: Recharts
- **Simulations**: HTML5 Canvas & SVG
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/Christopher-91/Exam_prep.git
cd Exam_prep

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## Centralized Brand Configuration

All branding tokens, institution names, taglines, and supported examination models are configured centrally in:
```typescript
src/config/brand.config.ts
```
Modifying this single file propagates brand updates across all headers, score reports, calendars, and authentication portals.

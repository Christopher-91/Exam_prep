# ApexLearn AI — Intelligent Learning & Exam Preparation Ecosystem

An AI-powered educational SaaS platform that brings together competitive exam preparation, active recall spaced repetition, interactive STEM simulations for young learners, career counselling, and academic productivity tools.
---

## 🌟 Key Modules & Capabilities

1. **AI-Powered Exam Preparation**
   - Comprehensive prep for **Digital SAT, GRE General Test, GMAT Focus Edition, and JEE Main** (extensible architecture).
   - Official simulation test interface with section timer, question navigator palette, Desmos-compatible graphing calculator, and review dialogs.
   - **Item Response Theory (IRT) AI Adaptive Testing Engine** that calibrates question difficulty in real time based on demonstrated latent ability ($\theta$).
   - Psychometric scoring and results breakdown with percentile estimates and AI pedagogical feedback.

2. **Spaced Repetition & Flashcards (SuperMemo SM-2)**
   - Active recall review interface with 4-level rating buttons (`Again [1]`, `Hard [2]`, `Good [3]`, `Easy [4]`) that calculate dynamic review intervals.
   - AI flashcard synthesizer that converts raw lecture notes or textbook excerpts into active recall cards.
   - Multi-deck organization and retention analytics.

3. **Interactive STEM Learning for Children (Ages 3–12)**
   - **Three age-tiered environments**:
     - *Ages 3–5*: Early Exploration (counting safari, shape & color matching)
     - *Ages 6–8*: Foundational STEM (fractions, balance scale, life sciences)
     - *Ages 9–12*: Reasoning & Physics (orbital gravity, algebra, ecosystems)
   - **3 Live Canvas & SVG Simulations**:
     - *Gravity & Orbit Simulator*: Real-time orbital physics engine with adjustable star mass and launch velocity.
     - *Visual Algebra Balance Scale*: Interactive balance scale to solve for mystery weight $[X]$.
     - *Fraction Explorer & Slicer*: Visual fraction bars and pizza dividers showing equivalence ($1/2 = 2/4 = 4/8$).
   - COPPA/FERPA-aligned, 100% ad-free sandbox with parental screen-time controls.

4. **AI Career Counselling & Exploration**
   - Interactive RIASEC career aptitude assessment.
   - Comprehensive career profiles with growth rates, median compensation, and educational pathways.
   - Side-by-side career comparison matrix.
   - Intelligent job matching & skill gap analysis.
   - 1:1 verified expert counsellor booking system with video link integration.

5. **Study Planner & Productivity Hub**
   - Time-blocked study schedule aligned with peak cognitive performance windows.
   - Task manager with priorities, subtasks, and deadline tracking.
   - AI smart schedule generator.
   - Calendar sync with Google / Outlook and **1-click `.ICS` file export**.

6. **Predictive Examination Readiness Engine**
   - Statistical score band forecasting model with confidence intervals.
   - Limiting bottleneck identification with targeted study recommendations.
   - Speed vs. accuracy tradeoff visualizations.

7. **Contextual AI Learning Assistant**
   - Floating and dockable AI copilot that understands your current module, target exam, and weak topics.

8. **Role-Adaptive Multi-Dashboard Experience**
   - Immediate switching between **Student**, **Parent**, **Working Professional**, and **Administrator** dashboard modes.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts & Visualizations**: Recharts
- **Physics & Canvas**: HTML5 Canvas & SVG

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm

### Installation

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

## 📄 Centralized Rebranding

The platform's name, description, supported examinations, and themes are centralized in:

```typescript
src/config/brand.config.ts
```

Change the brand configuration in one file to update branding across the entire platform.


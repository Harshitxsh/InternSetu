# 🇮🇳 InternSetu — AI Smart Allocation Engine for PM Internship Scheme

> **Smart India Hackathon (SIH) 2026 Edition**  
> **Ministry of Corporate Affairs (MCA), Government of India**  
> *Problem Statement: AI-Powered Fair Affirmative Allocation & Skill Bridging Engine for the Prime Minister's Internship Scheme*

---

## 📌 Overview

**InternSetu** is an interactive, high-fidelity AI Smart Allocation Engine designed to revolutionize how 1.25 Crore youth across India are matched with top 500 enterprise internship opportunities under the **Prime Minister's Internship Scheme (PMIS)**.

Standard hiring pipelines often suffer from prestige bias favoring Tier-1 institutions and keyword-stuffed resumes. InternSetu solves this by combining:
1. **Affirmative Equity Normalization**: Mathematical multipliers for rural colleges, Tier-3 government polytechnics, first-generation graduates, and Aspirational Districts.
2. **Anti-Fluff Credibility Scoring**: Optical OCR and cross-referencing heuristics to verify genuine human artifacts and eliminate AI hallucination.
3. **1536-Dimensional Semantic Embeddings**: Matching candidate competencies against live corporate requirements across Tata Motors, L&T, Infosys Springboard, Reliance Jio, and HDFC Bank.
4. **Gamified Skill Quests Roadmap**: Micro-learning quests with real-time **`+X% Eligibility`** score boosts and celebration mechanics.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Modern Government Design System with deep blues, saffron accents, and emerald indicators)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Gamification / Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🏛️ Core Features

### 1. Official Government Aesthetic & MCA Branding
- Prominent integration of the official **Ministry of Corporate Affairs (MCA) emblem** (`13.png`) in the header, hero section, provisional allocation pass, and footer.
- Live DBT Stipend Tracker (**₹5,000/month Govt Direct Benefit Transfer** + company allowance).

### 2. Candidate Intake Dashboard
- **Demographic & Equity Input**: Annual income tier, social category (OBC, SC, ST, EWS, Gen), institute tier, and first-generation graduate toggle.
- **Academic Credentials**: Degree, branch, passing year, interactive CGPA slider, and technical tag manager.
- **Resume PDF Dropzone**: Interactive drag-and-drop parser with pre-loaded sample resumes for instant 1-click evaluation.

### 3. 5-Stage Dynamic AI Simulation Pipeline
Simulates a multi-stage backend neural processing workflow:
- **Stage 1**: Optical OCR & Entity Extraction (PyMuPDF + LayoutLMv3)
- **Stage 2**: Anti-Fluff & Credibility Scoring (Authenticity validation)
- **Stage 3**: MCA Affirmative Action Weightage Calculation
- **Stage 4**: Dense Vector Embeddings Matching across 500+ Top Corporates
- **Stage 5**: 100-Point Composite Allocation Index & Gap Mapping
- Features a **live streaming terminal log** (`internsetu-ai-kernel.log`) and a Fast-Forward mode for snappy presentations.

### 4. Gamified Result View & Interactive Score Boosting
- **Radial & Linear Eligibility Gauge**: Displays the composite score out of 100 with a 4-factor breakdown (Demographics, Academics, Skills, Authenticity).
- **PM Internship Openings**: High-affinity corporate matches with stipend info, location, and 1-click allocation pass generation.
- **Interactive Skill Quests**: Enterprise-sponsored micro-quests with **`+X% Eligibility`** badges. Clicking *"Complete Quest"* dynamically updates the score in real-time with celebratory confetti!

### 5. Official Provisional Allocation Pass
- Printable and downloadable provisional certificate featuring candidate registry ID, QR code seal, stipend breakdown, and digital signature hash.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- `npm` (Node Package Manager)

### Installation
Clone the repository and install the dependencies:
```bash
# Navigate to project directory
cd InternSetu

# Install dependencies
npm install
```

### Running Locally
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### Building for Production
To generate optimized production assets:
```bash
npm run build
```

---

## 🎯 Demo Walkthrough / Pitch Guide

| Step | Action | What to Highlight to Judges |
| :--- | :--- | :--- |
| **1** | Select **Priya Sharma** from the Top Navbar | Highlights a Tier-3 Rural candidate profile from Vidisha (Aspirational District). |
| **2** | Inspect **Intake Dashboard** & Click *"Execute AI Engine"* | Shows OCR text extraction and affirmative priority badges. |
| **3** | Observe the **5-Stage Processing Pipeline** | Demonstrates the terminal logs, anti-fluff checks, and vector similarity matching. |
| **4** | View the **Gamified Result Dashboard** | Showcases the 100-point eligibility gauge (baseline 76 pts) and Tata Motors / L&T internship matches. |
| **5** | Click **"Complete Quest & Boost +X%"** | Shows real-time score climb (e.g. from 76 → 84 → 95 pts) and confetti celebration. |
| **6** | Click **"Select for Allocation Pass"** | Opens the official Provisional PM Scheme Allocation Pass ready for download. |

---

## 📄 License & Attribution

Developed for the **Smart India Hackathon 2026** under the problem statement issued by the **Ministry of Corporate Affairs (MCA), Government of India**.

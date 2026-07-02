# 🏆 ACA Quiz App - Team Delta

[![Vercel Deployment](https://img.shields.io/badge/vercel-deployed-success?style=for-the-badge&logo=vercel)](https://quiz-app-starter-omega.vercel.app/)
[![TypeScript](https://img.shields.io/badge/typescript-6.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-19-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![GitHub](https://img.shields.io/badge/github-repo-181717?style=for-the-badge&logo=github)](https://github.com/tahleho3968/quiz-app-starter)

A fully-featured interactive quiz application built for **Africa Code Academy's Orientation Week**. This app tests your knowledge of the tools and concepts used to build it — making it both a quiz AND a study guide!

---

## 🚀 Live Demo

**Play the app now:** [https://quiz-app-starter-omega.vercel.app/](https://quiz-app-starter-omega.vercel.app/)

---

## 📊 Project Overview

### What We Built
A React + TypeScript quiz application with **55 questions** across **6 categories**, **6 game modes**, a 13-badge achievement system, shareable Wordle-style results, and a persistent leaderboard.

### The "Twist"
Every question in this quiz is about a concept we **actually used** to build the app. If we used `git clone`, we wrote a question about it. If we used `useState`, we wrote a question about it. By the end, we had both a working app AND a study guide for everything we learned during orientation week!

---

## ✨ Features

### 📝 55 Questions Across 6 Categories
All questions are multiple choice (4 options each).

| Category | Questions | Concepts Covered |
|----------|-----------|------------------|
| **Git & GitHub** | 12 | clone, add, commit, branch, checkout, pull, pull requests |
| **React** | 11 | Components, props, state, useState, useEffect, JSX |
| **TypeScript** | 9 | Types, interfaces, string, number, boolean |
| **Dev Tools** | 8 | npm, package.json, ESLint, Vite |
| **Deployment** | 7 | Vercel, CI/CD, build process, HTTP status codes |
| **HTML/CSS** | 8 | Flexbox, responsive design, box model, positioning |

**By difficulty:** 24 easy · 23 medium · 8 hard.

### 🎮 6 Game Modes
| Mode | Icon | Description |
|------|------|-------------|
| **Classic** | 📝 | 20 questions from your filtered pool, scored |
| **Timed** | ⏱️ | 5 minutes to answer as many as possible |
| **Survival** | 💀 | One wrong answer (or timeout) = game over |
| **Marathon** | 🏃 | All 55 questions, no filters applied |
| **Daily Challenge** | 📅 | Same 55 questions, same order, for every player each day (seeded shuffle) |
| **Category Lock** | 🎯 | All questions from exactly one category |

### 🏅 Badge System
13 unlockable badges stored in `localStorage`:

👣 First Steps · 💯 Perfectionist · ⚡ Speed Demon · 🔥 Hot Streak · 📚 Git Master · ⚛️ React Pro · 🦕 TypeScript Guru · 🔧 Dev Tools Master · 🚀 Deployment Pro · 🎨 CSS Stylist · 💪 Comeback Kid · 🏃 Marathon Runner · 🎓 Scholar

### 📤 Shareable Results
A Wordle-style result grid you can copy and paste anywhere:
```
🏆 ACA Quiz Challenge - 07/03/2026

Paki scored 18/20 (90%)

🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟥
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩

🟩 Correct: 18
🟥 Wrong: 1
⬜ Skipped: 1

Mode: Classic
Can you beat my score? 🎯
#ACAQuiz #TeamDelta
```

### 🏆 Leaderboard
- Top 5 all-time high scores, shown on the setup screen
- Tracks score, correct/total, best streak, categories, and difficulty per entry
- Saved automatically to `localStorage` (local to each device/browser — there's no shared backend)

---

## 🛠️ Tech Stack

| Tool | Version | What it does |
|------|---------|--------------|
| **React** | 19.2.7 | UI framework |
| **TypeScript** | ~6.0.2 | Type-safe JavaScript |
| **Vite** | ^8.1.0 | Build tool and dev server |
| **ESLint** | ^10.6.0 | Code quality and error checking |
| **Prettier** | ^3.9.1 | Automatic code formatting |
| **Vercel** | — | Deployment |
| **Git + GitHub** | — | Version control and collaboration |

---

## 📁 Project Structure

```
quiz-app-starter/
├── src/
│   ├── components/
│   │   ├── BadgeToast.tsx      # Badge notification popup
│   │   ├── QuestionCard.tsx    # Question display, timer, progress bar
│   │   ├── ResultCard.tsx      # Results display
│   │   ├── ReviewScreen.tsx    # Answer review
│   │   ├── SetupScreen.tsx     # Quiz setup: categories, difficulty, game mode
│   │   └── ShareCard.tsx       # Shareable results
│   ├── data/
│   │   └── questions.ts        # 55 questions
│   ├── hooks/
│   │   ├── useBadges.ts        # Badge system logic
│   │   └── useLocalStorage.ts  # LocalStorage helper
│   ├── types/
│   │   └── quiz.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── seededRandom.ts     # Mulberry32 seeded random for daily challenge
│   ├── App.tsx                 # Main app component and state machine
│   ├── App.css                 # Styling
│   └── main.tsx                # Entry point
├── public/
│   └── favicon.svg
├── .github/workflows/          # CI pipeline
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18 or higher (React 19 / Vite 8 require a recent Node version)
- npm

### Installation

```bash
git clone https://github.com/tahleho3968/quiz-app-starter.git
cd quiz-app-starter
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Available Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 📋 Git Workflow Used

### Branching Strategy
Feature branches with kebab-case naming, e.g. `feature/better-results-page`, `feature/complete-quiz-app`, `feature/category-difficulty-filters`.

### Workflow Steps
```bash
# 1. Create feature branch
git checkout -b feature/description

# 2. Make changes and commit often
git add .
git commit -m "feat: Add new feature"

# 3. Push to GitHub
git push -u origin feature/description

# 4. Open a Pull Request, get peer review, then merge

# 5. Update local master
git checkout master
git pull origin master
```

Full command-by-command history is in [`GIT_COMMANDS_LOG.md`](./GIT_COMMANDS_LOG.md).

---

## 👥 Team Delta

| Member | Role |
|--------|------|
| **Majobe (LS)** | Team Lead |
| **Bontle** | Contributed early on the team, left the project partway through |
| **Tahleho (LS)** | Setup screen, category/difficulty filters, timer, streak scoring, leaderboard, game modes, question bank |
| **Thoriso** | State management, quiz logic |
| **Neelo (BW)** | Animations, transitions |
| **Mosito** | Joined partway through the project |

*(Double-check this table reflects what each person actually shipped before submitting — some of it was drafted rather than confirmed against commit history.)*

---

## 🎯 What We Learned

### Technical Skills
- Building React apps with TypeScript
- Managing state with React Hooks (useState, useEffect, useMemo, useRef)
- Custom hooks, localStorage persistence
- Vite for fast builds, deploying to Vercel with auto-deploy
- Writing TypeScript interfaces and types
- Seeded random generation for reproducible daily challenges

### Git & Collaboration
- Feature branch workflow, Pull Requests, code review
- Resolving merge conflicts
- Writing meaningful commit messages

### Soft Skills
- Team communication and coordination
- Debugging under a deadline
- Giving and receiving feedback

---

## 🔗 Links

| Link | URL |
|------|-----|
| **Live App** | https://quiz-app-starter-omega.vercel.app/ |
| **GitHub Repo** | https://github.com/tahleho3968/quiz-app-starter |

---

## 🙏 Acknowledgments

- **Africa Code Academy** — for the learning opportunity
- **Elias, Tsogang, Montso** — for guidance and support
- **Team Delta** — for the teamwork

---

## 📝 License

Built for educational purposes as part of the Africa Code Academy Orientation Week.

---

**Built by Team Delta at Africa Code Academy** 🇱🇸

*Orientation Week - July 2026*
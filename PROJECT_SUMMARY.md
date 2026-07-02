# 🎯 ACA Quiz App - Project Summary

## 📋 Project Overview

**Project Name:** ACA Quiz App
**Team:** Team Delta
**Duration:** Orientation Week (June 30 – July 3, 2026)
**Goal:** Build a React + TypeScript quiz app that tests knowledge of the tools used to build it

---

## 📊 Final Statistics

| Metric | Count |
|--------|-------|
| **Total Questions** | 55 |
| **Categories** | 6 |
| **Game Modes** | 6 |
| **Badges** | 13 |
| **Question Format** | Multiple choice, 4 options |

*(PR count, files changed, and lines added/removed were removed from this table — pull the real numbers from GitHub's Insights tab rather than estimating, since those are easy to verify and worth getting exactly right for a submission.)*

---

## ✅ Requirements Met

### Core Requirements (All ✅)
- [x] At least 20 questions (55 provided)
- [x] Multiple choice format
- [x] Score tracking, displayed in real time
- [x] Score/progress persists across page reloads (localStorage)
- [x] Deployed to Vercel with a working live URL
- [x] Feature-branch Git workflow with meaningful commits
- [x] 2+ merged PRs *(confirm your actual count before submitting)*

### Stretch Goals Delivered
- [x] Timer per question with speed bonuses
- [x] Difficulty levels (easy/medium/hard)
- [x] Category filtering
- [x] Animations/transitions between questions
- [x] Badge system (13 badges)
- [x] 6 game modes
- [x] Shareable Wordle-style results
- [x] Daily challenge with seeded, reproducible question order
- [x] Leaderboard (top 5, local to device)

---

## 📊 Question Breakdown

### By Category
| Category | Questions |
|----------|-----------|
| Git & GitHub | 12 |
| React | 11 |
| TypeScript | 9 |
| Dev Tools | 8 |
| HTML/CSS | 8 |
| Deployment | 7 |
| **Total** | **55** |

### By Difficulty
| Difficulty | Questions |
|------------|-----------|
| Easy | 24 |
| Medium | 23 |
| Hard | 8 |

---

## 🎮 Game Modes

| Mode | Description | Questions | Time Limit |
|------|-------------|-----------|------------|
| **Classic** | Standard quiz | 20 (from filtered pool) | 12–20s per question by difficulty |
| **Timed** | Race the clock | As many as possible | 5 minutes total |
| **Survival** | One wrong = game over | Until first miss | 12–20s per question |
| **Marathon** | All questions, no filters | 55 | 12–20s per question |
| **Daily Challenge** | Same questions/order for everyone that day | 55 | 12–20s per question |
| **Category Lock** | One category only | Category-specific | 12–20s per question |

---

## 🏅 Badge System

| Badge | Icon | Requirement |
|-------|------|-------------|
| First Steps | 👣 | Complete your first quiz |
| Perfectionist | 💯 | Score 100% on a quiz (5+ questions) |
| Speed Demon | ⚡ | Average answer time under 5 seconds (5+ questions) |
| Hot Streak | 🔥 | 10+ correct answers in a row |
| Git Master | 📚 | 100% correct on Git questions (3+ answered) |
| React Pro | ⚛️ | 100% correct on React questions (3+ answered) |
| TypeScript Guru | 🦕 | 100% correct on TypeScript questions (3+ answered) |
| Dev Tools Master | 🔧 | 100% correct on Tooling questions (3+ answered) |
| Deployment Pro | 🚀 | 100% correct on Deployment questions (3+ answered) |
| CSS Stylist | 🎨 | 100% correct on HTML/CSS questions (3+ answered) |
| Comeback Kid | 💪 | Scored better in the second half of a run than the first |
| Marathon Runner | 🏃 | Completed 30+ questions in one session |
| Scholar | 🎓 | Answered 100 questions total across all sessions |

Stored in `localStorage`, unlock triggers a toast notification.

---

## 👥 Team Contributions

| Member | Role | Contributions |
|--------|------|----------------|
| **Majobe (LS)** | Team Lead | Coordination, code reviews |
| **Bontle** | — | Contributed early on, left the project partway through |
| **Tahleho (LS)** | Developer | Setup screen, filters, timer, streak, leaderboard, game modes, question bank |
| **Thoriso** | Logic Developer | State management, quiz logic |
| **Neelo (BW)** | Animation & Deployment | Animations, transitions, Vercel setup |
| **Mosito** | — | Joined partway through |

*(Verify this table against actual commit authorship — `git shortlog -sn` on the repo will show who committed what — before including it in a submission.)*

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.7 | UI Framework |
| TypeScript | ~6.0.2 | Type Safety |
| Vite | ^8.1.0 | Build Tool |
| ESLint | ^10.6.0 | Code Quality |
| Prettier | ^3.9.1 | Code Formatting |
| Vercel | — | Deployment |

---

## 📈 Challenges Overcome

| Challenge | Solution |
|-----------|----------|
| Merge conflicts | Resolved collaboratively |
| TypeScript type mismatches | Shared `Difficulty` type moved into `types/quiz.ts` to avoid drift between files |
| Seeded daily challenge | Implemented Mulberry32 PRNG keyed on the date |
| Survival mode losing the final answer on timeout | Deferred `finishQuiz()` to a dedicated effect keyed on a pending-finish flag, so it always reads the up-to-date answers array |
| Classic mode question count not matching its label | Capped Classic mode's question pool at 20 |

---

## 📚 What We Learned

- Building React apps with TypeScript, and managing state with hooks (useState, useEffect, useMemo, useRef)
- Custom hooks and localStorage persistence
- Vite build tooling and Vercel deployment
- Seeded random generation for reproducible daily challenges
- Git feature-branch workflow, Pull Requests, and code review
- Working through stale-closure bugs in React `useEffect`

---

## 🔗 Project Links

| Link | URL |
|------|-----|
| **Live App** | https://quiz-app-starter-omega.vercel.app/ |
| **GitHub Repo** | https://github.com/tahleho3968/quiz-app-starter |

---

## 📁 Project Structure

```
quiz-app-starter/
├── src/
│   ├── components/
│   │   ├── BadgeToast.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ResultCard.tsx
│   │   ├── ReviewScreen.tsx
│   │   ├── SetupScreen.tsx
│   │   └── ShareCard.tsx
│   ├── data/questions.ts
│   ├── hooks/
│   │   ├── useBadges.ts
│   │   └── useLocalStorage.ts
│   ├── types/quiz.ts
│   ├── utils/seededRandom.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── public/favicon.svg
├── .github/workflows/
├── CONTRIBUTING.md
├── DEPLOYMENT.md
├── GIT_COMMANDS_LOG.md
├── PROJECT_SUMMARY.md
├── README.md
└── package.json
```

---

## 🎯 Submission Checklist

- [ ] Forked GitHub repository URL with clean commit history
- [ ] Live Vercel deployment link works
- [ ] README includes: what the app does, how to run it locally, what you learned
- [ ] 2+ merged PRs *(confirm the real number)*
- [ ] All docs actually **committed and pushed** — as of writing this, `README.md` on `master` was still the original starter template, so double-check this is done
- [ ] CI actually runs on push *(see DEPLOYMENT.md — there's a branch-name mismatch to fix first)*

---

**Team Delta - Africa Code Academy Orientation Week 2026**
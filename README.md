# Quiz App Starter

Starter template for the ACA orientation quiz project. Fork this repo and build your own quiz app.

## Your README goes here

**Replace this entire file** with your own README once you start building. A good project README includes:

### 1. What it is
One or two sentences describing your quiz app — what topics it covers, what makes it yours.

### 2. Live demo
Link to your deployed Vercel URL.

### 3. How to run locally

```bash
git clone git@github.com:YOUR-USERNAME/quiz-app-starter.git
cd quiz-app-starter
npm install
npm run dev
```

### 4. What you learned
A short reflection — what concepts clicked, what was hard, what you'd do differently.

---

## Starter structure

```
src/
├── components/     ← Build your UI components here
├── data/
│   └── questions.ts   ← Your quiz questions (1 example included)
├── hooks/
│   └── useLocalStorage.ts  ← Optional helper for persisting state
├── types/
│   └── quiz.ts        ← Question type definition
├── App.tsx            ← Your starting point
├── App.css            ← Minimal styles — make it your own
├── index.css          ← Base reset
└── main.tsx           ← Entry point (no need to edit)
```

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the dev server at localhost:5173 |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

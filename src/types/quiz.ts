export type Category =
  | "git"
  | "react"
  | "typescript"
  | "tooling"
  | "deployment"
  | "html-css";

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "fill-blank"
  | "code-snippet"
  | "matching"
  | "ordering";

export type GameMode =
  | "classic"
  | "timed"
  | "survival"
  | "marathon"
  | "daily"
  | "category-lock";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: Category;
  difficulty: Difficulty;
  explanation: string;
  type?: QuestionType; // Optional for future expansion
}

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 100,
  medium: 150,
  hard: 200,
};

export const DIFFICULTY_TIME_LIMIT: Record<Difficulty, number> = {
  easy: 20,
  medium: 15,
  hard: 12,
};

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  correct: number;
  total: number;
  bestStreak: number;
  categories: string;
  difficulty: string;
  date: string;
  mode?: GameMode;
  avgTime?: number;
}
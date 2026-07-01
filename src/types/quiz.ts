export type Category =
  "git" | "react" | "typescript" | "tooling" | "deployment" | "html-css";

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: Category;
  difficulty: Difficulty;
  explanation: string;
}

/** Points awarded for a correct answer at each difficulty level. */
export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 100,
  medium: 150,
  hard: 200,
};

/** How many seconds a player gets to answer a question at each difficulty. */
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
}

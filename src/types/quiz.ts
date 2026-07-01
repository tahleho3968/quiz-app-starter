export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: "git" | "react" | "typescript" | "tooling" | "deployment" | "html-css";
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
}

export type Difficulty = "all" | "easy" | "medium" | "hard";
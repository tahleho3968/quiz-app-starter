export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: "git" | "react" | "typescript" | "tooling" | "deployment" | "html-css";
  explanation: string;
}
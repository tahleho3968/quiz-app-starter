import type { Question } from "../types/quiz";

// This is an example question to show the data structure.
// Replace it and add your own — you need at least 20 questions
// spanning all six categories.

const questions: Question[] = [
  {
    id: 1,
    question: "What does `git clone` do?",
    options: [
      "Creates a new branch",
      "Downloads a repository from GitHub to your machine",
      "Uploads your code to GitHub",
      "Deletes a repository",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git clone creates a local copy of a remote repository, including its full commit history.",
  },
];

export default questions;

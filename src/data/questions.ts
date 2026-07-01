import type { Question } from "../types/quiz";

const questions: Question[] = [
  // ==========================
  // Git & GitHub
  // ==========================
  {
    id: 1,
    question: "What does `git clone` do?",
    options: [
      "Creates a new branch",
      "Downloads a repository from GitHub to your computer",
      "Uploads code to GitHub",
      "Deletes a repository",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git clone creates a complete local copy of a remote repository.",
  },
  {
    id: 2,
    question: "What does `git commit` do?",
    options: [
      "Uploads code to GitHub",
      "Saves changes to your local repository",
      "Deletes files",
      "Creates a Pull Request",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git commit saves your staged changes with a descriptive message.",
  },
  {
    id: 3,
    question: "What does `git push` do?",
    options: [
      "Downloads changes",
      "Uploads local commits to GitHub",
      "Deletes a branch",
      "Creates a repository",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git push sends your local commits to the remote repository.",
  },
  {
    id: 4,
    question: "Why do developers create branches?",
    options: [
      "To delete commits",
      "To work on features without affecting the main branch",
      "To rename repositories",
      "To install packages",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "Branches allow developers to work independently before merging changes.",
  },

  // ==========================
  // React
  // ==========================
  {
    id: 5,
    question: "What is a React component?",
    options: [
      "A CSS file",
      "A reusable piece of UI",
      "A database",
      "A Git command",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "Components let you build reusable parts of your application's interface.",
  },
  {
    id: 6,
    question: "What is `useState` used for?",
    options: [
      "Styling components",
      "Managing component state",
      "Creating routes",
      "Connecting to GitHub",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "useState allows a component to store and update data over time.",
  },
  {
    id: 7,
    question: "What does JSX allow you to do?",
    options: [
      "Write HTML-like syntax inside JavaScript",
      "Write SQL queries",
      "Deploy applications",
      "Create Git branches",
    ],
    correctAnswer: 0,
    category: "react",
    explanation:
      "JSX combines JavaScript and HTML-like syntax to describe the UI.",
  },
  {
    id: 8,
    question: "What is an event handler in React?",
    options: [
      "A CSS selector",
      "A function that responds to user actions",
      "A Git command",
      "A TypeScript interface",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "Event handlers respond to actions like clicks, typing, and form submissions.",
  },

  // ==========================
  // TypeScript
  // ==========================
  {
    id: 9,
    question: "Why do we use TypeScript?",
    options: [
      "To style pages",
      "To catch type errors before running the app",
      "To deploy applications",
      "To manage Git repositories",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation:
      "TypeScript helps developers catch errors during development.",
  },
  {
    id: 10,
    question: "What is an interface in TypeScript?",
    options: [
      "A CSS framework",
      "A way to define the structure of an object",
      "A Git command",
      "A deployment tool",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation:
      "Interfaces define the expected properties and types of objects.",
  },
  {
    id: 11,
    question: "Which is a valid TypeScript type?",
    options: ["button", "string", "screen", "folder"],
    correctAnswer: 1,
    category: "typescript",
    explanation:
      "string is one of the built-in primitive types in TypeScript.",
  },

  // ==========================
  // Dev Tools
  // ==========================
  {
    id: 12,
    question: "What does npm stand for?",
    options: [
      "Node Package Manager",
      "New Programming Method",
      "Network Package Module",
      "Node Project Manager",
    ],
    correctAnswer: 0,
    category: "tooling",
    explanation:
      "npm is the default package manager for Node.js projects.",
  },
  {
    id: 13,
    question: "What is package.json used for?",
    options: [
      "Storing project dependencies and scripts",
      "Writing CSS",
      "Hosting a website",
      "Creating Git branches",
    ],
    correctAnswer: 0,
    category: "tooling",
    explanation:
      "package.json stores project metadata, dependencies, and npm scripts.",
  },
  {
    id: 14,
    question: "What does ESLint do?",
    options: [
      "Formats code",
      "Finds code quality problems",
      "Deploys applications",
      "Stores images",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "ESLint checks your code for possible errors and bad practices.",
  },

  // ==========================
  // Deployment
  // ==========================
  {
    id: 15,
    question: "What is Vercel mainly used for?",
    options: [
      "Writing JavaScript",
      "Deploying web applications",
      "Editing CSS",
      "Managing databases",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "Vercel hosts and deploys modern web applications.",
  },
  {
    id: 16,
    question: "What happens when you push to the main branch connected to Vercel?",
    options: [
      "Nothing",
      "The project is automatically redeployed",
      "The repository is deleted",
      "The project stops working",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "Vercel automatically deploys new changes from the connected branch.",
  },
  {
    id: 17,
    question: "What is a production build?",
    options: [
      "The optimized version of your application",
      "A Git branch",
      "A CSS framework",
      "A React component",
    ],
    correctAnswer: 0,
    category: "deployment",
    explanation:
      "A production build is optimized for performance before deployment.",
  },

  // ==========================
  // HTML & CSS
  // ==========================
  {
    id: 18,
    question: "What is semantic HTML?",
    options: [
      "HTML that uses meaningful tags",
      "CSS animations",
      "JavaScript functions",
      "Git commands",
    ],
    correctAnswer: 0,
    category: "html-css",
    explanation:
      "Semantic HTML uses elements like <header>, <main>, and <footer> to describe content.",
  },
  {
    id: 19,
    question: "Which CSS layout system is commonly used to align items in one direction?",
    options: ["Grid", "Flexbox", "Bootstrap", "Position"],
    correctAnswer: 1,
    category: "html-css",
    explanation:
      "Flexbox is designed for arranging items in rows or columns.",
  },
  {
    id: 20,
    question: "Why is responsive design important?",
    options: [
      "It makes websites work on different screen sizes",
      "It uploads code to GitHub",
      "It creates Git branches",
      "It installs npm packages",
    ],
    correctAnswer: 0,
    category: "html-css",
    explanation:
      "Responsive design ensures a good experience on phones, tablets, and desktops.",
  },
];

export default questions;
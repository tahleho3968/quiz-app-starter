import type { Question } from "../types/quiz";

const questions: Question[] = [
  // === CATEGORY: GIT (3 Questions) ===
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
  {
    id: 2,
    question:
      "Which command updates your local repository with changes from a remote repository and merges them?",
    options: ["git push", "git commit", "git pull", "git add"],
    correctAnswer: 2,
    category: "git",
    explanation:
      "git pull fetches changes from the remote repository and immediately integrates them into your current local branch.",
  },
  {
    id: 3,
    question: "What is the purpose of the `.gitignore` file?",
    options: [
      "To list files that Git should completely track",
      "To specify intentionally untracked files that Git should ignore",
      "To delete files permanently from local storage",
      "To encrypt confidential files before pushing",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "The `.gitignore` file tells Git which files or directories (like node_modules or system logs) it should safely ignore and skip tracking.",
  },

  // === CATEGORY: HTML-CSS (3 Questions) ===
  {
    id: 4,
    question:
      "Which HTML5 element is used to display standalone self-contained content like illustrations, diagrams, or photos?",
    options: ["<aside>", "<section>", "<figure>", "<details>"],
    correctAnswer: 2,
    category: "html-css",
    explanation:
      "<figure> is a semantic element designed to encapsulate self-contained media content, often paired with <figcaption>.",
  },
  {
    id: 5,
    question: "What is the default value of the `position` property in CSS?",
    options: ["relative", "static", "absolute", "fixed"],
    correctAnswer: 1,
    category: "html-css",
    explanation:
      "Elements are positioned 'static' by default, meaning they follow the normal document flow and are unaffected by top, bottom, left, or right properties.",
  },
  {
    id: 6,
    question:
      "In CSS Box Model, which property adds space inside an element, between its content and its border?",
    options: ["margin", "padding", "border-width", "outline"],
    correctAnswer: 1,
    category: "html-css",
    explanation:
      "Padding adds transparent space inside an element's border, whereas margin adds space outside the border boundaries.",
  },

  // === CATEGORY: TYPESCRIPT (4 Questions) ===
  {
    id: 7,
    question:
      "How do you define an optional property in a TypeScript interface?",
    options: [
      "By adding a question mark (?) after the property name",
      "By using the 'optional' keyword before the property",
      "By assigning the type to 'null'",
      "By wrapping the property name in brackets [ ]",
    ],
    correctAnswer: 0,
    category: "typescript",
    explanation:
      "Appending a '?' directly after a property name mark it as optional, meaning it can be safely omitted when creating objects of that type.",
  },
  {
    id: 8,
    question: "What does the 'unknown' type represent in TypeScript?",
    options: [
      "A type that can never occur or have any values",
      "A type-safe counterpart to 'any' that requires a type check before operations",
      "An alias for the 'null' primitive type",
      "A feature that deactivates all compile-time type evaluations",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation:
      "'unknown' is a safer alternative to 'any' because TypeScript enforces type narrowing or assertions before you can execute methods on it.",
  },
  {
    id: 9,
    question:
      "Which operator is used for structural type alias unions in TypeScript?",
    options: [
      "& (Ampersand)",
      "&& (Double Ampersand)",
      "| (Pipe)",
      "|| (Double Pipe)",
    ],
    correctAnswer: 2,
    category: "typescript",
    explanation:
      "The single pipe '|' character denotes a union type, meaning a variable can hold a value belonging to any of the unified options.",
  },
  {
    id: 10,
    question: "What happens when you compile TypeScript code successfully?",
    options: [
      "It transforms into optimized native binary code",
      "It converts directly into pure, standards-compliant JavaScript text",
      "It compiles directly into functional web Assembly",
      "It alters the browser engine runtime execution directly",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation:
      "TypeScript is a syntactic superset that compiles (transpiles) directly into plain client-side or server-side JavaScript execution files.",
  },

  // === CATEGORY: REACT (4 Questions) ===
  {
    id: 11,
    question: "What rule must be strictly followed when invoking React Hooks?",
    options: [
      "Hooks must be called inside loops or nested conditional checks",
      "Hooks can only be triggered at the top level of React functional components",
      "Hooks must always be executed inside traditional JavaScript classes",
      "Hooks must be registered inside asynchronous functions only",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "Hooks must only be invoked at the top level of your React function to maintain reliable hook execution ordering across sequential renders.",
  },
  {
    id: 12,
    question:
      "What is the primary role of the dependency array parameter in the `useEffect` hook?",
    options: [
      "To declare external styling configurations",
      "To control exactly when the effect should re-run based on changing variables",
      "To dictate the layout arrangement order of child components",
      "To permanently lock down internal state values from being overwritten",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "React tracks values inside the dependency array and skips executing the effect callback if none of those variables change between updates.",
  },
  {
    id: 13,
    question:
      "How do you correctly pass data down a component hierarchy tree from a parent component to a child?",
    options: [
      "By setting global cookies",
      "By utilizing Props",
      "By using local storage sessions",
      "By reading HTML data attributes",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "Props are the fundamental, read-only configuration attributes passed down from parent elements to child components in React.",
  },
  {
    id: 14,
    question: "What is the benefit of using React fragments (`<> ... </>`)?",
    options: [
      "They inject stylized grid systems instantly into elements",
      "They aggregate multiple child components without adding extra nodes to the DOM tree",
      "They automate data caching systems effortlessly",
      "They secure sensitive endpoints against external interception",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "Fragments group elements without rendering unnecessary container wrappers (like extra <div> elements) that could disrupt your DOM tree layout.",
  },

  // === CATEGORY: TOOLING (3 Questions) ===
  {
    id: 15,
    question:
      "Why is Vite highly favored as a local project build tooling generator over traditional setups like Create React App?",
    options: [
      "It completely replaces the browser layout engines",
      "It leverages native ES modules to deliver ultra-fast dev server startups",
      "It completely removes the requirement to write CSS files",
      "It runs web code natively without using JavaScript runtime environments",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "Vite delivers exceptionally fast start times by serving source code over native ESM, allowing the browser to do bundling workloads dynamically.",
  },
  {
    id: 16,
    question:
      "What core file is used to manage package dependencies and script definitions in modern frontend environments?",
    options: ["vite.config.ts", "index.html", "package.json", "tsconfig.json"],
    correctAnswer: 2,
    category: "tooling",
    explanation:
      "The `package.json` file serves as the configurations blueprint, tracking names, semantic versioned dependencies, and automation task runners.",
  },
  {
    id: 17,
    question:
      "What is the primary purpose of executing code linters like ESLint in a frontend developer's pipeline?",
    options: [
      "To automatically deploy applications to servers",
      "To analyze codebase strings to flag anti-patterns, potential bugs, and formatting deviations",
      "To compress structural imagery layouts dynamically",
      "To compile asset code paths into single file targets",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "ESLint performs static analysis to flag structural flaws, syntax styling deviations, and non-optimal practices during code composition.",
  },

  // === CATEGORY: DEPLOYMENT (3 Questions) ===
  {
    id: 18,
    question:
      "Which of the following cloud hosting environments offers native, instantaneous continuous deployment hooks directly from GitHub?",
    options: ["Vercel", "Localhost", "GitKraken", "Docker Desktop"],
    correctAnswer: 0,
    category: "deployment",
    explanation:
      "Vercel features direct cloud integration loops with GitHub repositories, automatically spinning up staging or production builds on push events.",
  },
  {
    id: 19,
    question:
      "What critical task happens during the production build pipeline (`npm run build`) for a modern frontend single-page app?",
    options: [
      "The source files are directly uploaded to a physical local database",
      "The source files are bundled, minified, and compiled down into optimized static assets",
      "The setup turns off TypeScript types checking configurations completely",
      "The build config sets up an active testing server on the local host line",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "The production build gathers, bundles, transpiles, and minifies files into lightweight, standalone static assets optimal for fast delivery from a server.",
  },
  {
    id: 20,
    question:
      "What does a `404 Not Found` HTTP status code represent on a deployed live server app site?",
    options: [
      "The server received an unauthorized administration authentication login request",
      "The server itself went down completely due to internal processing runtime runtime errors",
      "The requested URL route or asset asset pathway could not be located on the hosting platform",
      "The data transfer pipeline completed the download transaction process normally",
    ],
    correctAnswer: 2,
    category: "deployment",
    explanation:
      "An HTTP 404 response explicitly states that the host successfully communicated with the client browser, but the targeted URL path does not exist on that server.",
  },
];

export default questions;

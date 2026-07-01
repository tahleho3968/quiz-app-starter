import type { Question } from "../types/quiz";

const questions: Question[] = [
  // ============================================
  // GIT CATEGORY (5 Questions)
  // ============================================
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
    question: "What does `git add .` do?",
    options: [
      "Saves changes to the repository",
      "Stages all changes in the current directory",
      "Deletes all changes",
      "Creates a new branch",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git add . stages all changes in the current directory and subdirectories, preparing them for commit.",
  },
  {
    id: 3,
    question: "What is the purpose of a Pull Request (PR)?",
    options: [
      "To delete a branch",
      "To propose changes and request review before merging",
      "To clone a repository",
      "To install dependencies",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "A Pull Request is used to propose changes, get code review, and merge code into the main branch.",
  },
  {
    id: 4,
    question: "Which command switches to an existing branch?",
    options: [
      "git branch",
      "git checkout branch-name",
      "git clone branch-name",
      "git commit branch-name",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git checkout branch-name switches to the specified branch. Use git checkout -b to create and switch.",
  },
  {
    id: 5,
    question: "What does `git pull` do?",
    options: [
      "Pushes changes to GitHub",
      "Downloads and merges changes from the remote repository",
      "Creates a new branch",
      "Deletes the repository",
    ],
    correctAnswer: 1,
    category: "git",
    explanation:
      "git pull downloads changes from the remote repository and merges them into your current branch.",
  },

  // ============================================
  // REACT CATEGORY (5 Questions)
  // ============================================
  {
    id: 6,
    question: "What does `useState` do in React?",
    options: [
      "Fetches data from an API",
      "Manages state in a functional component",
      "Creates a new component",
      "Handles form submission",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "useState is a React Hook that lets you add state to functional components.",
  },
  {
    id: 7,
    question: "What is JSX in React?",
    options: [
      "A database query language",
      "A syntax extension that allows HTML-like code in JavaScript",
      "A CSS framework",
      "A testing library",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "JSX allows you to write HTML-like syntax directly in JavaScript, which React converts to DOM elements.",
  },
  {
    id: 8,
    question: "What is a React component?",
    options: [
      "A function or class that returns UI elements",
      "A database table",
      "A CSS file",
      "A Git branch",
    ],
    correctAnswer: 0,
    category: "react",
    explanation:
      "A React component is a function or class that returns JSX to render UI elements.",
  },
  {
    id: 9,
    question: "What does `useEffect` do in React?",
    options: [
      "Manages state",
      "Handles side effects like fetching data or subscriptions",
      "Creates a new component",
      "Styles the component",
    ],
    correctAnswer: 1,
    category: "react",
    explanation:
      "useEffect handles side effects such as API calls, timers, or subscriptions that run after render.",
  },
  {
    id: 10,
    question: "What is `props` in React?",
    options: [
      "Data passed from a parent component to a child",
      "State managed within a component",
      "A CSS class",
      "A Git command",
    ],
    correctAnswer: 0,
    category: "react",
    explanation:
      "props (short for properties) are data passed from a parent component to a child component.",
  },

  // ============================================
  // TYPESCRIPT CATEGORY (5 Questions)
  // ============================================
  {
    id: 11,
    question: "What is TypeScript?",
    options: [
      "A JavaScript framework",
      "A JavaScript superset with static typing",
      "A CSS preprocessor",
      "A database management system",
    ],
    correctAnswer: 1,
    category: "typescript",
    explanation:
      "TypeScript adds static typing to JavaScript, catching type errors during development.",
  },
  {
    id: 12,
    question: "What does `type` do in TypeScript?",
    options: [
      "Defines a custom type alias",
      "Creates a new component",
      "Installs a package",
      "Runs the application",
    ],
    correctAnswer: 0,
    category: "typescript",
    explanation:
      "Type alias allows you to create a new name for a type, making your code more readable.",
  },
  {
    id: 13,
    question: "What is a `string` type in TypeScript?",
    options: [
      "A number",
      "A boolean",
      "A textual data type",
      "An array",
    ],
    correctAnswer: 2,
    category: "typescript",
    explanation:
      "The string type represents textual data in TypeScript.",
  },
  {
    id: 14,
    question: "What does `interface` do in TypeScript?",
    options: [
      "Defines the structure of an object",
      "Creates a new class",
      "Imports a module",
      "Exports a function",
    ],
    correctAnswer: 0,
    category: "typescript",
    explanation:
      "Interface defines the shape an object should have, specifying property names and types.",
  },
  {
    id: 15,
    question: "What is the `boolean` type in TypeScript?",
    options: [
      "A number",
      "A string",
      "A true or false value",
      "An object",
    ],
    correctAnswer: 2,
    category: "typescript",
    explanation:
      "The boolean type represents true or false values.",
  },

  // ============================================
  // TOOLING / DEV TOOLS (5 Questions)
  // ============================================
  {
    id: 16,
    question: "What does `npm install` do?",
    options: [
      "Uninstalls all packages",
      "Installs dependencies listed in package.json",
      "Creates a new project",
      "Deploys the app",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "npm install downloads and installs all dependencies listed in package.json.",
  },
  {
    id: 17,
    question: "What is Vite used for?",
    options: [
      "A database management tool",
      "A fast build tool and dev server",
      "A version control system",
      "A CSS framework",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "Vite is a build tool that provides fast development server and optimized builds.",
  },
  {
    id: 18,
    question: "What does ESLint do?",
    options: [
      "Formats code",
      "Checks code for errors and enforces coding standards",
      "Deploys the application",
      "Manages packages",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "ESLint analyzes code to catch syntax errors and enforce consistent coding rules.",
  },
  {
    id: 19,
    question: "What is `package.json` used for?",
    options: [
      "Storing CSS styles",
      "Managing project dependencies and scripts",
      "Configuring ESLint",
      "Deploying the app",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "package.json lists dependencies and contains scripts for running, building, and testing the project.",
  },
  {
    id: 20,
    question: "What does `npm run dev` do in this project?",
    options: [
      "Builds the production version",
      "Runs the development server",
      "Runs ESLint",
      "Deploys to Vercel",
    ],
    correctAnswer: 1,
    category: "tooling",
    explanation:
      "npm run dev starts the Vite development server at localhost:5173.",
  },

  // ============================================
  // DEPLOYMENT (5 Questions)
  // ============================================
  {
    id: 21,
    question: "What is Vercel?",
    options: [
      "A version control system",
      "A platform for deploying frontend applications",
      "A testing library",
      "A database",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "Vercel is a platform for deploying and hosting frontend applications with built-in CI/CD.",
  },
  {
    id: 22,
    question: "What happens when you push to main on a Vercel-connected repo?",
    options: [
      "Nothing",
      "It triggers an automatic redeploy",
      "It creates a new branch",
      "It deletes the project",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "Vercel automatically redeploys your application whenever you push changes to the main branch.",
  },
  {
    id: 23,
    question: "What is CI/CD in the context of Vercel?",
    options: [
      "A coding language",
      "Continuous Integration and Continuous Deployment - auto-building and deploying on push",
      "A Git command",
      "A CSS framework",
    ],
    correctAnswer: 1,
    category: "deployment",
    explanation:
      "CI/CD automates building, testing, and deploying your application whenever code changes are pushed.",
  },
  {
    id: 24,
    question: "What critical task happens during the production build pipeline (`npm run build`)?",
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
    id: 25,
    question: "What does a `404 Not Found` HTTP status code represent?",
    options: [
      "The server received an unauthorized administration authentication login request",
      "The server itself went down completely due to internal processing runtime errors",
      "The requested URL route or asset pathway could not be located on the hosting platform",
      "The data transfer pipeline completed the download transaction process normally",
    ],
    correctAnswer: 2,
    category: "deployment",
    explanation:
      "An HTTP 404 response explicitly states that the host successfully communicated with the client browser, but the targeted URL path does not exist on that server.",
  },

  // ============================================
  // HTML / CSS (5 Questions)
  // ============================================
  {
    id: 26,
    question: "What does `flexbox` do in CSS?",
    options: [
      "Creates a flexbox layout",
      "Creates a grid layout",
      "Creates a new component",
      "Deploys the app",
    ],
    correctAnswer: 0,
    category: "html-css",
    explanation:
      "Flexbox is a CSS layout model that distributes space and aligns items in a container.",
  },
  {
    id: 27,
    question: "What is the purpose of responsive design?",
    options: [
      "To make the app look good on different screen sizes",
      "To make the app faster",
      "To improve SEO",
      "To add animations",
    ],
    correctAnswer: 0,
    category: "html-css",
    explanation:
      "Responsive design ensures that websites work well on different devices and screen sizes.",
  },
  {
    id: 28,
    question: "Which HTML5 element is used to display standalone self-contained content like illustrations or photos?",
    options: ["<aside>", "<section>", "<figure>", "<details>"],
    correctAnswer: 2,
    category: "html-css",
    explanation:
      "<figure> is a semantic element designed to encapsulate self-contained media content, often paired with <figcaption>.",
  },
  {
    id: 29,
    question: "What is the default value of the `position` property in CSS?",
    options: ["relative", "static", "absolute", "fixed"],
    correctAnswer: 1,
    category: "html-css",
    explanation:
      "Elements are positioned 'static' by default, meaning they follow the normal document flow and are unaffected by top, bottom, left, or right properties.",
  },
  {
    id: 30,
    question: "In CSS Box Model, which property adds space inside an element between its content and its border?",
    options: ["margin", "padding", "border-width", "outline"],
    correctAnswer: 1,
    category: "html-css",
    explanation:
      "Padding adds transparent space inside an element's border, whereas margin adds space outside the border boundaries.",
  },
];

export default questions;
import type { Question } from "../types/quiz";

const questions: Question[] = [
  // ============================================
  // GIT CATEGORY (8 Questions)
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
    difficulty: "easy",
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
    difficulty: "easy",
    explanation:
      "git add . stages all changes in the current directory and subdirectories, preparing them for commit.",
  },
  {
    id: 3,
    question: "True or False: `git push` uploads your commits to a remote repository.",
    options: ["True", "False"],
    correctAnswer: 0,
    category: "git",
    difficulty: "easy",
    explanation:
      "git push uploads your local commits to the remote repository, making them available to others.",
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
    difficulty: "medium",
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
    difficulty: "medium",
    explanation:
      "git pull downloads changes from the remote repository and merges them into your current branch.",
  },
  {
    id: 6,
    question: "What is the purpose of a Pull Request (PR)?",
    options: [
      "To delete a branch",
      "To propose changes and request review before merging",
      "To clone a repository",
      "To install dependencies",
    ],
    correctAnswer: 1,
    category: "git",
    difficulty: "medium",
    explanation:
      "A Pull Request is used to propose changes, get code review, and merge code into the main branch.",
  },
  {
    id: 7,
    question: "What does `.gitignore` do?",
    options: [
      "Deletes the repository",
      "Specifies files Git should ignore",
      "Creates a new branch",
      "Stages changes",
    ],
    correctAnswer: 1,
    category: "git",
    difficulty: "medium",
    explanation:
      ".gitignore tells Git which files or folders to ignore in a project (like node_modules).",
  },
  {
    id: 8,
    question: "What is the correct order of Git commands to push a new branch?",
    options: [
      "git commit → git add → git push",
      "git add → git commit → git push",
      "git push → git add → git commit",
      "git branch → git commit → git push",
    ],
    correctAnswer: 1,
    category: "git",
    difficulty: "hard",
    explanation:
      "The correct order is: stage files with git add, commit with git commit, then push with git push.",
  },

  // ============================================
  // REACT CATEGORY (8 Questions)
  // ============================================
  {
    id: 9,
    question: "What does `useState` do in React?",
    options: [
      "Fetches data from an API",
      "Manages state in a functional component",
      "Creates a new component",
      "Handles form submission",
    ],
    correctAnswer: 1,
    category: "react",
    difficulty: "easy",
    explanation:
      "useState is a React Hook that lets you add state to functional components.",
  },
  {
    id: 10,
    question: "What is JSX in React?",
    options: [
      "A database query language",
      "A syntax extension that allows HTML-like code in JavaScript",
      "A CSS framework",
      "A testing library",
    ],
    correctAnswer: 1,
    category: "react",
    difficulty: "easy",
    explanation:
      "JSX allows you to write HTML-like syntax directly in JavaScript, which React converts to DOM elements.",
  },
  {
    id: 11,
    question: "True or False: React components must always be class-based.",
    options: ["True", "False"],
    correctAnswer: 1,
    category: "react",
    difficulty: "easy",
    explanation:
      "React components can be functional (using hooks) OR class-based. Modern React prefers functional components.",
  },
  {
    id: 12,
    question: "What does `useEffect` do in React?",
    options: [
      "Manages state",
      "Handles side effects like fetching data or subscriptions",
      "Creates a new component",
      "Styles the component",
    ],
    correctAnswer: 1,
    category: "react",
    difficulty: "medium",
    explanation:
      "useEffect handles side effects such as API calls, timers, or subscriptions that run after render.",
  },
  {
    id: 13,
    question: "What are `props` in React?",
    options: [
      "Data passed from a parent component to a child",
      "State managed within a component",
      "A CSS class",
      "A Git command",
    ],
    correctAnswer: 0,
    category: "react",
    difficulty: "medium",
    explanation:
      "props (short for properties) are data passed from a parent component to a child component.",
  },
  {
    id: 14,
    question: "What is the difference between state and props?",
    options: [
      "State is immutable, props are mutable",
      "State is managed within a component, props are passed from parent",
      "They are the same thing",
      "Props are for data, state is for styling",
    ],
    correctAnswer: 1,
    category: "react",
    difficulty: "hard",
    explanation:
      "State is internal data managed by the component itself, while props are data passed from a parent component.",
  },
  {
    id: 15,
    question: "What does `{children}` do in React components?",
    options: [
      "Renders child components between opening and closing tags",
      "Creates a new component",
      "Styles the component",
      "Fetches data",
    ],
    correctAnswer: 0,
    category: "react",
    difficulty: "medium",
    explanation:
      "The children prop allows you to pass and render nested components between the opening and closing tags.",
  },
  {
    id: 16,
    question: "True or False: React renders components synchronously.",
    options: ["True", "False"],
    correctAnswer: 1,
    category: "react",
    difficulty: "medium",
    explanation:
      "React uses a virtual DOM and batching to optimize rendering, which can be asynchronous.",
  },

  // ============================================
  // TYPESCRIPT CATEGORY (8 Questions)
  // ============================================
  {
    id: 17,
    question: "What is TypeScript?",
    options: [
      "A JavaScript framework",
      "A JavaScript superset with static typing",
      "A CSS preprocessor",
      "A database management system",
    ],
    correctAnswer: 1,
    category: "typescript",
    difficulty: "easy",
    explanation:
      "TypeScript adds static typing to JavaScript, catching type errors during development.",
  },
  {
    id: 18,
    question: "True or False: TypeScript code runs directly in the browser.",
    options: ["True", "False"],
    correctAnswer: 1,
    category: "typescript",
    difficulty: "easy",
    explanation:
      "TypeScript must be compiled (transpiled) to JavaScript before it can run in the browser.",
  },
  {
    id: 19,
    question: "What does `interface` do in TypeScript?",
    options: [
      "Defines the structure of an object",
      "Creates a new class",
      "Imports a module",
      "Exports a function",
    ],
    correctAnswer: 0,
    category: "typescript",
    difficulty: "medium",
    explanation:
      "Interface defines the shape an object should have, specifying property names and types.",
  },
  {
    id: 20,
    question: "What is the difference between `type` and `interface` in TypeScript?",
    options: [
      "They are identical",
      "interface can be extended, type can create unions",
      "type is for primitives only",
      "interface is for functions only",
    ],
    correctAnswer: 1,
    category: "typescript",
    difficulty: "hard",
    explanation:
      "Both define types, but interfaces are typically used for object shapes (can be extended), while types can create unions and intersections.",
  },
  {
    id: 21,
    question: "What does `string` mean in TypeScript?",
    options: ["A number", "A boolean", "A textual data type", "An array"],
    correctAnswer: 2,
    category: "typescript",
    difficulty: "easy",
    explanation: "The string type represents textual data in TypeScript.",
  },
  {
    id: 22,
    question: "What does `boolean` mean in TypeScript?",
    options: ["A number", "A string", "A true or false value", "An object"],
    correctAnswer: 2,
    category: "typescript",
    difficulty: "easy",
    explanation: "The boolean type represents true or false values.",
  },
  {
    id: 23,
    question: "What is the purpose of type annotations in TypeScript?",
    options: [
      "To make the code faster",
      "To specify the expected type of a variable or function",
      "To add comments",
      "To format the code",
    ],
    correctAnswer: 1,
    category: "typescript",
    difficulty: "medium",
    explanation:
      "Type annotations tell TypeScript what type a variable, parameter, or return value should be.",
  },
  {
    id: 24,
    question: "True or False: TypeScript catches errors at compile time.",
    options: ["True", "False"],
    correctAnswer: 0,
    category: "typescript",
    difficulty: "medium",
    explanation:
      "TypeScript checks for type errors during compilation, before the code runs in the browser.",
  },

  // ============================================
  // TOOLING CATEGORY (7 Questions)
  // ============================================
  {
    id: 25,
    question: "What does `npm install` do?",
    options: [
      "Uninstalls all packages",
      "Installs dependencies listed in package.json",
      "Creates a new project",
      "Deploys the app",
    ],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "easy",
    explanation:
      "npm install downloads and installs all dependencies listed in package.json.",
  },
  {
    id: 26,
    question: "What is Vite used for?",
    options: [
      "A database management tool",
      "A fast build tool and dev server",
      "A version control system",
      "A CSS framework",
    ],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "easy",
    explanation:
      "Vite is a build tool that provides fast development server and optimized builds.",
  },
  {
    id: 27,
    question: "True or False: ESLint fixes all errors automatically.",
    options: ["True", "False"],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "easy",
    explanation:
      "ESLint finds errors and can fix some with --fix, but not all errors are automatically fixable.",
  },
  {
    id: 28,
    question: "What does ESLint do?",
    options: [
      "Formats code",
      "Checks code for errors and enforces coding standards",
      "Deploys the application",
      "Manages packages",
    ],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "medium",
    explanation:
      "ESLint analyzes code to catch syntax errors and enforce consistent coding rules.",
  },
  {
    id: 29,
    question: "What is `package.json` used for?",
    options: [
      "Storing CSS styles",
      "Managing project dependencies and scripts",
      "Configuring ESLint",
      "Deploying the app",
    ],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "easy",
    explanation:
      "package.json lists dependencies and contains scripts for running, building, and testing the project.",
  },
  {
    id: 30,
    question: "What does `npm run dev` do in this project?",
    options: [
      "Builds the production version",
      "Runs the development server",
      "Runs ESLint",
      "Deploys to Vercel",
    ],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "easy",
    explanation:
      "npm run dev starts the Vite development server at localhost:5173.",
  },
  {
    id: 31,
    question: "What is Prettier used for?",
    options: [
      "Checking for type errors",
      "Automatically formatting code",
      "Running tests",
      "Managing packages",
    ],
    correctAnswer: 1,
    category: "tooling",
    difficulty: "medium",
    explanation:
      "Prettier automatically formats code to follow consistent style rules.",
  },

  // ============================================
  // DEPLOYMENT CATEGORY (7 Questions)
  // ============================================
  {
    id: 32,
    question: "What is Vercel?",
    options: [
      "A version control system",
      "A platform for deploying frontend applications",
      "A testing library",
      "A database",
    ],
    correctAnswer: 1,
    category: "deployment",
    difficulty: "easy",
    explanation:
      "Vercel is a platform for deploying and hosting frontend applications with built-in CI/CD.",
  },
  {
    id: 33,
    question: "True or False: Vercel automatically deploys changes when you push to main.",
    options: ["True", "False"],
    correctAnswer: 0,
    category: "deployment",
    difficulty: "easy",
    explanation:
      "Vercel automatically redeploys your application whenever you push changes to the main branch.",
  },
  {
    id: 34,
    question: "What does CI/CD stand for?",
    options: [
      "Continuous Integration / Continuous Deployment",
      "Code Integration / Code Deployment",
      "Continuous Insertion / Continuous Delivery",
      "Component Integration / Component Design",
    ],
    correctAnswer: 0,
    category: "deployment",
    difficulty: "medium",
    explanation:
      "CI/CD automates building, testing, and deploying your application whenever code changes are pushed.",
  },
  {
    id: 35,
    question: "What is the build process in web development?",
    options: [
      "Running the development server",
      "Compiling source code into production-ready files",
      "Writing new features",
      "Deleting old code",
    ],
    correctAnswer: 1,
    category: "deployment",
    difficulty: "medium",
    explanation:
      "The build process compiles, bundles, and optimizes source code for production deployment.",
  },
  {
    id: 36,
    question: "What does `npm run build` do?",
    options: [
      "Starts the development server",
      "Creates an optimized production build",
      "Runs tests",
      "Deletes node_modules",
    ],
    correctAnswer: 1,
    category: "deployment",
    difficulty: "medium",
    explanation:
      "npm run build creates a production-ready bundle of your application.",
  },
  {
    id: 37,
    question: "True or False: You need a credit card to deploy on Vercel.",
    options: ["True", "False"],
    correctAnswer: 1,
    category: "deployment",
    difficulty: "easy",
    explanation:
      "Vercel has a generous free tier - you don't need a credit card to deploy!",
  },
  {
    id: 38,
    question: "What happens when you push to main with a Vercel-connected repo?",
    options: [
      "Nothing happens",
      "It triggers an automatic redeploy",
      "It creates a new branch",
      "It deletes the project",
    ],
    correctAnswer: 1,
    category: "deployment",
    difficulty: "medium",
    explanation:
      "Vercel automatically redeploys your application whenever you push changes to the main branch.",
  },

  // ============================================
  // HTML/CSS CATEGORY (7 Questions)
  // ============================================
  {
    id: 39,
    question: "What does `flexbox` do in CSS?",
    options: [
      "Creates a flexbox layout for responsive design",
      "Creates a grid layout",
      "Creates a new component",
      "Deploys the app",
    ],
    correctAnswer: 0,
    category: "html-css",
    difficulty: "easy",
    explanation:
      "Flexbox is a CSS layout model that distributes space and aligns items in a container.",
  },
  {
    id: 40,
    question: "What is the purpose of responsive design?",
    options: [
      "To make the app look good on different screen sizes",
      "To make the app faster",
      "To improve SEO",
      "To add animations",
    ],
    correctAnswer: 0,
    category: "html-css",
    difficulty: "easy",
    explanation:
      "Responsive design ensures that websites work well on different devices and screen sizes.",
  },
  {
    id: 41,
    question: "True or False: CSS Grid is only for complex layouts.",
    options: ["True", "False"],
    correctAnswer: 1,
    category: "html-css",
    difficulty: "easy",
    explanation:
      "CSS Grid can be used for both simple and complex layouts - it's powerful and flexible.",
  },
  {
    id: 42,
    question: "What does `margin` do in CSS?",
    options: [
      "Adds space inside an element",
      "Adds space outside an element",
      "Changes the color",
      "Adds a border",
    ],
    correctAnswer: 1,
    category: "html-css",
    difficulty: "easy",
    explanation:
      "Margin adds space outside an element's border, creating space between elements.",
  },
  {
    id: 43,
    question: "What does `padding` do in CSS?",
    options: [
      "Adds space inside an element between content and border",
      "Adds space outside an element",
      "Changes the font size",
      "Adds a shadow",
    ],
    correctAnswer: 0,
    category: "html-css",
    difficulty: "easy",
    explanation:
      "Padding adds space inside an element between the content and the border.",
  },
  {
    id: 44,
    question: "What is the difference between `div` and `span` in HTML?",
    options: [
      "They are the same",
      "div is block-level, span is inline",
      "div is inline, span is block-level",
      "span is for headings",
    ],
    correctAnswer: 1,
    category: "html-css",
    difficulty: "medium",
    explanation:
      "div is a block-level element (takes full width), while span is inline (takes only as much width as needed).",
  },
  {
    id: 45,
    question: "True or False: CSS variables can be used in media queries.",
    options: ["True", "False"],
    correctAnswer: 0,
    category: "html-css",
    difficulty: "hard",
    explanation:
      "CSS variables (custom properties) can be used in media queries, making responsive design more flexible.",
  },

  // ============================================
  // 🆕 ADDITIONAL QUESTION TYPES (Questions 46-55)
  // ============================================

  {
    id: 46,
    question: "Complete the Git command: `git ___` creates a new branch and switches to it.",
    options: [
      "checkout -b",
      "branch",
      "clone",
      "init -b",
    ],
    correctAnswer: 0,
    category: "git",
    difficulty: "medium",
    explanation: "git checkout -b creates a new branch and switches to it in one command.",
  },
  {
    id: 47,
    question: "Complete the command: `___ install` downloads all project dependencies.",
    options: [
      "npm",
      "git",
      "node",
      "vite",
    ],
    correctAnswer: 0,
    category: "tooling",
    difficulty: "easy",
    explanation: "npm install downloads all dependencies listed in package.json.",
  },
  {
    id: 48,
    question: "What does this React code do?\n\nconst [count, setCount] = useState(0);",
    options: [
      "Creates a state variable called count with initial value 0",
      "Creates a function called count",
      "Creates a CSS class",
      "Imports a component",
    ],
    correctAnswer: 0,
    category: "react",
    difficulty: "medium",
    explanation: "useState(0) creates a state variable 'count' initialized to 0 and a setter function 'setCount'.",
  },
  {
    id: 49,
    question: "What will this TypeScript code output?\n\nconst name: string = 'ACA';\nconsole.log(name);",
    options: [
      "ACA",
      "undefined",
      "null",
      "Error",
    ],
    correctAnswer: 0,
    category: "typescript",
    difficulty: "medium",
    explanation: "The code declares a string variable 'name' with value 'ACA' and logs it to the console.",
  },
  {
    id: 50,
    question: "Match the Git command to its description:",
    options: [
      "git clone → Downloads a repository",
      "git push → Uploads commits",
      "git pull → Downloads and merges",
      "All of the above are correct",
    ],
    correctAnswer: 3,
    category: "git",
    difficulty: "hard",
    explanation: "All three commands are correctly matched to their descriptions.",
  },
  {
    id: 51,
    question: "Match the React Hook to its purpose:",
    options: [
      "useState → Manages state",
      "useEffect → Handles side effects",
      "useContext → Shares data across components",
      "All of the above are correct",
    ],
    correctAnswer: 3,
    category: "react",
    difficulty: "hard",
    explanation: "All three Hooks are correctly matched to their purposes.",
  },
  {
    id: 52,
    question: "What is the correct order of Git commands to push a new feature?",
    options: [
      "1. git add → 2. git commit → 3. git push",
      "1. git commit → 2. git add → 3. git push",
      "1. git push → 2. git add → 3. git commit",
      "1. git branch → 2. git commit → 3. git push",
    ],
    correctAnswer: 0,
    category: "git",
    difficulty: "hard",
    explanation: "The correct order is: stage files (git add), commit (git commit), then push (git push).",
  },
  {
    id: 53,
    question: "What is the correct order of steps in a React component lifecycle?",
    options: [
      "1. Mount → 2. Update → 3. Unmount",
      "1. Update → 2. Mount → 3. Unmount",
      "1. Unmount → 2. Mount → 3. Update",
      "1. Mount → 2. Unmount → 3. Update",
    ],
    correctAnswer: 0,
    category: "react",
    difficulty: "hard",
    explanation: "The React component lifecycle goes: Mount (render), Update (re-render), Unmount (remove).",
  },
  {
    id: 54,
    question: "What does this Git command do?\n\ngit log --oneline",
    options: [
      "Shows the commit history in a compact format",
      "Deletes the repository",
      "Creates a new branch",
      "Stages changes",
    ],
    correctAnswer: 0,
    category: "git",
    difficulty: "medium",
    explanation: "git log --oneline shows the commit history with each commit on one line.",
  },
  {
    id: 55,
    question: "What will this CSS code do?\n\ndisplay: flex;\njustify-content: center;",
    options: [
      "Centers items horizontally in a flex container",
      "Centers items vertically in a flex container",
      "Creates a grid layout",
      "Hides the element",
    ],
    correctAnswer: 0,
    category: "html-css",
    difficulty: "medium",
    explanation: "display: flex creates a flex container, and justify-content: center centers items horizontally.",
  },
];

export default questions;

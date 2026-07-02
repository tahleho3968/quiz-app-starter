import { useState } from "react";
import type {
  Category,
  Difficulty,
  GameMode,
  LeaderboardEntry,
} from "../types/quiz";

interface SetupScreenProps {
  categories: Category[];
  questionCounts: Record<Category, number>;
  leaderboard: LeaderboardEntry[];
  badgeCount?: string;
  onStart: (
    selectedCategories: Category[],
    difficulty: Difficulty | "all",
    playerName: string,
    gameMode: GameMode,
  ) => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  git: "Git",
  react: "React",
  typescript: "TypeScript",
  tooling: "Tooling",
  deployment: "Deployment",
  "html-css": "HTML / CSS",
};

const DIFFICULTIES: (Difficulty | "all")[] = ["all", "easy", "medium", "hard"];

const GAME_MODES: {
  id: GameMode;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "classic",
    label: "Classic",
    icon: "📝",
    description: "20 questions, score",
  },
  {
    id: "timed",
    label: "Timed",
    icon: "⏱️",
    description: "5 minutes, as many as possible",
  },
  {
    id: "survival",
    label: "Survival",
    icon: "💀",
    description: "One wrong = game over!",
  },
  {
    id: "marathon",
    label: "Marathon",
    icon: "🏃",
    description: "All questions, no breaks",
  },
  {
    id: "daily",
    label: "Daily Challenge",
    icon: "📅",
    description: "Same questions for everyone",
  },
  {
    id: "category-lock",
    label: "Category Lock",
    icon: "🎯",
    description: "Only one category",
  },
];

export function SetupScreen({
  categories,
  questionCounts,
  leaderboard,
  badgeCount,
  onStart,
}: SetupScreenProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [playerName, setPlayerName] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>("classic");
  const [nameError, setNameError] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const effectiveCategories =
    selectedCategories.length === 0 ? categories : selectedCategories;

  const handleStart = () => {
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      setNameError("Please enter your name.");
      return;
    }

    if (!/[A-Za-z]/.test(trimmedName)) {
      setNameError("Your name must contain letters.");
      return;
    }

    // Category Lock requires exactly one category
    if (gameMode === "category-lock") {
      if (selectedCategories.length === 0) {
        setNameError(
          "Please select a category for Category Lock mode (click on a category above)",
        );
        return;
      }
      if (selectedCategories.length > 1) {
        setNameError(
          "Please select exactly ONE category for Category Lock mode",
        );
        return;
      }
    }

    setNameError(null);
    onStart(effectiveCategories, difficulty, trimmedName, gameMode);
  };

  const topScores = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div className="card setup-card">
      <h1>🏆 ACA Orientation Quiz</h1>
      <p className="setup-subtitle">
        Build your challenge, then race the clock. Answer fast and build a
        streak to climb the leaderboard.
      </p>

      <div className="setup-section">
        <label className="setup-label" htmlFor="player-name">
          Your name
        </label>
        <div className="input-with-overlay">
          <input
            id="player-name"
            className={`setup-input ${nameError ? "setup-input-error" : ""}`}
            type="text"
            placeholder="Enter your name"
            maxLength={24}
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              if (nameError) setNameError(null);
            }}
          />
          {nameError && (
            <div className="input-error-overlay" role="alert">
              {nameError}
            </div>
          )}
        </div>
      </div>

      <div className="setup-section">
        <span className="setup-label">Categories</span>
        <div className="chip-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${selectedCategories.includes(category) ? "chip-active" : ""}`}
              onClick={() => toggleCategory(category)}
            >
              {CATEGORY_LABELS[category]}
              <span className="chip-count">{questionCounts[category]}</span>
            </button>
          ))}
        </div>
        <p className="setup-hint">
          {selectedCategories.length === 0
            ? "No filter selected — all categories included."
            : `${selectedCategories.length} categor${selectedCategories.length === 1 ? "y" : "ies"} selected.`}
        </p>
      </div>

      <div className="setup-section">
        <span className="setup-label">Difficulty</span>
        <div className="chip-row">
          {DIFFICULTIES.map((level) => (
            <button
              key={level}
              type="button"
              className={`chip difficulty-chip difficulty-${level} ${difficulty === level ? "chip-active" : ""}`}
              onClick={() => setDifficulty(level)}
            >
              {level === "all"
                ? "All"
                : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Game Mode Selector */}
      <div className="setup-section">
        <span className="setup-label">🎮 Game Mode</span>
        <div className="game-mode-grid">
          {GAME_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`game-mode-chip ${gameMode === mode.id ? "game-mode-chip-active" : ""}`}
              onClick={() => setGameMode(mode.id)}
            >
              <span className="game-mode-icon">{mode.icon}</span>
              <span className="game-mode-label">{mode.label}</span>
              <span className="game-mode-desc">{mode.description}</span>
            </button>
          ))}
        </div>
        <p className="setup-hint">
          {GAME_MODES.find((m) => m.id === gameMode)?.description}
        </p>
      </div>

      {/* Badge Counter */}
      {badgeCount && (
        <div className="badge-counter">🏅 {badgeCount} Badges</div>
      )}

      <button className="btn start-btn" onClick={handleStart}>
        Start Quiz
      </button>

      {leaderboard.length > 0 && (
        <div className="leaderboard-toggle-wrap">
          <button
            type="button"
            className="link-btn"
            onClick={() => setShowLeaderboard((prev) => !prev)}
          >
            {showLeaderboard ? "Hide leaderboard ▲" : "Show leaderboard ▼"}
          </button>

          {showLeaderboard && (
            <ol className="leaderboard-list">
              {topScores.map((entry, i) => (
                <li key={entry.id} className="leaderboard-item">
                  <span className="leaderboard-rank">
                    {i === 0
                      ? "🥇"
                      : i === 1
                        ? "🥈"
                        : i === 2
                          ? "🥉"
                          : `#${i + 1}`}
                  </span>
                  <span className="leaderboard-name">{entry.name}</span>
                  <span className="leaderboard-score">{entry.score} pts</span>
                  <span className="leaderboard-meta">
                    {entry.correct}/{entry.total} · streak {entry.bestStreak}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
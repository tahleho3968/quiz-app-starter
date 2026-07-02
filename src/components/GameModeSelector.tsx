import type { GameMode } from "../types/quiz";

interface GameModeSelectorProps {
  selected: GameMode;
  onSelect: (mode: GameMode) => void;
}

const MODES: { id: GameMode; label: string; icon: string; description: string }[] = [
  {
    id: "classic",
    label: "Classic",
    icon: "📝",
    description: "Answer 20 questions, get a score",
  },
  {
    id: "timed",
    label: "Timed",
    icon: "⏱️",
    description: "5 minutes to answer as many as possible",
  },
  {
    id: "survival",
    label: "Survival",
    icon: "💀",
    description: "One wrong answer = game over!",
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
    description: "Same questions for everyone today",
  },
  {
    id: "category-lock",
    label: "Category Lock",
    icon: "🎯",
    description: "Questions from ONE category only",
  },
];

export function GameModeSelector({ selected, onSelect }: GameModeSelectorProps) {
  return (
    <div className="game-mode-selector">
      <div className="chip-row">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            className={`chip ${selected === mode.id ? "chip-active" : ""}`}
            onClick={() => onSelect(mode.id)}
          >
            <span>{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </div>
      <p className="mode-description">
        {MODES.find(m => m.id === selected)?.description}
      </p>
    </div>
  );
}

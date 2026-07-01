import questions from "../data/questions";
import type { Difficulty } from "../types/quiz";

interface FilterControlsProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  onApplyFilters: () => void;
}

const categories = ["git", "react", "typescript", "tooling", "deployment", "html-css"];
const difficulties: Difficulty[] = ["all", "easy", "medium", "hard"];

export function FilterControls({
  selectedCategories,
  setSelectedCategories,
  selectedDifficulty,
  setSelectedDifficulty,
  onApplyFilters,
}: FilterControlsProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const effectiveCategories = selectedCategories.length > 0 ? selectedCategories : categories;
  const matchCount = questions.filter(
    (q) =>
      effectiveCategories.includes(q.category) &&
      (selectedDifficulty === "all" || q.difficulty === selectedDifficulty)
  ).length;

  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="filter-section-header">
          <h3>📂 Categories</h3>
          <button
            type="button"
            className="link-btn"
            onClick={() =>
              setSelectedCategories(selectedCategories.length === categories.length ? [] : categories)
            }
          >
            {selectedCategories.length === categories.length ? "Clear all" : "Select all"}
          </button>
        </div>
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${selectedCategories.includes(cat) ? "active" : ""}`}
              onClick={() => toggleCategory(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>📊 Difficulty</h3>
        <div className="filter-buttons">
          {difficulties.map((diff) => (
            <button
              key={diff}
              type="button"
              className={`filter-btn ${selectedDifficulty === diff ? "active" : ""}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <p className="match-count">
        {matchCount === 0
          ? "⚠️ No questions match this combination — try a different filter"
          : `${matchCount} question${matchCount !== 1 ? "s" : ""} match this quiz`}
      </p>

      <button
        type="button"
        className="btn apply-btn"
        onClick={onApplyFilters}
        disabled={matchCount === 0}
      >
        🚀 Start Quiz
      </button>
    </div>
  );
}
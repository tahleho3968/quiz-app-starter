import type { Category } from "../types/quiz";

interface CategoryBreakdownEntry {
  category: Category;
  correct: number;
  total: number;
}

interface ResultCardProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  bestStreak: number;
  rank: number | null;
  categoryBreakdown: CategoryBreakdownEntry[];
  onRestart: () => void;
  onChangeSettings: () => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  git: "Git",
  react: "React",
  typescript: "TypeScript",
  tooling: "Tooling",
  deployment: "Deployment",
  "html-css": "HTML / CSS",
};

export function ResultCard({
  score,
  correctCount,
  totalQuestions,
  bestStreak,
  rank,
  categoryBreakdown,
  onRestart,
  onChangeSettings,
}: ResultCardProps) {
  const percent = Math.round((correctCount / totalQuestions) * 100);

  const headline =
    percent === 100
      ? "Perfect run! 🏆"
      : percent >= 80
        ? "Excellent work! 🌟"
        : percent >= 50
          ? "Nice effort! 💪"
          : "Keep practicing! 📚";

  return (
    <div className="card result-card">
      <h1>{headline}</h1>
      <p className="score-summary">
        You scored <strong>{correctCount}</strong> out of{" "}
        <strong>{totalQuestions}</strong>
      </p>
      <div className="percentage-badge">{percent}%</div>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Points</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">🔥 {bestStreak}</span>
          <span className="stat-label">Best Streak</span>
        </div>
        {rank !== null && (
          <div className="stat-box">
            <span className="stat-value">#{rank}</span>
            <span className="stat-label">Leaderboard</span>
          </div>
        )}
      </div>

      {categoryBreakdown.length > 0 && (
        <div className="breakdown-section">
          <h3 className="breakdown-title">Category Breakdown</h3>
          <ul className="breakdown-list">
            {categoryBreakdown.map((entry) => (
              <li key={entry.category} className="breakdown-item">
                <span>{CATEGORY_LABELS[entry.category]}</span>
                <span className="breakdown-score">
                  {entry.correct}/{entry.total}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="result-actions">
        <button className="btn restart-btn" onClick={onRestart}>
          Play Same Setup Again
        </button>
        <button className="btn btn-secondary" onClick={onChangeSettings}>
          Change Categories / Difficulty
        </button>
      </div>
    </div>
  );
}

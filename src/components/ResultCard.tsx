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
  timeBonus: number;
  streakBonus: number;
  rank: number | null;
  playerName: string;
  categoryBreakdown: CategoryBreakdownEntry[];
  onRestart: () => void;
  onChangeSettings: () => void;
  onReview: () => void; 
}

const CATEGORY_LABELS: Record<Category, string> = {
  git: "Git",
  react: "React",
  typescript: "TypeScript",
  tooling: "Tooling",
  deployment: "Deployment",
  "html-css": "HTML / CSS",
};

const RANK_TITLES: Record<number, string> = {
  1: "🏆 Quiz Master",
  2: "🥈 Silver Scholar",
  3: "🥉 Bronze Learner",
};

function getRankTitle(rank: number | null): string {
  if (!rank) return "Keep Practicing! 📚";
  if (rank <= 3) return RANK_TITLES[rank] || `#${rank} Competitor`;
  if (rank <= 10) return `#${rank} Challenger`;
  return `#${rank} Learner`;
}

export function ResultCard({
  score,
  correctCount,
  totalQuestions,
  bestStreak,
  timeBonus,
  streakBonus,
  rank,
  playerName,
  categoryBreakdown,
  onRestart,
  onChangeSettings,
  onReview,
}: ResultCardProps) {
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  const headline =
    accuracy === 100
      ? "Perfect run! 🏆"
      : accuracy >= 80
        ? "Excellent work! 🌟"
        : accuracy >= 50
          ? "Nice effort! 💪"
          : "Keep practicing! 📚";

  return (
    <div className="card result-card">
      <h1>{headline}</h1>
      <p className="score-summary">
        You scored <strong>{correctCount}</strong> out of{" "}
        <strong>{totalQuestions}</strong>
      </p>
      <div className="percentage-badge">{accuracy}%</div>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Total Points</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">🔥 {bestStreak}</span>
          <span className="stat-label">Best Streak</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">+{timeBonus}</span>
          <span className="stat-label">Time Bonus</span>
        </div>
        {streakBonus > 0 && (
          <div className="stat-box">
            <span className="stat-value">+{streakBonus}</span>
            <span className="stat-label">Streak Bonus</span>
          </div>
        )}
        {rank !== null && (
          <div className="stat-box">
            <span className="stat-value">#{rank}</span>
            <span className="stat-label">Rank</span>
          </div>
        )}
      </div>

      <div className="player-rank-section">
        <p className="player-name">👤 {playerName}</p>
        <p className="rank-title">{getRankTitle(rank)}</p>
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
        <button className="btn btn-secondary" onClick={onReview}>
          Review Answers
        </button>
        <button className="btn btn-secondary" onClick={onChangeSettings}>
          Change Categories / Difficulty
        </button>
      </div>
    </div>
  );
}
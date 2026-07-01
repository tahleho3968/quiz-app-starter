interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function ResultCard({
  score,
  totalQuestions,
  onRestart,
}: ResultCardProps) {
  return (
    <div className="card result-card">
      <h1>Quiz Completed! 🎉</h1>
      <p className="score-summary">
        You scored <strong>{score}</strong> out of{" "}
        <strong>{totalQuestions}</strong>
      </p>
      <div className="percentage-badge">
        {Math.round((score / totalQuestions) * 100)}%
      </div>
      <button className="btn restart-btn" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
}

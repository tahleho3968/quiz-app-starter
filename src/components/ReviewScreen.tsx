import type { Category, Question } from "../types/quiz";

interface AnswerRecord {
  question: Question;
  selectedIndex: number | null;
  correct: boolean;
}

interface ReviewScreenProps {
  answers: AnswerRecord[];
  onBack: () => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  git: "Git",
  react: "React",
  typescript: "TypeScript",
  tooling: "Tooling",
  deployment: "Deployment",
  "html-css": "HTML / CSS",
};

export function ReviewScreen({ answers, onBack }: ReviewScreenProps) {
  return (
    <div className="card review-card">
      <div className="review-header">
        <h1>Question Review</h1>
        <span className="review-count">{answers.length} questions</span>
      </div>

      {answers.map((answer, index) => {
        const { question, selectedIndex, correct } = answer;
        const timedOut = selectedIndex === null;

        return (
          <div
            key={`${question.id}-${index}`}
            className="review-question-block"
          >
            <div className="review-question-top">
              <span className="review-question-number">
                Question {index + 1}
              </span>
              <span className="category-tag review-tag">
                {CATEGORY_LABELS[question.category]}
              </span>
              <span
                className={`difficulty-tag difficulty-tag-${question.difficulty} review-tag`}
              >
                {question.difficulty.toUpperCase()}
              </span>
              <span
                className={`review-status ${correct ? "review-status-correct" : "review-status-incorrect"}`}
              >
                {correct
                  ? "✅ Correct"
                  : timedOut
                    ? "⏱️ Time's up"
                    : "❌ Incorrect"}
              </span>
            </div>

            <p className="review-question-text">{question.question}</p>

            <div className="review-options">
              {question.options.map((option, optionIndex) => {
                let optionClassName = "option-btn review-option";
                if (optionIndex === question.correctAnswer) {
                  optionClassName += " correct";
                } else if (optionIndex === selectedIndex) {
                  optionClassName += " incorrect";
                } else {
                  optionClassName += " disabled";
                }

                return (
                  <div key={optionIndex} className={optionClassName}>
                    {option}
                  </div>
                );
              })}
            </div>

            <p className="review-explanation">{question.explanation}</p>
          </div>
        );
      })}

      <div className="review-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          Back to Results
        </button>
      </div>
    </div>
  );
}
import type { Question } from "../types/quiz";

interface QuestionCardProps {
  currentQuestion: Question;
  selectedAnswerIndex: number | null;
  onOptionClick: (index: number) => void;
}

export function QuestionCard({
  currentQuestion,
  selectedAnswerIndex,
  onOptionClick,
}: QuestionCardProps) {
  return (
    <div className="card question-card">
      <h2>{currentQuestion.question}</h2>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => {
          let optionClassName = "option-btn";
          if (selectedAnswerIndex !== null) {
            if (index === currentQuestion.correctAnswer) {
              optionClassName += " correct";
            } else if (index === selectedAnswerIndex) {
              optionClassName += " incorrect";
            } else {
              optionClassName += " disabled";
            }
          }

          return (
            <button
              key={index}
              className={optionClassName}
              onClick={() => onOptionClick(index)}
              disabled={selectedAnswerIndex !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

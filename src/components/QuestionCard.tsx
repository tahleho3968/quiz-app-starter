import type { Question } from "../types/quiz";

interface QuestionCardProps {
  currentQuestion: Question;
  selectedAnswerIndex: number | null;
  onOptionClick: (index: number) => void;
  // ✂️ Removed currentQuestionIndex from interface
  isTransitioning: boolean;
}

export function QuestionCard({
  currentQuestion,
  selectedAnswerIndex,
  onOptionClick,
  // ✂️ Removed currentQuestionIndex from destructuring
  isTransitioning,
}: QuestionCardProps) {
  const hasAnswered = selectedAnswerIndex !== null;
  const isCorrectChoice = selectedAnswerIndex === currentQuestion.correctAnswer;

  const renderAnimalFeedback = () => {
    if (!hasAnswered) return null;

    return isCorrectChoice ? (
      <div className="animal-feedback success-pop">
        <img
          src="https://i.pinimg.com/originals/68/48/05/684805400def10ef5707c17b6f05a2ec.gif"
          alt="Mr. Eddy Dancing"
          className="animal-gif large-sticker"
        />
        <p>Fantastic! Mr. Eddy is doing a happy dance! 🏆</p>
      </div>
    ) : (
      <div className="animal-feedback shake-shake">
        <img
          src="https://thumbs.dreamstime.com/b/sad-lion-cub-crying-vector-stock-illustration-emoji-character-cartoon-frustrated-tears-sticker-emoticon-site-infographic-video-69902683.jpg"
          alt="Sad Crying Lion Leo"
          className="animal-gif large-sticker"
        />
        <p>Oops! Leo the Lion is crying... You'll get it next time! 💔</p>
      </div>
    );
  };

  const cardClassName = `card question-card ${isTransitioning ? "card-exit" : "slide-fade-in"}`;

  return (
    <div className={cardClassName}>
      <h2>{currentQuestion.question}</h2>

      <div className="animal-feedback-wrapper">{renderAnimalFeedback()}</div>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => {
          let optionClassName = "option-btn";
          if (hasAnswered) {
            if (index === currentQuestion.correctAnswer) {
              optionClassName += " correct text-pop";
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
              disabled={hasAnswered || isTransitioning}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import type { Question } from "../types/quiz";

interface QuestionCardProps {
  currentQuestion: Question;
  selectedAnswerIndex: number | null;
  onOptionClick: (index: number) => void;
  isTransitioning: boolean;
  timeLeft: number;
  timeLimit: number;
  streak: number;
  timedOut: boolean;
}

export function QuestionCard({
  currentQuestion,
  selectedAnswerIndex,
  onOptionClick,
  isTransitioning,
  timeLeft,
  timeLimit,
  streak,
  timedOut,
}: QuestionCardProps) {
  const hasAnswered = selectedAnswerIndex !== null || timedOut;
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
        <p>
          {timedOut
            ? "Time's up! Leo the Lion is crying... Be quicker next time! ⏱️"
            : "Oops! Leo the Lion is crying... You'll get it next time! 💔"}
        </p>
      </div>
    );
  };

  const cardClassName = `card question-card ${isTransitioning ? "card-exit" : "slide-fade-in"}`;
  const timePercent = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));
  const timerUrgent = timeLeft <= Math.ceil(timeLimit * 0.25) && !hasAnswered;

  return (
    <div className={cardClassName}>
      <div className="card-meta-row">
        <span
          className={`difficulty-tag difficulty-tag-${currentQuestion.difficulty}`}
        >
          {currentQuestion.difficulty.toUpperCase()}
        </span>
        {streak >= 2 && (
          <span className="streak-badge">🔥 {streak} streak</span>
        )}
      </div>

      <div className="timer-track">
        <div
          className={`timer-fill ${timerUrgent ? "timer-fill-urgent" : ""}`}
          style={{ width: `${timePercent}%` }}
        />
      </div>
      <div className="timer-label">
        {hasAnswered ? "Time's up" : `${timeLeft}s left`}
      </div>

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

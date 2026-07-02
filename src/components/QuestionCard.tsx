import { useEffect, useRef } from "react";
import type { Question } from "../types/quiz";

interface QuestionCardProps {
  currentQuestion: Question;
  selectedAnswerIndex: number | null;
  onOptionClick: (index: number) => void;
  isTransitioning: boolean;
  streak: number;
  timedOut: boolean;
  timeLeft: number;
  timeLimit: number;
}

export function QuestionCard({
  currentQuestion,
  selectedAnswerIndex,
  onOptionClick,
  isTransitioning,
  streak,
  timedOut,
  timeLeft,
  timeLimit,
}: QuestionCardProps) {
  const hasAnswered = selectedAnswerIndex !== null || timedOut;
  const isCorrectChoice = selectedAnswerIndex === currentQuestion.correctAnswer;
  const timerUrgent =
    timeLeft <= Math.ceil(timeLimit * 0.25) && !hasAnswered && timeLeft > 0;
  // TICK SOUND
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasAnswered || timeLeft <= 0) return;

    if (!tickAudioRef.current) {
      tickAudioRef.current = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-tick-tock-clock-timer-1045.mp3",
      );
      tickAudioRef.current.volume = 0.25;
    }

    const interval = setInterval(() => {
      tickAudioRef.current?.play().catch(() => {});
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, hasAnswered]);

  const timePercent = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));

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
            ? "Time's up! Leo the Lion is crying... ⏱️"
            : "Oops! Leo the Lion is crying... 💔"}
        </p>
      </div>
    );
  };

  const cardClassName = `card question-card ${
    isTransitioning ? "card-exit" : "slide-fade-in"
  }`;

  return (
    <div className={cardClassName}>
      {/* HEADER */}
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

      {/* TIMER (MERGED VERSION) */}
      <div className="timer-area">
        {timeLeft > 0 ? (
          <>
            <div className="timer-track">
              <div
                className={`timer-fill ${
                  timerUrgent ? "timer-fill-urgent heartbeat" : ""
                }`}
                style={{
                  width: `${timePercent}%`,
                  transformOrigin: "left",
                }}
              />
            </div>

            <div className="timer-label">
              {hasAnswered ? "Locked in" : `${timeLeft}s left`}
            </div>
          </>
        ) : (
          <div className="timer-expired show-in-bar-space">TIME’S UP!</div>
        )}
      </div>
      {/* QUESTION */}
      <h2>{currentQuestion.question}</h2>

      {/* FEEDBACK */}
      <div className="animal-feedback-wrapper">{renderAnimalFeedback()}</div>

      {/* OPTIONS */}
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

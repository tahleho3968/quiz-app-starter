import { useState, useEffect } from "react";
import questions from "./data/questions";
import { QuestionCard } from "./components/QuestionCard";
import { ResultCard } from "./components/ResultCard";
import "./App.css";

function App() {
  // --- STATE WITH LOCALSTORAGE PERSISTENCE INITIALIZERS ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const saved = localStorage.getItem("quiz_current_index");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(() => {
    const saved = localStorage.getItem("quiz_selected_answer");
    return saved ? parseInt(saved, 10) : null;
  });

  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem("quiz_score");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(() => {
    const saved = localStorage.getItem("quiz_is_finished");
    return saved === "true";
  });

  // --- PERSISTENCE WRITING ---
  useEffect(() => {
    localStorage.setItem("quiz_current_index", currentQuestionIndex.toString());
    localStorage.setItem("quiz_score", score.toString());
    localStorage.setItem("quiz_is_finished", isQuizFinished.toString());
    if (selectedAnswerIndex !== null) {
      localStorage.setItem("quiz_selected_answer", selectedAnswerIndex.toString());
    } else {
      localStorage.removeItem("quiz_selected_answer");
    }
  }, [currentQuestionIndex, selectedAnswerIndex, score, isQuizFinished]);

  const currentQuestion = questions[currentQuestionIndex];

  // --- INTERACTION HANDLERS ---
  const handleOptionClick = (optionIndex: number) => {
    if (selectedAnswerIndex !== null) return;
    setSelectedAnswerIndex(optionIndex);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextClick = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
    setIsQuizFinished(false);
    localStorage.clear();
  };

  if (isQuizFinished) {
    return (
      <div className="app">
        <ResultCard
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestartQuiz}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="quiz-header">
        <h1>ACA Orientation Quiz</h1>
        <div className="progress-tracker">
          Question <strong>{currentQuestionIndex + 1}</strong> of {questions.length}
        </div>
      </header>

      <span className="category-tag">
        {currentQuestion.category.toUpperCase()}
      </span>

      <QuestionCard
        currentQuestion={currentQuestion}
        selectedAnswerIndex={selectedAnswerIndex}
        onOptionClick={handleOptionClick}
      />

      {selectedAnswerIndex !== null && (
        <div className="feedback-box">
          <p className="feedback-status">
            {selectedAnswerIndex === currentQuestion.correctAnswer
              ? "✅ Correct!"
              : "❌ Incorrect"}
          </p>
          <p className="explanation-text">{currentQuestion.explanation}</p>
          <button className="btn next-btn" onClick={handleNextClick}>
            {currentQuestionIndex + 1 === questions.length
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
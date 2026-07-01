import { useState, useEffect } from "react";
import questions from "./data/questions";
import { QuestionCard } from "./components/QuestionCard";
import { ResultCard } from "./components/ResultCard";
import { FilterControls } from "./components/FilterControls";
import type { Difficulty } from "./types/quiz";
import "./App.css";

function getFilteredQuestions(categories: string[], difficulty: Difficulty) {
  const effectiveCategories = categories.length > 0 ? categories : null;
  return questions.filter((q) => {
    const categoryMatch = !effectiveCategories || effectiveCategories.includes(q.category);
    const difficultyMatch = difficulty === "all" || q.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });
}

function App() {
  // --- FILTER STATE (persisted, so a reload mid-quiz doesn't lose your setup) ---
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem("quiz_filter_categories");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(() => {
    const saved = localStorage.getItem("quiz_filter_difficulty");
    return (saved as Difficulty) || "all";
  });

  const [showFilters, setShowFilters] = useState<boolean>(() => {
    return localStorage.getItem("quiz_filters_applied") !== "true";
  });

  const [filteredQuestions, setFilteredQuestions] = useState(() =>
    getFilteredQuestions(selectedCategories, selectedDifficulty)
  );

  // --- QUIZ STATE ---
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

  // --- PERSISTENCE ---
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

  // --- FILTER LOGIC ---
  const applyFilters = () => {
    const filtered = getFilteredQuestions(selectedCategories, selectedDifficulty);
    if (filtered.length === 0) return; // guard: FilterControls also disables the button

    setFilteredQuestions(filtered);
    setShowFilters(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
    setIsQuizFinished(false);

    localStorage.setItem("quiz_filter_categories", JSON.stringify(selectedCategories));
    localStorage.setItem("quiz_filter_difficulty", selectedDifficulty);
    localStorage.setItem("quiz_filters_applied", "true");
    localStorage.removeItem("quiz_current_index");
    localStorage.removeItem("quiz_score");
    localStorage.removeItem("quiz_is_finished");
    localStorage.removeItem("quiz_selected_answer");
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalQuestions = filteredQuestions.length;

  // --- INTERACTION HANDLERS ---
  const handleOptionClick = (optionIndex: number) => {
    if (selectedAnswerIndex !== null || !currentQuestion) return;
    setSelectedAnswerIndex(optionIndex);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextClick = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
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
    setShowFilters(true);
    localStorage.clear();
  };

  if (showFilters) {
    return (
      <div className="app">
        <h1>🧠 ACA Orientation Quiz</h1>
        <p className="subtitle">Customize your quiz experience</p>
        <FilterControls
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          onApplyFilters={applyFilters}
        />
      </div>
    );
  }

  if (isQuizFinished || !currentQuestion) {
    return (
      <div className="app">
        <ResultCard score={score} totalQuestions={totalQuestions} onRestart={handleRestartQuiz} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="quiz-header">
        <div>
          <h1>🧠 ACA Orientation Quiz</h1>
          <span className="difficulty-badge">{currentQuestion.difficulty.toUpperCase()}</span>
        </div>
        <div className="progress-tracker">
          Question <strong>{currentQuestionIndex + 1}</strong> of {totalQuestions}
        </div>
      </header>

      <span className="category-tag">{currentQuestion.category.toUpperCase()}</span>

      <QuestionCard
        currentQuestion={currentQuestion}
        selectedAnswerIndex={selectedAnswerIndex}
        onOptionClick={handleOptionClick}
      />

      {selectedAnswerIndex !== null && (
        <div className="feedback-box">
          <p className="feedback-status">
            {selectedAnswerIndex === currentQuestion.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
          </p>
          <p className="explanation-text">{currentQuestion.explanation}</p>
          <button className="btn next-btn" onClick={handleNextClick}>
            {currentQuestionIndex + 1 === totalQuestions ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
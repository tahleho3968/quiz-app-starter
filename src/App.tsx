import { useState, useEffect } from "react";
import questions from "./data/questions";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);

  // Load saved score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore");
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, []);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);

    let newScore = score;
    if (selectedIndex === currentQuestion.correctAnswer) {
      newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("quizScore", String(newScore));
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowScore(false);
    localStorage.removeItem("quizScore");
  };

  if (showScore) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="app">
        <h1>🎉 Quiz Complete!</h1>
        <div className="score-card">
          <p className="score-number">{score} / {totalQuestions}</p>
          <p className="score-percentage">{percentage}%</p>
          <p className="score-message">
            {percentage >= 80 ? "🌟 Excellent work!" :
             percentage >= 60 ? "💪 Good job!" :
             percentage >= 40 ? "📚 Keep learning!" :
             "🌱 Keep practicing!"}
          </p>
          <button onClick={handleRestart} className="restart-btn">
            🔄 Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>🧠 Quiz App</h1>
      <div className="header">
        <p className="progress">Question {currentIndex + 1} of {totalQuestions}</p>
        <p className="score">Score: {score}</p>
      </div>

      <div className="question-container">
        <div className="question">
          <span className="category">{currentQuestion.category.toUpperCase()}</span>
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="options">
          {currentQuestion.options.map((option, index) => {
            let className = "option-btn";
            if (isAnswered && index === currentQuestion.correctAnswer) {
              className += " correct";
            } else if (isAnswered && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
              className += " wrong";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="explanation-box">
            <p className="explanation-text">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="next-btn"
          >
            {currentIndex < totalQuestions - 1 ? "Next Question →" : "See Results 🎉"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
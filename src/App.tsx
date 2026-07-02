import { useState, useMemo } from "react";
import questions from "./data/questions";
import "./App.css";

// Fisher-Yates safe shuffle (better than sort random)
const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Shuffle questions ONCE
  const shuffledQuestions = useMemo(() => shuffleArray(questions), []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Shuffle options ONLY when question changes
  const shuffledOptions = useMemo(() => {
    return shuffleArray(currentQuestion.options);
  }, [currentQuestionIndex]);

  const handleAnswer = (option: string) => {
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    const next = currentQuestionIndex + 1;

    if (next < shuffledQuestions.length) {
      setCurrentQuestionIndex(next);
    } else {
      setShowResult(true);
    }
  };

  // RESULT SCREEN
  if (showResult) {
    return (
      <div className="app">
        <h1>Quiz Finished 🎉</h1>

        <p>
          Your score: {score} / {shuffledQuestions.length}
        </p>

        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setShowResult(false);
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Quiz App</h1>

      <p>
        Question {currentQuestionIndex + 1} / {shuffledQuestions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <div className="options">
        {shuffledOptions.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>

      <p>Score: {score}</p>
    </div>
  );
}

export default App;
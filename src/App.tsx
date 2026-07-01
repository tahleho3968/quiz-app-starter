import { useState } from "react";
import questions from "./data/questions";
import Question from "./components/Question";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  // Results Screen
  if (quizFinished) {
    return (
      <div className="app">
        <div className="question-card">
          <h1>🎉 Quiz Complete!</h1>

          <h2>
            Your Score: {score} / {questions.length}
          </h2>

          <button onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (!quizStarted) {
    return (
      <div className="app">
        <Welcome
          totalQuestions={questions.length}
          onStart={() => setQuizStarted(true)}
        />
      </div>
    );
  }

  // Quiz Screen
 return (
  <div className="app">
    <div className="quiz-container">
      <h1>Quiz App</h1>

      <p className="progress">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <Question
        question={questions[currentQuestion]}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
      />

      <button
        disabled={selectedAnswer === null}
        onClick={handleNextQuestion}
      >
        {currentQuestion === questions.length - 1
          ? "Finish Quiz"
          : "Next Question"}
      </button>
    </div>
  </div>
);
}

export default App;
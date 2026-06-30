import { useState } from "react";
import questions from "./data/questions";
import Question from "./components/Question";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="app">
      {!quizStarted ? (
        <Welcome
          totalQuestions={questions.length}
          onStart={() => setQuizStarted(true)}
        />
      ) : (
        <>
          <h1>Quiz App</h1>
          <p>
            {questions.length} question
            {questions.length !== 1 ? "s" : ""} loaded
          </p>

         <Question question={questions[0]} />
        </>
      )}
    </div>
  );
}

export default App;

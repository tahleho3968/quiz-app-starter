import questions from "./data/questions";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Quiz App</h1>
      <p>
        {questions.length} question{questions.length !== 1 ? "s" : ""} loaded
      </p>

      {/*
        This is your starting point. Build your quiz from here.

        Some things to figure out:
        - How do you display one question at a time?
        - How does the user select an answer?
        - How do you track the score?
        - How do you move to the next question?
        - What happens when the quiz is done?

        There's no single right way — make it your own.
      */}
    </div>
  );
}

export default App;

type WelcomeProps = {
  totalQuestions: number;
  onStart: () => void;
};

function Welcome({ totalQuestions, onStart }: WelcomeProps) {
  return (
    <div className="welcome">
      <h1> Quiz App</h1>

      <p className="description">
        Test your knowledge of Git, GitHub, React, TypeScript, HTML, CSS,
        Vite, ESLint, Prettier and Vercel.
      </p>

      <div className="info">
        <p> {totalQuestions} Questions</p>
        <p> 6 Categories</p>
      </div>

      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
}

export default Welcome;
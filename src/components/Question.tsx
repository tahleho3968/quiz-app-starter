type QuestionProps = {
  question: {
    question: string;
    options: string[];
  };
};

function Question({ question }: QuestionProps) {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} className="option-btn">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
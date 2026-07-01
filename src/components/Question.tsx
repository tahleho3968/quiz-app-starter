type QuestionProps = {
  question: {
    question: string;
    options: string[];
  };
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
};

function Question({
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuestionProps) {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedAnswer === index ? "selected" : ""
            }`}
            onClick={() => onAnswerSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
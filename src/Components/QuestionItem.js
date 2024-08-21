import React from 'react';

const QuestionItem = ({ question, selectedAnswer, onAnswerSelect, isSubmitted }) => (
  <div className='question-container'>
    <p>{question.question}</p>
    {question.answers.map((answer, index) => (
      <button
        key={index}
        className={`answer-btn ${getAnswerButtonClass(question, answer, selectedAnswer, isSubmitted)}`}
        onClick={() => onAnswerSelect && onAnswerSelect(answer)}
        disabled={isSubmitted}
      >
        {answer}
      </button>
    ))}
  </div>
);

const getAnswerButtonClass = (question, answer, selectedAnswer, isSubmitted) => {
  if (isSubmitted) {
    if (answer === question.correct_answer) return 'btn-success';
    if (selectedAnswer === answer) return 'btn-danger';
    return 'btn-outline-success';
  } else {
    return selectedAnswer === answer ? 'btn-success' : 'btn-outline-success';
  }
};

export default QuestionItem;

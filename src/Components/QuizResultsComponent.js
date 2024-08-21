import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionItem from './QuestionItem';
import '../Style/QuizStyle.css';

const QuizResultsComponent = () => {
  const location = useLocation();
  const { quizQuestions = [], selectedAnswers = [] } = location.state || {};
  const navigate = useNavigate();

  if (!quizQuestions.length) return <div>No quiz data available.</div>;

  const score = selectedAnswers.filter(
    (answer, index) => answer === quizQuestions[index].correct_answer
  ).length;

  const getScoreColor = (score) => {
    if (score <= 1) return 'red';
    if (score < 4) return 'yellow';
    return 'green';
  };

  return (
    <div className='centered-container'>
      <h4 className='results-title'>Quiz Results</h4>
      {quizQuestions.map((question, index) => (
        <QuestionItem 
          key={index} 
          question={question} 
          selectedAnswer={selectedAnswers[index]} 
          isSubmitted={true}
        />
      ))}

      <div className="score">
        <p style={{ backgroundColor: getScoreColor(score), padding: '10px', borderRadius: '5px', color: 'black' }}>
          You scored {score} out of {quizQuestions.length}
        </p>
      </div>
      <button onClick={() => navigate('/')} className="btn-submit">
        Start New Quiz
      </button>
    </div>
  );
};

export default QuizResultsComponent;

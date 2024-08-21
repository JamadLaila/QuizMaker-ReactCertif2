import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../Services/quizService';
import QuestionItem from './QuestionItem';
import '../Style/QuizStyle.css';

const QuizQuestionsComponent = ({ category, difficulty }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions(category, difficulty);
        setQuizQuestions(questions);
        setSelectedAnswers(new Array(questions.length).fill(null));
        setIsQuestionsLoaded(true);
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };
    loadQuestions();
  }, [category, difficulty]);

  useEffect(() => {
    const allAnswered = selectedAnswers.length === quizQuestions.length &&
      selectedAnswers.every(answer => answer !== null);
    setIsSubmitVisible(allAnswered);
  }, [selectedAnswers, quizQuestions.length]);

  const handleAnswerSelection = (index, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleQuizSubmission = () => {
    navigate('/results', { state: { quizQuestions, selectedAnswers } });
  };

  if (!isQuestionsLoaded) return <div>Loading questions...</div>;

  return (
    <div>
      {quizQuestions.map((question, index) => (
        <QuestionItem 
          key={index} 
          question={question} 
          selectedAnswer={selectedAnswers[index]} 
          onAnswerSelect={(answer) => handleAnswerSelection(index, answer)}
          isSubmitted={false}
        />
      ))}
      {isSubmitVisible && (
        <button className="btn-submit" onClick={handleQuizSubmission}>
          Submit
        </button>
      )}
    </div>
  );
};

export default QuizQuestionsComponent;

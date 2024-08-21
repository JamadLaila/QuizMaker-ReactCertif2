import React, { useState, useEffect } from 'react';
import QuizQuestionsComponent from './QuizQuestionsComponent';
import { fetchCategories } from '../Services/quizService';
import '../Style/QuizStyle.css';

const QuizHomeComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCategories();
        setAvailableCategories(data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowQuiz(false);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    setShowQuiz(false);
  };

  const handleQuizCreation = () => {
    if (selectedCategory && selectedDifficulty) {
      setShowQuiz(true);
    } else {
      alert('Please select both category and difficulty.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;

  return (
    <div className="container">
      <h5 className="title">Quiz Maker</h5>
      <div className="form-group">
        <Dropdown 
          id="categorySelect" 
          value={selectedCategory} 
          onChange={handleCategoryChange} 
          options={availableCategories} 
          placeholder="Select Category" 
        />
        <Dropdown 
          id="difficultySelect" 
          value={selectedDifficulty} 
          onChange={handleDifficultyChange} 
          options={[
            { id: 'easy', name: 'Easy' },
            { id: 'medium', name: 'Medium' },
            { id: 'hard', name: 'Hard' }
          ]}
          placeholder="Select Difficulty" 
        />
        <button className="btn-sub" id="createBtn" onClick={handleQuizCreation}>
          Create
        </button>
        {showQuiz && (
          <QuizQuestionsComponent
            category={selectedCategory}
            difficulty={selectedDifficulty}
          />
        )}
      </div>
    </div>
  );
};

const Dropdown = ({ id, value, onChange, options, placeholder }) => (
  <select id={id} value={value} onChange={onChange} className="dropdown">
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
);

export default QuizHomeComponent;

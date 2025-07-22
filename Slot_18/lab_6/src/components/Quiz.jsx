import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetQuiz, showResult } from '../redux/quizSlice';
import QuizPage from './QuizPage';
import QuizResult from './QuizResult';
import QuizReview from './QuizReview';

const Quiz = () => {
  const [currentView, setCurrentView] = useState('quiz'); // 'quiz', 'result', 'review'
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(showResult());
    setCurrentView('result');
  };

  const handleRetry = () => {
    dispatch(resetQuiz());
    setCurrentView('quiz');
  };

  const handleReview = () => {
    setCurrentView('review');
  };

  const handleBackFromReview = () => {
    setCurrentView('result');
  };

  return (
    <div>
      {currentView === 'quiz' && (
        <QuizPage 
          onSubmit={handleSubmit}
          onReview={handleReview}
        />
      )}
      {currentView === 'result' && (
        <QuizResult 
          onRetry={handleRetry}
          onReview={handleReview}
        />
      )}
      {currentView === 'review' && (
        <QuizReview 
          onBack={handleBackFromReview}
        />
      )}
    </div>
  );
};

export default Quiz;
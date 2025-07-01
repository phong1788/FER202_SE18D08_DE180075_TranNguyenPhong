import React, { useState } from 'react';
import { questions } from '../data/questions';
import Question from './Question';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      setShowResult(true);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  return (
    <Question
      questionObj={questions[currentQuestion]}
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      selectedOption={selectedOption}
      onOptionSelect={handleOptionSelect}
      onNext={handleNext}
      showResult={showResult}
      score={score}
      quizCompleted={quizCompleted}
      onReset={resetQuiz}
    />
  );
};

export default Quiz;
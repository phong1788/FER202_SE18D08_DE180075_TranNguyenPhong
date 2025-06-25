import React from 'react';
import { useQuiz } from './QuizContext';

function Score() {
  const { score, questions } = useQuiz();
  return (
    <div variant="success" style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>Quiz Completed!</h1>
      <h2>Your score: {score} / {questions.length}</h2>
    </div>
  );
}

export default Score;
import React from 'react';

const Result = ({ score, total, restartQuiz }) => {
  return (
    <div className="result">
      <h2>Quiz Ended</h2>
      <p>Your Score: {score} / {total}</p>
      <button onClick={restartQuiz}>Play Again</button>
    </div>
  );
};

export default Result;

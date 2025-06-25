import React from 'react';

function Score({ score, total }) {
  return (
    <div variant="success" style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>Quiz Completed!</h1>
      <h2>Your score: {score} / {total}</h2>
    </div>
  );
}

export default Score;
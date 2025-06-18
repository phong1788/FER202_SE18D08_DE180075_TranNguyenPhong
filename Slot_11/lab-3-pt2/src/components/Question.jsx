import React from 'react';

const Question = ({ question, questionNumber, totalQuestions, checkAnswer }) => {
  return (
    <div className="question-box">
      <h2>Question {questionNumber} of {totalQuestions}</h2>
      <p><strong>{question.question}</strong></p>
      <ul>
        {question.options.map((option, idx) => (
          <li key={idx}>
            <button onClick={() => checkAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

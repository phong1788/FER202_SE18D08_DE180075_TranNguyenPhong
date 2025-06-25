import React, { createContext, useContext, useState } from 'react';

export const quizData = [
  {
    question: 'What is ReactJS?',
    answers: [
      'A JavaScript library for building user interfaces',
      'A programming language',
      'A database management system',
    ],
    correctAnswer: 'A JavaScript library for building user interfaces',
  },
  {
    question: 'What is JSX?',
    answers: [
      'A programming language',
      'A file format',
      'A syntax extension for JavaScript',
    ],
    correctAnswer: 'A syntax extension for JavaScript',
  },
];

const QuizContext = createContext();

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState(quizData);
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [current]: answer }));
  };

  const handleNext = () => {
    if (selectedAnswers[current] === questions[current].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleAddQuestion = (newQ) => {
    setQuestions((prev) => [...prev, newQ]);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        current,
        selectedAnswers,
        score,
        completed,
        handleSelectAnswer,
        handleNext,
        handleAddQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

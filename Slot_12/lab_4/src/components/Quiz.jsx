import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddQuestionForm from './AddQuestionForm';
import Question from './Question';
import Score from './Score';
import { Button } from 'react-bootstrap';

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

function Quiz() {
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

  if (completed) {
    return <Score score={score} total={questions.length} />;
  }

  return (
    <Container style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <Question
          qIdx={current}
          question={questions[current].question}
          answers={questions[current].answers}
          selected={selectedAnswers[current]}
          onSelect={handleSelectAnswer}
          nextButton={
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[current] == null}
              variant="danger"
            >
              {current === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          }
        />
      </div>
      <div>
        <AddQuestionForm onAddQuestion={handleAddQuestion} />
      </div>
    </Container>
  );
}

export default Quiz;
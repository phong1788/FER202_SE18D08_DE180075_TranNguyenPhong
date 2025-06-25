import React from 'react';
import { Container } from 'react-bootstrap';
import AddQuestionForm from './AddQuestionForm';
import Question from './Question';
import Score from './Score';
import { Button } from 'react-bootstrap';
import { QuizProvider, useQuiz } from './QuizContext';

function QuizContent() {
  const {
    questions,
    current,
    selectedAnswers,
    score,
    completed,
    handleSelectAnswer,
    handleNext,
    handleAddQuestion,
  } = useQuiz();

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

function Quiz() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}

export default Quiz;
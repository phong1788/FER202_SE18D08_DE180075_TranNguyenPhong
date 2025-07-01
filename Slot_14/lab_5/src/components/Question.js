import React from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function Question({
  questionObj,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onOptionSelect,
  onNext,
  showResult,
  score,
  quizCompleted,
  onReset
}) {
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Quiz</h2>
      {!quizCompleted ? (
        <Card>
          <Card.Body>
            <Card.Title>Question {currentQuestion + 1} of {totalQuestions}</Card.Title>
            <Card.Text className="h5 mt-4">{questionObj.question}</Card.Text>
            <Form className="mt-4">
              {questionObj.options.map((option, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`option-${index}`}
                  label={option}
                  name="quiz-option"
                  checked={selectedOption === option}
                  onChange={() => onOptionSelect(option)}
                  className="mb-3"
                />
              ))}
            </Form>
            <Button
              variant="primary"
              onClick={onNext}
              disabled={!selectedOption}
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body className="text-center">
            <h3>Quiz Completed!</h3>
            <Alert variant="info" className="mt-3">
              Your score: {score} out of {totalQuestions}
            </Alert>
            <Button variant="primary" onClick={onReset} className="mt-3">
              Retake Quiz
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Question;

import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Form, Badge, Container } from 'react-bootstrap';

const QuizReview = ({ onBack }) => {
  const { questions } = useSelector(state => state.quiz);
  const correct = questions.filter(q => q.selected === q.correct).length;
  const total = questions.length;

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h2>Quiz Review</h2>
        <p>Score: <Badge bg="primary" className="fs-6">{correct}/{total}</Badge></p>
      </div>
      
      {questions.map((q, idx) => {
        const isCorrect = q.selected === q.correct;
        const wasAnswered = q.selected !== null;
        
        return (
          <Card
            key={q.id}
            className={`mb-3 border-2 ${
              isCorrect 
                ? 'border-success bg-success bg-opacity-10' 
                : wasAnswered 
                  ? 'border-danger bg-danger bg-opacity-10'
                  : 'border-warning bg-warning bg-opacity-10'
            }`}
          >
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-bold">Question {idx + 1}</span>
              <Badge 
                bg={isCorrect ? 'success' : wasAnswered ? 'danger' : 'warning'}
                className="fs-6"
              >
                {isCorrect ? '✓ Correct' : wasAnswered ? '✗ Wrong' : '? Not Answered'}
              </Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>{q.question}</strong>
              </div>
              
              <Form>
                {q.options.map((opt, i) => {
                  const isUserAnswer = q.selected === i;
                  const isCorrectAnswer = q.correct === i;
                  
                  return (
                    <div key={i} className="mb-2">
                      <Form.Check
                        type="radio"
                        id={`review_q${q.id}_opt${i}`}
                        name={`review_q${q.id}`}
                        label={
                          <span className={`${isCorrectAnswer ? 'fw-bold text-success' : ''} ${isUserAnswer && !isCorrectAnswer ? 'text-danger' : ''}`}>
                            {opt}
                            {isCorrectAnswer && <span className="ms-2">✓ (Correct Answer)</span>}
                            {isUserAnswer && !isCorrectAnswer && <span className="ms-2">✗ (Your Answer)</span>}
                          </span>
                        }
                        checked={isUserAnswer}
                        readOnly
                        disabled
                        className={`${isCorrectAnswer ? 'border-success' : ''} ${isUserAnswer && !isCorrectAnswer ? 'border-danger' : ''}`}
                      />
                    </div>
                  );
                })}
              </Form>
              
              {!wasAnswered && (
                <div className="mt-3 p-2 bg-warning bg-opacity-25 rounded">
                  <small className="text-warning-emphasis">
                    <strong>⚠️ You didn't answer this question</strong>
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}
      
      <div className="text-center mt-4 mb-5">
        <Button variant="secondary" onClick={onBack} size="lg">
          ← Back to Results
        </Button>
      </div>
    </Container>
  );
};

export default QuizReview; 
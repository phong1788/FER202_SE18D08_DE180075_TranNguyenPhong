import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Badge } from 'react-bootstrap';

const QuizResult = ({ onRetry, onReview }) => {
  const { questions } = useSelector(state => state.quiz);
  const total = questions.length;
  const correct = questions.filter(q => q.selected === q.correct).length;
  const percentage = Math.round((correct / total) * 100);
  
  // Xác định màu sắc và thông điệp dựa trên điểm số
  const getScoreVariant = () => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="text-center mt-5">
      <Card className="mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title as="h2" className="mb-4">Quiz Results</Card.Title>
          
          <div className="mb-4">
            <h1 className="display-4">
              <Badge bg={getScoreVariant()} className="p-3">
                {correct} / {total}
              </Badge>
            </h1>
            <h3 className={`text-${getScoreVariant()} mt-3`}>
              {percentage}% - {getScoreMessage()}
            </h3>
          </div>

          <div className="mb-4">
            <div className="row text-center">
              <div className="col-4">
                <div className="border rounded p-2">
                  <div className="fw-bold text-success">{correct}</div>
                  <small className="text-muted">Correct</small>
                </div>
              </div>
              <div className="col-4">
                <div className="border rounded p-2">
                  <div className="fw-bold text-danger">{total - correct}</div>
                  <small className="text-muted">Wrong</small>
                </div>
              </div>
              <div className="col-4">
                <div className="border rounded p-2">
                  <div className="fw-bold text-primary">{total}</div>
                  <small className="text-muted">Total</small>
                </div>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button variant="info" onClick={onReview} size="lg">
              📋 Review Answers
            </Button>
            <Button variant="outline-secondary" onClick={onRetry}>
              🔄 Try Again
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuizResult; 
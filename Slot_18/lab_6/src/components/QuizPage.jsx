import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOption, resetQuiz } from '../redux/quizSlice';
import { Container, Row, Col, Card, Button, Form, ButtonGroup, Alert, ProgressBar } from 'react-bootstrap';

const QuizPage = ({ onSubmit, onReview }) => {
  const { questions } = useSelector(state => state.quiz);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [warning, setWarning] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (qid, idx) => {
    if (!submitted) {
      dispatch(selectOption({ questionId: qid, optionIndex: idx }));
      setWarning('');
    }
  };

  const handleReset = () => {
    dispatch(resetQuiz());
    setCurrent(0);
    setWarning('');
    setSubmitted(false);
  };

  const handleNav = (type) => {
    if (questions[current].selected === null) {
      setWarning('Please select an answer before moving to the next question!');
      return;
    }
    setWarning('');
    if (type === 'first') setCurrent(0);
    else if (type === 'prev' && current > 0) setCurrent(current - 1);
    else if (type === 'next' && current < questions.length - 1) setCurrent(current + 1);
    else if (type === 'last') setCurrent(questions.length - 1);
  };

  const handleSubmit = () => {
    // Kiểm tra xem tất cả câu hỏi đã được trả lời chưa
    const unansweredQuestions = questions.filter(q => q.selected === null);
    if (unansweredQuestions.length > 0) {
      setWarning(`You have ${unansweredQuestions.length} unanswered question(s). Please answer all questions before submitting.`);
      return;
    }
    
    setSubmitted(true);
    setWarning('');
    if (onSubmit) onSubmit();
  };

  // Tính toán tiến độ
  const answeredQuestions = questions.filter(q => q.selected !== null).length;
  const progressPercentage = (answeredQuestions / questions.length) * 100;

  return (
    <Container className="mt-4">
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="d-flex justify-content-between mb-2">
          <span>Progress: {answeredQuestions}/{questions.length} questions answered</span>
          <span>Question {current + 1} of {questions.length}</span>
        </div>
        <ProgressBar 
          now={progressPercentage} 
          label={`${Math.round(progressPercentage)}%`}
          variant={progressPercentage === 100 ? 'success' : 'primary'}
        />
      </div>

      <Card className="mb-3">
        <Card.Body>
          <div className="mb-3">
            <b>Q{current + 1}. {questions[current].question}</b>
          </div>
          <Form>
            <Row>
              {questions[current].options.map((opt, idx) => (
                <Col md={6} className="mb-2" key={idx}>
                  <Form.Check
                    type="radio"
                    id={`q${questions[current].id}_opt${idx}`}
                    name={`q${questions[current].id}`}
                    label={opt}
                    checked={questions[current].selected === idx}
                    onChange={() => handleOptionClick(questions[current].id, idx)}
                    className="bg-light p-2 rounded"
                    disabled={submitted}
                  />
                </Col>
              ))}
            </Row>
          </Form>
          {warning && <Alert variant="warning" className="mt-2">{warning}</Alert>}
        </Card.Body>
      </Card>
      <ButtonGroup className="mb-3">
        <Button variant="outline-primary" onClick={() => handleNav('first')} disabled={current === 0}>First</Button>
        <Button variant="outline-primary" onClick={() => handleNav('prev')} disabled={current === 0}>Prev</Button>
        <Button variant="outline-primary" onClick={() => handleNav('next')} disabled={current === questions.length - 1}>Next</Button>
        <Button variant="outline-primary" onClick={() => handleNav('last')} disabled={current === questions.length - 1}>Last</Button>
      </ButtonGroup>
      <div className="mb-3">
        <Button variant="secondary" onClick={handleReset} className="me-2">Reset</Button>
        <Button variant="success" onClick={handleSubmit} className="me-2" disabled={submitted}>Submit</Button>
        <Button variant="info" onClick={onReview}>Quiz Review</Button>
      </div>
    </Container>
  );
};

export default QuizPage; 
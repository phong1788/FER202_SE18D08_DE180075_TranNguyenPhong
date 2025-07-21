import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useQuiz } from './QuizContext';

function AddQuestionForm() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const { handleAddQuestion } = useQuiz();

  const handleAnswerChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      question &&
      answers.every((a) => a) &&
      answers.includes(correctAnswer)
    ) {
      handleAddQuestion({ question, answers, correctAnswer });
      setQuestion('');
      setAnswers(['', '', '']);
      setCorrectAnswer('');
    } else {
      alert("Conflix!!");
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Thêm câu hỏi mới</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Câu hỏi"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </Form.Group>
          {answers.map((ans, idx) => (
            <Form.Group className="mb-2" key={idx}>
              <Form.Control
                type="text"
                placeholder={`Đáp án ${idx + 1}`}
                value={ans}
                onChange={e => handleAnswerChange(idx, e.target.value)}
              />
            </Form.Group>
          ))}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Đáp án đúng (phải trùng 1 đáp án trên)"
              value={correctAnswer}
              onChange={e => setCorrectAnswer(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Thêm câu hỏi</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddQuestionForm;
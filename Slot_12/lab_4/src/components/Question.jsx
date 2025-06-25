import React from 'react';
import { Card, ListGroup, Form } from 'react-bootstrap';

function Question({ qIdx, question, answers, selected, onSelect, nextButton }) {
  return (
    <Card style={{ marginTop: '50px', marginBottom: '10px'}}>
      <Card.Body>
        <Card.Title as="h2" style={{ color: 'red', textAlign: 'left', fontSize: 24 }}>
          Question {qIdx + 1}
        </Card.Title>
        <div style={{ fontWeight: 'bold', marginBottom: 8, textAlign: 'left' }}>{question}</div>
        <div style={{ padding: 16 }}>
          <ListGroup>
            {answers.map((ans, aIdx) => (
              <ListGroup.Item
                key={aIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: aIdx === 0
                    ? '8px 8px 0 0'
                    : aIdx === answers.length - 1
                    ? '0 0 8px 8px'
                    : '0',
                  border: '1px solid #dee2e6',
                  borderTop: aIdx === 0 ? '1px solid #dee2e6' : 'none',
                  padding: '10px 16px',
                }}
              >
                <Form.Check
                  type="radio"
                  id={`q${qIdx}-ans${aIdx}`}
                  name={`question-${qIdx}`}
                  value={ans}
                  checked={selected === ans}
                  onChange={() => onSelect(ans)}
                  style={{
                    marginRight: 12,
                    accentColor: selected === ans ? '#1976d2' : undefined,
                  }}
                />
                <span style={{ fontWeight: 500 }}>{ans}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div style={{ textAlign: 'left', marginTop: 5, marginLeft: 17 }}>
          {nextButton}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Question;
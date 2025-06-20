import React, { useReducer, useEffect, useRef } from "react";
import { Button, Container, Card, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: null, // {correct: true/false, message: string}
  timer: 10,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      const isCorrect = action.payload === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: isCorrect
          ? { correct: true, message: "Correct! 🎉" }
          : { correct: false, message: `Incorrect! The correct answer is ${state.questions[state.currentQuestion].answer}` },
      };
    }
    case "NEXT_QUESTION": {
      const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
      const newScore = isCorrect ? state.score + 1 : state.score;
      const isLast = state.currentQuestion + 1 === state.questions.length;
      // Update high score if needed
      let newHighScore = state.highScore;
      if (isLast && newScore > state.highScore) {
        newHighScore = newScore;
        localStorage.setItem('quiz_high_score', newHighScore);
      }
      return {
        ...state,
        score: newScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: null,
        timer: 10,
        showScore: isLast,
        highScore: newHighScore,
      };
    }
    case "RESTART_QUIZ": {
      return {
        ...initialState,
        highScore: state.highScore,
      };
    }
    case "TICK": {
      if (state.timer > 0) {
        return { ...state, timer: state.timer - 1 };
      } else {
        // Nếu hết giờ mà chưa chọn đáp án, tự động chuyển câu và feedback sai
        const isLast = state.currentQuestion + 1 === state.questions.length;
        let newHighScore = state.highScore;
        if (isLast && state.score > state.highScore) {
          newHighScore = state.score;
          localStorage.setItem('quiz_high_score', newHighScore);
        }
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          selectedOption: "",
          feedback: null,
          timer: 10,
          showScore: isLast,
          highScore: newHighScore,
        };
      }
    }
    case "LOAD_HIGHSCORE": {
      return {
        ...state,
        highScore: action.payload,
      };
    }
    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timer, highScore } = state;
  const timerRef = useRef();

  // Load high score from localStorage on mount
  useEffect(() => {
    const hs = parseInt(localStorage.getItem('quiz_high_score'), 10) || 0;
    dispatch({ type: 'LOAD_HIGHSCORE', payload: hs });
    // eslint-disable-next-line
  }, []);

  // Timer effect
  useEffect(() => {
    if (showScore) return;
    if (selectedOption) return; // Dừng timer khi đã chọn đáp án
    timerRef.current = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [showScore, currentQuestion, selectedOption]);

  // Khi chọn đáp án, dừng timer
  useEffect(() => {
    if (selectedOption) clearInterval(timerRef.current);
  }, [selectedOption]);

  const handleOptionSelect = (option) => {
    if (!selectedOption) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  // Tiến trình
  const progress = `${Math.min(currentQuestion + 1, questions.length)}/${questions.length}`;
  const percent = ((currentQuestion) / questions.length) * 100;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>Progress: <b>{progress}</b></div>
          <div>
            High Score: <b>{highScore}</b>
          </div>
        </div>
        <ProgressBar now={percent} style={{ height: 8, marginBottom: 20 }} />
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <div className="mb-2">High Score: <b>{highScore}</b></div>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h4>
                Question {questions[currentQuestion].id}:<br />
                {questions[currentQuestion].question}
              </h4>
              <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                Time: <span style={{ color: timer < 5 ? 'red' : 'black' }}>{timer}s</span>
              </div>
            </div>
            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option
                      ? (option === questions[currentQuestion].answer ? "success" : "danger")
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!selectedOption}
                >
                  {option}
                </Button>
              ))}
            </div>
            {feedback && (
              <div className="mt-3" style={{ fontSize: 18, fontWeight: 500 }}>
                {feedback.correct ? (
                  <span className="text-success"><FaCheckCircle /> {feedback.message}</span>
                ) : (
                  <span className="text-danger"><FaTimesCircle /> {feedback.message}</span>
                )}
              </div>
            )}
            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank; 
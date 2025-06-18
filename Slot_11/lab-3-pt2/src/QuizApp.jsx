import React, { Component } from 'react';
import Question from './components/Question';
import Result from './components/Result';

class QuizApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris"
        },
        {
          id: 2,
          question: "What is the largest planet in our solar system?",
          options: ["Jupiter", "Saturn", "Mars", "Earth"],
          answer: "Jupiter"
        }
      ],
      currentQuestion: 0,
      score: 0,
      quizEnd: false
    };
  }

  checkAnswer = (selectedOption) => {
    const { currentQuestion, questions, score } = this.state;
    const correct = questions[currentQuestion].answer === selectedOption;

    this.setState({
      score: correct ? score + 1 : score
    }, () => {
      this.nextQuestion();
    });
  };

  nextQuestion = () => {
    const { currentQuestion, questions } = this.state;
    if (currentQuestion + 1 < questions.length) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      this.setState({ quizEnd: true });
    }
  };

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      score: 0,
      quizEnd: false
    });
  };

  render() {
    const { questions, currentQuestion, score, quizEnd } = this.state;

    return (
      <div className="container">
        <h1>Quiz Application</h1>
        {
          quizEnd ? (
            <Result score={score} total={questions.length} restartQuiz={this.restartQuiz} />
          ) : (
            <Question
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              checkAnswer={this.checkAnswer}
            />
          )
        }
      </div>
    );
  }
}

export default QuizApp;
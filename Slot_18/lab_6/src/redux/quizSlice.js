import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    {
      id: 1,
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["javascript", "scripting", "script", "js"],
      correct: 2, // index of "script"
      selected: null,
    },
    {
      id: 2,
      question: "What are variables used for in JavaScript Programs?",
      options: [
        "Storing numbers, dates, or other values",
        "Varying randomly",
        "Causing high-school algebra flashbacks",
        "None of these"
      ],
      correct: 0,
      selected: null,
    },
    {
      id: 3,
      question: "Which of the following can't be done with client-side JavaScript?",
      options: [
        "Validating a form",
        "Sending a form's contents by email",
        "Storing the form's contents to a database file on the server",
        "None of the above"
      ],
      correct: 2,
      selected: null,
    },
    {
      id: 4,
      question: "Which symbol is used for comments in JavaScript?",
      options: [
        "//",
        "<!-- -->",
        "/* */",
        "#"
      ],
      correct: 0,
      selected: null,
    },
    {
      id: 5,
      question: "How do you write 'Hello World' in an alert box?",
      options: [
        "msg('Hello World');",
        "alertBox('Hello World');",
        "alert('Hello World');",
        "msgBox('Hello World');"
      ],
      correct: 2,
      selected: null,
    },
    // Thêm các câu hỏi khác nếu muốn
  ],
  showResult: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectOption: (state, action) => {
      const { questionId, optionIndex } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) question.selected = optionIndex;
    },
    showResult: (state) => {
      state.showResult = true;
    },
    resetQuiz: (state) => {
      state.questions.forEach(q => q.selected = null);
      state.showResult = false;
    }
  }
});

export const { selectOption, showResult, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer; 
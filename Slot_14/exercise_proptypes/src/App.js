import React from "react";
import MyForm from "././components/MyForm"; // Giả sử MyForm được lưu trong thư mục cùng với App.js
import MyValidatedForm from "./components/MyValidatedForm.jsx"; // Example 4

const App = () => {
  const handleFormSubmit = (data) => {
    console.log("Dữ liệu MyForm:", data);
  };

  const handleValidatedFormSubmit = (data) => {
    console.log("Dữ liệu MyValidatedForm:", data);
  };

  return (
    <div className="App">
      <h1>Ứng Dụng Nhiều Form</h1>

      {/* Form sử dụng useReducer (Example 3) */}
      <MyForm title="Example 3" onSubmit={handleFormSubmit} />

      <hr />

      {/* Form sử dụng useState + kiểm tra nâng cao (Example 4) */}
      <MyValidatedForm title="Example 4" onSubmit={handleValidatedFormSubmit} />
    </div>
  );
};

export default App;
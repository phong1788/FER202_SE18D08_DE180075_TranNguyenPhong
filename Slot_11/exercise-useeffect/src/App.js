import React from "react";
import Exercise4 from "./components/Exercise4";
import Exercise5 from "./components/Exercise5";
import Exercise6 from "./components/Exercise6";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-4">
      <h2>Exercise 4</h2>
      <Exercise4 />
      <br/>
      <h2>Exercise 5</h2> 
      <Exercise5 />
      <br/>
      <h2>Exercise 6</h2>
      <Exercise6 />

    </div>
  );
}

export default App;

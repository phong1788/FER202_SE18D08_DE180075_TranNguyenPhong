import React from "react";
import Exercise1 from "./Exercise1";
import Exercise2 from "./Exercise2";
import Exercise3 from "./Exercise3";
import Exercise4 from "./Exercise4";
import Exercise5 from "./Exercise5";
import Exercise6 from "./Exercise6";
import Exercise7 from "./Exercise7";
import Exercise8 from "./Exercise8";
import Exercise9 from "./Exercise9";
import Exercise10 from "./Exercise10";

const employees = [
  { id: 1, name: "Anna", department: "HR", age: 50 },
  { id: 2, name: "Brian", department: "IT", age: 40 },
  { id: 3, name: "Clara", department: "Finance", age: 19 },
  { name: "Ann", department: "Finance", age: 22 },
  { name: "Elisabeth", department: "HR", age: 16 }
];

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Lab 1</h1>

      <h3>Exercise 1</h3>
      <Exercise1 employee={employees[0]} />

      <hr />

      <h3>Exercise 2</h3>
      <Exercise2 employees={employees} />

      <hr />

      <h3>Exercise 3</h3>
      <Exercise3 employees={employees} />

      <hr />

      <Exercise4 />

      <hr />

      <h3>Exercise 5</h3>
      <Exercise5 employees={employees} />

      <hr />

      <h3>Exercise 6</h3>
      <Exercise6 employees={employees} />

      <hr />

      <h3>Exercise 7</h3>
      <Exercise7 employees={employees} />

      <hr />

      <h3>Exercise 8</h3>
      <Exercise8 employees={employees} />

      <hr />

      <h3>Exercise 9</h3>
      <Exercise9 employees={employees} />

      <hr />

      <h3>Exercise 10</h3>
      <Exercise10 employees={employees} />
    </div>
  );
}

export default App;

import React from "react";

function Exercise1({ employee }) {
  const { name, age, department } = employee;

  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Department: {department}</p>
    </div>
  );
}

export default Exercise1;

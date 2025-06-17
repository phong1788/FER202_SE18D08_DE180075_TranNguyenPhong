import React from "react";

function Exercise2({ employees }) {
  return (
    <ul>
      {employees.map((employee, index) => {
        const { id, name, department } = employee;
        return (
          <li key={id || index}>
            {name} - {department}
          </li>
        );
      })}
    </ul>
  );
}

export default Exercise2;

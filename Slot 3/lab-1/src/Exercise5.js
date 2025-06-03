import React from "react";

function Exercise5({ employees = [] }) {
  return (
    <div>
      <select>
        {employees.map((employee, index) => {
          const { id, name } = employee;
          return (
            <option key={id || index} value={name}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Exercise5;

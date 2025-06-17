import React from "react";

function Exercise3({ employees }) {
  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => {
          const { id, name, department } = employee;
          return (
            <tr key={id || index}>
              <td>{id || index + 1}</td>
              <td>{name}</td>
              <td>{department}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Exercise3;

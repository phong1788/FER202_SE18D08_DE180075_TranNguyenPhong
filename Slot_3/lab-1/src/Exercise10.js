import React, { useState } from "react";

function Exercise10({ employees }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search employee by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <ul>
        {filteredEmployees.map((emp, idx) => (
          <li key={emp.id ?? idx}>
            {emp.name} - {emp.department} - Age: {emp.age}
          </li>
        ))}
        {filteredEmployees.length === 0 && <li>No employee found</li>}
      </ul>
    </div>
  );
}

export default Exercise10;

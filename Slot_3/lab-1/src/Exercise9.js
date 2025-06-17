import React from "react";

function Exercise9({ employees }) {
  const isTeenager = employees.some(e => e.age >= 10 && e.age <= 20);

  return (
    <div>
      <p>{isTeenager ? "True" : "False"}</p>
    </div>
  );
}

export default Exercise9;

import React from "react";

const averageAge = (...ages) => {
  if (ages.length === 0) return 0;
  const sum = ages.reduce((total, age) => total + age, 0);
  return sum / ages.length;
};

function Exercise4() {
  // Ví dụ: lấy tuổi của các nhân viên để tính trung bình
  const ages = [30, 50, 40, 19, 22, 16];
  const avg = averageAge(...ages);

  return (
    <div>
      <h3>Exercise 4</h3>
      <p>Average age: {avg.toFixed(2)}</p>
    </div>
  );
}

export default Exercise4;

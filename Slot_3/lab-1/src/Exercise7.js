import React from "react";

function Exercise7({ employees = [] }) {
    // Tạo một bản sao để không làm thay đổi mảng gốc
    const sortedEmployees = [...employees].sort((a, b) => {
        const deptCompare = a.department.localeCompare(b.department);
        if (deptCompare !== 0) return deptCompare;
        return a.name.localeCompare(b.name);
    });

    return (
        <div>

            <ul>
                {sortedEmployees.map((employee, index) => {
                    const { id, name, department } = employee;
                    return (
                        <li key={id || index}>
                            {name} – {department}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Exercise7;

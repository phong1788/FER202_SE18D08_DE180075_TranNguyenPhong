import React from "react";

function Exercise6({ employees = [] }) {
    // Lọc ra các nhân viên thuộc phòng IT
    const itEmployees = employees.filter(emp => emp.department === "IT");

    return (
        <div>
            <ul>
                {itEmployees.map((employee, index) => {
                    const { id, name } = employee;
                    return (
                        <li key={id || index}>
                            {name} - {employee.department}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Exercise6;

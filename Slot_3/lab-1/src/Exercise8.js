import React from "react";

function Exercise8({ employees }) {
    const groupedByDept = employees.reduce((groups, emp) => {
        const dept = emp.department || "Unknown";
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(emp);
        return groups;
    }, {});

    return (
        <div>
            {Object.entries(groupedByDept).map(([dept, empList]) => (
                <div key={dept}>
                    <h3>{dept}</h3>
                    <ul>
                        {empList.map((emp, index) => (
                            <li key={emp.id ?? index}>{emp.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Exercise8;

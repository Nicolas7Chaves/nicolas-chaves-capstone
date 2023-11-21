import './Employees.scss';
import React, { useState, useEffect } from 'react';


function Employees() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/employees')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
        <div>Employees</div>
            {employees.map(employee => (
                <div>Employee Id: 
                    {employee.id}
                    <h2>{employee.first_name} {employee.last_name}</h2>
                    <p>Hourly Rate: {employee.hourly_rate}</p>
                </div>
            ))}
        </>
    );
}

export default Employees;
import './Employees.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Employees() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await axios.get(`http://localhost:8081/employees`);
                // console.log(response.data);
                setEmployees(response.data)
            }
            catch (error) {
                console.error(`Error retrieving employees! error: ${error}`);
            }
        }
        getEmployees();
    }, []);

    return (
        <>
            <div>Employees</div>
            {employees.map(employee => (
                <div>
                    <h3>Employee Id: </h3>
                    {employee?.id}
                    <p>{employee?.first_name} {employee?.last_name}</p>
                    <p>Hourly Rate: {employee?.hourly_rate}</p>
                </div>
            ))}
        </>
    );
}

export default Employees;
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
            <div className="employees-container">
                {employees.map(employee => (
                    <div key={employee.id} className="employee-box">
                        <h3 className='employee__header'>Employee Id: {employee.id}</h3>
                        <p className='employee__name'>{employee.first_name} {employee.last_name}</p>
                        <p className='employee__rate'>Hourly Rate: {employee.hourly_rate}</p>
                        <p className={`employee__status ${employee.isClockedIn ? 'clocked-in' : 'clocked-out'}`}>
                            Status: {employee.isClockedIn ? 'Clocked In' : 'Clocked Out'} </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Employees;
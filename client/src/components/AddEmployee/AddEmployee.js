import React, { useState } from 'react';
import './AddEmployee.scss';
import axios from 'axios';

function AddEmployee() {
    const [newEmployee, setNewEmployee] = useState({
        first_name: '',
        last_name: '',
        hourly_rate: ''
    });

    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/employees', newEmployee);
            if(response.status === 201) {
                console.log('Employee added successfully');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div className="add-employee-form">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={newEmployee.first_name} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={newEmployee.last_name} onChange={handleChange} />
                </label>
                <label>
                    Hourly Rate:
                    <input type="number" name="hourly_rate" value={newEmployee.hourly_rate} onChange={handleChange} />
                </label>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;

import './Employees.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../../assets/svg/User.svg';
import { useNavigate } from 'react-router-dom';
import EditEmployee from '../EditEmployee/EditEmployee';
import moment from 'moment';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null); // Declare editingEmployee state
    const navigate = useNavigate();

    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await axios.get(`http://localhost:8081/employees`);
                setEmployees(response.data);
            } catch (error) {
                console.error(`Error retrieving employees! error: ${error}`);
            }
        }
        getEmployees();
    }, []);

    const handleAddEmployee = () => {
        navigate('/employee/add-employee');
    };

    const handleEdit = (employee) => {
        const { isClockedIn, ...employeeData } = employee;
        setEditingEmployee(employeeData);
    };

    const handleRemove = async (employeeId) => {
        try {
            await axios.delete(`http://localhost:8081/employees/${employeeId}`);
            setEmployees(employees.filter(emp => emp.id !== employeeId));
        } catch (error) {
            console.error(`Error removing employee: ${error}`);
        }
    };

    const handleUpdateEmployee = async (updatedEmployee) => {
        const { created_at, ...updateData } = updatedEmployee;
        if (updateData.updated_at) {
            updateData.updated_at = moment(updateData.updated_at).format('YYYY-MM-DD HH:mm:ss');
        }
        try {
            const response = await axios.put(`http://localhost:8081/employees/${updateData.id}`, updateData);
            if (response.status === 200) {
                const updatedEmployees = employees.map(employee =>
                    employee.id === updatedEmployee.id ? { ...employee, ...updateData } : employee
                );
                setEmployees(updatedEmployees);
            } else {
                console.error("Failed to update the employee");
            }
        } catch (error) {
            console.error(`Error updating employee: ${error}`);
        }
        setEditingEmployee(null);
    };


    return (
        <>
            <button onClick={handleAddEmployee} className="add-employee-button">+</button>
            <div className="employees-container">
                {employees.map(employee => (
                    <div key={employee.id} className="employee-box">
                        <div className='layout'>
                            <div className='employee'>
                                <h3 className='employee__header'>Employee Id: {employee.id}</h3>
                                <p className='employee__name'>{employee.first_name} {employee.last_name}</p>
                                <p className='employee__rate'>Hourly Rate: {employee.hourly_rate}</p>
                            </div>
                            <div className='layout2'>
                                <img src={User} alt="default logo for user profile" className='employee__picture' />
                            </div>
                        </div>
                        <p className={`employee__status ${employee.isClockedIn ? 'clocked-in' : 'clocked-out'}`}>
                            Status: {employee.isClockedIn ? 'Clocked In' : 'Clocked Out'} </p>
                        <button className='edit' onClick={() => handleEdit(employee)}>Edit</button>
                    </div>
                ))}
            </div>
            <div >
                {editingEmployee && (
                    <EditEmployee
                        employee={editingEmployee}
                        onSave={handleUpdateEmployee}
                        onRemove={handleRemove}
                        onClose={() => setEditingEmployee(null)}
                    />
                )}
            </div>
        </>
    );
}

export default Employees;

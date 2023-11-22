import './Attendance.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
        async function getAttendance() {
            try {
                const response = await axios.get(`http://localhost:8081/attendance`);
                setAttendance(response.data);
            }
            catch (error) {
                console.error (`Error retrieving attendance records. Error: ${error}`);
            }
        }
        getAttendance();
    }, []);
    
    return (
        <>
        <div>Attendance</div>
            {attendance.map(record => (
                <div>Employee Id : 
                    {record.employee_id}
                    <h2>Clock In Time: <br></br>{record.clock_in_time}</h2>
                    <p>Hourly Rate: </p>
                    <p>{record.date}</p>  
                </div>
            ))}
        </>
    )
}

export default Attendance;

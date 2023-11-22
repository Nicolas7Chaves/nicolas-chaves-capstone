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
                console.error(`Error retrieving attendance records. Error: ${error}`);
            }
        }
        getAttendance();
    }, []);

    return (
        <>
            <div>Attendance</div>
            <div>
            {attendance.map(record => (
                <div key={record.id}> {/* Add a key for each list item */}
                    <h3>Employee Id: {record.employee_id}</h3>
                    <p>Employee: {record.first_name} {record.last_name}</p> 
                    <p>Clock In Time: <br />{record.clock_in_time}</p>
                    <div>{record.hourly_rate}</div>
                    <p>Date: {record.date}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default Attendance;

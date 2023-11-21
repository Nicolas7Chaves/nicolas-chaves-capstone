import './Attendance.scss';
import React, { useState, useEffect } from 'react';


function Attendance() {
    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/attendance')
            .then(response => response.json())
            .then(data => setAttendance(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <>
        <div>Attendance</div>
            {attendance.map(record => (
                <div>Attendance Records : 
                    {record.employee_id}
                    <h2>{record.clock_in_time} {record.clock_out_time}</h2>
                    <p>Hourly Rate: {record.date}</p>
                </div>
            ))}
        </>
    )
}

export default Attendance;

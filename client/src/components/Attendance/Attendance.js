import './Attendance.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

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

    // Function to calculate the duration worked
    const calculateDuration = (clockIn, clockOut) => {
        if (!clockOut) return '---';  // Handle cases where clock-out is not recorded yet
        const duration = moment.duration(moment(clockOut).diff(moment(clockIn)));
        return duration.asHours().toFixed(2); // Returns the duration in hours, rounded to two decimals
    };

    return (
        <>
            <div>Attendance</div>
            <div>
                {attendance.map(record => (
                    <div key={record.id}>
                        <h3>Employee Id: {record.employee_id}</h3>
                        <p>Employee: {record.first_name} {record.last_name}</p>
                        <p>Clock In Time: {record.clock_in_time}</p>
                        <p>Clock Out Time: {record.clock_out_time || '---'}</p>
                        <p>Total Time Clocked In: {calculateDuration(record.clock_in_time, record.clock_out_time)} hours</p>
                        <p>Hourly Rate: ${record.hourly_rate.toFixed(2)}</p>
                        <p>Total Pay: ${(
                            parseFloat(calculateDuration(record.clock_in_time, record.clock_out_time)) * record.hourly_rate
                        ).toFixed(2)}</p>
                        <p>Date: {record.date}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Attendance;

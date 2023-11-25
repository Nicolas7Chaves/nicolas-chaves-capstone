import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Attendance.scss';

function Attendance() {
    const [weeklyAttendance, setWeeklyAttendance] = useState({});
    const [startDate, setStartDate] = useState(moment().startOf('isoWeek').toDate());

    useEffect(() => {
        // Automatically set endDate to Sunday of the selected week
        const endDate = moment(startDate).endOf('isoWeek').toDate();
        getAttendance(startDate, endDate);
    }, [startDate]);

    async function getAttendance(start, end) {
        try {
            const response = await axios.get(`http://localhost:8081/attendance`, {
                params: {
                    startDate: moment(start).format('YYYY-MM-DD'),
                    endDate: moment(end).format('YYYY-MM-DD')
                }
            });
            processAttendanceData(response.data);
        } catch (error) {
            console.error(`Error retrieving attendance records. Error: ${error}`);
        }
    }

    const processAttendanceData = (data) => {
        let aggregatedData = {};
        data.forEach(record => {
            // Use UTC time for calculation
            const clockInTimeUtc = moment.utc(record.clock_in_time);
            const clockOutTimeUtc = record.clock_out_time ? moment.utc(record.clock_out_time) : null;
            const dayOfWeek = clockInTimeUtc.local().format('dddd'); // Convert to local time for day of week

            console.log(`Processing: ${clockInTimeUtc.format()}, Day: ${dayOfWeek}`);

            if (!aggregatedData[record.employee_id]) {
                aggregatedData[record.employee_id] = {
                    name: `${record.first_name} ${record.last_name}`,
                    hourly_rate: record.hourly_rate,
                    totalHours: 0,
                    days: {}
                };
            }
            const duration = clockOutTimeUtc ? clockOutTimeUtc.diff(clockInTimeUtc, 'hours', true) : 0;
            aggregatedData[record.employee_id].days[dayOfWeek] = (aggregatedData[record.employee_id].days[dayOfWeek] || 0) + duration;
            aggregatedData[record.employee_id].totalHours += duration;
        });
        setWeeklyAttendance(aggregatedData);
    };
    const filterMondays = (date) => {
        const day = moment(date).day();
        return day === 1; // 1 represents Monday
    };

    return (
        <>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    filterDate={filterMondays}
                    inline
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                        <th>Total Hours</th>
                        <th>Total Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(weeklyAttendance).map(([employeeId, info]) => (
                        <tr key={employeeId}>
                            <td>{employeeId}</td>
                            <td>{info.name}</td>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <td key={day}>{info.days[day] ? info.days[day].toFixed(2) : '0'}</td>
                            ))}
                            <td>{info.totalHours.toFixed(2)}</td>
                            <td>${(info.hourly_rate * info.totalHours).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Attendance;

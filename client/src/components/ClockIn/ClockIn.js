import { useState } from 'react';
import './ClockIn.scss';
import axios from 'axios';
import Scanner from '../Scanner/Scanner';

function ClockIn() {
    const [employee_id, setEmployee_id] = useState('');

    const handleScan = (result) => {
        const employeeId = result.split('/').pop();
        setEmployee_id(employeeId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clock_in_time = new Date().toISOString();

        try {
            const response = await axios.post('http://localhost:8081/attendance/clockin', {
                employee_id,
                clock_in_time: clock_in_time
            });
            console.log(response.data);
            alert('You have been clocked in');
            setEmployee_id('');
        } catch (error) {
            if (error.response) {
                console.error('Error recording clock-in:', error.response.data);
                alert(error.response.data);
            } else if (error.request) {
                console.error('Error recording clock-in:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <>
            <h2>Clock In!</h2>
            <div>
                <h2>Scan Here</h2>
                <Scanner onScan={handleScan} />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> ID: </label>
                    <input
                        type='number'
                        value={employee_id}
                        onChange={(e) => setEmployee_id(e.target.value)}
                    />
                </div>
                <button type='submit'>Clock In!</button>
            </form>
        </>
    );
};
export default ClockIn;
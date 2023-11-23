import { useState, useCallback } from 'react';
import './ClockIn.scss';
import axios from 'axios';
import Scanner from '../Scanner/Scanner';

function ClockIn() {
    const [employee_id, setEmployee_id] = useState('');

    const handleSubmit = useCallback(async () => {
        const clock_in_time = new Date().toISOString();

        try {
            const response = await axios.post('http://localhost:8081/attendance/clockin', {
                employee_id,
                clock_in_time: clock_in_time
            });
            console.log(response.data);
            alert('You have been clocked in');
            window.location.reload();
            setEmployee_id('');
        } catch (error) {
            // Error handling
        }
    }, [employee_id]);

    const handleScan = (result) => {
        const employeeId = result.split('/').pop();
        setEmployee_id(employeeId);
        handleSubmit();
    };

    return (
        <>
            <h2>Clock In!</h2>
            <div>
                <h2>Scan Here</h2>
                <Scanner onScan={handleScan} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
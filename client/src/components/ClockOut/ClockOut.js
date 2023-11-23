import { useState, useCallback, useEffect } from 'react';
import './ClockOut.scss';
import axios from 'axios';
import Scanner from '../Scanner/Scanner';

function ClockOut() {
    const [employee_id, setEmployee_id] = useState('');

    const handleSubmit = useCallback(async () => {
        const clock_out_time = new Date().toISOString();

        try {
            const response = await axios.put('http://localhost:8081/attendance/clockout', {
                employee_id,
                clock_out_time: clock_out_time
            });
            console.log(response.data);
            alert('You have clocked out');
            window.location.reload();
            setEmployee_id('');
        } catch (error) {
            console.error('Error recording clock-out:', error);
        }
    }, [employee_id]);

    const handleScan = (result) => {
        const employeeId = result.split('/').pop();
        setEmployee_id(employeeId);
    };

    useEffect(() => {
        if (employee_id) {
            handleSubmit();
        }
    }, [employee_id, handleSubmit]);


    return (
        <>
            <h2>Clock Out!</h2>
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
                <button type='submit'>Clock Out!</button>
            </form>
        </>
    );
};
export default ClockOut;
import { useState } from 'react';
import './ClockOut.scss';
import axios from 'axios';

function ClockOut() {
    const [employee_id, setEmployee_id] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clock_out_time = new Date().toISOString();

        try {
            const response = await axios.put('http://localhost:8081/attendance/clockout', {
                employee_id,
                clock_out_time: clock_out_time
            });
            console.log(response.data);
            alert('You have been clocked out');
            setEmployee_id('');
        } catch (error) {
            console.error('Error recording clock-out:', error);
        }
    };

    return (
        <>
            <h2>Clock Out!</h2>
            <form onSubmit={handleSubmit}>
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
import { useState } from 'react';
import './ClockIn.scss';
import axios from 'axios';

function ClockIn() {
    const [employee_id, setEmployee_id] = useState('');

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
            console.error('Error recording clock-in:', error);
        }
    };

    return (
        <>
            <h2>Clock In!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> ID: </label>
                    <input
                        type='number'
                        value={employee_id}
                        onChange={(e) => setEmployee_id(e.target.value)}
                    />
                </div>
                {/* <div>
                    <label> first name: </label>
                    <input
                        type='text'
                        name='first_name'
                        value={clockInData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label> last name: </label>
                    <input
                        type='text'
                        name='last_name'
                        value={clockInData.last_name}
                        onChange={handleChange}
                    />
                </div> */}
                {/* <div>
                <label> clock in time</label>
                    <input 
                    type='text'
                    name='clock_in_time'
                    value={clockInData.clock_in_time}
                    onChange={handleChange}
                    />
                </div> */}
                <button type='submit'>Clock In!</button>
            </form>
        </>
    );
};
export default ClockIn;
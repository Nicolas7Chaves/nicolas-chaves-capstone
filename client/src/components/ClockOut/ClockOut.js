import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClockOut.scss';
import axios from 'axios';
import Scanner from '../Scanner/Scanner';

function ClockOut() {
    const [employee_id, setEmployee_id] = useState('');
    const navigate = useNavigate();

    
    const handleAlertAndNavigate = (message) => {
        alert(message);
        navigate('/dashboard');
    };

    const handleSubmit = useCallback(async () => {
        const clock_out_time = new Date().toISOString();

        try {
            axios.put('http://localhost:8081/attendance/clockout', {
                employee_id,
                clock_out_time: clock_out_time
            })
            .then(response => {
                console.log(response.data);
                handleAlertAndNavigate('Clocked out successfully.');
                setEmployee_id('');
            })
            .catch(error => {
                console.error('Error recording clock-out:', error);
                handleAlertAndNavigate('Error during clock out.');
            });
        } catch (error) {
            console.error('Error recording clock-out:', error);
            handleAlertAndNavigate('Error during clock out.');
        }
    }, [employee_id, navigate]);

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
        <div className='clock-out'>
            <h2 className='clock-out__title'>Clock Out!</h2>
            <div className='clock-out__scanner-layout'>
                <h2 className='clock-out__scanner-title'>Scan Here</h2>
                <Scanner onScan={handleScan} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className='clock-out__manual'>
                    <label> ID: </label>
                    <input
                        type='number'
                        value={employee_id}
                        onChange={(e) => setEmployee_id(e.target.value)}
                    />
                </div>
                <button className='clock-out__manual-button' type='submit'>Clock Out!</button>
            </form>
        </div>
    );
}

export default ClockOut;

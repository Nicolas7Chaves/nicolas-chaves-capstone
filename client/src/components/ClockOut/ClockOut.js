import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClockOut.scss';
import axios from 'axios';
import Scanner from '../Scanner/Scanner';

function ClockOut() {
    const [employee_id, setEmployee_id] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    // Define handleAlertAndNavigate function inside your component
    const handleAlertAndNavigate = (message) => {
        alert(message);
        navigate('/dashboard'); // Navigate to dashboard after alert
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
}

export default ClockOut;

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClockIn.scss';
import axios from 'axios';
import Scanner from '../Scanner/Scanner';

function ClockIn() {
    const [employee_id, setEmployee_id] = useState('');
    const navigate = useNavigate();

    const handleAlertAndNavigate = (message) => {
        alert(message);
        navigate('/dashboard');
    };

    const handleSubmit = useCallback(async () => {
        const clock_in_time = new Date().toISOString();

        try {
            console.log("Request Data:", { employee_id, clock_in_time });
            const response = await axios.post('http://localhost:8081/attendance/clockin', {
                employee_id,
                clock_in_time: clock_in_time
            });
            console.log("Server Response:", response.data);
            handleAlertAndNavigate('Clocked in successfully.');
            setEmployee_id('');
        } catch (error) {
            console.error('Error during clock in:', error);
            handleAlertAndNavigate('Error during clock in.');
        }
    }, [employee_id, navigate]);

    const handleScan = (result) => {
        // QR error proofing
        if (result.startsWith('http://localhost:3000/employee/')) {
            const urlParts = result.split('/');
            const employeeId = urlParts.pop();
            setEmployee_id(employeeId);
        } else {
            console.error('Scanned QR code is not a valid employee URL.');
            navigate('/dashboard');
        }
    };

    useEffect(() => {
        if (employee_id !== '') {
            handleSubmit();
        }
    }, [employee_id, handleSubmit]);

    return (
        <div className='clock-in'>
            <h2 className='clock-in__title'>Clock In!</h2>
            <div className='clock-in__scanner-layout'>
                <h2 className='clock-in__scanner-title'>Scan Here</h2>
                <Scanner onScan={handleScan} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className='clock-in__manual'>
                    <label> ID: </label>
                    <input
                        type='number'
                        value={employee_id}
                        onChange={(e) => setEmployee_id(e.target.value)}
                    />
                </div>
                <button className='clock-in__manual-button' type='submit'>Clock In!</button>
            </form>
        </div>
    );
}

export default ClockIn;

import { useState } from 'react';
import './ClockIn.scss';

function ClockIn() {
    const [clockInData, setClockInData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        clock_in_time: ''
    });

    // const [clockOutData, setClockOutData ] = useState ({
    //     id: '',
    //     first_name: '',
    //     last_name: '',
    //     clock_in_time: ''
    // });

    const handleChange = (e) => {
        setClockInData({
            ...clockInData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Clocked In Data submitted", clockInData)

        setClockInData({
            id: '',
            first_name: '',
            last_name: '',
            clock_in_time: ''
        });
    };

    return (
        <>
            <h2>Clock In or Out!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> ID: </label>
                    <input
                        type='number'
                        name='id'
                        value={clockInData.id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input 
                    type='text'
                    name='first_name'
                    value={clockInData.first_name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input 
                    type='text'
                    name='last_name'
                    value={clockInData.last_name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input 
                    type='text'
                    name='first_name'
                    value={clockInData.first_name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input 
                    type='text'
                    name='clock_in_time'
                    value={clockInData.clock_in_time}
                    onChange={handleChange}
                    />
                </div>
                <button type='submit'>Clock In!</button>
            </form>
        </>
    );
};
export default ClockIn;
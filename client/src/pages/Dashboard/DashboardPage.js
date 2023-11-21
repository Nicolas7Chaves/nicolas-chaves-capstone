import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.scss';

function DashboardPage() {
    const navigate = useNavigate();
    return (
        <>
            <h2>Clock In or Out!</h2>
            <div>
                <button onClick={() => navigate('/dashboard/clockin')}>Clock In!</button>
                <button>Clock Out!</button>
            </div>
        </>
    );
};
export default DashboardPage;
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
                <button onClick={() => navigate('/dashboard/clockout')}>Clock Out!</button>
            </div>
        </>
    );
};
export default DashboardPage;
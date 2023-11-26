import { useNavigate } from 'react-router-dom';
import './DashboardPage.scss';

function DashboardPage() {
    const navigate = useNavigate();
    return (
        <div className='dashboard'>
            <h2 className='dashboard__title'>Welcome</h2>
            <div className='dashboard__button-layout'>
                <button className='dashboard__button' onClick={() => navigate('/dashboard/clockin')}>Clock In!</button>
                <button className='dashboard__button' onClick={() => navigate('/dashboard/clockout')}>Clock Out!</button>
            </div>
        </div>
    );
};
export default DashboardPage;
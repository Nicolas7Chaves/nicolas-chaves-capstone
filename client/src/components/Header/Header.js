import './Header.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo/logo.png'


function Header() {

    return (
        <section className='header'>
            <div className='header__layout'>
                <div className='header__layout2'>
            <img src={Logo} alt="logo PayPatrol" className='header__logo' />
                <div className='header__layout1'>
                    <NavLink to='/dashboard' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--dashboard"}>Dashboard</NavLink>
                    <NavLink to='/employees' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--employees"}>Employees</NavLink>
                    <NavLink to='/attendance' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--attendance"}>Attendance</NavLink>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Header;
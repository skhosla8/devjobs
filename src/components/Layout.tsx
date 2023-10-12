// Base Imports
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
// Components
import ToggleSwitch from './ToggleSwitch';
// Icons/Images
import logo from '../assets/logo.svg';
import iconSun from '../assets/icon-sun.svg';
import iconMoon from '../assets/icon-moon.svg';

const Layout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`app body-${theme}`}>
            <div className='header__container'>
                <header className='header'>
                    <NavLink to='/'>
                        <div className='header__logo'>
                            <img className='header__logo' src={logo} alt='logo' />
                        </div>
                    </NavLink>

                    <div className='header__theme'>
                        <img src={iconSun} alt='icon-sun' />

                        <ToggleSwitch />

                        <img src={iconMoon} alt='icon-moon' />
                    </div>
                </header>
            </div>

            <Outlet />
        </div>
    )
};

export default Layout;
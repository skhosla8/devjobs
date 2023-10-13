// Base Imports
import React, { useContext } from 'react';
import { ContextObj, ThemeContext } from '../context/ThemeContext';

const ToggleSwitch = () => {
    const { theme, setTheme } = useContext<ContextObj>(ThemeContext);

    const handleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <label className='switch' data-cy='color-theme-switch'>
            <input type='checkbox' defaultChecked={theme === 'dark' && true} onChange={handleTheme} />
            <span className='switch__slider'></span>
        </label>
    )
}

export default ToggleSwitch;
import React, { FC, createContext, useState, useEffect } from 'react';

export interface ContextObj {
    theme: string;
    setTheme: (t: string) => void;
}

export const ThemeContext = createContext<ContextObj>({ theme: 'light', setTheme: () => { } });

export const ThemeProvider: FC<any> = ({ children }) => {
    const initialTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
    </ThemeContext.Provider>
}
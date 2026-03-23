import React, { createContext, useContext, useState, useEffect } from 'react';
import { TaskProvider } from './TaskContext';
import { GamificationProvider } from './GamificationContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('saas-theme-v1') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('saas-theme-v1', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark-theme'); // for custom CSS variables matching
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GamificationProvider>
        <TaskProvider>
          {children}
        </TaskProvider>
      </GamificationProvider>
    </ThemeContext.Provider>
  );
};

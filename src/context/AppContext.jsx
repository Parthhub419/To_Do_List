import React, { createContext, useContext, useState, useEffect } from 'react';
import { TaskProvider } from './TaskContext';
import { GamificationProvider } from './GamificationContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('taskify-react-theme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('taskify-react-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TaskProvider>
        <GamificationProvider>
          {children}
        </GamificationProvider>
      </TaskProvider>
    </ThemeContext.Provider>
  );
};

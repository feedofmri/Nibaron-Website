import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use light theme
  const theme = 'light';

  // Apply light theme to document on mount and cleanup on unmount
  useEffect(() => {
    const root = document.documentElement;

    // Remove any existing theme classes
    root.classList.remove('light', 'dark');

    // Always add light theme class
    root.classList.add('light');

    // Remove any theme-related localStorage items
    localStorage.removeItem('nibaron-theme');

    return () => {
      // Cleanup: ensure light theme persists
      root.classList.remove('dark');
      root.classList.add('light');
    };
  }, []);

  const value = {
    theme: 'light',
    systemTheme: 'light',
    effectiveTheme: 'light',
    isDarkMode: () => false,
    // Provide empty functions for compatibility but they won't do anything
    toggleTheme: () => {},
    setTheme: () => {},
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

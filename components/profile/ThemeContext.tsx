import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const LightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  card: '#F2F2F2',
};

const DarkTheme = {
  background: '#000000',
  text: '#FFFFFF',
  card: '#1A1A1A',
};

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: LightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

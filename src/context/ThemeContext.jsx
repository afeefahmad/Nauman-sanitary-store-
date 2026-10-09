import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('nss-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Persist to localStorage and update meta-theme-color (non-critical, can run after render)
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#060708' : '#e4e5e7';
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = themeColor;
    try {
      localStorage.setItem('nss-theme', theme);
    } catch {/* ignore */}
  }, [theme]);

  const toggleTheme = () => {
    // Set the attribute SYNCHRONOUSLY before React re-renders
    // so CSS variables cascade instantly on click with zero delay
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

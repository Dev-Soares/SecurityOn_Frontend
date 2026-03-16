import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {

    theme: Theme;
    toggleTheme: () => void;

}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider = ({ children }: { children: any }) => {

    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        return saved || getSystemTheme();
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        document.documentElement.classList.add('theme-transitioning');
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 400);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context =  useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};



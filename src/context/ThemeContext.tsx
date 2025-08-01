import React, { createContext, useState, useEffect } from "react";

export type Theme = "theme1" | "theme2" | "theme3";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "theme1",
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("theme1");

  // Apply saved theme OR default on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("app-theme") as Theme) || "theme1";
    setThemeState(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("app-theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

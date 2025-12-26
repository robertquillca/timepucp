"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Theme = "light" | "dark" | "vibrant" | "vscode";

type ThemeContextType = {
  theme: Theme;
  previewTheme: (theme: Theme) => void;
  setTheme: (theme: Theme) => void;
  resetPreview: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [preview, setPreview] = useState<Theme | null>(null);

  const appliedTheme = preview ?? theme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeState,
        previewTheme: setPreview,
        resetPreview: () => setPreview(null),
      }}
    >
      <div data-theme={appliedTheme} className="min-h-screen transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

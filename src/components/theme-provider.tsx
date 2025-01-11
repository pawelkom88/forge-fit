import React, { createContext, useContext, useEffect, useState } from "react";
import { Union } from "@/utils/ts-helpers.ts";
import {
  removeThemeClasses,
  setRootThemeFromSystemPreference,
} from "@/utils/helpers.ts";

export const UI_THEME = "ui-theme";

// TODO: change es lint rule
// eslint-disable-next-line react-refresh/only-export-components
export const THEME_CONFIG = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export type Theme = Union<typeof THEME_CONFIG>;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  isLightTheme: boolean | null;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  isLightTheme: null,
  theme: THEME_CONFIG.system,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = THEME_CONFIG.system,
  storageKey = UI_THEME,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    removeThemeClasses(THEME_CONFIG, root);
    setRootThemeFromSystemPreference(theme, root);

    root.classList.add(theme);
  }, [theme]);

  const value = {
    isLightTheme: theme === THEME_CONFIG.light,
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

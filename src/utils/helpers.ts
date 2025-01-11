import { Theme, THEME_CONFIG } from "@/components/theme-provider.tsx";
import { addDays, startOfWeek } from "date-fns";

export function removeThemeClasses(
  themes: typeof THEME_CONFIG,
  rootElement: HTMLElement,
): void {
  if (!rootElement) return;
  Object.values(themes).forEach((theme) => rootElement.classList.remove(theme));
}

export function setRootThemeFromSystemPreference(
  theme: Theme,
  rootElement: HTMLElement,
): void {
  if (!rootElement) return;

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (theme === THEME_CONFIG.system) {
    const systemTheme = isDarkMode ? THEME_CONFIG.dark : THEME_CONFIG.light;
    rootElement.classList.add(systemTheme);
    return;
  }
}

export function getWeekDays(workoutDate = new Date()) {
  const weekStart = startOfWeek(workoutDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i),
  );

  return weekDays;
}

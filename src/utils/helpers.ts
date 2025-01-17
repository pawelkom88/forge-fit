import { Theme, THEME_CONFIG } from "@/components/theme-provider.tsx";
import { addDays, startOfWeek, subDays } from "date-fns";
import { DateString } from "@/utils/ts-helpers.ts";

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

export function getWeekDays(workoutDate: Date | DateString = new Date()) {
  const weekStart = startOfWeek(workoutDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i),
  );

  return weekDays;
}

export const defaultOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export function formatDateForScreenReader(
  date: Date,
  language = "en-GB",
  options = defaultOptions,
) {
  return new Intl.DateTimeFormat(language, options).format(date);
}

export function generateWeekAroundDate(workoutDate: Date): Date[] {
  return [
    ...Array(3)
      .fill(0)
      .map((_, i) => subDays(workoutDate, 3 - i)),
    workoutDate,
    ...Array(3)
      .fill(0)
      .map((_, i) => addDays(workoutDate, i + 1)),
  ];
}

import { Theme, THEME_CONFIG } from "@/components/theme-provider.tsx";
import { addDays, format, isSameDay, startOfWeek, subDays } from "date-fns";
import { Workout } from "@/utils/workoutData.ts";
import { DateString } from "@/utils/ts-helpers.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";

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

export function getWeekDays(): Date[] {
  return Array.from({ length: 7 }).map((_, i) =>
    addDays(startOfWeek(new Date()), i),
  );
}

export const defaultOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export function formatDateForScreenReaders(
  date: Date,
  language = "en-GB",
  options = defaultOptions,
): string {
  return new Intl.DateTimeFormat(language, options).format(date);
}

export type WeekDayWithWorkoutStatus = {
  date: Date;
  isWorkoutDay: boolean | undefined;
};

export function doesWorkoutExistOnDate(
  workouts: Workout[] | null,
  weekDay: Date,
): boolean | undefined {
  return workouts?.some((workout) =>
    isSameDay(new Date(workout.date), weekDay),
  );
}

export function generateSurroundingWeekDays(workoutDate: Date): Date[] {
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

export function generateWeekDays(
  workoutDate: Date,
  workouts: Workout[] | null,
): WeekDayWithWorkoutStatus[] {
  return generateSurroundingWeekDays(workoutDate).map((weekDay) => ({
    date: weekDay,
    isWorkoutDay: doesWorkoutExistOnDate(workouts, weekDay),
  }));
}

// TODO tests !
export function generatePreviousWeek(referenceDate: Date): Date {
  const firstDayOfCurrentView = subDays(referenceDate, 6);
  return subDays(firstDayOfCurrentView, 1);
}

export function generateNextWeek(referenceDate: Date): Date {
  const lastDayOfCurrentView = addDays(referenceDate, 6);
  return addDays(lastDayOfCurrentView, 1);
}

export function formatToDateString(date: Date): DateString {
  const formatted = format(date, DATE_PATTERN.YYYY_MM_DD);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(formatted)) {
    throw new Error(
      `Invalid date format: ${formatted}. Expected format: YYYY-MM-DD`,
    );
  }

  return formatted as DateString;
}

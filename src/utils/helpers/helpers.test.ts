import { Theme, THEME_CONFIG } from "@/components/theme-provider";
import { describe, expect, it, vi, Mock, beforeEach } from "vitest";
import {
  doesWorkoutExistOnDate,
  formatDateForScreenReaders,
  generateSurroundingWeekDays,
  generateWeekDays,
  getWeekDays,
  removeThemeClasses,
  setRootThemeFromSystemPreference,
} from "./helpers";
import { Workout } from "@/utils/workoutData.ts";

describe("helpers function", () => {
  describe("removeThemeClasses", () => {
    it("returns early when the root element is null", () => {
      const rootElement = document.createElement("div");

      removeThemeClasses(THEME_CONFIG.light, rootElement);
      expect(rootElement.classList.contains(THEME_CONFIG.light)).toBeFalsy();
    });

    it("removes the theme classes from the root element", () => {
      const themes = Object.values(THEME_CONFIG) as Theme[];
      const rootElement = document.createElement("div");

      removeThemeClasses(THEME_CONFIG.light, rootElement);

      Object.values(themes).forEach((theme) => {
        expect(rootElement.classList.contains(theme)).toBeFalsy();
      });
    });
  });

  describe("setRootThemeFromSystemPreference", () => {
    beforeEach(() => {
      // Mock the window.matchMedia function to return a mock media query list
      window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
      });
    });

    it("returns early when the root element is null or undefined", () => {
      // @ts-expect-error testing
      setRootThemeFromSystemPreference(THEME_CONFIG.system, null);
      expect(window.matchMedia).not.toHaveBeenCalled();
    });

    it("sets the dark theme when the system preference is dark and the theme is set to system", () => {
      (window.matchMedia as Mock).mockReturnValue({ matches: true });
      const rootElement = document.createElement("div");
      setRootThemeFromSystemPreference(THEME_CONFIG.system, rootElement);
      expect(rootElement.classList.contains(THEME_CONFIG.dark)).toBeTruthy();
    });

    it("sets the light theme when the system preference is light and the theme is set to system", () => {
      (window.matchMedia as Mock).mockReturnValue({ matches: false });
      const rootElement = document.createElement("div");
      setRootThemeFromSystemPreference(THEME_CONFIG.system, rootElement);
      expect(rootElement.classList.contains(THEME_CONFIG.light)).toBeTruthy();
    });

    it("does not set any theme when the theme is not set to system", () => {
      const rootElement = document.createElement("div");
      setRootThemeFromSystemPreference(THEME_CONFIG.light, rootElement);
      expect(rootElement.classList.contains(THEME_CONFIG.light)).toBeFalsy();
      expect(rootElement.classList.contains(THEME_CONFIG.dark)).toBeFalsy();
    });
  });

  describe("getWeekDays", () => {
    it("returns an array of dates representing the days of the week where Sunday is the first day", () => {
      const weekDays = getWeekDays();
      expect(weekDays.length).toBe(7);
      expect(weekDays[0].getDay()).toBe(0);
    });
  });

  describe("formatDateForScreenReaders", () => {
    it("return correctly formated date based on the default options", () => {});
    const date = new Date(2025, 0, 20);
    const expectedDate = "20 January 2025";
    expect(formatDateForScreenReaders(date)).toBe(expectedDate);

    it("return correctly formated date based on the options", () => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      } as const;

      const date = new Date(2025, 0, 20);
      const expectedDate = "Monday, January 20, 2025";
      expect(formatDateForScreenReaders(date, "en-US", options)).toBe(
        expectedDate,
      );
    });
  });

  describe("doesWorkoutExistOnDate", () => {
    it("returns true if a workout exists on the given date", () => {
      const workouts = [
        { date: new Date(2023, 0, 1) },
        { date: new Date(2023, 0, 2) },
      ] as Workout[];

      const date = new Date(2023, 0, 1);
      expect(doesWorkoutExistOnDate(workouts, date)).toBe(true);
    });

    it("returns false if no workout exists on the given date", () => {
      const workouts = [
        { date: new Date(2023, 0, 1) },
        { date: new Date(2023, 0, 2) },
      ] as Workout[];

      const date = new Date(2023, 0, 3);
      expect(doesWorkoutExistOnDate(workouts, date)).toBe(false);
    });
  });

  describe("generateSurroundingWeekDays", () => {
    it("returns an array of dates representing the surrounding week days of the given date", () => {
      const workoutDate = new Date(2025, 0, 11);
      const expectedDates = [
        new Date(2025, 0, 8),
        new Date(2025, 0, 9),
        new Date(2025, 0, 10),
        new Date(2025, 0, 11),
        new Date(2025, 0, 12),
        new Date(2025, 0, 13),
        new Date(2025, 0, 14),
      ];
      expect(generateSurroundingWeekDays(workoutDate)).toEqual(expectedDates);
    });
  });

  describe("generateWeekDays", () => {
    it("returns an array of dates representing the surrounding week days of the given date", () => {
      const workoutDate = new Date(2025, 0, 11);
      const workouts = [
        { date: new Date(2025, 0, 9) },
        { date: new Date(2025, 0, 11) },
        { date: new Date(2025, 0, 13) },
      ] as Workout[];

      const expectedWeekDays = [
        { date: new Date(2025, 0, 8), isWorkoutDay: false },
        { date: new Date(2025, 0, 9), isWorkoutDay: true },
        { date: new Date(2025, 0, 10), isWorkoutDay: false },
        { date: new Date(2025, 0, 11), isWorkoutDay: true },
        { date: new Date(2025, 0, 12), isWorkoutDay: false },
        { date: new Date(2025, 0, 13), isWorkoutDay: true },
        { date: new Date(2025, 0, 14), isWorkoutDay: false },
      ];
      expect(generateWeekDays(workoutDate, workouts)).toEqual(expectedWeekDays);
    });
  });
});

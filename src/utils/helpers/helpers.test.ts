import { Theme, THEME_CONFIG } from "@/components/theme-provider";
import { describe, expect, it, vi, Mock, beforeEach } from "vitest";
import {
  removeThemeClasses,
  setRootThemeFromSystemPreference,
} from "./helpers";

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
});

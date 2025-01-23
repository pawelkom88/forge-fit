import { screen } from "@testing-library/react";
import { WorkoutDateForm } from "./WorkoutDateForm";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../../tests/utils.tsx";
import { Calendar } from "@/components/calendar/Calendar.tsx";
import { BrowserRouter } from "react-router-dom";
import * as hooks from "@/hooks/useCalendar";

vi.mock("@/hooks/useFetch", () => ({
  useFetch: () => ({
    data: [
      {
        workoutId: "1",
        userId: "user123",
        date: "2025-12-31T00:00:00.000Z",
      },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock("@/hooks/useCalendar", () => ({
  useCalendar: vi.fn(),
}));

describe("WorkoutDateForm", () => {
  describe("validation", () => {
    let user: ReturnType<typeof userEvent.setup>;

    const setup = async () => {
      const { user: generatedUser } = customRender(
        <WorkoutDateForm onDateChange={() => {}} />,
      );
      user = generatedUser;
    };

    beforeEach(setup);

    it("should display an error message when a year is less than 2025", async () => {
      const input = screen.getByRole("textbox");

      await user.type(input, "2024");
      await user.keyboard("{Enter}");

      const errorMessage = await screen.findByText(
        "Year must be at least 2025",
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("should display an error message when a month is less than 1 or greater than 12", async () => {
      const input = screen.getByRole("textbox");

      await user.type(input, "2025-13");
      await user.keyboard("{Enter}");

      const errorMessage = await screen.findByText(
        "Month must be between 1 and 12",
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it("should display an error message when a day is less than 1 or greater than the last day of the month", async () => {
      const input = screen.getByRole("textbox");

      await user.type(input, "2025-12-32");
      await user.keyboard("{Enter}");

      const errorMessage = await screen.findByText(
        "Day must be valid for the given month (e.g., not 31 for February)",
      );

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("should", () => {
    beforeEach(() => {
      // @ts-expect-error mock
      (hooks.useCalendar as vi.Mock).mockImplementation(() => ({
        currentMonth: new Date(2025, 11, 31),
        monthDays: [new Date(2025, 11, 31)],
        data: [{ date: "2025-12-31T00:00:00.000Z", title: "Workout 1" }],
        loading: "idle",
        error: null,
      }));
    });

    it("focus inputted date in the Calendar", () => {
      const { user } = customRender(
        <BrowserRouter>
          <Calendar />
        </BrowserRouter>,
      );

      const calendarLink = screen.getByRole("link");

      user.type(screen.getByRole("textbox"), "2025-12-31");
      user.keyboard("{Enter}");

      expect(calendarLink).toHaveFocus();
    });

    it("clear inputted date after clicking the reset button", () => {
      const { user } = customRender(
        <BrowserRouter>
          <Calendar />
        </BrowserRouter>,
      );

      const calendarLink = screen.getByRole("link");
      const input = screen.getByRole("textbox");

      user.type(input, "2025-12-31");
      user.keyboard("{Enter}");

      const resetButton = screen.getByRole("button", { name: "Reset" });
      user.click(resetButton);

      expect(calendarLink).not.toHaveFocus();
      expect(input).toHaveValue("");
    });
  });
});

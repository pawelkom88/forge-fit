import { screen } from "@testing-library/react";
import { WorkoutDateForm } from "./WorkoutDateForm";
import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../../tests/utils.tsx";
import Calendar from "@/components/calendar/Calendar.tsx";
import { BrowserRouter } from "react-router-dom";
import * as hooks from "@/hooks/useCalendar";

vi.mock("@/hooks/useFetch", () => ({
  useFetch: () => ({
    data: [
      {
        workoutId: "1",
        userId: "user123",
        date: "2025-12-31T00:00:00.000Z",
        notes: "Leg day workout focused on strength.",
        exercises: [
          {
            exerciseId: "1",
            name: "Squats",
            muscleGroup: "Legs",
            sets: [
              {
                setId: "set1",
                weight: 100,
                reps: 10,
              },
              {
                setId: "set2",
                weight: 110,
                reps: 8,
              },
              {
                setId: "set3",
                weight: 120,
                reps: 6,
              },
            ],
          },
          {
            exerciseId: "2",
            muscleGroup: "Chest",
            name: "Bench press",
            sets: [
              {
                setId: "set1",
                weight: 200,
                reps: 12,
              },
              {
                setId: "set2",
                weight: 220,
                reps: 10,
              },
            ],
          },
        ],
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
    // TODO: correct
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
      const { user: x } = customRender(
        <WorkoutDateForm onDateChange={() => {}} />,
      );
      user = x;
    });

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

  describe("submit", () => {
    beforeEach(() => {
      (hooks.useCalendar as vi.Mock).mockImplementation(() => ({
        currentMonth: new Date(2025, 11, 31),
        monthDays: [new Date(2025, 11, 31)],
        data: [{ date: "2025-12-31T00:00:00.000Z", title: "Workout 1" }],
        loading: "idle",
        error: null,
      }));
    });

    it("should focus inputted date in the Calendar", () => {
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
  });
});

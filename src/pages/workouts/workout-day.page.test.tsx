import { vi, beforeEach, describe, it } from "vitest";
import { customRender } from "../../../tests/utils.tsx";
import userEvent from "@testing-library/user-event";
import WorkoutDayPage from "@/pages/workouts/workout-day.page.tsx";
import { screen } from "@testing-library/react";

describe("WorkoutDayPage", () => {
  let user: ReturnType<typeof userEvent.setup>;

  const setup = async () => {
    const { user: generatedUser } = customRender(<WorkoutDayPage />);

    user = generatedUser;
  };

  beforeEach(() => {
    //mocking useParams
    vi.mock("react-router-dom", () => {
      return {
        ...vi.importActual("react-router-dom"),
        createBrowserRouter: vi.fn(),
        useNavigate: vi.fn(),
        Link: vi.fn(),
        useParams: () => ({ workoutDate: "2025-12-31" }),
      };
    });

    // mocking the useFetch hook
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

    setup();
  });

  describe("tabs", () => {
    it("should allow user to toggle between WORKOUTS and NUTRITION tab", async () => {
      const workoutBtn = screen.getByRole("tab", { name: "Workout" });
      const nutritionBtn = screen.getByRole("tab", { name: "Nutrition" });

      expect(workoutBtn).toHaveAttribute("aria-selected", "true");
      expect(nutritionBtn).toHaveAttribute("aria-selected", "false");

      await user.click(nutritionBtn);

      expect(nutritionBtn).toHaveAttribute("aria-selected", "true");
      expect(workoutBtn).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("header", () => {
    it("should have correct date in heading", async () => {
      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toHaveTextContent("Wednesday, December 31");
    });

    // TODO: investigate why not visible
    // it("should have working back to calendar button", async () => {
    //   const backToCalendarBtn = screen.getByRole("link", {
    //     name: "Back to calendar",
    //   });
    //
    //   expect(backToCalendarBtn).toBeInTheDocument();
    // });
    //
    // it("should have correct date selected in mini calendar", async () => {
    //   const selectedDate = screen.getByRole("link", {
    //     name: "31 December 2025",
    //   });
    //
    //   expect(selectedDate).toBeInTheDocument();
    // });
  });

  describe("body", () => {
    it("should allow user to add a new exercise", async () => {});
    it("should display a message if selected day is not a workout day", async () => {});
    it("should display added exercises if it is a workout day", async () => {});
  });
});

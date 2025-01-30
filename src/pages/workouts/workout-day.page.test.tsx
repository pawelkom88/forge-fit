import { vi, beforeEach, describe, it } from "vitest";
import { customRender } from "../../../tests/utils.tsx";
import userEvent from "@testing-library/user-event";
import WorkoutDayPage from "@/pages/workouts/workout-day.page.tsx";
import { screen } from "@testing-library/react";

describe("tabs", () => {
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

  it("should allow user to toggle between WORKOUTS and NUTRITION tab", () => {
    expect(screen.getByRole("tab", { name: "Workouts" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

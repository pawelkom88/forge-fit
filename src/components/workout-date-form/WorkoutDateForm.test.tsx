import { screen } from "@testing-library/react";
import { WorkoutDateForm } from "./WorkoutDateForm";
import { beforeEach, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../../tests/utils.tsx";

describe("WorkoutDateForm", () => {
  describe("vaidation", () => {
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
      const { user: x } = customRender(
        <WorkoutDateForm onDateChange={() => {}} />,
      );
      user = x;
    });

    it("should render an error message when a year is less than 2025", async () => {
      const input = screen.getByRole("textbox");

      await user.type(input, "2024");
      await user.keyboard("{Enter}");

      const errorMessage = await screen.findByText(
        "Year must be at least 2025",
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

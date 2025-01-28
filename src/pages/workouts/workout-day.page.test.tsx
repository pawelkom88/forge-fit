import { beforeEach, describe, it } from "vitest";
import { customRender } from "../../../tests/utils.tsx";
import { WorkoutDateForm } from "@/components/workout-date-form/WorkoutDateForm.tsx";
import userEvent from "@testing-library/user-event";

describe("tabs", () => {
  let user: ReturnType<typeof userEvent.setup>;

  const setup = async () => {
    const { user: generatedUser } = customRender(
      <WorkoutDateForm onDateChange={() => {}} />,
    );

    user = generatedUser;
  };

  beforeEach(setup);

  it("should allow user to toggle between WORKOUTS and NUTRUTION tab", () => {
    customRender(<WorkoutDateForm onDateChange={() => {}} />);
  });
});

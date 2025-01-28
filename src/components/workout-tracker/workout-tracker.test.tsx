import { customRender } from "../../../tests/utils.tsx";
import { AddExerciseDialog } from "@/components/workout-tracker/workout-tracker.tsx";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

describe("Workout tracker", () => {
  let user: ReturnType<typeof userEvent.setup>;

  const setNewExercise = vi.fn();

  const newExercise = {
    name: "Bench Press",
    exerciseId: "1",
    muscleGroup: "Chest",
    sets: [{ setId: "set1", weight: 0, reps: 0 }],
  };

  const { user: generatedUser } = customRender(
    <AddExerciseDialog
      newExercise={newExercise}
      setNewExercise={setNewExercise}
    />,
  );

  user = generatedUser;

  // it("add exercise dialog should open on button click", () => {
  //   const addExerciseBtn = screen.getByRole("button", {
  //     name: "Add Exercise",
  //   });
  //   const dialog = screen.getByRole("dialog");
  //
  //   user.click(addExerciseBtn);
  //
  //   expect(dialog).toBeInTheDocument();
  // });

  // it("should allow user to toggle between workout and nutrition tab", () => {});
  it("should show a message if there is no workout on selected day", () => {});
  it("should show an exercise details if there is a workout on selected day", () => {});
  it("should show save workout details button if there is a workout on selected day", () => {});
});

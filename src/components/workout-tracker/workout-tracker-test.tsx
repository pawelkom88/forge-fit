import { customRender } from "../../../tests/utils.tsx";
import { AddExerciseDialog } from "@/components/workout-tracker/workout-tracker.tsx";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Workout tracker", () => {
  let user: ReturnType<typeof userEvent.setup>;
  const setNewExercise = vi.fn();
  const newExercise = {
    name: "",
    exerciseId: "",
    // type muscle group - union
    muscleGroup: "",
    sets: [{ setId: "set1", weight: 0, reps: 0 }],
  };

  const { user: generatedUser } = customRender(
    <AddExerciseDialog
      newExercise={newExercise}
      setNewExercise={setNewExercise}
    />,
  );

  user = generatedUser;

  it("", async () => {});
});

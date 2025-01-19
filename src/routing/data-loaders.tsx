import { Workout, workouts } from "@/utils/workoutData.ts";
import { formatDate } from "@/utils/helpers.ts";

export const workoutDetailsLoader = (date: string): Workout | null => {
  const workout = workouts.find((workout) => {
    const workoutDate = formatDate(workout.date);
    return date === workoutDate;
  });

  return workout ?? null;
};

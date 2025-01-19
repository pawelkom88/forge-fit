import { Workout, workouts } from "@/utils/workoutData.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";
import { format } from "date-fns";

export const workoutDetailsLoader = (date: string): Workout | null => {
  const workout = workouts.find((workout) => {
    const workoutDate = format(workout.date, DATE_PATTERN.YYYY_MM_DD);
    return date === workoutDate;
  });

  return workout ?? null;
};

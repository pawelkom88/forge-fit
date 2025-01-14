import { Workout, workouts } from "@/utils/workoutData.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";
import { format } from "date-fns";
import { LoaderFunctionArgs } from "react-router";

export const rootLoader = async (): Promise<Workout[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return workouts;
};

export const workoutDetailsLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<Workout | null> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const workout = workouts.find((workout) => {
    const workoutDate = format(workout.date, DATE_PATTERN.YYYY_MM_DD);
    return params.workoutDate === workoutDate;
  });

  return workout ?? null;
};

import { Workout, workouts } from "@/utils/workoutData.ts";
import { LoaderFunctionArgs } from "react-router";
import { formatDate } from "@/utils/helpers.ts";

export const rootLoader = async (): Promise<Workout[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return workouts;
};

export const workoutDetailsLoader = async ({
  params,
}: {
  params: LoaderFunctionArgs["params"];
}): Promise<Workout | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const workout = workouts.find((workout) => {
    const workoutDate = formatDate(workout.date);
    return params.workoutDate === workoutDate;
  });

  return workout ?? null;
};

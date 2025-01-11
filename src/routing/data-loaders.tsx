import { Workout, workouts } from "@/utils/workoutData.ts";

export const rootLoader = async (): Promise<Workout[]> => {
  console.log("Loader is being called");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Workouts data:", workouts);
  return workouts;
};

export const workoutDetailsLoader = async (): Promise<Workout[]> => {
  console.log("Loader 2 is being called");
};

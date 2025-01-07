export interface Workout {
  date: Date;
  summary: string;
}

export const workouts: Workout[] = [
  {
    date: new Date(2023, 0, 2),
    summary: "30 min running, 5km",
  },
  {
    date: new Date(2023, 0, 5),
    summary: "Upper body: 3x10 bench press, 3x10 rows",
  },
  {
    date: new Date(2023, 0, 10),
    summary: "45 min yoga session",
  },
  {
    date: new Date(2023, 0, 15),
    summary: "45 min cycling, 20km",
  },
  {
    date: new Date(2023, 0, 20),
    summary: "Lower body: 3x12 squats, 3x12 lunges",
  },
];

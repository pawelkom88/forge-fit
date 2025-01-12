export interface Set {
  setId: string;
  weight: number;
  reps: number;
  setOrder: number;
}

export interface Exercise {
  exerciseId: string;
  order: number;
  sets: Set[];
}

export interface Workout {
  workoutId: string;
  userId: string;
  date: string;
  notes: string;
  exercises: Exercise[];
}

// TODO: grab data structure from DB structure image/flow chart
export const workouts = [
  {
    workoutId: "workout1",
    userId: "user123",
    date: new Date(2025, 0, 2),
    notes: "Leg day workout focused on strength.",
    exercises: [
      {
        exerciseId: "squat",
        order: 1,
        sets: [
          { setId: "set1", weight: 100, reps: 10, setOrder: 1 },
          { setId: "set2", weight: 110, reps: 8, setOrder: 2 },
          { setId: "set3", weight: 120, reps: 6, setOrder: 3 },
        ],
      },
      {
        exerciseId: "legPress",
        order: 2,
        sets: [
          { setId: "set1", weight: 200, reps: 12, setOrder: 1 },
          { setId: "set2", weight: 220, reps: 10, setOrder: 2 },
        ],
      },
    ],
  },
  {
    workoutId: "workout2",
    userId: "user123",
    date: new Date(2025, 0, 5),
    notes: "Upper body push workout.",
    exercises: [
      {
        exerciseId: "benchPress",
        order: 1,
        sets: [
          { setId: "set1", weight: 80, reps: 12, setOrder: 1 },
          { setId: "set2", weight: 90, reps: 10, setOrder: 2 },
          { setId: "set3", weight: 95, reps: 8, setOrder: 3 },
        ],
      },
      {
        exerciseId: "overheadPress",
        order: 2,
        sets: [
          { setId: "set1", weight: 40, reps: 12, setOrder: 1 },
          { setId: "set2", weight: 45, reps: 10, setOrder: 2 },
        ],
      },
    ],
  },
  {
    workoutId: "workout3",
    userId: "user123",
    date: new Date(2025, 0, 10),
    notes: "Full body circuit.",
    exercises: [
      {
        exerciseId: "deadlift",
        order: 1,
        sets: [
          { setId: "set1", weight: 120, reps: 10, setOrder: 1 },
          { setId: "set2", weight: 130, reps: 8, setOrder: 2 },
        ],
      },
      {
        exerciseId: "pullUp",
        order: 2,
        sets: [
          { setId: "set1", weight: 0, reps: 10, setOrder: 1 },
          { setId: "set2", weight: 0, reps: 8, setOrder: 2 },
        ],
      },
      {
        exerciseId: "pushUp",
        order: 3,
        sets: [
          { setId: "set1", weight: 0, reps: 15, setOrder: 1 },
          { setId: "set2", weight: 0, reps: 15, setOrder: 2 },
        ],
      },
    ],
  },
  {
    workoutId: "workout4",
    userId: "user123",
    date: new Date(2025, 0, 19),
    notes: "2312312312",
    exercises: [
      {
        exerciseId: "deadlift",
        order: 1,
        sets: [
          { setId: "set1", weight: 120, reps: 10, setOrder: 1 },
          { setId: "set2", weight: 130, reps: 8, setOrder: 2 },
        ],
      },
      {
        exerciseId: "pullUp",
        order: 2,
        sets: [
          { setId: "set1", weight: 0, reps: 10, setOrder: 1 },
          { setId: "set2", weight: 0, reps: 8, setOrder: 2 },
        ],
      },
      {
        exerciseId: "pushUp",
        order: 3,
        sets: [
          { setId: "set1", weight: 0, reps: 15, setOrder: 1 },
          { setId: "set2", weight: 0, reps: 15, setOrder: 2 },
        ],
      },
    ],
  },
];

export interface Set {
  setId: string;
  weight: number;
  reps: number;
}

export interface Exercise {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  sets: Set[];
}

export interface Workout {
  workoutId: string;
  userId: string;
  date: Date;
  notes: string;
  exercises: Exercise[];
}

export const commonExercises: Record<string, string[]> = {
  Chest: [
    "Bench Press",
    "Push-ups",
    "Chest Flyes",
    "Incline Bench Press",
    "Dips",
    "Cable Crossovers",
    "Decline Bench Press",
  ],
  Back: [
    "Pull-ups",
    "Rows",
    "Lat Pulldowns",
    "Deadlifts",
    "T-Bar Rows",
    "Seated Cable Rows",
    "Good Mornings",
    "Face Pulls",
  ],
  Legs: [
    "Squats",
    "Lunges",
    "Leg Press",
    "Deadlifts",
    "Romanian Deadlifts",
    "Leg Extensions",
    "Leg Curls",
    "Calf Raises",
    "Step-Ups",
    "Hack Squats",
  ],
  Shoulders: [
    "Overhead Press",
    "Lateral Raises",
    "Front Raises",
    "Arnold Press",
    "Upright Rows",
    "Reverse Flyes",
    "Face Pulls",
  ],
  Arms: [
    "Bicep Curls",
    "Tricep Extensions",
    "Hammer Curls",
    "Preacher Curls",
    "Skull Crushers",
    "Tricep Dips",
    "Concentration Curls",
    "Overhead Tricep Extensions",
    "Cable Curls",
    "Diamond Push-ups",
  ],
  Core: [
    "Crunches",
    "Planks",
    "Russian Twists",
    "Leg Raises",
    "Mountain Climbers",
    "Cable Twists",
    "Hanging Leg Raises",
    "Ab Rollouts",
    "Dead Bugs",
    "Side Planks",
  ],
};

// TODO: grab data structure from DB structure image/flow chart
export const workouts: Workout[] = [
  {
    workoutId: "1",
    userId: "user123",
    date: new Date(2025, 0, 2),
    notes: "Leg day workout focused on strength.",
    exercises: [
      {
        exerciseId: "1",
        name: "Squats",
        muscleGroup: "Legs",
        sets: [
          { setId: "set1", weight: 100, reps: 10 },
          { setId: "set2", weight: 110, reps: 8 },
          { setId: "set3", weight: 120, reps: 6 },
        ],
      },
      {
        exerciseId: "2",
        muscleGroup: "Chest",
        name: "Bench press",
        sets: [
          { setId: "set1", weight: 200, reps: 12 },
          { setId: "set2", weight: 220, reps: 10 },
        ],
      },
    ],
  },
  {
    workoutId: "2",
    userId: "user123",
    date: new Date(2025, 0, 5),
    notes: "Upper body push workout.",
    exercises: [
      {
        exerciseId: "1",
        muscleGroup: "Shoulders",
        name: "Overhead Press",
        sets: [
          { setId: "set1", weight: 80, reps: 12 },
          { setId: "set2", weight: 90, reps: 10 },
          { setId: "set3", weight: 95, reps: 8 },
        ],
      },
      {
        exerciseId: "2",
        muscleGroup: "Biceps",
        name: "Bicep Curls",
        sets: [
          { setId: "set1", weight: 40, reps: 12 },
          { setId: "set2", weight: 45, reps: 10 },
        ],
      },
    ],
  },
  {
    workoutId: "3",
    userId: "user123",
    date: new Date(2025, 0, 10),
    notes: "Full body circuit.",
    exercises: [
      {
        exerciseId: "1",
        muscleGroup: "Back",
        name: "Pull-ups",
        sets: [
          { setId: "set1", weight: 120, reps: 10 },
          { setId: "set2", weight: 130, reps: 8 },
        ],
      },
      {
        exerciseId: "2",
        muscleGroup: "Legs",
        name: "Squats",
        sets: [
          { setId: "set1", weight: 0, reps: 10 },
          { setId: "set2", weight: 0, reps: 8 },
        ],
      },
      {
        exerciseId: "3",
        muscleGroup: "Chest",
        name: "Bench Press",
        sets: [
          { setId: "set1", weight: 0, reps: 15 },
          { setId: "set2", weight: 0, reps: 15 },
        ],
      },
    ],
  },
  {
    workoutId: "4",
    userId: "user123",
    date: new Date(2025, 0, 19),
    notes: "2312312312",
    exercises: [
      {
        exerciseId: "1",
        muscleGroup: "Chest",
        name: "Bench Press",
        sets: [
          { setId: "set1", weight: 120, reps: 10 },
          { setId: "set2", weight: 130, reps: 8 },
        ],
      },
      {
        exerciseId: "2",
        muscleGroup: "Legs",
        name: "Squats",
        sets: [
          { setId: "set1", weight: 0, reps: 10 },
          { setId: "set2", weight: 0, reps: 8 },
        ],
      },
      {
        exerciseId: "3",
        muscleGroup: "Chest",
        name: "Bench Press",
        sets: [
          { setId: "set1", weight: 0, reps: 15 },
          { setId: "set2", weight: 0, reps: 15 },
        ],
      },
    ],
  },
  {
    workoutId: "5",
    userId: "user123asdasdasdasda",
    date: new Date(2025, 0, 26),
    notes: "2312312312",
    exercises: [
      {
        exerciseId: "1",
        muscleGroup: "Chest",
        name: "Bench Press",
        sets: [
          { setId: "set1", weight: 120, reps: 10 },
          { setId: "set2", weight: 130, reps: 8 },
        ],
      },
      {
        exerciseId: "2",
        muscleGroup: "Legs",
        name: "Squats",
        sets: [
          { setId: "set1", weight: 0, reps: 10 },
          { setId: "set2", weight: 0, reps: 8 },
        ],
      },
      {
        exerciseId: "3",
        muscleGroup: "Chest",
        name: "Bench Press",
        sets: [
          { setId: "set1", weight: 0, reps: 15 },
          { setId: "set2", weight: 0, reps: 15 },
        ],
      },
    ],
  },
];

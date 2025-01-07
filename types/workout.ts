export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: {
    weight: number;
    reps: number;
  }[];
}

export interface Workout {
  id: string;
  date: Date;
  exercises: Exercise[];
}


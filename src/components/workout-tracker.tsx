"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Exercise, Workout } from "@/types/workout";
import { useTheme } from "@/components/theme-provider.tsx";

const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

const commonExercises: { [key: string]: string[] } = {
  Chest: ["Bench Press", "Push-ups", "Chest Flyes"],
  Back: ["Pull-ups", "Rows", "Lat Pulldowns"],
  Legs: ["Squats", "Lunges", "Leg Press"],
  Shoulders: ["Overhead Press", "Lateral Raises", "Front Raises"],
  Arms: ["Bicep Curls", "Tricep Extensions", "Hammer Curls"],
  Core: ["Crunches", "Planks", "Russian Twists"],
};

export function WorkoutTracker() {
  const { isLightTheme } = useTheme();

  // fetch - pass all details regarding this workout

  const [workout, setWorkout] = useState<Workout>({
    id: "1",
    date: new Date(),
    exercises: [],
  });
  const [newExercise, setNewExercise] = useState<Exercise>({
    id: "",
    name: "",
    muscleGroup: "",
    sets: [{ weight: 0, reps: 0 }],
  });

  const addExercise = () => {
    if (newExercise.name && newExercise.muscleGroup) {
      setWorkout((prev) => ({
        ...prev,
        exercises: [
          ...prev.exercises,
          { ...newExercise, id: Date.now().toString() },
        ],
      }));
      setNewExercise({
        id: "",
        name: "",
        muscleGroup: "",
        sets: [{ weight: 0, reps: 0 }],
      });
    }
  };

  const addSet = (exerciseId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: [...ex.sets, { weight: 0, reps: 0 }] }
          : ex,
      ),
    }));
  };

  const updateSet = (
    exerciseId: string,
    setIndex: number,
    field: "weight" | "reps",
    value: number,
  ) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) =>
                idx === setIndex ? { ...set, [field]: value } : set,
              ),
            }
          : ex,
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`w-full ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"} `}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Exercise</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="muscle-group" className="text-right">
                Muscle Group
              </Label>
              <Select
                value={newExercise.muscleGroup}
                onValueChange={(value) =>
                  setNewExercise((prev) => ({ ...prev, muscleGroup: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Muscle Group" />
                </SelectTrigger>
                <SelectContent>
                  {muscleGroups.map((group) => (
                    <SelectItem key={group} value={group.toLowerCase()}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="exercise-name" className="text-right">
                Exercise
              </Label>
              <Select
                value={newExercise.name}
                onValueChange={(value) =>
                  setNewExercise((prev) => ({ ...prev, name: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Exercise" />
                </SelectTrigger>
                <SelectContent>
                  {newExercise.muscleGroup &&
                    commonExercises[newExercise.muscleGroup].map((exercise) => (
                      <SelectItem key={exercise} value={exercise.toLowerCase()}>
                        {exercise}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addExercise}>Add Exercise</Button>
        </DialogContent>
      </Dialog>

      {workout.exercises.map((exercise) => (
        <Card key={exercise.id}>
          <CardHeader>
            <CardTitle>{exercise.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      updateSet(
                        exercise.id,
                        setIndex,
                        "weight",
                        Number(e.target.value),
                      )
                    }
                    placeholder="Weight"
                    className="w-20"
                  />
                  <span>×</span>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      updateSet(
                        exercise.id,
                        setIndex,
                        "reps",
                        Number(e.target.value),
                      )
                    }
                    placeholder="Reps"
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500">
                    Set {setIndex + 1}
                  </span>
                </div>
              ))}
              <Button
                onClick={() => addSet(exercise.id)}
                variant="outline"
                size="sm"
                className="mt-2 text-contrastReversed"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Set
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

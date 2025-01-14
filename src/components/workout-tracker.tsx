"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
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

import { useTheme } from "@/components/theme-provider.tsx";
import { commonExercises, Exercise, Workout } from "@/utils/workoutData.ts";

const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

interface Props {
  workout1: Workout;
}

export function WorkoutTracker({ workout1 }): Props {
  const { isLightTheme } = useTheme();

  // fetch - pass all details regarding this workout

  const [workout, setWorkout] = useState<Workout>(workout1 ?? []);
  const [newExercise, setNewExercise] = useState<Exercise>({
    exerciseId: "",
    muscleGroup: "",
    sets: [{ setId: "set1", weight: 0, reps: 0, setOrder: 0 }],
  });

  const addExercise = () => {
    if (newExercise.exerciseId && newExercise.muscleGroup) {
      setWorkout((prev) => ({
        ...prev,
        exercises: [
          ...prev.exercises,
          { ...newExercise, id: Date.now().toString() },
        ],
      }));
      setNewExercise({
        exerciseId: "",
        muscleGroup: "",
        sets: [{ setId: "set1", weight: 0, reps: 0, setOrder: 0 }],
      });
    }
  };

  const addSet = (exerciseId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.exerciseId === exerciseId
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
        ex.exerciseId === exerciseId
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
    <>
      {!workout1?.exercises.length ? (
        <h1 className="text-center my-4 text-pretty">
          You have not added any exercise yet. Click button below to add one.
        </h1>
      ) : (
        <div>I have some</div>
      )}
      {/*TODO: separate component / idealy exercise name and accordion that closes automatically when other opens*/}
      {workout.exercises.map((exercise) => (
        <Card className="my-2" key={exercise.exerciseId}>
          <CardHeader>
            <CardTitle>{exercise.exerciseId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exercise.sets.map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-2 w-fit"
                  // className="flex items-center space-x-2 border-4"
                >
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      updateSet(
                        exercise.exerciseId,
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
                        exercise.exerciseId,
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
                  <button aria-label={`delete set ${setIndex + 1}`}>
                    <Trash2
                      aria-hidden="true"
                      className="h-6 w-6 justify-self-end"
                    />
                  </button>
                </div>
              ))}
              <Button
                onClick={() => addSet(exercise.exerciseId)}
                variant="outline"
                size="sm"
                className={`${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"} hover:bg-black hover:text-white focus-visible:bg-yellow-500{`}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Set
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`w-full bg-teriary text-white hover:bg-black focus-visible:bg-yellow-500`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] sm:max-w-[500px] ms-1 me-1">
          <DialogHeader>
            <DialogTitle>Add New Exercise</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="muscle-group" className="text-right text-balance">
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
          <Button
            className={`${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"}`}
            onClick={addExercise}
          >
            Add Exercise
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

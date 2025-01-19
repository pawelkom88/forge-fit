import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, X } from "lucide-react";
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
import { muscleGroups } from "@/utils/constants.ts";

interface Props {
  workoutDetails: Workout | null;
  setWorkoutDetails: (workout: Workout | null) => void;
}

export function WorkoutTracker({ workoutDetails, setWorkoutDetails }: Props) {
  const { isLightTheme } = useTheme();
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    exerciseId: "",
    // type muscle group - union
    muscleGroup: "",
    sets: [{ setId: "set1", weight: 0, reps: 0 }],
  });

  const [toggleWorkoutCard, setToggleWorkoutCard] = useState(false);

  // const addExercise = () => {
  //   if (newExercise.exerciseId) {
  //     setWorkoutDetails((workout) => ({
  //       ...workout,
  //       exercises: [
  //         ...workout.exercises,
  //         // todo: get unique id for set maybe react ID hook ?
  //         { ...newExercise, id: Date.now().toString() },
  //       ],
  //     }));
  //
  //     setNewExercise({
  //       name: "",
  //       exerciseId: "",
  //       muscleGroup: "",
  //       // todo: get unique id for set maybe react ID hook ?
  //       sets: [{ setId: "set1", weight: 0, reps: 0 }],
  //     });
  //   }
  // };

  const addSet = (exerciseId: string) => {
    console.log(exerciseId);
    // setWorkoutDetails((workout) => {
    //   return {
    //     ...workout,
    //     exercises: workout.exercises.map((exercise: Exercise) =>
    //       exercise.exerciseId === exerciseId
    //         ? { ...exercise, sets: [...exercise.sets, { weight: 0, reps: 0 }] }
    //         : exercise,
    //     ),
    //   };
    // });
  };

  // const updateSet = (
  //   exerciseId: string,
  //   setIndex: number,
  //   field: "weight" | "reps",
  //   value: number,
  // ) => {
  //   setWorkoutDetails((prev) => ({
  //     ...prev,
  //     exercises: prev.exercises.map((exercise) =>
  //       exercise.exerciseId === exerciseId
  //         ? {
  //             ...exercise,
  //             sets: exercise.sets.map((set, idx) =>
  //               idx === setIndex ? { ...set, [field]: value } : set,
  //             ),
  //           }
  //         : exercise,
  //     ),
  //   }));
  // };
  //

  /*TODO: separate component / idealy exercise name and accordion that closes automatically when other opens*/

  return (
    <>
      {!workoutDetails?.exercises?.length ? (
        <h1 className="text-center my-4 text-pretty">
          You have not added any exercise yet. Click button below to add one.
        </h1>
      ) : (
        <>
          {workoutDetails?.exercises?.map((exercise) => (
            <Card
              aria-expanded={toggleWorkoutCard}
              aria-controls="toggleWorkoutCard"
              className="my-2"
              key={exercise.exerciseId}
            >
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg xl:text-xl">
                  {exercise.exerciseId}
                </CardTitle>
                <button
                  id="toggleWorkoutCard"
                  aria-label={`${toggleWorkoutCard ? "Close" : "Open"} exercise details`}
                  onClick={() => setToggleWorkoutCard(!toggleWorkoutCard)}
                >
                  {toggleWorkoutCard ? (
                    <ChevronUp size={32} />
                  ) : (
                    <ChevronDown size={32} />
                  )}
                </button>
              </CardHeader>

              {toggleWorkoutCard && (
                <CardContent>
                  <div className="space-y-4">
                    {exercise.sets.map((set, setIndex) => (
                      <div
                        key={setIndex}
                        className="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-2 w-fit"
                      >
                        <Input
                          type="number"
                          value={set.weight}
                          onChange={
                            (e) => console.log("updating set")
                            // updateSet(
                            //   exercise.exerciseId,
                            //   setIndex,
                            //   "weight",
                            //   Number(e.target.value),
                            // )
                          }
                          placeholder="Weight"
                          className="w-20"
                        />
                        <span>×</span>
                        <Input
                          type="number"
                          value={set.reps}
                          onChange={
                            (e) => console.log("updating set")
                            // updateSet(
                            //   exercise.exerciseId,
                            //   setIndex,
                            //   "reps",
                            //   Number(e.target.value),
                            // )
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
                      className={`${
                        isLightTheme ? "bg-purple" : "bg-white"
                      } ${isLightTheme ? "text-white" : "text-black"} hover:bg-black hover:text-white focus-visible:bg-yellow-500`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Set
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </>
      )}
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
          {/*<Button*/}
          {/*  className={`${*/}
          {/*    isLightTheme ? "bg-purple" : "bg-white"*/}
          {/*  } ${isLightTheme ? "text-white" : "text-black"}`}*/}
          {/*  onClick={addExercise}*/}
          {/*>*/}
          {/*  Add Exercise*/}
          {/*</Button>*/}
        </DialogContent>
      </Dialog>
    </>
  );
}

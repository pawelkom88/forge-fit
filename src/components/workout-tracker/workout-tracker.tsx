import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { commonExercises, Exercise, Workout } from "@/utils/workoutData.ts";
import { AuthRequiredButton } from "@/components/auth-required-button/AuthRequiredBtn.tsx";

interface Props {
  workoutDetails: Workout | null;
  setWorkoutDetails: (workout: Workout | null) => void;
}

export function WorkoutTracker({ workoutDetails }: Props) {
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    exerciseId: "",
    // type muscle group - union
    muscleGroup: "",
    sets: [{ setId: "set1", weight: 0, reps: 0 }],
  });

  console.table(workoutDetails);

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
  const hasExercises = workoutDetails?.exercises?.length;

  // todo: cannot add an exercise for a muscle group that already had been added

  return (
    <>
      {!hasExercises ? (
        <h1 className="text-center my-4 text-pretty">
          You have not added any exercise yet. Click button below to add one.
        </h1>
      ) : (
        <div className="flex flex-col">
          {workoutDetails?.exercises?.map((exercise) => (
            <WorkoutDetailsCard
              key={exercise.exerciseId}
              exercise={exercise}
              onAddSet={() => addSet(exercise.exerciseId)}
            />
          ))}
        </div>
      )}
      <AddExerciseDialog
        newExercise={newExercise}
        setNewExercise={setNewExercise}
      />
      {hasExercises && (
        <AuthRequiredButton
          saveUserProgress={() => console.log("save user progress")}
        >
          <Save />
          Save workout details
        </AuthRequiredButton>
      )}
    </>
  );
}

interface WorkoutDetailsCardProps {
  exercise: Exercise;
  onAddSet: () => void;
}

function WorkoutDetailsCard({ exercise, onAddSet }: WorkoutDetailsCardProps) {
  const [toggleWorkoutCard, setToggleWorkoutCard] = useState(false);

  return (
    <button
      id="toggleWorkoutCard"
      aria-label={`${toggleWorkoutCard ? "Collapse" : "Expand"} exercise details card`}
      onClick={() => setToggleWorkoutCard(!toggleWorkoutCard)}
    >
      <Card
        aria-expanded={toggleWorkoutCard}
        aria-controls="toggleWorkoutCard"
        className="my-2 !focus-visible:bg-focusVisible"
        key={exercise.exerciseId}
      >
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg xl:text-xl">{exercise.name}</CardTitle>
          {toggleWorkoutCard ? (
            <ChevronUp size={32} />
          ) : (
            <ChevronDown size={32} />
          )}
        </CardHeader>
        {toggleWorkoutCard && (
          <CardContent className="w-fit" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              {exercise.sets.map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="grid grid-cols-[1fr_auto_1fr_40px_30px] items-center gap-2 w-fit"
                >
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={
                      () => console.log("updating set")
                      // updateSet(
                      //   exercise.exerciseId,
                      //   setIndex,
                      //   "weight",
                      //   Number(e.target.value),
                      // )
                    }
                    placeholder="Weight"
                    className="w-20 focus-visible:bg-focusVisible"
                  />
                  <span aria-hidden="true">×</span>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={
                      () => console.log("updating set")
                      // updateSet(
                      //   exercise.exerciseId,
                      //   setIndex,
                      //   "reps",
                      //   Number(e.target.value),
                      // )
                    }
                    placeholder="Reps"
                    className="w-20 focus-visible:bg-focusVisible"
                  />
                  <span className="text-sm text-gray-500">
                    Set {setIndex + 1}
                  </span>
                  {/*todo: add onclick update set */}
                  <Trash2
                    tabIndex={0}
                    onClick={() => console.log("deleting set")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        console.log("deleting set");
                        e.preventDefault();
                      }
                      e.stopPropagation();
                    }}
                    aria-label={`delete set ${setIndex + 1}`}
                    className="h-6 w-6 justify-self-end"
                  />
                </div>
              ))}
              <div
                tabIndex={0}
                onClick={onAddSet}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("deleting set");
                    e.preventDefault();
                  }
                  e.stopPropagation();
                }}
                className="w-fit rounded p-2 flex items-center gap-0 bg-purple hover:bg-teriary text-contrastReversed
                dark:bg-white dark:hover:bg-teriary hover:text-white focus-visible:bg-focusVisible"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Set
              </div>
              {/*</Button>*/}
            </div>
          </CardContent>
        )}
      </Card>
    </button>
  );
}

interface AddExerciseDialogProps {
  newExercise: Exercise;
  setNewExercise: (exercise: Exercise) => void;
}

export function AddExerciseDialog({
  newExercise,
  setNewExercise,
}: AddExerciseDialogProps) {
  const [customExercise, setCustomExercise] = useState("");
  const [toggleCustomExercise, setToggleCustomExercise] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`w-full bg-teriary dark:bg-white dark:hover:bg-teriary text-contrastReversed hover:text-white hover:bg-purple focus-visible:bg-focusVisible`}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[500px] ms-1 me-1">
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
        </DialogHeader>
        {!toggleCustomExercise && (
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
                  {Object.keys(commonExercises).map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {newExercise.muscleGroup && (
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
                      commonExercises[newExercise.muscleGroup].map(
                        (exercise) => (
                          <SelectItem
                            key={exercise}
                            value={exercise.toLowerCase()}
                          >
                            {exercise}
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
        {!toggleCustomExercise &&
          newExercise.muscleGroup &&
          newExercise.name && (
            <Button
              className="bg-teriary text-white hover:bg-purple dark:text-white dark:hover:text-contrastReversed dark:hover:bg-contrast focus-visible:bg-focusVisible"
              // onClick={addExercise}
            >
              Add {newExercise.name} to your workout
            </Button>
          )}
        {newExercise.muscleGroup && (
          <>
            <p className="text-pretty text-sm">
              Can't find the exercise you're looking for? You can add your own
              exercise below.
            </p>
            {toggleCustomExercise && (
              <AddCustomExercise onSetCustomExercise={setCustomExercise} />
            )}
            <Button
              onClick={() => setToggleCustomExercise(true)}
              className="dark:bg-white dark:text-black dark:hover:bg-accent dark:hover:text-contrast text-white hover:bg-purple focus-visible:bg-focusVisible"
            >
              Add your own/typed exercise
            </Button>
            {toggleCustomExercise && (
              <Button
                className="bg-white text-black hover:bg-accent hover:text-contrast
               dar:text-white dark:hover:bg-purple focus-visible:bg-focusVisible"
                onClick={() => setToggleCustomExercise(false)}
              >
                Go back to exercise selection
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AddCustomExercise({
  onSetCustomExercise,
}: {
  onSetCustomExercise: (value: string) => void;
}) {
  return (
    <Input
      type="text"
      placeholder="Add your own exercise"
      onChange={(e) => onSetCustomExercise(e.target.value)}
    />
  );
}

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export function WorkoutDateInput() {
  return (
    <>
      <Label className="mt-4 mb-2" htmlFor="workout-date">
        Workout date
      </Label>
      <Input
        id="workout-date"
        type="text"
        placeholder="Enter workout date in YYYY-MM-DD format"
        className="max-w-80 h-12 p-2 mb-8 focus-visible:bg-yellow-500 focus-visible:placeholder:text-black placeholder:text-sm"
      />
    </>
  );
}

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export function WorkoutDateInput() {
  // use zod to validate
  return (
    <>
      <Label className="mt-4 mb-2" htmlFor="workout-date">
        Workout date
      </Label>
      <Input
        id="workout-date"
        type="text"
        maxLength={10}
        placeholder="Enter workout date in YYYY-MM-DD format"
        className="max-w-80 h-12 p-2 mb-8 focus-visible:bg-yellow-500 focus-visible:placeholder:text-black placeholder:text-sm"
      />
    </>
  );
}

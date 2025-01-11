import { format } from "date-fns";
import { getWeekDays } from "@/utils/helpers.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";

interface Props {
  workoutDate: Date;
}

export function WeekNavigator({ workoutDate }: Props) {
  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {getWeekDays(workoutDate).map((day) => (
        <div
          key={day.toISOString()}
          className={`p-2 rounded-lg ${
            format(day, DATE_PATTERN.THREE_LETTERS) ===
            format(workoutDate, DATE_PATTERN.THREE_LETTERS)
              ? "bg-teriary text-contrastReversed font-semibold"
              : ""
          }`}
        >
          <div className="text-sm text-contrast">{format(day, "EEE")}</div>
          <div className="text-lg text-contrast">{format(day, "d")}</div>
        </div>
      ))}
    </div>
  );
}

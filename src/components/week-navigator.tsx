import { format } from "date-fns";
import { getWeekDays } from "@/utils/helpers.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";
import { DateString } from "@/utils/ts-helpers.ts";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface Props {
  workoutDate: DateString;
}

export function WeekNavigator({ workoutDate }: Props) {
  // TODO: on mobile - slider
  return (
    <div className="relative">
      <button
        aria-label="Previous month"
        className="absolute left-0 top-6 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
      >
        <ChevronLeft aria-hidden="true" size={24} />
      </button>
      <div className="grid grid-cols-7 gap-2 text-center">
        {getWeekDays(workoutDate).map((day) => {
          const isToday =
            format(day, DATE_PATTERN.THREE_LETTERS) ===
            format(workoutDate, DATE_PATTERN.THREE_LETTERS);

          return (
            <Link
              to={`/workout/${format(day, DATE_PATTERN.YYYY_MM_DD)}`}
              key={day.toISOString()}
              className={`p-2 rounded-lg hover:bg-contrast hover:text-contrastReversed ${
                isToday ? "bg-teriary font-bold hover:bg-teriary" : ""
              }`}
            >
              <div
                className={`text-sm ${isToday ? "text-contrastReversed" : "text-contrast"}`}
              >
                {format(day, DATE_PATTERN.THREE_LETTERS)}
              </div>
              <div
                className={`text-lg ${isToday ? "text-contrastReversed text-xl" : "text-contrast"}`}
              >
                {format(day, "d")}
              </div>
            </Link>
          );
        })}
      </div>
      <button className="absolute right-0 top-6">123</button>
    </div>
  );
}

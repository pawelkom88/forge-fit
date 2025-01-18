import { format, isAfter, isBefore } from "date-fns";
import {
  formatDateForScreenReader,
  generateWeekAroundDate,
} from "@/utils/helpers.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";
import { DateString } from "@/utils/ts-helpers.ts";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  workoutDate: DateString;
  weekAround: ReturnType<typeof generateWeekAroundDate>;
  onDateChange: (newDate: string) => void;
}

export function WeekNavigator({
  workoutDate,
  weekAround,
  onDateChange,
}: Props) {
  return (
    <div className="relative">
      <button
        // onClick={() => setWeekAround()}
        aria-label="Previous days"
        className="absolute -left-12 top-4 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
      >
        <ChevronLeft aria-hidden="true" size={24} />
      </button>
      <div className="grid grid-cols-7 gap-0 lg:gap-2 text-center">
        {weekAround.map(({ date, isWorkoutDay }) => {
          const today = new Date();

          const isSelectedDate =
            workoutDate === format(date, DATE_PATTERN.YYYY_MM_DD);

          const formatedDateForScreenReaders = formatDateForScreenReader(
            new Date(workoutDate),
          );

          const isFutureWorkout = isAfter(date, today) && isWorkoutDay;
          const isPastWorkout = isBefore(date, today) && isWorkoutDay;

          return (
            <Link
              onClick={() =>
                onDateChange(format(date, DATE_PATTERN.YYYY_MM_DD))
              }
              aria-label={`${formatedDateForScreenReaders}`}
              to={`/workout/${format(date, DATE_PATTERN.YYYY_MM_DD)}`}
              key={date.toISOString()}
              className={`p-2 rounded-lg hover:bg-contrast hover:text-contrastReversed
              ${isSelectedDate ? "bg-teriary font-bold hover:bg-teriary text-contrastReversed" : "text-contrast"}
              `}
            >
              <div
                className={`text-sm ${!isSelectedDate && isPastWorkout ? "bg-quaternary text-white" : ""}
                ${!isSelectedDate && isFutureWorkout ? "bg-quinary text-black" : ""}`}
              >
                {format(date, DATE_PATTERN.ABBR3)}
              </div>
              <div
                className={`text-lg ${isSelectedDate ? "text-xl" : "text-contrast"}`}
              >
                {format(date, "d")}
              </div>
            </Link>
          );
        })}
      </div>
      <button
        // onClick={() => setWeekAround()}
        aria-label="Next days"
        className="absolute -right-12 top-4 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
      >
        <ChevronRight aria-hidden="true" size={24} />
      </button>
    </div>
  );
}

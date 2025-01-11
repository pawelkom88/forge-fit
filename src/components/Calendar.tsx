import { format, isSameMonth, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { workouts } from "@/utils/workoutData";
import { useCalendar } from "@/hooks/useCalendar.tsx";
import { DAYS_OF_WEEK } from "@/utils/constants.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

// function isSameDay(date1: Date, date2: Date) {
//   return date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
// }

export default function Calendar() {
  const { currentMonth, monthDays, goToPreviousMonth, goToNextMonth } =
    useCalendar();

  return (
    <section
      className="bg-foreground rounded-lg p-2 sm:p-4 flex flex-col border"
      aria-labelledby="calendar-label"
      aria-describedby="calendar-description"
    >
      <div className="flex justify-between items-center mb-2">
        <CalendarHeading currentMonth={currentMonth} />
        <div className="flex space-x-2">
          <button
            aria-label="Previous month"
            onClick={goToPreviousMonth}
            className="text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            aria-label="Next month"
            onClick={goToNextMonth}
            className="text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>
      </div>
      <Label className="mt-4" htmlFor="workout-date">
        Workout date
      </Label>
      <Input
        id="workout-date"
        type="text"
        placeholder="Enter workout date in YYYY-MM-DD format"
        className="max-w-96 h-12 p-2 mb-8 focus-visible:bg-yellow-500 focus-visible:placeholder:text-black"
      />
      <WorkoutLegend />
      <hr className="col-span-7" />
      <ol className="grid grid-cols-7 gap-2 sm:gap-4">
        <DayOfWeekLabels />
        <hr className="col-span-7" />
        {monthDays.map((day) => {
          const isWorkoutDay = workouts.some((workout) =>
            isSameDay(workout.date, day),
          );

          return (
            // will be link ?
            <DayButton
              key={day.toISOString()}
              isWorkoutDay={isWorkoutDay}
              date={day}
              onWorkoutDaySelection={() =>
                router.push(`/day/${format(day, "yyyy-MM-dd")}`)
              }
              currentMonth={currentMonth}
            />
          );
        })}
      </ol>
    </section>
  );
}

interface DayButtonProps {
  date: Date;
  isWorkoutDay: boolean;
  onWorkoutDaySelection: () => void;
  currentMonth: Date;
}

function DayButton({
  date,
  isWorkoutDay,
  onWorkoutDaySelection,
  currentMonth,
}: DayButtonProps) {
  return (
    <button
      onClick={onWorkoutDaySelection}
      className={`
        relative min-h-12 sm:min-h-20 p-1 sm:p-2 rounded-lg text-contrast hover:text-contrastReversed text-center transition-colors duration-200 text-md sm:text-xl hover:bg-contrast hover:shadow focus-visible:bg-yellow-500
        ${isToday(date) ? "bg-teriary text-white font-semibold shadow shadow-teriary" : ""}
        ${isWorkoutDay ? "bg-[#00987d] text-white shadow shadow-[#00987d]" : ""}
      `}
    >
      <time dateTime={format(date, "yyyy-MM-dd")}>{format(date, "d")}</time>
    </button>
  );
}

function WorkoutLegend() {
  return (
    <dl className="text-purple flex gap-2 mb-8">
      <dt>
        <Circle aria-hidden="true" className="text-[#00987d]" />
      </dt>
      <dd>Past workouts</dd>
      <dd>&#124;</dd>
      <dt>
        <Circle aria-hidden="true" className="text-teriary" />
      </dt>
      <dd>Today's date</dd>
    </dl>
  );
}

function CalendarHeading({ currentMonth }: { currentMonth: Date }) {
  return (
    <div>
      <h2 aria-hidden="true" className="text-xl sm:text-2xl font-semibold ">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <p className="sr-only" id="calendar-description">
        Choose a day for your workout
      </p>
    </div>
  );
}

function DayOfWeekLabels() {
  return (
    <>
      {DAYS_OF_WEEK.map((day) => (
        <abbr
          title={day}
          key={day}
          className="pt-4 text-center font-bold text-purple text-sm sm:text-base no-underline"
        >
          {day.charAt(0)}
        </abbr>
      ))}
    </>
  );
}

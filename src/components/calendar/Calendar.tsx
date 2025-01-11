import { format, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { useCalendar } from "@/hooks/useCalendar.tsx";
import { WorkoutDateInput } from "@/components/workout-date-input/WorkoutDateInput.tsx";
import { Link } from "react-router-dom";
import { Workout } from "@/utils/workoutData.ts";
import { getWeekDays } from "@/utils/helpers.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";

interface Props {
  workouts: Workout[];
}

export default function Calendar({ workouts }: Props) {
  const {
    startDay,
    currentMonth,
    monthDays,
    goToPreviousMonth,
    goToNextMonth,
  } = useCalendar();

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
            className="text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background 
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            aria-label="Next month"
            onClick={goToNextMonth}
            className="text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background 
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>
      </div>
      <WorkoutDateInput />
      <WorkoutLegend />
      <hr className="col-span-7" />
      {/*// TODO: start month from the correct day, in january example it is wednesday so need to create empty cells*/}
      <ol className="grid grid-cols-7 gap-4">
        <DayOfWeekLabels />
        <hr className="col-span-7" />
        <EmptyCells startDay={startDay} />
        {monthDays.map((day) => {
          const isWorkoutDay = workouts.some((workout) =>
            isSameDay(workout.date, day),
          );
          return (
            <WorkoutDetailsLink
              key={day.toISOString()}
              isWorkoutDay={isWorkoutDay}
              date={day}
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
}

function WorkoutDetailsLink({ date, isWorkoutDay }: DayButtonProps) {
  return (
    <Link
      to={`/workout/${format(date, DATE_PATTERN.YYYY_MM_DD)}`}
      className={`grid place-items-center
        relative min-h-8 sm:min-h-20 p-1 sm:p-2 rounded-lg text-contrast hover:text-contrastReversed text-center transition-colors duration-200 text-md sm:text-xl hover:bg-contrast hover:shadow focus-visible:bg-yellow-500
        ${isToday(date) ? "bg-teriary text-white font-semibold shadow shadow-teriary" : ""}
        ${isWorkoutDay ? "bg-[#009495] text-white shadow shadow-[#009495]" : ""}
      `}
    >
      <time dateTime={format(date, DATE_PATTERN.YYYY_MM_DD)}>
        {format(date, DATE_PATTERN.DAY)}
      </time>
    </Link>
  );
}

function WorkoutLegend() {
  return (
    <dl className="text-purple flex gap-2 mb-8">
      <dt>
        <Circle aria-hidden="true" className="text-[#009495]" />
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
      {getWeekDays().map((day) => {
        return (
          <abbr
            title={day.toISOString()}
            key={day.toISOString()}
            className="pt-4 text-center font-bold text-purple text-sm sm:text-base no-underline"
          >
            {format(day, DATE_PATTERN.THREE_LETTERS)}
          </abbr>
        );
      })}
    </>
  );
}

function EmptyCells({ startDay }: { startDay: number }) {
  return (
    <>
      {Array.from({ length: startDay }).map((_, index) => (
        <div key={`empty-${index}`}></div>
      ))}
    </>
  );
}

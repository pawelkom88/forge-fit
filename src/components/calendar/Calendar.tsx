import { format, isAfter, isBefore, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { useCalendar } from "@/hooks/useCalendar.tsx";
import { WorkoutDateInput } from "@/components/workout-date-input/WorkoutDateInput.tsx";
import { Link, useLoaderData } from "react-router-dom";
import {
  formatDateForScreenReaders,
  getWeekDays,
  doesWorkoutExistOnDate,
  formatDate,
} from "@/utils/helpers.ts";
import { DATE_PATTERN } from "@/utils/constants.ts";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";

export default function Calendar() {
  const {
    startDay,
    currentMonth,
    monthDays,
    goToPreviousMonth,
    goToNextMonth,
  } = useCalendar();

  return (
    <section className="bg-foreground rounded-lg p-2 sm:p-4 flex flex-col border">
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
      // user enters date and that date should be focused in the calendar
      <WorkoutDateInput />
      <WorkoutLegend />
      <hr className="col-span-7" />
      <ol className="grid grid-cols-7 gap-4">
        <DayOfWeekLabels />
        <hr className="col-span-7" />
        <EmptyCells startDay={startDay} />
        {monthDays.map((day) => (
          <WorkoutDetailsLink key={day.toISOString()} monthDay={day} />
        ))}
      </ol>
    </section>
  );
}

interface DayButtonProps {
  monthDay: Date;
}

function WorkoutDetailsLink({ monthDay }: DayButtonProps) {
  const workouts = useLoaderData();
  const isWorkoutDay = doesWorkoutExistOnDate(workouts, monthDay);
  const linkRef = useRef(null);
  const formatedDate = formatDate(monthDay);
  const formatedDateForScreenReaders = formatDateForScreenReaders(monthDay);
  const { value } = useLocalStorage("workoutDate", formatedDate);
  const today = new Date();
  const isFutureWorkout = isAfter(monthDay, today) && isWorkoutDay;
  const isPastWorkout = isBefore(monthDay, today) && isWorkoutDay;

  useEffect(() => {
    if (value && linkRef.current) {
      const linkElement = document.querySelector(`[data-date="${value}"]`);
      if (linkElement instanceof HTMLElement) {
        linkElement.focus();
      }
    }
  }, []);

  return (
    <Link
      data-date={formatedDate}
      ref={linkRef}
      aria-label={`${isPastWorkout || isFutureWorkout ? `Workout details for ${formatedDateForScreenReaders} : ""` : `Enter to add workout for ${formatedDateForScreenReaders}`}`}
      to={`/workout/${formatedDate}`}
      className={`grid place-items-center
        relative min-h-8 sm:min-h-20 p-1 sm:p-2 rounded-lg text-contrast hover:text-contrastReversed text-center
        transition-colors duration-200 text-md sm:text-xl hover:bg-contrast focus-visible:bg-yellow-500
        ${isToday(monthDay) ? "bg-teriary text-white font-bold" : ""}
        ${isPastWorkout ? "bg-quaternary text-white" : ""}
        ${isFutureWorkout ? "bg-quinary text-contrast" : ""}
      `}
    >
      <time dateTime={formatedDate}>{format(monthDay, DATE_PATTERN.DAY)}</time>
    </Link>
  );
}

export function WorkoutLegend({ isSelectedDate = false }) {
  return (
    <dl className="text-purple flex gap-2 mb-8">
      <dt>
        <Circle strokeWidth={1} fill="hsl(180, 100%, 29%)" aria-hidden="true" />
      </dt>
      <dd>Past workouts</dd>
      <dd>&#124;</dd>
      <dt>
        <Circle strokeWidth={1} fill="hsl(348, 66%, 50%)" aria-hidden="true" />
      </dt>
      <dd>{isSelectedDate ? "Selected date" : "Today's date"}</dd>
      <dd>&#124;</dd>
      <dt>
        <Circle strokeWidth={1} fill="hsl(300, 28%, 47%)" aria-hidden="true" />
      </dt>
      <dd>Future workouts</dd>
    </dl>
  );
}

function CalendarHeading({ currentMonth }: { currentMonth: Date }) {
  return (
    <div>
      <h2
        aria-describedby="current-month"
        className="text-xl sm:text-2xl font-semibold "
      >
        {format(currentMonth, DATE_PATTERN.FULL_MONTH_AND_YEAR)}
      </h2>
      <p className="sr-only" id="current-month">
        is the current chosen month, use buttons to navigate to other months
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
            title={formatDate(day)}
            key={formatDate(day)}
            className="pt-4 text-center font-bold text-purple text-sm sm:text-base no-underline"
          >
            {format(day, DATE_PATTERN.ABBR3)}
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

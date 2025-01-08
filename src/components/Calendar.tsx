import { format, isSameMonth, isSameDay, isToday, isBefore } from "date-fns";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { workouts } from "@/utils/workoutData";
import { useCalendar } from "@/hooks/useCalendar.tsx";
import { Union } from "@/utils/ts-helpers.ts";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

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
      className="bg-foreground rounded-lg p-2 sm:p-4 h-full flex flex-col border"
      aria-labelledby="calendar-label"
      aria-describedby="calendar-description"
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <CalendarHeading currentMonth={currentMonth} />
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100 bg-textContrast"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 bg-textContrast"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <WorkoutLegend />
      <div className=" h-12 border-2 p-2 mb-4 text-black">
        Input date here - so user can type in date instead of skimming through
        the calendar{" "}
      </div>

      <ol className="grid grid-cols-7 auto-rows-max gap-2 sm:gap-4 flex-grow">
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
        relative min-h-12 sm:min-h-20 p-1 sm:p-2 rounded-lg text-center transition-colors duration-200 text-md sm:text-xl hover:bg-red-200 hover:shadow
        ${!isSameMonth(date, currentMonth) ? "text-gray-300" : "text-gray-700"}
        ${isToday(date) ? "bg-[#007E9E] text-white font-semibold shadow shadow-gray-700" : ""}
        ${isSameMonth(date, currentMonth) ? "hover:bg-gray-100" : ""}
        ${isWorkoutDay ? "bg-[#00987d] text-white" : ""}
      `}
    >
      <time dateTime={format(date, "yyyy-MM-dd")}>{format(date, "d")}</time>
    </button>
  );
}

function WorkoutLegend() {
  return (
    <dl className="text-black flex gap-2 mb-2">
      <dt>
        <Circle aria-hidden="true" className="text-[#00987d]" />
      </dt>
      <dd>Past workouts</dd>
      <dd>&#124;</dd>
      <dt>
        <Circle aria-hidden="true" className="text-[#007E9E]" />
      </dt>
      <dd>Today's date</dd>
    </dl>
  );
}

// Add this component definition outside the Calendar function
function CalendarHeading({ currentMonth }: { currentMonth: Date }) {
  return (
    <div>
      <h2 className="sr-only" id="calendar-label">
        Workout Calendar
      </h2>
      <p className="sr-only" id="calendar-description">
        Choose a day for your workout
      </p>
      <h2
        aria-hidden="true"
        className="text-xl sm:text-2xl font-semibold text-textContrast"
      >
        {format(currentMonth, "MMMM yyyy")}
      </h2>
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
          className="text-center font-bold text-black text-sm sm:text-base no-underline"
        >
          {day.charAt(0)}
        </abbr>
      ))}
    </>
  );
}

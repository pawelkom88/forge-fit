import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Workout, workouts } from "@/utils/workoutData";

// function isSameDay(date1: Date, date2: Date) {
//   return date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
// }

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredWorkout, setHoveredWorkout] = useState<Workout | null>(null);

  // TODO : abstract to hook ? try to make it reusable ?
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1),
    );
  };

  return (
    <section
      className="bg-foreground rounded-lg p-2 sm:p-4 h-full flex flex-col border"
      aria-labelledby="calendar-label"
      aria-describedby="calendar-description"
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
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

      <dl className="text-black flex gap-2 mb-2">
        <dt>
          <Circle aria-hidden="true" className="text-green-500" />
        </dt>
        <dd>Past workouts</dd>
        <dd>&#124;</dd>
        <dt>
          <Circle aria-hidden="true" className="text-red-500" />
        </dt>
        <dd>Today's date</dd>
      </dl>

      <div className=" h-12 border-2 p-2 mb-4 text-black">
        Input date here - so user can type in date instead of skimming through
        the calendar{" "}
      </div>

      <ol className="grid grid-cols-7 gap-2 sm:gap-4 flex-grow">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <abbr
            title="Monday"
            key={day}
            className="text-center font-semibold text-gray-500 text-sm sm:text-base"
          >
            {day}
          </abbr>
        ))}
        {monthDays.map((day) => {
          const dayWorkouts = workouts.filter((workout) =>
            isSameDay(workout.date, day),
          );

          return (
            // will be link ?
            <button
              key={day.toISOString()}
              // todo change to link id
              onClick={() => router.push(`/day/${format(day, "yyyy-MM-dd")}`)}
              onMouseEnter={() => setHoveredWorkout(dayWorkouts[0] || null)}
              onMouseLeave={() => setHoveredWorkout(null)}
              className={`
                relative p-1 sm:p-2 rounded-lg text-center transition-colors duration-200 text-sm sm:text-base hover:bg-red-200 hover:shadow
                ${!isSameMonth(day, currentMonth) ? "text-gray-300" : "text-gray-700"}
                ${isToday(day) ? "bg-blue-100 font-semibold" : ""}
                ${isSameMonth(day, currentMonth) ? "hover:bg-gray-100" : ""}
              `}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>

              <div className="absolute flex">
                {dayWorkouts.map((workout, index) => (
                  <div key={index} className="ml-1">
                    maybe instead of hover show modal with summary and link to
                    full workout ?
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </ol>
      {hoveredWorkout && (
        <div className="absolute bg-red-300 border border-gray-200 rounded-lg shadow-lg p-2 z-10">
          <p className="font-semibold">
            {format(hoveredWorkout.date, "MMMM d, yyyy")}
          </p>
          <p className="text-sm">{hoveredWorkout.summary}</p>
        </div>
      )}
    </section>
  );
}

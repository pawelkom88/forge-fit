import { useState } from "react";
import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";
import { DateString } from "@/utils/ts-helpers.ts";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [workoutDate, setWorkoutDate] = useState<DateString | "">("");
  // use workoutDate to set currentMonth
  const selectedWorkoutMonth = new Date(workoutDate);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const captureEnteredDate = (date: DateString) => {
    setWorkoutDate(date);
    // setCurrentMonth(new Date(workoutDate));
  };

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

  return {
    startDay,
    currentMonth,
    monthDays,
    goToPreviousMonth,
    goToNextMonth,
    captureEnteredDate,
  };
}

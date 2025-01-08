import { useState } from "react";
import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  return {
    currentMonth,
    monthDays,
    goToPreviousMonth,
    goToNextMonth,
  };
}

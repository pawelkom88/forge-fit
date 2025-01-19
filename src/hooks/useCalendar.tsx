import { useState } from "react";
import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";

export function useCalendar(date: Date) {
  const [currentMonth, setCurrentMonth] = useState(
    date ? new Date(date) : new Date(),
  );
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const handleDateChange = (date: Date) => {
    setCurrentMonth(date);
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
    handleDateChange,
    setCurrentMonth,
  };
}

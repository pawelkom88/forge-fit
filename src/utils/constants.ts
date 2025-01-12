export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const DATE_PATTERN = {
  YYYY_MM_DD: "yyyy-MM-dd",
  DAY: "d",
  ABBR3: "EEE",
  ABBR4: "EEEE",
  FULL_MONTH: "MMMM",
  FULL_MONTH_AND_YEAR: "MMMM yyyy",
} as const;

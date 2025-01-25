import { z } from "zod";
import { DateString } from "@/utils/ts-helpers.ts";

export const formSchema = z.object({
  workoutDate: z
    .custom<DateString | "">()
    .refine(
      (date) => {
        const [year] = date.split("-").map(Number);
        return year >= 2025;
      },
      {
        message: "Year must be at least 2025",
      },
    )
    .refine(
      (date) => {
        const [, month] = date.split("-").map(Number);
        return month >= 1 && month <= 12;
      },
      {
        message: "Month must be between 1 and 12",
      },
    )
    .refine(
      (date) => {
        const [year, month, day] = date.split("-").map(Number);
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return day >= 1 && day <= lastDayOfMonth;
      },
      {
        message:
          "Day must be valid for the given month (e.g., not 31 for February)",
      },
    )
    .refine(
      (date) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date),
      {
        message: "Must be in YYYY-MM-DD format (e.g., 2024-01-25)",
      },
    ),
});

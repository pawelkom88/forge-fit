import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DATE_PATTERN = {
  YYYY_MM_DD: "yyyy-MM-dd",
  DAY: "d",
} as const;

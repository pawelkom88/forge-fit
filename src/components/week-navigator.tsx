import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export function WeekNavigator({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative">
        <button
          // onClick={() => setWeekAround()}
          aria-label="Previous days"
          className="hidden sm:block absolute -left-12 top-4 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
        >
          <ChevronLeft aria-hidden="true" size={24} />
        </button>
        <div className="grid grid-cols-7 gap-2 text-center">{children}</div>
        <button
          // onClick={() => setWeekAround()}
          aria-label="Next days"
          className="hidden sm:block absolute -right-12 top-4 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-yellow-500"
        >
          <ChevronRight aria-hidden="true" size={24} />
        </button>
      </div>
    </>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export function WeekNavigator({ children }: { children: React.ReactNode }) {
  const matches = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      {matches ? (
        <ScrollArea className="w-full h-[100px] whitespace-nowrap rounded-md">
          <div className="grid grid-cols-7 gap-2 text-center">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="relative">
          <button
            // onClick={() => setWeekAround()}
            aria-label="Previous days"
            className="hidden lg:block absolute -left-12 top-4 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-focusVisible"
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <div className="grid grid-cols-7 gap-2 text-center">{children}</div>
          <button
            // onClick={() => setWeekAround()}
            aria-label="Next days"
            className="hidden lg:block absolute -right-12 top-4 text-contrastReversed hover:text-contrast p-2 rounded-full hover:bg-background
            hover:shadow-lg shadow-purple border hover:border hover:border-contrast bg-purple focus-visible:bg-focusVisible"
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>
      )}
    </>
  );
}

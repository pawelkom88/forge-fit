import { format, isAfter, isBefore } from "date-fns";
import { ArrowLeftCircle, Calendar } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { WeekNavigator } from "@/components/week-navigator.tsx";
import { WorkoutTracker } from "@/components/workout-tracker.tsx";
import { NutritionTracker } from "@/components/nutrition-tracker.tsx";
import { Link, useParams } from "react-router-dom";
import { DateString } from "@/utils/ts-helpers.ts";
import { useTheme } from "@/components/theme-provider.tsx";
import { RoutesConfig } from "@/routing/routes.tsx";
import { DATE_PATTERN } from "@/utils/constants.ts";
import type { Workout } from "@/utils/workoutData.ts";
import React, { useEffect, useRef, useState } from "react";
import {
  doesWorkoutExistOnDate,
  formatDate,
  formatDateForScreenReaders,
  generateWeekDays,
} from "@/utils/helpers.ts";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch.ts";

// TODO: add skip to main content - id already set to workout
// todo: extract key to variable and reuse ?

export default function WorkoutDayPage() {
  const { workoutDate } = useParams() as { workoutDate: DateString };
  const { data, loading, error } = useFetch<Workout>(workoutDate);
  // TODO: what to do with state ?
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(data);

  return (
    <section className="bg-background container mx-auto pt-6  px-4 max-w-4xl">
      <WorkoutDayHeader workoutDate={workoutDate} />
      <WeekNavigator>
        <WorkoutDayOverview
          workout={data}
          setWorkoutDetails={setWorkoutDetails}
        />
      </WeekNavigator>
      {error && <p>{error.message}</p>}
      {loading === "pending" ? (
        <div className="px-2">
          <Skeleton className="w-full h-[36px] mt-6" />
          <Skeleton className="w-full h-[226px] my-2" />
        </div>
      ) : (
        <WorkoutDayTabs
          tracker={
            <WorkoutTracker
              workoutDetails={data}
              setWorkoutDetails={setWorkoutDetails}
            />
          }
          nutrition={<NutritionTracker />}
        />
      )}
    </section>
  );
}

function WorkoutDayHeader({ workoutDate }: { workoutDate: DateString }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    document.title = `Workout page for ${workoutDate}`;
  }, [workoutDate]);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold">
          {format(
            workoutDate,
            `${DATE_PATTERN.ABBR4}, ${DATE_PATTERN.FULL_MONTH} ${DATE_PATTERN.DAY} `,
          )}
        </h1>
      </div>
      <Link aria-label="Back to calendar" to={`/${RoutesConfig.app.path}`}>
        <ArrowLeftCircle size="30" aria-hidden="true" />
      </Link>
    </div>
  );
}

interface WorkoutDayNavigationProps {
  tracker: React.ReactNode;
  nutrition: React.ReactNode;
}

function WorkoutDayTabs({ tracker, nutrition }: WorkoutDayNavigationProps) {
  const { isLightTheme } = useTheme();

  return (
    <Tabs defaultValue="workout" className="mt-6">
      <TabsList
        className={`grid gap-2 w-full grid-cols-2 ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"}`}
      >
        <TabsTrigger id="workout" className="hover:bg-teriary" value="workout">
          Workout
        </TabsTrigger>
        <TabsTrigger className="hover:bg-teriary" value="nutrition">
          Nutrition
        </TabsTrigger>
      </TabsList>
      <TabsContent value="workout">{tracker}</TabsContent>
      <TabsContent value="nutrition">{nutrition}</TabsContent>
    </Tabs>
  );
}

interface WorkoutDayOverviewProps {
  workout: Workout | null;
  setWorkoutDetails: (workout: Workout | null) => void;
}

function WorkoutDayOverview({
  workout,
  setWorkoutDetails,
}: WorkoutDayOverviewProps) {
  const { data, loading, error } = useFetch<Workout[]>();
  const { workoutDate } = useParams() as { workoutDate: DateString };
  const { setValue } = useLocalStorage("workoutDate", workoutDate);

  const handleDateChange = (selectedDate: DateString) => {
    setWorkoutDetails(workout ?? null);
    setValue(selectedDate);
  };

  return (
    <>
      {loading === "pending" ? (
        <div className="col-[1/-1] px-4 flex gap-2">
          <Skeleton className="w-[116px] h-[64px]" />
          <Skeleton className="w-[116px] h-[64px]" />
          <Skeleton className="w-[116px] h-[64px]" />
          <Skeleton className="w-[116px] h-[64px]" />
          <Skeleton className="w-[116px] h-[64px]" />
          <Skeleton className="w-[116px] h-[64px]" />
          <Skeleton className="w-[116px] h-[64px]" />
        </div>
      ) : (
        <>
          {generateWeekDays(new Date(workoutDate), data).map(
            ({ date, isWorkoutDay }) => {
              const today = new Date();
              const formatedDate = formatDate(date);
              const isSelectedDate = workoutDate === formatedDate;
              const isFutureWorkout = isAfter(date, today) && isWorkoutDay;
              const isPastWorkout = isBefore(date, today) && isWorkoutDay;

              return (
                <Link
                  onClick={() => handleDateChange(formatedDate)}
                  aria-label={`${formatDateForScreenReaders(date)}`}
                  to={`/workout/${formatedDate}`}
                  key={date.toISOString()}
                  className={`sm:p-2 rounded-lg hover:bg-contrast hover:text-contrastReversed
              ${isSelectedDate ? "bg-teriary font-bold hover:bg-teriary text-contrastReversed" : "text-contrast"}
              `}
                >
                  <div
                    className={`text-sm ${!isSelectedDate && isPastWorkout ? "bg-quaternary text-white" : ""}
                ${!isSelectedDate && isFutureWorkout ? "bg-quinary text-black" : ""}`}
                  >
                    {format(date, DATE_PATTERN.ABBR3)}
                  </div>
                  <div
                    className={`text-lg ${isSelectedDate ? "text-xl" : "text-contrast"}`}
                  >
                    {format(date, "d")}
                  </div>
                </Link>
              );
            },
          )}
        </>
      )}
    </>
  );
}

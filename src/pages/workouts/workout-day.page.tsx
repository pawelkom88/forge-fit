import { format, isAfter, isBefore } from "date-fns";
import { ArrowLeftCircle, Calendar } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { WeekNavigator } from "@/components/week-navigator.tsx";
import { WorkoutTracker } from "@/components/workout-tracker/workout-tracker.tsx";
import { NutritionTracker } from "@/components/nutrition-tracker.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DateString } from "@/utils/ts-helpers.ts";
import { RoutesConfig } from "@/routing/routes.tsx";
import { DATE_PATTERN } from "@/utils/constants.ts";
import type { Workout } from "@/utils/workoutData.ts";
import React, { useEffect, useRef, useState } from "react";
import {
  formatDateForScreenReaders,
  formatToDateString,
  generateWeekDays,
} from "@/utils/helpers/helpers.ts";
import { Skeleton } from "@/components/ui/skeleton";
import { loadingState, useFetch } from "@/hooks/useFetch.ts";
import { ErrorAlert } from "@/components/alert/Alert.tsx";

// TODO: add skip to main content - id already set to workout
// todo: extract key to variable and reuse ?

export default function WorkoutDayPage() {
  const { workoutDate } = useParams() as { workoutDate: DateString };
  const navigate = useNavigate();

  // State to track the current display date (for week navigation)
  const [displayDate, setDisplayDate] = useState<DateString>(workoutDate);

  const handleWeekChange = (newDate: Date) => {
    const formattedDate = formatToDateString(newDate);
    setDisplayDate(formattedDate);
    navigate(`/workout/${formattedDate}`);
  };

  // remember to remove workout Data as param un useFetch while DB is ready
  const { data, loading, error } = useFetch<Workout>(workoutDate);
  // TODO: what to do with state - move down to tracker - collect all and send to server ? ?
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(data);

  if (error) {
    return <ErrorAlert title="Error" description={error.message} />;
  }

  return (
    <section className="bg-background container mx-auto pt-6  px-4 max-w-4xl">
      <WorkoutDayHeader workoutDate={workoutDate} />
      <WeekNavigator workoutDate={displayDate} onWeekChange={handleWeekChange}>
        <WorkoutDayOverview
          displayDate={displayDate}
          onWeekChange={handleWeekChange}
        />
      </WeekNavigator>
      {loading === loadingState.pending ? (
        <WorkoutDetailsSkeleton />
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
            `${DATE_PATTERN.ABBR4}, ${DATE_PATTERN.FULL_MONTH} ${DATE_PATTERN.DAY}, ${DATE_PATTERN.FULL_YEAR}`,
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
  return (
    <Tabs defaultValue="workout" className="mt-6">
      <TabsList
        className={`grid gap-2 w-full grid-cols-2 bg-purple dark:bg-white text-white dark:text-black`}
      >
        <TabsTrigger id="workout" className="hover:bg-teriary" value="workout">
          Workout
        </TabsTrigger>
        <TabsTrigger className="hover:bg-teriary" value="nutrition">
          Nutrition
        </TabsTrigger>
      </TabsList>
      <TabsContent tabIndex={-1} value="workout">
        {tracker}
      </TabsContent>
      <TabsContent value="nutrition">{nutrition}</TabsContent>
    </Tabs>
  );
}

interface WorkoutDayOverviewProps {
  displayDate: DateString;
  onWeekChange: (newDate: Date) => void;
}

function WorkoutDayOverview({
  displayDate,
  onWeekChange,
}: WorkoutDayOverviewProps) {
  const { data, loading, error } = useFetch<Workout[]>();
  // const { workoutDate } = useParams() as { workoutDate: DateString };

  // const { setValue } = useLocalStorage("workoutDate", workoutDate);
  //
  // useEffect(() => {
  //   setValue(workoutDate);
  // }, [workoutDate, setValue]);

  return (
    <>
      {error && <p>{error.message}</p>}
      {loading === loadingState.pending ? (
        <WorkoutDayOverviewSkeleton />
      ) : (
        <>
          {generateWeekDays(new Date(displayDate), data).map(
            ({ date, isWorkoutDay }) => {
              const today = new Date();
              const formatedDate = formatToDateString(date);
              const isSelectedDate = displayDate === formatedDate;
              const isFutureWorkout = isAfter(date, today) && isWorkoutDay;
              const isPastWorkout = isBefore(date, today) && isWorkoutDay;

              return (
                <button
                  onMouseEnter={
                    isWorkoutDay ? () => console.log("hover") : () => {}
                  }
                  key={date.toISOString()}
                  aria-label={`${formatDateForScreenReaders(date)}`}
                  onClick={() => onWeekChange(date)}
                  className={`sm:p-2 rounded-lg hover:bg-contrast hover:text-contrastReversed
                  ${isSelectedDate ? "bg-teriary font-bold hover:bg-teriary text-contrastReversed" : "text-contrast"}
              `}
                >
                  <abbr
                    className={`block text-sm ${!isSelectedDate && isPastWorkout ? "bg-quaternary text-white" : ""}
                    ${!isSelectedDate && isFutureWorkout ? "bg-quinary text-black" : ""}`}
                  >
                    {format(date, DATE_PATTERN.ABBR3)}
                  </abbr>
                  <div className="text-lg">{format(date, "d")}</div>
                </button>
              );
            },
          )}
        </>
      )}
    </>
  );
}

function WorkoutDayOverviewSkeleton() {
  return (
    <div className="col-[1/-1] px-4 flex gap-2">
      <Skeleton className="w-[116px] h-[64px]" />
      <Skeleton className="w-[116px] h-[64px]" />
      <Skeleton className="w-[116px] h-[64px]" />
      <Skeleton className="w-[116px] h-[64px]" />
      <Skeleton className="w-[116px] h-[64px]" />
      <Skeleton className="w-[116px] h-[64px]" />
      <Skeleton className="w-[116px] h-[64px]" />
    </div>
  );
}

function WorkoutDetailsSkeleton() {
  return (
    <div className="px-2">
      <Skeleton className="w-full h-[36px] mt-6" />
      <Skeleton className="w-full h-[226px] my-2" />
    </div>
  );
}

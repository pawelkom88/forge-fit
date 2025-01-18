import { format } from "date-fns";
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
import { Link, useLoaderData, useParams } from "react-router-dom";
import { DateString } from "@/utils/ts-helpers.ts";
import { useTheme } from "@/components/theme-provider.tsx";
import { RoutesConfig } from "@/routing/routes.tsx";
import { DATE_PATTERN } from "@/utils/constants.ts";
import type { Workout } from "@/utils/workoutData.ts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import {
  generateWeekAroundDate,
  WeekDayWithWorkoutStatus,
} from "@/utils/helpers.ts";

// TODO: add skip to main content - id already set to workout
// todo: extract key to variable and reuse ?

export default function WorkoutDayPage() {
  // const headingRef = useRef<HTMLHeadingElement>(null);
  const workouts = useLoaderData() as Workout[];

  const { workoutDate } = useParams() as { workoutDate: DateString };

  const { setValue } = useLocalStorage("workoutDate", workoutDate);

  const [weekAround, setWeekAround] = useState<WeekDayWithWorkoutStatus[]>(() =>
    generateWeekAroundDate(new Date(workoutDate), workouts),
  );
  const [workout, setWorkout] = useState<Workout | null>(null);

  const handleDateChange = useCallback(
    (newDate: string) => {
      const workoutDetails = workouts.find(({ date }) => {
        const formatedWorkoutDate = format(date, DATE_PATTERN.YYYY_MM_DD);
        return newDate === formatedWorkoutDate;
      });

      setWorkout(workoutDetails ?? null);
      setValue(workoutDate);
    },
    [workouts],
  );

  return (
    <section className="bg-background container mx-auto pt-6  px-4 max-w-4xl">
      <WorkoutDayHeader workoutDate={workoutDate} />
      <WeekNavigator
        // workouts={workouts}
        workoutDate={workoutDate}
        weekAround={weekAround}
        // setWeekAround={setWeekAround}
        onDateChange={handleDateChange}
      />
      <WorkoutDayNavigation
        tracker={<WorkoutTracker workout={workout} setWorkout={setWorkout} />}
        nutrition={<NutritionTracker />}
      />
    </section>
  );
}

interface WorkoutDayHeaderProps {
  workoutDate: DateString;
}

function WorkoutDayHeader({ workoutDate }: WorkoutDayHeaderProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    document.title = `Workout page for ${workoutDate}`;
    // setValue(workoutDate);
  }, []);

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

function WorkoutDayNavigation({
  tracker,
  nutrition,
}: WorkoutDayNavigationProps) {
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

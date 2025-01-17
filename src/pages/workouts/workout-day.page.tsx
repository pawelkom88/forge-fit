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
import { useEffect, useRef } from "react";

export default function WorkoutDayPage() {
  const { isLightTheme } = useTheme();
  const workout = useLoaderData() as Workout;
  const { workoutDate } = useParams() as { workoutDate: DateString };
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    localStorage.setItem("workoutDate", workoutDate);
  }, [workoutDate]);

  // TODO: add skip to main content - id already set to workout

  useEffect(() => {
    headingRef.current?.focus();
    document.title = `Workout page for ${workoutDate}`;
  }, []);

  return (
    <section className="bg-background container mx-auto pt-6  px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold">
            {/*// TODO: add to config*/}
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
      <WeekNavigator workoutDate={workoutDate} />
      <Tabs defaultValue="workout" className="mt-6">
        <TabsList
          className={`grid gap-2 w-full grid-cols-2 ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"}`}
        >
          <TabsTrigger
            id="workout"
            className="hover:bg-teriary"
            value="workout"
          >
            Workout
          </TabsTrigger>
          <TabsTrigger className="hover:bg-teriary" value="nutrition">
            Nutrition
          </TabsTrigger>
        </TabsList>
        <TabsContent value="workout">
          <WorkoutTracker workoutDetails={workout} />
        </TabsContent>
        <TabsContent value="nutrition">
          <NutritionTracker />
        </TabsContent>
      </Tabs>
    </section>
  );
}

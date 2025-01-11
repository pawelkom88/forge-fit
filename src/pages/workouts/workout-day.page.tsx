import { format, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { WeekNavigator } from "@/components/week-navigator.tsx";
import { WorkoutTracker } from "@/components/workout-tracker.tsx";
import { NutritionTracker } from "@/components/nutrition-tracker.tsx";
import { useLoaderData, useParams } from "react-router-dom";
import { DateString } from "@/utils/ts-helpers.ts";
import { useTheme } from "@/components/theme-provider.tsx";

export default function WorkoutDayPage() {
  const { isLightTheme } = useTheme();
  const data = useLoaderData();
  const { workoutDate } = useParams() as { workoutDate: DateString };

  return (
    <section className="bg-background container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h1 className="text-2xl font-bold">
            {/*// TODO: add to config*/}
            {format(workoutDate, "EEEE, MMMM d")}
          </h1>
        </div>
      </div>
      <WeekNavigator workoutDate={workoutDate} />
      <Tabs defaultValue="workout" className="mt-6">
        <TabsList
          className={`grid w-full grid-cols-2 ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"} `}
        >
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>
        <TabsContent value="workout">
          <WorkoutTracker />
        </TabsContent>
        <TabsContent value="nutrition">
          <NutritionTracker />
        </TabsContent>
      </Tabs>
    </section>
  );
}

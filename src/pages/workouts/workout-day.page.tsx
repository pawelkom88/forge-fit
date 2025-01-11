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
import { useParams } from "react-router";
import { useLoaderData } from "react-router-dom";

interface WorkoutDayPageProps {
  params: {
    date: string; // Format: YYYY-MM-DD
  };
}

export default function WorkoutDayPage() {
  const data = useLoaderData();
  console.log(data);

  const params = useParams();

  console.log(params);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            {/*{format(workoutDate, "EEEE, MMMM d")}*/}
          </h1>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/*<WeekNavigator currentDate={workoutDate} />*/}

      <Tabs defaultValue="workout" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>
        <TabsContent value="workout" className="mt-4">
          <WorkoutTracker />
        </TabsContent>
        <TabsContent value="nutrition" className="mt-4">
          <NutritionTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}

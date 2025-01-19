import Calendar from "@/components/calendar/Calendar.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export default function App() {
  return (
    <div className="max-w-screen-2xl mx-auto flex h-screen bg-foreground">
      <main className="bg-background flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex gap-2">
          <div className="mb-2 flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold">Workout Calendar</h1>
          </div>
          <Button
            size="icon"
            className="bg-accent focus-visible:bg-focusVisible hover:bg-contrast hover:text-contrastReversed transition-colors duration-200"
            variant="outline"
            aria-label="user settings"
          >
            <SettingsIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <ModeToggle />
        </div>
        <p className="my-2">Track your gym sessions and nutrition</p>
        <Calendar />
      </main>
    </div>
  );
}

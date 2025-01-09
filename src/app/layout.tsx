import Calendar from "@/components/Calendar.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export default function App() {
  return (
    <div className="flex h-screen bg-foreground">
      <main className="bg-background flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex gap-2">
          <div className="mb-4 sm:mb-6 flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-textContrast">
              Workout Calendar
            </h1>
            <p className="text-textContrast mt-2">
              Track your gym sessions and nutrition
            </p>
          </div>
          <Button variant="outline" aria-label="user settings">
            <SettingsIcon className="text-black" size={32} />
          </Button>
          <ModeToggle />
        </div>
        <Calendar />
      </main>
    </div>
  );
}

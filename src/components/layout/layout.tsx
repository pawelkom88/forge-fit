import { Calendar } from "@/components/calendar/Calendar.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RoutesConfig } from "@/routing/routes.tsx";

export default function App() {
  return (
    <div className="max-w-screen-2xl mx-auto flex h-screen bg-foreground">
      <main className="bg-background flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex gap-2">
          <div className="mb-2 flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold">Workout Calendar</h1>
          </div>
          <Link
            data-test-id="user-profile-link"
            to={`${RoutesConfig.userProfile.path}`}
            className="h-9 w-9 flex items-center justify-center rounded border border-input shadow-sm
            hover:bg-contrast hover:text-contrastReversed bg-accent focus-visible:bg-focusVisible transition-colors duration-200"
            aria-label="user profile page"
          >
            <SettingsIcon size={18} aria-hidden="true" />
          </Link>
          <ModeToggle />
        </div>
        <p className="my-2">Track your gym sessions and nutrition</p>
        <Calendar />
      </main>
    </div>
  );
}

import Main from "@/components/layout/main.tsx";
import Calendar from "@/components/Calendar.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Main>
            <div className="flex">
                <div className="mb-4 sm:mb-6 flex-grow">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Workout Calendar</h1>
                    <p className="text-gray-600 mt-2">Track your gym sessions and nutrition</p>
                </div>
                <ModeToggle />
            </div>
            <Calendar />
        </Main>
        </ThemeProvider>
    )
}

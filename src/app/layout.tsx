import Main from "@/components/layout/main.tsx";
import Calendar from "@/components/Calendar.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import useMediaQuery from "@/hooks/useMediaQuery.ts";

export default function App() {
  const matches = useMediaQuery("(max-width:1024px)");

  return (
    <Main>
      <div className="flex">
        <div className="mb-4 sm:mb-6 flex-grow">
          <h1 className="text-2xl sm:text-3xl font-bold text-textContrast">
            Workout Calendar
          </h1>
          <p className="text-textContrast mt-2">
            Track your gym sessions and nutrition
          </p>
        </div>
        {!matches && <ModeToggle />}
      </div>
      <Calendar />
    </Main>
  );
}

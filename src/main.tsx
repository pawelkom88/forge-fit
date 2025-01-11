import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/layout.tsx";
import {
  THEME_CONFIG,
  ThemeProvider,
  UI_THEME,
} from "@/components/theme-provider.tsx";
import "@fontsource/prompt";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "@/pages/error/error-page.tsx";
import WorkoutDayPage from "@/pages/workouts/workout-day.page.tsx";

const RoutesConfig = {
  root: {
    path: "/",
    // element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  app: {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  workout: {
    path: "/workout/:workoutDate",
    element: <WorkoutDayPage />,
  },
};

const router = createBrowserRouter([
  {
    path: RoutesConfig.root.path,
    element: RoutesConfig.root.element,
    errorElement: RoutesConfig.root.errorElement,
  },
  {
    path: RoutesConfig.app.path,
    element: RoutesConfig.app.element,
  },
  {
    path: RoutesConfig.workout.path,
    element: RoutesConfig.workout.element,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEME_CONFIG.dark} storageKey={UI_THEME}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);

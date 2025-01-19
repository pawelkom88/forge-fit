import { ErrorPage } from "@/pages/error/error-page.tsx";
import App from "@/app/layout.tsx";
import WorkoutDayPage from "@/pages/workouts/workout-day.page.tsx";
import { createBrowserRouter } from "react-router-dom";

export const RoutesConfig = {
  root: {
    path: "/",
    element: <div>xxx</div>,
    // element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  app: {
    path: "app",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  workout: {
    path: "workout/:workoutDate",
    element: <WorkoutDayPage />,
  },
};

export const router = createBrowserRouter([
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

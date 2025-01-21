import { ErrorPage } from "@/pages/error/error-page.tsx";
import App from "@/components/layout/layout.tsx";
import WorkoutDayPage from "@/pages/workouts/workout-day.page.tsx";
import { createBrowserRouter } from "react-router-dom";
import { UserProfilePage } from "@/pages/user-profile/user-profile.page.tsx";

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
    children: [],
  },
  workout: {
    path: "workout/:workoutDate",
    element: <WorkoutDayPage />,
  },
  userProfile: {
    path: "/user-profile",
    element: <UserProfilePage />,
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
  {
    path: RoutesConfig.userProfile.path,
    element: RoutesConfig.userProfile.element,
  },
]);

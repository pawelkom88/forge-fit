import { useEffect, useRef, useState } from "react";
import { workouts } from "@/utils/workoutData.ts";
import { workoutDetailsLoader } from "@/routing/data-loaders.tsx";

// Define generic Data and LoadingState types if not already defined
type Data<T> = {
  data: T | null;
  loading: LoadingState;
  error: Error | null;
};

export const loadingState = {
  idle: "idle",
  pending: "pending",
  complete: "complete",
} as const;

type LoadingState = keyof typeof loadingState;

export const useFetch = <T>(url?: string): Data<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>(loadingState.idle);
  const [error, setError] = useState<Error | null>(null);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (controller.current) {
        controller.current.abort();
      }
      controller.current = new AbortController();
      setLoading(loadingState.pending);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a delay
        const fetchedData = url ? workoutDetailsLoader(url) : workouts;
        //@ts-expect-error test
        setData(fetchedData);
        setLoading(loadingState.complete);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error);
            setLoading(loadingState.idle);
          }
        }
      }
    };

    fetchData();

    return () => {
      controller.current?.abort();
    };
  }, [url]); // Dependency array includes url

  return { data, loading, error };
};

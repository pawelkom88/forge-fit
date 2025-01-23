import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  THEME_CONFIG,
  ThemeProvider,
  UI_THEME,
} from "@/components/theme-provider.tsx";
// @ts-expect-error font-import
import "@fontsource/prompt";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routing/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEME_CONFIG.dark} storageKey={UI_THEME}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);

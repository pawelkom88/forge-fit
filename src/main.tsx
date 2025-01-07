import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/layout.tsx";
import {
  THEME_CONFIG,
  ThemeProvider,
  UI_THEME,
} from "@/components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEME_CONFIG.dark} storageKey={UI_THEME}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);

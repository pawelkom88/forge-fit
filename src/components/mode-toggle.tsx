import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_CONFIG, useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-test-id="mode-toggle"
          aria-label="Toggle theme"
          className="bg-accent focus-visible:bg-focusVisible hover:bg-contrast hover:text-contrastReversed transition-colors duration-200"
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(THEME_CONFIG).map(([key, value]) => {
          const themeName = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <DropdownMenuItem
              className="cursor-pointer hover:bg-contrast"
              key={key}
              onClick={() => setTheme(value)}
            >
              {themeName}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

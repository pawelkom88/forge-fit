import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React from "react";
import type { Meal } from "../../../types/nutrition.ts";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useTheme } from "@/components/theme-provider.tsx";

interface Props {
  onMealSet: React.Dispatch<React.SetStateAction<Meal>>;
  newMeal: Meal;
}

export function AddNewMealForm({ newMeal, onMealSet }: Props) {
  const { isLightTheme } = useTheme();
  return (
    <>
      <Label htmlFor="meal-name">Meal Name</Label>
      <Input
        id="meal-name"
        value={newMeal.name}
        onChange={(e) =>
          onMealSet((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="e.g., Breakfast"
      />
      <Button
        // onClick={addMeal}
        className={`w-full ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"} `}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Meal
      </Button>
    </>
  );
}

import { Card, CardContent } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import type { DailyNutrition } from "../../../types/nutrition.ts";

interface Props {
  nutrition: DailyNutrition;
}

export function MacrosCard({ nutrition }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <MacroProgress
            label="Calories"
            current={nutrition.current.calories}
            target={nutrition.target.calories}
            unit="kcal"
          />
          <MacroProgress
            label="Protein"
            current={nutrition.current.protein}
            target={nutrition.target.protein}
            unit="g"
          />
          <MacroProgress
            label="Carbs"
            current={nutrition.current.carbs}
            target={nutrition.target.carbs}
            unit="g"
          />
          <MacroProgress
            label="Fat"
            current={nutrition.current.fat}
            target={nutrition.target.fat}
            unit="g"
          />
        </CardContent>
      </Card>
    </div>
  );
}

function MacroProgress({
  label,
  current,
  target,
  unit,
}: {
  label: string;
  current: number;
  target: number;
  unit: string;
}) {
  const progress = (current / target) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>
          {current}/{target} {unit}
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
}

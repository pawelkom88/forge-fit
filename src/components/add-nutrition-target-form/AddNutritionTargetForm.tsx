import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useTheme } from "@/components/theme-provider.tsx";

export function AddNutritionTargetForm() {
  const { isLightTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`w-full bg-teriary text-white ${isLightTheme ? "hover:bg-primary " : "hover:bg-white hover:text-black"} focus-visible:bg-focusVisible`}
        >
          <Settings aria-hidden="true" className="mr-2 h-4 w-4" />
          {/*TODO: can be either set or change nutrution targets based on if data is available from DB*/}
          Set/Change Nutrition Targets
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Daily Nutrition Targets</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/*TODO: map over ?*/}
            <Label htmlFor="target-calories" className="text-right">
              Calories
            </Label>
            <Input
              id="target-calories"
              type="number"
              // value={targetValues.calories}
              // onChange={(e) =>
              //   setTargetValues((prev) => ({
              //     ...prev,
              //     calories: Number(e.target.value),
              //   }))
              // }
              className="col-span-3"
              min={1}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target-protein" className="text-right">
              Protein (g)
            </Label>
            <Input
              id="target-protein"
              type="number"
              // value={targetValues.protein}
              // onChange={(e) =>
              //   setTargetValues((prev) => ({
              //     ...prev,
              //     protein: Number(e.target.value),
              //   }))
              // }
              min={1}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target-carbs" className="text-right">
              Carbs (g)
            </Label>
            <Input
              id="target-carbs"
              type="number"
              // value={targetValues.carbs}
              // onChange={(e) =>
              //   setTargetValues((prev) => ({
              //     ...prev,
              //     carbs: Number(e.target.value),
              //   }))
              // }
              className="col-span-3"
              min={1}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target-fat" className="text-right">
              Fat (g)
            </Label>
            <Input
              id="target-fat"
              type="number"
              // value={targetValues.fat}
              // onChange={(e) =>
              //   setTargetValues((prev) => ({
              //     ...prev,
              //     fat: Number(e.target.value),
              //   }))
              // }
              className="col-span-3"
              min={1}
            />
          </div>
        </div>
        {/*TODO: create component: ConfirmBtn*/}
        <Button
          className={`w-full ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"} `}
        >
          Save Targets
        </Button>

        {/*<Button onClick={updateTargets}>Save Targets</Button>*/}
      </DialogContent>
    </Dialog>
  );
}

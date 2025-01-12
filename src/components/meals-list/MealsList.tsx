import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { format } from "date-fns";

export function MealsList() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Today's Meals</h3>
      <Accordion type="single" collapsible className="w-full">
        {[].map((meal, index) => (
          // {nutrition.meals.map((meal, index) => (
          <AccordionItem key={meal.id} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex justify-between items-center w-full">
                <span>{meal.name}</span>
                <span className="text-sm text-gray-500">
                  {format(meal.timestamp, "HH:mm")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {meal.products.map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {product.name} (x{product.quantity})
                    </span>
                    <span>{product.calories * product.quantity} kcal</span>
                  </div>
                ))}
                {/*<div className="pt-2 border-t">*/}
                {/*  <div className="flex justify-between items-center font-medium">*/}
                {/*    <span>Total</span>*/}
                {/*    <span>{calculateMealTotals(meal).calories} kcal</span>*/}
                {/*  </div>*/}
                {/*  <div className="text-sm text-gray-500">*/}
                {/*    <span>P: {calculateMealTotals(meal).macros.protein}g</span>*/}
                {/*    <span className="mx-2">*/}
                {/*      C: {calculateMealTotals(meal).macros.carbs}g*/}
                {/*    </span>*/}
                {/*    <span>F: {calculateMealTotals(meal).macros.fat}g</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

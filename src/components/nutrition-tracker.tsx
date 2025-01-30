// import { useState } from "react";
// import { AddNutritionTargetForm } from "@/components/add-nutrition-target-form/AddNutritionTargetForm.tsx";
// import { MealsList } from "@/components/meals-list/MealsList.tsx";
// import { AddNewProductForm } from "@/components/add-new-product-form/AddNewProductForm.tsx";
// import type {
//   DailyNutrition,
//   Macros,
//   Meal,
//   Product,
// } from "../../types/nutrition.ts";
// import { AddNewMealForm } from "@/components/add-new-meal-form/AddNewMealForm.tsx";
// import { MacrosCard } from "@/components/macros/MacrosCard.tsx";
//
// const INITIAL_STATE: DailyNutrition = {
//   target: {
//     calories: 2000,
//     protein: 180,
//     carbs: 200,
//     fat: 55,
//   },
//   current: {
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fat: 0,
//   },
//   meals: [],
// };

export function NutritionTracker() {
  // const [target, setTarget] = useState<null>(null);
  // const [nutrition, setNutrition] = useState<DailyNutrition>(INITIAL_STATE);
  // const [newMeal, setNewMeal] = useState<Meal>({
  //   id: "",
  //   name: "",
  //   products: [],
  //   timestamp: new Date(),
  // });
  // const [newProduct, setNewProduct] = useState<Product>({
  //   name: "",
  //   quantity: 1,
  //   macros: { protein: 0, carbs: 0, fat: 0 },
  //   calories: 0,
  // });

  // const addProductToMeal = () => {
  //   if (newProduct.name) {
  //     setNewMeal((prev) => ({
  //       ...prev,
  //       products: [...prev.products, newProduct],
  //     }));
  //     setNewProduct({
  //       name: "",
  //       quantity: 1,
  //       macros: { protein: 0, carbs: 0, fat: 0 },
  //       calories: 0,
  //     });
  //   }
  // };

  // const addMeal = () => {
  //   if (newMeal.name && newMeal.products.length > 0) {
  //     const mealWithTotals = calculateMealTotals(newMeal);
  //     setNutrition((prev) => ({
  //       ...prev,
  //       current: {
  //         calories: prev.current.calories + mealWithTotals.calories,
  //         protein: prev.current.protein + mealWithTotals.macros.protein,
  //         carbs: prev.current.carbs + mealWithTotals.macros.carbs,
  //         fat: prev.current.fat + mealWithTotals.macros.fat,
  //       },
  //       meals: [
  //         ...prev.meals,
  //         { ...mealWithTotals, id: Date.now().toString() },
  //       ],
  //     }));
  //     setNewMeal({
  //       id: "",
  //       name: "",
  //       products: [],
  //       timestamp: new Date(),
  //     });
  //   }
  // };

  // const calculateMealTotals = (
  //   meal: Meal,
  // ): Meal & { calories: number; macros: Macros } => {
  //   const totals = meal.products.reduce(
  //     (acc, product) => ({
  //       calories: acc.calories + product.calories * product.quantity,
  //       macros: {
  //         protein:
  //           acc.macros.protein + product.macros.protein * product.quantity,
  //         carbs: acc.macros.carbs + product.macros.carbs * product.quantity,
  //         fat: acc.macros.fat + product.macros.fat * product.quantity,
  //       },
  //     }),
  //     { calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } },
  //   );
  //
  //   return { ...meal, ...totals };
  // };

  {
    /*TODO: how to better handle rendering*/
  }
  return (
    <>
      <h2 className="text-center my-4 text-pretty">
        You have not added any data yet. Click button below to add your
        nutrition targets.
      </h2>
      {/*{target && <MacrosCard nutrition={nutrition} />}*/}
      {/*<AddNutritionTargetForm />*/}
      {/*{target && (*/}
      {/*  <AddNewProductForm*/}
      {/*    newProduct={newProduct}*/}
      {/*    addProductToMeal={addProductToMeal}*/}
      {/*    newMeal={newMeal}*/}
      {/*    onSetNewProduct={setNewProduct}*/}
      {/*  >*/}
      {/*    <AddNewMealForm newMeal={newMeal} onMealSet={setNewMeal} />*/}
      {/*  </AddNewProductForm>*/}
      {/*)}*/}
      {/*{target && <MealsList />}*/}
    </>
  );
}

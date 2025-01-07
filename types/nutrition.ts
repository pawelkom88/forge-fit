export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Product {
  name: string;
  quantity: number;
  macros: Macros;
  calories: number;
}

export interface Meal {
  id: string;
  name: string;
  products: Product[];
  timestamp: Date;
}

export interface DailyNutrition {
  target: Macros & { calories: number };
  current: Macros & { calories: number };
  meals: Meal[];
}


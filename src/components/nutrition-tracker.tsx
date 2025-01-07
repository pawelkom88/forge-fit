import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DailyNutrition, Meal, Product, Macros } from '@/types/nutrition'

const INITIAL_STATE: DailyNutrition = {
  target: {
    calories: 2000,
    protein: 180,
    carbs: 200,
    fat: 55,
  },
  current: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  meals: [],
}

export function NutritionTracker() {
  const [nutrition, setNutrition] = useState<DailyNutrition>(INITIAL_STATE)
  const [newMeal, setNewMeal] = useState<Meal>({
    id: '',
    name: '',
    products: [],
    timestamp: new Date(),
  })
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    quantity: 1,
    macros: { protein: 0, carbs: 0, fat: 0 },
    calories: 0,
  })

  const addProductToMeal = () => {
    if (newProduct.name) {
      setNewMeal(prev => ({
        ...prev,
        products: [...prev.products, newProduct],
      }))
      setNewProduct({
        name: '',
        quantity: 1,
        macros: { protein: 0, carbs: 0, fat: 0 },
        calories: 0,
      })
    }
  }

  const addMeal = () => {
    if (newMeal.name && newMeal.products.length > 0) {
      const mealWithTotals = calculateMealTotals(newMeal)
      setNutrition(prev => ({
        ...prev,
        current: {
          calories: prev.current.calories + mealWithTotals.calories,
          protein: prev.current.protein + mealWithTotals.macros.protein,
          carbs: prev.current.carbs + mealWithTotals.macros.carbs,
          fat: prev.current.fat + mealWithTotals.macros.fat,
        },
        meals: [...prev.meals, { ...mealWithTotals, id: Date.now().toString() }],
      }))
      setNewMeal({
        id: '',
        name: '',
        products: [],
        timestamp: new Date(),
      })
    }
  }

  const calculateMealTotals = (meal: Meal): Meal & { calories: number, macros: Macros } => {
    const totals = meal.products.reduce((acc, product) => ({
      calories: acc.calories + product.calories * product.quantity,
      macros: {
        protein: acc.macros.protein + product.macros.protein * product.quantity,
        carbs: acc.macros.carbs + product.macros.carbs * product.quantity,
        fat: acc.macros.fat + product.macros.fat * product.quantity,
      },
    }), { calories: 0, macros: { protein: 0, carbs: 0, fat: 0 } })

    return { ...meal, ...totals }
  }

  return (
    <div className="space-y-6">
      {/* Macros Progress Section */}
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

      {/* Add Meal Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Add New Meal</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                value={newMeal.name}
                onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Breakfast"
              />
            </div>
            <div className="space-y-2">
              <Label>Add Product</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Chicken Breast"
                  />
                </div>
                <div>
                  <Label htmlFor="product-quantity">Quantity</Label>
                  <Input
                    id="product-quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <Label htmlFor="product-protein">Protein (g)</Label>
                  <Input
                    id="product-protein"
                    type="number"
                    value={newProduct.macros.protein}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, macros: { ...prev.macros, protein: Number(e.target.value) } }))}
                    placeholder="e.g., 20"
                  />
                </div>
                <div>
                  <Label htmlFor="product-carbs">Carbs (g)</Label>
                  <Input
                    id="product-carbs"
                    type="number"
                    value={newProduct.macros.carbs}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, macros: { ...prev.macros, carbs: Number(e.target.value) } }))}
                    placeholder="e.g., 0"
                  />
                </div>
                <div>
                  <Label htmlFor="product-fat">Fat (g)</Label>
                  <Input
                    id="product-fat"
                    type="number"
                    value={newProduct.macros.fat}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, macros: { ...prev.macros, fat: Number(e.target.value) } }))}
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <Label htmlFor="product-calories">Calories</Label>
                  <Input
                    id="product-calories"
                    type="number"
                    value={newProduct.calories}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, calories: Number(e.target.value) }))}
                    placeholder="e.g., 165"
                  />
                </div>
              </div>
              <Button onClick={addProductToMeal} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
            {newMeal.products.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Products in this meal:</h4>
                <ul className="list-disc list-inside">
                  {newMeal.products.map((product, index) => (
                    <li key={index}>
                      {product.name} (x{product.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button onClick={addMeal} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meals List Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Today's Meals</h3>
        <Accordion type="single" collapsible className="w-full">
          {nutrition.meals.map((meal, index) => (
            <AccordionItem key={meal.id} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex justify-between items-center w-full">
                  <span>{meal.name}</span>
                  <span className="text-sm text-gray-500">{format(meal.timestamp, 'HH:mm')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {meal.products.map((product, productIndex) => (
                    <div key={productIndex} className="flex justify-between items-center">
                      <span>{product.name} (x{product.quantity})</span>
                      <span>{product.calories * product.quantity} kcal</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span>{calculateMealTotals(meal).calories} kcal</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>P: {calculateMealTotals(meal).macros.protein}g</span>
                      <span className="mx-2">C: {calculateMealTotals(meal).macros.carbs}g</span>
                      <span>F: {calculateMealTotals(meal).macros.fat}g</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

function MacroProgress({ label, current, target, unit }: { label: string; current: number; target: number; unit: string }) {
  const progress = (current / target) * 100
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
  )
}


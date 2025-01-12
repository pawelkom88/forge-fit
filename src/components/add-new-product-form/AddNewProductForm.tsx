import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import type { Product, Meal } from "../../../types/nutrition.ts";
import React from "react";
import { useTheme } from "@/components/theme-provider.tsx";

interface Props extends React.PropsWithChildren {
  newMeal: Meal;
  addProductToMeal: React.Dispatch<React.SetStateAction<Meal>>;
  newProduct: Product;
  onSetNewProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export function AddNewProductForm({
  children,
  onSetNewProduct,
  newProduct,
  addProductToMeal,
  newMeal,
}: Props) {
  const { isLightTheme } = useTheme();

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Meal</h3>
        <div className="space-y-4">
          {children}
          <div className="space-y-2">
            <Label>Add Product</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={newProduct.name}
                  onChange={(e) =>
                    onSetNewProduct((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="e.g., Chicken Breast"
                />
              </div>
              <div>
                <Label htmlFor="product-quantity">Quantity</Label>
                <Input
                  id="product-quantity"
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    onSetNewProduct((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }))
                  }
                  placeholder="e.g., 100"
                />
              </div>
              <div>
                <Label htmlFor="product-protein">Protein (g)</Label>
                <Input
                  id="product-protein"
                  type="number"
                  value={newProduct.macros.protein}
                  onChange={(e) =>
                    onSetNewProduct((prev) => ({
                      ...prev,
                      macros: {
                        ...prev.macros,
                        protein: Number(e.target.value),
                      },
                    }))
                  }
                  placeholder="e.g., 20"
                />
              </div>
              <div>
                <Label htmlFor="product-carbs">Carbs (g)</Label>
                <Input
                  id="product-carbs"
                  type="number"
                  value={newProduct.macros.carbs}
                  onChange={(e) =>
                    onSetNewProduct((prev) => ({
                      ...prev,
                      macros: {
                        ...prev.macros,
                        carbs: Number(e.target.value),
                      },
                    }))
                  }
                  placeholder="e.g., 0"
                />
              </div>
              <div>
                <Label htmlFor="product-fat">Fat (g)</Label>
                <Input
                  id="product-fat"
                  type="number"
                  value={newProduct.macros.fat}
                  onChange={(e) =>
                    onSetNewProduct((prev) => ({
                      ...prev,
                      macros: {
                        ...prev.macros,
                        fat: Number(e.target.value),
                      },
                    }))
                  }
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <Label htmlFor="product-calories">Calories</Label>
                <Input
                  id="product-calories"
                  type="number"
                  value={newProduct.calories}
                  onChange={(e) =>
                    onSetNewProduct((prev) => ({
                      ...prev,
                      calories: Number(e.target.value),
                    }))
                  }
                  placeholder="e.g., 165"
                />
              </div>
            </div>
            <Button
              onClick={addProductToMeal}
              className={`w-full ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"}`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
          {newMeal.products.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Products in this meal:</h4>
              {/*// swap with <menu tag ?*/}
              <ul className="list-disc list-inside">
                {newMeal.products.map((product, index) => (
                  <li key={index}>
                    {product.name} (x{product.quantity})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/*<Button*/}
          {/*  onClick={addMeal}*/}
          {/*  className={`w-full ${isLightTheme ? "bg-purple" : "bg-white"} ${isLightTheme ? "text-white" : "text-black"} `}*/}
          {/*>*/}
          {/*  <Plus className="mr-2 h-4 w-4" />*/}
          {/*  Add Meal*/}
          {/*</Button>*/}
        </div>
      </CardContent>
    </Card>
  );
}

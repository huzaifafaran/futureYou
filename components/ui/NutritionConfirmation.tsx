"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { Input } from "./input"

interface Item {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
}

export function NutritionConfirmation({
  items,
  ambiguityReason,
  onConfirm,
  onCancel
}: {
  items: Item[];
  ambiguityReason?: string;
  onConfirm: (confirmedItems: Item[]) => void;
  onCancel: () => void;
}) {
  const [editableItems, setEditableItems] = React.useState(items);

  const handleQuantityChange = (index: number, newQty: number) => {
    setEditableItems(prev => prev.map((item, i) => {
      if (i === index) {
        const ratio = newQty / (item.quantity || 1); // Avoid division by zero
        return {
          ...item,
          quantity: newQty,
          calories: Math.round((item.calories || 0) * ratio) || item.calories || 0,
          protein: Math.round((item.protein || 0) * ratio) || item.protein || 0
        };
      }
      return item;
    }));
  }

  return (
    <Card className="my-4 border-yellow-500/50 bg-[var(--color-paper-2)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-[var(--color-ink)]">Review Extraction</CardTitle>
        {ambiguityReason && <p className="text-sm text-yellow-500">{ambiguityReason}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        {editableItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="font-medium flex-1 text-[var(--color-ink)]">{item.name}</span>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                className="w-20 h-10" 
                value={item.quantity || ''} 
                onChange={e => handleQuantityChange(index, Number(e.target.value))}
              />
              <span className="text-sm text-[var(--color-ink-2)] w-12">{item.unit}</span>
            </div>
            <div className="text-right text-sm text-[var(--color-ink-2)] w-24">
              {item.calories || 0} kcal
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-3 border-t border-[var(--color-rule)]">
        <Button variant="ghost" onClick={onCancel} className="h-10 text-sm">Cancel</Button>
        <Button variant="primary" onClick={() => onConfirm(editableItems)} className="h-10 text-sm">Confirm</Button>
      </CardFooter>
    </Card>
  )
}

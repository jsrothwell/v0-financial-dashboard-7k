"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { getCategoryIcon } from "@/lib/budget-utils"

interface BudgetCategory {
  category: string
  budgeted: number
  spent: number
  percentage: number
  status: "good" | "warning" | "over"
  transactionCount: number
  averageTransaction: number
}

interface BudgetCategoryCardProps {
  categories: BudgetCategory[]
}

export function BudgetCategoryCard({ categories }: BudgetCategoryCardProps) {
  const getStatusColor = (status: "good" | "warning" | "over") => {
    switch (status) {
      case "good":
        return "bg-emerald-100 text-emerald-700"
      case "warning":
        return "bg-amber-100 text-amber-700"
      case "over":
        return "bg-red-100 text-red-700"
    }
  }

  const getProgressColor = (status: "good" | "warning" | "over") => {
    switch (status) {
      case "good":
        return "bg-emerald-500"
      case "warning":
        return "bg-amber-500"
      case "over":
        return "bg-red-500"
    }
  }

  if (categories.length === 0) {
    return (
      <Card className="bg-white border-slate-200 mb-8">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Budget by Category</CardTitle>
          <CardDescription>No budgets set yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-600 mb-4">Set your first budget to get started tracking your spending</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-slate-200 mb-8">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Budget by Category</CardTitle>
        <CardDescription>Your spending across categories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category.category} className="space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(category.category)}</span>
                <div>
                  <p className="font-semibold text-slate-900">{category.category}</p>
                  <p className="text-xs text-slate-500">{category.transactionCount} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  ${category.spent.toFixed(2)} / ${category.budgeted.toFixed(2)}
                </p>
                <p className={`text-sm font-bold ${getStatusColor(category.status)}`}>{category.percentage}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getProgressColor(category.status)}`}
                    style={{ width: `${Math.min(category.percentage, 100)}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 w-8 text-right">{category.percentage}%</span>
            </div>

            {/* Details */}
            <div className="flex gap-4 text-xs text-slate-600 px-1">
              <span>Avg: ${category.averageTransaction.toFixed(2)}</span>
              {category.spent > category.budgeted && (
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  Over by ${(category.spent - category.budgeted).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

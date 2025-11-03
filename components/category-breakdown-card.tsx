"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useState } from "react"

interface CategoryBreakdownProps {
  data: Array<{ category: string; amount: number; percentage: number; color: string; transactionCount: number }>
  totalSpending: number
}

export function CategoryBreakdownCard({ data, totalSpending }: CategoryBreakdownProps) {
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year">("month")

  const topCategories = data.slice(0, 5)
  const otherAmount = data.slice(5).reduce((sum, item) => sum + item.amount, 0)

  const chartData =
    otherAmount > 0
      ? [
          ...topCategories,
          {
            category: "Other",
            amount: otherAmount,
            percentage: Math.round((otherAmount / totalSpending) * 100),
            color: "#6B7280",
          },
        ]
      : topCategories

  return (
    <Card className="bg-white border-slate-200 mb-8">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-lg text-slate-900">Category Breakdown</CardTitle>
            <CardDescription>Your spending by category</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("month")}
              className={timeRange === "month" ? "bg-teal-600 text-white" : "border-slate-300"}
            >
              This Month
            </Button>
            <Button
              variant={timeRange === "quarter" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("quarter")}
              className={timeRange === "quarter" ? "bg-teal-600 text-white" : "border-slate-300"}
            >
              Last 3M
            </Button>
            <Button
              variant={timeRange === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("year")}
              className={timeRange === "year" ? "bg-teal-600 text-white" : "border-slate-300"}
            >
              Last Year
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="amount"
                  isAnimationActive={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend & Details */}
          <div>
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Total Spending</p>
              <p className="text-4xl font-bold text-slate-900">${totalSpending.toLocaleString()}</p>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.category}</p>
                      <p className="text-xs text-slate-500">{item.transactionCount} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">${item.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-600">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

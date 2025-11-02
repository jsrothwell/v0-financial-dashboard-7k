"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

interface IncomeVsExpensesProps {
  income: number
  expenses: number
  netChange: number
  savingsRate: number
  incomeChange: number
  expenseChange: number
}

export function IncomeVsExpensesCard({
  income,
  expenses,
  netChange,
  savingsRate,
  incomeChange,
  expenseChange,
}: IncomeVsExpensesProps) {
  const chartData = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ]

  const maxValue = Math.max(income, expenses)

  return (
    <Card className="bg-white border-slate-200 mb-8">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Income vs Expenses</CardTitle>
        <CardDescription>This month's financial overview</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              formatter={(value) => `$${(value as number).toLocaleString()}`}
            />
            <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]}>
              <Cell fill="#10B981" />
              <Cell fill="#EF4444" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Income</p>
            <p className="text-2xl font-bold text-green-900">${income.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2">
              {incomeChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${incomeChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {incomeChange >= 0 ? "+" : ""}
                {incomeChange}%
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-200">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Expenses</p>
            <p className="text-2xl font-bold text-red-900">${expenses.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2">
              {expenseChange <= 0 ? (
                <TrendingDown className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${expenseChange <= 0 ? "text-green-600" : "text-red-600"}`}>
                {expenseChange >= 0 ? "+" : ""}
                {expenseChange}%
              </span>
            </div>
          </div>

          <div
            className={`rounded-lg p-4 border ${netChange >= 0 ? "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200" : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"}`}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: netChange >= 0 ? "#134e4a" : "#92400e" }}
            >
              Net Change
            </p>
            <p className={`text-2xl font-bold ${netChange >= 0 ? "text-teal-900" : "text-orange-900"}`}>
              {netChange >= 0 ? "+" : "-"}${Math.abs(netChange).toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Savings Rate</p>
            <p className="text-2xl font-bold text-blue-900">{savingsRate}%</p>
            <p className="text-xs text-blue-600 mt-2">{savingsRate >= 20 ? "Healthy" : "Build up savings"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

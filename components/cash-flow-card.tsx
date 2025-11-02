"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { AlertCircle } from "lucide-react"

interface CashFlowData {
  day: string
  balance: number
}

interface CashFlowCardProps {
  projectedData: CashFlowData[]
  currentBalance: number
  projectedEndBalance: number
  nextIncome?: { date: string; amount: number }
  nextExpense?: { date: string; amount: number }
  lowBalanceWarning?: boolean
}

export function CashFlowCard({
  projectedData,
  currentBalance,
  projectedEndBalance,
  nextIncome,
  nextExpense,
  lowBalanceWarning,
}: CashFlowCardProps) {
  const netChange = projectedEndBalance - currentBalance

  return (
    <Card className="bg-white border-slate-200 mb-8">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Cash Flow Projection</CardTitle>
        <CardDescription>Next 30 days balance forecast</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={projectedData} margin={{ top: 10, right: 10, left: -20, bottom: 50 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
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
            <ReferenceLine
              y={currentBalance}
              stroke="#94a3b8"
              strokeDasharray="5 5"
              label={{ value: "Current Balance", fill: "#64748b", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#0891b2"
              fillOpacity={1}
              fill="url(#colorBalance)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Current Balance</p>
            <p className="text-3xl font-bold text-slate-900">${currentBalance.toLocaleString()}</p>
          </div>

          <div
            className={`rounded-lg p-4 border ${netChange >= 0 ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" : "bg-gradient-to-br from-red-50 to-rose-50 border-red-200"}`}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: netChange >= 0 ? "#166534" : "#7c2d12" }}
            >
              Projected End-of-Month
            </p>
            <p className={`text-3xl font-bold ${netChange >= 0 ? "text-green-900" : "text-red-900"}`}>
              ${projectedEndBalance.toLocaleString()}
            </p>
            <p className={`text-xs mt-2 font-semibold ${netChange >= 0 ? "text-green-700" : "text-red-700"}`}>
              {netChange >= 0 ? "+" : ""}
              {netChange >= 0 ? netChange.toLocaleString() : "-" + Math.abs(netChange).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nextIncome && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Next Income</p>
              <p className="text-lg font-bold text-green-900 mb-1">${nextIncome.amount.toLocaleString()}</p>
              <p className="text-xs text-green-700">{new Date(nextIncome.date).toLocaleDateString()}</p>
            </div>
          )}

          {nextExpense && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">Next Expense</p>
              <p className="text-lg font-bold text-orange-900 mb-1">-${nextExpense.amount.toLocaleString()}</p>
              <p className="text-xs text-orange-700">{new Date(nextExpense.date).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Warning */}
        {lowBalanceWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 text-sm">Low Balance Warning</p>
              <p className="text-sm text-amber-800 mt-1">
                Your balance will drop significantly mid-month. Consider adjusting your spending.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

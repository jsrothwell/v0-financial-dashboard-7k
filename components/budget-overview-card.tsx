"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react"
import Link from "next/link"

interface BudgetOverviewProps {
  totalBudget: number
  totalSpent: number
  percentage: number
  status: "on-track" | "warning" | "over"
  daysRemaining: number
  onAdjust?: () => void
}

export function BudgetOverviewCard({
  totalBudget,
  totalSpent,
  percentage,
  status,
  daysRemaining,
  onAdjust,
}: BudgetOverviewProps) {
  const remaining = totalBudget - totalSpent

  const getStatusIcon = () => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="w-12 h-12 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="w-12 h-12 text-amber-500" />
      case "over":
        return <AlertCircle className="w-12 h-12 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "on-track":
        return "On Track"
      case "warning":
        return "Approaching Limit"
      case "over":
        return "Over Budget"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "on-track":
        return "text-emerald-600"
      case "warning":
        return "text-amber-600"
      case "over":
        return "text-red-600"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-shadow mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-900">Monthly Budget Summary</CardTitle>
        <CardDescription className="text-slate-600">Track your spending against your budget</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon()}
            <div>
              <p className={`text-2xl font-bold ${getStatusColor()}`}>{getStatusText()}</p>
              <p className="text-sm text-slate-600">{percentage}% of budget used</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{daysRemaining} days left</p>
            <p className="text-xs text-slate-600">in this month</p>
          </div>
        </div>

        {/* Budget Numbers */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Total Budget</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Total Spent</p>
            <p className="text-2xl font-bold text-red-600 mt-2">${totalSpent.toLocaleString()}</p>
          </div>
          <div
            className={`rounded-lg p-4 border ${remaining >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
          >
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Remaining</p>
            <p className={`text-2xl font-bold mt-2 ${remaining >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-slate-700">Budget Progress</p>
            <p className="text-sm font-semibold text-slate-900">{percentage}%</p>
          </div>
          <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                status === "on-track" ? "bg-emerald-500" : status === "warning" ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 pt-2">
          <Link href="/settings?tab=budget" className="flex-1">
            <Button
              variant="outline"
              className="w-full gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent"
            >
              View Full Budget
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          {onAdjust && (
            <Button onClick={onAdjust} className="flex-1 gap-2 bg-teal-600 hover:bg-teal-700 text-white">
              Adjust Budget
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

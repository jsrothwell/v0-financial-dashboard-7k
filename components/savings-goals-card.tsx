"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, TrendingUp } from "lucide-react"

interface SavingsGoal {
  id: string
  name: string
  current: number
  target: number
  percentage: number
  status: "on-track" | "behind" | "ahead"
  monthsRemaining: number
  targetDate: string
  projectedDate: string
  monthlyContribution: number
}

interface SavingsGoalsCardProps {
  goals: SavingsGoal[]
}

export function SavingsGoalsCard({ goals }: SavingsGoalsCardProps) {
  const getStatusColor = (status: "on-track" | "behind" | "ahead") => {
    switch (status) {
      case "on-track":
        return "bg-blue-100 text-blue-800"
      case "behind":
        return "bg-orange-100 text-orange-800"
      case "ahead":
        return "bg-green-100 text-green-800"
    }
  }

  const getStatusLabel = (status: "on-track" | "behind" | "ahead") => {
    switch (status) {
      case "on-track":
        return "On Track"
      case "behind":
        return "Behind Schedule"
      case "ahead":
        return "Ahead of Pace"
    }
  }

  const getProgressColor = (status: "on-track" | "behind" | "ahead") => {
    switch (status) {
      case "on-track":
        return "bg-blue-500"
      case "behind":
        return "bg-orange-500"
      case "ahead":
        return "bg-green-500"
    }
  }

  return (
    <Card className="bg-white border-slate-200 mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-900">Savings Goals</CardTitle>
            <CardDescription>Track your financial goals</CardDescription>
          </div>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Goal
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 mb-4">Set your first savings goal to get started</p>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Create Savings Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const remaining = goal.target - goal.current
              return (
                <div
                  key={goal.id}
                  className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{goal.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(goal.status)}>{getStatusLabel(goal.status)}</Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Progress</p>
                        <p className="text-xs text-slate-600">
                          ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{goal.percentage}%</p>
                    </div>
                    <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(goal.status)}`}
                        style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-white rounded p-2">
                      <p className="text-slate-600 font-semibold mb-1">Remaining</p>
                      <p className="font-bold text-slate-900">${remaining.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="text-slate-600 font-semibold mb-1">Monthly Need</p>
                      <p className="font-bold text-slate-900">
                        ${Math.round((remaining / Math.max(goal.monthsRemaining, 1)) * 100) / 100}
                      </p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <p className="text-slate-600 font-semibold mb-1">Your Rate</p>
                      <p className="font-bold text-slate-900">${goal.monthlyContribution}</p>
                    </div>
                  </div>

                  {/* Projection */}
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <p className="text-blue-900">
                        <span className="font-semibold">Projected completion:</span>{" "}
                        {new Date(goal.projectedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useState, useMemo } from "react"

interface SpendingTrendsProps {
  data: Array<{ month: string; amount: number }>
  averageSpending: number
  trendPercentage: number
  trendDirection: "up" | "down"
  highestMonth: string
}

export function SpendingTrendsCard({
  data,
  averageSpending,
  trendPercentage,
  trendDirection,
  highestMonth,
}: SpendingTrendsProps) {
  const [timeRange, setTimeRange] = useState<"6m" | "1y" | "all">("6m")

  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (timeRange === "all") {
      return data
    }
    const monthsToShow = timeRange === "6m" ? 6 : 12
    return data.slice(-monthsToShow)
  }, [data, timeRange])

  // Calculate stats based on filtered data
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        average: 0,
        highest: { month: "N/A", amount: 0 },
        trend: { percentage: 0, direction: "down" as const },
      }
    }

    const average = filteredData.reduce((sum, item) => sum + item.amount, 0) / filteredData.length
    const highest = filteredData.reduce(
      (max, item) => (item.amount > max.amount ? item : max),
      filteredData[0]
    )

    // Calculate trend (comparing last month to previous month)
    let trend = { percentage: 0, direction: "down" as const }
    if (filteredData.length >= 2) {
      const lastMonth = filteredData[filteredData.length - 1].amount
      const previousMonth = filteredData[filteredData.length - 2].amount
      if (previousMonth > 0) {
        const change = ((lastMonth - previousMonth) / previousMonth) * 100
        trend = {
          percentage: Math.abs(Math.round(change)),
          direction: change > 0 ? ("up" as const) : ("down" as const),
        }
      }
    }

    return { average, highest, trend }
  }, [filteredData])

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "6m":
        return "last 6 months"
      case "1y":
        return "last year"
      case "all":
        return "all time"
    }
  }

  return (
    <Card className="bg-white border-slate-200 mb-8">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-lg text-slate-900">Spending Trends</CardTitle>
            <CardDescription>Your spending over the {getTimeRangeLabel()}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "6m" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("6m")}
              className={timeRange === "6m" ? "bg-teal-600 text-white" : "border-slate-300"}
            >
              6M
            </Button>
            <Button
              variant={timeRange === "1y" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("1y")}
              className={timeRange === "1y" ? "bg-teal-600 text-white" : "border-slate-300"}
            >
              1Y
            </Button>
            <Button
              variant={timeRange === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("all")}
              className={timeRange === "all" ? "bg-teal-600 text-white" : "border-slate-300"}
            >
              All
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Average Monthly</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">${Math.round(stats.average).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">vs Last Month</p>
            <div className="flex items-center gap-2 mt-1">
              {stats.trend.direction === "up" ? (
                <TrendingUp className="w-5 h-5 text-red-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-green-500" />
              )}
              <p
                className={`text-xl font-bold ${stats.trend.direction === "up" ? "text-red-600" : "text-green-600"}`}
              >
                {stats.trend.direction === "up" ? "+" : "-"}
                {stats.trend.percentage}%
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Highest Month</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{stats.highest.month}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-slate-500">
            <p>No spending data available for this time period</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} angle={-45} textAnchor="end" />
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
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#0891b2"
                dot={{ fill: "#0891b2", r: 5 }}
                activeDot={{ r: 7 }}
                strokeWidth={2}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

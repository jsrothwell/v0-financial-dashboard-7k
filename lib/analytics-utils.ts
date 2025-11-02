import type { Transaction } from "./demo-data"

export interface MonthlySpending {
  month: string
  amount: number
  percentage?: number
}

export interface CategorySpending {
  category: string
  amount: number
  percentage: number
  color: string
  transactionCount: number
}

export interface IncomeExpenseData {
  income: number
  expenses: number
  netChange: number
  savingsRate: number
}

export interface BillData {
  id: string
  name: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue"
  daysUntil: number
  category: string
}

export interface SavingsGoal {
  id: string
  name: string
  current: number
  target: number
  targetDate: string
  monthlyContribution: number
  percentage: number
  status: "on-track" | "behind" | "ahead"
  monthsRemaining: number
  projectedDate: string
}

const categoryColors: Record<string, string> = {
  Housing: "#3B82F6",
  Rent: "#3B82F6",
  "Food & Dining": "#10B981",
  Groceries: "#10B981",
  Transportation: "#F59E0B",
  Entertainment: "#8B5CF6",
  Shopping: "#EC4899",
  Utilities: "#6366F1",
  Healthcare: "#EF4444",
  Dining: "#FCD34D",
  "Uber Ride": "#F59E0B",
  Other: "#6B7280",
}

export function getCategoryColor(category: string): string {
  return categoryColors[category] || "#9CA3AF"
}

export function getMonthlySpendingTrends(transactions: Transaction[], months = 6): MonthlySpending[] {
  const now = new Date()
  const trends: MonthlySpending[] = []

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthStr = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })

    const monthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date)
      return tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear()
    })

    const amount = Math.abs(monthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))

    trends.push({
      month: monthStr,
      amount: Math.round(amount * 100) / 100,
    })
  }

  return trends
}

export function getCategoryBreakdown(transactions: Transaction[]): CategorySpending[] {
  const categoryMap = new Map<string, { amount: number; count: number }>()

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const existing = categoryMap.get(t.category) || { amount: 0, count: 0 }
      categoryMap.set(t.category, {
        amount: existing.amount + Math.abs(t.amount),
        count: existing.count + 1,
      })
    })

  const total = Array.from(categoryMap.values()).reduce((sum, v) => sum + v.amount, 0)

  return Array.from(categoryMap.entries())
    .map(([category, { amount, count }]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: getCategoryColor(category),
      transactionCount: count,
    }))
    .sort((a, b) => b.amount - a.amount)
}

export function getIncomeExpenseData(transactions: Transaction[]): IncomeExpenseData {
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const expenses = Math.abs(transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))
  const netChange = income - expenses
  const savingsRate = income > 0 ? Math.round((netChange / income) * 100) : 0

  return {
    income: Math.round(income * 100) / 100,
    expenses: Math.round(expenses * 100) / 100,
    netChange: Math.round(netChange * 100) / 100,
    savingsRate,
  }
}

export function getTrendPercentage(
  current: number,
  previous: number,
): { percentage: number; direction: "up" | "down" } {
  if (previous === 0) return { percentage: 0, direction: "up" }
  const percentage = Math.round(Math.abs(((current - previous) / previous) * 100))
  return {
    percentage,
    direction: current > previous ? "up" : "down",
  }
}

export function generateSavingsGoals(): SavingsGoal[] {
  const now = new Date()
  const goals = [
    {
      id: "1",
      name: "House Down Payment",
      current: 7500,
      target: 10000,
      targetDate: "2026-06-30",
      monthlyContribution: 357,
    },
    {
      id: "2",
      name: "Emergency Fund",
      current: 4200,
      target: 6000,
      targetDate: "2026-03-31",
      monthlyContribution: 300,
    },
    {
      id: "3",
      name: "Vacation",
      current: 850,
      target: 2000,
      targetDate: "2025-12-31",
      monthlyContribution: 383,
    },
  ]

  return goals.map((goal) => {
    const targetDate = new Date(goal.targetDate)
    const monthsRemaining =
      (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth())
    const percentage = Math.round((goal.current / goal.target) * 100)

    const requiredRate = (goal.target - goal.current) / Math.max(monthsRemaining, 1)
    let status: "on-track" | "behind" | "ahead" = "on-track"
    if (goal.monthlyContribution < requiredRate) status = "behind"
    else if (goal.monthlyContribution > requiredRate) status = "ahead"

    const remainingNeeded = goal.target - goal.current
    const projectedMonths = remainingNeeded / Math.max(goal.monthlyContribution, 1)
    const projectedDate = new Date(now.getFullYear(), now.getMonth() + projectedMonths, 1).toISOString().split("T")[0]

    return {
      ...goal,
      percentage,
      status,
      monthsRemaining: Math.max(monthsRemaining, 0),
      projectedDate,
    }
  })
}

export function generateUpcomingBills(): BillData[] {
  const now = new Date()
  const bills = [
    { name: "Netflix", dueDate: "2025-11-05", amount: 15.99, category: "Entertainment" },
    { name: "Rent", dueDate: "2025-11-08", amount: 1200, category: "Housing" },
    { name: "Internet", dueDate: "2025-11-12", amount: 79.99, category: "Utilities" },
    { name: "Car Insurance", dueDate: "2025-11-15", amount: 145, category: "Other" },
    { name: "Gym Membership", dueDate: "2025-11-20", amount: 49.99, category: "Entertainment" },
  ]

  return bills
    .map((bill) => {
      const dueDate = new Date(bill.dueDate)
      const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      let status: "paid" | "pending" | "overdue" = "pending"
      if (daysUntil < 0) status = "overdue"

      return {
        id: Math.random().toString(36).substr(2, 9),
        ...bill,
        dueDate: bill.dueDate,
        daysUntil: Math.max(daysUntil, 0),
        status,
      }
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
}

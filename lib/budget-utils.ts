export interface BudgetSummary {
  category: string
  budgeted: number
  spent: number
  remaining: number
  percentage: number
  status: "good" | "warning" | "over"
  transactionCount: number
  averageTransaction: number
  lastMonthSpent?: number
}

export function calculateBudgetSpent(category: string, transactions: any[]): number {
  return Math.abs(
    transactions.filter((t) => t.category === category && t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
  )
}

export function getBudgetSummaries(budgets: any[], transactions: any[]): BudgetSummary[] {
  return budgets
    .map((budget) => {
      const spent = calculateBudgetSpent(budget.category, transactions)
      const remaining = budget.limit - spent
      const percentage = (spent / budget.limit) * 100
      let status: "good" | "warning" | "over" = "good"

      if (percentage >= 100) {
        status = "over"
      } else if (percentage >= 75) {
        status = "warning"
      }

      const categoryTransactions = transactions.filter((t) => t.category === budget.category && t.type === "expense")
      const averageTransaction = categoryTransactions.length > 0 ? spent / categoryTransactions.length : 0

      return {
        category: budget.category,
        budgeted: budget.limit,
        spent,
        remaining,
        percentage: Math.round(percentage),
        status,
        transactionCount: categoryTransactions.length,
        averageTransaction: Math.round(averageTransaction * 100) / 100,
      }
    })
    .sort((a, b) => {
      if (a.status === "over" && b.status !== "over") return -1
      if (a.status !== "over" && b.status === "over") return 1
      if (a.status === "warning" && b.status === "good") return -1
      if (a.status === "good" && b.status === "warning") return 1
      return 0
    })
}

export function getMonthlyBudgetStatus(budgets: any[], transactions: any[]) {
  const totalBudget = budgets.filter((b) => b.enabled).reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = Math.abs(transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))
  const remaining = totalBudget - totalSpent
  const percentage = (totalSpent / totalBudget) * 100

  let status: "on-track" | "warning" | "over" = "on-track"
  if (percentage >= 100) {
    status = "over"
  } else if (percentage >= 75) {
    status = "warning"
  }

  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysRemaining = daysInMonth - now.getDate()

  return {
    totalBudget,
    totalSpent,
    remaining,
    percentage: Math.round(percentage),
    status,
    daysRemaining,
    daysInMonth,
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Housing: "🏠",
    "Food & Dining": "🍽️",
    Transportation: "🚗",
    Entertainment: "🎬",
    Shopping: "🛍️",
    Utilities: "⚡",
    Healthcare: "🏥",
    Other: "📦",
    Rent: "🏠",
    Groceries: "🛒",
    Dining: "🍕",
    Travel: "✈️",
    Entertainment: "🎮",
  }
  return icons[category] || "💰"
}

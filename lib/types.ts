export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
}

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  frequency: "one-time" | "weekly" | "monthly" | "yearly"
  category: string
  paid: boolean
}

export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate?: string
  description?: string
}

export interface BudgetData {
  totalBudget: number
  spent: number
}

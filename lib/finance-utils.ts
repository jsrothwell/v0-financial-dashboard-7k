import type { Transaction, Bill } from "./types"

export const formatCurrency = (amount: number, currency = "USD"): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    CAD: "C$",
    EUR: "€",
    GBP: "£",
  }
  const symbol = symbols[currency] || "$"
  return `${symbol}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export const calculateBudgetStats = (transactions: Transaction[], targetBudget: number) => {
  const spent = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const safeToSpend = Math.max(0, targetBudget - spent)
  const status = spent > targetBudget ? "over" : spent > targetBudget * 0.8 ? "warning" : "safe"

  return {
    spent,
    safeToSpend,
    status,
  }
}

export const calculateTotalBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((total, t) => {
    return t.type === "income" ? total + t.amount : total - t.amount
  }, 0)
}

export const getTotalIncome = (transactions: Transaction[]): number => {
  return transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
}

export const getTotalExpenses = (transactions: Transaction[]): number => {
  return transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
}

export const getUpcomingBills = (bills: Bill[]): Bill[] => {
  return bills.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 5)
}

export const calculateSavingsProgress = (current: number, target: number): number => {
  if (target <= 0) return 0
  return Math.min(100, (current / target) * 100)
}

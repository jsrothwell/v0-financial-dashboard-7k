"use client"

import { useState } from "react"
import { useSettings } from "@/lib/use-settings"
import { DEMO_TRANSACTIONS, DEMO_BUDGETS } from "@/lib/demo-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Plus } from "lucide-react"
import { AddTransactionModal } from "./add-transaction-modal"
import { DashboardHeader } from "./dashboard-header"
import { DashboardFooter } from "./dashboard-footer"
import { DemoModeBanner } from "./demo-mode-banner"
import { getBudgetSummaries, getMonthlyBudgetStatus } from "@/lib/budget-utils"
import { BudgetOverviewCard } from "./budget-overview-card"
import { BudgetCategoryCard } from "./budget-category-card"
import { useBudget } from "@/lib/budget-context"

const spendingData = [
  { category: "Groceries", value: 450, percentage: 80 },
  { category: "Transport", value: 220, percentage: 42 },
  { category: "Entertainment", value: 110, percentage: 22 },
  { category: "Utilities", value: 85, percentage: 15 },
  { category: "Dining", value: 50, percentage: 8 },
]

const transactionData = [
  { id: 1, merchant: "Amazon Purchase", category: "Shopping", amount: -150.0, date: "2023-10-01" },
  { id: 2, merchant: "Uber Ride", category: "Transport", amount: -30.0, date: "2023-10-02" },
  { id: 3, merchant: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "2023-10-03" },
  { id: 4, merchant: "Starbucks Coffee", category: "Dining", amount: -5.0, date: "2023-10-04" },
  { id: 5, merchant: "Grocery Store", category: "Groceries", amount: -200.0, date: "2023-10-05" },
]

const categoryBudgets = [
  { category: "Groceries", spent: 450, budget: 500 },
  { category: "Transport", spent: 220, budget: 300 },
  { category: "Entertainment", spent: 110, budget: 200 },
  { category: "Utilities", spent: 85, budget: 150 },
  { category: "Dining", spent: 50, budget: 200 },
]

export function FinancialDashboard() {
  const { settings } = useSettings()
  const { budgetSettings } = useBudget()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sourceTransactions = settings.useDemoData ? DEMO_TRANSACTIONS : []
  const sourceBudgets = settings.useDemoData ? DEMO_BUDGETS : []

  const [transactions, setTransactions] = useState(sourceTransactions)

  const enabledBudgets = budgetSettings.budgets.filter((b) => b.enabled)
  const budgetStatus = getMonthlyBudgetStatus(enabledBudgets, transactions)
  const budgetSummaries = getBudgetSummaries(enabledBudgets, transactions)

  const totalBalance = settings.useDemoData ? 20080.95 : 12400
  const lastMonthBalance = settings.useDemoData ? 18200 : 11236
  const percentChange = settings.useDemoData ? 10.3 : 10.7
  const monthlySpent = Math.abs(transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))

  const spendingData =
    sourceBudgets.length > 0
      ? sourceBudgets.map((b) => ({ category: b.category, percentage: (b.spent / b.limit) * 100 }))
      : []

  const categoryBudgets = sourceBudgets.length > 0 ? sourceBudgets : []

  const handleAddTransaction = (transaction: any) => {
    setTransactions([
      {
        id: Math.random().toString(36).substr(2, 9),
        ...transaction,
        date: new Date().toISOString().split("T")[0],
        type: transaction.amount < 0 ? "expense" : "income",
      },
      ...transactions,
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <DashboardHeader />
      {settings.useDemoData && <DemoModeBanner />}

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Financial Overview</h2>
            <p className="text-slate-600 mt-2">Track your spending and manage your budget</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total Balance Card */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between pb-3">
                <div>
                  <CardTitle className="text-lg text-slate-900">Total Balance</CardTitle>
                  <CardDescription className="text-slate-600">Account balance</CardDescription>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                  <span className="text-slate-400">⋮</span>
                </button>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-slate-900 mb-2">${(totalBalance / 1000).toFixed(1)}k</div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{percentChange}% last mo</span>
                  </div>
                </div>

                {/* Mini Bar Chart */}
                {categoryBudgets.length > 0 && (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={categoryBudgets} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="category" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <Bar dataKey="spent" fill="#0891b2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* This Month's Spending */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between pb-3">
                <div>
                  <CardTitle className="text-lg text-slate-900">This Month's Spending</CardTitle>
                  <CardDescription className="text-slate-600">By category</CardDescription>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                  <span className="text-slate-400">⋮</span>
                </button>
              </CardHeader>
              <CardContent>
                {spendingData.length > 0 && (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={spendingData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis
                        dataKey="category"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        label={{ value: "%", angle: 90, position: "insideLeft" }}
                      />
                      <Tooltip
                        formatter={(value) => `${value.toFixed(1)}%`}
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#f1f5f9",
                        }}
                      />
                      <Bar dataKey="percentage" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Budget Overview Card */}
          {enabledBudgets.length > 0 && (
            <BudgetOverviewCard
              totalBudget={budgetStatus.totalBudget}
              totalSpent={budgetStatus.totalSpent}
              percentage={budgetStatus.percentage}
              status={budgetStatus.status}
              daysRemaining={budgetStatus.daysRemaining}
            />
          )}

          {/* Budget by Category Card */}
          {enabledBudgets.length > 0 && <BudgetCategoryCard categories={budgetSummaries} />}

          {/* Budget Progress */}
          {categoryBudgets.length > 0 && (
            <Card className="mb-8 bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Budget Status</CardTitle>
                <CardDescription>Spending vs budget by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryBudgets.map((item) => {
                  const percentage = (item.spent / item.limit) * 100
                  const isOverBudget = item.spent > item.limit

                  return (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900">{item.category}</span>
                        <div className="flex gap-2 items-center">
                          <span className={`text-sm font-semibold ${isOverBudget ? "text-red-600" : "text-slate-900"}`}>
                            ${item.spent}
                          </span>
                          <span className="text-sm text-slate-500">/ ${item.limit}</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isOverBudget ? "bg-red-500" : "bg-teal-500"}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Recent Transactions */}
          <Card className="bg-white border-slate-200 mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">Recent Transactions</CardTitle>
                <CardDescription>Your latest activity</CardDescription>
              </div>
              <Button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 10).map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-slate-900 font-medium">{transaction.description}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                              {transaction.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600">{transaction.date}</td>
                          <td
                            className={`py-3 px-4 text-sm font-semibold text-right ${transaction.type === "expense" ? "text-red-600" : "text-green-600"}`}
                          >
                            {transaction.type === "expense" ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600">No transactions yet. Add one to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <DashboardFooter />

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddTransaction} />
    </div>
  )
}

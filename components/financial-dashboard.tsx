"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Plus } from "lucide-react"
import { AddTransactionModal } from "./add-transaction-modal"

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState(transactionData)

  const totalBalance = 12400
  const lastMonthBalance = 11236
  const percentChange = 10.7
  const monthlySpent = Math.abs(transactions.reduce((sum, t) => sum + t.amount, 0))

  const handleAddTransaction = (transaction: any) => {
    setTransactions([
      { id: transactions.length + 1, ...transaction, date: new Date().toISOString().split("T")[0] },
      ...transactions,
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FT</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">FinTrack</h1>
        </div>
        <p className="text-slate-600">Personal Finance Dashboard</p>
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
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={categoryBudgets} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Bar dataKey="spent" fill="#0891b2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
                  formatter={(value) => `${value}%`}
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#f1f5f9" }}
                />
                <Bar dataKey="percentage" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="mb-8 bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Budget Status</CardTitle>
          <CardDescription>Spending vs budget by category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryBudgets.map((item) => {
            const percentage = (item.spent / item.budget) * 100
            const isOverBudget = item.spent > item.budget

            return (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900">{item.category}</span>
                  <div className="flex gap-2 items-center">
                    <span className={`text-sm font-semibold ${isOverBudget ? "text-red-600" : "text-slate-900"}`}>
                      ${item.spent}
                    </span>
                    <span className="text-sm text-slate-500">/ ${item.budget}</span>
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

      {/* Recent Transactions */}
      <Card className="bg-white border-slate-200">
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Merchant</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-900 font-medium">{transaction.merchant}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                        {transaction.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{transaction.date}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-right text-red-600">
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddTransaction} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Plus, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AddIncomeModal } from "./add-income-modal"
import { AddBillModal } from "./add-bill-modal"
import { AddSavingsGoalModal } from "./add-savings-goal-modal"
import {
  formatCurrency,
  calculateTotalBalance,
  getTotalIncome,
  getTotalExpenses,
  calculateSavingsProgress,
} from "@/lib/finance-utils"
import type { Transaction, Bill, SavingsGoal } from "@/lib/types"

export function FinancialDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [bills, setBills] = useState<Bill[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [incomeModalOpen, setIncomeModalOpen] = useState(false)
  const [billModalOpen, setBillModalOpen] = useState(false)
  const [goalModalOpen, setGoalModalOpen] = useState(false)

  const totalBalance = calculateTotalBalance(transactions)
  const totalIncome = getTotalIncome(transactions)
  const totalExpenses = getTotalExpenses(transactions)
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

  const handleAddIncome = (data: {
    amount: number
    description: string
    date: string
    category: string
  }) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(),
      type: "income",
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date,
    }
    setTransactions([...transactions, newTransaction])
  }

  const handleAddBill = (data: {
    name: string
    amount: number
    dueDate: string
    frequency: string
    category: string
    paid: boolean
  }) => {
    const newBill: Bill = {
      id: Math.random().toString(),
      name: data.name,
      amount: data.amount,
      dueDate: data.dueDate,
      frequency: data.frequency,
      category: data.category,
      paid: data.paid,
    }
    setBills([...bills, newBill])

    if (!data.paid) {
      const newTransaction: Transaction = {
        id: Math.random().toString(),
        type: "expense",
        amount: data.amount,
        description: data.name,
        category: data.category,
        date: data.dueDate,
      }
      setTransactions([...transactions, newTransaction])
    }
  }

  const handleAddGoal = (data: {
    name: string
    targetAmount: number
    currentAmount: number
    targetDate?: string
    description?: string
  }) => {
    const newGoal: SavingsGoal = {
      id: Math.random().toString(),
      ...data,
    }
    setSavingsGoals([...savingsGoals, newGoal])
  }

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financial Overview</h1>
        <p className="text-slate-600">Manage your finances and track your goals</p>
      </div>

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-teal-600">{formatCurrency(totalBalance)}</div>
          <p className="text-sm text-slate-600 mt-2">
            Income: {formatCurrency(totalIncome)} • Expenses: {formatCurrency(totalExpenses)}
          </p>
        </CardContent>
      </Card>

      {/* Income vs Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Income</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
            <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => setIncomeModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Income
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
            <div className="text-xs text-slate-600">Savings Rate: {savingsRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Savings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-teal-600">{formatCurrency(totalIncome - totalExpenses)}</div>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </CardContent>
        </Card>
      </div>

      {/* Bills Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Upcoming Bills</CardTitle>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => setBillModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Bill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {bills.length === 0 ? (
            <p className="text-slate-500">No bills added yet</p>
          ) : (
            <div className="space-y-3">
              {bills.map((bill) => (
                <div key={bill.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{bill.name}</p>
                    <p className="text-xs text-slate-600">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{formatCurrency(bill.amount)}</p>
                    <Badge variant={bill.paid ? "default" : "secondary"}>{bill.paid ? "Paid" : "Unpaid"}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Savings Goals Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Savings Goals</CardTitle>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => setGoalModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {savingsGoals.length === 0 ? (
            <p className="text-slate-500">No savings goals yet</p>
          ) : (
            <div className="space-y-4">
              {savingsGoals.map((goal) => {
                const progress = calculateSavingsProgress(goal.currentAmount, goal.targetAmount)
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-slate-900">{goal.name}</p>
                        {goal.targetDate && <p className="text-xs text-slate-600">Target: {goal.targetDate}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                        </p>
                        <p className="text-xs text-slate-600">{progress.toFixed(1)}%</p>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-slate-500">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {[...transactions]
                .reverse()
                .slice(0, 10)
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{transaction.description}</p>
                      <p className="text-xs text-slate-600">{transaction.date}</p>
                    </div>
                    <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AddIncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} onSubmit={handleAddIncome} />
      <AddBillModal open={billModalOpen} onOpenChange={setBillModalOpen} onSubmit={handleAddBill} />
      <AddSavingsGoalModal open={goalModalOpen} onOpenChange={setGoalModalOpen} onSubmit={handleAddGoal} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Check } from "lucide-react"
import { AddBillModal } from "./add-bill-modal"

interface Bill {
  id: string
  name: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue"
  daysUntil: number
  category: string
}

interface UpcomingBillsCardProps {
  bills: Bill[]
  totalDueThisMonth: number
  onAddBill?: (bill: { name: string; amount: number; dueDate: string; category: string; recurring: boolean }) => void
  onMarkPaid?: (billId: string) => void
}

export function UpcomingBillsCard({ bills, totalDueThisMonth, onAddBill, onMarkPaid }: UpcomingBillsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status: "paid" | "pending" | "overdue") => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
    }
  }

  const getStatusLabel = (status: "paid" | "pending" | "overdue") => {
    switch (status) {
      case "paid":
        return "Paid"
      case "pending":
        return "Pending"
      case "overdue":
        return "Overdue"
    }
  }

  const handleAddBill = (bill: {
    name: string
    amount: number
    dueDate: string
    category: string
    recurring: boolean
  }) => {
    if (onAddBill) {
      onAddBill(bill)
    }
  }

  const pendingBills = bills.filter((b) => b.status === "pending" || b.status === "overdue")
  const nextBill = pendingBills[0]

  return (
    <>
      <Card className="bg-white border-slate-200 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-slate-900">Upcoming Bills</CardTitle>
              <CardDescription>Track your scheduled payments</CardDescription>
            </div>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Bill
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Bills This Month</p>
              <p className="text-2xl font-bold text-slate-900">${totalDueThisMonth.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">{bills.length} total bills</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Pending Bills</p>
              <p className="text-2xl font-bold text-slate-900">{pendingBills.length}</p>
              <p className="text-xs text-slate-500 mt-2">Due soon</p>
            </div>

            {nextBill && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Next Bill</p>
                <p className="text-lg font-bold text-blue-900">{nextBill.name}</p>
                <p className="text-xs text-blue-600 mt-2">
                  {nextBill.daysUntil === 0 ? "Due today" : `Due in ${nextBill.daysUntil} days`}
                </p>
              </div>
            )}
          </div>

          {/* Bills List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {bills.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 mb-4">No bills scheduled</p>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Bill
                </Button>
              </div>
            ) : (
              bills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-slate-900">{bill.name}</p>
                      <Badge className={getStatusColor(bill.status)}>{getStatusLabel(bill.status)}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      {bill.status === "paid"
                        ? "Paid"
                        : bill.daysUntil === 0
                          ? "Due today"
                          : `Due in ${bill.daysUntil} days`}{" "}
                      • {new Date(bill.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">${bill.amount.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">{bill.category}</p>
                    </div>
                    {bill.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal-300 text-teal-600 hover:bg-teal-50 bg-transparent"
                        onClick={() => onMarkPaid && onMarkPaid(bill.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <AddBillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddBill} />
    </>
  )
}

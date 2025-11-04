"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface AddBillModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (bill: {
    name: string
    amount: number
    dueDate: string
    category: string
    recurring: boolean
  }) => void
}

export function AddBillModal({ isOpen, onClose, onAdd }: AddBillModalProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [note, setNote] = useState("")

  const categories = [
    "Utilities",
    "Rent/Mortgage",
    "Insurance",
    "Subscriptions",
    "Internet/Phone",
    "Credit Card",
    "Loan",
    "Other",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && amount && dueDate && category) {
      onAdd({
        name,
        amount: Number.parseFloat(amount),
        dueDate,
        category,
        recurring,
      })
      // Reset form
      setName("")
      setAmount("")
      setDueDate("")
      setCategory("")
      setRecurring(false)
      setNote("")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Add Bill</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Form Fields - Scrollable */}
          <div className="overflow-y-auto flex-1 p-6 space-y-4">
            {/* Bill Name */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Bill Name</label>
              <input
                type="text"
                placeholder="e.g., Electric Bill, Netflix, Car Insurance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            {/* Recurring Toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={recurring}
                  onChange={(e) => setRecurring(e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                />
                <div>
                  <span className="text-sm font-medium text-slate-900">Recurring Bill</span>
                  <p className="text-xs text-slate-500">This bill repeats every month</p>
                </div>
              </label>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Note (Optional)</label>
              <textarea
                placeholder="Add any additional information"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400 resize-none h-20"
              />
            </div>

            {/* Preview */}
            {amount && dueDate && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-900 mb-1">Summary</p>
                <p className="text-xs text-blue-700">
                  ${Number.parseFloat(amount).toFixed(2)} due on {new Date(dueDate).toLocaleDateString()}
                  {recurring && " (Monthly)"}
                </p>
              </div>
            )}
          </div>

          {/* Buttons - Fixed at Bottom */}
          <div className="flex gap-3 p-6 border-t border-slate-200 flex-shrink-0">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              Add Bill
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

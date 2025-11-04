"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface AddSavingsGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (goal: {
    name: string
    target: number
    current: number
    targetDate: string
    monthlyContribution: number
  }) => void
}

export function AddSavingsGoalModal({ isOpen, onClose, onAdd }: AddSavingsGoalModalProps) {
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [current, setCurrent] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Goal name is required")
      return
    }

    const targetNum = Number.parseFloat(target)
    const currentNum = Number.parseFloat(current)
    const monthlyNum = Number.parseFloat(monthlyContribution)

    if (isNaN(targetNum) || targetNum <= 0) {
      setError("Target amount must be greater than 0")
      return
    }

    if (isNaN(currentNum) || currentNum < 0) {
      setError("Current amount must be 0 or greater")
      return
    }

    if (currentNum > targetNum) {
      setError("Current amount cannot exceed target amount")
      return
    }

    if (!targetDate) {
      setError("Target date is required")
      return
    }

    if (isNaN(monthlyNum) || monthlyNum < 0) {
      setError("Monthly contribution must be 0 or greater")
      return
    }

    onAdd({
      name: name.trim(),
      target: targetNum,
      current: currentNum,
      targetDate,
      monthlyContribution: monthlyNum,
    })

    setName("")
    setTarget("")
    setCurrent("")
    setTargetDate("")
    setMonthlyContribution("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Add Savings Goal</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Goal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Amount</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="10000"
                step="0.01"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Current Amount</label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="0"
                step="0.01"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Contribution</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="500"
              step="0.01"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              Add Goal
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

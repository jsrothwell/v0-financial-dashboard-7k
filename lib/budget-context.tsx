"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Budget {
  id: string
  category: string
  limit: number
  enabled: boolean
}

export interface BudgetSettings {
  budgets: Budget[]
  notifyAt75: boolean
  notifyAt90: boolean
  notifyOverBudget: boolean
  notificationType: "email" | "in-app" | "both"
}

interface BudgetContextType {
  budgetSettings: BudgetSettings
  updateBudgetSettings: (settings: BudgetSettings) => void
  addBudget: (category: string, limit: number) => void
  removeBudget: (id: string) => void
  updateBudget: (id: string, limit: number) => void
  toggleBudget: (id: string) => void
  applyTemplate: (template: "5030" | "zerobased" | "custom") => void
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

const DEFAULT_BUDGETS: Budget[] = [
  { id: "1", category: "Housing", limit: 1200, enabled: true },
  { id: "2", category: "Food & Dining", limit: 600, enabled: true },
  { id: "3", category: "Transportation", limit: 300, enabled: true },
  { id: "4", category: "Entertainment", limit: 200, enabled: true },
  { id: "5", category: "Shopping", limit: 400, enabled: true },
  { id: "6", category: "Utilities", limit: 200, enabled: true },
  { id: "7", category: "Healthcare", limit: 150, enabled: true },
  { id: "8", category: "Other", limit: 450, enabled: true },
]

const DEFAULT_SETTINGS: BudgetSettings = {
  budgets: DEFAULT_BUDGETS,
  notifyAt75: true,
  notifyAt90: true,
  notifyOverBudget: true,
  notificationType: "in-app",
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgetSettings, setBudgetSettings] = useState<BudgetSettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("budget-settings")
    if (saved) {
      try {
        setBudgetSettings(JSON.parse(saved))
      } catch {
        setBudgetSettings(DEFAULT_SETTINGS)
      }
    }
    setIsLoading(false)
  }, [])

  const updateBudgetSettings = (settings: BudgetSettings) => {
    setBudgetSettings(settings)
    localStorage.setItem("budget-settings", JSON.stringify(settings))
  }

  const addBudget = (category: string, limit: number) => {
    const newBudget: Budget = {
      id: Math.random().toString(36).substr(2, 9),
      category,
      limit,
      enabled: true,
    }
    const updated = { ...budgetSettings, budgets: [...budgetSettings.budgets, newBudget] }
    updateBudgetSettings(updated)
  }

  const removeBudget = (id: string) => {
    const updated = {
      ...budgetSettings,
      budgets: budgetSettings.budgets.filter((b) => b.id !== id),
    }
    updateBudgetSettings(updated)
  }

  const updateBudget = (id: string, limit: number) => {
    const updated = {
      ...budgetSettings,
      budgets: budgetSettings.budgets.map((b) => (b.id === id ? { ...b, limit } : b)),
    }
    updateBudgetSettings(updated)
  }

  const toggleBudget = (id: string) => {
    const updated = {
      ...budgetSettings,
      budgets: budgetSettings.budgets.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b)),
    }
    updateBudgetSettings(updated)
  }

  const applyTemplate = (template: "5030" | "zerobased" | "custom") => {
    let newBudgets = [...DEFAULT_BUDGETS]
    if (template === "5030") {
      newBudgets = [
        { id: "1", category: "Housing", limit: 1750, enabled: true },
        { id: "2", category: "Food & Dining", limit: 525, enabled: true },
        { id: "3", category: "Transportation", limit: 350, enabled: true },
        { id: "4", category: "Entertainment", limit: 175, enabled: true },
        { id: "8", category: "Other", limit: 700, enabled: true },
      ]
    }
    const updated = { ...budgetSettings, budgets: newBudgets }
    updateBudgetSettings(updated)
  }

  return (
    <BudgetContext.Provider
      value={{
        budgetSettings,
        updateBudgetSettings,
        addBudget,
        removeBudget,
        updateBudget,
        toggleBudget,
        applyTemplate,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error("useBudget must be used within BudgetProvider")
  }
  return context
}

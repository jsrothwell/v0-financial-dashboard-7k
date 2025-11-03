"use client"

import { useState } from "react"
import { useBudget } from "@/lib/budget-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus } from "lucide-react"

export function BudgetSettingsPanel() {
  const { budgetSettings, updateBudgetSettings, addBudget, removeBudget, updateBudget, toggleBudget, applyTemplate } =
    useBudget()
  const [newCategory, setNewCategory] = useState("")
  const [newLimit, setNewLimit] = useState("")

  const handleAddBudget = () => {
    if (newCategory && newLimit) {
      addBudget(newCategory, Number.parseFloat(newLimit))
      setNewCategory("")
      setNewLimit("")
    }
  }

  const handleApplyTemplate = (template: "5030" | "zerobased") => {
    applyTemplate(template)
  }

  const totalBudget = budgetSettings.budgets.filter((b) => b.enabled).reduce((sum, b) => sum + b.limit, 0)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Set Monthly Budget by Category</CardTitle>
              <CardDescription>Define your spending limits for each category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Budgets */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {budgetSettings.budgets.map((budget) => (
                  <div
                    key={budget.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <Checkbox
                      checked={budget.enabled}
                      onCheckedChange={() => toggleBudget(budget.id)}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{budget.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">$</span>
                      <Input
                        type="number"
                        value={budget.limit}
                        onChange={(e) => updateBudget(budget.id, Number.parseFloat(e.target.value) || 0)}
                        className="w-24 h-9 text-right"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBudget(budget.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Budget */}
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-slate-900 mb-3">Add Custom Category</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Budget limit"
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    className="w-32"
                  />
                  <Button onClick={handleAddBudget} className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Total Budget */}
              <Alert className="bg-slate-100 border-slate-300 mt-4">
                <AlertDescription className="text-slate-900">
                  <span className="font-semibold">Total Monthly Budget:</span> ${totalBudget.toLocaleString()}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget Templates</CardTitle>
              <CardDescription>Quick start with popular budget allocation methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className="p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleApplyTemplate("5030")}
              >
                <p className="font-semibold text-slate-900">50/30/20 Rule</p>
                <p className="text-sm text-slate-600 mt-1">50% essentials, 30% wants, 20% savings</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleApplyTemplate("5030")
                  }}
                >
                  Apply Template
                </Button>
              </div>

              <div className="p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                <p className="font-semibold text-slate-900">Zero-Based Budgeting</p>
                <p className="text-sm text-slate-600 mt-1">Every dollar has a job - allocate all income</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-transparent"
                  onClick={() => handleApplyTemplate("zerobased")}
                >
                  Apply Template
                </Button>
              </div>

              <div className="p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                <p className="font-semibold text-slate-900">Custom Budget</p>
                <p className="text-sm text-slate-600 mt-1">Create your own unique allocation</p>
                <Button variant="outline" size="sm" className="mt-3 w-full bg-transparent" disabled>
                  Already Using Custom
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alert Preferences</CardTitle>
              <CardDescription>Get notified when you're approaching or exceeding budget limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Alert at 75% of budget</p>
                    <p className="text-sm text-slate-600">Warn before getting close to limit</p>
                  </div>
                  <Checkbox
                    checked={budgetSettings.notifyAt75}
                    onCheckedChange={(checked) =>
                      updateBudgetSettings({ ...budgetSettings, notifyAt75: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Alert at 90% of budget</p>
                    <p className="text-sm text-slate-600">Critical warning before limit</p>
                  </div>
                  <Checkbox
                    checked={budgetSettings.notifyAt90}
                    onCheckedChange={(checked) =>
                      updateBudgetSettings({ ...budgetSettings, notifyAt90: checked as boolean })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">Alert when over budget</p>
                    <p className="text-sm text-slate-600">Notify immediately if limit exceeded</p>
                  </div>
                  <Checkbox
                    checked={budgetSettings.notifyOverBudget}
                    onCheckedChange={(checked) =>
                      updateBudgetSettings({ ...budgetSettings, notifyOverBudget: checked as boolean })
                    }
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="font-semibold text-slate-900 mb-3">Notification Type</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="notification"
                      value="in-app"
                      checked={budgetSettings.notificationType === "in-app"}
                      onChange={() => updateBudgetSettings({ ...budgetSettings, notificationType: "in-app" })}
                      className="rounded"
                    />
                    <label className="text-sm text-slate-900">In-app notifications only</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="notification"
                      value="email"
                      checked={budgetSettings.notificationType === "email"}
                      onChange={() => updateBudgetSettings({ ...budgetSettings, notificationType: "email" })}
                      className="rounded"
                    />
                    <label className="text-sm text-slate-900">Email notifications only</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="notification"
                      value="both"
                      checked={budgetSettings.notificationType === "both"}
                      onChange={() => updateBudgetSettings({ ...budgetSettings, notificationType: "both" })}
                      className="rounded"
                    />
                    <label className="text-sm text-slate-900">Both email and in-app</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

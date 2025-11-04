"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { AlertDialogFooter } from "@/components/ui/alert-dialog"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useSettings } from "@/lib/use-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Trash2, ArrowLeft } from "lucide-react"
import { BudgetSettingsPanel } from "./budget-settings-panel"

export function SettingsPage() {
  const { user, logout } = useAuth()
  const { settings, updateSettings } = useSettings()
  const [savedMessage, setSavedMessage] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the tab from URL query parameter, default to "account" if not present
  const activeTab = searchParams.get("tab") || "account"

  const showSaved = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2000)
  }

  const handleDownloadData = () => {
    const data = {
      user,
      settings,
      exportDate: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `fintrack-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    localStorage.clear()
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>

        {savedMessage && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">Settings saved successfully</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={(value) => router.push(`/settings?tab=${value}`)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="demo">Demo Mode</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Account Settings Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input
                    value={settings.displayName || (user?.displayName ?? "")}
                    onChange={(e) => {
                      updateSettings({ displayName: e.target.value })
                      showSaved()
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input value={user?.email ?? ""} disabled className="bg-gray-100" />
                  <p className="text-xs text-gray-500">Contact support to change email</p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => {
                      updateSettings({ theme: value as "light" | "dark" })
                      showSaved()
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => {
                      updateSettings({ currency: value as "USD" | "EUR" | "GBP" })
                      showSaved()
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) => {
                      updateSettings({ dateFormat: value as "MM/DD/YYYY" | "DD/MM/YYYY" })
                      showSaved()
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value="English">
                    <SelectTrigger disabled>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">More languages coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Settings Tab */}
          <TabsContent value="budget">
            <BudgetSettingsPanel />
          </TabsContent>

          {/* Demo Mode Tab */}
          <TabsContent value="demo">
            <Card>
              <CardHeader>
                <CardTitle>Demo Mode</CardTitle>
                <CardDescription>Explore FinTrack with sample data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between p-4 border rounded-lg bg-blue-50">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Use Sample Data</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Enable to explore the app with pre-populated demo transactions and budgets. Your real data won't
                      be affected.
                    </p>
                  </div>
                  <Switch
                    checked={settings.useDemoData}
                    onCheckedChange={(checked) => {
                      updateSettings({ useDemoData: checked })
                      showSaved()
                    }}
                  />
                </div>

                {settings.useDemoData && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertDescription className="text-amber-800">
                      Demo mode is active. You're viewing sample data with 28 transactions across 3 months and
                      $20,080.95 in total balance.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="text-sm text-gray-600 space-y-2">
                  <p>Demo data includes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>50+ sample transactions spanning 3 months</li>
                    <li>Various spending categories with realistic patterns</li>
                    <li>Income and expense data</li>
                    <li>Budget tracking examples</li>
                    <li>Total net worth around $20,000</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Data Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>Manage your data and account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Download My Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Export all your personal data, settings, and transactions in JSON format.
                    </p>
                    <Button variant="outline" onClick={handleDownloadData} className="gap-2 bg-transparent">
                      <Download size={16} />
                      Download Data
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <a href="/privacy#cookies" className="text-blue-600 hover:underline text-sm">
                      Manage Cookie Preferences
                    </a>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-4">Danger Zone</h3>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-800 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="gap-2">
                          <Trash2 size={16} />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete your account? This action cannot be undone and
                            all your data will be lost.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Delete My Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

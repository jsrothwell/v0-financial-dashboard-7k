"use client"

import { useState, useEffect } from "react"

export interface UserSettings {
  displayName: string
  email: string
  theme: "light" | "dark"
  currency: "USD" | "EUR" | "GBP"
  dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY"
  useDemoData: boolean
  language: string
}

const DEFAULT_SETTINGS: UserSettings = {
  displayName: "",
  email: "",
  theme: "light",
  currency: "USD",
  dateFormat: "MM/DD/YYYY",
  useDemoData: false,
  language: "English",
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("user-settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch {
        setSettings(DEFAULT_SETTINGS)
      }
    }
    setIsLoading(false)
  }, [])

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("user-settings", JSON.stringify(updated))
  }

  return { settings, updateSettings, isLoading }
}

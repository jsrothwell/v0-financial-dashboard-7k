"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useSettings } from "@/lib/use-settings"

export function DemoModeBanner() {
  const { settings } = useSettings()
  const [isDismissed, setIsDismissed] = useState(false)

  if (!settings.useDemoData || isDismissed) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">🎭</span>
          <p className="text-sm">
            <strong>Demo Mode Active</strong> — Viewing sample data. Go to{" "}
            <a href="/settings" className="underline font-semibold hover:text-amber-700">
              Settings
            </a>{" "}
            to use your real data.
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-amber-700 hover:text-amber-900"
          aria-label="Dismiss banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

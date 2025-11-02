"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    } else {
      setIsHidden(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ all: true }))
    setIsVisible(false)
  }

  const handleRejectNonEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true }))
    setIsVisible(false)
  }

  const handleCustomize = () => {
    // In a real app, this would open a modal with cookie preferences
    handleAcceptAll()
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isVisible || isHidden) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link href="/privacy#cookies" className="text-blue-600 hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" size="sm" onClick={handleRejectNonEssential}>
            Reject Non-Essential
          </Button>
          <Button variant="outline" size="sm" onClick={handleCustomize}>
            Customize
          </Button>
          <Button size="sm" onClick={handleAcceptAll}>
            Accept All
          </Button>
        </div>

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 sm:relative text-gray-400 hover:text-gray-600"
          aria-label="Close cookie banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

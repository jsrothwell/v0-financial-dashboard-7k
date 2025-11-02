"use client"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">FinTrack</h1>
        <p className="text-xl text-gray-600">Manage your finances with ease</p>
        <div className="space-x-4">
          <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

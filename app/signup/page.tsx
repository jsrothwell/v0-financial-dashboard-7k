import { SignupForm } from "@/components/signup-form"

export const metadata = {
  title: "Sign Up - FinTrack",
  description: "Create a new FinTrack account",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FinTrack</h1>
          <p className="text-gray-600 mt-2">Join thousands managing their finances</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Sign In - FinTrack",
  description: "Sign in to your FinTrack account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FinTrack</h1>
          <p className="text-gray-600 mt-2">Manage your finances with ease</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

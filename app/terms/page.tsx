import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - FinTrack",
  description: "FinTrack Terms of Service",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-600 text-sm mb-8">Last updated: November 2025</p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Introduction</h2>
            <p className="text-gray-700">
              Welcome to FinTrack. These Terms of Service ("Terms") govern your use of our website and services. By
              accessing and using FinTrack, you agree to be bound by these Terms. If you do not agree with any part of
              these Terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. User Accounts</h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your account credentials and password. You
              agree to accept responsibility for all activities that occur under your account. You must notify us
              immediately of any unauthorized use of your account.
            </p>
            <p className="text-gray-700 mt-2">
              You represent and warrant that the information you provide during registration is accurate, complete, and
              current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Acceptable Use</h2>
            <p className="text-gray-700">
              You agree not to use FinTrack for any unlawful purpose or in any way that could damage, disable, or impair
              our services. Specifically, you agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit viruses, malware, or harmful code</li>
              <li>Engage in any form of harassment or abuse</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
            <p className="text-gray-700">
              All content, features, and functionality of FinTrack, including but not limited to text, graphics, logos,
              and software, are the exclusive property of FinTrack or its content suppliers and are protected by
              international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Disclaimers</h2>
            <p className="text-gray-700">
              FinTrack is provided on an "AS IS" basis without warranties of any kind, either express or implied. We do
              not warrant that our services will be uninterrupted, error-free, or free from viruses or other harmful
              components.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-700">
              In no event shall FinTrack be liable for any indirect, incidental, special, or consequential damages
              arising from your use of our services, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where
              FinTrack is located, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at support@fintrack.com or visit our
              contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

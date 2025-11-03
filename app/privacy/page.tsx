import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - FinTrack",
  description: "FinTrack Privacy Policy (GDPR Compliant)",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 text-sm mb-8">Last updated: November 2025</p>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
          <ul className="space-y-2 text-sm">
            {[
              { id: "collect", label: "Information We Collect" },
              { id: "use", label: "How We Use Your Information" },
              { id: "storage", label: "Data Storage and Security" },
              { id: "rights", label: "Your Rights (GDPR)" },
              { id: "cookies", label: "Cookies and Tracking" },
              { id: "third-party", label: "Third-Party Services" },
              { id: "retention", label: "Data Retention" },
              { id: "contact", label: "Contact Us" },
            ].map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="prose prose-sm max-w-none space-y-6">
          <section id="collect">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
            <p className="text-gray-700">
              We collect information you provide directly, such as when you create an account, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Email address</li>
              <li>Display name</li>
              <li>Account password (hashed)</li>
              <li>Financial transaction data</li>
              <li>Budget preferences</li>
            </ul>
            <p className="text-gray-700 mt-2">
              We also automatically collect information about your device and how you interact with our services,
              including IP address, browser type, and pages visited.
            </p>
          </section>

          <section id="use">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
            <p className="text-gray-700">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your inquiries and requests</li>
              <li>Improve and personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section id="storage">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Storage and Security</h2>
            <p className="text-gray-700">
              Your data is stored on secure servers with industry-standard encryption. We implement multiple security
              measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-gray-700 mt-2">
              While we strive to protect your information, no security system is impenetrable. We cannot guarantee
              absolute security of your data.
            </p>
          </section>

          <section id="rights">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Rights (GDPR)</h2>
            <p className="text-gray-700">
              If you are located in the European Union, you have the following rights under GDPR:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate data</li>
              <li>Right to erasure (right to be forgotten)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Rights related to automated decision making</li>
            </ul>
            <p className="text-gray-700 mt-2">
              To exercise any of these rights, please contact us at privacy@fintrack.com.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cookies and Tracking</h2>
            <p className="text-gray-700">
              We use cookies and similar tracking technologies to enhance your experience. Cookies help us remember your
              preferences and understand how you use our services.
            </p>
            <p className="text-gray-700 mt-2">
              You can control cookie settings through your browser. However, disabling cookies may affect the
              functionality of our services.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
            <p className="text-gray-700">
              We may use third-party service providers for analytics, hosting, and other services. These providers have
              their own privacy policies and may collect information about you. We are not responsible for their privacy
              practices.
            </p>
          </section>

          <section id="retention">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal data for as long as necessary to provide our services and fulfill the purposes
              outlined in this policy. When you delete your account, we will retain transaction data as required by law
              but will remove your personal identifiable information.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              Email: privacy@fintrack.com
              <br />
              Address: FinTrack Inc., Privacy Department
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

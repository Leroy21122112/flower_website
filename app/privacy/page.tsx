import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-8 hover:text-gray-400 transition-colors">
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-gray-300">
          <p>Last updated: April 21, 2025</p>

          <h2 className="text-2xl font-semibold text-white mt-8">1. Introduction</h2>
          <p>
            Welcome to flower.'s Privacy Policy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website, sign up for our newsletter, or interact with us in
            other ways.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">2. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you register for our newsletter,
            express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the
            website, the choices you make, and the products and features you use. The personal information we collect
            may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Contact preferences</li>
            <li>Usage data and analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8">3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To send you marketing and promotional communications</li>
            <li>To inform you about upcoming shows, releases, and merchandise</li>
            <li>To respond to your inquiries and solve any potential issues you might have</li>
            <li>To improve our website and user experience</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8">4. Your Rights</h2>
          <p>
            You have the right to unsubscribe from our marketing communications at any time by clicking the
            "unsubscribe" link in the emails we send, or by contacting us directly.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">Email: privacy@flower.com</p>
        </div>
      </div>
    </div>
  )
}

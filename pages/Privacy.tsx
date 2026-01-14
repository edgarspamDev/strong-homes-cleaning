import { SeoHead } from '../SeoHead';

export default function Privacy() {
  return (
    <>
      <SeoHead />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.18), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300 mb-3">Legal</p>
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg text-slate-100">How we handle your information when you request cleaning services.</p>
        </div>
      </section>

      <div className="bg-[#F8FAFC] py-14 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-6">Last Updated: January 2025</p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Overview</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              StrongHomes Cleaning ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or request cleaning services in Lake County and Porter County, Indiana.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Information We Collect</h2>
            <p className="text-slate-700 leading-relaxed mb-4">When you request a quote or contact us, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Personal Information:</strong> Name, email address, phone number</li>
              <li><strong>Service Information:</strong> ZIP code, home size (bedrooms/bathrooms), service type preference, cleaning frequency</li>
              <li><strong>Communication Data:</strong> Messages you send through our contact form</li>
              <li><strong>Automatic Data:</strong> Browser type, device type, IP address (via standard web server logs)</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Provide you with a cleaning service estimate</li>
              <li>Contact you about your quote via phone, text, or email</li>
              <li>Schedule and deliver cleaning services</li>
              <li>Answer your questions and provide customer support</li>
              <li>Send service reminders or important updates (if you become a customer)</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-6">
              <strong>We do NOT:</strong> Sell your information to third parties, use your data for unrelated marketing, or share your details with anyone outside our cleaning team.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">SMS/Text Message Consent</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              By providing your phone number, you consent to receive calls or text messages from StrongHomes Cleaning about your quote, service scheduling, or appointment reminders. Standard message and data rates may apply. You can opt out at any time by replying STOP to any text message or calling us at (219) 615-9477.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Data Security</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We implement reasonable security measures to protect your personal information, including form validation, rate limiting, and secure transmission protocols. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Data Retention</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We retain your quote information for up to 90 days to follow up on your estimate. If you become a customer, we keep your information as long as necessary to provide services and comply with legal requirements. You may request deletion of your data at any time by contacting us.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Cookies</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We use minimal cookies for essential website functionality (e.g., form rate limiting stored in localStorage). We do not use advertising or tracking cookies.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Your Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Access the personal information we have about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications (we only send service-related messages)</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-6">
              To exercise these rights, contact us at hello@stronghomescleaning.com or (219) 615-9477.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our website after changes indicates acceptance.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-2">
              If you have questions about this Privacy Policy, contact us:
            </p>
            <ul className="list-none space-y-2 text-slate-700 mb-6">
              <li><strong>Phone:</strong> (219) 615-9477</li>
              <li><strong>Email:</strong> hello@stronghomescleaning.com</li>
              <li><strong>Service Area:</strong> Lake & Porter Counties, Indiana</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

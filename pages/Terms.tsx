import { SeoHead } from '../SeoHead';

export default function Terms() {
  return (
    <>
      <SeoHead />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.18), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300 mb-3">Legal</p>
          <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
          <p className="text-lg text-slate-100">Service terms, scheduling, and cancellations for Lake & Porter County cleaning.</p>
        </div>
      </section>

      <div className="bg-[#F8FAFC] py-14 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-6">Last Updated: January 2025</p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Overview</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              These Terms & Conditions govern your use of StrongHomes Cleaning services in Lake County and Porter County, Indiana. By requesting a quote or scheduling service, you agree to these terms.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Estimates & Pricing</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Free Estimates:</strong> All estimates are provided at no cost and include labor and supplies. Estimates are non-binding and subject to adjustment based on actual service conditions.</li>
              <li><strong>Pricing:</strong> Final pricing is confirmed before service begins. Pricing varies based on home size, service type, and cleaning frequency.</li>
              <li><strong>Recurring Discounts:</strong> Weekly, bi-weekly, and monthly recurring services receive discounted rates as shown during quote process.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Scheduling & Arrival</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Confirmation:</strong> We confirm your service date and time after reviewing your estimate. Same-week availability is typical but not guaranteed.</li>
              <li><strong>Arrival Windows:</strong> Crews typically arrive within a 2-hour window. Exact times may vary due to traffic, previous job length, or unforeseen circumstances.</li>
              <li><strong>Service Time:</strong> Standard cleaning takes 2-4 hours; deep cleaning 4-8 hours; move-in/out cleaning 4-10 hours depending on home size and condition.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Cancellations & Rescheduling</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Notice Required:</strong> Please provide at least 24 hours notice to cancel or reschedule a service.</li>
              <li><strong>Late Cancellation:</strong> Cancellations with less than 24 hours notice may incur a cancellation fee.</li>
              <li><strong>Weather/Emergency:</strong> We reserve the right to reschedule due to severe weather or emergency situations. You will be notified as soon as possible.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Supplies & Equipment</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Provided:</strong> We bring all standard cleaning supplies and equipment to each service. No need to provide anything.</li>
              <li><strong>Eco-Friendly Options:</strong> Green, non-toxic cleaning products are available upon request at no additional charge.</li>
              <li><strong>Specialty Products:</strong> If you prefer specific products or brands, you may provide them. Please inform us in advance.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Access & Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Home Access:</strong> You may be present during service or provide secure access instructions (lockbox, garage code, etc.).</li>
              <li><strong>Pets:</strong> Please inform us of pets in advance. Secure or crate aggressive animals. We love pets but cannot be responsible for pets escaping during service.</li>
              <li><strong>Valuables:</strong> Please secure jewelry, cash, and other valuables before service. We are not responsible for lost or misplaced items.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Service Quality & Satisfaction</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Quality Checklist:</strong> Our crews follow a detailed cleaning checklist for every service type to ensure consistency.</li>
              <li><strong>Satisfaction Guarantee:</strong> If you're not satisfied with any part of our service, notify us within 24 hours and we will return to address the issue at no additional charge.</li>
              <li><strong>Out of Scope:</strong> Certain tasks may be outside the scope of standard cleaning (e.g., biohazard cleanup, hoarding situations, mold remediation). We will inform you if your service requires specialty services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Service Limitations</h2>
            <p className="text-slate-700 leading-relaxed mb-4">We do not clean or service:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Exterior windows above first floor</li>
              <li>Chandeliers requiring ladders above 8 feet</li>
              <li>Biohazard or post-trauma cleanup</li>
              <li>Hoarding situations (Level 3+)</li>
              <li>Mold remediation or water damage restoration</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Liability & Insurance</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              <strong>Insurance Status:</strong> Our insurance and bonding status will be confirmed and provided upon request before your first service. We take all reasonable precautions to protect your home and belongings. In the event of damage caused by our team, we will work with you to resolve the issue promptly.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Payment Due:</strong> Payment is due upon completion of service unless other arrangements are made in advance.</li>
              <li><strong>Methods Accepted:</strong> We accept cash, check, and major credit/debit cards.</li>
              <li><strong>Recurring Services:</strong> Recurring service customers will be invoiced based on agreed-upon schedule.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Service Area</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We serve Lake County and Porter County, Indiana, including Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell. Service availability in other areas is determined by ZIP code during the quote process.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may update these Terms & Conditions from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes indicates acceptance.
            </p>

            <h2 className="text-2xl font-bold text-[#0B1120] mt-8 mb-4">Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-2">
              Questions about our terms? Contact us:
            </p>
            <ul className="list-none space-y-2 text-slate-700 mb-6">
              <li><strong>Phone:</strong> (219) 615-9477</li>
              <li><strong>Email:</strong> info@stronghomescleaning.com</li>
              <li><strong>Hours:</strong> Mon-Sat, 8am-6pm</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

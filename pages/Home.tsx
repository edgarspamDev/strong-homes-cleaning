import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ServiceGrid from '../components/ServiceGrid';
import CTABand from '../components/CTABand';
import { SeoHead } from '../SeoHead';

const steps = [
  { label: '1', title: 'Tell us your home', text: 'Share your rooms, frequency, and zip so we match the right crew.' },
  { label: '2', title: 'Pick your plan', text: 'Choose standard, deep, or move cleaning with clear pricing guidance.' },
  { label: '3', title: 'Relax on cleaning day', text: 'Vetted local pros arrive on time with supplies ready.' },
];

const faqs = [
  {
    q: 'Do I need to be home?',
    a: 'No. Most clients provide a key or code. We respect your home and privacy and confirm access instructions before arrival.',
  },
  {
    q: 'Are supplies included?',
    a: 'Yes. We bring commercial-grade vacuums and cleaning solutions. Eco-friendly options available on request.',
  },
  {
    q: 'What if I am not happy?',
    a: 'Tell us within 24 hours and we will re-clean the area quickly. Your satisfaction drives our crews.',
  },
  {
    q: 'How should I verify your insurance and bonding?',
    a: 'We work with vetted, background-checked teams. Fully insured—COI available on request. Contact us at (219) 615-9477 for credential details.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-[#C5A065] transition"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[#0B1120]">{question}</p>
        <ChevronDown size={20} className={`text-[#C5A065] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <p className="mt-3 text-slate-600 text-sm">{answer}</p>}
    </button>
  );
}

export default function Home() {
  return (
    <>
      <SeoHead />

      <HeroSection />
      <TrustBar />
      <ServiceGrid />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-3">Cleaning made simple</p>
            <h2 className="text-4xl font-bold text-[#0B1120] mb-3">3 steps to a spotless home</h2>
            <p className="text-lg text-slate-600">Fast booking, reliable arrival, premium results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.label}
                className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-150"
              >
                <div className="h-10 w-10 rounded-full bg-[#C5A065]/15 text-[#947638] flex items-center justify-center font-semibold mb-4">
                  {step.label}
                </div>
                <h3 className="text-xl font-bold text-[#0B1120] mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Common Questions</p>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-2">Frequently Asked</h2>
            <p className="text-slate-600">Got questions? We've answered them below.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <p className="text-center mt-8 text-slate-600">
            More questions? <a href="/contact" className="text-[#C5A065] font-semibold hover:underline">Contact us</a>
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}

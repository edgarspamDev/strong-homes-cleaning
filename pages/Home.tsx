import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ServiceGrid from '../components/ServiceGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import ProofSection from '../components/ProofSection';
import UrgencyCTA from '../components/UrgencyCTA';
import { SeoHead } from '../SeoHead';

const faqs = [
  {
    q: 'Will you show up on time?',
    a: 'We text you 1 hour before with exact arrival. If we are running late, we reschedule for free.',
  },
  {
    q: 'Do I need to be home?',
    a: 'No. Most clients provide a key or code. We text when done. You get photos. We lock up.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'Text us within 24 hours. We redo the area free, no questions.',
  },
  {
    q: 'What about pets?',
    a: 'We are pet-friendly. Tell us where to avoid. We use pet-safe products on request.',
  },
  {
    q: 'Are supplies included?',
    a: 'Yes. We bring commercial-grade vacuums and cleaning solutions. Eco-friendly options available.',
  },
  {
    q: 'Why do you cost more than others?',
    a: 'You pay for: 2-pass inspection, free redos, professional equipment, and vetted crews. Cheaper services skip the inspection.',
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
      <SeoHead override={{
        title: 'Home Cleaning in Hobart, Valparaiso | StrongHomes',
        description: 'Professional home cleaning in Lake and Porter Counties. Book online. Usually available this week. Free redo if unsatisfied.',
      }} />

      <HeroSection />
      <TrustBar />
      <WhyChooseUs />
      <ServiceGrid />
      <ProofSection />

      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0B1120] mb-2">Questions? We Got This</h2>
            <p className="text-slate-600">Real answers to real concerns.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <p className="text-center mt-8 text-slate-600">
            More questions? <Link to="/contact" className="text-[#C5A065] font-semibold hover:underline">Contact us</Link>
          </p>
        </div>
      </section>

      <UrgencyCTA />
    </>
  );
}

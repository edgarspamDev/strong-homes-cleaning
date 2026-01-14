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
      <CTABand />
    </>
  );
}

import { Link } from 'react-router-dom';

export default function CTABand() {
  return (
    <section className="relative py-16 px-4 bg-[#0B1120] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-[#0B1120] pointer-events-none" />
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(80% 80% at 10% 10%, rgba(197,160,101,0.25), transparent)' }} />
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to reclaim your weekend?</h2>
        <p className="text-xl mb-8 text-slate-200">
          Get a free estimate from Northwest Indiana&apos;s trusted local cleaning crews.
        </p>
        <Link
          to="/quote"
          className="bg-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-black/20 hover:bg-[#947638] transition-colors inline-block"
        >
          Get Your Free Estimate
        </Link>
      </div>
    </section>
  );
}

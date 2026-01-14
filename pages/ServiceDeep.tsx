import { CheckCircle, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../SeoHead';

const inclusions = [
  'Everything in Standard Cleaning',
  'Baseboards, trim, and door frames detailed',
  'Ceiling fans, vents, and light fixtures dusted',
  'Inside windows and glass smudge removal',
  'Heavy scrub of tubs, tile, grout, and sinks',
  'Edge vacuuming and under-furniture reachable areas',
];

export default function ServiceDeep() {
  return (
    <>
      <SeoHead />
      <header className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(60% 60% at 15% 10%, rgba(197,160,101,0.22), transparent)' }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield size={16} className="text-[#C5A065]" />
            Detailed reset for high-traffic homes
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Deep Cleaning</h1>
          <p className="text-lg text-slate-100 max-w-3xl">
            Top-to-bottom refresh that reaches trim, fixtures, and built-up grime—ideal for seasonal resets or special occasions.
          </p>
        </div>
      </header>

      <main className="bg-[#F8FAFC] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065] flex items-center justify-center shadow-inner shadow-[#C5A065]/20">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">What&apos;s included</p>
                <h2 className="text-2xl font-bold text-[#0B1120]">A meticulous reset</h2>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle size={18} className="text-[#C5A065] mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#0B1120] mb-3">Perfect for</h3>
              <ul className="space-y-3 text-slate-700">
                <li>• Seasonal resets or post-renovation dust detail</li>
                <li>• Preparing for guests, events, or listing photos</li>
                <li>• Homes that need extra attention to trim and fixtures</li>
              </ul>
            </div>
            <div className="bg-[#0B1120] text-white rounded-2xl p-6 shadow-lg shadow-black/20">
              <p className="text-sm text-slate-200 mb-2">Want it pristine?</p>
              <h3 className="text-2xl font-bold mb-4">Schedule your deep clean</h3>
              <p className="text-sm text-slate-200 mb-5">
                Vetted teams with supplies, HEPA vacuums, and detail tools included. Fully insured—COI available on request.
              </p>
              <div className="space-y-3">
                <Link
                  to="/quote"
                  className="block w-full text-center bg-[#C5A065] text-[#0B1120] font-semibold py-3 rounded-lg hover:bg-[#947638] transition-colors"
                >
                  Get my estimate
                </Link>
                <Link
                  to="/services"
                  className="flex items-center justify-center gap-2 text-[#C5A065] font-semibold hover:text-white transition-colors"
                >
                  Compare services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

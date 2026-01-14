import { Link } from 'react-router-dom';
import { LINKS } from '../utils/config';

export default function CTABand() {
  return (
    <section className="relative py-16 px-4 bg-[#0B1120] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-[#0B1120] pointer-events-none" />
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(80% 80% at 10% 10%, rgba(197,160,101,0.25), transparent)' }} />
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stop spending your weekends cleaning</h2>
        <p className="text-lg sm:text-xl mb-8 text-slate-200">
          Book in 30 seconds. We handle the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={LINKS.calendlyBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-black/20 hover:bg-[#947638] hover:scale-[1.02] hover:shadow-2xl transition-all inline-block"
          >
            Book a Cleaning
          </a>
          <Link
            to="/quote"
            className="border-2 border-[#C5A065] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#C5A065]/25 hover:scale-[1.02] transition-all inline-block"
          >
            Get a Free Quote
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-300">
          Lake + Porter County, IN. Confirmation by email. We may call or text to confirm entry details.
        </p>
      </div>
    </section>
  );
}

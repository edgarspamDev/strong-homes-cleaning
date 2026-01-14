import { Link } from 'react-router-dom';
import { SeoHead } from '../SeoHead';
import { BookingEmbed } from '../components/BookingEmbed';
import { LINKS } from '../utils/config';
import { ExternalLink, Calendar, CheckCircle, MessageSquare, Camera, Shield } from 'lucide-react';

const steps = [
  { icon: CheckCircle, title: 'Email confirmation', text: 'You get details and our team info' },
  { icon: MessageSquare, title: 'Text 1 hour before', text: 'Exact arrival time and team photo' },
  { icon: Calendar, title: 'We clean (2 inspections)', text: 'First pass: full clean. Second pass: check everything.' },
  { icon: Camera, title: 'Photos when done', text: 'You get before/after photos to verify quality' },
  { icon: Shield, title: '24-hour redo guarantee', text: 'Not happy? Text us. We redo free.' },
];

export default function Book() {
  return (
    <>
      <SeoHead override={{
        title: 'Book Cleaning Appointment | StrongHomes',
        description: 'Pick your date. We confirm by text. Available this week. Lake and Porter County, IN.',
        canonicalPath: '/book'
      }} />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.18), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3">Book Your Clean</h1>
          <p className="text-lg text-slate-100">
            Pick your date and time. We text confirmation 1 hour before arrival. Easy as that.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto">
          {/* Primary action buttons - always visible */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={LINKS.calendlyBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#947638] transition-colors"
            >
              <Calendar size={22} />
              Open booking calendar
              <ExternalLink size={18} />
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#C5A065]/10 transition-colors"
            >
              Not sure? Get a free quote
            </Link>
          </div>

          {/* Calendly embed - optional enhancement */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <BookingEmbed url={LINKS.calendlyBooking} height={900} />
          </div>

          {/* Fallback note */}
          <p className="mt-4 text-center text-slate-500 text-sm">
            If the calendar does not load, use the "Open booking calendar" button above.
          </p>

          {/* Trust section - What happens after you book */}
          <div className="mt-12 bg-[#0B1120] text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">What Happens After You Book</h2>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#C5A065] text-[#0B1120] rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={18} className="text-[#C5A065]" />
                        <strong>{step.title}</strong>
                      </div>
                      <p className="text-slate-300 text-sm">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-8 text-center text-slate-600">
            Don't see a time that works? Call us at <a href="tel:2196159477" className="text-[#C5A065] font-semibold">(219) 615-9477</a>
          </p>
        </div>
      </div>
    </>
  );
}

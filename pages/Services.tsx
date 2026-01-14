import { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Home, Shield, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../SeoHead';
import { LINKS } from '../utils/config';

type Service = {
  id: string;
  title: string;
  tagline: string;
  whoItsFor: string;
  included: string[];
  notIncluded: string;
  icon: typeof Sparkles;
  badge?: string;
  href: string;
};

const services: Service[] = [
  {
    id: 'standard',
    title: 'Standard Cleaning',
    tagline: 'Come home to clean. Every week.',
    whoItsFor: 'Busy homeowners who want consistent upkeep without thinking about it.',
    included: [
      'Kitchen counters, sink, and appliance exteriors',
      'Bathroom sanitation and mirror polish',
      'Dust all surfaces and fixtures',
      'Vacuum, sweep, and mop all floors',
      'Trash removal and general tidying',
    ],
    notIncluded: 'Inside appliances, windows, or laundry.',
    icon: Sparkles,
    badge: 'Most popular',
    href: '/services/standard',
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    tagline: 'Reset your home. Top to bottom.',
    whoItsFor: 'Homes that have not been cleaned in 3+ months or need a fresh start.',
    included: [
      'Everything in Standard Cleaning',
      'Baseboards, door frames, and trim',
      'Ceiling fans, vents, and light fixtures',
      'Inside cabinet fronts and drawers',
      'Heavy scrubbing on tubs, showers, and grout',
    ],
    notIncluded: 'Inside appliances or exterior windows.',
    icon: Zap,
    badge: 'Seasonal refresh',
    href: '/services/deep',
  },
  {
    id: 'move-in-out',
    title: 'Move-In / Move-Out',
    tagline: 'Protect your deposit. Move in clean.',
    whoItsFor: 'Renters, landlords, and homeowners during transitions.',
    included: [
      'Full interior appliance cleaning',
      'Inside all cabinets, closets, and drawers',
      'Light switch and outlet cover wipe-down',
      'Final polish on floors and baths',
      'Wall touch point cleaning',
    ],
    notIncluded: 'Carpet steam cleaning or exterior work.',
    icon: Home,
    badge: 'Deposit safe',
    href: '/services/move-in-out',
  },
];

const faqs = [
  {
    q: 'Do I need to be home?',
    a: 'No. Most clients provide a key or code. We confirm access instructions before arrival.',
  },
  {
    q: 'What supplies do you use?',
    a: 'We bring everything: commercial-grade vacuums, microfiber cloths, and cleaning solutions. Eco-friendly options on request.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'Tell us within 24 hours. We will come back and re-clean the area at no extra charge.',
  },
  {
    q: 'How do I book?',
    a: 'Click "Book a Cleaning" and pick your time. You get instant email confirmation. We may call or text to confirm address and entry details.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Lake and Porter Counties, Indiana. Including Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell.',
  },
  {
    q: 'Are you insured?',
    a: 'Yes. We work with vetted, background-checked teams. Certificate of insurance available on request.',
  },
];

const processSteps = [
  { icon: Calendar, title: 'Book in 30 seconds', text: 'Pick your time online. Instant confirmation by email.' },
  { icon: CheckCircle, title: 'We show up ready', text: 'Vetted crews arrive on time with all supplies.' },
  { icon: Clock, title: 'Same crew, every time', text: 'Consistent teams so nothing gets missed.' },
];

export default function Services() {
  const [openId, setOpenId] = useState<string>('standard');
  const toggle = (id: string) => setOpenId((current) => (current === id ? '' : id));

  return (
    <>
      <SeoHead override={{
        title: 'Cleaning Services | Lake & Porter County Homes | StrongHomes',
        description: 'Standard, deep, and move-out cleaning for Lake and Porter County homes. Book online in 30 seconds.',
        canonicalPath: '/services'
      }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.2), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            A clean home without the hassle
          </h1>
          <p className="text-lg text-slate-100 max-w-2xl mx-auto mb-8">
            Pick your service. Book in 30 seconds. We show up with supplies and a checklist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={LINKS.calendlyBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#947638] transition-colors"
            >
              Book a Cleaning
            </a>
            <Link
              to="/quote"
              className="border-2 border-[#C5A065] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#C5A065]/15 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065] flex items-center justify-center flex-shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <div className="bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0B1120] mb-2">Choose your clean</h2>
            <p className="text-slate-600">Every service includes vetted crews with supplies provided.</p>
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon;
              const isOpen = openId === service.id;
              return (
                <div key={service.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 sm:px-6 py-5 text-left hover:bg-[#F8FAFC] transition-colors"
                    onClick={() => toggle(service.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065] flex items-center justify-center shadow-inner shadow-[#C5A065]/20">
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-[#0B1120]">{service.title}</h3>
                          {service.badge && (
                            <span className="text-xs font-semibold text-[#947638] bg-[#C5A065]/15 px-3 py-1 rounded-full">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm sm:text-base">{service.tagline}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={22}
                      className={`text-[#C5A065] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`px-5 sm:px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                  >
                    <p className="text-sm text-slate-500 mb-4">
                      <strong>Best for:</strong> {service.whoItsFor}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-[#0B1120] mb-2">What is included:</p>
                      <ul className="space-y-2 text-slate-700 text-sm">
                        {service.included.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                      <strong>Not included:</strong> {service.notIncluded}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={LINKS.calendlyBooking}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#C5A065] text-[#0B1120] font-semibold px-4 py-2 rounded-lg hover:bg-[#947638] transition"
                      >
                        Book this service
                      </a>
                      <Link
                        to="/quote"
                        className="inline-flex items-center gap-2 text-[#0B1120] font-semibold bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition"
                      >
                        Get a quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Not a fit */}
          <div className="mt-8 text-center text-slate-500 text-sm">
            <p>Looking for the cheapest option with no attention to detail? We are probably not the right fit. We focus on consistent, quality cleans for homeowners who value their time.</p>
          </div>

          {/* FAQs */}
          <div className="mt-14 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} className="text-[#C5A065]" />
              <h2 className="text-2xl font-bold text-[#0B1120]">Common questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
                  <h3 className="text-base font-semibold text-[#0B1120] mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Ready to get started?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={LINKS.calendlyBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#947638] transition-colors"
              >
                Book a Cleaning
              </a>
              <Link
                to="/quote"
                className="border-2 border-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#C5A065]/10 transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Lake + Porter County, IN. We may call or text to confirm address and entry details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

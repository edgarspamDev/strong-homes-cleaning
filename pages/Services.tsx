import { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Home, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../SeoHead';

type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: typeof Sparkles;
  badge?: string;
  href: string;
};

const services: Service[] = [
  {
    id: 'standard',
    title: 'Standard Cleaning',
    description: 'Recurring upkeep for kitchens, baths, and living areas with consistent crews.',
    bullets: ['Dust all surfaces and fixtures', 'Vacuum, sweep, and mop floors', 'Bathroom sanitation and wipe-downs', 'Kitchen counters, sink, and exterior appliances'],
    icon: Sparkles,
    badge: 'Most popular',
    href: '/services/standard',
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'Top-to-bottom reset with detail work on trim, fixtures, and hard-to-reach spots.',
    bullets: ['Everything in Standard Cleaning', 'Baseboards, trim, and doors', 'Ceiling fans, vents, and light fixtures', 'Inside windows and heavy scrubbing where needed'],
    icon: Zap,
    badge: 'Seasonal refresh',
    href: '/services/deep',
  },
  {
    id: 'move-in-out',
    title: 'Move-In / Move-Out',
    description: 'Empty-home clean to help protect deposits and move-in peace of mind.',
    bullets: ['Appliance interior and exterior', 'Cabinets and closets wiped inside', 'Detail wall touch points', 'Final polish of floors and baths'],
    icon: Home,
    badge: 'Deposit safe',
    href: '/services/move-in-out',
  },
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
    a: 'We work with vetted local teams trained to the highest standard. Insurance status is UNKNOWN; proof will be shared upon confirmation. Contact us at (219) 615-9477 for credential details.',
  },
];

export default function Services() {
  const [openId, setOpenId] = useState<string>('standard');
  const toggle = (id: string) => setOpenId((current) => (current === id ? '' : id));

  return (
    <>
      <SeoHead />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.2), transparent)' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield size={16} className="text-[#C5A065]" />
            Vetted local crews with supplies provided
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our cleaning services</h1>
          <p className="text-lg text-slate-100 max-w-3xl mx-auto">
            Choose the right clean for your home. Every visit includes vetted teams with supplies ready.
          </p>
        </div>
      </section>

      <div className="bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
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
                          <h2 className="text-xl font-bold text-[#0B1120]">{service.title}</h2>
                          {service.badge && (
                            <span className="text-xs font-semibold text-[#947638] bg-[#C5A065]/15 px-3 py-1 rounded-full">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm sm:text-base">{service.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={22}
                      className={`text-[#C5A065] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`px-5 sm:px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                  >
                    <ul className="space-y-3 text-slate-700">
                      {service.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#C5A065]"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        to={service.href}
                        className="inline-flex items-center gap-2 text-[#947638] font-semibold hover:text-[#C5A065] transition"
                      >
                        View details <span className="text-sm">→</span>
                      </Link>
                      <Link
                        to="/quote"
                        className="inline-flex items-center gap-2 text-[#0B1120] font-semibold bg-[#C5A065]/20 px-3 py-2 rounded-lg hover:bg-[#C5A065]/30 transition"
                      >
                        Get a quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-[#C5A065]" />
              <h2 className="text-2xl font-bold text-[#0B1120]">FAQs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-[#0B1120] mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

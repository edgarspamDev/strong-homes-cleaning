import { Sparkles, Zap, Home, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LINKS } from '../utils/config';

export default function ServiceGrid() {
  const services = [
    {
      icon: Sparkles,
      title: 'Standard Cleaning',
      description: 'Weekly or bi-weekly upkeep. Come home to clean counters, fresh bathrooms, and vacuumed floors.',
      bestFor: 'Busy homeowners',
      href: '/services/standard',
      badge: 'Most popular',
    },
    {
      icon: Zap,
      title: 'Deep Cleaning',
      description: 'Top-to-bottom reset. Baseboards, fixtures, vents, and heavy scrubbing included.',
      bestFor: 'Seasonal refresh',
      href: '/services/deep',
      badge: 'Best value',
    },
    {
      icon: Home,
      title: 'Move-In / Move-Out',
      description: 'Empty-home clean to protect deposits and start fresh.',
      bestFor: 'Renters and landlords',
      href: '/services/move-in-out',
      badge: 'Deposit safe',
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1120] mb-3">Pick your clean</h2>
          <p className="text-lg text-slate-600">Every visit includes vetted crews with supplies provided.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065] flex items-center justify-center shadow-inner shadow-[#C5A065]/20">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-xs font-semibold text-[#947638] bg-[#C5A065]/15 px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0B1120] mb-2">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm mb-3">{service.description}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <CheckCircle size={12} className="text-green-600" />
                      Best for: {service.bestFor}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      to={service.href}
                      className="text-sm font-semibold text-[#947638] hover:text-[#C5A065] transition flex items-center gap-2"
                    >
                      See what is included →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below grid */}
        <div className="mt-10 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={LINKS.calendlyBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C5A065] text-[#0B1120] px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#947638] transition-colors"
            >
              Book a Cleaning
            </a>
            <Link
              to="/quote"
              className="border-2 border-[#C5A065] text-[#0B1120] px-6 py-3 rounded-lg font-semibold hover:bg-[#C5A065]/10 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

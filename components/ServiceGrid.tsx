import { Sparkles, Zap, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceGrid() {
  const services = [
    {
      icon: Sparkles,
      title: 'Standard Cleaning',
      description:
        'Weekly or bi-weekly maintenance for spotless kitchens, baths, and living areas.',
      href: '/services/standard',
      badge: 'Most popular',
    },
    {
      icon: Zap,
      title: 'Deep Cleaning',
      description:
        'Top-to-bottom reset with detail work on baseboards, fixtures, and high-touch areas.',
      href: '/services/deep',
      badge: 'Seasonal refresh',
    },
    {
      icon: Home,
      title: 'Move-In / Move-Out',
      description: 'White-glove clean for empty homes so you start or end with confidence.',
      href: '/services/move-in-out',
      badge: 'Deposit safe',
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-3">Services</p>
          <h2 className="text-4xl font-bold text-[#0B1120] mb-3">Select the right clean</h2>
          <p className="text-lg text-slate-600">Tailored plans with vetted local crews.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                to={service.href}
                key={service.title}
                className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A065]"
              >
                <div className="p-6 flex flex-col gap-4 h-full">
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
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="text-sm font-semibold text-[#947638] flex items-center gap-2 mt-2">
                    Learn more
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

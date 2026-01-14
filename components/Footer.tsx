import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useMemo } from 'react';
import { getBase } from '../utils/base';

const serviceLinks = [
  { label: 'All Services', to: '/services' },
  { label: 'Standard Cleaning', to: '/services/standard' },
  { label: 'Deep Cleaning', to: '/services/deep' },
  { label: 'Move-In/Out', to: '/services/move-in-out' },
];

const cityLinks = ['Hammond', 'Hobart', 'Merrillville', 'Crown Point', 'Valparaiso', 'Schererville', 'St. John', 'Lowell'];

export default function Footer() {
  const base = useMemo(() => getBase(), []);
  const logo = `${base}logo-header.svg`;

  return (
    <footer className="relative bg-[#0B1120] text-white pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120] to-[#0B1120]/95 pointer-events-none" />
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(70% 70% at 15% 10%, rgba(197,160,101,0.18), transparent)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <img src={logo} alt="StrongHomes Cleaning" className="h-12 w-auto" loading="lazy" />
            <p className="text-slate-300 text-sm leading-relaxed">
              Locally owned crews delivering premium cleaning across Lake & Porter Counties with supplies provided for every visit.
            </p>
            <Link to="/quote" className="inline-flex items-center gap-2 text-[#C5A065] font-semibold hover:text-white transition-colors">
              Get a free estimate →
            </Link>
            <p className="text-slate-400 text-xs">Free estimate covers labor and supplies; no obligation.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Service Areas</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              {cityLinks.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-4 inline-flex items-center gap-2 text-[#C5A065] font-semibold hover:text-white transition-colors text-sm"
            >
              View all locations →
            </Link>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <h4 className="text-white font-bold mb-4 text-lg">Contact</h4>
            <a href="tel:2196159477" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={16} className="text-[#C5A065]" />
              <span>(219) 615-9477</span>
            </a>
            <a href="mailto:info@stronghomescleaning.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={16} className="text-[#C5A065]" />
              <span>info@stronghomescleaning.com</span>
            </a>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-[#C5A065] mt-0.5" />
              <span>Lake & Porter Counties, IN</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={16} className="text-[#C5A065] mt-0.5" />
              <span>Mon–Sat: 8am–6pm</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-slate-400 text-sm">
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center items-center mb-2 md:mb-3">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
          © 2026 StrongHomes Cleaning. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

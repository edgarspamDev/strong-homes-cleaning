import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getBase } from '../utils/base';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const base = useMemo(() => getBase(), []);
  const logo = `${base}logo-header.svg`;
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200 shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3" aria-label="StrongHomes Cleaning - Home">
            <img src={logo} alt="StrongHomes Cleaning logo" className="h-10 w-auto" loading="lazy" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive(item.to) ? 'page' : undefined}
                className={`font-medium transition-colors ${
                  isActive(item.to) ? 'text-[#0B1120]' : 'text-slate-600'
                } hover:text-[#947638]`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:2196159477"
              aria-label="Call us at (219) 615-9477"
              className="flex items-center space-x-2 text-slate-700 hover:text-[#947638] font-semibold transition"
            >
              <Phone size={18} className="text-[#C5A065]" aria-hidden="true" />
              <span>(219) 615-9477</span>
            </a>
            <Link
              to="/quote"
              className="bg-[#C5A065] text-[#0B1120] px-4 py-2 rounded-full font-semibold shadow-sm hover:bg-[#947638] transition-colors"
            >
              Get Quote
            </Link>
          </div>

          <button
            className="md:hidden text-slate-800 p-2 rounded-md hover:bg-slate-100"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 space-y-3 border-t border-slate-200 pt-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-medium ${isActive(item.to) ? 'text-[#0B1120]' : 'text-slate-700'} hover:text-[#947638]`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:2196159477"
              className="block text-slate-700 hover:text-[#947638] font-semibold"
            >
              (219) 615-9477
            </a>
            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-[#C5A065] text-[#0B1120] px-4 py-2 rounded-full font-semibold text-center shadow-sm hover:bg-[#947638] transition-colors"
            >
              Get Quote
            </Link>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Link
                to="/quote"
                className="w-full rounded-lg border border-[#C5A065] bg-[#C5A065]/15 text-[#0B1120] font-semibold py-2 text-center"
              >
                Start Quote
              </Link>
              <a
                href="tel:2196159477"
                className="w-full rounded-lg border border-slate-200 bg-white text-[#0B1120] font-semibold py-2 text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

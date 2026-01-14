import { Link } from 'react-router-dom';
import { Phone, Shield, Star, MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getBase } from '../utils/base';

export default function HeroSection() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const base = useMemo(() => getBase(), []);
  const videoSrc = `${base}StrongHomesHero_v01.mp4`;
  const posterSrc = `${base}logo-icon.svg`;
  const badgeItems = [
    { icon: Shield, label: 'Vetted Local Crews' },
    { icon: Star, label: 'Quality Checklist' },
    { icon: MapPin, label: 'Lake & Porter Counties' },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as any)?.connection?.saveData;
    const isSmallScreen = window.innerWidth < 768;

    // Disable motion on small screens or when user prefers reduced motion / data saving.
    const initialAllow = !mediaQuery.matches && !saveData && !isSmallScreen;
    setAllowMotion(initialAllow);

    const handler = (event: MediaQueryListEvent) => {
      const nextAllow = !event.matches && !saveData && !isSmallScreen;
      setAllowMotion(nextAllow);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative flex items-center bg-[#0B1120] overflow-hidden" style={{ minHeight: '100vh' }}>
      {allowMotion && !videoError ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1120] via-[#0B1120] to-[#0B1120]/85" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-[#0B1120]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/80 via-[#0B1120]/60 to-[#0B1120]" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 20% 20%, rgba(197,160,101,0.12), transparent)' }} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-3/5 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm text-white px-4 py-2 rounded-full mb-6 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#C5A065]"></span>
            Serving Lake & Porter Counties — Vetted Local Crews
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Premium home cleaning in Northwest Indiana.
          </h1>
          <p className="text-lg sm:text-xl text-slate-100 max-w-2xl mb-6">
            Reliable, vetted teams for Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell homes.
          </p>
          <p className="text-sm text-slate-200 mb-8">Fast estimates • No long-term contracts • Same-week availability</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/quote"
              className="bg-[#C5A065] text-[#0B1120] px-7 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-black/20 hover:bg-[#947638] transition-colors text-center"
            >
              Get My Free Estimate
            </Link>
            <Link
              to="/book"
              className="border border-[#C5A065] text-white px-7 py-4 rounded-lg font-semibold text-lg hover:bg-[#C5A065]/15 transition-colors text-center"
            >
              Book Now
            </Link>
            <a
              href="tel:2196159477"
              className="bg-white/10 border border-white/20 text-white px-7 py-4 rounded-lg font-semibold text-lg hover:bg-white/15 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} className="text-[#C5A065]" />
              Call (219) 615-9477
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {badgeItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 backdrop-blur-sm"
              >
                <Icon size={22} className="text-[#C5A065]" />
                <span className="text-sm font-semibold text-slate-100">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/5 bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-md shadow-xl shadow-black/20">
          <div className="text-sm text-[#C5A065] font-semibold mb-3">Our Promise</div>
          <div className="text-2xl text-white font-bold mb-3">Vetted crews. On-time arrival. Quality guaranteed.</div>
          <p className="text-slate-200 text-sm mb-6">
            Vetted local crews rigorously trained. All supplies provided. Not satisfied? We return within 24 hours at no charge.
          </p>
          <div className="flex items-center gap-3 text-slate-100 text-sm">
            <div className="h-10 w-10 rounded-full bg-[#C5A065]/10 border border-[#C5A065]/30 flex items-center justify-center text-[#C5A065] font-bold">
              SH
            </div>
            <div>
              <div className="font-semibold text-white">StrongHomes Team</div>
              <div className="text-slate-300 text-xs">Local crews • Supplies provided</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0B1120]/85 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-slate-300 mb-3">Serving</div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-slate-100 text-sm font-semibold">
            <span>Hammond</span>
            <span className="text-[#C5A065]">•</span>
            <span>Hobart</span>
            <span className="text-[#C5A065]">•</span>
            <span>Merrillville</span>
            <span className="text-[#C5A065]">•</span>
            <span>Crown Point</span>
            <span className="text-[#C5A065]">•</span>
            <span>Valparaiso</span>
            <span className="text-[#C5A065]">•</span>
            <span>Schererville</span>
            <span className="text-[#C5A065]">•</span>
            <span>St. John</span>
            <span className="text-[#C5A065]">•</span>
            <span>Lowell</span>
          </div>
        </div>
      </div>
    </section>
  );
}

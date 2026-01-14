import { Link } from 'react-router-dom';
import { CheckCircle, Mail, MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getBase } from '../utils/base';
import { LINKS } from '../utils/config';

export default function HeroSection() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const base = useMemo(() => getBase(), []);
  const isDev = import.meta.env.DEV;
  const videoSrc = isDev ? '/StrongHomesHero_v01.mp4' : `${base}StrongHomesHero_v01.mp4`;
  const posterSrc = isDev ? '/brand/logo-mark.svg' : `${base}brand/logo-mark.svg`;

  const bullets = [
    { icon: CheckCircle, text: 'Checklist-based clean, every time' },
    { icon: Mail, text: 'Confirmation by email, same day' },
    { icon: MapPin, text: 'Lake + Porter County, IN' },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as any)?.connection?.saveData;
    const initialAllow = !mediaQuery.matches && !saveData;
    setAllowMotion(initialAllow);

    const handler = (event: MediaQueryListEvent) => {
      setAllowMotion(!event.matches && !saveData);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative flex items-center bg-[#0B1120] overflow-hidden min-h-[90vh]">
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/80 via-[#0B1120]/50 to-[#0B1120]" />

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
          A cleaner home, scheduled in 30 seconds
        </h1>
        <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8">
          Professional cleaning for busy homeowners. Book online, get email confirmation, and relax on cleaning day.
        </p>

        {/* Bullets */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10">
          {bullets.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-2 text-slate-100">
              <Icon size={18} className="text-[#C5A065]" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={LINKS.calendlyBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C5A065] text-[#0B1120] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-black/20 hover:bg-[#947638] hover:scale-[1.02] hover:shadow-2xl transition-all"
          >
            Book a Cleaning
          </a>
          <Link
            to="/quote"
            className="border-2 border-[#C5A065] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#C5A065]/25 hover:scale-[1.02] transition-all"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Friction killer */}
        <p className="mt-6 text-sm text-slate-300">
          No phone tag. Confirmation by email. We may call or text to confirm entry details.
        </p>
      </div>
    </section>
  );
}

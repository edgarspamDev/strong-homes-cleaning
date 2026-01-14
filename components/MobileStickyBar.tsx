import { Link, useLocation } from 'react-router-dom';
import { Phone, Sparkles, Calendar } from 'lucide-react';

export default function MobileStickyBar() {
  const location = useLocation();
  const hide = ['/quote', '/contact', '/privacy', '/terms'].includes(location.pathname);

  if (hide) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
      <div className="bg-[#0B1120] shadow-xl shadow-black/20 border-t border-[#C5A065] flex gap-3 p-3 pb-6 sm:pb-3">
        <Link
          to="/quote"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#0B1120] font-bold py-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition active:scale-[0.98]"
        >
          <Sparkles size={18} className="text-[#C5A065]" /> Get Quote
        </Link>
        <a
          href="https://calendly.com/hello-stronghomescleaning/cleaning-booking"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] inline-flex items-center justify-center gap-2 bg-[#C5A065] text-[#0B1120] font-bold py-3.5 rounded-lg hover:bg-[#947638] transition shadow-lg shadow-[#C5A065]/20 active:scale-[0.98]"
        >
          <Calendar size={18} /> Book Now
        </a>
      </div>
    </div>
  );
}

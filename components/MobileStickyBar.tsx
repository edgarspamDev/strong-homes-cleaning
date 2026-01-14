import { Link, useLocation } from 'react-router-dom';
import { Phone, Sparkles } from 'lucide-react';

export default function MobileStickyBar() {
  const location = useLocation();
  const hide = ['/quote', '/contact', '/privacy', '/terms'].includes(location.pathname);

  if (hide) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 pointer-events-none">
      <div className="pointer-events-auto bg-white shadow-xl shadow-black/10 border border-slate-200 rounded-xl flex gap-2 p-2">
        <a
          href="tel:2196159477"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C5A065]/15 text-[#0B1120] font-semibold py-3 rounded-lg border border-[#C5A065]/40 hover:bg-[#C5A065]/25 transition"
        >
          <Phone size={18} /> Call
        </a>
        <Link
          to="/quote"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0B1120] text-white font-semibold py-3 rounded-lg hover:bg-[#0B1120]/90 transition"
        >
          <Sparkles size={18} /> Get Quote
        </Link>
      </div>
    </div>
  );
}

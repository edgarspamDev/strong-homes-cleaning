import { Link } from 'react-router-dom';
import { Home, Phone, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-[#C5A065] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
          <p className="text-slate-400">
            Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-[#C5A065] hover:bg-[#b8956a] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            View Our Services
          </Link>
          <a
            href="tel:2196159477"
            className="flex items-center justify-center gap-2 w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Phone size={20} />
            Call (219) 615-9477
          </a>
        </div>
      </div>
    </div>
  );
}

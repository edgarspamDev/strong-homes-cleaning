import { LINKS } from '../utils/config';
import { Calendar, ExternalLink } from 'lucide-react';

export default function MobileFloatingCTA() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B1120] text-white p-3 shadow-lg z-50 border-t border-[#C5A065]/30">
            <a
                href={LINKS.calendlyBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#C5A065] text-[#0B1120] py-3 rounded-lg font-bold text-lg"
            >
                <Calendar size={20} />
                Check Availability
                <ExternalLink size={16} />
            </a>
        </div>
    );
}

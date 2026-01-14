import { LINKS } from '../utils/config';

export default function UrgencyCTA() {
    return (
        <section className="py-12 bg-[#C5A065] text-[#0B1120] text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Most Customers Book 3-7 Days Out
                </h2>
                <p className="text-lg mb-6 text-[#0B1120]/80">
                    Check availability for this weekend while slots are open.
                </p>
                <a
                    href={LINKS.calendlyBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0B1120] text-white px-8 py-4 rounded-lg font-bold text-lg inline-block shadow-lg hover:bg-[#0B1120]/90 transition-colors"
                >
                    See Available Times
                </a>
                <p className="mt-4 text-sm text-[#0B1120]/70">
                    Lake + Porter County, IN
                </p>
            </div>
        </section>
    );
}

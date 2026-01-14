import { SeoHead } from '../SeoHead';
import { BookingEmbed } from '../components/BookingEmbed';

export default function Book() {
  const bookingUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;

  return (
    <>
      <SeoHead override={{
        title: 'Book Cleaning Service | StrongHomes',
        description: 'Schedule your cleaning appointment online with StrongHomes. Instant booking, no waiting.',
        canonicalPath: '/book'
      }} />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.18), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3">Book Your Cleaning</h1>
          <p className="text-lg text-slate-100">Choose your time, confirm details, and we'll see you soon.</p>
        </div>
      </section>

      <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {bookingUrl ? (
            <>
              <BookingEmbed url={bookingUrl} height={800} />
              <p className="mt-6 text-center text-slate-600">
                Don't see a time that works? Call us at <a href="tel:2196159477" className="text-[#C5A065] font-semibold">(219) 615-9477</a>
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-900 text-center">
              <p className="font-semibold mb-2">Set VITE_CALENDLY_URL in .env to enable booking</p>
              <p className="text-sm">Contact <a href="mailto:info@stronghomescleaning.com" className="underline">info@stronghomescleaning.com</a> to schedule.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

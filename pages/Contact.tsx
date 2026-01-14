import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SeoHead } from '../SeoHead';
import {
  validateContactForm,
  checkRateLimit,
  recordSubmitAttempt,
  type ContactFormData,
} from '../utils/security';
import { BookingEmbed } from '../components/BookingEmbed';
import { BUSINESS, LINKS, FORM, getFormspreeUrl } from '../utils/config';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number>(Date.now());
  const bookingUrl = LINKS.bookingUrl;
  const formspreeUrl = getFormspreeUrl(LINKS.contactFormspreeId) || BUSINESS.formSubmitUrl;
  const MIN_FORM_TIME_MS = FORM.minFillMs; // Anti-bot friction

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setRateLimitError(null);
    setSubmitSuccess(false);

    if (isSubmitting) return;

    // Anti-bot friction: enforce minimum form time
    const elapsedMs = Date.now() - formStartTime;
    if (elapsedMs < MIN_FORM_TIME_MS) {
      await new Promise(resolve => setTimeout(resolve, MIN_FORM_TIME_MS - elapsedMs));
    }

    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setRateLimitError(`Too many attempts. Please wait ${rateLimitCheck.waitMinutes} minute(s) and try again.`);
      return;
    }

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      if ('errors' in validation) setErrors(validation.errors);
      return;
    }

    if (!formspreeUrl) {
      setErrors({ submit: 'Form temporarily unavailable. Please call or email us directly.' });
      return;
    }

    recordSubmitAttempt();
    setIsSubmitting(true);

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _gotcha: formData._gotcha, // Honeypot
          _subject: `New Contact Form: ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', _gotcha: '' });
      setFormStartTime(Date.now());
    } catch (error) {
      setErrors({ submit: `Something went wrong. Please try again or call us at ${BUSINESS.phoneDisplay}.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoItems = [
    { icon: Phone, title: 'Phone', value: BUSINESS.phoneDisplay, href: BUSINESS.phoneHref },
    { icon: Mail, title: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { icon: Clock, title: 'Hours', value: BUSINESS.hours },
    { icon: MapPin, title: 'Service Area', value: BUSINESS.serviceArea },
  ];

  return (
    <>
      <SeoHead />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.18), transparent)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300 mb-3">Contact</p>
          <h1 className="text-4xl font-bold mb-3">Contact StrongHomes Cleaning — Lake & Porter Counties</h1>
          <p className="text-lg text-slate-100">Reach out for booking questions, special requests, or service coverage.</p>
        </div>
      </section>

      <div className="bg-[#F8FAFC] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0B1120] mb-2">Get in touch</h2>
                <p className="text-slate-600 text-lg">Local crews serving Lake & Porter Counties. Expect a quick response.</p>
              </div>

              <div className="space-y-4">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-[#C5A065]/30 transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#C5A065]/20 to-[#C5A065]/10 text-[#C5A065] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs uppercase tracking-[0.1em] text-slate-500 font-semibold mb-1">{item.title}</div>
                          <div className="text-slate-900 font-semibold text-sm break-all">{item.value}</div>
                        </div>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a
                      key={item.title}
                      href={item.href}
                      className="block focus:outline-none focus:ring-2 focus:ring-[#C5A065] focus:ring-offset-2 focus:ring-offset-[#F8FAFC] rounded-xl"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.title}>{content}</div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-lg p-8 sm:p-10">
              <h2 className="text-3xl font-bold text-[#0B1120] mb-2">Send a message</h2>
              <p className="text-slate-600 mb-6">Fill out the form and we'll get back to you within 24 hours.</p>

              <div className="space-y-6">
                {submitSuccess && (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800" role="status" aria-live="polite">
                    <CheckCircle2 size={18} className="flex-shrink-0" />
                    <span className="text-sm font-medium">Message received. We'll get back to you within 24 hours.</span>
                  </div>
                )}

                {rateLimitError && (
                  <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800" role="alert" aria-live="polite">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rateLimitError}</span>
                  </div>
                )}

                {errors.submit && (
                  <div className="flex items-start gap-3 rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-rose-800" role="alert" aria-live="polite">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{errors.submit}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[#0B1120] font-semibold text-sm mb-2">Full name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] transition ${errors.name ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs text-rose-600 font-medium" role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B1120] font-semibold text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] transition ${errors.email ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs text-rose-600 font-medium" role="alert">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B1120] font-semibold text-sm mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] transition ${errors.phone ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      placeholder="(219) 123-4567"
                    />
                    <div className="mt-4 flex items-start gap-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="sms_consent"
                          name="sms_consent"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-[#C5A065] focus:ring-[#C5A065]"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="sms_consent" className="font-medium text-slate-900">
                          SMS/Call Consent
                        </label>
                        <p className="text-slate-500 text-xs text-justify">
                          By checking this box, you agree that StrongHomes may contact you via phone or text about your inquiry. Reply STOP to opt out.
                        </p>
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-xs text-rose-600 font-medium" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B1120] font-semibold text-sm mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] transition resize-none ${errors.message ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      placeholder="Tell us what you need help with..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-2 text-xs text-rose-600 font-medium" role="alert">{errors.message}</p>
                    )}
                  </div>

                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    aria-hidden="true"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-[#C5A065] to-[#947638] text-[#0B1120] font-bold py-3 rounded-lg transition transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin" aria-hidden="true"></span>
                        <span className="sr-only">Sending</span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {bookingUrl ? (
          <div className="max-w-5xl mx-auto mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Instant booking</p>
                <h2 className="text-xl font-bold text-[#0B1120]">Schedule a cleaning online</h2>
                <p className="text-sm text-slate-600">Calendar works on any host. Confirmations are sent by Calendly.</p>
              </div>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-[#C5A065] px-4 py-2 text-sm font-semibold text-[#0B1120] transition hover:bg-[#C5A065]/15"
              >
                Open calendar
              </a>
            </div>
            <BookingEmbed url={bookingUrl} height={620} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Set VITE_CALENDLY_URL to enable instant scheduling here.
          </div>
        )}
      </div>
    </>
  );
}



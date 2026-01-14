import React, { useState } from 'react';
import { ChevronRight, Loader2, AlertCircle, CheckCircle2, MailCheck, LockOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SeoHead } from '../SeoHead';
import {
  validateQuoteForm,
  validateZipCode,
  checkRateLimit,
  recordSubmitAttempt,
  type QuoteFormData,
} from '../utils/security';
import { BookingEmbed } from '../components/BookingEmbed';

type Frequency = { value: string; label: string; savings?: string };

export default function Quote() {
  const [step, setStep] = useState(1);
  const [isValidatingZip, setIsValidatingZip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [formStartTime, setFormStartTime] = useState<number>(Date.now());
  const navigate = useNavigate();
  const MIN_FORM_TIME_MS = 700; // Anti-bot friction: 700ms minimum

  const [formData, setFormData] = useState<QuoteFormData>({
    zipCode: '',
    serviceType: '',
    bedrooms: '2',
    bathrooms: '1',
    frequency: 'one-time',
    name: '',
    phone: '',
    email: '',
    _gotcha: '',
  });

  const cities = ['Hammond', 'Hobart', 'Merrillville', 'Crown Point', 'Valparaiso', 'Schererville', 'St. John', 'Lowell', 'Other'];
  const cityZipMap: Record<string, string> = {
    Hammond: '46320',
    Hobart: '46342',
    Merrillville: '46410',
    'Crown Point': '46307',
    Valparaiso: '46383',
    Schererville: '46375',
    'St. John': '46373',
    Lowell: '46356',
  };
  const serviceTypes = ['Standard', 'Deep', 'Move-In/Out'];
  const frequencies: Frequency[] = [
    { value: 'one-time', label: 'One-time' },
    { value: 'weekly', label: 'Weekly', savings: 'Save 15%' },
    { value: 'biweekly', label: 'Bi-Weekly', savings: 'Save 10%' },
    { value: 'monthly', label: 'Monthly', savings: 'Save 5%' },
  ];
  const bookingUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);

    if (errors.zipCode) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.zipCode;
        return next;
      });
    }

    setFormData((prev) => ({
      ...prev,
      zipCode: cityZipMap[city] ?? '',
    }));
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!selectedCity) {
        setErrors({ zipCode: 'Please pick your city to continue.' });
        return;
      }

      if (selectedCity === 'Other' && !formData.zipCode) {
        setErrors({ zipCode: 'Enter your ZIP code to continue.' });
        return;
      }

      setIsValidatingZip(true);
      await new Promise((resolve) => setTimeout(resolve, 380));

      const zipValidation = validateZipCode(formData.zipCode);
      setIsValidatingZip(false);

      if (!zipValidation.isValid) {
        setErrors({ zipCode: zipValidation.error! });
        return;
      }
    }

    if (step < 5) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    setRateLimitError(null);

    // Double-submit protection
    if (isSubmitting) return;

    // Anti-bot friction: enforce minimum form time
    const elapsedMs = Date.now() - formStartTime;
    if (elapsedMs < MIN_FORM_TIME_MS) {
      await new Promise(resolve => setTimeout(resolve, MIN_FORM_TIME_MS - elapsedMs));
    }

    // Rate limiting check
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setRateLimitError(
        `Too many submission attempts. Please wait ${rateLimitCheck.waitMinutes} minute(s) before trying again.`
      );
      return;
    }

    // Validate and sanitize form data
    const validationResult = validateQuoteForm(formData);

    if (!validationResult.isValid) {
      if ('errors' in validationResult) {
        setErrors(validationResult.errors);
        // If there are errors, go back to the first step with an error
        if (validationResult.errors.zipCode) {
          setStep(1);
        } else if (validationResult.errors.serviceType) {
          setStep(2);
        }
      }
      return;
    }

    // Record attempt for rate limiting
    recordSubmitAttempt();

    // Set submitting state
    setIsSubmitting(true);

    try {
      // Submit to FormSubmit.co (no signup required - sends to business email)
      const response = await fetch('https://formsubmit.co/ajax/info@stronghomescleaning.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          zipCode: formData.zipCode,
          serviceType: formData.serviceType,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          frequency: formData.frequency,
          _honey: formData._gotcha, // Honeypot (FormSubmit uses _honey)
          _subject: `New Quote Request: ${formData.name} - ${formData.serviceType}`,
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Success - navigate home
      setIsSubmitting(false);
      navigate('/');
    } catch (error) {
      // Handle submission error without leaking implementation details
      setErrors({ submit: 'Something went wrong. Please try again or call us at (219) 615-9477.' });
      setIsSubmitting(false);
    }
  };

  const progressSteps = [1, 2, 3, 4, 5];

  return (
    <>
      <SeoHead />

      <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(60% 60% at 20% 10%, rgba(197,160,101,0.18), transparent)' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300 mb-3">Get your estimate</p>
          <h1 className="text-4xl font-bold mb-3">Get Your Free Northwest Indiana Cleaning Estimate in 2 Minutes</h1>
          <p className="text-lg text-slate-100">Vetted local crews with supplies provided. No contracts, just clean homes.</p>
        </div>
      </section>

      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Premium Instant Booking Section */}
          <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Navy Header Bar */}
            <div className="bg-gradient-to-r from-[#0B1120] via-[#0B1120] to-[#1a1f3a] px-8 py-8 sm:py-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 20% 50%, #C5A065, transparent)' }}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">⚡</span>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#C5A065]">Fastest Way to Book</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Schedule in 30 seconds</h2>
                <p className="text-slate-200 text-lg max-w-2xl leading-relaxed">Pick your date and time. Instant confirmation via email. No forms, no phone calls, no waiting.</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white p-6 sm:p-10">
              {bookingUrl ? (
                <div className="space-y-6">
                  {/* Calendar Embed */}
                  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-gradient-to-br from-slate-50 to-white">
                    <BookingEmbed url={bookingUrl} height={600} />
                  </div>

                  {/* Fallback Link */}
                  <div className="text-center pt-6 mt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-4">Calendar not responding?</p>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#0B1120] px-9 py-3 rounded-xl font-bold shadow-lg border border-[#C5A065] hover:border-[#947638] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
                    >
                      <span>📅 Open Full Calendar</span>
                      <span>→</span>
                    </a>
                  </div>

                  {/* Benefits Row */}
                  <div className="grid grid-cols-3 gap-4 pt-5">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C5A065]/15 text-[#947638] ring-2 ring-[#C5A065]/30">
                        <CheckCircle2 size={22} strokeWidth={2.4} />
                      </span>
                      <p className="text-xs font-semibold text-[#0B1120]">Instant Confirmation</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#0B1120] ring-2 ring-slate-200">
                        <MailCheck size={20} strokeWidth={2.3} />
                      </span>
                      <p className="text-xs font-semibold text-[#0B1120]">Email Reminder</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100">
                        <LockOpen size={20} strokeWidth={2.3} />
                      </span>
                      <p className="text-xs font-semibold text-[#0B1120]">No Signup</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Empty State */}
                  <div className="rounded-2xl border-3 border-dashed border-[#C5A065]/40 bg-[#C5A065]/3 p-10 text-center">
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-xl font-bold text-[#0B1120] mb-2">Ready to add live booking?</h3>
                    <p className="text-slate-600 mb-6">
                      Get a free Calendly account, create your first event, and share the link. We'll handle the rest.
                    </p>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C5A065] to-[#947638] text-[#0B1120] px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      <span>Create Calendly Account</span>
                      <span>→</span>
                    </a>
                    <p className="text-xs text-slate-500 mt-4">Takes 2 minutes. Free forever.</p>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-xs text-blue-900">
                      <span className="font-semibold">How to enable:</span> Set <code className="bg-white px-2 py-1 rounded text-xs">VITE_CALENDLY_URL</code> in <code className="bg-white px-2 py-1 rounded text-xs">.env</code> and redeploy.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              {progressSteps.map((i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div
                    className={`h-2 w-full rounded-full ${
                      i <= step ? 'bg-[#C5A065]' : 'bg-slate-200'
                    } transition-colors`}
                  />
                  {i < progressSteps.length && <div className="w-3" />}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              {step === 5 ? 'Step 5 of 5 — Let\'s confirm your details' : `Step ${step} of 5`}
            </p>
          </div>

          {rateLimitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-800 text-sm">{rateLimitError}</p>
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-800 text-sm">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 space-y-6">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4">Where are you located?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cities.map((city) => {
                    const isSelected = selectedCity === city;
                    const mappedZip = cityZipMap[city];
                    return (
                      <button
                        type="button"
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className={`flex w-full items-center justify-between p-4 rounded-xl border-2 transition text-left ${
                          isSelected ? 'border-[#C5A065] bg-[#C5A065]/10' : 'border-slate-200 hover:border-[#C5A065]'
                        }`}
                      >
                        <div className="flex items-center">
                          <span
                            className={`mr-3 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              isSelected ? 'border-[#0B1120] bg-[#C5A065]' : 'border-slate-300'
                            }`}
                          >
                            <span className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-[#0B1120]' : 'bg-transparent'}`} />
                          </span>
                          <span className="font-semibold text-[#0B1120]">{city}</span>
                        </div>
                        {mappedZip && city !== 'Other' && (
                          <span className="text-xs font-semibold text-[#947638]">ZIP {mappedZip}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-2">
                  {selectedCity && selectedCity !== 'Other' && formData.zipCode && (
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" aria-live="polite">
                      Service area confirmed for {selectedCity} (ZIP {formData.zipCode}).
                    </div>
                  )}

                  {selectedCity === 'Other' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0B1120]">ZIP code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="Enter 5-digit ZIP"
                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C5A065] ${errors.zipCode ? 'border-red-300' : 'border-slate-200'}`}
                      />
                    </div>
                  )}

                  {!selectedCity && (
                    <p className="text-sm text-slate-600">Pick a city to auto-fill your ZIP. Choose Other to type a ZIP.</p>
                  )}

                  {errors.zipCode && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 flex items-start gap-2">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{errors.zipCode}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4">What type of cleaning?</h2>
                <div className="space-y-3">
                  {serviceTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition ${
                        formData.serviceType === type ? 'border-[#C5A065] bg-[#C5A065]/10' : 'border-slate-200 hover:border-[#C5A065]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={type}
                        checked={formData.serviceType === type}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#C5A065] focus:ring-[#C5A065]"
                      />
                      <span className="ml-3 font-semibold text-[#0B1120]">{type} Cleaning</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-6">Tell us about your home</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#0B1120] font-semibold mb-3">Bedrooms: {formData.bedrooms}</label>
                    <input
                      type="range"
                      name="bedrooms"
                      min="1"
                      max="6"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full accent-[#C5A065]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0B1120] font-semibold mb-3">Bathrooms: {formData.bathrooms}</label>
                    <input
                      type="range"
                      name="bathrooms"
                      min="1"
                      max="5"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full accent-[#C5A065]"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4">How often do you need cleaning?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {frequencies.map((freq) => (
                    <label
                      key={freq.value}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                        formData.frequency === freq.value ? 'border-[#C5A065] bg-[#C5A065]/10' : 'border-slate-200 hover:border-[#C5A065]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="frequency"
                          value={freq.value}
                          checked={formData.frequency === freq.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#C5A065] focus:ring-[#C5A065]"
                        />
                        <span className="font-semibold text-[#0B1120]">{freq.label}</span>
                      </div>
                      {freq.savings && <span className="text-sm font-semibold text-[#947638]">{freq.savings}</span>}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-6">Your contact information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#0B1120] font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={60}
                      autoComplete="name"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] ${
                        errors.name ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B1120] font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] ${
                        errors.phone ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="(219) 123-4567"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-900 mb-1">📱 SMS/Call Consent</p>
                      <p className="text-xs text-blue-800">
                        By entering your phone number, you agree that StrongHomes may contact you via phone call or text message about your estimate, service updates, and reminders. Standard message and data rates apply. You can opt out anytime by texting STOP or calling (219) 615-9477.
                      </p>
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#0B1120] font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      autoComplete="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A065] ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="your@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Honeypot - improved disguise */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-3 sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur px-2 -mx-2 sm:static sm:bg-transparent sm:backdrop-blur-0 sm:px-0 sm:mx-0 sm:border-0 border-t border-slate-200 sm:border-0">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 border border-slate-200 text-[#0B1120] font-semibold rounded-lg hover:bg-slate-50 transition disabled:bg-slate-200 disabled:cursor-not-allowed"
                >
                  Back
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={(step === 1 && (!selectedCity || (selectedCity === 'Other' && !formData.zipCode))) || (step === 2 && !formData.serviceType) || isValidatingZip}
                  className="flex-1 bg-[#C5A065] text-[#0B1120] font-semibold py-3 rounded-lg hover:bg-[#947638] transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isValidatingZip ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Validating...
                    </>
                  ) : (
                    <>
                      Next <ChevronRight size={20} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !!rateLimitError}
                  className="flex-1 bg-[#0B1120] text-white font-semibold py-3 rounded-lg hover:bg-[#0B1120]/90 transition flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Sending...
                    </>
                  ) : (
                    'Get My Estimate'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

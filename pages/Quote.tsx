import React, { useState } from 'react';
import { ChevronRight, Loader2, AlertCircle, CheckCircle, Clock, Shield, Calendar, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../SeoHead';
import {
  validateQuoteForm,
  validateZipCode,
  checkRateLimit,
  recordSubmitAttempt,
  type QuoteFormData,
} from '../utils/security';
import { BUSINESS, FORM, getFormspreeUrl, LINKS } from '../utils/config';

export default function Quote() {
  const [step, setStep] = useState(1);
  const [isValidatingZip, setIsValidatingZip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const formspreeUrl = getFormspreeUrl(LINKS.quoteFormspreeId) || BUSINESS.formSubmitUrl;

  const [formData, setFormData] = useState<QuoteFormData>({
    zipCode: '',
    serviceType: '',
    bedrooms: '3',
    bathrooms: '2',
    frequency: 'one-time',
    name: '',
    phone: '',
    email: '',
    _gotcha: '',
  });

  const cities = ['Hammond', 'Hobart', 'Merrillville', 'Crown Point', 'Valparaiso', 'Schererville', 'St. John', 'Lowell', 'Other'];
  const cityZipMap: Record<string, string> = {
    Hammond: '46320', Hobart: '46342', Merrillville: '46410', 'Crown Point': '46307',
    Valparaiso: '46383', Schererville: '46375', 'St. John': '46373', Lowell: '46356',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    if (errors.zipCode) setErrors((prev) => { const n = { ...prev }; delete n.zipCode; return n; });
    setFormData((prev) => ({ ...prev, zipCode: cityZipMap[city] ?? '' }));
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!selectedCity) { setErrors({ zipCode: 'Pick your city' }); return; }
      if (selectedCity === 'Other' && !formData.zipCode) { setErrors({ zipCode: 'Enter ZIP' }); return; }
      setIsValidatingZip(true);
      await new Promise((r) => setTimeout(r, 300));
      const v = validateZipCode(formData.zipCode);
      setIsValidatingZip(false);
      if (!v.isValid) { setErrors({ zipCode: v.error! }); return; }
    }
    if (step === 2 && !formData.serviceType) { setErrors({ serviceType: 'Pick a service' }); return; }
    if (step < 4) setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setRateLimitError(null);
    if (isSubmitting) return;

    const rl = checkRateLimit();
    if (!rl.allowed) { setRateLimitError(`Wait ${rl.waitMinutes} min before trying again.`); return; }

    const v = validateQuoteForm(formData);
    if (!v.isValid && 'errors' in v) { setErrors(v.errors); return; }
    if (!formspreeUrl) { setErrors({ submit: 'Form unavailable. Call us.' }); return; }

    recordSubmitAttempt();
    setIsSubmitting(true);

    try {
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          zipCode: formData.zipCode,
          serviceType: formData.serviceType,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          frequency: formData.frequency,
          _subject: `Quote: ${formData.name} - ${formData.serviceType}`,
          _captcha: 'false'
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Form error:', errData);
        throw new Error('Form submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      // Enable fallback mode instead of just showing error
      setFallbackMode(true);
      setErrors({ submit: `Automatic submission failed.` });
    }
    setIsSubmitting(false);
  };

  // Generate mailto link for fallback
  const mailtoLink = `mailto:${BUSINESS.email}?subject=Quote Request: ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AZIP: ${formData.zipCode}%0D%0AService: ${formData.serviceType}%0D%0ABedrooms: ${formData.bedrooms}%0D%0ABathrooms: ${formData.bathrooms}%0D%0AFrequency: ${formData.frequency}`;

  // Success state
  if (submitted) {
    return (
      <>
        <SeoHead override={{ title: 'Quote Received | StrongHomes', canonicalPath: '/quote' }} />
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B1120] mb-3">Got it!</h1>
            <p className="text-slate-600 mb-6">
              Check your email for pricing. Expect it within 2 hours.
            </p>
            <div className="space-y-3">
              <a
                href={LINKS.calendlyBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#C5A065] text-[#0B1120] py-3 rounded-lg font-bold hover:bg-[#947638] hover:scale-[1.02] transition-all"
              >
                Book Now (Skip the Wait)
              </a>
              <Link to="/" className="block text-slate-500 text-sm hover:underline">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SeoHead override={{
        title: 'Free Quote | StrongHomes Cleaning',
        description: 'Get your free cleaning quote in 60 seconds. Lake and Porter County, IN.',
        canonicalPath: '/quote'
      }} />

      <div className="min-h-screen bg-[#0B1120]">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* Left: Value proposition */}
            <div className="text-white lg:sticky lg:top-24 relative z-10">
              <p className="text-[#C5A065] font-semibold mb-4 uppercase tracking-wider text-sm">Free Quote</p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Get pricing in<br />60 seconds
              </h1>
              <p className="text-xl text-slate-200 mb-8">
                Answer 4 quick questions. We email your quote within 2 hours.
              </p>

              {/* Proof points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#C5A065]/20 flex items-center justify-center">
                    <Clock size={20} className="text-[#C5A065]" />
                  </div>
                  <div>
                    <p className="font-semibold">Response within 2 hours</p>
                    <p className="text-sm text-slate-400">Pricing sent to your email</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#C5A065]/20 flex items-center justify-center">
                    <Shield size={20} className="text-[#C5A065]" />
                  </div>
                  <div>
                    <p className="font-semibold">No commitment required</p>
                    <p className="text-sm text-slate-400">Just pricing info, no pressure</p>
                  </div>
                </div>
              </div>

              {/* Skip to booking */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-slate-300 mb-3">Ready to book right now?</p>
                <a
                  href={LINKS.calendlyBooking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C5A065] font-bold hover:text-white hover:bg-[#C5A065]/30 border border-[#C5A065] rounded-lg px-4 py-2 relative z-20 transition-all cursor-pointer w-fit hover:scale-[1.02]"
                >
                  Skip quote, pick a time →
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Progress */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-[#C5A065]' : 'bg-slate-200'}`} />
                ))}
              </div>

              {rateLimitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-600" />
                  <p className="text-red-800 text-sm">{rateLimitError}</p>
                </div>
              )}

              {/* Error / Fallback State */}
              {(errors.submit || fallbackMode) && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="text-amber-900 font-bold text-sm">Action Required</h3>
                      <p className="text-amber-800 text-sm mt-1">
                        Our automated form is having trouble. Please send your details via email instead.
                      </p>
                    </div>
                  </div>
                  <a
                    href={mailtoLink}
                    className="flex w-full items-center justify-center gap-2 bg-[#C5A065] text-[#0B1120] px-4 py-3 rounded-lg font-bold hover:bg-[#947638] transition-colors"
                  >
                    <Mail size={18} />
                    Send via Email App
                  </a>
                  <p className="text-center text-xs text-amber-700 mt-2">
                    Opens your default email app with details pre-filled.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Location */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Where are you?</h2>
                    <p className="text-slate-500 mb-6">Pick your city for accurate pricing</p>
                    <div className="grid grid-cols-2 gap-2">
                      {cities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className={`p-3 rounded-lg border-2 text-left font-medium transition ${selectedCity === city ? 'border-[#C5A065] bg-[#C5A065]/10' : 'border-slate-200 hover:border-[#C5A065]'
                            }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                    {selectedCity === 'Other' && (
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Enter ZIP code"
                        className="w-full mt-3 p-3 border-2 border-slate-200 rounded-lg focus:border-[#C5A065] focus:outline-none"
                      />
                    )}
                    {errors.zipCode && <p className="mt-2 text-red-600 text-sm">{errors.zipCode}</p>}
                  </div>
                )}

                {/* Step 2: Service */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0B1120] mb-2">What do you need?</h2>
                    <p className="text-slate-500 mb-6">Pick your cleaning type</p>
                    <div className="space-y-3">
                      {[
                        { value: 'Standard', label: 'Standard Clean', desc: 'Regular upkeep for busy homes' },
                        { value: 'Deep', label: 'Deep Clean', desc: 'Top-to-bottom reset' },
                        { value: 'Move-In/Out', label: 'Move-In / Move-Out', desc: 'Empty home clean' },
                      ].map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceType: s.value })}
                          className={`w-full p-4 rounded-lg border-2 text-left transition ${formData.serviceType === s.value ? 'border-[#C5A065] bg-[#C5A065]/10' : 'border-slate-200 hover:border-[#C5A065]'
                            }`}
                        >
                          <p className="font-semibold text-[#0B1120]">{s.label}</p>
                          <p className="text-sm text-slate-500">{s.desc}</p>
                        </button>
                      ))}
                    </div>
                    {errors.serviceType && <p className="mt-2 text-red-600 text-sm">{errors.serviceType}</p>}
                  </div>
                )}

                {/* Step 3: Home size */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0B1120] mb-2">How big is your home?</h2>
                    <p className="text-slate-500 mb-6">This helps us estimate time and cost</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block font-semibold mb-3">Bedrooms: {formData.bedrooms}</label>
                        <input
                          type="range" name="bedrooms" min="1" max="6" value={formData.bedrooms}
                          onChange={handleChange} className="w-full accent-[#C5A065]"
                        />
                        <div className="flex justify-between text-xs text-slate-400"><span>1</span><span>6+</span></div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-3">Bathrooms: {formData.bathrooms}</label>
                        <input
                          type="range" name="bathrooms" min="1" max="5" value={formData.bathrooms}
                          onChange={handleChange} className="w-full accent-[#C5A065]"
                        />
                        <div className="flex justify-between text-xs text-slate-400"><span>1</span><span>5+</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Where do we send pricing?</h2>
                    <p className="text-slate-500 mb-6">We reply within 2 hours</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                          type="text" name="name" value={formData.name} onChange={handleChange}
                          placeholder="Your name" required maxLength={60}
                          className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#C5A065] ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                          type="email" name="email" value={formData.email} onChange={handleChange}
                          placeholder="you@email.com" required maxLength={254}
                          className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#C5A065] ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone</label>
                        <input
                          type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          placeholder="(219) 123-4567"
                          className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#C5A065] ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        <p className="text-xs text-slate-400 mt-1">We may text to confirm details</p>
                        {errors.phone && <p className="mt-1 text-red-600 text-sm">{errors.phone}</p>}
                      </div>
                      <input type="text" name="_gotcha" value={formData._gotcha} onChange={handleChange}
                        tabIndex={-1} autoComplete="off" aria-hidden="true"
                        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep((s) => s - 1)}
                      disabled={isSubmitting}
                      className="flex-1 py-3 border-2 border-slate-200 rounded-lg font-semibold hover:bg-slate-50 hover:border-[#C5A065] hover:scale-[1.02] transition-all disabled:opacity-50">
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button" onClick={handleNext} disabled={isValidatingZip}
                      className="flex-1 bg-[#C5A065] text-[#0B1120] py-3 rounded-lg font-bold hover:bg-[#947638] hover:scale-[1.02] transition-all disabled:bg-slate-300 disabled:hover:bg-slate-300 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isValidatingZip ? <Loader2 className="animate-spin" size={18} /> : <>Next <ChevronRight size={18} /></>}
                    </button>
                  ) : (
                    <button
                      type="submit" disabled={isSubmitting}
                      className="flex-1 bg-[#0B1120] text-white py-3 rounded-lg font-bold hover:bg-[#0B1120]/90 hover:scale-[1.02] transition-all disabled:bg-slate-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Get My Quote'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

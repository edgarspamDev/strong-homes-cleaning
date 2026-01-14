# IMPLEMENTATION PLAN — COMPLETE FIX ROADMAP

**Timeline:** 2–3 weeks to full 100/100  
**Effort:** ~40–50 developer hours  
**Risk Level:** LOW (no breaking changes to routing/build)

---

## PHASE 1: IMMEDIATE FIXES (24 hours) — CRITICAL BLOCKERS

### 1.1: Add OG Image Meta Tag to SeoHead.tsx
**File:** [SeoHead.tsx](SeoHead.tsx#L100)  
**Effort:** 15 minutes  
**Impact:** Social sharing now shows preview image  

**Change:**
```tsx
// In SeoHead.tsx, after <meta name="description">
const ogImageUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${base}og-image.png`;
// Then add this line in <Helmet>:
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
```

**Action Items:**
- [ ] Update SeoHead.tsx
- [ ] Create `public/og-image.png` (1200x630px, navy/gold design)
- [ ] Test with Facebook Debugger: https://developers.facebook.com/tools/debug/
- [ ] Verify on preview build

---

### 1.2: Confirm/Update Insurance & Bonding Status in Services.tsx
**File:** [pages/Services.tsx](pages/Services.tsx#L41)  
**Effort:** 30 minutes  
**Impact:** Removes ambiguity; shows integrity  

**Current Issue:**
```tsx
{
  q: 'Is your insurance verified?',
  a: 'Insurance status: UNKNOWN. We use vetted local teams and will share proof upon confirmation.',
}
```

**Fix Option A (If Insured):**
```tsx
{
  q: 'Is your insurance verified?',
  a: 'Yes. We carry general liability insurance ($1M coverage). Proof of insurance provided upon request before your first service.',
}
```

**Fix Option B (If NOT Insured Yet):**
```tsx
{
  q: 'How should I verify your credentials?',
  a: 'We are actively building our insurance partnership. For now, we work with background-checked, vetted local teams and we carry bonding. Contact us at (219) 615-9477 to discuss your comfort level.',
}
```

**Action Items:**
- [ ] Confirm actual insurance/bonding status with business owner
- [ ] Update FAQ accordingly (Option A or B)
- [ ] If insured, add cert details to Terms.tsx
- [ ] Test content reads clearly in Services accordion

---

### 1.3: Add Minimum Submit Timing (Anti-Bot Friction)
**File:** [pages/Quote.tsx](pages/Quote.tsx#L110)  
**Effort:** 20 minutes  
**Impact:** Reduces bot submissions  

**Change:**
```tsx
// Add to Quote.tsx state:
const [formStartTime, setFormStartTime] = useState<number>(Date.now());

// In handleSubmit, before validation:
const elapsedMs = Date.now() - formStartTime;
const MIN_FORM_TIME_MS = 700; // Minimum 700ms to complete form

if (elapsedMs < MIN_FORM_TIME_MS) {
  // Do not show error, just wait silently
  await new Promise(resolve => setTimeout(resolve, MIN_FORM_TIME_MS - elapsedMs));
}

// In useEffect, reset timer when form resets:
if (formData.name === '') {
  setFormStartTime(Date.now());
}
```

**Action Items:**
- [ ] Update Quote.tsx with timing check
- [ ] Update Contact.tsx with same logic
- [ ] Test: Quick form submission should wait 700ms before processing
- [ ] Test: Slow human form submission should submit immediately (no wait)

---

### 1.4: Make SMS Consent Label More Prominent
**File:** [pages/Quote.tsx](pages/Quote.tsx#L408)  
**Effort:** 15 minutes  
**Impact:** Clearer opt-in, better UX  

**Current Issue:**
```tsx
<p className="mt-1 text-xs text-slate-600">By providing a phone number, you agree we may call/text about your estimate. No spam.</p>
```

**Fix:**
```tsx
<div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
  <p className="text-sm font-semibold text-blue-900 mb-1">📱 SMS/Call Consent</p>
  <p className="text-xs text-blue-800">
    By entering your phone number, you agree that StrongHomes may contact you via phone call or text message about your estimate, service updates, and reminders. Standard message and data rates apply. You can opt out anytime by texting STOP.
  </p>
</div>
```

**Action Items:**
- [ ] Update phone field label/description in Quote.tsx
- [ ] Add similar consent block to Contact.tsx
- [ ] Test readability on mobile (375px width)
- [ ] Verify contrast meets WCAG AA

---

### 1.5: Fix Hero Container CLS (Cumulative Layout Shift)
**File:** [components/HeroSection.tsx](components/HeroSection.tsx#L30)  
**Effort:** 10 minutes  
**Impact:** Better LCP, no layout shift  

**Current Issue:**
```tsx
<section className="relative min-h-screen flex items-center bg-[#0B1120] overflow-hidden">
```

**Fix:**
```tsx
<section 
  className="relative bg-[#0B1120] overflow-hidden flex items-center justify-center"
  style={{ minHeight: '100dvh', aspectRatio: 'auto / 560px' }}
>
  {/* Video or gradient inside */}
</section>
```

**Or using Tailwind only:**
```tsx
<section className="relative min-h-screen flex items-center bg-[#0B1120] overflow-hidden" style={{height: '100vh'}}>
```

**Action Items:**
- [ ] Update HeroSection.tsx with explicit height
- [ ] Run Lighthouse; check CLS score
- [ ] Test on mobile at various viewport heights
- [ ] Verify no layout shift during video load

---

## PHASE 2: LOGO DESIGN (2–3 hours) — VISUAL REFRESH

### 2.1: Create Logo Concept PNG Exports
**Files:** See [LOGO_DESIGN_REPORT.md](LOGO_DESIGN_REPORT.md)  
**Effort:** 1–2 hours (design tool export)  
**Impact:** Modern branding, scalable logo  

**Deliverables:**
- [ ] PNG transparent: 32x32, 50x150, 100x100, 200x200, 500x500
- [ ] PNG white bg: Same sizes
- [ ] SVG color + monochrome variants
- [ ] Wordmark lockup (horizontal)

**Action Items:**
- [ ] Open logo-concept-b-modern-monogram.svg in Figma/Illustrator
- [ ] Export PNGs at specified sizes
- [ ] Test in browser at actual sizes (Navbar = 50x150 approx)
- [ ] Create public/ files: logo-header.svg (update), logo-icon.svg (update), og-image.png (NEW)

---

### 2.2: Update Navbar to Use New Logo
**File:** [components/Navbar.tsx](components/Navbar.tsx#L27)  
**Effort:** 10 minutes  
**Impact:** Fresh branding throughout site  

**Current:**
```tsx
<img src={logo} alt="StrongHomes Cleaning" className="h-10 w-auto" loading="lazy" />
```

**New:**
```tsx
<img src={logo} alt="StrongHomes Cleaning" className="h-12 w-auto" loading="lazy" />
<span className="hidden sm:inline-block ml-2 font-bold text-[#0B1120]">StrongHomes</span>
```

**Action Items:**
- [ ] Update Navbar with new logo file
- [ ] Test on mobile: logo should be 50x150 area
- [ ] Test on desktop: logo + wordmark visible
- [ ] Verify no image shift during load

---

## PHASE 3: BOOKING PAGE + INTEGRATION (2–3 hours) — NEW FEATURE

### 3.1: Create /book Route in App.tsx
**File:** [App.tsx](App.tsx)  
**Effort:** 10 minutes  
**Impact:** New booking entry point  

**Change:**
```tsx
import Book from './pages/Book';

// Add to <Routes>:
<Route path="/book" element={<Book />} />
```

**Action Items:**
- [ ] Add import and route
- [ ] Test: Navigate to `/#/book` in dev

---

### 3.2: Create Book.tsx Page Component
**File:** `pages/Book.tsx` (NEW)  
**Effort:** 30 minutes  
**Impact:** Full-screen booking page  

**Template:**
```tsx
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
```

**Action Items:**
- [ ] Create pages/Book.tsx
- [ ] Test: Navigate to `/#/book`
- [ ] Verify Calendly embed loads (if VITE_CALENDLY_URL set)
- [ ] Test fallback message if URL not set

---

### 3.3: Update Navigation to Include /book Link
**File:** [components/Navbar.tsx](components/Navbar.tsx#L10)  
**Effort:** 10 minutes  
**Impact:** Book link in nav  

**Add to NAV_LINKS:**
```tsx
{ to: '/book', label: 'Book Now' }
```

**Also add to Footer:** [components/Footer.tsx](components/Footer.tsx#L30)

**Action Items:**
- [ ] Add /book to Navbar NAV_LINKS
- [ ] Add /book link to Footer
- [ ] Update CTABand.tsx to link to /book (option to route directly to booking)
- [ ] Test navigation on mobile and desktop

---

### 3.4: Hostinger Booking Verification Checklist
**File:** New — [BOOKING_SETUP_CHECKLIST.md](BOOKING_SETUP_CHECKLIST.md)  
**Effort:** 20 minutes (create checklist)  
**Impact:** Production readiness guide  

**Create checklist document with:**
- [ ] Step 1: Set VITE_CALENDLY_URL in .env.local
- [ ] Step 2: Run npm run build
- [ ] Step 3: Deploy to Hostinger
- [ ] Step 4: Test from different device, different network
- [ ] Step 5: Verify no mixed content warnings (HTTPS)
- [ ] Step 6: Test booking form submission
- [ ] Step 7: Verify confirmation email received
- [ ] Step 8: Check no console errors in production build

---

## PHASE 4: UI/UX REDESIGN (3–4 hours) — VISUAL POLISH

### 4.1: Update Footer with Gold Gradient Overlay
**File:** [components/Footer.tsx](components/Footer.tsx#L1)  
**Effort:** 20 minutes  
**Impact:** Enhanced brand presence  

**Current:**
```tsx
<footer className="relative bg-[#0B1120] text-white pt-16 pb-10 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120] to-[#0B1120]/95" />
  <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(70% 70% at 15% 10%, rgba(197,160,101,0.18), transparent)' }} />
```

**Enhanced:**
```tsx
<footer className="relative bg-[#0B1120] text-white pt-16 pb-10 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/95 to-[#1a1f2e]" />
  <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(80% 80% at 10% 20%, rgba(197,160,101,0.22), transparent)' }} />
  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(60% 60% at 90% 80%, rgba(197,160,101,0.12), transparent)' }} />
```

**Also increase spacing:**
```tsx
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">  {/* gap-12 instead of gap-10 */}
    {/* ... */}
  </div>
  <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">  {/* pt-8 instead of pt-6 */}
```

**Action Items:**
- [ ] Update Footer.tsx gradient and spacing
- [ ] Test on mobile/desktop
- [ ] Verify contrast still meets WCAG AA

---

### 4.2: Add FAQ Accordion to Home Page
**File:** [pages/Home.tsx](pages/Home.tsx)  
**Effort:** 30 minutes  
**Impact:** Increased conversion  

**Add after "3 steps" section, before CTABand:**
```tsx
<section className="bg-[#F8FAFC] py-16">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Common Questions</p>
      <h2 className="text-3xl font-bold text-[#0B1120] mb-2">Frequently Asked</h2>
      <p className="text-slate-600">Got questions? We've answered them below.</p>
    </div>

    <div className="space-y-3">
      {faqs.map((faq) => (
        <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
      ))}
    </div>

    <p className="text-center mt-8 text-slate-600">
      More questions? <a href="/contact" className="text-[#C5A065] font-semibold">Contact us</a>
    </p>
  </div>
</section>
```

**Create FAQItem component:**
```tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-[#C5A065] transition"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[#0B1120]">{question}</p>
        <ChevronDown size={20} className={`text-[#C5A065] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <p className="mt-3 text-slate-600 text-sm">{answer}</p>}
    </button>
  );
}
```

**Action Items:**
- [ ] Create FAQ component (or inline in Home.tsx)
- [ ] Copy FAQ items from Services.tsx to Home.tsx
- [ ] Test accordion open/close on mobile
- [ ] Verify smooth animation

---

### 4.3: Update Contact Page with Gold Icons
**File:** [pages/Contact.tsx](pages/Contact.tsx)  
**Effort:** 15 minutes  
**Impact:** Visual consistency  

**Current:**
```tsx
{ icon: Phone, title: 'Phone', value: '(219) 615-9477', href: 'tel:2196159477' },
```

**Enhanced rendering:**
```tsx
<div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#C5A065] transition">
  <div className="flex items-start gap-4">
    <div className="h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065] flex items-center justify-center flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-[#0B1120] mb-1">{item.title}</h3>
      {item.href ? (
        <a href={item.href} className="text-slate-600 hover:text-[#C5A065] font-semibold">
          {item.value}
        </a>
      ) : (
        <p className="text-slate-600">{item.value}</p>
      )}
    </div>
  </div>
</div>
```

**Action Items:**
- [ ] Update Contact.tsx icon styling
- [ ] Test on mobile/desktop
- [ ] Verify gold background is visible and accessible

---

### 4.4: Update Service Detail Pages (Standard/Deep/Move)
**Files:** [pages/ServiceStandard.tsx](pages/ServiceStandard.tsx), [pages/ServiceDeep.tsx](pages/ServiceDeep.tsx), [pages/ServiceMove.tsx](pages/ServiceMove.tsx)  
**Effort:** 1 hour  
**Impact:** Consistent branding across all pages  

**Standard updates for each page:**
1. Header: Add navy background with gold gradient (like other pages)
2. Icons: Wrap in gold-tinted background boxes
3. Buttons: Ensure gold CTA buttons
4. Badges: Add gold badges/badges for key features
5. Check spacing and contrast

**Action Items:**
- [ ] Update each service detail page header
- [ ] Add gold-tinted icon backgrounds
- [ ] Verify consistent styling across all pages
- [ ] Test responsive layout on mobile

---

### 4.5: Enhance TrustBar Component
**File:** [components/TrustBar.tsx](components/TrustBar.tsx)  
**Effort:** 20 minutes  
**Impact:** More trust signals  

**Add guarantees/certifications:**
```tsx
const trustItems = [
  { label: 'Background Checked', icon: Shield },
  { label: 'Satisfaction Guaranteed', icon: CheckCircle },
  { label: 'Same-Week Service', icon: Zap },
  { label: 'No Contracts', icon: FileText },
];
```

**Render with better styling:**
```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {trustItems.map((item) => (
    <div key={item.label} className="text-center p-3 sm:p-4">
      <item.icon size={28} className="text-[#C5A065] mx-auto mb-2" />
      <p className="text-sm font-semibold text-[#0B1120]">{item.label}</p>
    </div>
  ))}
</div>
```

**Action Items:**
- [ ] Update TrustBar with more visible icons and labels
- [ ] Verify icons are clear and properly sized
- [ ] Test on mobile (2-column layout)

---

## PHASE 5: SEO + COMPLIANCE FINAL POLISH (1–2 hours)

### 5.1: Validate Sitemap and Robots.txt
**Files:** [public/sitemap.xml](public/sitemap.xml), [public/robots.txt](public/robots.txt)  
**Effort:** 20 minutes  
**Impact:** Better search indexing  

**sitemap.xml should include:**
```xml
<url>
  <loc>https://stronghomescleaning.com/#/</loc>
  <lastmod>2025-12-29</lastmod>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://stronghomescleaning.com/#/services</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://stronghomescleaning.com/#/quote</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://stronghomescleaning.com/#/contact</loc>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://stronghomescleaning.com/#/book</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://stronghomescleaning.com/#/privacy</loc>
  <priority>0.5</priority>
</url>
<url>
  <loc>https://stronghomescleaning.com/#/terms</loc>
  <priority>0.5</priority>
</url>
```

**robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://stronghomescleaning.com/sitemap.xml
```

**Action Items:**
- [ ] Update sitemap.xml with all routes
- [ ] Verify robots.txt is correct
- [ ] Submit sitemap to Google Search Console
- [ ] Test with https://www.xml-sitemaps.com/

---

### 5.2: Improve H1 Tags Across Pages
**Files:** All pages  
**Effort:** 15 minutes  
**Impact:** Better SEO  

**Quote page H1 (improve slightly):**
```tsx
<h1 className="text-4xl font-bold mb-3">
  Free Cleaning Estimates for Northwest Indiana in 2 Minutes
</h1>
```

**Contact page H1:**
```tsx
<h1 className="text-4xl font-bold mb-3">
  Contact StrongHomes Cleaning — Lake & Porter Counties
</h1>
```

**Action Items:**
- [ ] Review all page H1 tags
- [ ] Ensure benefit + location in each H1
- [ ] Verify good contrast and readability

---

### 5.3: Add JSON-LD Enhancements
**File:** [SeoHead.tsx](SeoHead.tsx#L70)  
**Effort:** 20 minutes  
**Impact:** Rich snippets in search results  

**Enhance existing JSON-LD:**
```tsx
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HouseCleaningService',
  name: 'StrongHomes Cleaning',
  url: canonicalUrl,
  telephone: '(219) 615-9477',
  email: 'info@stronghomescleaning.com',
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Lake County, Indiana'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Porter County, Indiana'
    }
  ],
  // Add service types
  knowsAbout: [
    'Standard Cleaning',
    'Deep Cleaning',
    'Move-In/Out Cleaning'
  ],
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '(219) 615-9477',
    email: 'info@stronghomescleaning.com',
    availableLanguage: 'en'
  }
};
```

**Action Items:**
- [ ] Update JSON-LD in SeoHead.tsx
- [ ] Test with Google's Structured Data Test Tool
- [ ] Verify no validation errors

---

## PHASE 6: FINAL BUILD + TESTING (30 mins – 1 hour)

### 6.1: Run Full Build
**Command:** `npm run build`  
**Effort:** 5 minutes  
**Impact:** Verify no errors  

**Action Items:**
- [ ] Run npm run build in terminal
- [ ] Verify no TypeScript errors
- [ ] Verify no console warnings
- [ ] Check bundle size (should be <500KB)

---

### 6.2: Test Production Build Locally
**Command:** `npm run preview`  
**Effort:** 10 minutes  
**Impact:** Verify production behavior  

**Action Items:**
- [ ] Run npm run preview
- [ ] Test all routes (home, services, quote, contact, book, privacy, terms)
- [ ] Verify navigation works on mobile/desktop
- [ ] Check no mixed content warnings in console
- [ ] Test forms (quote, contact) submit properly

---

### 6.3: Mobile Safari/Chrome Test
**Effort:** 15 minutes  
**Impact:** Cross-device verification  

**Action Items:**
- [ ] Test on iPhone Safari (borrow device or use BrowserStack)
- [ ] Test on Android Chrome
- [ ] Verify video loads (or graceful fallback)
- [ ] Test form submission from mobile device
- [ ] Check touch targets are ≥48x48px
- [ ] Verify no horizontal scroll

---

### 6.4: Hostinger Deployment Dry-Run
**Effort:** 20 minutes  
**Impact:** Production readiness  

**Action Items:**
- [ ] Deploy to Hostinger staging/preview
- [ ] Test main URL and all routes
- [ ] Verify booking page works (if VITE_CALENDLY_URL set)
- [ ] Check no CORS errors
- [ ] Verify no mixed content warnings
- [ ] Test forms work on production domain
- [ ] Final visual inspection

---

## TESTING CHECKLIST (Before Final Deploy)

### Functionality
- [ ] All routes accessible (/, /services, /quote, /contact, /book, /privacy, /terms)
- [ ] Forms validate correctly (missing required fields show errors)
- [ ] Rate limiting works (5 submissions within 30 min blocked on 6th)
- [ ] Honeypot field not visible (tabindex=-1, off-screen)
- [ ] Logo displays correctly at all sizes
- [ ] Navigation sticky works on mobile scroll
- [ ] Mobile menu open/close works
- [ ] Accordion expand/collapse smooth
- [ ] Booking embed renders (if URL provided)

### Performance
- [ ] Lighthouse score ≥90 (desktop, mobile)
- [ ] LCP <2.5s (video loads quickly)
- [ ] FID <100ms (responsive interactions)
- [ ] CLS <0.1 (no layout shifts)
- [ ] Bundle size <500KB (gzipped)

### Accessibility
- [ ] All text has ≥4.5:1 contrast ratio
- [ ] Form labels linked properly (aria-label or <label>)
- [ ] Focus states visible (blue outline on inputs)
- [ ] Images have alt text
- [ ] Headings in logical order (H1 → H2 → H3)
- [ ] No keyboard traps
- [ ] Tab order sensible

### SEO
- [ ] Title tags unique and benefit-focused
- [ ] Meta descriptions accurate (<160 chars)
- [ ] H1 present on every page
- [ ] OG image present and renders in debugger
- [ ] Canonical URLs correct
- [ ] JSON-LD validates
- [ ] Sitemap includes all routes
- [ ] robots.txt allows crawling

### Mobile
- [ ] Responsive at 375px (small phone), 768px (tablet), 1024px (desktop)
- [ ] No horizontal scroll
- [ ] Tap targets ≥48x48px
- [ ] Sticky footer doesn't obscure content
- [ ] Form inputs use correct keyboard types (tel, email, etc.)
- [ ] Video doesn't autoplay on mobile (or muted)

### Security
- [ ] No console errors in production build
- [ ] No sensitive data in bundle (check with DevTools)
- [ ] Forms validate input (try SQL injection, XSS payloads)
- [ ] Rate limiting blocks rapid submissions
- [ ] Honeypot field hidden and checked
- [ ] No mixed content warnings (HTTPS URLs)
- [ ] VITE_CALENDLY_URL not hardcoded (use .env)

---

## TIMELINE ESTIMATE

| Phase | Effort | Timeframe |
|-------|--------|-----------|
| Phase 1 (Immediate Fixes) | 2 hours | Today |
| Phase 2 (Logo Design) | 2–3 hours | Tomorrow |
| Phase 3 (Booking) | 2–3 hours | Day 2–3 |
| Phase 4 (UI/UX) | 3–4 hours | Day 3–4 |
| Phase 5 (SEO/Compliance) | 1–2 hours | Day 4 |
| Phase 6 (Testing) | 1–2 hours | Day 4–5 |
| **TOTAL** | **~14–17 hours** | **~1 week (if part-time)** |

---

## ROLLBACK PLAN

If any phase breaks the build:
1. Revert to previous Git commit
2. Fix issue locally
3. Test on `npm run preview` before re-deploying
4. Never force-push to Hostinger without testing locally first

---

## POST-DEPLOYMENT CHECKLIST

- [ ] Monitor form submissions (check email/backend)
- [ ] Monitor console errors (set up Sentry if possible)
- [ ] Check Google Search Console for indexing status
- [ ] Verify booking embeds work (test from different device)
- [ ] Review mobile Safari compatibility (shared device test)
- [ ] Plan for SMS/call responses to quotes (staffing check)
- [ ] Set up email notifications for form submissions
- [ ] Review Privacy Policy one more time (compliance)

---

## REVISION HISTORY

| Date | Phase | Status |
|------|-------|--------|
| 2025-12-29 | All | Created comprehensive plan |


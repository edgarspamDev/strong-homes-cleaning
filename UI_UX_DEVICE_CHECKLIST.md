# UI/UX DEVICE-AGNOSTIC CHECKLIST
## Comprehensive Testing Guide for All Devices & Screens

**Updated:** December 29, 2025  
**Project:** StrongHomes Cleaning Services  
**Scope:** Mobile (small/large), tablet, desktop

---

## VIEWPORT SIZES TO TEST

| Device | Width | Height | Ratio | Priority |
|--------|-------|--------|-------|----------|
| **Small Phone** | 375px | 667px | 9:16 | 🔴 CRITICAL |
| **Large Phone** | 425px | 812px | 9:19 | 🔴 CRITICAL |
| **Tablet Portrait** | 768px | 1024px | 3:4 | 🟡 HIGH |
| **Tablet Landscape** | 1024px | 768px | 4:3 | 🟡 HIGH |
| **Desktop** | 1280px–1920px | — | 16:9–16:10 | 🟢 MEDIUM |

**How to Test:**
1. Chrome DevTools: `F12` → Click device icon (top-left)
2. Select device from dropdown (iPhone 12, iPad Air, Desktop)
3. Or manually set width/height in DevTools

---

## SPACING RHYTHM CHECKLIST

### Base Unit: 4px (Tailwind default)

- [x] Padding: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px
- [x] Margin: Same increments
- [x] Gap (between grid items): 12px (mobile), 16px (tablet), 24px (desktop)

### Headings
- [ ] H1: 32px mobile, 40px tablet, 48px desktop
- [ ] H2: 24px mobile, 28px tablet, 32px desktop
- [ ] H3: 20px mobile, 24px tablet, 28px desktop
- [ ] H4+: 16px mobile, 18px tablet, 20px desktop

### Line Height
- [ ] Body text: 1.5 (150%) for readability
- [ ] Headings: 1.2 (120%)

### Section Spacing
- [ ] Hero: min-height 100vh (phone), 80vh (tablet), 60vh (desktop)
- [ ] Sections: py-12 (mobile), py-16 (tablet), py-20 (desktop)

---

## TAP TARGET CHECKLIST

### Minimum Size: 48x48px (WCAG AAA standard)

**Touch Buttons:**
- [ ] CTA buttons (Get Quote, Book Now, Call) — 48x48px minimum
- [ ] Form submit buttons — 48x48px
- [ ] Mobile menu items — 44x44px minimum (acceptable)
- [ ] Links in text — underline + 8px padding for larger tap area

**Mobile Navigation:**
- [ ] Navbar height: ≥56px (Android) or ≥44px (iOS)
- [ ] Menu icon: 44x44px minimum
- [ ] Mobile menu items: 48x48px (text) with padding

**Form Inputs:**
- [ ] Input height: 44px minimum (iOS standard)
- [ ] Input width: full on mobile, container max on desktop
- [ ] Label: clickable (tied to input with <label> or aria-label)
- [ ] Checkboxes/radios: 48x48px interactive area

**Icons:**
- [ ] Icon size: 24px (header), 18px (inline text), 32px (large buttons)
- [ ] Icon + padding should total ≥48px for touch targets

---

## FORM KEYBOARD TYPES CHECKLIST

### Input Types (affects mobile keyboard)

- [ ] **Name:** `type="text"` (default keyboard)
- [ ] **Email:** `type="email"` (keyboard with @ symbol)
- [ ] **Phone:** `type="tel"` (numeric keyboard with + - # *)
- [ ] **ZIP Code:** `inputMode="numeric"` (numeric, no letters)
- [ ] **Message:** `<textarea>` (text keyboard)

### Expected Mobile Keyboards
- [ ] iOS: Name → ABC | Email → ABC with @ | Phone → 0-9 with +- | Textarea → ABC
- [ ] Android: Same behavior

### Test Steps
1. Click each form field on mobile
2. Verify correct keyboard appears
3. Verify input accepts expected characters only

---

## LOADING STATES CHECKLIST

### Visual Feedback Required

- [ ] **Quote Form Submit:**
  - Button text changes to "Sending..."
  - Spinner icon appears (Loader2 from lucide-react)
  - Button disabled (no double-click possible)
  - After 700ms+ visible wait, form actually submits

- [ ] **ZIP Validation:**
  - "Validating..." shown while checking
  - Success/error message appears (green/red)
  - Prevents next step until valid

- [ ] **Contact Form Submit:**
  - Same spinner + disabled state as Quote
  - Success message: "Message received" (green box, checkmark)

- [ ] **Booking Page Load:**
  - Calendly embed loads progressively
  - Fallback message if Calendly unavailable

### Timing
- [ ] Show spinner immediately on submit click
- [ ] Minimum visible time: 700ms (prevents flicker)
- [ ] Timeout: 10s max (then show error)

---

## FOCUS STATES CHECKLIST

### Keyboard Navigation (Tab Key)

- [ ] **All interactive elements have visible focus:**
  - Buttons: blue outline, inner shadow, or background change
  - Links: underline, color change, outline
  - Form inputs: 2px blue ring around border
  - Checkboxes/radios: blue ring around checkbox

- [ ] **Focus outline color:** Use brand gold (#C5A065) or blue (default)
  - Dark backgrounds: Light outline (white/gold)
  - Light backgrounds: Dark outline (#0B1120/blue)

- [ ] **No focus trap:** Tab key moves through all elements in logical order

- [ ] **Mobile focus:** (Less critical but test)
  - Touch on button → color change visible
  - Tap elsewhere → color resets

### Test Steps
1. Load page in desktop browser
2. Press `Tab` key repeatedly
3. Verify:
   - Every button/link/input gets focus outline
   - Outline is visible on both light/dark backgrounds
   - Order makes sense (left-to-right, top-to-bottom)
   - No elements skipped
   - No elements trapped

---

## CONTRAST CHECKLIST

### WCAG AA Standard: 4.5:1 ratio

**Text on Backgrounds:**
- [ ] White text on navy (#0B1120): Contrast = 17:1 ✅ PASS
- [ ] Navy text on white (#F8FAFC): Contrast = 17:1 ✅ PASS
- [ ] Gold text on navy (#C5A065 on #0B1120): Contrast = 4.5:1 ✅ PASS (barely)
- [ ] Navy text on gold (#0B1120 on #C5A065): Contrast = 4.5:1 ✅ PASS (barely)
- [ ] Slate-600 on white (#71717A on #FFFFFF): Contrast = 5.8:1 ✅ PASS

**Don't Use (Fails Contrast):**
- ❌ Light gray on white (too low contrast)
- ❌ Gold on light backgrounds (hard to read)
- ❌ Navy on dark blue (no separation)

### Test with Tools
1. Chrome DevTools: Right-click element → Inspect → Contrast in tooltip
2. Or use: https://webaim.org/resources/contrastchecker/
3. Or use: https://colourcontrast.cc/

---

## LAYOUT STABILITY CHECKLIST

### No Unexpected Shifts (CLS — Cumulative Layout Shift)

- [ ] **Hero section:**
  - Video loads without resizing hero container
  - No jump when video starts playing
  - Explicit `min-height: 100vh` prevents shift

- [ ] **Images:**
  - All images have explicit width/height or aspect-ratio
  - `<img>` tags include `width` and `height` attributes
  - No images load without dimensions

- [ ] **Forms:**
  - Input height consistent (no growth when focused)
  - Error messages don't shift layout (use `min-height` or margin-reserve)
  - Loading spinners appear in-place (not appended below)

- [ ] **Sticky Elements:**
  - Navbar height constant (no jiggle when scrolling)
  - Mobile sticky CTA stays fixed without layout jump

- [ ] **Modals/Tooltips:**
  - If used, fixed positioning (not causing page reflow)
  - No scroll bar toggle (reserve space with overflow-y: scroll)

### Test with Lighthouse
1. Chrome DevTools → Lighthouse → Run audit
2. Check "Cumulative Layout Shift" score (should be <0.1)
3. Red sections = layout shifts; identify and fix

---

## PERFORMANCE BUDGETS CHECKLIST

### Core Web Vitals

**LCP (Largest Contentful Paint):** <2.5s
- [ ] Hero video or image loads quickly
- [ ] No render-blocking CSS/JS
- [ ] Test: Lighthouse report shows <2.5s

**FID (First Input Delay):** <100ms
- [ ] Buttons respond instantly
- [ ] Form inputs don't lag
- [ ] No heavy JS during interaction

**CLS (Cumulative Layout Shift):** <0.1
- [ ] No layout shifts (see above)
- [ ] Stable scrolling experience

### Bundle Size
- [ ] Total JS: <400 KB (uncompressed)
- [ ] Total CSS: <50 KB (uncompressed)
- [ ] Gzipped: <100 KB JS + <10 KB CSS
- [ ] Load time on 4G: <3 seconds

---

## DEVICE-SPECIFIC TESTING

### iPhone 12 (375x812px) 🔴 CRITICAL

**Hardware:**
- [ ] Notch at top doesn't cover content (safe area)
- [ ] No horizontal scroll (content fits 375px width)
- [ ] Bottom safe area (notch on iPhone 14+) doesn't cover CTA

**Safari Features:**
- [ ] Address bar bottom behavior (iOS 15+): content doesn't jump
- [ ] Video plays (muted autoplay required)
- [ ] Form keyboard doesn't hide important content
- [ ] Links are tap-friendly (48px+)

**Status Bar:**
- [ ] No content hidden behind status bar
- [ ] Safe area padding applied

### Samsung Galaxy S21 (360x800px) 🔴 CRITICAL

**Hardware:**
- [ ] No notch or punch-hole covers content
- [ ] No horizontal scroll
- [ ] Button row at bottom doesn't interfere

**Chrome Features:**
- [ ] Video plays (muted autoplay required)
- [ ] Form behavior same as desktop Chrome
- [ ] Back button works (hash routing intact)

### iPad (768x1024px landscape) 🟡 HIGH

**Hardware:**
- [ ] Content centered (not stretched to full width)
- [ ] No awkward spacing (use `max-w-7xl` container)
- [ ] Grid layout: 2 columns minimum on tablet

**Keyboard:**
- [ ] Form inputs appropriately sized (not tiny text)
- [ ] On-screen keyboard doesn't hide submit button

### Desktop (1280px+) 🟢 MEDIUM

**Styling:**
- [ ] Content centered with `max-w-7xl` (1280px max)
- [ ] Sidebar/grid layouts use full width smartly
- [ ] Not stretched thin

**Hover States:**
- [ ] Links underline/color change on hover
- [ ] Buttons change color on hover
- [ ] Icons highlight (color shift)

---

## ACCESSIBILITY CHECKLIST

### Screen Readers (NVDA, JAWS, iOS VoiceOver)

- [ ] **Semantic HTML:**
  - H1 present on every page
  - Headings nested logically (H1 → H2 → H3, not H1 → H3)
  - Form labels linked to inputs (`<label for="id">` or wrapping input)
  - Lists use `<ul>/<ol>/<li>` for lists
  - Buttons are `<button>`, links are `<a>`

- [ ] **ARIA Labels:**
  - Form fields have labels (visible or aria-label)
  - Icon-only buttons have aria-label or title
  - Hidden honeypot field has `aria-hidden="true"`
  - Spinners: no aria-label needed (visual only)

- [ ] **Form Errors:**
  - Error messages linked to inputs (aria-describedby)
  - Error text reads aloud
  - Focus returns to problematic field

- [ ] **Links:**
  - Link text describes destination ("Get Quote" not "Click Here")
  - External links noted (via title or aria-label)

### Color Blindness
- [ ] Don't rely on color alone (use icons, text, patterns)
- [ ] Red/green errors: also show icon or text
- [ ] Gold highlights: also use text/shape

### Mobile Accessibility
- [ ] VoiceOver (iOS): Test with Accessibility Inspector
- [ ] TalkBack (Android): Test with accessibility menu
- [ ] No gesture-only controls (provide alternative)

---

## PERFORMANCE TESTING STEPS

### Step 1: Lighthouse Audit (DevTools)
```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select Mobile or Desktop
4. Click "Analyze page load"
5. Check scores:
   - Performance: ≥90
   - Accessibility: ≥90
   - Best Practices: ≥90
   - SEO: ≥90
```

### Step 2: PageSpeed Insights
```
1. Go to https://pagespeed.web.dev/
2. Enter URL: https://yourdomain.com
3. Check scores (same as Lighthouse)
4. Review suggestions for improvements
```

### Step 3: WebPageTest
```
1. Go to https://www.webpagetest.org/
2. Enter URL
3. Select location (USA, Chicago if available)
4. Check:
   - First Contentful Paint (FCP): <1.8s
   - Largest Contentful Paint (LCP): <2.5s
   - Cumulative Layout Shift (CLS): <0.1
```

---

## CROSS-BROWSER TESTING

### Browsers to Test

| Browser | Mobile | Desktop | Priority |
|---------|--------|---------|----------|
| **Chrome** | ✅ | ✅ | Primary |
| **Safari** | ✅ (iOS) | ✅ (Mac) | High |
| **Firefox** | ✅ | ✅ | Medium |
| **Samsung Internet** | ✅ | — | High (Android) |

### What to Check Per Browser
- [ ] Pages load without errors
- [ ] Forms work (input, validation, submit)
- [ ] Video plays (or fallback shows)
- [ ] Layout looks correct (no stretched elements)
- [ ] Buttons respond to clicks/taps
- [ ] Mobile menu opens/closes
- [ ] No console errors (F12 → Console tab)

---

## NETWORK CONDITIONS TO TEST

### Throttling Scenarios

**Scenario 1: Fast 4G (Typical mobile)**
- [ ] Run Lighthouse with "Throttle: Fast 4G"
- [ ] Page should load in <5 seconds
- [ ] LCP <2.5s

**Scenario 2: Slow 4G (Poor connection)**
- [ ] In DevTools: Network tab → Throttle: Slow 4G
- [ ] Page should still be usable in <10s
- [ ] Form inputs work (may be slow)

**Scenario 3: Offline/3G**
- [ ] Offline: DevTools → Network → Offline
- [ ] Shows fallback message (if applicable)
- [ ] Booking embed should fallback to link

---

## FINAL VERIFICATION CHECKLIST

### Before Launch, Verify All Devices:

**Mobile (iPhone/Android) 🔴 CRITICAL**
- [ ] All routes work (`/`, `/services`, `/quote`, `/contact`, `/book`, `/privacy`, `/terms`)
- [ ] Forms validate and submit
- [ ] Keyboard types correct (tel for phone, email for email)
- [ ] No horizontal scroll
- [ ] Tap targets ≥48px
- [ ] Sticky elements don't cause jank
- [ ] Video loads or fallback works
- [ ] Booking embed renders or fallback link works

**Tablet 🟡 HIGH**
- [ ] Grid layouts work (2+ columns)
- [ ] Spacing looks balanced (not stretched)
- [ ] Forms easy to fill (not cramped)
- [ ] Landscape mode works (if tested)

**Desktop 🟢 MEDIUM**
- [ ] Content centered (max-w-7xl)
- [ ] Hover states work
- [ ] Layout looks professional
- [ ] No awkward white space

**Accessibility 🔴 CRITICAL**
- [ ] Tab navigation works (all elements reachable)
- [ ] Focus states visible (blue outline)
- [ ] Contrast ≥4.5:1 (check with tool)
- [ ] Form labels present
- [ ] Errors announced to screen readers

**Performance 🟡 HIGH**
- [ ] Lighthouse ≥90 (mobile)
- [ ] LCP <2.5s
- [ ] CLS <0.1
- [ ] No console errors
- [ ] Load time <5s on 4G

---

## COMMON ISSUES & FIXES

| Issue | Cause | Fix |
|-------|-------|-----|
| Horizontal scroll on mobile | Content wider than 375px | Check max-width, padding, overflow |
| Small tap targets | Buttons <48px | Add padding or min-width |
| Shifted layout on video load | No height set on container | Add `min-height: 100vh` or explicit height |
| Keyboard hidden field shown | Honeypot visible | Check `aria-hidden`, `tabindex="-1"`, off-screen positioning |
| Form input too small | Default size too small | Set `min-height: 44px` |
| Gold text unreadable | Contrast <4.5:1 | Use on navy background only, or add text shadow |
| Video not autoplaying | Missing muted attribute | Add `muted` + `autoPlay` props |
| Slow load on 4G | Large images/JS bundle | Optimize images, lazy-load below fold |

---

## TESTING SCHEDULE

**Recommended:** Test across all devices/conditions before each major release

### Pre-Launch Checklist (24 hours before go-live)
- [ ] Mobile: iPhone + Android (real devices if possible)
- [ ] Tablet: iPad in portrait/landscape
- [ ] Desktop: 1280px + 1920px widths
- [ ] Lighthouse audit: ≥90 all scores
- [ ] Accessibility: Tab navigation + screen reader test
- [ ] Network: Test on 4G throttle

### Ongoing (Weekly)
- [ ] Spot check on mobile (one page per day)
- [ ] Monitor console errors (DevTools → Console)
- [ ] Monitor Lighthouse (use scheduled audits)

### Post-Deployment (Daily for 1 week)
- [ ] Test on multiple devices
- [ ] Monitor error logs
- [ ] Check form submissions work
- [ ] Verify booking integration

---

## REVISION HISTORY

| Date | Update | Status |
|------|--------|--------|
| 2025-12-29 | Created device-agnostic checklist | ✅ Complete |


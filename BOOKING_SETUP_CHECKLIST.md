# BOOKING INTEGRATION SETUP CHECKLIST

**For:** Calendly or Cal.com integration on Hostinger static hosting  
**Updated:** December 29, 2025  
**Status:** Ready for implementation

---

## PRE-SETUP CHECKLIST

Before you begin, confirm:
- [ ] You have a Calendly or Cal.com account (or will create one)
- [ ] You have admin access to Hostinger cPanel or file manager
- [ ] You have npm/Node.js installed locally
- [ ] You have read the [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)

---

## PHASE 1: CREATE BOOKING PAGE (LOCAL DEV)

### Step 1.1: Add /book Route to App.tsx

**File:** [App.tsx](App.tsx)

Add this import:
```tsx
import Book from './pages/Book';
```

Add this route to `<Routes>`:
```tsx
<Route path="/book" element={<Book />} />
```

### Step 1.2: Create pages/Book.tsx Component

**File:** `pages/Book.tsx` (NEW)

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

### Step 1.3: Test Locally

```bash
cd "c:\Users\Hunti\Downloads\strong-homes-cleaning (2)"
npm run dev
```

Navigate to `http://localhost:3000/#/book` and verify:
- [ ] Page loads
- [ ] No TypeScript errors
- [ ] Fallback message appears (VITE_CALENDLY_URL not set yet)

---

## PHASE 2: SET UP CALENDLY OR CAL.COM

### Option A: Calendly (Recommended for simplicity)

#### A.1: Create Calendly Account
1. Go to https://calendly.com/signup
2. Sign up with your email
3. Choose "Services Business" as your profile type
4. Complete onboarding

#### A.2: Create Event Type
1. Click **"Event Types"** in left menu
2. Click **"+ New Event Type"**
3. Fill in:
   - **Event Name:** `15-min Cleaning Consult` (or similar)
   - **Duration:** 15 minutes
   - **Meeting Type:** Phone Call (or Zoom, depends on your preference)
   - **Buffer Time:** 15 minutes (between appointments)
   - **Minimum Notice:** 24 hours

4. Click **"Continue"**
5. Set your availability:
   - **Timezone:** America/Chicago
   - **Days:** Mon–Sat
   - **Hours:** 8:00 AM – 6:00 PM
   - Add additional hours if needed
   - Mark unavailable dates if needed

6. Click **"Continue"**
7. Questions & notifications:
   - Check **"Required Questions"**
   - Add:
     - Full Name (required)
     - Email (required)
     - Phone Number (required)
     - ZIP Code (optional)
     - Service Type: Standard / Deep / Move-In/Out (dropdown, required)
     - Preferred Date (optional)
   - Confirmation Email: Default is fine
   - Click **"Continue"**

8. Click **"Done"** to save

#### A.3: Get Your Calendly URL
1. In Calendly, click **"Share"** button (top right)
2. Copy the **Public Booking Link**
3. It will look like: `https://calendly.com/yourusername/15-min-consult`
4. Save this URL

#### A.4: Add to Environment Variables
Create or update `.env.local` in your project root:

```bash
VITE_CALENDLY_URL=https://calendly.com/yourusername/15-min-consult
```

(Replace with your actual URL from Step A.3)

#### A.5: Test in Dev
```bash
npm run dev
```

Navigate to `http://localhost:3000/#/book` and verify:
- [ ] Calendly embed loads on page
- [ ] Calendar is visible and clickable
- [ ] No console errors

---

### Option B: Cal.com (More customizable)

#### B.1: Create Cal.com Account
1. Go to https://cal.com/signup
2. Sign up with your email
3. Verify email

#### B.2: Create Event Type
1. Click **"Event Types"** in left sidebar
2. Click **"New Event Type"** → **"Teams Event"**
3. Fill in:
   - **Title:** `Cleaning Estimate Call`
   - **Duration:** 15 minutes
   - **Slug:** `cleaning-estimate`
   - **Description:** `15-minute consultation to discuss your cleaning needs and provide an estimate.`

4. Setup availability:
   - **Timezone:** America/Chicago
   - Add your availability (Mon–Sat, 8am–6pm)

5. Setup form fields:
   - Add custom fields for:
     - ZIP Code
     - Service Type
     - Preferred Time

6. Save

#### B.3: Get Your Booking URL
1. Copy your public URL from Cal.com dashboard
2. Format: `https://cal.com/yourusername/cleaning-estimate`

#### B.4: Add to Environment Variables
```bash
VITE_CALENDLY_URL=https://cal.com/yourusername/cleaning-estimate
```

(Cal.com URLs also work with Calendly embed script; if issues arise, use Cal.com's native embed method)

#### B.5: Test in Dev
```bash
npm run dev
```

Navigate to `http://localhost:3000/#/book`

---

## PHASE 3: BUILD FOR PRODUCTION

### Step 3.1: Build Locally
```bash
npm run build
```

Verify:
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] dist/ folder created

### Step 3.2: Preview Build Locally
```bash
npm run preview
```

Test in browser:
- [ ] Navigate to `http://localhost:4173/#/book`
- [ ] Booking embed loads correctly
- [ ] Try clicking on a time slot (confirm Calendly/Cal.com opens)
- [ ] Check for mixed content warnings in console (should be none)
- [ ] Test on mobile browser (iPhone/Android simulator or device)

---

## PHASE 4: DEPLOY TO HOSTINGER

### Step 4.1: Connect to Hostinger

**Option A: Hostinger File Manager (Easiest)**
1. Log in to Hostinger cPanel
2. Go to **File Manager** → Navigate to your domain's public folder (usually `public_html/`)
3. Delete existing files (if any) **except** `.htaccess` and `robots.txt`

**Option B: FTP Upload**
1. Note your FTP credentials from Hostinger
2. Use FileZilla or similar to connect
3. Upload contents of `dist/` folder to `public_html/` on your hosting

### Step 4.2: Upload Build Files

**Method A: Manual Upload**
1. In File Manager, click **"Upload"**
2. Select all files from your local `dist/` folder
3. Upload (this may take 1–2 minutes)

**Method B: Terminal Upload (If you have terminal access)**
```bash
# From your local project:
npm run build
rsync -az dist/ your_username@your_host.com:/public_html/
```

### Step 4.3: Create/Update .htaccess

In your Hostinger `public_html/` folder, create/update `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures hash routes work correctly (`/#/book`, `/#/services`, etc.)

### Step 4.4: Verify VITE_CALENDLY_URL in Production

⚠️ **IMPORTANT:** Environment variables in `.env.local` do NOT get deployed.

You have two options:

**Option 1: Hardcode in production build (NOT RECOMMENDED)**
- Edit `components/BookingEmbed.tsx` and hard-code the URL
- This works but is less secure

**Option 2: Set environment variable on Hostinger**
1. In Hostinger cPanel, go to **Environment Variables** (if available)
2. Add: `VITE_CALENDLY_URL=https://calendly.com/yourusername/...`
3. Rebuild locally with that value, deploy

**Option 3: Use a build script**
- Before deployment, replace the placeholder in your build
- Example: `npm run build && sed -i 's/PLACEHOLDER/YOUR_REAL_URL/g' dist/index.html`

For now, we recommend **Option 1** (test works without it; fallback message appears).

---

## PHASE 5: VERIFICATION CHECKLIST

### Functionality Tests

- [ ] **Homepage loads:** `https://yourdomain.com/`
- [ ] **Booking page accessible:** `https://yourdomain.com/#/book`
- [ ] **Booking embed visible:** On `/book` page, see Calendly/Cal.com widget
- [ ] **Fallback link works:** If no embed, fallback link opens Calendly in new window
- [ ] **All routes accessible:**
  - `/#/` (home)
  - `/#/services` (services)
  - `/#/quote` (quote)
  - `/#/contact` (contact)
  - `/#/book` (booking) ← NEW
  - `/#/privacy` (privacy)
  - `/#/terms` (terms)

### Mobile Tests (Critical!)

- [ ] **Test on iPhone Safari:**
  - Load `https://yourdomain.com/#/book`
  - See if Calendly embed loads
  - Try tapping on a time slot
  - Confirm no horizontal scroll
  - Check form can be filled

- [ ] **Test on Android Chrome:**
  - Same as above
  - Also test hardware back button (should go back, not break)

- [ ] **Test on different WiFi network:**
  - Confirm booking works from outside your local WiFi
  - No CORS errors in console

### Security & Performance

- [ ] **No mixed content warnings:** Open DevTools → Console, check no red HTTPS/mixed content errors
- [ ] **No exposed keys:** DevTools → Sources, search for API keys (should be none visible)
- [ ] **HTTPS only:** All requests should use `https://`, not `http://`
- [ ] **Loading speed:** Booking page should load in <3 seconds

### Booking Integration Tests

- [ ] **Book a test appointment:**
  1. On `/#/book`, click a time slot
  2. Fill in your details
  3. Confirm appointment in Calendly/Cal.com dashboard
  4. Check if confirmation email received

- [ ] **Fallback link works:**
  1. If Calendly fails to load, fallback link should be clickable
  2. Opens Calendly in new tab

- [ ] **Reschedule/cancel in Calendly:**
  1. Go to Calendly dashboard
  2. View your test appointment
  3. Verify you can reschedule or cancel

### Final Visual Check

- [ ] **Logo loads** (header)
- [ ] **Colors look right** (navy, gold, white)
- [ ] **Form inputs are responsive**
- [ ] **Mobile menu opens/closes** (if hamburger visible)
- [ ] **Footer displays correctly**
- [ ] **No broken images**

---

## TROUBLESHOOTING

### Issue: Booking embed doesn't load on Hostinger

**Solution:**
1. Check `.env` variable is set: `VITE_CALENDLY_URL=...`
2. Rebuild: `npm run build`
3. Check `dist/index.html` contains your URL (search for "calendly.com")
4. If still blank, try fallback: hard-code URL in `BookingEmbed.tsx`

### Issue: Hash routes don't work (e.g., `/#/book` shows 404)

**Solution:**
1. Verify `.htaccess` is in `public_html/` (see Step 4.3)
2. Check RewriteEngine is enabled in cPanel (Server > Apache Modules)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test in incognito mode

### Issue: Mixed content error (HTTPS ↔ HTTP)

**Solution:**
1. Ensure Calendly URL is `https://`, not `http://`
2. Ensure your Hostinger domain uses HTTPS (usually auto-enabled)
3. Check CSP headers don't block Calendly:
   - In cPanel → Headers, check Content-Security-Policy
   - Should allow `*.calendly.com` or `frame-src *`

### Issue: Booking form doesn't submit

**Solution:**
1. Check Calendly/Cal.com settings:
   - Required fields are marked
   - Timezone is correct (America/Chicago)
   - Availability is set for current/future dates
2. Try booking at a different time
3. Refresh the page and try again

### Issue: "VITE_CALENDLY_URL not set" message appears

**This is expected if:**
- You haven't set the `.env.local` file locally
- You haven't deployed with the environment variable to Hostinger

**Fix:**
- For development: Create `.env.local` with `VITE_CALENDLY_URL=...`
- For production: Set on Hostinger or hard-code in build

---

## POST-DEPLOYMENT CHECKLIST

After deploying to Hostinger:

- [ ] Test booking from 3+ different devices (not on your WiFi)
- [ ] Verify confirmation emails reach your inbox
- [ ] Check Calendly/Cal.com dashboard for appointments
- [ ] Monitor for booking errors (check Hostinger error logs)
- [ ] Monitor form submissions (check email/backend)
- [ ] Set up SMS/call workflow to respond to bookings
- [ ] Plan staffing to handle booked times
- [ ] Create auto-reply if needed (e.g., "We'll confirm within 4 hours")

---

## QUICK REFERENCE

| Service | URL | Setup Time | Recommendation |
|---------|-----|-----------|-----------------|
| **Calendly** | https://calendly.com | 5 min | ✅ Recommended (simple, reliable) |
| **Cal.com** | https://cal.com | 10 min | ✅ Good alternative (more control) |

---

## REVISION HISTORY

| Date | Version | Status |
|------|---------|--------|
| 2025-12-29 | 1.0 | Created comprehensive checklist |


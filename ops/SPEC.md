# Technical Specification: Strong Homes Cleaning

## 1. Architecture
- **Framework:** React 18 (Vite) + TypeScript
- **Styling:** Tailwind CSS (Mobile First)
- **Routing:** React Router (HashRouter for simple shared hosting compatibility)
- **Deployment:** Hostinger (Static or Node.js)

## 2. Core Pages
1.  **Home (`/`)**: Hero Video, Trust Stack, Services Grid, Reviews (if real), FAQ, CTA.
2.  **Services (`/services`)**: Detailed breakdown of Standard vs. Deep vs. Move-in/out.
3.  **Service Areas (`/locations`)**: Grid of city links.
4.  **City Landing Pages (`/locations/:city`)**: SEO-optimized local pages.
5.  **Quote Funnel (`/quote` or Modal)**: Multi-step intake.
6.  **Contact (`/contact`)**: Simple form + Map + Contact Info.

## 3. The "Beat Them" Funnel
**Goal:** High-friction filter (Zip) followed by low-friction engagement.

1.  **Step 1: Location Check**
    - Input: Zip Code or City Dropdown.
    - Logic: Validate against allowed list. If invalid, show "Join Waitlist".
2.  **Step 2: Service Type**
    - Cards: Standard, Deep, Move-In/Out.
3.  **Step 3: Property Details**
    - Sliders/Buttons: Bedrooms (1-6+), Bathrooms (1-5+).
    - Optional: Approx Sq Ft (Range).
4.  **Step 4: Preferences**
    - Frequency: One-time, Weekly (Save 15%), Bi-Weekly (Save 10%), Monthly (Save 5%).
    - *Note: Savings % are placeholders until confirmed.*
5.  **Step 5: Contact**
    - Name, Phone, Email.
    - "Get My Estimate" Button.

## 4. Performance Requirements
- **Lighthouse:** >90 Performance, >90 Accessibility.
- **Hero Video:** Must use `<video>` tag with `preload="metadata"` and `poster`.
- **Images:** WebP format, lazy loading for below-fold.

## 5. Security Requirements
- **Forms:** Honeypot field `_gotcha`.
- **Inputs:** Sanitized. No SQL injection risks (client-side rendering).
- **Data:** No PII in URL parameters.

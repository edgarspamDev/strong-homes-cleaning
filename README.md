# Strong Homes Cleaning

Professional cleaning services marketing website for Lake & Porter Counties, Indiana. This modern, secure web application helps homeowners request quotes and book cleaning services.

Built with React, TypeScript, Vite, and Tailwind CSS with enterprise-grade security hardening.

## What This Website Does

Strong Homes Cleaning is a lead-generation and marketing website that allows potential customers to:

- **Browse Services** - View residential and commercial cleaning packages (Standard, Deep Clean, Move In/Out)
- **Get Instant Quotes** - Fill out a multi-step form to receive pricing estimates
- **Book Appointments** - Contact the business directly or schedule via embedded booking widget
- **Learn About the Company** - Read about service areas, guarantees, and trust indicators

The site is optimized for local SEO in Lake & Porter Counties, Indiana, and includes ZIP code validation to enforce the service area.

---

## Highlights
- Secure multi-step quote and contact flows with validation, sanitization, honeypot, and client-side rate limiting (3 per 10 minutes)
- Strict ZIP code allowlist to enforce Lake/Porter service area
- Strong security headers for Hostinger and static hosts (CSP, X-Frame-Options, HSTS, etc.)
- Zero CDN dependency for styles; minimal bundle (~100 KB gzipped)
- HashRouter routing for static hosting; BrowserRouter-ready with existing rewrite rules

## Security Hardening
- Input validation and sanitization on all fields (email, phone, ZIP, name, message)
- Client-side rate limiting plus honeypot to deter spam
- ZIP allowlist (Lake/Porter) blocks out-of-area submissions at step 1
- Content Security Policy, clickjacking protection, and HTTPS enforcement via .htaccess/_headers
- No dangerouslySetInnerHTML usage; no external CSS/JS CDNs

**Security grade:** A+ (SecurityHeaders.com). See SECURITY_AUDIT_REPORT.md for the full audit.

## Tech Stack
- React 18, TypeScript 5, Vite 6, Tailwind CSS 4, React Router 7 (HashRouter), Lucide React, React Helmet Async
- Tooling: PostCSS, Autoprefixer

## Project Structure (key files)

- **pages/** - Page-level routes (Home, Services, Quote, Contact, Terms, Privacy)
- **components/** - UI sections (Hero, Navbar, TrustBar, ServiceGrid, CTA, Footer)
- **utils/** - base.ts, security.ts (validation, rate limiting, ZIP allowlist)
- **public/** - Static assets, .htaccess, _headers, sitemap.xml, robots.txt
- **src/index.css** - Tailwind entry and theme tokens
- **App.tsx** - Router setup (HashRouter)
- **index.tsx** - React entry

## Getting Started
Prerequisites: Node.js 18+ and npm.

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build (outputs to dist/)
npm run preview      # serve the production build locally
```

## Configuration
- VITE_CALENDLY_URL (in .env): booking link used by the booking embed.
- To switch to BrowserRouter: change <HashRouter> to <BrowserRouter> in App.tsx. Rewrites already exist in .htaccess and public/_headers.

## Deployment
- Hostinger: follow HOSTINGER_DEPLOYMENT.md; upload dist/ to public_html/ and include .htaccess.
- Netlify/Vercel: deploy dist/; public/_headers carries the security headers.
- CloudFront/other static hosts: mirror headers from .htaccess or _headers.

## Manual QA Checklist
- Navigation: all routes load (/#/contact, /#/services, etc.) with no 404s.
- Forms: valid inputs succeed; invalid email/phone/ZIP are blocked; 4th submit in 10 minutes is rate-limited; honeypot rejects bots.
- Security headers: curl -I https://yourdomain.com shows CSP, X-Frame-Options, and HSTS/redirect.
- Performance: no console errors or CSP violations; layout stable (no CLS).

## Documentation
- SECURITY_AUDIT_REPORT.md - security audit details
- HOSTINGER_DEPLOYMENT.md - deployment guide
- TAILWIND_MIGRATION.md - Tailwind bundling notes

## License
MIT License - see LICENSE.


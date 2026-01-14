# Security Checklist

## 1. Form Security
- [ ] **Honeypot:** Hidden field `_gotcha` to trap bots.
- [ ] **Rate Limiting:** If using custom API, limit 5 req/hour per IP.
- [ ] **Sanitization:** All inputs treated as strings, HTML escaped before rendering (React handles most of this).
- [ ] **Min Submit Time:** Require at least 700ms before accepting submit to slow bots.

## 2. Data Privacy
- [ ] **HTTPS:** Enforced by Hostinger SSL.
- [ ] **Storage:** Do not store sensitive lead data in LocalStorage.
- [ ] **Third-party:** Check `referrerpolicy="strict-origin-when-cross-origin"` on iframes.
- [ ] **CSP/Frames:** If headers allowed, use `default-src 'self'; script-src 'self' https://assets.calendly.com; style-src 'self' 'unsafe-inline' https://assets.calendly.com; frame-src https://calendly.com; img-src 'self' data:`. Add `X-Frame-Options` only if not embedding Calendly.

## 3. Deployment
- [ ] **Environment Variables:** API Keys (Stripe Publishable Key is OK, Secret Key is FORBIDDEN).
- [ ] **Source Maps:** Disable generation for production build to hide source code structure.
- [ ] **Headers:** Set `X-Frame-Options: DENY` (if running custom Node server).
- [ ] **Dependency Audit:** Run `npm audit --production` monthly and address highs/critical. Document in ops.

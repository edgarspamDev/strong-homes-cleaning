# Security Policy and Operational Practices

This project is hardened for static hosting and prepared for a future backend. Follow these guidelines to keep it secure in production.

## Secrets and Configuration
- Never commit `.env` files; keep environment-specific values outside git.
- Use unique secrets per environment; rotate periodically.
- If you add a backend, store secrets in the platform’s secret manager (not in source).

## Frontend Safety
- CSP, HSTS, and clickjacking headers are defined in `.htaccess` (Hostinger) and `public/_headers` (Netlify/Vercel). Keep them in place.
- No external CSS/JS CDNs are used; keep it that way to reduce supply-chain risk.
- Avoid `dangerouslySetInnerHTML`; sanitize any future HTML input.
- HashRouter is default for static hosts; if switching to BrowserRouter, keep rewrite rules in place to avoid 404s.

## Validation and Abuse Protection
- Current validation/rate-limit/honeypot is client-side only; do not rely on it as a security boundary.
- When you add a backend, mirror the validation rules server-side and add IP-based rate limiting and bot protection (CAPTCHA/Turnstile).
- Log errors and suspicious activity on the server with minimal PII.

## Dependency Hygiene
- Run `npm audit` and `npm outdated` regularly; apply security patches.
- Use the provided type check (`npm run lint`) in CI/PRs to prevent type regressions.
- Prefer `npm ci` in CI to ensure lockfile fidelity.

## Deployment
- Hostinger: upload `dist/` plus `.htaccess`; ensure HTTPS is enabled and forced.
- Netlify/Vercel/other static hosts: mirror headers from `public/_headers`.
- Verify headers after deployment: `curl -I https://yourdomain.com` and check CSP, X-Frame-Options, HSTS.

## Monitoring and Reporting
- Add CSP reporting (report-to/report-uri) to observe violations in production.
- Set up synthetic uptime checks for `/#/` key routes and alert on failures.
- If you discover a security issue, remove public access to affected assets, rotate relevant secrets, and patch before redeploying.

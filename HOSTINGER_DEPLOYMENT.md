# Hostinger Deployment Guide

## Overview

This guide covers deploying the Strong Homes Cleaning website to Hostinger shared hosting with all security features enabled.

---

## Pre-Deployment Checklist

### 1. Build the Application
```bash
cd "c:\Users\Hunti\Downloads\strong-homes-cleaning (2)"
npm run build
```

**Expected output:**
```
✓ built in ~2s
dist/index.html                   1.23 kB │ gzip:  0.64 kB
dist/assets/index-[hash].css     ~34 kB   │ gzip: ~6 kB
dist/assets/index-[hash].js     ~307 kB   │ gzip: ~93 kB
```

### 2. Verify Build Contents
The `dist/` folder should contain:
- `index.html`
- `assets/` folder with CSS and JS bundles
- `.htaccess` (security headers configuration)
- Any other static assets (images, icons, etc.)

---

## Deployment Steps

### Step 1: Access Hostinger File Manager

1. Log into your Hostinger control panel (hPanel)
2. Navigate to **File Manager**
3. Go to `public_html` directory (or your domain's root directory)

### Step 2: Upload Build Files

**Option A: Via File Manager (Recommended for small sites)**
1. Delete any existing files in `public_html` (or backup first)
2. Upload all files from the `dist/` folder to `public_html`
3. Ensure `.htaccess` is uploaded (it may be hidden - enable "Show hidden files")

**Option B: Via FTP (Recommended for larger deployments)**
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect using credentials from Hostinger control panel
3. Navigate to `public_html`
4. Upload all `dist/` contents
5. Set file permissions to 644 for files, 755 for directories

### Step 3: Verify .htaccess is Active

1. Check that `.htaccess` exists in `public_html`
2. Verify file permissions are set to 644
3. File should contain security headers and rewrite rules

**To verify headers are working:**
```bash
curl -I https://yourdomain.com
```

Look for these headers in the response:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: ...`

---

## Security Headers Configuration

### What's Included in .htaccess

The `public/.htaccess` file configures:

1. **Security Headers:**
   - X-Content-Type-Options
   - Referrer-Policy
   - X-Frame-Options
   - Permissions-Policy
   - Content-Security-Policy

2. **HTTPS Redirect:**
   - Automatically redirects HTTP to HTTPS (if SSL is enabled)

3. **HashRouter Support:**
   - Rewrites all routes to index.html for React Router

4. **File Protection:**
   - Denies access to sensitive files (.bak, .config, .sql, etc.)
   - Disables directory browsing

5. **Performance Optimization:**
   - GZIP compression
   - Browser caching for static assets

### SSL/HTTPS Configuration

**Enable SSL on Hostinger:**
1. Go to hPanel → SSL
2. Install free Let's Encrypt SSL certificate
3. Force HTTPS (this is already configured in .htaccess)

---

## Post-Deployment Verification

### 1. Test Website Functionality

✅ **Homepage loads:** Visit https://yourdomain.com
✅ **Navigation works:** Click all menu items (Home, Services, Quote, Contact)
✅ **HashRouter works:** URLs should be like `https://yourdomain.com/#/contact`
✅ **Styles load:** Check that Tailwind CSS is working (no unstyled content)

### 2. Test Forms

**Contact Form:**
1. Fill out form with valid data
2. Submit - should show success message
3. Try submitting 4 times rapidly - should show rate limit error on 4th attempt
4. Wait 10 minutes and rate limit should reset

**Quote Form:**
1. Enter valid ZIP code (e.g., 46375 - Valparaiso)
2. Should proceed to next step
3. Try invalid ZIP (e.g., 60601 - Chicago)
4. Should show error: "Sorry, we currently only serve Lake and Porter Counties..."

### 3. Test Security Headers

**Using Browser DevTools:**
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on the main document request
5. Check Response Headers

**Expected Headers:**
```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()...
Content-Security-Policy: default-src 'self'; ...
```

**Using Online Tools:**
- [SecurityHeaders.com](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)

Expected Grade: **A** or **A+**

### 4. Test CSP (Content Security Policy)

1. Open browser console (F12 → Console)
2. Reload page
3. **Should NOT see any CSP violation errors**
4. All resources should load from same origin (except React modules from esm.sh)

### 5. Test Performance

**Check Loading Speed:**
- Use [PageSpeed Insights](https://pagespeed.web.dev)
- Use [GTmetrix](https://gtmetrix.com)

**Expected Performance:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total page size (gzipped): ~100 KB

---

## Troubleshooting

### Issue: 404 Errors on Routes

**Symptom:** Direct links like `/contact` show 404 error

**Solution:**
1. Verify `.htaccess` is in `public_html`
2. Check that mod_rewrite is enabled (should be default on Hostinger)
3. Ensure this line is in `.htaccess`:
   ```apache
   RewriteRule . /index.html [L]
   ```

### Issue: Styles Not Loading

**Symptom:** Website appears unstyled (no colors, broken layout)

**Solution:**
1. Check browser console for CSS loading errors
2. Verify `assets/` folder was uploaded with CSS file
3. Check file permissions (should be 644)
4. Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue: Headers Not Applied

**Symptom:** Security headers missing in HTTP response

**Solution:**
1. Verify `.htaccess` file permissions (should be 644)
2. Check that mod_headers is enabled:
   - Contact Hostinger support if not enabled
   - Should be enabled by default on most plans
3. Verify file isn't corrupted - check syntax

### Issue: Mixed Content Warnings

**Symptom:** Console shows "Mixed Content" errors

**Solution:**
1. Ensure SSL is installed and HTTPS redirect is working
2. All resources should load via HTTPS
3. Check `.htaccess` HTTPS redirect rules

### Issue: Rate Limiting Not Working

**Symptom:** Can submit forms unlimited times

**Solution:**
- Rate limiting is client-side (localStorage)
- Works per browser session
- User can bypass by clearing localStorage or using incognito
- **This is expected** - client-side rate limiting is for UX/spam reduction
- For strict enforcement, add server-side rate limiting in future

---

## Directory Structure on Hostinger

After deployment, your `public_html` should look like:

```
public_html/
├── index.html                    # Main entry point
├── .htaccess                     # Security headers & rewrites
├── assets/
│   ├── index-[hash].css         # Bundled Tailwind CSS
│   └── index-[hash].js          # Bundled React app
└── [any other static assets]
```

---

## Environment-Specific Notes

### Development vs Production

**Development (local):**
- Base URL: `http://localhost:3000`
- No .htaccess (not needed for Vite dev server)
- Hot module replacement enabled

**Production (Hostinger):**
- Base URL: `https://yourdomain.com`
- .htaccess active (security headers, rewrites)
- Static files with cache headers

### HashRouter vs BrowserRouter

**Current Setup:** HashRouter
- URLs: `https://yourdomain.com/#/contact`
- Pros: Works without server configuration
- Cons: Ugly URLs with `#`

**Alternative:** BrowserRouter (clean URLs)
- URLs: `https://yourdomain.com/contact`
- Requires: .htaccess rewrite rules (already configured!)
- To switch: Change HashRouter to BrowserRouter in App.tsx

**If you want clean URLs:**
1. Edit `App.tsx`
2. Replace `<HashRouter>` with `<BrowserRouter>`
3. Rebuild: `npm run build`
4. Redeploy
5. .htaccess will handle routing automatically

---

## Security Checklist (Post-Deployment)

✅ **HTTPS enabled** - Force SSL redirect working
✅ **Security headers present** - Verify with SecurityHeaders.com
✅ **CSP configured** - No external CDN dependencies (Tailwind bundled)
✅ **XSS protection** - No dangerouslySetInnerHTML in code
✅ **Form validation** - All inputs validated and sanitized
✅ **Rate limiting** - 3 submissions per 10 minutes enforced
✅ **Honeypot active** - _gotcha field in all forms
✅ **Directory browsing disabled** - Options -Indexes in .htaccess
✅ **Sensitive files protected** - .bak, .config denied in .htaccess
✅ **ZIP allowlist** - Only Lake/Porter Counties accepted

---

## Performance Optimization (Already Configured)

The deployed site includes:

✅ **GZIP Compression** - Text files compressed (~70% reduction)
✅ **Browser Caching** - Static assets cached for 1 year
✅ **Minified Assets** - CSS and JS minified by Vite
✅ **Tree-shaking** - Unused code removed by Vite
✅ **Code-splitting** - If needed in future (currently single bundle)

---

## Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Check form submissions (if backend is added)
- Monitor error logs (if logging is implemented)

**Monthly:**
- Run `npm audit` for dependency vulnerabilities
- Update dependencies if security patches available
- Check SSL certificate expiry (auto-renewed by Let's Encrypt)

**Quarterly:**
- Re-run security scan (SecurityHeaders.com, Mozilla Observatory)
- Review rate limiting effectiveness
- Update content as needed

---

## Getting Help

**Hostinger Support:**
- Live chat available 24/7
- Help with .htaccess, SSL, file permissions

**Security Issues:**
- Review: `SECURITY_AUDIT_REPORT.md`
- Check: `utils/security.ts` for validation logic

**Build Issues:**
- Check: `package.json` for dependencies
- Verify: `vite.config.ts` for build configuration

---

## Quick Reference Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Clean install (if issues)
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Success Criteria

Your deployment is successful when:

✅ All pages load without errors
✅ Navigation works (HashRouter or BrowserRouter)
✅ Forms validate and show appropriate errors
✅ Rate limiting prevents spam (3 per 10 min)
✅ ZIP validation blocks out-of-area submissions
✅ Security headers present (A/A+ grade)
✅ HTTPS enforced (no mixed content)
✅ Styles load correctly (Tailwind bundled)
✅ No console errors or CSP violations

---

## Next Steps (Optional Enhancements)

1. **Add Backend API:**
   - Email notifications for form submissions
   - Server-side validation (defense in depth)
   - Database for lead management
   - IP-based rate limiting

2. **Analytics:**
   - Google Analytics or privacy-friendly alternative
   - Track form conversion rates
   - Monitor popular pages

3. **SEO Improvements:**
   - Submit sitemap to Google Search Console
   - Add structured data (schema.org)
   - Optimize meta descriptions

4. **Content Updates:**
   - Blog section for SEO
   - Customer testimonials
   - Before/after photo gallery

---

**Deployment Status:** ✅ READY FOR PRODUCTION

Your Strong Homes Cleaning website is fully secured, optimized, and ready to deploy to Hostinger!

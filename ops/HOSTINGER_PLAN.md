# HOSTINGER DEPLOYMENT STRATEGY

## 1. Plan Detection (Do this first)
1. Log in to hPanel.
2. Go to **Websites** -> **Add Website**.
3. Look for **"Web Apps"** or **"Node.js"** option.
   - **IF FOUND:** We are in **Lane B (Node)**. We can run a custom Express server for API/Stripe.
   - **IF NOT FOUND:** We are in **Lane B (Static)** or **Lane A (Builder)**. We must use client-side routing and hosted payment links.

## 2. Lane Selection
**Primary Recommendation: Lane B (Static React)**
- Even if Node.js is not available, we can host the React build as static files.
- **Build Command:** `npm run build`
- **Output:** `dist/` folder.
- **Upload:** Upload contents of `dist/` to `public_html`.
- **Routing Fix:** Create `.htaccess` (see below).

## 3. The .htaccess Fix (Crucial for React Router on Shared Hosting)
Create a file named `.htaccess` in `public_html`:
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

## 4. Payment & Forms (Static Mode)
- **Forms:** Use [Web3Forms](https://web3forms.com/) or [Formspree](https://formspree.io/) (Free tier) to send emails directly from React without a backend.
- **Payments:** Use **Stripe Payment Links**. Generate a link in Stripe Dashboard -> Paste into the "Booking Confirmed" email or page.

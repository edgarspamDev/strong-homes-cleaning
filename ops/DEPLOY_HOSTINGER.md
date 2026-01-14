# Hostinger Deployment Guide

## Lane A: Website Builder
1. Log in to Hostinger Panel.
2. Click **Websites** -> **Create or migrate**.
3. Select **Hostinger Website Builder**.
4. Choose a "Services" or "Portfolio" template (clean layout).
5. Use the "Embed Code" element for the Hero Video.
6. Use the built-in "Contact Form" element.
7. Manually create pages for each city (duplicate page function).

## Lane B: React (VPS or Cloud / Shared Hosting)

### Scenario 1: Shared Hosting (Static Files)
1. Build the project locally: `npm run build`.
2. Access Hostinger File Manager (`public_html`).
3. Upload contents of `dist/` folder.
4. **Important:** Create a `.htaccess` file to handle React Router:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

### Scenario 2: VPS / Node.js App
1. Push code to GitHub.
2. SSH into Hostinger VPS.
3. Clone repo.
4. `npm install` && `npm run build`.
5. Use PM2 to run the server: `pm2 start server.js`.
6. Configure NGINX reverse proxy to point domain to localhost port.

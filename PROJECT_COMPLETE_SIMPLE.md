# Project Complete (Simple)

This project includes a client-side admin panel to edit the site content and save it to the browser.

What's included
- HTML pages: `index.html`, `start.html`, `login.html`, `admin.html`
- CSS: `styles.css`, `admin.css`
- JS: `script.js`, `auth.js`, `admin.js`, `content-loader.js`
- Images: `images/`
- Docs: `PROJECT_COMPLETE.md`, `README_ADMIN.md`

Quick start
1. Open `start.html` in your browser.
2. Click "Admin Login" or open `login.html`.
3. Login with: username `admin` / password `admin123`.
4. Edit sections in the admin dashboard and click Save.
5. Open `index.html` to see changes.

Notes
- All data is saved in browser `localStorage` under key `yireh_website_content`.
- Images are stored as base64; limit ~5MB per image.
- This is client-side only — not suitable for sensitive production data.

If you want, I can add export/import or create a server-backed version.
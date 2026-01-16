# Admin Panel — Quick README (Simple)

Overview
- Simple client-side CMS for editing site content.
- No backend required; uses `localStorage`.

Files to know
- Admin UI: `admin.html`, `admin.css`, `admin.js`
- Login: `login.html`, `auth.js`
- Loader: `content-loader.js` (loads edits into `index.html`)

How to use
1. Open `login.html` and sign in (admin/admin123).
2. Use the admin dashboard to edit sections and upload images.
3. Click Save for each section or "Save All".
4. Open `index.html` to preview saved changes.

Important
- Session and content stored client-side only.
- Export data manually if you need backups.
- For production, move to server-side storage and auth.

Need help: I can add export/import or make a small server API.
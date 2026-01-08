# Yireh Trading - Content Management System (CMS)

## 📋 Overview

This is a complete **Backend Admin Panel** system for the Yireh Trading business connector website. It allows you to manage all website content, images, and settings without touching any code.

## 🚀 Features

### ✅ Complete Content Management
- **Hero Section**: Edit name, subtitle, tagline, company name, and CTA buttons
- **Statistics**: Manage the three statistics displayed on the hero section
- **About Section**: Update profile summary and company background
- **Core Functions**: Add, edit, or remove function cards with custom icons
- **Sectors**: Manage sector cards with emojis and bullet points
- **Value Proposition**: Add or remove value items
- **How I Work**: Edit work principles and commercial structure
- **Contact Information**: Update all contact details
- **Images & Logos**: Upload and manage hero images, main logo, and navigation logo

### 🔐 Authentication System
- Secure login/logout functionality
- Session management (Remember Me option)
- Route protection for admin pages
- Default credentials: **admin** / **admin123**

### 📱 Fully Responsive Design
- Desktop, tablet, and mobile optimized
- Mobile-friendly sidebar navigation
- Touch-optimized interface
- Responsive forms and image galleries

### 🎨 Sleek Modern Design
- Minimal animations for better performance
- Clean, professional interface
- Gradient accents and smooth transitions
- Toast notifications for user feedback

## 📂 File Structure

```
New-Project---Idea/
├── index.html              # Main website (public-facing)
├── styles.css             # Main website styles
├── script.js              # Main website functionality
├── login.html             # Admin login page
├── admin.html             # Admin dashboard
├── admin.css              # Admin panel styles
├── admin.js               # Admin panel functionality
├── auth.js                # Authentication system
├── content-loader.js      # Dynamic content loader for main site
└── README_ADMIN.md        # This file
```

## 🎯 How to Use the Admin Panel

### Step 1: Login to Admin Panel

1. Open **login.html** in your browser
2. Enter credentials:
   - **Username**: admin
   - **Password**: admin123
3. Check "Remember me" if you want to stay logged in
4. Click "Sign In"

### Step 2: Navigate the Dashboard

After logging in, you'll see the admin dashboard with:

- **Dashboard**: Overview of your content stats
- **Hero Section**: Edit hero content
- **About & Profile**: Update about section
- **Core Functions**: Manage function cards
- **Sectors**: Edit sector information
- **Value Proposition**: Update values
- **How I Work**: Edit work principles
- **Contact Info**: Update contact details
- **Images & Logos**: Upload and manage images
- **Statistics**: Edit hero statistics

### Step 3: Edit Content

1. Click on any section in the sidebar
2. Edit the content in the forms
3. Click "Save" button for that section
4. Or use "Save All Changes" in the header to save everything at once

### Step 4: Upload Images

**Hero Images (Multiple):**
1. Go to "Images & Logos" section
2. Click on "Hero Background Images" upload area
3. Select one or multiple images
4. Images will appear as previews
5. Click X to remove any image

**Main Logo:**
1. Click "Upload Main Logo"
2. Select your logo image (max 5MB)
3. Preview appears immediately

**Navigation Logo:**
1. Click "Upload Nav Logo"
2. Select your logo (max 5MB)
3. Preview appears immediately

### Step 5: Preview Changes

- Click "Preview Site" button in the header
- Opens main website in new tab
- All changes will be visible immediately

### Step 6: Logout

- Click "Logout" button at the bottom of sidebar
- You'll be redirected to login page
- Session will be cleared

## 🔧 Technical Details

### Data Storage

- All content is stored in **localStorage**
- Storage key: `yireh_website_content`
- Images are stored as base64 data URLs
- No backend server required

### Session Management

- Session stored in sessionStorage or localStorage
- Auto-logout after 24 hours (if not "remember me")
- Token-based authentication

### Dynamic Content Loading

The main website automatically loads custom content from localStorage when available. If no custom content exists, it falls back to the default HTML content.

## 📱 Mobile Usage

The admin panel is fully mobile-responsive:

- **Mobile Menu**: Tap hamburger icon to open sidebar
- **Touch Gestures**: Swipe and tap optimized
- **Form Fields**: Optimized for mobile keyboards
- **Image Upload**: Works on mobile devices
- **Responsive Grid**: Auto-adjusts to screen size

## ⚙️ Customization Options

### Change Login Credentials

Edit in **auth.js**:
```javascript
this.defaultCredentials = {
    username: 'admin',
    password: 'admin123'  // Change this
};
```

### Add New Content Sections

1. Add section to **admin.html** content area
2. Add navigation item in sidebar
3. Create load/save functions in **admin.js**
4. Update **content-loader.js** to display on main site

### Modify Color Scheme

Edit CSS variables in **admin.css**:
```css
:root {
    --admin-primary: #0066cc;
    --admin-accent: #00a8ff;
    /* etc. */
}
```

## 🛠️ Troubleshooting

### Problem: Changes not showing on main website
**Solution**: Make sure you clicked "Save" after editing. Then refresh the main website page.

### Problem: Can't login
**Solution**: Clear browser cache and localStorage. Use default credentials: admin/admin123

### Problem: Images not uploading
**Solution**: 
- Check file size (max 5MB)
- Use JPG, PNG, or GIF formats
- Try a different browser

### Problem: Content disappeared
**Solution**: Use "Reset to Default" button in Dashboard to restore original content.

## 🔒 Security Notes

⚠️ **Important**: This is a client-side admin panel suitable for:
- Personal websites
- Portfolio sites
- Small business sites
- Local development

**NOT suitable for**:
- Production sites with multiple admins
- Sites with sensitive data
- Public-facing admin systems

For production use, consider implementing:
- Server-side authentication
- Database storage
- API endpoints
- Role-based access control
- HTTPS encryption

## 📊 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Tips & Best Practices

1. **Save Frequently**: Click save after each section edit
2. **Preview Changes**: Always preview before considering content final
3. **Image Optimization**: Compress images before uploading for better performance
4. **Regular Backups**: Export localStorage data periodically
5. **Test on Mobile**: Check how content looks on different screen sizes
6. **Keep It Simple**: Less content often has more impact

## 🆘 Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Clear localStorage: `localStorage.clear()`
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Try incognito/private mode

## 📝 Version

- **Version**: 1.0.0
- **Last Updated**: January 8, 2026
- **Created For**: Yireh Trading Pvt. Ltd.
- **Developed By**: GitHub Copilot

## 🎉 Quick Start Checklist

- [ ] Open login.html and login with admin/admin123
- [ ] Explore the dashboard
- [ ] Edit hero section and save
- [ ] Upload your company logos
- [ ] Update contact information
- [ ] Preview the main website
- [ ] Make any final adjustments
- [ ] Enjoy your dynamic website!

---

**Note**: All changes are stored locally in your browser. To transfer content to another computer, you'll need to export/import localStorage data.

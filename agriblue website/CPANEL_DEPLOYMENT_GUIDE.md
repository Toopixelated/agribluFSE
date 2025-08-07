# AgriBlu Website - cPanel Deployment Guide

## Overview
This guide provides multiple deployment options for your AgriBlu website on cPanel, with special attention to animation compatibility.

## ⚠️ Important: Animation Issues in cPanel

When deploying Next.js applications to cPanel, animations often don't work due to:

1. **JavaScript execution timing** - `useEffect` and DOM manipulation may not execute properly in static deployments
2. **CSS loading order** - Animation styles may not load correctly
3. **Browser compatibility** - Different cPanel environments may have varying browser settings
4. **File path issues** - Static asset paths may be incorrect

## 🚀 Recommended Solution: Use the Optimized HTML File

### Step 1: Use the cPanel-Optimized HTML File
I've created a special HTML file that's optimized for cPanel deployment:

1. **Download the optimized file**: `agriblu-cpanel-optimized.html`
2. **Upload to cPanel**:
   - Log in to your cPanel
   - Go to **File Manager**
   - Navigate to `public_html`
   - Upload `agriblu-cpanel-optimized.html`
   - **Rename it to `index.html`**

### Step 2: Verify Animation Functionality
The optimized HTML file includes:
- ✅ **Inline CSS** - All animation styles are embedded
- ✅ **Vanilla JavaScript** - No React/Next.js dependencies
- ✅ **DOMContentLoaded event** - Proper initialization timing
- ✅ **Fallback mechanisms** - Works even if IntersectionObserver isn't supported
- ✅ **All animations preserved**:
  - Flow lines with random scatter effects
  - Button click animations with ripple effects
  - Scroll-triggered animations
  - Energy meter interactions
  - Water droplets and energy particles

### Step 3: Test Your Website
1. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)
2. **Test all animations**:
   - Flow lines in hero section
   - Button clicks (should have ripple effects)
   - Scroll animations (sections should animate as you scroll)
   - Energy meter buttons (click to see state changes)
3. **Test on multiple browsers** (Chrome, Firefox, Safari)

## Alternative Deployment Options

### Option 1: Static Export (If you prefer Next.js)

If you want to use the original Next.js project:

#### Step 1: Configure for Static Export
Add this to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable features that don't work in static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
```

#### Step 2: Export and Upload
```bash
# On your local machine
npm run build
npm run export
```

This creates an `out` folder. Upload all contents to `public_html`.

#### Step 3: Fix Animation Issues
The static export may still have animation problems. To fix them:

1. **Copy animation styles** from `src/app/globals.css` to a separate CSS file
2. **Link the CSS file** in the HTML head
3. **Convert React animations** to vanilla JavaScript

### Option 2: Node.js Deployment (If cPanel supports it)

#### Step 1: Check Node.js Support
1. In cPanel, look for:
   - **Setup Node.js App**
   - **Node.js Selector**
   - **Application Manager**

#### Step 2: Deploy Next.js Application
Follow the original deployment guide, but ensure:
- All dependencies are properly installed
- The build process completes successfully
- The application starts without errors

## Troubleshooting Animation Issues

### Issue: Animations don't work at all
**Solution**: Use the optimized HTML file (`agriblu-cpanel-optimized.html`)

### Issue: Some animations work, others don't
**Check**:
1. Browser console for JavaScript errors
2. Network tab for failed CSS/JS file loads
3. CSS loading order in HTML head

### Issue: Animations work on desktop but not mobile
**Solution**: The optimized HTML file includes mobile-responsive animations

### Issue: Flow lines don't appear
**Solution**: The optimized file has enhanced flow line creation with better timing

### Issue: Button clicks don't animate
**Solution**: The optimized file includes enhanced button animations with ripple effects

## File Structure for Optimized Deployment

```
/home/username/
└── public_html/
    ├── index.html          # Main file (renamed from agriblu-cpanel-optimized.html)
    └── (no other files needed - everything is inline)
```

## Why the Optimized HTML File Works Better

The `agriblu-cpanel-optimized.html` file solves common cPanel animation issues:

### ✅ **No JavaScript Framework Dependencies**
- Uses vanilla JavaScript instead of React
- No need for Node.js runtime
- Works on any web server

### ✅ **Proper Initialization Timing**
- Uses `DOMContentLoaded` event
- Ensures DOM is ready before animations start
- Fallback mechanisms for older browsers

### ✅ **All Styles Inline**
- No external CSS file dependencies
- No issues with file paths
- Immediate style availability

### ✅ **Enhanced Animation System**
- Improved flow line creation with better timing
- Enhanced button animations with ripple effects
- Better scroll-triggered animations
- Mobile-responsive design

### ✅ **Complete Feature Preservation**
- All original animations maintained
- Energy meter interactions work
- Mobile menu functionality
- Contact form handling
- Smooth scrolling

## Testing Checklist

After deployment, test these features:

### 🎯 **Visual Animations**
- [ ] Flow lines appear in hero section with scatter effect
- [ ] Lines move at moderate speed with random directions
- [ ] Water droplets animate in technology section
- [ ] Energy particles appear in why section

### 🎯 **Interactive Animations**
- [ ] All buttons have click animations (ripple effect)
- [ ] Energy meter buttons change state when clicked
- [ ] Mobile menu toggles with animation
- [ ] Navigation links have hover effects

### 🎯 **Scroll Animations**
- [ ] Section titles fade in when scrolling
- [ ] Content slides up when sections come into view
- [ ] Energy meter animates when why section is visible
- [ ] Step cards animate in technology section

### 🎯 **Mobile Responsiveness**
- [ ] All animations work on mobile devices
- [ ] Mobile menu functions correctly
- [ ] Touch interactions work properly
- [ ] Layout adapts to screen size

## Quick Start Guide

### For Immediate Results (Recommended):
1. Download `agriblu-cpanel-optimized.html`
2. Upload to `public_html` folder in cPanel
3. Rename to `index.html`
4. Test your website

### For Advanced Users:
1. Try the static export method if you need Next.js features
2. Use Node.js deployment if your cPanel supports it
3. Fall back to the optimized HTML file if issues persist

## Support

If you encounter any issues:
1. **First**: Try the optimized HTML file - it solves most animation problems
2. **Check**: Browser console for errors (F12 > Console)
3. **Verify**: File permissions (644 for files, 755 for folders)
4. **Test**: Multiple browsers and clear cache
5. **Contact**: Your hosting provider if server issues persist

---

**Note**: The optimized HTML file is the most reliable solution for cPanel deployment. It maintains all the visual appeal and functionality of your original website while ensuring compatibility with cPanel's hosting environment.
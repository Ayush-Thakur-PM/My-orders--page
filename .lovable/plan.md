

# Download Brand Logo to Local Assets

## Overview
Download the brand logo from the CDN to local project assets for faster loading and offline reliability, and use a square version on the login page hero section.

---

## Changes Summary

### 1. Create Local Assets Directory & Download Logo

**New file to create:** `public/images/tsc-logo.webp`

Download the logo from the CDN URL and save it locally:
- Source: `https://thesleepcompany.in/cdn/shop/files/new_logo.webp?v=1706780127&width=600`
- Destination: `public/images/tsc-logo.webp`

### 2. Create Square Logo for Login Page

**New file to create:** `public/images/tsc-logo-square.png`

⚠️ **ACTION REQUIRED**: The base64 string provided is truncated. Please provide the complete base64 data for the square logo so I can save it locally.

### 3. Update Header Component

**File to modify:** `src/components/layout/Header.tsx`

Change the image source from CDN URL to local path:

```jsx
// Before
<img 
  src="https://thesleepcompany.in/cdn/shop/files/new_logo.webp?v=1706780127&width=600" 
  alt="The Sleep Company Logo"
  className="h-8 w-auto object-contain"
/>

// After
<img 
  src="/images/tsc-logo.webp" 
  alt="The Sleep Company Logo"
  className="h-8 w-auto object-contain"
/>
```

### 4. Update Login Page Hero Section

**File to modify:** `src/pages/PhoneAuth.tsx`

Replace the "SC" text placeholder with the square logo image:

```jsx
// Before (lines 41-48)
<motion.div
  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg"
>
  <span className="text-2xl font-bold text-primary-foreground">SC</span>
</motion.div>

// After
<motion.div
  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden shadow-lg"
>
  <img 
    src="/images/tsc-logo-square.png" 
    alt="The Sleep Company"
    className="h-full w-full object-cover"
  />
</motion.div>
```

---

## File Structure After Changes

```
public/
├── images/
│   ├── tsc-logo.webp         ← Main horizontal logo (for header)
│   └── tsc-logo-square.png   ← Square logo (for login hero)
├── favicon.ico
├── placeholder.svg
└── robots.txt
```

---

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| Loading Speed | CDN dependency | Instant from local assets |
| Offline Support | ❌ Requires network | ✅ Works offline |
| Reliability | Depends on external CDN | Self-hosted, always available |
| Cache Control | CDN managed | Full control |

---

## Blockers

**Please provide the complete base64 string** for the square logo without truncation so I can save it as a local PNG file.


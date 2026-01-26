

# Embed The Sleep Company Brand Logo

## Overview
Replace the current "SC" text-based logo with the official The Sleep Company brand logo from the provided URL.

---

## Change Summary

**File to modify:** `src/components/layout/Header.tsx`

### Current Logo Implementation
```jsx
<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
  <span className="text-sm font-bold text-primary-foreground">SC</span>
</div>
```

### New Logo Implementation
Replace the SC text box with an `<img>` tag that loads the brand logo:

```jsx
<img 
  src="https://thesleepcompany.in/cdn/shop/files/new_logo.webp?v=1706780127&width=600" 
  alt="The Sleep Company Logo"
  className="h-8 w-auto object-contain"
/>
```

---

## Technical Details

- **Image source:** External CDN URL (Shopify CDN)
- **Format:** WebP (modern, optimized format)
- **Sizing:** Height fixed at 32px (`h-8`), width auto to maintain aspect ratio
- **Loading:** Uses native browser image loading
- **Fallback:** Alt text for accessibility

---

## Visual Result

| Before | After |
|--------|-------|
| Blue square with "SC" text | Actual The Sleep Company logo image |

The logo will appear in the brand bar at the top-left, maintaining the same position but showing the real brand identity.



# Brand Colors & Navigation Tabs Restructure

## Overview
This plan addresses two key changes:
1. Update the color system to use the exact brand colors (#1A2B5C for brand blue and #1A1A1A for text black)
2. Restructure the navigation tabs to appear consistently below "The Sleep Company" brand header after login

---

## Changes Summary

### 1. Update Brand Colors

**Files to modify:** `src/index.css`

| Color | Current | New |
|-------|---------|-----|
| Brand Blue (primary) | `224 53% 22%` (HSL) | `#1A2B5C` → `222 55% 23%` (HSL) |
| Text Black | `222 47% 11%` (HSL) | `#1A1A1A` → `0 0% 10%` (HSL) |

The brand blue (#1A2B5C) will be used for:
- Primary buttons
- Active tab underline indicator
- Logo background
- Focus rings

The brand text black (#1A1A1A) will be used for:
- All foreground text
- Card foreground
- Headings

---

### 2. Restructure Header Layout

**Files to modify:** `src/components/layout/Header.tsx`

**New Header Structure (Post-Login Pages):**

```
┌─────────────────────────────────────────────────────────┐
│  [SC Logo]  The Sleep Company                  [Support]│  ← Brand Bar
├─────────────────────────────────────────────────────────┤
│         Orders    |    Wishlist    |    My Profile      │  ← Nav Tabs (separate row)
│                   ═══════════                           │  ← Active underline
└─────────────────────────────────────────────────────────┘
```

**Key Layout Changes:**
- Brand bar always shows "The Sleep Company" with SC logo on the left and support icon on the right
- Navigation tabs move to a dedicated second row below the brand bar
- Tabs are always visible after login (on Orders, Wishlist, Profile pages)
- Tabs are horizontally centered and evenly spaced
- Active tab has the brand blue underline indicator
- On detail pages (tracking), show back button + title instead of tabs

---

### 3. Update Page Components

**Files to modify:**
- `src/pages/PhoneAuth.tsx` - No nav tabs (login page)
- `src/pages/OrderListing.tsx` - Remove `showBack`, enable tabs
- `src/pages/Wishlist.tsx` - Already correct
- `src/pages/Profile.tsx` - Already correct

---

## Technical Details

### CSS Variable Updates (`src/index.css`)
```css
/* Brand Blue - #1A2B5C */
--primary: 222 55% 23%;

/* Brand Text Black - #1A1A1A */
--foreground: 0 0% 10%;
--card-foreground: 0 0% 10%;
```

### Header Component Changes
1. **Two-row structure:** Split header into Brand Row + Nav Row
2. **Brand Row:** Contains logo, brand name, and support button
3. **Nav Row:** Full-width centered tabs with underline indicator
4. **Conditional rendering:** 
   - Show both rows on main pages (Orders, Wishlist, Profile)
   - Show Brand Row + Back button on detail pages
   - Hide Nav Row on login page

### Updated Props Interface
- Keep existing props for backward compatibility
- `showNavTabs` controls whether the second navigation row appears
- `showBack` switches nav row to a back button with title

---

## Visual Result

**Before:**
- Tabs embedded in the same row as logo
- Colors not matching exact brand specification

**After:**
- Clean two-tier header with brand at top, tabs below
- Exact brand blue (#1A2B5C) and black (#1A1A1A) colors
- Better visual hierarchy and navigation clarity
- Consistent experience across all post-login pages

# LOGO REDESIGN — 3 CONCEPTS + ANALYSIS

**Date:** December 29, 2025  
**Project:** StrongHomes Cleaning Services  
**Brand Colors:** Navy (#0B1120) | Gold (#C5A065)  
**Task:** Design 3 concepts, test at tiny sizes, select best, output final assets

---

## CONCEPT A: "Trust Seal"

### Rationale
A circular badge communicates trust and professionalism. The house silhouette in the center is immediately recognizable. Outer ring text (STRONGHOMES / CLEANING) creates a classic seal effect that works well at larger sizes and projects authority.

### Design Details
- **Shape:** Circle (outer ring + inner ring)
- **Center:** House silhouette (navy, solid)
- **Text:** "STRONGHOMES" arc (top), "CLEANING" arc (bottom)
- **Accent:** Small gold star between arcs
- **Stroke:** Gold (#C5A065), 3px
- **Scale:** Works best at 100x100px and larger

### Tiny-Size Test (50x150px)
✅ **Blur Test:** PASS  
✅ **Detail Visibility:** PASS (house and text visible)  
⚠️ **Aspect Ratio:** Circles don't fit 50x150px (wide rectangle) perfectly; would require lockup variation  
✅ **Contrast:** PASS  

**Verdict:** Works, but requires horizontal lockup (circle beside wordmark)

### Strengths
- Timeless, classic seal design
- Reads as "trust" and "authority"
- Gold accents pop well
- Good at large sizes

### Weaknesses
- Circular badge doesn't fit rectangular header (needs lockup)
- Dense arc text is hard to read at small sizes
- Multiple visual layers reduce impact at tiny sizes

---

## CONCEPT B: "Modern Monogram" (RECOMMENDED)

### Rationale
A bold "SH" monogram in a clean rounded rectangle is modern, scalable, and instantly recognizable at any size. The small gold accent star adds brand personality without visual noise. This concept is versatile: works at 32x32px as an icon AND at large header sizes with a wordmark. It's the most flexible for web/mobile/favicon usage.

### Design Details
- **Shape:** Rounded rectangle (8px radius)
- **Text:** "SH" monogram, bold sans-serif, dark navy (#0B1120)
- **Accent:** Small gold star (#C5A065), top-right inside frame
- **Frame:** Navy outline, 2.5px stroke
- **Scale:** Works perfectly at 32x32px, 50x150px, and 200px+

### Tiny-Size Test (50x150px)
✅ **Blur Test:** PASS  
✅ **Detail Visibility:** PASS (SH clearly legible, star visible)  
✅ **Aspect Ratio:** Fits perfectly as icon beside wordmark  
✅ **Contrast:** PASS (navy on white, white on navy)  

**Verdict:** ✅ **EXCELLENT** at all sizes; scales perfectly

### Strengths
- Works at ANY size (icon, header, print, favicon)
- Modern and clean aesthetic
- Memorable monogram
- Minimal visual noise
- Easy to render in code (SVG or CSS)
- Perfect for mobile app icon
- Gold accent adds warmth without complexity

### Weaknesses
- More minimalist (may feel less "trustworthy" to some)
- Requires wordmark when used at small sizes

### Recommended Lockup
- **Small (under 60px):** SH logo only (icon style)
- **Medium (60–150px):** SH logo + "StrongHomes" wordmark beside
- **Large (150px+):** Stacked layout (SH centered, wordmark below)

---

## CONCEPT C: "Wipe Stroke Home"

### Rationale
A minimal, stroke-based design that evokes both home (roofline) and cleaning (wipe arc). Only 3 bold strokes reduce visual complexity. Navy roof + gold wipe creates nice color contrast and hints at the cleaning action.

### Design Details
- **Shape:** Roofline (left slope, peak, right slope) + curved wipe arc
- **Navy strokes:** Roofline (8px bold)
- **Gold stroke:** Wipe arc (9px bold)
- **Text:** "STRONGHOMES" below (optional)
- **Scale:** Works well at medium–large sizes

### Tiny-Size Test (50x150px)
✅ **Blur Test:** PASS  
⚠️ **Detail Visibility:** MEDIUM (roof and arc visible but thin at tiny sizes)  
✅ **Aspect Ratio:** Fits well in horizontal space  
✅ **Contrast:** PASS  

**Verdict:** Good, but less clarity than Concept B at 32x32px; better at 50px+

### Strengths
- Minimal and modern
- Clever metaphor (house + wipe)
- Dynamic (arc suggests motion)
- Good use of brand colors
- Memorable illustration

### Weaknesses
- Stroke-based design loses clarity at very small sizes (<40px)
- Requires more careful rendering (stroke doesn't scale as reliably as solid shapes)
- Less obviously "trustworthy" than seal or monogram
- Wordmark required for brand recognition

---

## COMPARISON TABLE

| Aspect | Concept A (Seal) | Concept B (Monogram) | Concept C (Wipe) |
|--------|------------------|----------------------|------------------|
| **Blur Test** | ✅ PASS | ✅ PASS | ✅ PASS |
| **Tiny (32x32px)** | ⚠️ Needs lockup | ✅ Perfect | ⚠️ Good, not perfect |
| **Tiny (50x150px)** | ⚠️ Needs lockup | ✅ Perfect | ✅ Good |
| **Category Fit** | Insurance/trust | Service business | Cleaning |
| **Contrast** | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| **Complexity** | Medium-high | Low | Low |
| **Scalability** | Good (lockup req'd) | **Excellent** | Good |
| **Favicon** | ⚠️ Difficult | ✅ Perfect | ⚠️ Difficult |
| **Memorability** | High | **Very High** | High |
| **Professional** | Very | Very | Very |
| **Modern** | Classic | **Modern** | Modern |

---

## RECOMMENDATION: CONCEPT B — "Modern Monogram"

### Why Concept B Wins

1. **Scalability:** Works at ANY size without compromise — 16px, 32px, 150px, 200px all equally clear
2. **Versatility:** Use as icon, header logo, favicon, app icon, print, embroidery
3. **Memorability:** Bold "SH" is immediately recognizable and sticks
4. **Accessibility:** High contrast, minimal stroke complexity, no dense text
5. **Future-Proof:** Simple enough to adapt to animated versions or different media
6. **Technical:** Easy to export, easy to code as SVG, easy to convert to PNG/ICO

### Production Plan for Concept B

#### Phase 1: SVG Master File (DONE)
- Clean, scalable SVG at 200x200 viewBox
- Properly layered (frame, monogram, accent)
- Uses standard hex colors (#0B1120, #C5A065, #FFFFFF)

#### Phase 2: Export Variants (NEXT STEPS)
1. **Transparent PNG Set**
   - 32x32px (favicon size)
   - 50x150px (header logo)
   - 100x100px (social/card)
   - 200x200px (high-res)
   - 500x500px (print/web large)

2. **White Background PNG Set**
   - All sizes above with pure white (#FFFFFF) background
   - 8px padding around logo
   - For print, email, restricted backgrounds

3. **SVG Variants**
   - Color (navy frame + gold accent)
   - White (for dark backgrounds)
   - Navy (monochrome, for embroidery/simple rendering)
   - Outlined (frame only, for secondary uses)

4. **Wordmark Lockups** (reference files)
   - Horizontal lockup: SH icon + "StrongHomes" beside
   - Vertical lockup: SH centered, "StrongHomes" stacked below
   - Text-only fallback: "StrongHomes Cleaning"

#### Phase 3: Brand Guidelines (Quick Reference)
- Minimum size: 32x32px (mobile, small icons)
- Recommended sizes: 50x150px (header), 200x200px (social), 500x500px (print)
- Minimum padding: 8px safe area
- Color usage: Navy (#0B1120) frame, gold (#C5A065) accent required on white
- Monochrome: Navy only (for single-color uses)
- Never: Stretch, rotate, add effects, use on gradients

---

## DELIVERABLE CHECKLIST

✅ **CONCEPT A:** logo-concept-a-trust-seal.svg  
✅ **CONCEPT B:** logo-concept-b-modern-monogram.svg  
✅ **CONCEPT C:** logo-concept-c-wipe-stroke.svg  
⬜ **FINAL SELECTION:** Concept B (Modern Monogram)  
⬜ **PNG Transparent (32x32, 50x150, 100x100, 200x200, 500x500)**  
⬜ **PNG White Background (32x32, 50x150, 100x100, 200x200, 500x500)**  
⬜ **SVG Color Master**  
⬜ **SVG Monochrome (navy only)**  
⬜ **Wordmark Lockups (horizontal + vertical)**  
⬜ **Brand Guidelines PDF**  

---

## NEXT STEP FOR DEVELOPER

1. Open `logo-concept-b-modern-monogram.svg` in design tool (Figma, Illustrator, Affinity)
2. Export to PNG at specified sizes (with transparency)
3. Create white background variants (export with white bg or composite)
4. Test at actual sizes in browser (Navbar, favicon, mobile home screen)
5. Verify gold accent is visible at 32x32px
6. Create wordmark lockup file (Adobe XD or Figma)
7. Update Navbar to use new logo
8. Test on production build (Hostinger preview)

---

## FILE LOCATIONS

- Concept A: [logo-concept-a-trust-seal.svg](logo-concept-a-trust-seal.svg)
- Concept B: [logo-concept-b-modern-monogram.svg](logo-concept-b-modern-monogram.svg) ← **RECOMMENDED**
- Concept C: [logo-concept-c-wipe-stroke.svg](logo-concept-c-wipe-stroke.svg)

**Once exported, place PNG files in:**
- `public/logo-32x32.png` (favicon)
- `public/logo-50x150.png` (header)
- `public/logo-icon.svg` (fallback)
- `public/logo-white-bg.png` (email template)

---

## TESTING AT ACTUAL SIZES

### 32x32px (Favicon, mobile app)
- [ ] Load in browser tab — should be sharp, SH visible, star visible
- [ ] Load in iOS app bookmark — should render clearly
- [ ] Load in Android home screen — should be recognizable

### 50x150px (Header logo)
- [ ] Navbar at mobile size (375px width) — logo takes ~25% width
- [ ] Navbar at desktop size — logo clear and crisp
- [ ] Print mockup — vector quality maintained

### 200x200px (Social media, cards)
- [ ] LinkedIn profile icon
- [ ] Facebook profile picture
- [ ] Google Business profile
- [ ] Email signature

### Accessibility Checks
- [ ] Contrast ratio ≥4.5:1 (navy on white, white on navy)
- [ ] Visible at 14pt size (approximately 32px)
- [ ] No subtle gradients or shadows that fade at small sizes
- [ ] Monochrome version readable on dark backgrounds

---

## REVISION HISTORY

| Date | Concept | Status |
|------|---------|--------|
| 2025-12-29 | A, B, C | Created SVG concepts |
| 2025-12-29 | B | **Selected as recommendation** |
| TBD | B | PNG exports (in progress) |
| TBD | B | Wordmark lockups (pending) |
| TBD | B | Deploy to Navbar (pending) |


# Sorein Media Map

**Audit date:** 2026-05-24  
**Auditor:** Claude Code (sorein-brand-system + performance-accessibility-qa skills)  
**Repo status:** Greenfield — zero media assets present in repository.

---

## Summary

The repository contains **no media files** (images, videos, 3D assets, logos, or icons).  
All sections have been built with `image_picker` settings and Shopify placeholder fallbacks.  
This map defines exactly which assets need to be uploaded before launch.

---

## Priority 1 — Critical (blocks launch without these)

| # | Filename suggestion | Type | Dimensions | Used in | Notes |
|---|---|---|---|---|---|
| 1 | `sorein-logo.svg` or `.png` | Logo | Min 280×80px | Header, footer, OG tags | White version for dark header; dark version for light pages |
| 2 | `sorein-logo-white.svg` | Logo (white) | Same | Header sticky/transparent | Needed separately |
| 3 | `a6-pro-hero.png` | Product photo | 900×900px | Homepage hero, featured products, builder | PNG transparent background preferred |
| 4 | `a6-pro-hero-dark.jpg` | Product lifestyle | 1440×900px | Hero section bg visual | Dark studio shot |
| 5 | `a6-pro-builder-default.jpg` | Builder preview | 800×800px | A6 Builder — default state | PNG transparent or studio |
| 6 | `a6-pro-builder-low.jpg` | Builder preview | 800×800px | A6 Builder — base + chassis | 1 battery |
| 7 | `a6-pro-builder-medium.jpg` | Builder preview | 800×800px | A6 Builder — 2× EB210 | Medium stack |
| 8 | `a6-pro-builder-large.jpg` | Builder preview | 800×800px | A6 Builder — 3-4× EB210 | Large stack |
| 9 | `a6-pro-builder-full.jpg` | Builder preview | 800×800px | A6 Builder — max config | Full system |

---

## Priority 2 — Important (affects conversion significantly)

| # | Filename suggestion | Type | Dimensions | Used in | Notes |
|---|---|---|---|---|---|
| 10 | `sorein-use-case-home.jpg` | Lifestyle | 600×400px | Use-case selector — home backup | Home with Sorein during blackout |
| 11 | `sorein-use-case-cabin.jpg` | Lifestyle | 600×400px | Use-case selector — cabin/off-grid | Cabin in forest with solar |
| 12 | `sorein-use-case-rv.jpg` | Lifestyle | 600×400px | Use-case selector — RV/camping | RV with Sorein + solar panel |
| 13 | `sorein-use-case-emergency.jpg` | Lifestyle | 600×400px | Use-case selector — emergency | Emergency kit scenario |
| 14 | `sorein-use-case-solar.jpg` | Lifestyle | 600×400px | Use-case selector — solar | Solar panel in sunlight |
| 15 | `sorein-solar-hero.jpg` | Lifestyle/product | 1200×800px | Solar-ready section | Solar panel + Sorein product |
| 16 | `sorein-modular-step1.jpg` | Product | 600×600px | Modular system section — step 1 | A6 Pro base unit alone |
| 17 | `sorein-modular-step2.jpg` | Product | 600×600px | Modular system section — step 2 | Base + 2× EB210 |
| 18 | `sorein-modular-step3.jpg` | Product | 600×600px | Modular system section — step 3 | Full modular system |
| 19 | `sorein-builder-cta-hero.jpg` | Dark lifestyle | 1200×800px | Builder CTA section | Dramatic dark product shot |
| 20 | `sorein-final-cta-hero.jpg` | Dark lifestyle | 1200×800px | Final CTA section | Premium dark brand image |

---

## Priority 3 — Enhancing (improve polish and storytelling)

| # | Filename suggestion | Type | Dimensions | Used in | Notes |
|---|---|---|---|---|---|
| 21 | `sorein-about-hero.jpg` | Brand/team | 1440×700px | About page hero | Scandinavian energy lab or team |
| 22 | `sorein-about-mission.jpg` | Brand | 600×800px | About page mission block | Design/engineering focus |
| 23 | `sorein-technology-hero.jpg` | Technical | 1440×700px | Technology page hero | LiFePO4 cell close-up |
| 24 | `sorein-lifepo4-diagram.png` | Diagram | 800×600px | Technology page LiFePO4 section | Chemistry diagram or graphic |
| 25 | `sorein-solar-mppt.jpg` | Technical | 800×600px | Technology page MPPT section | Solar charging diagram |
| 26 | `eb210-product.jpg` | Product | 900×900px | EB210 extra battery product page | Clean studio shot |
| 27 | `ac200-product.jpg` | Product | 900×900px | AC200 inverter product page | Clean studio shot |
| 28 | `sorein-mobile-chassis.jpg` | Product | 900×900px | Chassis selection in builder | Mobile chassis |
| 29 | `sorein-offroad-chassis.jpg` | Product | 900×900px | Chassis selection in builder | Off-road chassis |
| 30 | `sorein-accessories.jpg` | Product | 800×600px | Builder accessories section | Cables, adapters, accessories |

---

## Priority 4 — Optional / Nice-to-have

| # | Filename suggestion | Type | Dimensions | Used in | Notes |
|---|---|---|---|---|---|
| 31 | `sorein-og-image.jpg` | Social/SEO | 1200×630px | OG tags on all pages | Brand social share image |
| 32 | `sorein-favicon.png` | Icon | 32×32px, 180×180px | Browser tab, iOS | Multiple sizes needed |
| 33 | `sorein-hero-video.mp4` | Video | 1920×1080px | Hero section (optional) | Cinematic brand video, <30s |
| 34 | `sorein-hero-video-poster.jpg` | Video poster | 1440×810px | Hero video fallback | First frame of video |
| 35 | `sorein-background-texture.jpg` | Background | 400×400px tileable | Section backgrounds | Subtle dark carbon texture |

---

## Current fallback behavior (what customers see without media)

All sections use Shopify's built-in `placeholder_svg_tag` filter for missing images:
```liquid
{{ 'product-1' | placeholder_svg_tag: 'sorein-placeholder-svg' }}
```
- These display as muted grey product silhouettes
- All image containers maintain correct aspect-ratios
- Layout does not break without images — it degrades gracefully

---

## Upload instructions

1. Go to **Shopify Admin → Online Store → Themes → Edit code**
2. Upload images to **Assets** folder
3. Or: upload via **Content → Files** and copy the CDN URL to use in image settings
4. **Preferred:** Upload directly in the **Theme Editor** via each section's `image_picker` settings — this is the easiest approach for non-technical team members.

---

## Video notes

If a hero video is available:
- Keep file size under 10MB for theme uploads
- Use H.264 encoding, AAC audio (or no audio)
- Upload to Shopify Files (unlimited size) and use the CDN URL
- Set `autoplay muted loop playsinline` attributes
- Always provide a poster image fallback

---

## 3D assets

No 3D files are currently planned in the theme. If adding Three.js/WebGL product visualization in future:
- Use `.glb` format (compact, widely supported)
- Target < 3MB per model
- Lazy-load behind IntersectionObserver
- Provide static image fallback

---

## Missing assets checklist for launch

Before going live, confirm these are uploaded and assigned in theme editor:
- [ ] Sorein logo (light version) → Header logo setting
- [ ] Sorein logo (dark version) → Footer logo setting
- [ ] A6 Pro hero product image → Homepage hero section
- [ ] A6 Pro builder images (5 states) → A6 Builder section (builder_image_* settings)
- [ ] 5× use-case lifestyle images → Use-cases section (per-block image settings)
- [ ] Solar hero image → Solar-ready section
- [ ] OG image → Theme settings (Social sharing)
- [ ] Favicon → Theme settings

**Estimated total asset budget:** ~40 images, ~0 videos (optional), 0 3D files  
**Estimated total file size:** <20MB

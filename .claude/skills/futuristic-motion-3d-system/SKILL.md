# Futuristic Motion 3D System

## Purpose
Use this skill when adding premium futuristic motion, 3D visuals, product animation, scroll storytelling, WebGL, video sections, or interactive visual systems to Sorein.

## When to use
Use this skill for:
- Hero animations
- Scroll-driven product storytelling
- 3D product sections
- Video showcase sections
- Energy flow effects
- Blueprint overlays
- Product builder image transitions
- Microinteractions
- Loading states
- High-tech landing pages

## Motion philosophy
Motion must feel:
- Premium
- Calm
- Technical
- Controlled
- Smooth
- Expensive
- Useful

Motion must not feel:
- Random
- Cheap
- Distracting
- Laggy
- Gaming/neon
- Overdone
- Heavy on mobile

## Rules
Use:
- 200–300ms transitions for UI microinteractions
- transform and opacity animations where possible
- IntersectionObserver for reveal effects
- CSS transitions before heavy JS
- Lazy-loaded video/3D assets
- prefers-reduced-motion support
- GPU-friendly transforms
- Scroll storytelling only where it improves product understanding
- Smooth fades for product image changes
- Subtle parallax, not aggressive parallax

Avoid:
- Animation blocking CTA
- Huge uncompressed videos
- Heavy WebGL everywhere
- Scroll hijacking
- Infinite animation near buying buttons
- Complex 3D on low-power mobile devices
- Uncontrolled canvas effects
- Auto-playing sound
- Layout shift from animations

## 3D/WebGL rules
Use Three.js/WebGL only when:
- It clearly improves perceived product value
- It explains modularity, battery stacking, power flow, or product construction
- It can lazy-load
- It has fallback images
- It performs well on mobile

Always provide:
- Static fallback
- Reduced-motion fallback
- Lazy loading
- Loading state
- Mobile performance consideration

## Futuristic Sorein effects
Good effects:
- Technical blueprint grid
- Soft cyan energy glow
- Battery capacity visualization
- Modular stacking animation
- Power flow line animation
- Home/cabin/RV backup scenario transitions
- Scroll-based spec reveals
- Product image crossfade
- Soft magnetic CTA hover
- Premium shimmer on technical cards

Bad effects:
- Random lightning everywhere
- Neon cyberpunk overload
- Spinning product for no reason
- Heavy particle storms
- Fake holograms that reduce readability
- Motion that makes older buyers uncomfortable

## Performance checklist
Before finalizing motion:
- No console errors
- No jank on mobile
- No layout shift
- Respects reduced motion
- Does not delay first contentful paint
- Does not block add-to-cart
- Video/image assets are optimized
- Animation improves clarity or conversion

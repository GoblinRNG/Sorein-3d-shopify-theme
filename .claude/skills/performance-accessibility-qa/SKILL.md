# Performance Accessibility QA

## Purpose
Use this skill before final delivery of any Sorein theme, section, page, component, or product builder. This skill forces testing and quality control.

## When to use
Use this skill:
- Before giving final answer
- After creating a theme
- After editing Liquid
- After editing JavaScript
- After creating a product builder
- After adding animation
- After adding 3D/video
- After editing cart/add-to-cart logic
- When user says test it, check it, fix it, or make sure it works

## Required checks
Run available checks depending on project:
- npm install if needed
- npm run build if available
- npm run lint if available
- shopify theme check if available
- theme dev preview if available
- Playwright screenshot check if available
- Browser console check if available
- Mobile viewport check
- Desktop viewport check
- Reduced-motion check
- Add-to-cart flow check
- Theme editor compatibility check if possible

## Visual QA
Check:
- No horizontal scroll
- No broken layout on mobile
- No text overlapping
- No CTA hidden
- No sticky element blocking content
- Product images are sharp
- Section spacing is premium
- Typography hierarchy is clean
- Cards align correctly
- Hover/focus states exist
- Skeleton/loading states are not ugly
- Empty states are handled

## Accessibility QA
Check:
- Semantic headings
- Buttons are buttons, links are links
- Keyboard focus visible
- Form controls have labels
- Images have alt text
- Sufficient contrast
- Reduced motion support
- No keyboard traps
- ARIA only where useful
- Touch targets are large enough

## Performance QA
Check:
- Images lazy-load below the fold
- Hero image is optimized
- Videos are not huge unless necessary
- 3D loads lazily
- JavaScript is section-scoped
- No heavy libraries unless needed
- Animation uses transform/opacity where possible
- No layout shift
- No console spam
- No duplicate intervals/listeners

## Shopify QA
Check:
- Liquid syntax valid
- Schema valid
- Presets exist
- Section can be added in theme editor
- Multiple section instances do not conflict
- Product variant data is valid
- Cart add works
- Sold-out handling works
- Dynamic sources still work
- No Liquid inside schema default values

## Final delivery rule
Do not say a file/theme is ready until:
- You have run the checks available in the environment
- You have fixed found errors
- You clearly mention any check that could not be run

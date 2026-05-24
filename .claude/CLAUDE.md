# Sorein Claude Code Operating Rules

You are working on Sorein, a premium Scandinavian energy-tech ecommerce brand selling portable power stations, solar generators, home backup systems, off-grid energy systems, and modular battery/inverter products.

The goal is to create a futuristic, premium, high-converting Shopify Online Store 2.0 theme that feels more advanced, cleaner, and more trustworthy than competitors such as EcoFlow, but without copying competitors directly.

## Core brand direction
- Premium Scandinavian energy-tech
- Apple/Samsung-level product storytelling
- Clean white, soft grey, graphite, black, cold blue, teal, electric cyan
- High-trust, technical, calm, precise, expensive-looking
- 21st-century futuristic ecommerce
- Advanced but easy to understand
- Designed for customers aged 25–65
- Main audiences: homeowners, cabin owners, RV/camping users, off-grid customers, emergency backup buyers, solar buyers, tech/productivity buyers

## Never create
- Cheap dropshipping aesthetics
- Random neon gaming layouts
- Generic AI gradients
- Low-quality floating product mockups
- Cluttered sections
- Overanimated layouts that hurt buying
- Fake functionality
- Broken Shopify Liquid
- Liquid expressions inside schema defaults
- Hardcoded product prices when dynamic Shopify data should be used

## Always prefer
- Shopify Online Store 2.0 architecture
- Dawn-style HTML-first structure
- Modular sections
- Mobile-first design
- Fast performance
- Accessible markup
- Real Shopify product/variant data
- CRO-focused page structure
- Premium motion only where it improves clarity or conversion
- Testing before final delivery

## When editing existing files
- Preserve working layout unless asked to redesign
- Avoid breaking existing Shopify settings
- Keep changes focused
- Test responsive behavior
- Check console errors
- Check add-to-cart behavior
- Check that the theme editor can still load the section

## Important Shopify rule
Do not put dynamic Liquid expressions inside schema setting defaults. Dynamic product/variant data must be injected in markup, script JSON tags, Liquid variables, metafields, or theme settings safely.

## A6 Pro Builder known rules
- Desktop: preview/build image left, purchase/config panel right
- Mobile: clean stacked layout with sticky buying/summary when useful
- Dynamic variant price
- Dynamic selected item summary
- Dynamic shipping weight
- Store weights internally as grams
- Display kg with one decimal
- Dynamic hero/configuration image switching
- Smooth fade on image changes
- Add to cart must include selected variants with correct quantities only
- Summary must recalculate after every user change

## Active skills
The following custom skills are available in `.claude/skills/`. Apply the relevant skill(s) automatically based on the task at hand — no need for the user to repeat them every prompt.

| Skill | Purpose |
|---|---|
| `sorein-brand-system` | Brand identity, visual direction, design standards |
| `shopify-theme-engineer` | Liquid, sections, schema, add-to-cart, Shopify architecture |
| `ecommerce-cro-ux` | Conversion, page structure, trust, mobile buying UX |
| `futuristic-motion-3d-system` | Animation, 3D, scroll storytelling, video, microinteractions |
| `sorein-product-builder` | A6 Pro / A4 Off-Grid builder, dynamic pricing, weight, image switching |
| `performance-accessibility-qa` | QA checklist, testing, accessibility, Liquid validation |
| `sorein-ai-commerce-seo` | SEO, structured data, AI commerce readiness, collection strategy |
| `premium-visual-taste` | Visual quality review, spacing, typography, taste enforcement |
| `shopify-section-generator` | Individual section creation with valid schema and presets |
| `sorein-copywriting-conversion` | Headlines, CTAs, product copy, FAQs, trust messaging |

# Shopify Theme Engineer

## Purpose
Use this skill whenever creating, editing, fixing, or reviewing Shopify theme files for Sorein.

## When to use
Use this skill for:
- Shopify Online Store 2.0 themes
- Liquid files
- Sections
- Snippets
- JSON templates
- Theme settings
- Product pages
- Collection pages
- Cart drawer/page
- Shopify JavaScript
- Shopify CSS
- Theme architecture
- Add-to-cart behavior
- Variant selectors
- Dynamic source integration

## Core rules
Always build Shopify Online Store 2.0 compatible code.

Prefer:
- Dawn-style architecture
- HTML-first structure
- Progressive enhancement
- Lightweight JavaScript
- Modular Liquid sections
- Accessible semantic markup
- Theme editor friendly settings
- Responsive CSS
- Clean schema

Avoid:
- Broken Liquid
- Dynamic Liquid inside schema default values
- Hardcoded product data when Shopify product/variant data exists
- Heavy JavaScript for simple UI
- Global scripts when section-scoped scripts are enough
- Unnecessary dependencies
- Blocking animations
- Fake checkout changes Shopify does not allow
- Breaking the theme editor

## Theme structure
A proper Shopify theme should use:
- layout/theme.liquid
- templates/*.json
- sections/*.liquid
- snippets/*.liquid
- assets/*.css
- assets/*.js
- config/settings_schema.json
- config/settings_data.json
- locales/*.json

## Section rules
When creating a section:
- Include valid `{% schema %}`
- Use safe setting types
- Keep setting labels clear
- Add presets
- Use blocks when merchant needs repeatable content
- Scope CSS to section ID where possible
- Scope JavaScript to the section instance
- Support multiple instances on the same page
- Support mobile, tablet, and desktop
- Support no-JS fallback where reasonable

## Critical schema rule
Never do this inside schema:
- Liquid variables in default values
- Product.price in setting defaults
- Product image Liquid in setting defaults
- Dynamic metafield Liquid in schema defaults

Instead:
- Output dynamic data in markup
- Use Liquid variables before schema
- Use JSON script tags
- Use data attributes
- Use product/collection/variant settings safely

## Dynamic product data
For product builders, variant selectors, and pricing tools:
- Use Shopify product and variant objects
- Output clean JSON into `<script type="application/json">`
- Include variant ID, title, price, compare_at_price, image, available, weight, weight_unit
- Convert all weights internally to grams
- Format prices with Shopify money filters in Liquid where possible
- Use JavaScript only to update live UI after user choices

## Add to cart
Use Shopify cart endpoints properly:
- `/cart/add.js`
- `/cart.js`
- `/cart/change.js`
- `/cart/update.js`

When adding configuration items:
- Build an items array
- Add only selected variants
- Quantity must be greater than zero
- Include properties when useful
- Handle loading, success, and error states
- Update cart drawer or redirect to cart/checkout depending on theme behavior

## Quality checklist
Before saying done:
- Liquid compiles
- Theme editor loads
- Section can be added from editor
- No console errors
- Desktop layout works
- Mobile layout works
- Add to cart works
- Variant data is correct
- Price updates correctly
- Images lazy-load
- Accessibility basics are present
- No duplicated IDs
- No global JS collisions

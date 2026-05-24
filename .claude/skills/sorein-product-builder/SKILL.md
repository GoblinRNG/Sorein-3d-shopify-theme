# Sorein Product Builder

## Purpose
Use this skill whenever creating or editing the Sorein modular power station builder, especially A6 Pro, A4 Off-Grid, batteries, inverters, chassis, solar, and accessory configurations.

## When to use
Use this skill for:
- A6 Pro builder
- A4 Off-Grid builder
- Product configurators
- Dynamic pricing
- Dynamic weight
- Dynamic image switching
- Variant-based add to cart
- Sticky summary
- Klarna/payment messaging
- Product bundle UX
- Technical product selection

## Builder layout
Desktop preferred structure:
- Top-level custom hero/purchase section
- Left side: large product/build preview card
- Right side: purchase/configuration panel
- Below: Build Your System section
- Left lower column: step cards
- Right lower column: sticky summary

Mobile preferred structure:
- Product image first
- Price and CTA visible early
- Build steps stacked
- Sticky bottom CTA or compact summary
- Easy quantity controls
- No cramped specification tables

## A6 Pro default build logic
Typical steps:
1. Main Base 2000
   - Fixed quantity 1
   - 2200W class
   - 1037Wh class
   - LFP/LiFePO4
   - AC/USB/solar/AC charge specs

2. Chassis
   - Single select
   - Mobile Battery Chassis
   - Off-Road Mobile Chassis

3. Extra Battery EB210
   - Quantity 0–4
   - +2160Wh each
   - Stackable

4. Extra Inverter AC200
   - Quantity 0–3
   - 2200W class
   - Stackable

Optional:
- Solar panel
- Cable/accessory kits
- Delivery/installation option
- Warranty/support upgrade

## Dynamic data rules
Do not hardcode final product data if Shopify data is available.

For each module/variant, collect:
- variantId
- productId
- title
- module type
- price in cents
- compare-at price in cents
- image URL
- available
- weight
- weight unit
- selected quantity
- technical specs

Use JSON script tags in Liquid:
- `type="application/json"`
- escaped safely
- parsed by section JavaScript

## Weight rules
Critical:
- Store internal weight as grams
- Convert all units to grams
- Display total shipping weight in kg with one decimal
- Never confuse grams and kg
- Never multiply kg by 1000 twice
- Recalculate after every configuration change

Conversion:
- g = grams (already base unit)
- kg → grams: multiply by 1000
- lb → grams: multiply by 453.59237
- oz → grams: multiply by 28.349523125

Display:
- `Total shipping weight: 42.5 kg`

## Pricing rules
Recalculate in this order:
1. Unit prices above controls
2. Summary item rows
3. Line totals
4. Subtotal
5. Discount if used
6. Shipping if shown
7. Taxes/VAT if shown
8. Final total
9. Top purchase price

Use SEK formatting for Swedish store:
- 41 495 SEK
- 41,495 kr only if the rest of store uses that format consistently

## Image switching rules
Hero/configuration image should update when:
- Chassis changes
- Battery quantity changes
- Inverter quantity changes
- Total weight tier changes
- Matching build candidate changes

Use:
- Smooth fade around 200ms
- Preload next image where possible
- Fallback to base image
- No broken images
- Alt text updates

Possible image mapping:
- Default base
- Low-weight build
- Medium build
- Large stack
- Full off-grid build
- Chassis-specific build
- Nearest candidate by weight

## Add-to-cart rules
When user clicks Add to Cart:
- Build items array
- Include base variant quantity 1
- Include selected chassis quantity 1
- Include EB210 quantity if >0
- Include AC200 quantity if >0
- Include solar/accessories if selected
- Add line item properties describing build
- Handle loading state
- Handle errors clearly
- Update cart drawer or redirect to cart/checkout depending on theme behavior

## UX rules
Builder must feel:
- Premium
- Technical
- Simple
- Powerful
- Clear
- Trustworthy

Include:
- Delivery estimate
- Warranty/support
- Payment/Klarna style area
- Secure checkout
- Configuration summary
- Total capacity estimate
- Total output estimate
- Total weight
- Clear CTA

## Final checklist
Before done:
- Price changes correctly
- Weight changes correctly
- Summary changes correctly
- Add to cart sends correct variants
- Mobile layout works
- Sticky summary does not overlap footer
- Images do not break
- Quantities stay within min/max
- Sold-out variants are handled
- Console has no errors

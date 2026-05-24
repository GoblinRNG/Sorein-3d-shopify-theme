# Shopify Section Generator

## Purpose
Use this skill when generating individual Shopify sections for Sorein. It ensures sections are valid, editable, premium, responsive, and safe for Shopify.

## When to use
Use this skill for:
- Hero sections
- Product feature sections
- Product builder sections
- Comparison tables
- FAQ sections
- Review/testimonial sections
- Technical spec sections
- Video sections
- Trust sections
- Collection sections
- Landing page blocks

## Section creation rules
Every section must:
- Be a valid `.liquid` section
- Include `{% schema %}`
- Include a preset
- Support desktop and mobile
- Use scoped classes
- Avoid global style pollution
- Avoid duplicate IDs
- Be theme-editor friendly
- Use accessible HTML
- Use lazy loading for images below fold
- Include fallback content where useful

## Schema rules
Use appropriate setting types:
- text
- textarea
- richtext
- image_picker
- video
- url
- collection
- product
- range
- checkbox
- select
- color
- header
- paragraph

Do not use:
- Liquid inside schema defaults
- Dynamic product price in schema default
- Dynamic image Liquid in schema default
- Overly complex settings that confuse merchant

## CSS rules
- Scope to `.section-{{ section.id }}`
- Use CSS variables for colors/spacing where useful
- Mobile-first CSS
- Avoid `!important` unless necessary
- Avoid fixed heights that break content
- Use clamp() for responsive typography
- Use object-fit carefully
- Ensure no horizontal scroll

## JavaScript rules
- Use section-scoped JS
- Support multiple instances
- Do not pollute global namespace
- Use event delegation where useful
- Cleanly handle missing elements
- No console logs in production
- Use custom events if needed
- Respect reduced motion

## Output rules
When asked for a section:
- Create or edit the actual section file
- Explain where to add it
- Mention settings available
- Mention any dependencies
- Test Liquid syntax if possible

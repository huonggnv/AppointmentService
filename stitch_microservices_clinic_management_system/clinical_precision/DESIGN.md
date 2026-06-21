---
name: Clinical Precision
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#434654'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#006c47'
  on-secondary: '#ffffff'
  secondary-container: '#82f9be'
  on-secondary-container: '#00734c'
  tertiary: '#851800'
  on-tertiary: '#ffffff'
  tertiary-container: '#b02300'
  on-tertiary-container: '#ffc6b9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#82f9be'
  secondary-fixed-dim: '#65dca4'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005235'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0600'
  on-tertiary-fixed-variant: '#8b1a00'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  sidebar-width: 260px
  sidebar-collapsed: 72px
---

## Brand & Style

The brand personality of the design system is authoritative, dependable, and meticulously organized. It is designed for a high-stakes medical environment where clarity of information is paramount. The target audience includes clinicians, healthcare administrators, and patients, necessitating a UI that balances high information density with cognitive ease.

The design style is **Corporate / Modern**, leaning heavily into functional minimalism. It prioritizes a "content-first" architecture, utilizing a structured layout that reduces visual noise to prevent diagnostic errors and user fatigue. The emotional response should be one of calm control, professional reliability, and absolute precision.

## Colors

This design system utilizes a structured palette to indicate hierarchy and functional status:

- **Primary (Trustworthy Blue):** Used for primary actions, navigation states, and brand presence. It signifies stability.
- **Secondary (Healthy Green):** Reserved for "Success" states, positive health trends, and completed tasks.
- **Tertiary (Warning Red):** Integrated for critical alerts, high-risk vitals, and emergency notifications.
- **Neutral (Soft Grays):** A multi-tiered gray scale provides the canvas. `#F4F5F7` is the primary background to reduce screen glare compared to pure white, while `#FFFFFF` is used exclusively for elevated content cards.

## Typography

The design system uses **Inter** for its exceptional legibility in data-heavy interfaces. The type scale is tight to facilitate high information density. 

For specialized medical data—such as lab results, patient IDs, and dosage numbers—**JetBrains Mono** is introduced at a small scale to ensure distinct character recognition (e.g., differentiating '1', 'l', and 'I'). 

- Use `headline-lg` for dashboard overviews.
- Use `body-md` as the default for medical records and patient history.
- Use `label-md` for table headers and section metadata.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. A persistent navigation sidebar sits on the left, while the main content area utilizes a 12-column fluid grid.

- **Desktop:** 12 columns, 16px gutters, 24px outer margins. 
- **Tablet:** 8 columns, 16px gutters, 16px outer margins.
- **Mobile:** 4 columns, 12px gutters, 12px outer margins.

Spacing follows a strict 4px baseline grid. Components such as data tables and form groups should use "Compact" spacing (8px-12px) to minimize scrolling, while "Comfortable" spacing (24px+) is reserved for patient-facing views to improve accessibility.

## Elevation & Depth

To maintain a sterile and professional appearance, the design system avoids heavy shadows. Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**:

- **Level 0 (Background):** `#F4F5F7` – The base canvas.
- **Level 1 (Cards/Surface):** `#FFFFFF` – Used for the primary content containers. These feature a 1px border of `#DFE1E6` rather than a shadow.
- **Level 2 (Modals/Popovers):** `#FFFFFF` with a subtle, 15% opacity blue-tinted shadow (0px 4px 12px) to suggest physical separation from the clinical data beneath.
- **Interactions:** Hover states on list items use a subtle tint of the Primary color (5% opacity) rather than a lift effect.

## Shapes

The design system uses a **Soft** shape language. 

- **Components (Buttons, Inputs, Selects):** 0.25rem (4px) corner radius. This provides a professional, modern feel without appearing too "playful" for a clinical setting.
- **Containers (Cards, Modals):** 0.5rem (8px) corner radius for larger surfaces to create clear visual containment.
- **Status Badges:** 1rem (16px) or fully pill-shaped to differentiate them clearly from interactive buttons.

## Components

### Buttons & Inputs
- **Primary Action:** Solid `#0052CC` with white text. 
- **Ghost/Tertiary:** No border, primary color text; used for secondary dashboard actions.
- **Form Fields:** 1px `#DFE1E6` border, turns `#0052CC` on focus. Labels always persist above the field for accessibility.

### Cards & Lists
- **Medical Record Cards:** White background, 1px border, 8px padding. Information should be grouped into logical clusters using `label-md` headers.
- **Data Tables:** Zebra striping is not used; instead, use 1px horizontal dividers. High-density rows (32px height) for clinicians.

### Status Badges
- **Success/Stable:** Green background (10% opacity) with `#36B37E` text.
- **Alert/Critical:** Red background (10% opacity) with `#FF5630` text.
- **Pending/Neutral:** Gray background (10% opacity) with `#42526E` text.

### Navigation Sidebar
- Dark-themed or high-contrast light. Icons should be line-art style (2px stroke) for clarity. Active states are indicated by a 3px vertical "power bar" on the left edge in Primary Blue.

### Specialized Components
- **Trend Indicators:** Small sparklines within table cells to show vitals over time.
- **Timeline View:** A vertical thread for patient history, using the Soft Gray for the line and Primary Blue for the nodes.
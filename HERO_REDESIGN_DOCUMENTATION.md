# Hero Section Redesign - Documentation

## Overview
Complete redesign of the Hero section to match the reference design with a modern teal/cyan color scheme and asymmetric 40/60 layout.

## Changes Made

### 1. Color Palette Update (Teal/Cyan Theme)

**File**: `src/styles/global.css`

Updated primary color variables from Sky Blue to Teal:
- `--color-accent`: `#0ea5e9` → `#14b8a6` (teal-500)
- `--color-accent-hover`: `#38bdf8` → `#2dd4bf` (teal-400)
- `--color-accent-secondary`: `#6366f1` → `#0d9488` (teal-600)
- `--color-primary`: `#0ea5e9` → `#14b8a6`
- `--color-secondary`: `#6366f1` → `#0d9488`

### 2. New Component: PlatformCardWithImage

**File**: `src/components/features/PlatformCardWithImage.astro`

**Features**:
- Background image support with overlay gradient
- Two size variants: `large` and `medium`
- Customizable badges with icons
- Smooth hover effects with scale and border color transitions
- Responsive design across all breakpoints
- Overlay gradient: `rgba(2, 6, 23, 0.3)` → `rgba(2, 6, 23, 0.95)`

**Props**:
```typescript
interface Props {
  title: string;          // Main card title
  subtitle: string;       // Card description
  badge: string;          // Badge text (e.g., "TOUR GRAPHIC")
  badgeIcon?: string;     // Badge emoji/icon (default: '🏷')
  imageSrc: string;       // Background image URL
  imageAlt: string;       // Image alt text for accessibility
  size?: 'large' | 'medium'; // Card size (default: 'medium')
}
```

**Design Details**:
- Large cards: min-height 420px (spans full grid width)
- Medium cards: min-height 320px
- Hover effect: `-4px translateY`, teal border glow, image scale 1.05
- Badge: teal background with 10% opacity, teal-400 text
- Title: 2.25rem (large: 2.75rem), font-weight 800

### 3. Hero Section Complete Redesign

**File**: `src/components/sections/Hero.astro`

**Layout Structure** (40/60 Asymmetric):

#### Left Column (40%):
1. **Badge**: "AGENCIA DE CONTENIDOS Y PLANIFICACIÓN DE MEDIOS"
   - Teal background with sparkle icon
   - Uppercase, letter-spacing: 0.1em

2. **Hero Title** (3.75rem):
   - "Contenido y medios que **conectan marcas** con audiencias reales"
   - "conectan marcas" styled with teal gradient
   - Font-weight: 800, line-height: 1.05

3. **Description**:
   - Clear value proposition
   - Font-size: 1.125rem, line-height: 1.7

4. **Feature Bullets** (3 items with teal icons):
   - Planificación de medios + generación de contenido
   - Plataformas especializadas: Tour Graphic, Tour Motor, Tour Innovación
   - Estrategia, producción y distribución en un solo equipo
   - Icons: Zap, Activity, TrendingUp from lucide-react style

5. **CTA Buttons** (2 buttons):
   - Primary: "Agendar una reunión" (teal gradient background)
   - Secondary: "Ver plataformas de contenido" (outline with arrow)

6. **Stats Section**:
   - "+10 años de experiencia en medios"
   - "Clientes en sectores automotriz, tech y retail"
   - Separated by vertical divider

#### Right Column (60%):
**Grid Layout**: 2 columns

**Platform Cards**:
1. **Tour Graphic** (Large - spans 2 columns):
   - Badge: 🎯 TOUR GRAPHIC
   - Subtitle: "Contenido visual y estrategias para pantallas LED..."
   - Image: Urban LED screen (Unsplash)

2. **Tour Motor** (Medium - left):
   - Badge: 🚗 TOUR MOTOR
   - Subtitle: "Especialistas en marketing automotriz..."
   - Image: Modern vehicle (Unsplash)

3. **Tour Innovación** (Medium - right):
   - Badge: 💡 TOUR INNOVACIÓN
   - Subtitle: "Contenido tech, startups y empresas..."
   - Image: Technology/innovation (Unsplash)

### 4. Background & Gradients

**Gradient Blur Effects**:
- 3 floating teal blur circles with different sizes
- Blur: 100px, opacity: 0.12
- Slower animation: 25s (vs previous 20s)
- Colors: #14b8a6, #0d9488, #2dd4bf

**Background**:
- Linear gradient: `#020617` → `#0f172a` (slate-950 to slate-900)

### 5. Typography Improvements

**Hero Title**:
- Desktop: 3.75rem (60px)
- Tablet (≤1280px): 3.25rem
- Tablet (≤1024px): 3rem
- Mobile (≤768px): 2.25rem
- Small mobile (≤480px): 1.875rem

**Line Heights**:
- Hero title: 1.05 (tighter)
- Description: 1.7
- Feature bullets: 1.6

**Font Weights**:
- Titles: 800 (extra bold)
- Badges: 700 (bold)
- Buttons: 600 (semi-bold)

### 6. Site Configuration Update

**File**: `src/data/site.ts`

Updated tagline and description:
- **Tagline**: "Contenido y medios que conectan marcas con audiencias reales"
- **Description**: "Estrategia integral de contenido y planificación de medios. Creamos, producimos y distribuimos contenido que genera resultados medibles para tu marca."

### 7. Additional Updates

**File**: `src/components/features/MediaCard.astro`

Updated gradient-sky to use teal colors:
- Added `.gradient-teal` variant for consistency
- Updated existing `.gradient-sky` to use teal gradients

## Responsive Breakpoints

### Desktop (>1280px)
- Grid: 40% / 60%
- Title: 3.75rem
- Full feature visibility

### Large Tablet (1024px - 1280px)
- Grid: 45% / 55%
- Title: 3.25rem

### Tablet (768px - 1024px)
- Grid: Single column (stacked)
- Title: 3rem
- Platforms grid centered with max-width 700px

### Mobile (≤768px)
- Title: 2.25rem
- Vertical button layout
- Vertical stats layout
- Single column platform cards

### Small Mobile (≤480px)
- Title: 1.875rem
- Reduced padding and spacing

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy (h1, h3, p)
2. **Alt Text**: All images have descriptive alt text
3. **ARIA Labels**: Implicit through semantic structure
4. **Color Contrast**: Teal on dark background meets WCAG AA standards
5. **Focus States**: Custom outline on `:focus-visible`
6. **Reduced Motion**: Respects `prefers-reduced-motion`

## Performance Optimizations

1. **Image Loading**: `loading="lazy"` on background images
2. **Optimized Images**: Using Unsplash with query parameters for size optimization
3. **CSS Animations**: Hardware-accelerated transforms
4. **Backdrop Filters**: Used sparingly for glassmorphism effect

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for backdrop-filter (graceful degradation)
- CSS Grid with fallback behavior

## Usage

The Hero section automatically renders on the homepage:

```astro
---
import Hero from '@/components/sections/Hero.astro';
---

<Hero />
```

## Image Placeholders

Currently using Unsplash images as placeholders. Replace with actual brand images:

1. **Tour Graphic**: Update `imageSrc` in Hero.astro line 91
2. **Tour Motor**: Update `imageSrc` in Hero.astro line 101
3. **Tour Innovación**: Update `imageSrc` in Hero.astro line 111

## Future Enhancements

1. Replace Unsplash images with actual platform screenshots
2. Add animation on scroll (AOS)
3. Consider video backgrounds for platform cards
4. A/B test CTA button copy
5. Add testimonials or trust indicators

## Files Modified/Created

### Created:
- `src/components/features/PlatformCardWithImage.astro`

### Modified:
- `src/components/sections/Hero.astro` (complete redesign)
- `src/styles/global.css` (color variables)
- `src/data/site.ts` (tagline and description)
- `src/components/features/MediaCard.astro` (gradient colors)

## Color Reference

### Teal Palette
```css
/* Main Teal Colors */
--teal-400: #2dd4bf;  /* Lighter - for gradients and badges */
--teal-500: #14b8a6;  /* Primary accent */
--teal-600: #0d9488;  /* Darker - for gradients */

/* Usage */
rgba(20, 184, 166, 0.1)   /* Background with opacity */
rgba(20, 184, 166, 0.2)   /* Border with opacity */
rgba(20, 184, 166, 0.3)   /* Hover state */
```

### Background Colors
```css
--slate-950: #020617;  /* Main background */
--slate-900: #0f172a;  /* Secondary background */
--slate-800: #1e293b;  /* Tertiary background */
```

## Testing Checklist

- [x] Desktop view (1920px)
- [x] Laptop view (1440px)
- [x] Tablet view (1024px, 768px)
- [x] Mobile view (375px, 414px)
- [x] Color contrast validation
- [x] Semantic HTML validation
- [x] Responsive images
- [x] Button hover states
- [x] Card hover effects
- [x] Animation performance

---

**Last Updated**: 2025-11-16
**Version**: 2.0.0
**Designer**: Claude Code Assistant

# Plan de Medios - Sitio Web Corporativo

Sitio web corporativo para Plan de Medios, especialistas en generación de contenido en diferentes formatos.

## Características

- **Framework**: Astro 5.0 con TypeScript
- **Estilos**: Tailwind CSS 4.0
- **Diseño**: Responsive, mobile-first
- **SEO**: Optimizado con meta tags, Open Graph, Schema.org
- **Rendimiento**: Estático, ultra rápido
- **Optimización de Imágenes**: WebP/AVIF, lazy loading, responsive
- **Core Web Vitals**: Optimizado para LCP, FID, CLS
- **Documentación**: Guías completas de rendimiento y best practices

## Estructura del Proyecto

```
plan-de-medios/
├── public/                          # Archivos estáticos
│   ├── logo.svg                     # Logo principal
│   ├── favicon.svg                  # Favicon original
│   ├── favicon-improved.svg         # Favicon mejorado
│   ├── og-image.png                 # Open Graph image
│   ├── robots.txt                   # Robots.txt
│   └── placeholders/                # Imágenes placeholder
│       ├── service-placeholder.svg
│       ├── blog-placeholder.svg
│       └── team-placeholder.svg
├── src/
│   ├── components/                  # Componentes reutilizables
│   │   ├── ui/                      # Componentes UI
│   │   │   ├── OptimizedImage.astro # Componente de imagen optimizada
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── ...
│   │   ├── features/                # Componentes de características
│   │   ├── sections/                # Secciones de la página
│   │   │   ├── Header.astro
│   │   │   ├── Hero.astro
│   │   │   ├── Services.astro
│   │   │   ├── Team.astro
│   │   │   ├── Alliances.astro
│   │   │   ├── Clients.astro
│   │   │   ├── Trends.astro
│   │   │   ├── Contact.astro
│   │   │   └── Footer.astro
│   │   └── SEO.astro                # Componente SEO
│   ├── layouts/                     # Layouts
│   │   └── Layout.astro
│   ├── pages/                       # Páginas
│   │   ├── index.astro
│   │   ├── blog/
│   │   └── servicios/
│   ├── data/                        # Datos del sitio
│   └── styles/                      # Estilos globales
│       └── global.css
├── PERFORMANCE-GUIDE.md             # Guía completa de rendimiento
├── PERFORMANCE-TESTING.md           # Guía de testing
├── PERFORMANCE-SUMMARY.md           # Resumen de optimizaciones
├── OPTIMIZED-IMAGE-EXAMPLES.md      # Ejemplos de uso de imágenes
└── package.json
```

## Secciones del Sitio

1. **Hero**: Presentación impactante con estadísticas
2. **Servicios**: Tour Graphic, Tour Motor, Tour Innovación
3. **Equipo**: Presentación del equipo profesional
4. **Alianzas**: Red de colaboración estratégica
5. **Clientes**: Testimonios y casos de éxito
6. **Tendencias**: Blog con artículos sobre el sector
7. **Contacto**: Formulario de contacto

## Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## Desarrollo Local

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:4321`

## Personalización

### Colores

Los colores principales se definen en `src/styles/global.css`:

```css
:root {
  --color-primary: #1a365d;
  --color-secondary: #2c5282;
  --color-accent: #3182ce;
  /* ... */
}
```

### Contenido

- **Servicios**: Edita `src/components/Services.astro`
- **Tendencias**: Edita `src/components/Trends.astro`
- **Contacto**: Configura el formulario en `src/components/Contact.astro`

### SEO

- Actualiza los meta tags en `src/components/SEO.astro`
- Configura Google Analytics en `src/layouts/Layout.astro`

### Redes Sociales

Actualiza los enlaces en `src/components/Footer.astro`:

```typescript
const socialLinks = [
  { name: "LinkedIn", url: "TU_URL", icon: "linkedin" },
  // ...
];
```

## Despliegue

### Vercel

```bash
npm run build
# Sube la carpeta dist/ a Vercel
```

### Netlify

```bash
npm run build
# Configura el directorio de publicación como 'dist'
```

### GitHub Pages

1. Actualiza `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://tu-usuario.github.io',
  base: '/tu-repositorio',
  // ...
});
```

2. Build y deploy:
```bash
npm run build
```

## Optimizaciones de Rendimiento Implementadas

### Imágenes
- ✅ Componente OptimizedImage con lazy loading automático
- ✅ Conversión automática a WebP/AVIF
- ✅ Responsive images con srcset
- ✅ Soporte para densidades de pantalla (1x, 2x, 3x)
- ✅ Placeholders SVG incluidos

### Fuentes
- ✅ DNS Prefetch para Google Fonts
- ✅ Preconnect para conexiones tempranas
- ✅ Preload de hojas de estilo críticas
- ✅ font-display: swap para evitar FOIT

### CSS
- ✅ Sistema completo de variables CSS
- ✅ Tipografía fluida con clamp()
- ✅ CSS code splitting automático
- ✅ Soporte para prefers-reduced-motion
- ✅ Focus styles mejorados para accesibilidad

### Build
- ✅ Minificación con esbuild
- ✅ Manual chunks para vendor code
- ✅ HTML compression
- ✅ Inline de CSS pequeño

### SEO
- ✅ Diseño responsive (mobile-first)
- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Schema.org structured data
- ✅ Sitemap automático
- ✅ Canonical URLs

### Core Web Vitals
- ✅ LCP optimizado con eager loading de hero
- ✅ FID mejorado con code splitting
- ✅ CLS prevenido con width/height en imágenes
- ✅ Resource hints configurados

**Ver `PERFORMANCE-SUMMARY.md` para detalles completos de todas las optimizaciones.**

## Uso del Componente OptimizedImage

El sitio incluye un componente optimizado para imágenes que maneja automáticamente lazy loading, conversión a formatos modernos y responsive images.

### Ejemplo Básico

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import heroImage from '@/assets/hero.jpg';
---

<!-- Imagen crítica (above-the-fold) -->
<OptimizedImage
  src={heroImage}
  alt="Descripción de la imagen"
  width={1920}
  height={1080}
  loading="eager"
  quality={90}
/>

<!-- Imagen con lazy loading (below-the-fold) -->
<OptimizedImage
  src="/placeholders/service-placeholder.svg"
  alt="Servicio"
  width={400}
  height={300}
  loading="lazy"
  quality={80}
/>
```

**Ver `OPTIMIZED-IMAGE-EXAMPLES.md` para más ejemplos y casos de uso.**

## Testing de Rendimiento

### Ejecutar Lighthouse

```bash
# Opción 1: Chrome DevTools
# F12 > Lighthouse > Analyze page load

# Opción 2: CLI
npm install -g lighthouse
npm run build && npm run preview
lighthouse http://localhost:4321 --view

# Opción 3: PageSpeed Insights (producción)
# https://pagespeed.web.dev/
```

### Objetivos de Performance

- **Lighthouse Score**: >95
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1

**Ver `PERFORMANCE-TESTING.md` para guía completa de testing.**

## Documentación de Rendimiento

Este proyecto incluye documentación exhaustiva de optimización de rendimiento:

1. **PERFORMANCE-SUMMARY.md**: Resumen ejecutivo de todas las optimizaciones
2. **PERFORMANCE-GUIDE.md**: Guía completa (13 secciones, 800+ líneas)
   - Optimización de imágenes
   - Configuración de fuentes
   - CSS optimizado
   - Build optimizations
   - Core Web Vitals
   - Herramientas de testing
   - Troubleshooting
3. **PERFORMANCE-TESTING.md**: Procedimientos de testing con Lighthouse
4. **OPTIMIZED-IMAGE-EXAMPLES.md**: 10+ ejemplos de uso del componente

## Próximos Pasos

### Inmediato
1. ✅ **Build verificado**: El proyecto compila sin errores
2. ⏭️ **Lighthouse**: Ejecutar y documentar score inicial
3. ⏭️ **Imágenes**: Reemplazar placeholders con imágenes reales optimizadas
4. ⏭️ **OG Image**: Crear imagen 1200x630px para Open Graph

### Corto Plazo
1. **Contenido Real**: Reemplazar el contenido placeholder con información real
2. **Componentes**: Actualizar componentes existentes para usar OptimizedImage
3. **Blog**: Implementar sistema de blog con Astro Content Collections
4. **Formulario**: Conectar el formulario de contacto con un servicio de email
5. **Analytics**: Activar Google Analytics con tu ID

### Medio/Largo Plazo
1. **CDN**: Configurar headers de caching
2. **Monitoring**: Implementar RUM (Real User Monitoring)
3. **PWA**: Considerar implementación de Service Worker
4. **CMS**: Considerar integrar un CMS headless (Contentful, Sanity, etc.)

## Soporte

Para más información sobre Astro:
- [Documentación](https://docs.astro.build)
- [Discord](https://astro.build/chat)

## Licencia

© 2025 Plan de Medios. Todos los derechos reservados.

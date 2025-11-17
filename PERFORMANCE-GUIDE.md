# Guía de Optimización de Rendimiento - Plan de Medios

## Resumen Ejecutivo

Este documento describe las optimizaciones de rendimiento implementadas en el sitio Plan de Medios y proporciona directrices para mantener un alto rendimiento a lo largo del tiempo.

### Objetivos de Rendimiento

- **Lighthouse Score**: >95 (Performance)
- **Core Web Vitals Objetivos**:
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Time to Interactive (TTI)**: <3.5s
- **Total Blocking Time (TBT)**: <200ms
- **Speed Index**: <3.4s

---

## 1. Optimizaciones de Imágenes

### 1.1 Componente OptimizedImage

**Ubicación**: `src/components/ui/OptimizedImage.astro`

**Características**:
- Lazy loading automático para imágenes fuera del viewport
- Conversión automática a formatos modernos (WebP, AVIF)
- Generación de imágenes responsive con srcset
- Soporte para densidades de píxeles (1x, 2x)
- Calidad optimizada (80% por defecto)

**Uso Básico**:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import heroImage from '@/assets/hero.jpg';
---

<!-- Imagen local con lazy loading -->
<OptimizedImage
  src={heroImage}
  alt="Descripción de la imagen"
  width={800}
  height={600}
  loading="lazy"
/>

<!-- Imagen crítica (above the fold) -->
<OptimizedImage
  src={heroImage}
  alt="Hero principal"
  width={1200}
  height={800}
  loading="eager"
/>

<!-- Imagen responsive con tamaños específicos -->
<OptimizedImage
  src={heroImage}
  alt="Imagen responsive"
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
/>
```

**Mejores Prácticas**:

1. **Always provide width and height**: Evita el CLS (Cumulative Layout Shift)
2. **Use lazy loading**: Para todas las imágenes excepto las del hero/above-the-fold
3. **Optimiza antes de subir**: Reduce el tamaño de las imágenes originales
4. **Usa formatos vectoriales (SVG)**: Para logos, iconos y gráficos simples
5. **Aspect ratios consistentes**: Mantén proporciones consistentes en diseños similares

### 1.2 Configuración de Astro

**Ubicación**: `astro.config.mjs`

```javascript
image: {
  format: ['webp', 'avif'],
  quality: 80,
  remotePatterns: [
    { protocol: 'https', hostname: '**.googleusercontent.com' },
    { protocol: 'https', hostname: '**.unsplash.com' },
  ],
}
```

### 1.3 Imágenes Placeholder

**Ubicación**: `public/placeholders/`

Disponibles para uso inmediato:
- `service-placeholder.svg` - Para tarjetas de servicios
- `blog-placeholder.svg` - Para artículos de blog
- `team-placeholder.svg` - Para miembros del equipo

**Uso**:

```astro
<OptimizedImage
  src="/placeholders/service-placeholder.svg"
  alt="Servicio placeholder"
  width={400}
  height={300}
/>
```

### 1.4 Cómo Agregar Nuevas Imágenes

**Paso 1**: Optimiza la imagen antes de subirla
- Usa herramientas como [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)
- Reduce dimensiones a las necesarias (no subas 4000px si solo necesitas 1200px)
- Objetivo: <200KB para imágenes de contenido, <100KB para thumbnails

**Paso 2**: Coloca la imagen en el directorio apropiado
- `/src/assets/` - Para imágenes que necesitan procesamiento (RECOMENDADO)
- `/public/` - Para imágenes estáticas que no necesitan procesamiento

**Paso 3**: Importa y usa con OptimizedImage

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import myImage from '@/assets/my-new-image.jpg';
---

<OptimizedImage
  src={myImage}
  alt="Descripción descriptiva"
  width={800}
  height={600}
/>
```

---

## 2. Optimización de Fuentes

### 2.1 Configuración Actual

**Ubicación**: `src/layouts/Layout.astro`

**Optimizaciones Implementadas**:

1. **DNS Prefetch**: Resuelve DNS antes de que se necesite
2. **Preconnect**: Establece conexión temprana con Google Fonts
3. **Preload**: Carga la hoja de estilos de fuentes con prioridad
4. **font-display: swap**: Muestra texto inmediatamente con fuente de sistema

```html
<!-- DNS Prefetch & Preconnect -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload Critical Fonts -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />

<!-- Fonts with font-display: swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### 2.2 Fuentes Locales (Opcional - Mayor Performance)

Para máximo rendimiento, considera hospedar fuentes localmente:

**Paso 1**: Descarga las fuentes
- Usa [google-webfonts-helper](https://gwfh.mranftl.com/fonts)

**Paso 2**: Coloca en `public/fonts/`

**Paso 3**: Define @font-face en `global.css`:

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-700.woff2') format('woff2');
}
```

**Ventajas**:
- Sin solicitudes a dominios externos
- Control total sobre el caching
- Menos tiempo de carga de fuentes

**Desventajas**:
- Archivos adicionales para mantener
- Sin actualizaciones automáticas de Google

---

## 3. Optimización de CSS

### 3.1 Variables CSS Personalizadas

**Ubicación**: `src/styles/global.css`

Todas las variables están centralizadas para fácil mantenimiento:

```css
:root {
  /* Colores */
  --color-primary: #1a365d;
  --color-secondary: #2c5282;
  --color-accent: #3182ce;

  /* Espaciado */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;

  /* Tipografía */
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}
```

**Uso**:

```css
.mi-componente {
  color: var(--color-primary);
  padding: var(--spacing-md);
  transition: all var(--transition-base);
}
```

### 3.2 Tipografía Fluida con clamp()

Las fuentes se escalan automáticamente según el viewport:

```css
h1 {
  font-size: clamp(2rem, 5vw, 2.5rem);
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2rem);
}
```

**Beneficios**:
- Sin media queries adicionales
- Escala suave entre breakpoints
- Mejor legibilidad en todos los dispositivos

### 3.3 Reducción de Movimiento (Accesibilidad)

Respeta las preferencias del usuario:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.4 CSS Code Splitting

Configurado automáticamente en `astro.config.mjs`:

```javascript
vite: {
  build: {
    cssCodeSplit: true,
  }
}
```

**Resultado**: CSS se divide automáticamente por ruta, reduciendo el CSS inicial.

---

## 4. Resource Hints

### 4.1 Preconnect

Ya configurado para Google Fonts. Para agregar más:

```html
<!-- Ejemplo: Preconnect para API -->
<link rel="preconnect" href="https://api.tuservicio.com" />

<!-- Ejemplo: Preconnect para CDN de imágenes -->
<link rel="preconnect" href="https://images.tuservicio.com" crossorigin />
```

### 4.2 DNS Prefetch

Para recursos de menor prioridad:

```html
<link rel="dns-prefetch" href="https://analytics.google.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

### 4.3 Preload

Para recursos críticos específicos:

```html
<!-- Preload de imagen hero crítica -->
<link rel="preload" as="image" href="/hero.webp" />

<!-- Preload de script crítico -->
<link rel="preload" as="script" href="/critical.js" />
```

**Advertencia**: No abuses del preload. Solo para recursos verdaderamente críticos.

---

## 5. Build Optimizations

### 5.1 Configuración de Build

**Ubicación**: `astro.config.mjs`

```javascript
build: {
  inlineStylesheets: 'auto',
  assetsPrefix: undefined,
},

vite: {
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
}
```

**Beneficios**:
- CSS pequeño inline automáticamente
- Vendor code separado para mejor caching
- Minificación rápida con esbuild
- Code splitting automático

### 5.2 HTML Compression

```javascript
compressHTML: true
```

Reduce el tamaño del HTML eliminando espacios innecesarios.

---

## 6. Core Web Vitals - Estrategias

### 6.1 LCP (Largest Contentful Paint) - Objetivo: <2.5s

**Estrategias**:
1. ✅ Optimizar imágenes hero con `loading="eager"`
2. ✅ Preconnect a dominios de fuentes
3. ✅ Inline CSS crítico (automático con `inlineStylesheets: 'auto'`)
4. ✅ Usar CDN para assets estáticos (cuando esté en producción)
5. 🔄 Server-side rendering (Astro lo hace por defecto)

**Verificar**:
- La imagen más grande above-the-fold debe usar `loading="eager"`
- No debe haber blocking scripts antes del LCP

### 6.2 FID (First Input Delay) - Objetivo: <100ms

**Estrategias**:
1. ✅ Minimizar JavaScript (esbuild)
2. ✅ Code splitting automático
3. ✅ Separar vendor chunks
4. 🔄 Diferir scripts no críticos

**Para scripts externos**:

```html
<!-- Diferir Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Cargar scripts no críticos con defer -->
<script defer src="/non-critical.js"></script>
```

### 6.3 CLS (Cumulative Layout Shift) - Objetivo: <0.1

**Estrategias**:
1. ✅ Siempre especificar width/height en imágenes
2. ✅ Usar `font-display: swap` para evitar FOIT
3. ✅ Reservar espacio para contenido dinámico
4. 🔄 Evitar insertar contenido above-the-fold después de carga

**Ejemplo de espacio reservado**:

```astro
<div style="aspect-ratio: 16/9; background: #f0f0f0;">
  <OptimizedImage
    src={image}
    alt="Descripción"
    width={1600}
    height={900}
  />
</div>
```

---

## 7. Herramientas de Testing

### 7.1 Lighthouse (Recomendado)

**Método 1: Chrome DevTools**
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona "Performance" y "Desktop" o "Mobile"
4. Click en "Analyze page load"

**Método 2: CLI**

```bash
npm install -g lighthouse
lighthouse https://www.plandemedios.com --view
```

**Método 3: PageSpeed Insights**
- Visita: https://pagespeed.web.dev/
- Introduce: https://www.plandemedios.com

### 7.2 WebPageTest

URL: https://www.webpagetest.org/

**Configuración recomendada**:
- Location: Closest to your users
- Browser: Chrome
- Connection: Cable (para baseline), 3G (para worst-case)

**Métricas clave**:
- Start Render
- Speed Index
- Time to Interactive
- Filmstrip view (visual)

### 7.3 Chrome User Experience Report (CrUX)

Datos de usuarios reales:
- https://developer.chrome.com/docs/crux/

### 7.4 Lighthouse CI (Continous Integration)

Para integración en CI/CD:

```bash
npm install -g @lhci/cli

# Configurar
lhci autorun

# En package.json
{
  "scripts": {
    "perf": "lhci autorun"
  }
}
```

---

## 8. Checklist de Optimización

### Antes de Deployar

- [ ] Ejecutar `npm run build` sin errores
- [ ] Lighthouse score >90 en todas las categorías
- [ ] Todas las imágenes tienen width/height
- [ ] No hay console.log() en producción
- [ ] Meta tags SEO completos
- [ ] Sitemap generado correctamente
- [ ] robots.txt configurado
- [ ] Favicon y OG images actualizados

### Después de Deployar

- [ ] Ejecutar Lighthouse en URL de producción
- [ ] Verificar Core Web Vitals en PageSpeed Insights
- [ ] Probar en dispositivos móviles reales
- [ ] Verificar en diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Verificar carga en conexiones lentas (3G)
- [ ] Configurar monitoreo de rendimiento (New Relic, DataDog, etc.)

### Mensualmente

- [ ] Revisar métricas de Core Web Vitals
- [ ] Auditar imágenes nuevas agregadas
- [ ] Verificar tamaño de bundle JavaScript
- [ ] Revisar tiempos de carga de página
- [ ] Actualizar dependencias (npm outdated)

---

## 9. Optimizaciones Futuras

### 9.1 Service Worker (PWA)

Para caching offline y rendimiento mejorado:

```bash
npm install @astrojs/pwa
```

**Beneficios**:
- Caching offline
- Instalable como app
- Precaching de assets
- Background sync

### 9.2 CDN Configuration

Headers recomendados para Cloudflare/Netlify/Vercel:

```
# Cache-Control headers
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=604800

/*.png
  Cache-Control: public, max-age=604800

/*.webp
  Cache-Control: public, max-age=604800
```

### 9.3 Image CDN

Considera usar un CDN especializado en imágenes:
- Cloudinary
- Imgix
- ImageKit

**Ventajas**:
- Transformaciones on-the-fly
- Mejor compresión
- Auto-formato basado en navegador
- Lazy loading automático

### 9.4 Critical CSS Extraction

Para sitios más complejos:

```bash
npm install critical
```

Extrae y inline CSS crítico automáticamente.

### 9.5 Prerendering Incremental

Para sitios con muchas páginas:

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  })
});
```

---

## 10. Monitoreo de Rendimiento

### 10.1 Google Analytics 4 - Web Vitals

Integra métricas de rendimiento en GA4:

```html
<script>
  function sendToGoogleAnalytics({name, delta, id}) {
    gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }

  // Requiere web-vitals library
  import {getCLS, getFID, getLCP} from 'web-vitals';
  getCLS(sendToGoogleAnalytics);
  getFID(sendToGoogleAnalytics);
  getLCP(sendToGoogleAnalytics);
</script>
```

### 10.2 Real User Monitoring (RUM)

Herramientas recomendadas:
- **SpeedCurve**: Monitoreo continuo y alertas
- **Calibre**: Performance budgets
- **New Relic**: Full-stack monitoring
- **DataDog**: APM y RUM integrados

### 10.3 Performance Budgets

Define límites para mantener rendimiento:

```json
{
  "budgets": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 300 },
        { "resourceType": "image", "budget": 500 },
        { "resourceType": "total", "budget": 1000 }
      ]
    }
  ]
}
```

---

## 11. Troubleshooting

### Problema: Lighthouse score bajo en "Performance"

**Diagnóstico**:
1. Verifica qué métrica específica está fallando (LCP, TBT, CLS)
2. Revisa la sección "Opportunities" en Lighthouse
3. Verifica el tamaño de imágenes y JavaScript

**Soluciones**:
- Optimizar imágenes más grandes
- Reducir JavaScript bloqueante
- Implementar lazy loading

### Problema: CLS alto

**Diagnóstico**:
1. Revisa elementos que cambian de posición al cargar
2. Verifica imágenes sin width/height
3. Revisa fuentes con FOIT

**Soluciones**:
- Añade width/height a todas las imágenes
- Usa `font-display: swap`
- Reserva espacio para ads o contenido dinámico

### Problema: LCP lento

**Diagnóstico**:
1. Identifica cuál es el elemento LCP (Lighthouse te lo muestra)
2. Verifica si es una imagen, texto o video
3. Checa el tamaño del recurso

**Soluciones**:
- Optimiza la imagen LCP
- Usa `loading="eager"` para imagen hero
- Implementa preconnect para fuentes
- Reduce CSS bloqueante

---

## 12. Recursos Adicionales

### Documentación Oficial
- [Astro Performance Guide](https://docs.astro.build/en/guides/performance/)
- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

### Herramientas
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [web-vitals](https://github.com/GoogleChrome/web-vitals)
- [Bundlephobia](https://bundlephobia.com/) - Analiza tamaño de dependencias
- [Can I Use](https://caniuse.com/) - Compatibilidad de características

### Blogs y Artículos
- [Web.dev Blog](https://web.dev/blog/)
- [Smashing Magazine Performance](https://www.smashingmagazine.com/category/performance)
- [CSS Tricks Performance](https://css-tricks.com/tag/performance/)

---

## 13. Contacto y Soporte

Para preguntas sobre optimización de rendimiento del sitio Plan de Medios:

- **Documentación del Proyecto**: README.md
- **Issues**: Reportar en el sistema de control de versiones
- **Performance Team**: [Tu contacto aquí]

---

**Última actualización**: 2025-11-16
**Versión**: 1.0.0
**Mantenido por**: Equipo de Desarrollo Plan de Medios

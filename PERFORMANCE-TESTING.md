# Testing de Rendimiento - Plan de Medios

## Resumen de Optimizaciones Implementadas

### 1. Componente de Imagen Optimizado ✅

**Archivo**: `src/components/ui/OptimizedImage.astro`

**Características**:
- Lazy loading automático
- Conversión a WebP/AVIF
- Responsive images con srcset
- Soporte para densidades 1x y 2x
- Configuración de calidad (80% por defecto)

### 2. Assets Creados ✅

**Logos y Favicons**:
- `public/logo.svg` - Logo principal del sitio
- `public/favicon-improved.svg` - Favicon mejorado
- `public/og-image.png` - Imagen para Open Graph (placeholder)

**Placeholders**:
- `public/placeholders/service-placeholder.svg`
- `public/placeholders/blog-placeholder.svg`
- `public/placeholders/team-placeholder.svg`

### 3. Optimización de Fuentes ✅

**Archivo**: `src/layouts/Layout.astro`

**Mejoras**:
- DNS Prefetch para fonts.googleapis.com y fonts.gstatic.com
- Preconnect para establecer conexiones tempranas
- Preload de hojas de estilo de fuentes
- `font-display: swap` para evitar FOIT
- Apple Touch Icon configurado

### 4. Optimización de CSS ✅

**Archivo**: `src/styles/global.css`

**Mejoras**:
- Sistema de variables CSS completo (colores, espaciado, tipografía, transiciones)
- Tipografía fluida con clamp() para responsive
- Font smoothing y text rendering optimizados
- Focus styles mejorados para accesibilidad
- Soporte para `prefers-reduced-motion`
- Optimización de display para imágenes, video, canvas, svg

### 5. Configuración de Build ✅

**Archivo**: `astro.config.mjs`

**Optimizaciones**:
- Image optimization (WebP, AVIF, quality 80)
- Remote patterns para imágenes externas
- Inline stylesheets automático
- CSS code splitting habilitado
- Minificación con esbuild
- Manual chunks para vendor code
- HTML compression habilitado
- Script hoisting optimizado

---

## Cómo Ejecutar Lighthouse

### Opción 1: Chrome DevTools (Recomendado para desarrollo)

1. Abre el sitio en Chrome
2. Presiona `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Ve a la pestaña "Lighthouse"
4. Configuración recomendada:
   - Mode: Navigation
   - Device: Mobile y Desktop (prueba ambos)
   - Categories: Performance, Accessibility, Best Practices, SEO
5. Click "Analyze page load"

### Opción 2: PageSpeed Insights (Recomendado para producción)

1. Visita: https://pagespeed.web.dev/
2. Introduce la URL: `https://www.plandemedios.com`
3. Espera los resultados
4. Revisa ambas pestañas: Mobile y Desktop
5. Descarga el reporte si es necesario

### Opción 3: Lighthouse CLI

```bash
# Instalar Lighthouse globalmente
npm install -g lighthouse

# Ejecutar en el sitio local (después de npm run build && npm run preview)
lighthouse http://localhost:4321 --view

# Ejecutar en producción
lighthouse https://www.plandemedios.com --view --output html --output-path ./lighthouse-report.html

# Con configuración específica
lighthouse https://www.plandemedios.com \
  --only-categories=performance \
  --form-factor=mobile \
  --throttling.cpuSlowdownMultiplier=4 \
  --view
```

### Opción 4: Lighthouse CI (Para integración continua)

```bash
# Instalar
npm install -g @lhci/cli

# Ejecutar
lhci autorun --collect.url=http://localhost:4321
```

---

## Resultados Esperados (Objetivos)

### Lighthouse Scores (Objetivo: >95)

| Categoría | Objetivo | Prioridad |
|-----------|----------|-----------|
| Performance | >95 | Alta |
| Accessibility | >95 | Alta |
| Best Practices | >95 | Media |
| SEO | >95 | Alta |

### Core Web Vitals (Objetivos)

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| LCP (Largest Contentful Paint) | <2.5s | Tiempo hasta que el contenido principal está visible |
| FID (First Input Delay) | <100ms | Tiempo de respuesta a primera interacción |
| CLS (Cumulative Layout Shift) | <0.1 | Estabilidad visual durante la carga |

### Otras Métricas Importantes

| Métrica | Objetivo |
|---------|----------|
| First Contentful Paint (FCP) | <1.8s |
| Speed Index | <3.4s |
| Time to Interactive (TTI) | <3.8s |
| Total Blocking Time (TBT) | <200ms |

---

## Interpretando los Resultados

### Rango de Scores

- **90-100**: Verde - Excelente
- **50-89**: Naranja - Necesita mejoras
- **0-49**: Rojo - Pobre

### Secciones del Reporte

1. **Metrics**: Muestra las métricas principales con sus valores
2. **Opportunities**: Sugiere optimizaciones específicas con ahorro estimado
3. **Diagnostics**: Información adicional sobre posibles problemas
4. **Passed Audits**: Lista de prácticas que ya estás haciendo bien

### Métricas Clave a Monitorear

**LCP (Largest Contentful Paint)**:
- ¿Qué es? El tiempo que tarda en renderizarse el elemento más grande visible
- Comúnmente: Imagen hero, bloque de texto principal
- Cómo mejorar:
  - Optimizar imagen hero
  - Usar `loading="eager"` en imágenes above-the-fold
  - Preconnect a dominios externos
  - Reducir CSS bloqueante

**FID (First Input Delay)**:
- ¿Qué es? Tiempo desde que el usuario interactúa hasta que el navegador responde
- Cómo mejorar:
  - Reducir JavaScript bloqueante
  - Code splitting
  - Diferir scripts no críticos
  - Usar web workers para tareas pesadas

**CLS (Cumulative Layout Shift)**:
- ¿Qué es? Cuánto se mueve el contenido durante la carga
- Cómo mejorar:
  - Siempre especificar width/height en imágenes
  - Reservar espacio para ads o contenido dinámico
  - Usar `font-display: swap`
  - Evitar insertar contenido above-the-fold después de carga

---

## Checklist Post-Optimización

### Verificación Inmediata

- [ ] El sitio se construye sin errores (`npm run build`)
- [ ] El sitio se visualiza correctamente en preview (`npm run preview`)
- [ ] No hay errores en la consola del navegador
- [ ] Las imágenes cargan correctamente
- [ ] Las fuentes se muestran correctamente
- [ ] Los colores y estilos son consistentes

### Testing de Performance

- [ ] Lighthouse score Performance >90 (mobile)
- [ ] Lighthouse score Performance >95 (desktop)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] No hay recursos bloqueantes críticos
- [ ] Imágenes en formato WebP/AVIF
- [ ] CSS está minificado
- [ ] JavaScript está minificado

### Testing de Accesibilidad

- [ ] Lighthouse Accessibility >95
- [ ] Todas las imágenes tienen alt text descriptivo
- [ ] Contraste de colores cumple WCAG AA
- [ ] Navegación con teclado funciona correctamente
- [ ] Focus indicators visibles
- [ ] ARIA labels donde sea necesario

### Testing de SEO

- [ ] Lighthouse SEO >95
- [ ] Meta description presente y única en cada página
- [ ] Title tags descriptivos y únicos
- [ ] Heading hierarchy correcta (h1 > h2 > h3)
- [ ] Sitemap.xml generado
- [ ] robots.txt configurado
- [ ] Open Graph tags presentes
- [ ] Canonical URLs configurados

### Testing de Best Practices

- [ ] Lighthouse Best Practices >95
- [ ] HTTPS configurado (en producción)
- [ ] No hay errores en consola
- [ ] Imágenes con aspect ratio correcto
- [ ] Sin librerías con vulnerabilidades conocidas
- [ ] Content Security Policy configurado (opcional)

### Testing Cross-Browser

- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Edge (última versión)
- [ ] Chrome Mobile
- [ ] Safari iOS

### Testing en Dispositivos

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667 - iPhone SE)
- [ ] Mobile (390x844 - iPhone 12)
- [ ] Mobile (360x640 - Android común)

---

## Problemas Comunes y Soluciones

### Problema: "Serve static assets with an efficient cache policy"

**Solución**: Configurar headers en el servidor/CDN:

```
# .htaccess (Apache)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Netlify (_headers file)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Vercel (vercel.json)
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Problema: "Eliminate render-blocking resources"

**Solución**:
1. Ya implementado: inline de CSS crítico
2. Diferir fuentes no críticas
3. Usar `async` o `defer` en scripts

```html
<!-- Diferir scripts no críticos -->
<script defer src="/analytics.js"></script>

<!-- Async para scripts independientes -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Problema: "Image elements do not have explicit width and height"

**Solución**: Siempre especificar dimensiones

```astro
<!-- Incorrecto -->
<img src="/imagen.jpg" alt="Descripción" />

<!-- Correcto -->
<OptimizedImage
  src="/imagen.jpg"
  alt="Descripción"
  width={800}
  height={600}
/>
```

### Problema: "Largest Contentful Paint element"

**Solución**: Optimizar el elemento LCP específico

1. Identifica cuál es (Lighthouse te lo muestra)
2. Si es imagen: optimiza y usa `loading="eager"`
3. Si es texto: asegúrate que las fuentes carguen rápido
4. Preconnect a recursos externos necesarios

---

## Comandos Útiles

### Build y Preview

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Build + Preview
npm run build && npm run preview
```

### Testing de Performance

```bash
# Lighthouse sobre build local
npm run build && npm run preview &
lighthouse http://localhost:4321 --view

# Analizar bundle size
npx vite-bundle-visualizer

# Analizar dependencias
npm list --depth=0
npm outdated
```

### Limpieza

```bash
# Limpiar caché de Astro
rm -rf .astro

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpiar dist
rm -rf dist
```

---

## Monitoreo Continuo

### Configurar Alertas

Una vez en producción, configura alertas para:

1. **PageSpeed Insights API**:
   - Monitoreo diario automático
   - Alertas si score baja de 90

2. **Lighthouse CI**:
   - Ejecutar en cada deploy
   - Fallar CI si performance baja de umbral

3. **Real User Monitoring (RUM)**:
   - New Relic, DataDog, o similar
   - Alertas para degradación de Core Web Vitals

### Métricas a Trackear

Semanalmente:
- Lighthouse scores promedio
- Core Web Vitals (LCP, FID, CLS)
- Tamaño de bundle JavaScript
- Tamaño total de página
- Número de requests

Mensualmente:
- Tendencias de performance
- Comparación con competidores
- Impacto de nuevas features
- ROI de optimizaciones

---

## Próximos Pasos

### Corto Plazo (1-2 semanas)

1. Ejecutar Lighthouse en build local
2. Documentar scores iniciales
3. Implementar fixes para issues críticos
4. Re-ejecutar y comparar

### Medio Plazo (1 mes)

1. Deploy a staging
2. Ejecutar Lighthouse en staging
3. Configurar monitoring en producción
4. Establecer performance budget

### Largo Plazo (3+ meses)

1. Implementar PWA si es necesario
2. Configurar CDN con caching óptimo
3. Implementar prerendering incremental
4. A/B testing de optimizaciones
5. Análisis de conversión vs performance

---

## Recursos de Testing

### Herramientas Online

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [Pingdom](https://tools.pingdom.com/)
- [DebugBear](https://www.debugbear.com/test/website-speed)

### Herramientas Locales

- Chrome DevTools (Lighthouse, Performance, Network)
- Firefox DevTools (Performance)
- Safari Web Inspector

### Extensiones de Navegador

- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/)
- [Web Vitals](https://chrome.google.com/webstore/detail/web-vitals/)
- [DebugBear](https://chrome.google.com/webstore/detail/debugbear/)

---

## Documentación de Resultados

### Template de Reporte

```markdown
# Lighthouse Report - [Fecha]

## Configuración
- URL: [URL testeada]
- Device: [Mobile/Desktop]
- Connection: [Simulated throttling]
- Lighthouse Version: [x.x.x]

## Scores

| Categoría | Score | Change |
|-----------|-------|--------|
| Performance | XX/100 | +/- X |
| Accessibility | XX/100 | +/- X |
| Best Practices | XX/100 | +/- X |
| SEO | XX/100 | +/- X |

## Core Web Vitals

| Métrica | Valor | Status | Target |
|---------|-------|--------|--------|
| LCP | X.Xs | ✅/⚠️/❌ | <2.5s |
| FID | XXms | ✅/⚠️/❌ | <100ms |
| CLS | X.XX | ✅/⚠️/❌ | <0.1 |

## Opportunities

1. [Opportunity 1] - Estimated saving: Xs
2. [Opportunity 2] - Estimated saving: Xs

## Actions Taken

- [Action 1]
- [Action 2]

## Next Steps

- [ ] [Next step 1]
- [ ] [Next step 2]
```

---

**Creado**: 2025-11-16
**Última actualización**: 2025-11-16
**Versión**: 1.0.0

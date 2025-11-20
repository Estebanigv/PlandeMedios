# Quick Start - Optimización de Rendimiento

## Resumen Rápido

Se han implementado optimizaciones completas de rendimiento en el sitio Plan de Medios.

**Estado**: ✅ Build exitoso | 📊 Listo para testing

---

## Comandos Rápidos

```bash
# Navegar al proyecto
cd "E:\Proyectos Webs\Plan de Medios\plan-de-medios"

# Instalar dependencias (si es necesario)
npm install

# Desarrollo
npm run dev
# Abre: http://localhost:4321

# Build para producción
npm run build

# Preview del build
npm run preview
# Abre: http://localhost:4321

# Build + Preview
npm run build && npm run preview
```

---

## Testing de Performance (3 Opciones)

### Opción 1: Chrome DevTools (Más Rápido)

1. Ejecuta: `npm run build && npm run preview`
2. Abre Chrome en http://localhost:4321
3. Presiona F12
4. Ve a pestaña "Lighthouse"
5. Click "Analyze page load"

### Opción 2: Lighthouse CLI

```bash
# Instalar Lighthouse
npm install -g lighthouse

# Build y preview
npm run build && npm run preview

# En otra terminal
lighthouse http://localhost:4321 --view
```

### Opción 3: PageSpeed Insights (Producción)

1. Deploy el sitio
2. Visita: https://pagespeed.web.dev/
3. Introduce tu URL
4. Espera resultados

---

## Archivos Importantes

### Documentación (Lee Primero)

- **PERFORMANCE-SUMMARY.md** - Resumen ejecutivo (empieza aquí)
- **PERFORMANCE-GUIDE.md** - Guía completa de 13 secciones
- **PERFORMANCE-TESTING.md** - Cómo hacer testing
- **OPTIMIZED-IMAGE-EXAMPLES.md** - Ejemplos de uso de imágenes

### Componentes Nuevos

- **src/components/ui/OptimizedImage.astro** - Componente de imagen

### Assets Nuevos

- **public/logo.svg** - Logo principal
- **public/favicon-improved.svg** - Favicon mejorado
- **public/placeholders/** - Placeholders SVG

### Configuración Modificada

- **astro.config.mjs** - Optimización de build e imágenes
- **src/layouts/Layout.astro** - Resource hints y preload
- **src/styles/global.css** - Variables CSS y optimizaciones

---

## Usar OptimizedImage (Copiar/Pegar)

### Hero Image (Above-the-Fold)

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import heroImage from '@/assets/hero.jpg';
---

<OptimizedImage
  src={heroImage}
  alt="Plan de Medios - Hero"
  width={1920}
  height={1080}
  loading="eager"
  quality={90}
/>
```

### Content Image (Lazy Loading)

```astro
<OptimizedImage
  src={contentImage}
  alt="Descripción"
  width={800}
  height={600}
  loading="lazy"
  quality={80}
/>
```

### Placeholder

```astro
<OptimizedImage
  src="/placeholders/service-placeholder.svg"
  alt="Servicio"
  width={400}
  height={300}
/>
```

---

## Checklist Inmediato

### Antes de Deploy

- [ ] `npm run build` funciona sin errores ✅
- [ ] `npm run preview` muestra el sitio correctamente
- [ ] Lighthouse Performance >90 (local)
- [ ] Todas las imágenes cargan correctamente
- [ ] No hay errores en consola del navegador

### Contenido

- [ ] Reemplazar placeholders con imágenes reales
- [ ] Optimizar imágenes antes de subir (TinyPNG, Squoosh)
- [ ] Crear og-image.png real (1200x630px)
- [ ] Verificar todos los alt texts son descriptivos
- [ ] Revisar que width/height estén en todas las imágenes

### Testing

- [ ] Ejecutar Lighthouse en localhost
- [ ] Documentar score inicial
- [ ] Probar en Chrome, Firefox, Safari
- [ ] Probar en móvil real
- [ ] Verificar carga en 3G (DevTools)

---

## Objetivos de Performance

| Métrica | Objetivo | Cómo Mejorar |
|---------|----------|--------------|
| Lighthouse Performance | >95 | Ver PERFORMANCE-GUIDE.md |
| LCP | <2.5s | Optimizar imagen hero, usar eager loading |
| FID | <100ms | Code splitting, diferir scripts |
| CLS | <0.1 | Width/height en imágenes |

---

## Próximos Pasos (En Orden)

### Hoy

1. ✅ Verificar build
2. ⏭️ Ejecutar Lighthouse local
3. ⏭️ Documentar score inicial
4. ⏭️ Leer PERFORMANCE-SUMMARY.md

### Esta Semana

1. ⏭️ Reemplazar placeholders con imágenes reales
2. ⏭️ Actualizar componentes para usar OptimizedImage
3. ⏭️ Crear og-image.png real
4. ⏭️ Deploy a staging
5. ⏭️ Lighthouse en staging

### Este Mes

1. ⏭️ Deploy a producción
2. ⏭️ Configurar CDN
3. ⏭️ Implementar monitoring
4. ⏭️ Analizar métricas reales

---

## Solución Rápida de Problemas

### Build Falla

```bash
# Limpiar y reinstalar
rm -rf .astro dist node_modules
npm install
npm run build
```

### Imágenes No Cargan

- Verifica la ruta
- Importa imágenes locales: `import img from '@/assets/...'`
- Para públicas usa: `src="/path.jpg"`

### Lighthouse Score Bajo

1. Lee sección "Opportunities" en Lighthouse
2. Consulta PERFORMANCE-GUIDE.md sección correspondiente
3. Verifica que imágenes usen OptimizedImage
4. Revisa que hero use loading="eager"

---

## Recursos Rápidos

### Optimizar Imágenes Online

- [Squoosh](https://squoosh.app/) - Compresión avanzada
- [TinyPNG](https://tinypng.com/) - PNG/JPG simple
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG

### Testing

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### Documentación

- [Astro Docs](https://docs.astro.build)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

## Estructura de Archivos de Docs

```
📄 QUICK-START.md (este archivo)
   ↓ Lee primero para empezar rápido

📄 PERFORMANCE-SUMMARY.md
   ↓ Resumen ejecutivo de todas las optimizaciones

📄 PERFORMANCE-GUIDE.md
   ↓ Guía completa (13 secciones, deep dive)

📄 PERFORMANCE-TESTING.md
   ↓ Cómo ejecutar tests y interpretar resultados

📄 OPTIMIZED-IMAGE-EXAMPLES.md
   ↓ Ejemplos prácticos de uso de imágenes
```

---

## Contacto Rápido

**Problemas?**
1. Revisa PERFORMANCE-GUIDE.md sección 11 (Troubleshooting)
2. Verifica consola de errores
3. Revisa que todas las dependencias estén instaladas
4. Intenta limpiar caché (ver arriba)

---

## Mejoras Implementadas (TL;DR)

✅ Componente OptimizedImage (WebP, AVIF, lazy loading)
✅ Placeholders SVG para desarrollo rápido
✅ Fuentes optimizadas (preconnect, preload, swap)
✅ CSS optimizado (variables, fluid typography)
✅ Build optimizado (code splitting, minification)
✅ Resource hints configurados
✅ HTML compression habilitado
✅ Documentación completa (4 archivos)

**Resultado**: Sitio preparado para Lighthouse >95

---

**Creado**: 2025-11-16
**Versión**: 1.0.0
**Estado**: ✅ Listo para Testing

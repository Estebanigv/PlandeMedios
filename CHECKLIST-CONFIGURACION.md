# Checklist de Configuración - Plan de Medios

## Pasos Inmediatos Después de las Mejoras

### 1. Configurar Variables de Entorno

- [ ] Copiar `.env.example` a `.env`
  ```bash
  cp .env.example .env
  ```

- [ ] Editar `.env` y actualizar las siguientes variables:

  **Requerido:**
  - [ ] `PUBLIC_SITE_URL` - URL de producción del sitio

  **Importante:**
  - [ ] `PUBLIC_CONTACT_EMAIL` - Email real de contacto
  - [ ] `PUBLIC_CONTACT_PHONE` - Teléfono de contacto (formato: +1234567890)
  - [ ] `PUBLIC_CONTACT_PHONE_FORMATTED` - Teléfono formateado para mostrar

  **Dirección:**
  - [ ] `PUBLIC_ADDRESS_STREET` - Calle y número
  - [ ] `PUBLIC_ADDRESS_CITY` - Ciudad
  - [ ] `PUBLIC_ADDRESS_COUNTRY` - País
  - [ ] `PUBLIC_ADDRESS_FULL` - Dirección completa

  **Redes Sociales:**
  - [ ] `PUBLIC_SOCIAL_LINKEDIN` - URL de LinkedIn
  - [ ] `PUBLIC_SOCIAL_FACEBOOK` - URL de Facebook
  - [ ] `PUBLIC_SOCIAL_INSTAGRAM` - URL de Instagram
  - [ ] `PUBLIC_SOCIAL_TWITTER` - URL de Twitter/X

### 2. Actualizar Datos del Sitio

Edita `src/data/site.ts` para personalizar:

- [ ] Verificar nombre del sitio
- [ ] Revisar tagline (eslogan)
- [ ] Confirmar descripción
- [ ] Actualizar horarios de atención
- [ ] Revisar información legal (companyName, taxId)

### 3. Actualizar Navegación

Edita `src/data/navigation.ts` si necesitas:

- [ ] Agregar/remover items del menú principal
- [ ] Actualizar links del footer
- [ ] Modificar enlaces de servicios
- [ ] Agregar aria-labels personalizados

### 4. Configurar Redes Sociales

Edita `src/data/social.ts` para:

- [ ] Actualizar URLs reales de redes sociales
- [ ] Verificar usernames/handles
- [ ] Agregar/remover plataformas
- [ ] Personalizar aria-labels

### 5. Actualizar Estadísticas

Edita `src/data/stats.ts` para:

- [ ] Actualizar números del hero (proyectos, años, etc.)
- [ ] Modificar estadísticas de la empresa
- [ ] Actualizar métricas de rendimiento
- [ ] Agregar descripciones relevantes

### 6. Información del Equipo

Edita `src/data/team.ts` para:

- [ ] Agregar miembros reales del equipo
- [ ] Actualizar valores corporativos
- [ ] Revisar misión y visión
- [ ] Personalizar motto

### 7. SEO y Metadatos

- [ ] Revisar keywords en `src/data/site.ts`
- [ ] Crear imágenes Open Graph personalizadas (1200x630px)
- [ ] Colocar logo en `/public/logo.png`
- [ ] Colocar imagen OG en `/public/og-image.jpg`

### 8. Verificar Build

- [ ] Ejecutar build local
  ```bash
  npm run build
  ```

- [ ] Verificar que no haya errores
- [ ] Revisar archivos generados en `dist/`
- [ ] Comprobar sitemaps:
  - `dist/sitemap-index.xml`
  - `dist/sitemap-0.xml`

### 9. Testing SEO

Después del deploy, verificar con estas herramientas:

- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Verificar Schema.org markup
  - Confirmar que no hay errores

- [ ] [Schema Validator](https://validator.schema.org/)
  - Validar estructura de datos
  - Verificar todos los tipos de schema

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - Verificar Open Graph tags
  - Comprobar imagen preview
  - Limpiar caché si es necesario

- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - Verificar Twitter Cards
  - Comprobar preview

### 10. Google Search Console

- [ ] Acceder a [Google Search Console](https://search.google.com/search-console)
- [ ] Agregar/verificar propiedad del sitio
- [ ] Enviar sitemap: `https://www.plandemedios.com/sitemap-index.xml`
- [ ] Solicitar indexación de páginas principales
- [ ] Configurar alertas de errores

### 11. Analytics (Opcional)

Si vas a usar analytics, descomenta en `.env`:

- [ ] `PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- [ ] `PUBLIC_GTM_ID` - Google Tag Manager
- [ ] `PUBLIC_FB_PIXEL_ID` - Facebook Pixel

### 12. Imágenes y Assets

Preparar y colocar en `/public/`:

- [ ] `/logo.png` - Logo de la empresa (formato PNG transparente)
- [ ] `/og-image.jpg` - Imagen por defecto para redes sociales (1200x630px)
- [ ] `/images/team/` - Fotos de miembros del equipo
- [ ] `/images/services/` - Imágenes de servicios
- [ ] `/favicon.ico` - Favicon del sitio
- [ ] `/apple-touch-icon.png` - Icono para dispositivos Apple

### 13. Robots.txt (Opcional)

Crear `/public/robots.txt` si es necesario:

```txt
User-agent: *
Allow: /

Sitemap: https://www.plandemedios.com/sitemap-index.xml
```

### 14. Security Headers (Recomendado)

Si usas Netlify, Vercel u otro hosting, configura headers:

**Netlify** - crear `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Vercel** - crear `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### 15. Performance

- [ ] Optimizar imágenes (usar WebP si es posible)
- [ ] Verificar que imágenes OG sean < 1MB
- [ ] Comprimir assets estáticos
- [ ] Configurar caché en hosting

### 16. Accesibilidad

- [ ] Verificar contraste de colores
- [ ] Probar navegación con teclado
- [ ] Validar con lectores de pantalla
- [ ] Revisar aria-labels en navegación

### 17. Deploy

- [ ] Hacer commit de cambios (excepto `.env`)
  ```bash
  git add .
  git commit -m "Configurar data layer y SEO"
  ```

- [ ] Push a repositorio
- [ ] Deploy a producción
- [ ] Verificar que el sitio funcione correctamente

### 18. Post-Deploy

- [ ] Verificar todas las páginas en producción
- [ ] Comprobar que los sitemaps sean accesibles
- [ ] Probar compartir en redes sociales
- [ ] Verificar meta tags en producción
- [ ] Monitorear Google Search Console

---

## Checklist de Mantenimiento Mensual

- [ ] Revisar y actualizar estadísticas en `stats.ts`
- [ ] Verificar enlaces rotos
- [ ] Actualizar contenido de blog
- [ ] Revisar Google Search Console
- [ ] Actualizar sitemap si hay cambios importantes
- [ ] Revisar analytics y métricas

---

## Checklist de Contenido Nuevo

Cuando agregues contenido nuevo:

### Para Posts de Blog

- [ ] Usar componente SEO con `schemaType="Article"`
- [ ] Agregar breadcrumbs
- [ ] Incluir imagen destacada (OG image)
- [ ] Definir keywords relevantes
- [ ] Agregar fecha de publicación
- [ ] Especificar autor

### Para Nuevas Páginas de Servicio

- [ ] Usar componente SEO con `schemaType="Service"`
- [ ] Crear imagen OG personalizada
- [ ] Agregar a navegación si es necesario
- [ ] Definir keywords específicos
- [ ] Incluir breadcrumbs
- [ ] Actualizar sitemap (automático en build)

---

## Recursos de Ayuda

1. **Documentación Técnica**
   - `README-DATA-LAYER.md` - Guía completa del data layer
   - `EJEMPLOS-USO-SEO.md` - Ejemplos prácticos de SEO
   - `MEJORAS-IMPLEMENTADAS.md` - Resumen de cambios

2. **Archivos de Configuración**
   - `src/data/*.ts` - Todos los datos centralizados
   - `.env.example` - Template de variables de entorno
   - `astro.config.mjs` - Configuración de Astro

3. **Herramientas Online**
   - Google Search Console
   - Google Rich Results Test
   - Schema.org Validator
   - Facebook Sharing Debugger
   - Twitter Card Validator

---

## Contacto y Soporte

Si tienes preguntas:

1. Revisa la documentación en los archivos README
2. Consulta los comentarios en el código
3. Verifica las interfaces TypeScript para tipos de datos

---

## Notas Importantes

- **NUNCA** commitees el archivo `.env` a git
- Mantén las imágenes OG optimizadas (< 1MB)
- Actualiza el sitemap después de cambios importantes
- Prueba siempre en local antes de deploy
- Verifica SEO después de cada deploy importante

---

## Estado Actual

Fecha de implementación: 2024-11-16

- [x] Data layer implementado
- [x] SEO component mejorado
- [x] Sitemap configurado
- [x] Componentes actualizados
- [x] Variables de entorno documentadas
- [x] Documentación completa
- [ ] Configuración de producción (pendiente por usuario)
- [ ] Deploy a producción (pendiente por usuario)

---

**Siguiente paso:** Comenzar con "1. Configurar Variables de Entorno"

# Guía Rápida - Content Collections

## Comandos principales

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## Agregar nuevo artículo de blog

1. Crear archivo en `src/content/blog/nombre-del-articulo.md`

2. Copiar y personalizar este template:

```markdown
---
title: "Tu título aquí"
description: "Descripción SEO de 150-160 caracteres"
category: "Marketing Digital"
publishDate: 2025-01-30
author: "Plan de Medios"
readTime: "5 min"
featured: false
tags: ["tag1", "tag2", "tag3"]
---

## Introducción

Tu contenido aquí...

## Sección principal

Más contenido...

### Subsección

Detalles específicos...
```

3. Guardar y el artículo aparecerá automáticamente en:
   - Página principal (sección Tendencias)
   - `/blog/` (lista completa)
   - `/blog/nombre-del-articulo/` (detalle)

## Agregar nuevo servicio

1. Crear archivo en `src/content/services/nombre-servicio.md`

2. Copiar y personalizar este template:

```markdown
---
title: "Nombre del Servicio"
subtitle: "Tagline atractivo"
description: "Descripción completa del servicio en 2-3 líneas"
icon: "🎯"
color: "primary"
order: 4
features:
  - "Característica principal 1"
  - "Característica principal 2"
  - "Característica principal 3"
  - "Característica principal 4"
---

## Descripción detallada

Contenido extenso sobre el servicio...

### Beneficios clave

- Beneficio 1
- Beneficio 2

## Casos de uso

Ejemplos y aplicaciones...
```

3. Guardar y el servicio aparecerá en:
   - Página principal (sección Servicios)
   - `/servicios/nombre-servicio/` (detalle)

## Categorías de blog disponibles

- Marketing Digital
- Innovación
- Estrategia
- ROI
- Branding
- Contenido
- E-commerce
- Audio
- Video

Puedes agregar nuevas categorías simplemente usándolas en el frontmatter.

## Colores de servicios disponibles

- `primary` - Azul principal
- `secondary` - Azul secundario
- `accent` - Morado/rosa

## Estructura de URLs

### Blog
- Lista: `/blog/`
- Detalle: `/blog/[slug]/`

### Servicios
- Detalle: `/servicios/[slug]/`

## Tips

1. **Slugs**: Se generan automáticamente del nombre del archivo
   - `mi-articulo.md` → `/blog/mi-articulo/`

2. **Fechas**: Usa formato ISO
   - `publishDate: 2025-01-30`

3. **Featured**: Artículos con badge dorado
   - `featured: true`

4. **Order**: Controla el orden de servicios
   - Menor número = aparece primero

5. **Markdown**: Usa sintaxis estándar
   - `##` para H2
   - `###` para H3
   - `-` para listas
   - `**texto**` para negrita

## Validación

El sistema valida automáticamente:
- Campos requeridos
- Tipos de datos correctos
- Formato de fechas

Si hay errores, verás mensajes claros en la consola durante `npm run dev` o `npm run build`.

## Archivos importantes

```
src/
├── content/
│   ├── config.ts          # Esquemas de validación
│   ├── blog/              # Artículos (Markdown)
│   └── services/          # Servicios (Markdown)
├── pages/
│   ├── blog/
│   │   ├── index.astro    # Lista de artículos
│   │   └── [slug].astro   # Detalle de artículo
│   └── servicios/
│       └── [slug].astro   # Detalle de servicio
└── components/
    ├── Trends.astro       # Sección en home
    └── Services.astro     # Sección en home
```

## Soporte

Para documentación completa, ver: `CONTENT_COLLECTIONS_IMPLEMENTATION.md`

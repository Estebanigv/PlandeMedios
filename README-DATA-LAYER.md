# Data Layer y SEO - Plan de Medios

## Tabla de Contenidos

- [Introducción](#introducción)
- [Arquitectura de Datos](#arquitectura-de-datos)
- [Archivos de Datos](#archivos-de-datos)
- [Uso del Data Layer](#uso-del-data-layer)
- [Configuración SEO](#configuración-seo)
- [Variables de Entorno](#variables-de-entorno)
- [Sitemap](#sitemap)
- [Mejores Prácticas](#mejores-prácticas)

## Introducción

Este proyecto implementa un **Data Layer centralizado** que separa los datos de la presentación, facilitando el mantenimiento y las actualizaciones del sitio sin necesidad de modificar código.

### Beneficios

- **Mantenibilidad**: Actualiza información del sitio en un solo lugar
- **Type-Safety**: TypeScript garantiza la integridad de los datos
- **SEO Optimizado**: Configuración avanzada de metadatos y Schema.org
- **Escalabilidad**: Fácil de extender con nuevas funcionalidades
- **Reutilización**: Importa datos en cualquier componente

## Arquitectura de Datos

```
src/data/
├── index.ts           # Punto de exportación centralizado
├── site.ts            # Configuración global del sitio
├── navigation.ts      # Menús y navegación
├── social.ts          # Enlaces de redes sociales
├── stats.ts           # Estadísticas y métricas
└── team.ts            # Información del equipo y valores
```

## Archivos de Datos

### site.ts

Configuración global del sitio web.

```typescript
import { siteConfig } from '@/data/site';

// Propiedades disponibles:
siteConfig.name              // Nombre del sitio
siteConfig.tagline           // Eslogan
siteConfig.description       // Descripción
siteConfig.url               // URL principal
siteConfig.contact.email     // Email de contacto
siteConfig.contact.phone     // Teléfono
siteConfig.businessHours     // Horarios de atención
```

**Ejemplo de uso:**

```astro
---
import { siteConfig } from '@/data/site';
---

<h1>{siteConfig.name}</h1>
<p>{siteConfig.description}</p>
<a href={`mailto:${siteConfig.contact.email}`}>
  {siteConfig.contact.email}
</a>
```

### navigation.ts

Define todos los elementos de navegación del sitio.

```typescript
import { mainNav, footerNav } from '@/data/navigation';

// mainNav: Navegación principal del header
// footerNav: { quickLinks, services }
```

**Ejemplo de uso:**

```astro
---
import { mainNav } from '@/data/navigation';
---

<nav>
  {mainNav.map(item => (
    <a href={item.href} aria-label={item.ariaLabel}>
      {item.name}
    </a>
  ))}
</nav>
```

### social.ts

Enlaces a redes sociales de la empresa.

```typescript
import { socialLinks, socialHandles } from '@/data/social';

// socialLinks: Array de objetos con url, icon, name, etc.
// socialHandles: Objeto con handles por plataforma
```

**Ejemplo de uso:**

```astro
---
import { socialLinks } from '@/data/social';
---

<div class="social">
  {socialLinks.map(social => (
    <a
      href={social.url}
      aria-label={social.ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {social.name}
    </a>
  ))}
</div>
```

### stats.ts

Estadísticas y métricas para mostrar en diferentes secciones.

```typescript
import { heroStats, companyStats, performanceStats } from '@/data/stats';

// heroStats: Estadísticas del hero section
// companyStats: Métricas de la empresa
// performanceStats: Indicadores de desempeño
```

**Ejemplo de uso:**

```astro
---
import { heroStats } from '@/data/stats';
---

<div class="stats">
  {heroStats.map(stat => (
    <div class="stat">
      <span class="number">
        {stat.prefix}{stat.number}{stat.suffix}
      </span>
      <span class="label">{stat.label}</span>
    </div>
  ))}
</div>
```

### team.ts

Información del equipo, valores de la empresa y cultura organizacional.

```typescript
import { teamMembers, companyValues, companyCulture } from '@/data/team';

// teamMembers: Array de miembros del equipo
// companyValues: Valores corporativos
// companyCulture: Misión, visión y motto
```

**Ejemplo de uso:**

```astro
---
import { companyValues } from '@/data/team';
---

<div class="values">
  {companyValues.map(value => (
    <div class="value">
      <h3>{value.title}</h3>
      <p>{value.description}</p>
    </div>
  ))}
</div>
```

## Uso del Data Layer

### Importación Centralizada

Puedes importar todo desde el archivo index:

```typescript
import {
  siteConfig,
  mainNav,
  socialLinks,
  heroStats,
  teamMembers
} from '@/data';
```

O importar desde archivos específicos:

```typescript
import { siteConfig } from '@/data/site';
import { mainNav } from '@/data/navigation';
```

### Path Aliases

El proyecto está configurado con path aliases en `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["src/*"],
    "@/data": ["src/data"],
    "@/data/*": ["src/data/*"]
  }
}
```

## Configuración SEO

### Componente SEO.astro

El componente SEO mejorado soporta:

- **Meta tags básicos** (title, description, keywords)
- **Open Graph** (Facebook, LinkedIn)
- **Twitter Cards**
- **Schema.org dinámico** (Organization, Article, Service, WebPage)
- **Breadcrumbs** estructurados
- **Canonical URLs**
- **Localización geográfica**

### Uso Básico

```astro
---
import SEO from '@/components/SEO.astro';
---

<SEO
  title="Servicios de Marketing Digital"
  description="Descubre nuestros servicios especializados"
/>
```

### Uso Avanzado - Artículo de Blog

```astro
<SEO
  title="Título del artículo"
  description="Descripción del artículo"
  type="article"
  schemaType="Article"
  image="/blog/article-image.jpg"
  keywords={['marketing', 'digital', 'estrategia']}
  article={{
    author: "María González",
    publishedTime: "2024-01-15T09:00:00Z",
    modifiedTime: "2024-01-16T14:30:00Z",
    tags: ['marketing', 'estrategia']
  }}
  breadcrumbs={[
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Título del artículo", url: "/blog/articulo" }
  ]}
/>
```

### Uso Avanzado - Página de Servicio

```astro
<SEO
  title="Tour Graphic"
  description="Servicios de diseño gráfico profesional"
  type="service"
  schemaType="Service"
  service={{
    name: "Tour Graphic",
    description: "Diseño gráfico y branding",
    provider: "Plan de Medios"
  }}
  breadcrumbs={[
    { name: "Inicio", url: "/" },
    { name: "Servicios", url: "/servicios" },
    { name: "Tour Graphic", url: "/servicios/tour-graphic" }
  ]}
/>
```

### Schema Types Soportados

- **Organization**: Para la página principal y páginas corporativas
- **Article**: Para posts de blog y artículos
- **Service**: Para páginas de servicios
- **WebPage**: Para páginas genéricas
- **Product**: Para productos (uso futuro)

## Variables de Entorno

### Configuración

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus valores reales

3. **NUNCA** commitees el archivo `.env` a git

### Variables Importantes

#### Requeridas

```env
PUBLIC_SITE_URL=https://www.plandemedios.com
```

#### Opcionales

```env
# Contacto
PUBLIC_CONTACT_EMAIL=info@plandemedios.com
PUBLIC_CONTACT_PHONE=+1234567890
PUBLIC_CONTACT_PHONE_FORMATTED=+1 (234) 567-890

# Dirección
PUBLIC_ADDRESS_CITY=Ciudad de México
PUBLIC_ADDRESS_COUNTRY=México
PUBLIC_ADDRESS_FULL=Av. Principal 123, CDMX, México

# Redes Sociales
PUBLIC_SOCIAL_LINKEDIN=https://linkedin.com/company/plandemedios
PUBLIC_SOCIAL_FACEBOOK=https://facebook.com/plandemedios
PUBLIC_SOCIAL_INSTAGRAM=https://instagram.com/plandemedios
PUBLIC_SOCIAL_TWITTER=https://twitter.com/plandemedios
```

### Acceso a Variables

Las variables con prefijo `PUBLIC_` están disponibles en el cliente:

```typescript
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

Para variables server-side (sin `PUBLIC_`), usa `process.env`:

```typescript
const apiKey = process.env.API_KEY;
```

## Sitemap

### Configuración Automática

El sitemap se genera automáticamente en cada build en `/sitemap-index.xml` y `/sitemap-0.xml`.

### Prioridades por Tipo de Página

```javascript
// astro.config.mjs
serialize(item) {
  // Página principal: máxima prioridad
  if (item.url === 'https://www.plandemedios.com/') {
    item.priority = 1.0;
    item.changefreq = 'daily';
  }

  // Blog: prioridad alta
  if (item.url.includes('/blog/')) {
    item.priority = 0.8;
    item.changefreq = 'weekly';
  }

  // Servicios: prioridad muy alta
  if (item.url.includes('/servicios/')) {
    item.priority = 0.9;
    item.changefreq = 'monthly';
  }

  return item;
}
```

### Verificar Sitemap

Después del build, verifica:

```bash
npm run build
# Revisa dist/sitemap-index.xml y dist/sitemap-0.xml
```

### Enviar a Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Añade tu sitio
3. Envía el sitemap: `https://www.plandemedios.com/sitemap-index.xml`

## Mejores Prácticas

### 1. Actualizar Datos Centralizados

Cuando cambies información del sitio:

```typescript
// ✅ CORRECTO: Actualiza src/data/site.ts
export const siteConfig: SiteConfig = {
  contact: {
    email: "nuevo@email.com", // Cambio centralizado
    // ...
  }
};

// ❌ INCORRECTO: No edites directamente en componentes
<a href="mailto:nuevo@email.com">nuevo@email.com</a>
```

### 2. Type Safety

Aprovecha TypeScript para evitar errores:

```typescript
// Interfaces están definidas en cada archivo de datos
interface SiteConfig {
  name: string;
  tagline: string;
  // ...
}
```

### 3. Reutilización

Importa datos donde los necesites:

```astro
---
// En cualquier componente o página
import { siteConfig } from '@/data/site';
import { socialLinks } from '@/data/social';
---
```

### 4. Extensión del Data Layer

Para añadir nuevos datos:

1. Crea un nuevo archivo en `src/data/` (ej: `services.ts`)
2. Define interfaces TypeScript
3. Exporta la configuración
4. Actualiza `src/data/index.ts` para exportar los nuevos datos

Ejemplo:

```typescript
// src/data/services.ts
export interface Service {
  id: string;
  name: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'tour-graphic',
    name: 'Tour Graphic',
    description: '...'
  }
];
```

```typescript
// src/data/index.ts
export * from './services';
```

### 5. Pruebas de SEO

Herramientas para validar SEO:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 6. Performance

- Las importaciones del data layer no afectan el bundle size
- Los datos se evalúan en build time
- No hay overhead en runtime

## Estructura de Archivos del Proyecto

```
plan-de-medios/
├── src/
│   ├── data/               # ← Data Layer
│   │   ├── index.ts
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   ├── social.ts
│   │   ├── stats.ts
│   │   └── team.ts
│   ├── components/
│   │   ├── SEO.astro      # ← SEO Component mejorado
│   │   ├── sections/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Hero.astro
│   │   │   └── Contact.astro
│   │   └── ...
│   ├── layouts/
│   └── pages/
├── .env.example           # ← Plantilla de variables
├── .env                   # ← Tu configuración (no commiteada)
├── astro.config.mjs       # ← Configuración con sitemap
├── tsconfig.json          # ← Path aliases configurados
└── README-DATA-LAYER.md   # ← Este archivo
```

## Soporte y Contribuciones

Para preguntas o mejoras:

1. Revisa este documento
2. Consulta los comentarios en los archivos de datos
3. Verifica los tipos TypeScript para entender las estructuras

## Changelog

### v1.0.0 (2024-11-16)

- Implementación inicial del Data Layer
- Configuración de SEO avanzado con Schema.org
- Integración de @astrojs/sitemap
- Variables de entorno configurables
- Actualización de componentes para usar datos centralizados
- Documentación completa

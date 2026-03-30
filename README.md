# Plan de Medios - Sitio Web Corporativo

Sitio web corporativo para **Plan de Medios**, empresa chilena especializada en el desarrollo de contenidos audiovisuales, editoriales y publicitarios en alianza con medios de comunicación.

**URL**: [plandemedios.cl](https://www.plandemedios.cl)

## Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Astro | 5.x | Framework SSG |
| TypeScript | - | Tipado estático |
| Tailwind CSS | 3.x | Estilos utilitarios |
| Lucide | - | Iconografía |
| Resend | - | Envío de emails (contacto) |
| Zod | - | Validación de formularios |

## Estructura del Proyecto

```
src/
├── components/
│   ├── features/          # Componentes funcionales
│   │   ├── ContactForm.astro
│   │   ├── MediaCard.astro
│   │   ├── PlatformCardWithImage.astro
│   │   ├── ServiceCard.astro
│   │   ├── StatCard.astro
│   │   └── TrendCard.astro
│   ├── sections/          # Secciones de página
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Team.astro
│   │   ├── Services.astro
│   │   ├── Clients.astro   (Cifras)
│   │   ├── Trends.astro    (Noticias)
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── Alliances.astro
│   │   ├── Banner.astro
│   │   └── Platforms.astro
│   ├── ui/                # Componentes UI reutilizables
│   │   ├── Badge.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Container.astro
│   │   ├── Input.astro
│   │   ├── OptimizedImage.astro
│   │   ├── SectionHeader.astro
│   │   └── WhatsAppButton.astro
│   └── SEO.astro
├── content/               # Content Collections (Astro)
│   ├── blog/              # 9 artículos
│   ├── services/          # Tour Graphic, Motor, Innovación
│   └── config.ts
├── data/                  # Datos centralizados
│   ├── index.ts           # Re-exports
│   ├── site.ts            # Config global del sitio
│   ├── navigation.ts      # Navegación header/footer
│   ├── social.ts          # Redes sociales
│   ├── stats.ts           # Estadísticas
│   └── team.ts            # Equipo (7 miembros)
├── layouts/
│   └── Layout.astro
├── lib/                   # Utilidades
│   ├── email-service.ts
│   ├── rate-limit.ts
│   └── validation.ts
├── pages/
│   ├── index.astro        # Landing page principal
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── servicios/
│   │   └── [slug].astro
│   └── api/
│       └── contact.ts
└── styles/
    └── global.css
```

## Secciones del Sitio

La landing page (`index.astro`) carga las secciones en este orden:

| # | Sección | ID | Descripción |
|---|---------|-----|-------------|
| 1 | **Hero** | `#inicio` | Headline, CTAs, barra de confianza (+20 años, 250+ empresas), cards de Tour Innovación y Tour Graphic |
| 2 | **Equipo** | `#equipo` | 7 miembros con foto, nombre, cargo y enlace LinkedIn |
| 3 | **Servicios** | `#servicios` | 7 formatos: Cápsula Audiovisual, RRSS, Vertical, Material Sin Editar, Nota Editorial, Exhibición TV Paga, Exhibición Emol TV |
| 4 | **Cifras** | `#cifras` | Contadores animados: 250+ empresas, 98% retención, 200+ especiales, 15+ industrias |
| 5 | **Noticias** | `#noticias` | Blog con 9 artículos sobre tendencias de comunicación y marketing |
| 6 | **Contacto** | `#contacto` | Formulario (nombre, email, empresa, teléfono, mensaje) + datos de contacto |
| 7 | **Footer** | - | Links, redes sociales, copyright |

## Navegación

```
Header: Inicio | Equipo | Servicios | Cifras | Noticias
Footer:  Equipo | Servicios | Noticias | Contacto | Tour Graphic | Tour Innovación
```

## Plataformas

| Plataforma | Descripción |
|---|---|
| **Tour Innovación** | Contenidos audiovisuales y editoriales para difundir innovación, en alianza con TV Paga y EMOL |
| **Tour Graphic** | Publicidad digital en grandes formatos: diseño, distribución e instalación a nivel nacional |
| **Tour Motor** | Contenido especializado del sector automotriz |

## Equipo

| Nombre | Cargo |
|---|---|
| José Andraca | Gerente General |
| Hortencia Fritz | Editora General - Tour Innovación |
| Rodrigo Castillo | Editor General - Tour Motor |
| César Olate | Realizador Audiovisual |
| Jaime San Martín | Realizador Audiovisual |
| Jessica Rivas | Área Gráfica Digital |
| Diego Bustamante | Analista de Operaciones |

## Alianzas con Medios

CNN Chile, T13 en Vivo, Canal 13C, Mega 2, Emol TV

## Datos de Contacto

- **Email**: joseluis.andraca@plandemedios.cl
- **Teléfono**: +569 7777 1499
- **Ubicación**: Santiago, Chile
- **Redes**: LinkedIn, Facebook, Instagram, Twitter (`@plandemedios`)

## Desarrollo

### Requisitos

- Node.js 18+
- npm

### Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (localhost:4321)
npm run build        # Build de producción (carpeta dist/)
npm run preview      # Preview del build
```

### Capa de Datos

Toda la información del sitio se gestiona desde `src/data/`:

| Archivo | Contenido |
|---|---|
| `site.ts` | Nombre, URL, contacto, horarios, legal |
| `navigation.ts` | Items de menú header y footer |
| `social.ts` | Links a redes sociales |
| `stats.ts` | Estadísticas del hero y empresa |
| `team.ts` | Miembros, valores, misión/visión |

### Blog (Content Collections)

Los artículos están en `src/content/blog/` como archivos Markdown con frontmatter. Temas actuales:
- Canales digitales y confianza de marca
- Comunicación en la era del meme
- Crecimiento de audiencia en podcasts
- Video marketing B2B
- Valoración de marca en ecommerce
- Y más...

## Despliegue

El proyecto genera un sitio estático (`output: 'static'` en `astro.config.mjs`).

### Vercel / Netlify

```bash
npm run build
# Directorio de publicación: dist/
```

### GitHub Pages

Actualizar en `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://tu-usuario.github.io',
  base: '/PlandeMedios',
});
```

## Optimizaciones

- **Imágenes**: WebP/AVIF, lazy loading, componente OptimizedImage
- **Build**: Minificación esbuild, CSS code splitting, HTML compression, vendor chunks
- **SEO**: Meta tags, Open Graph, Twitter Cards, Schema.org, sitemap automático, robots.txt
- **Fuentes**: Preconnect, DNS prefetch, font-display: swap
- **Core Web Vitals**: LCP (eager loading hero), CLS (dimensiones en imágenes), FID (code splitting)

## Licencia

© 2025 Plan de Medios. Todos los derechos reservados.

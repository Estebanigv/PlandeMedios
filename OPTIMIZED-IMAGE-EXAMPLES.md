# Ejemplos de Uso - OptimizedImage Component

Este documento contiene ejemplos prácticos de cómo usar el componente `OptimizedImage` en diferentes escenarios.

## Importación Básica

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
---
```

## Ejemplos por Caso de Uso

### 1. Imagen de Hero (Above the Fold)

Para imágenes críticas que deben cargar inmediatamente:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import heroImage from '@/assets/hero-home.jpg';
---

<section class="hero">
  <OptimizedImage
    src={heroImage}
    alt="Plan de Medios - Especialistas en contenido digital"
    width={1920}
    height={1080}
    loading="eager"
    quality={90}
    class="hero-image"
  />
</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
```

### 2. Imagen de Servicio (Lazy Loading)

Para tarjetas de servicios que pueden cargar cuando sean visibles:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import serviceImage from '@/assets/services/tour-graphic.jpg';
---

<div class="service-card">
  <OptimizedImage
    src={serviceImage}
    alt="Tour Graphic - Producción de contenido gráfico"
    width={600}
    height={400}
    loading="lazy"
    quality={80}
    class="service-image"
  />
  <h3>Tour Graphic</h3>
  <p>Producción profesional de contenido gráfico para tu marca.</p>
</div>

<style>
  .service-card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .service-image {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }

  .service-card:hover .service-image {
    transform: scale(1.05);
  }
</style>
```

### 3. Imagen Responsive con Múltiples Tamaños

Para imágenes que necesitan diferentes tamaños según el viewport:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import blogImage from '@/assets/blog/articulo-1.jpg';
---

<article class="blog-post">
  <OptimizedImage
    src={blogImage}
    alt="Tendencias de marketing digital 2024"
    widths={[400, 800, 1200]}
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
    quality={85}
    loading="lazy"
    class="blog-image"
  />
  <div class="blog-content">
    <h2>Tendencias de Marketing Digital 2024</h2>
    <p>Descubre las últimas tendencias...</p>
  </div>
</article>

<style>
  .blog-image {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
</style>
```

### 4. Imagen con Placeholder

Para imágenes con aspecto reservado (prevenir CLS):

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import teamMember from '@/assets/team/john-doe.jpg';
---

<div class="team-member">
  <div class="image-wrapper">
    <OptimizedImage
      src={teamMember}
      alt="John Doe - Director Creativo"
      width={400}
      height={400}
      loading="lazy"
      quality={85}
      class="team-image"
    />
  </div>
  <h3>John Doe</h3>
  <p>Director Creativo</p>
</div>

<style>
  .image-wrapper {
    position: relative;
    aspect-ratio: 1/1;
    background: #f0f0f0; /* Placeholder color */
    overflow: hidden;
    border-radius: 50%;
  }

  .team-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
```

### 5. Galería de Imágenes

Para múltiples imágenes en una galería:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';

const galleryImages = [
  { src: import('@/assets/gallery/image-1.jpg'), alt: 'Proyecto 1' },
  { src: import('@/assets/gallery/image-2.jpg'), alt: 'Proyecto 2' },
  { src: import('@/assets/gallery/image-3.jpg'), alt: 'Proyecto 3' },
  { src: import('@/assets/gallery/image-4.jpg'), alt: 'Proyecto 4' },
];
---

<div class="gallery">
  {galleryImages.map((image) => (
    <div class="gallery-item">
      <OptimizedImage
        src={image.src}
        alt={image.alt}
        width={600}
        height={400}
        loading="lazy"
        quality={80}
        class="gallery-image"
      />
    </div>
  ))}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .gallery-item {
    aspect-ratio: 3/2;
    overflow: hidden;
    border-radius: 8px;
  }

  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover .gallery-image {
    transform: scale(1.1);
  }
</style>
```

### 6. Logo o Imagen Pequeña (Sin Lazy Loading)

Para logos y elementos UI que deben cargarse inmediatamente:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
---

<header class="header">
  <OptimizedImage
    src="/logo.svg"
    alt="Plan de Medios Logo"
    width={200}
    height={50}
    loading="eager"
    class="logo"
  />
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .logo {
    width: auto;
    height: 50px;
  }
</style>
```

### 7. Imagen Externa (URL)

Para imágenes alojadas en servicios externos:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
---

<div class="external-content">
  <OptimizedImage
    src="https://images.unsplash.com/photo-example"
    alt="Imagen de ejemplo de Unsplash"
    width={800}
    height={600}
    loading="lazy"
    quality={80}
  />
</div>
```

**Nota**: Asegúrate de que el dominio esté en `remotePatterns` en `astro.config.mjs`.

### 8. Background Image (Usando picture)

Para casos donde necesitas una imagen de fondo responsive:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import bgImage from '@/assets/background-pattern.jpg';
---

<section class="hero-section">
  <div class="background-wrapper">
    <OptimizedImage
      src={bgImage}
      alt=""
      width={1920}
      height={1080}
      loading="eager"
      quality={70}
      class="background-image"
    />
  </div>
  <div class="content">
    <h1>Bienvenido a Plan de Medios</h1>
    <p>Tu socio en contenido digital</p>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .background-wrapper {
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
  }
</style>
```

### 9. Imagen con Formato Específico

Para cuando necesitas un formato específico (ej: PNG con transparencia):

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import logoTransparent from '@/assets/logo-transparent.png';
---

<div class="logo-section">
  <OptimizedImage
    src={logoTransparent}
    alt="Plan de Medios - Logo transparente"
    width={300}
    height={100}
    format="png"
    loading="eager"
    quality={90}
  />
</div>
```

### 10. Imagen para Diferentes Densidades de Pantalla

Para pantallas Retina y alta densidad:

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
import iconImage from '@/assets/icons/feature-icon.png';
---

<div class="feature">
  <OptimizedImage
    src={iconImage}
    alt="Icono de característica"
    width={100}
    height={100}
    densities={[1, 2, 3]}
    loading="lazy"
    quality={90}
    class="feature-icon"
  />
  <h3>Característica Destacada</h3>
</div>

<style>
  .feature-icon {
    width: 100px;
    height: 100px;
  }

  @media (-webkit-min-device-pixel-ratio: 2),
         (min-resolution: 192dpi) {
    /* Estilos específicos para pantallas Retina si es necesario */
  }
</style>
```

---

## Usando Placeholders del Sitio

### Service Placeholder

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
---

<div class="service-card">
  <OptimizedImage
    src="/placeholders/service-placeholder.svg"
    alt="Servicio placeholder"
    width={400}
    height={300}
    loading="lazy"
  />
</div>
```

### Blog Placeholder

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
---

<article class="blog-post">
  <OptimizedImage
    src="/placeholders/blog-placeholder.svg"
    alt="Blog post placeholder"
    width={800}
    height={450}
    loading="lazy"
  />
</article>
```

### Team Member Placeholder

```astro
---
import OptimizedImage from '@/components/ui/OptimizedImage.astro';
---

<div class="team-member">
  <OptimizedImage
    src="/placeholders/team-placeholder.svg"
    alt="Team member placeholder"
    width={300}
    height={300}
    loading="lazy"
  />
</div>
```

---

## Props del Componente

### Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `src` | `string \| ImageMetadata` | Required | Ruta a la imagen o import |
| `alt` | `string` | Required | Texto alternativo (accesibilidad) |
| `width` | `number` | Optional | Ancho de la imagen |
| `height` | `number` | Optional | Alto de la imagen |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Estrategia de carga |
| `decoding` | `'async' \| 'sync' \| 'auto'` | `'async'` | Decodificación de imagen |
| `class` | `string` | `''` | Clases CSS adicionales |
| `placeholder` | `'blur' \| 'none'` | `'none'` | Tipo de placeholder |
| `quality` | `number` | `80` | Calidad de imagen (1-100) |
| `format` | `'webp' \| 'avif' \| 'png' \| 'jpg'` | `'webp'` | Formato de salida |
| `sizes` | `string` | Optional | Attribute sizes para responsive |
| `widths` | `number[]` | Optional | Array de anchos para srcset |
| `densities` | `number[]` | `[1, 2]` | Densidades de píxeles |

### Cuándo Usar Cada Prop

**`loading="eager"`**:
- Imágenes above-the-fold (hero, logo header)
- Imágenes críticas para la experiencia inicial
- LCP element

**`loading="lazy"`**:
- Todo lo demás
- Imágenes en la parte inferior de la página
- Galerías
- Contenido del blog

**`quality={90-100}`**:
- Imágenes de hero principales
- Fotos de productos importantes
- Portfolios profesionales

**`quality={70-80}`**:
- La mayoría de las imágenes de contenido
- Thumbnails
- Imágenes de fondo

**`quality={50-70}`**:
- Imágenes de muy baja prioridad
- Backgrounds decorativos
- Imágenes muy grandes donde la calidad no es crítica

**`widths` y `sizes`**:
- Imágenes que ocupan diferentes anchos según viewport
- Hero images responsive
- Galerías adaptativas

**`densities`**:
- Iconos e ilustraciones
- Logos
- Elementos UI que necesitan verse sharp en Retina

---

## Best Practices

### DO ✅

1. **Siempre proporciona alt text descriptivo**
   ```astro
   alt="Plan de Medios - Equipo trabajando en estrategia de contenido"
   ```

2. **Especifica width y height para prevenir CLS**
   ```astro
   width={800}
   height={600}
   ```

3. **Usa lazy loading para imágenes below-the-fold**
   ```astro
   loading="lazy"
   ```

4. **Optimiza la calidad según el uso**
   ```astro
   quality={80} <!-- Para la mayoría de los casos -->
   ```

5. **Usa formatos modernos (WebP/AVIF)**
   ```astro
   format="webp" <!-- Default, no necesitas especificarlo -->
   ```

### DON'T ❌

1. **No uses loading="eager" para todas las imágenes**
   ```astro
   <!-- ❌ Malo -->
   <OptimizedImage loading="eager" ... />
   <!-- ✅ Bueno - solo para hero/above-fold -->
   <OptimizedImage loading="lazy" ... />
   ```

2. **No olvides el alt text**
   ```astro
   <!-- ❌ Malo -->
   alt=""
   <!-- ✅ Bueno -->
   alt="Descripción significativa de la imagen"
   ```

3. **No uses calidad 100 sin razón**
   ```astro
   <!-- ❌ Malo - archivo enorme -->
   quality={100}
   <!-- ✅ Bueno -->
   quality={80}
   ```

4. **No cargues imágenes más grandes de lo necesario**
   ```astro
   <!-- ❌ Malo - imagen 4000px para mostrar 400px -->
   width={4000}
   <!-- ✅ Bueno - tamaño apropiado -->
   width={800}
   ```

5. **No uses PNG cuando JPG/WebP es suficiente**
   ```astro
   <!-- ❌ Malo - PNG para fotos -->
   format="png"
   <!-- ✅ Bueno - WebP para fotos -->
   format="webp"
   ```

---

## Troubleshooting

### La imagen no carga

**Problema**: La imagen no se muestra.

**Soluciones**:
1. Verifica que la ruta sea correcta
2. Asegúrate de importar imágenes locales
3. Verifica que el archivo exista
4. Revisa la consola para errores

### La imagen es muy grande

**Problema**: La imagen tarda mucho en cargar.

**Soluciones**:
1. Reduce la calidad (`quality={70}`)
2. Usa un ancho menor
3. Asegúrate de usar WebP/AVIF
4. Optimiza la imagen fuente antes de subirla

### CLS (Layout Shift) al cargar

**Problema**: El contenido salta cuando la imagen carga.

**Soluciones**:
1. Siempre especifica width y height
2. Usa aspect-ratio en CSS
3. Reserva espacio con wrapper
```astro
<div style="aspect-ratio: 16/9;">
  <OptimizedImage ... />
</div>
```

### Imagen externa no funciona

**Problema**: Imagen de URL externa no se optimiza.

**Solución**: Agrega el dominio a `remotePatterns` en `astro.config.mjs`:
```javascript
image: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.tudominio.com',
    },
  ],
}
```

---

## Recursos Adicionales

- [Astro Image Docs](https://docs.astro.build/en/guides/images/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Squoosh - Image Optimizer](https://squoosh.app/)
- [TinyPNG - PNG/JPG Compression](https://tinypng.com/)

---

**Última actualización**: 2025-11-16

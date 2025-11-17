# Ejemplos de Uso del Componente SEO

Este documento muestra ejemplos prácticos de cómo usar el componente SEO mejorado en diferentes tipos de páginas.

## Índice
- [Página Principal](#página-principal)
- [Página de Servicio](#página-de-servicio)
- [Post de Blog](#post-de-blog)
- [Página Genérica](#página-genérica)
- [Con Breadcrumbs](#con-breadcrumbs)
- [Con Imagen Personalizada](#con-imagen-personalizada)

---

## Página Principal

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';
import { siteConfig } from '@/data/site';
---

<Layout>
  <SEO
    title={siteConfig.name}
    description={siteConfig.description}
    schemaType="Organization"
  />

  <!-- Contenido de la página -->
</Layout>
```

**Resultado:**
- Schema.org tipo Organization
- Meta tags completos
- Open Graph para redes sociales
- Canonical URL automático

---

## Página de Servicio

```astro
---
// src/pages/servicios/tour-graphic.astro
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';

const service = {
  name: "Tour Graphic",
  description: "Servicios profesionales de diseño gráfico y branding",
  image: "/images/services/tour-graphic.jpg"
};
---

<Layout>
  <SEO
    title={service.name}
    description={service.description}
    image={service.image}
    type="service"
    schemaType="Service"
    keywords={['diseño gráfico', 'branding', 'identidad visual']}
    service={{
      name: service.name,
      description: service.description,
      provider: "Plan de Medios"
    }}
    breadcrumbs={[
      { name: "Inicio", url: "/" },
      { name: "Servicios", url: "/servicios" },
      { name: service.name, url: `/servicios/tour-graphic` }
    ]}
  />

  <!-- Contenido del servicio -->
</Layout>
```

**Resultado:**
- Schema.org tipo Service
- Breadcrumbs estructurados
- Keywords específicos del servicio
- Open Graph con imagen personalizada

---

## Post de Blog

```astro
---
// src/pages/blog/[slug].astro
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';

// Suponiendo que obtienes estos datos de tu CMS o colección
const post = {
  title: "Estrategias de Marketing Digital para 2024",
  description: "Descubre las últimas tendencias en marketing digital",
  author: "María González",
  publishedDate: "2024-01-15T09:00:00Z",
  modifiedDate: "2024-01-16T14:30:00Z",
  image: "/images/blog/marketing-2024.jpg",
  tags: ['marketing digital', 'estrategia', 'tendencias 2024']
};
---

<Layout>
  <SEO
    title={post.title}
    description={post.description}
    image={post.image}
    type="article"
    schemaType="Article"
    keywords={post.tags}
    article={{
      author: post.author,
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      tags: post.tags
    }}
    breadcrumbs={[
      { name: "Inicio", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${Astro.params.slug}` }
    ]}
  />

  <article>
    <h1>{post.title}</h1>
    <p class="meta">
      Por {post.author} -
      <time datetime={post.publishedDate}>
        {new Date(post.publishedDate).toLocaleDateString('es-ES')}
      </time>
    </p>
    <!-- Contenido del post -->
  </article>
</Layout>
```

**Resultado:**
- Schema.org tipo Article
- Meta tags article:author, article:published_time
- Tags del artículo
- Breadcrumbs completos
- Open Graph optimizado para compartir

---

## Página Genérica

```astro
---
// src/pages/sobre-nosotros.astro
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';
---

<Layout>
  <SEO
    title="Sobre Nosotros"
    description="Conoce la historia, misión y valores de Plan de Medios"
    schemaType="WebPage"
    keywords={['sobre nosotros', 'historia', 'misión', 'valores']}
    breadcrumbs={[
      { name: "Inicio", url: "/" },
      { name: "Sobre Nosotros", url: "/sobre-nosotros" }
    ]}
  />

  <!-- Contenido de la página -->
</Layout>
```

**Resultado:**
- Schema.org tipo WebPage
- Keywords personalizados
- Breadcrumbs simples

---

## Con Breadcrumbs

```astro
---
// src/pages/servicios/categoria/subcategoria.astro
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';
---

<Layout>
  <SEO
    title="Subcategoría de Servicio"
    description="Descripción de la subcategoría"
    schemaType="WebPage"
    breadcrumbs={[
      { name: "Inicio", url: "/" },
      { name: "Servicios", url: "/servicios" },
      { name: "Categoría", url: "/servicios/categoria" },
      { name: "Subcategoría", url: "/servicios/categoria/subcategoria" }
    ]}
  />

  <!-- Contenido -->
</Layout>
```

**Resultado:**
- Breadcrumbs estructurados en JSON-LD
- Mejor navegación para buscadores
- Rich snippets en Google

---

## Con Imagen Personalizada

```astro
---
// src/pages/landing/promo.astro
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';

const promoImage = "/images/promo/black-friday-2024.jpg";
---

<Layout>
  <SEO
    title="Black Friday 2024 - Descuentos Especiales"
    description="Aprovecha nuestras ofertas exclusivas de Black Friday"
    image={promoImage}
    type="website"
    schemaType="WebPage"
    keywords={['black friday', 'descuentos', 'ofertas', 'promociones']}
  />

  <!-- Contenido de la landing -->
</Layout>
```

**Resultado:**
- Imagen personalizada para redes sociales
- Optimizado para compartir
- Preview atractivo en Facebook/Twitter

---

## Ejemplo Completo con Todas las Opciones

```astro
---
// Ejemplo exhaustivo mostrando todas las opciones disponibles
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';

const pageData = {
  title: "Título Completo de la Página",
  description: "Descripción detallada y optimizada para SEO",
  image: "/images/og-custom.jpg",
  url: "https://www.plandemedios.com/ruta/completa",
  type: "article" as const,
  schemaType: "Article" as const,
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  author: "Nombre del Autor",
  publishedTime: "2024-01-15T09:00:00Z",
  modifiedTime: "2024-01-16T14:30:00Z",

  article: {
    author: "Nombre del Autor",
    publishedTime: "2024-01-15T09:00:00Z",
    modifiedTime: "2024-01-16T14:30:00Z",
    tags: ['tag1', 'tag2', 'tag3']
  },

  breadcrumbs: [
    { name: "Inicio", url: "/" },
    { name: "Categoría", url: "/categoria" },
    { name: "Subcategoría", url: "/categoria/subcategoria" },
    { name: "Página", url: "/categoria/subcategoria/pagina" }
  ]
};
---

<Layout>
  <SEO
    title={pageData.title}
    description={pageData.description}
    image={pageData.image}
    url={pageData.url}
    type={pageData.type}
    keywords={pageData.keywords}
    author={pageData.author}
    publishedTime={pageData.publishedTime}
    modifiedTime={pageData.modifiedTime}
    breadcrumbs={pageData.breadcrumbs}
    schemaType={pageData.schemaType}
    article={pageData.article}
  />

  <!-- Contenido -->
</Layout>
```

---

## Usando Datos del Data Layer

```astro
---
// Ejemplo usando los datos centralizados
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';
import { siteConfig } from '@/data/site';
import { companyValues } from '@/data/team';

// Genera keywords dinámicamente desde los valores de la empresa
const keywords = companyValues.map(v => v.title.toLowerCase());
---

<Layout>
  <SEO
    title="Nuestros Valores"
    description={`Conoce los valores que guían a ${siteConfig.name}`}
    keywords={keywords}
    schemaType="WebPage"
  />

  <section>
    <h1>Nuestros Valores</h1>
    {companyValues.map(value => (
      <div>
        <h2>{value.title}</h2>
        <p>{value.description}</p>
      </div>
    ))}
  </section>
</Layout>
```

---

## SEO para Páginas Dinámicas

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<Layout>
  <SEO
    title={post.data.title}
    description={post.data.description}
    image={post.data.heroImage}
    type="article"
    schemaType="Article"
    keywords={post.data.tags}
    article={{
      author: post.data.author,
      publishedTime: post.data.publishDate.toISOString(),
      modifiedTime: post.data.updatedDate?.toISOString(),
      tags: post.data.tags
    }}
    breadcrumbs={[
      { name: "Inicio", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.data.title, url: `/blog/${post.slug}` }
    ]}
  />

  <article>
    <Content />
  </article>
</Layout>
```

---

## Tips y Mejores Prácticas

### 1. Título SEO

```astro
<!-- ✅ BUENO: Específico y descriptivo -->
<SEO title="Tour Graphic - Servicios de Diseño Gráfico" />

<!-- ❌ MALO: Genérico -->
<SEO title="Servicios" />
```

### 2. Descripción

```astro
<!-- ✅ BUENO: 150-160 caracteres, call-to-action -->
<SEO description="Transformamos tu marca con diseño gráfico profesional. Más de 10 años de experiencia. ¡Contáctanos hoy!" />

<!-- ❌ MALO: Muy corta o muy larga -->
<SEO description="Diseño." />
```

### 3. Keywords

```astro
<!-- ✅ BUENO: Relevantes y específicos -->
<SEO keywords={['diseño gráfico', 'branding corporativo', 'identidad visual']} />

<!-- ❌ MALO: Keyword stuffing -->
<SEO keywords={['diseño', 'diseño diseño', 'diseño diseño diseño']} />
```

### 4. Imágenes

```astro
<!-- ✅ BUENO: Imagen específica de alta calidad -->
<SEO image="/images/services/tour-graphic-og.jpg" />

<!-- Recomendaciones: -->
<!-- - Tamaño: 1200x630px para Open Graph -->
<!-- - Formato: JPG o PNG -->
<!-- - Peso: < 1MB -->
```

### 5. Breadcrumbs

```astro
<!-- ✅ BUENO: Ruta completa -->
<SEO
  breadcrumbs={[
    { name: "Inicio", url: "/" },
    { name: "Servicios", url: "/servicios" },
    { name: "Tour Graphic", url: "/servicios/tour-graphic" }
  ]}
/>

<!-- ❌ MALO: Saltar niveles -->
<SEO
  breadcrumbs={[
    { name: "Inicio", url: "/" },
    { name: "Tour Graphic", url: "/servicios/tour-graphic" }
  ]}
/>
```

---

## Verificación

Después de implementar el SEO, verifica con estas herramientas:

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```

2. **Schema Validator**
   ```
   https://validator.schema.org/
   ```

3. **Facebook Debugger**
   ```
   https://developers.facebook.com/tools/debug/
   ```

4. **Twitter Card Validator**
   ```
   https://cards-dev.twitter.com/validator
   ```

---

## Ejemplo de Output HTML

El componente SEO genera el siguiente HTML:

```html
<!-- Meta tags básicos -->
<meta name="title" content="Tour Graphic | Plan de Medios">
<meta name="description" content="Servicios profesionales de diseño gráfico...">

<!-- Canonical -->
<link rel="canonical" href="https://www.plandemedios.com/servicios/tour-graphic">

<!-- Open Graph -->
<meta property="og:type" content="service">
<meta property="og:url" content="https://www.plandemedios.com/servicios/tour-graphic">
<meta property="og:title" content="Tour Graphic | Plan de Medios">
<meta property="og:description" content="...">
<meta property="og:image" content="https://www.plandemedios.com/images/tour-graphic.jpg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tour Graphic | Plan de Medios">

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Tour Graphic",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "Plan de Medios",
    "url": "https://www.plandemedios.com"
  }
}
</script>

<!-- Breadcrumbs -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
</script>
```

---

## Soporte

Para más información, consulta:
- **README-DATA-LAYER.md** - Documentación completa
- **src/components/SEO.astro** - Código fuente comentado

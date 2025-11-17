# Guía de Personalización - Plan de Medios

Esta guía te ayudará a personalizar el sitio web según tus necesidades.

## 1. Cambiar Colores del Sitio

Edita el archivo `src/styles/global.css` y modifica las variables CSS:

```css
:root {
  --color-primary: #1a365d;      /* Azul oscuro principal */
  --color-secondary: #2c5282;    /* Azul medio */
  --color-accent: #3182ce;       /* Azul claro para acentos */
  --color-text: #1a202c;         /* Color del texto principal */
  --color-text-light: #4a5568;   /* Color del texto secundario */
  --color-bg: #ffffff;           /* Fondo blanco */
  --color-bg-light: #f7fafc;     /* Fondo gris claro */
}
```

## 2. Actualizar Información de Contacto

### Footer y Contacto

Edita `src/components/Footer.astro` y `src/components/Contact.astro`:

```astro
<!-- En Footer.astro y Contact.astro -->
<a href="mailto:TU_EMAIL@plandemedios.com">TU_EMAIL@plandemedios.com</a>
<a href="tel:+TU_TELEFONO">+TU_TELEFONO</a>
<span>Tu Dirección, Ciudad, País</span>
```

## 3. Configurar Redes Sociales

Edita `src/components/Footer.astro`:

```typescript
const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/company/tu-empresa", icon: "linkedin" },
  { name: "Facebook", url: "https://facebook.com/tu-empresa", icon: "facebook" },
  { name: "Instagram", url: "https://instagram.com/tu-empresa", icon: "instagram" },
  { name: "Twitter", url: "https://twitter.com/tu-empresa", icon: "twitter" },
];
```

## 4. Modificar Contenido de Servicios

Edita `src/components/Services.astro`:

```typescript
const services = [
  {
    id: "tour-graphic",
    title: "Tour Graphic",
    subtitle: "Tu subtítulo personalizado",
    description: "Tu descripción personalizada...",
    features: [
      "Característica 1",
      "Característica 2",
      "Característica 3",
      "Característica 4"
    ],
    icon: "🎨", // Cambia el emoji
    color: "primary"
  },
  // ... más servicios
];
```

## 5. Actualizar Estadísticas del Hero

Edita `src/components/Hero.astro`:

```astro
<div class="hero-stats">
  <div class="stat">
    <span class="stat-number">TU_NUMERO</span>
    <span class="stat-label">Tu Descripción</span>
  </div>
  <!-- ... más estadísticas -->
</div>
```

## 6. Agregar Artículos de Tendencias

Edita `src/components/Trends.astro`:

```typescript
const trends = [
  {
    title: "Título del artículo",
    excerpt: "Resumen del artículo...",
    category: "Categoría",
    readTime: "5 min"
  },
  // ... más artículos
];
```

## 7. Personalizar Testimonios de Clientes

Edita `src/components/Clients.astro`:

```typescript
const clients = [
  {
    name: "Nombre del Cliente",
    industry: "Sector",
    testimonial: "Testimonio del cliente..."
  },
  // ... más clientes
];
```

## 8. Configurar Google Analytics

Edita `src/layouts/Layout.astro` y descomenta estas líneas:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID-DE-GA"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID-DE-GA');
</script>
```

## 9. Actualizar Meta Tags SEO

Edita `src/components/SEO.astro`:

```typescript
const {
  title,
  description,
  image = '/tu-imagen-og.jpg',  // Imagen para redes sociales
  url = 'https://www.tu-dominio.com',
  type = 'website'
} = Astro.props;
```

También actualiza las keywords:

```html
<meta name="keywords" content="tus, palabras, clave, personalizadas" />
```

## 10. Añadir Imágenes

Coloca tus imágenes en la carpeta `public/images/` y úsalas así:

```astro
<img src="/images/tu-imagen.jpg" alt="Descripción" />
```

## 11. Cambiar Tipografía

Edita `src/layouts/Layout.astro` para usar otra fuente de Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Y actualiza en `src/styles/global.css`:

```css
html {
  font-family: 'TU_FUENTE', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## 12. Conectar Formulario de Contacto

El formulario actualmente muestra una alerta. Para conectarlo a un servicio real:

### Opción 1: Formspree

```javascript
// En Contact.astro
<form action="https://formspree.io/f/TU_ID" method="POST">
  <!-- campos del formulario -->
</form>
```

### Opción 2: EmailJS

```javascript
// Instala EmailJS
npm install @emailjs/browser

// En Contact.astro script
import emailjs from '@emailjs/browser';

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', e.target, 'TU_PUBLIC_KEY')
    .then(() => alert('Mensaje enviado!'))
    .catch(() => alert('Error al enviar'));
});
```

## 13. Modificar Navegación

Edita `src/components/Header.astro`:

```typescript
const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Tus secciones...", href: "#tu-seccion" },
  // ... más items
];
```

## 14. Añadir Favicon

Reemplaza el archivo `public/favicon.svg` con tu propio favicon.

## 15. Configurar Dominio Personalizado

Actualiza `src/components/SEO.astro` con tu dominio real:

```typescript
url = 'https://www.tu-dominio.com'
```

Y en el Schema.org:

```json
"url": "https://www.tu-dominio.com",
"logo": "https://www.tu-dominio.com/logo.png"
```

## Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Google Fonts](https://fonts.google.com)
- [Unsplash](https://unsplash.com) - Imágenes gratuitas
- [Heroicons](https://heroicons.com) - Iconos SVG

## Soporte

Si tienes dudas sobre la personalización, consulta el README.md o la documentación de Astro.

# Documentación de Componentes - Plan de Medios

Esta guía documenta todos los componentes reutilizables del proyecto, organizados siguiendo los principios de Atomic Design.

## Estructura de Carpetas

```
src/components/
├── ui/           # Componentes atómicos reutilizables
├── features/     # Componentes de negocio
└── sections/     # Secciones de página
```

---

## Componentes UI (Atómicos)

### SectionHeader

**Ubicación:** `src/components/ui/SectionHeader.astro`

Componente reutilizable para encabezados de sección con título y descripción.

**Props:**
- `title` (string, required): Título principal de la sección
- `description` (string, optional): Texto de descripción
- `align` (string, optional): Alineación del texto ("center" | "left" | "right"). Default: "center"
- `className` (string, optional): Clases CSS adicionales

**Ejemplo de uso:**
```astro
<SectionHeader
  title="Nuestros Servicios"
  description="Tres plataformas especializadas para impulsar tu marca"
  align="center"
/>
```

---

### Container

**Ubicación:** `src/components/ui/Container.astro`

Contenedor con padding consistente y ancho máximo.

**Props:**
- `className` (string, optional): Clases CSS adicionales
- `as` (string, optional): Elemento HTML ("div" | "section" | "article" | "aside"). Default: "div"

**Ejemplo de uso:**
```astro
<Container as="section">
  <p>Contenido aquí</p>
</Container>
```

---

### Card

**Ubicación:** `src/components/ui/Card.astro`

Componente de tarjeta reutilizable con efectos de hover.

**Props:**
- `variant` (string, optional): Variante de la tarjeta ("default" | "bordered" | "gradient"). Default: "default"
- `hoverable` (boolean, optional): Habilitar efectos de hover. Default: true
- `padding` (string, optional): Padding de la tarjeta. Default: "2rem"
- `className` (string, optional): Clases CSS adicionales

**Ejemplo de uso:**
```astro
<Card variant="bordered" hoverable={true}>
  <h3>Título</h3>
  <p>Contenido de la tarjeta</p>
</Card>
```

---

### Button

**Ubicación:** `src/components/ui/Button.astro`

Botón reutilizable con múltiples variantes y tamaños.

**Props:**
- `variant` (string, optional): Variante del botón ("primary" | "secondary" | "outline" | "link"). Default: "primary"
- `size` (string, optional): Tamaño del botón ("small" | "medium" | "large"). Default: "medium"
- `href` (string, optional): Si se proporciona, renderiza como enlace
- `type` (string, optional): Tipo de botón ("button" | "submit" | "reset"). Default: "button"
- `fullWidth` (boolean, optional): Hacer el botón de ancho completo. Default: false
- `showArrow` (boolean, optional): Mostrar icono de flecha. Default: false
- `className` (string, optional): Clases CSS adicionales

**Ejemplo de uso:**
```astro
<Button variant="primary" showArrow={true}>
  Conocer más
</Button>

<Button variant="outline" href="/contacto">
  Contáctanos
</Button>
```

---

### Badge

**Ubicación:** `src/components/ui/Badge.astro`

Insignia para categorías, etiquetas y labels.

**Props:**
- `variant` (string, optional): Variante del badge ("gradient" | "solid" | "outline"). Default: "gradient"
- `color` (string, optional): Color del badge (solo para solid/outline). Default: "accent"
- `size` (string, optional): Tamaño del badge ("small" | "medium" | "large"). Default: "medium"
- `className` (string, optional): Clases CSS adicionales

**Ejemplo de uso:**
```astro
<Badge variant="gradient">
  Marketing Digital
</Badge>

<Badge variant="solid" color="primary" size="small">
  Nuevo
</Badge>
```

---

### Input

**Ubicación:** `src/components/ui/Input.astro`

Componente de input de formulario reutilizable.

**Props:**
- `type` (string, optional): Tipo de input ("text" | "email" | "tel" | "password" | "number" | "textarea" | "select"). Default: "text"
- `name` (string, optional): Nombre del input
- `id` (string, optional): ID del input
- `label` (string, optional): Etiqueta del input
- `placeholder` (string, optional): Texto de placeholder
- `required` (boolean, optional): Campo requerido. Default: false
- `value` (string, optional): Valor por defecto
- `rows` (number, optional): Número de filas (para textarea). Default: 5
- `className` (string, optional): Clases CSS adicionales

**Ejemplo de uso:**
```astro
<Input
  type="email"
  label="Correo electrónico"
  name="email"
  required={true}
  placeholder="tu@email.com"
/>

<Input
  type="textarea"
  label="Mensaje"
  name="message"
  rows={5}
/>

<Input
  type="select"
  label="Servicio"
  name="service"
>
  <option value="">Selecciona...</option>
  <option value="1">Opción 1</option>
</Input>
```

---

## Componentes Features (Negocio)

### ServiceCard

**Ubicación:** `src/components/features/ServiceCard.astro`

Tarjeta de servicio con icono, título, descripción, características y enlace.

**Props:**
- `icon` (string, required): Icono del servicio (emoji o texto)
- `title` (string, required): Título del servicio
- `subtitle` (string, required): Subtítulo del servicio
- `description` (string, required): Descripción del servicio
- `features` (string[], required): Lista de características
- `href` (string, required): Enlace a la página del servicio
- `delay` (number, optional): Delay de animación. Default: 0

**Ejemplo de uso:**
```astro
<ServiceCard
  icon="🎨"
  title="Tour Graphic"
  subtitle="Diseño Visual"
  description="Creamos contenido visual impactante"
  features={["Branding", "Diseño web", "Motion graphics"]}
  href="/servicios/tour-graphic"
  delay={100}
/>
```

---

### TrendCard

**Ubicación:** `src/components/features/TrendCard.astro`

Tarjeta de artículo/tendencia de blog.

**Props:**
- `title` (string, required): Título del artículo
- `excerpt` (string, required): Extracto/descripción del artículo
- `category` (string, required): Categoría del artículo
- `readTime` (string, required): Tiempo de lectura
- `href` (string, required): Enlace al artículo

**Ejemplo de uso:**
```astro
<TrendCard
  title="Futuro del Marketing Digital"
  excerpt="Explorando tendencias emergentes..."
  category="Marketing"
  readTime="5 min"
  href="/blog/futuro-marketing"
/>
```

---

### StatCard

**Ubicación:** `src/components/features/StatCard.astro`

Tarjeta de estadística o valor con icono.

**Props:**
- `icon` (string, required): Icono (emoji o texto)
- `title` (string, required): Título de la tarjeta
- `description` (string, required): Descripción de la tarjeta
- `variant` (string, optional): Variante de la tarjeta ("default" | "gradient"). Default: "default"

**Ejemplo de uso:**
```astro
<StatCard
  icon="🎯"
  title="Planificación Estratégica"
  description="Optimización integral de campañas"
  variant="gradient"
/>
```

---

### ContactForm

**Ubicación:** `src/components/features/ContactForm.astro`

Formulario de contacto reutilizable con validación.

**Props:**
- `formId` (string, optional): ID del formulario para targeting de script. Default: "contactForm"
- `className` (string, optional): Clases CSS adicionales

**Ejemplo de uso:**
```astro
<ContactForm formId="mainContactForm" />
```

**Nota:** El formulario incluye un script que maneja el evento submit. En producción, deberás conectarlo a un backend o servicio de email.

---

## Componentes Sections (Secciones de Página)

Estos componentes representan secciones completas de la página y se encuentran en `src/components/sections/`.

### Secciones disponibles:
- `Header.astro` - Cabecera del sitio con navegación
- `Hero.astro` - Sección hero principal
- `Services.astro` - Sección de servicios (usa ServiceCard)
- `Team.astro` - Sección de equipo (usa Card y StatCard)
- `Alliances.astro` - Sección de alianzas (usa StatCard y Card)
- `Clients.astro` - Sección de clientes
- `Trends.astro` - Sección de tendencias/blog (usa TrendCard)
- `Contact.astro` - Sección de contacto (usa ContactForm)
- `Footer.astro` - Pie de página

**Ejemplo de uso en página:**
```astro
---
import Header from '../components/sections/Header.astro';
import Hero from '../components/sections/Hero.astro';
import Services from '../components/sections/Services.astro';
import Footer from '../components/sections/Footer.astro';
---

<Layout>
  <Header />
  <main>
    <Hero />
    <Services />
  </main>
  <Footer />
</Layout>
```

---

## Guías de Uso

### Creando un nuevo componente UI

1. Crea el archivo en `src/components/ui/`
2. Define las props con TypeScript interface
3. Documenta las props con comentarios JSDoc
4. Incluye ejemplos de uso en comentarios
5. Agrega estilos scoped

### Creando un nuevo componente Feature

1. Crea el archivo en `src/components/features/`
2. Importa y usa componentes UI según sea necesario
3. Enfócate en la lógica de negocio específica
4. Documenta las props y casos de uso

### Mejores Prácticas

1. **Componentización**: Usa componentes UI en lugar de duplicar estilos
2. **Props tipadas**: Siempre define interfaces de TypeScript para las props
3. **Documentación**: Incluye comentarios JSDoc con ejemplos
4. **Accesibilidad**: Asegura que todos los componentes sean accesibles
5. **Responsive**: Todos los componentes deben ser responsive por defecto
6. **Performance**: Minimiza re-renders innecesarios

---

## Reducción de Código

Esta refactorización ha logrado:

- ✅ Eliminación de código duplicado de section-header (aparecía en 9 componentes)
- ✅ Centralización de estilos de cards (4+ variantes diferentes)
- ✅ Componente Button reutilizable (antes inline en múltiples lugares)
- ✅ Componente Container consistente (evita repetir max-width y padding)
- ✅ Input y Form components reutilizables
- ✅ Reducción estimada de código: >60%
- ✅ Mejora en mantenibilidad y consistencia visual

---

## Variables CSS Disponibles

El proyecto usa las siguientes variables CSS que puedes usar en tus componentes:

```css
--color-primary
--color-secondary
--color-accent
--color-text
--color-text-light
--color-bg-light
```

---

## Soporte y Contribución

Para agregar nuevos componentes o modificar existentes:

1. Sigue la estructura de carpetas establecida
2. Mantén la documentación actualizada
3. Asegura que el build pasa sin errores: `npm run build`
4. Prueba la accesibilidad y responsiveness

---

**Última actualización:** 2025-11-16
**Versión del proyecto:** 0.0.1

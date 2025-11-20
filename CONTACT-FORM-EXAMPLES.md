# Ejemplos de Uso - Formulario de Contacto

Esta guía proporciona ejemplos prácticos de cómo usar el formulario de contacto en diferentes escenarios.

## Tabla de Contenidos

- [Uso Básico](#uso-básico)
- [Personalización](#personalización)
- [Múltiples Formularios](#múltiples-formularios)
- [Integración con Analytics](#integración-con-analytics)
- [Custom Endpoints](#custom-endpoints)
- [Testing](#testing)

---

## Uso Básico

### En una Página Simple

```astro
---
// src/pages/contacto.astro
import Layout from '../layouts/Layout.astro';
import ContactForm from '../components/features/ContactForm.astro';
---

<Layout title="Contacto - Plan de Medios">
  <main class="container">
    <h1>Contáctanos</h1>
    <p>Estamos aquí para ayudarte con tu proyecto.</p>

    <ContactForm />
  </main>
</Layout>
```

### En la Página Principal

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Hero from '../components/sections/Hero.astro';
import ContactForm from '../components/features/ContactForm.astro';
---

<Layout title="Plan de Medios">
  <Hero />

  <section id="contacto" class="py-20">
    <div class="container mx-auto">
      <h2>Hablemos de tu proyecto</h2>
      <ContactForm />
    </div>
  </section>
</Layout>
```

---

## Personalización

### Cambiar Estilo

```astro
---
import ContactForm from '../components/features/ContactForm.astro';
---

<div class="custom-container">
  <ContactForm className="my-custom-form" />
</div>

<style>
  .custom-container {
    max-width: 600px;
    margin: 0 auto;
  }

  :global(.my-custom-form) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem;
  }

  :global(.my-custom-form input),
  :global(.my-custom-form select),
  :global(.my-custom-form textarea) {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
  }

  :global(.my-custom-form input::placeholder),
  :global(.my-custom-form textarea::placeholder) {
    color: rgba(255, 255, 255, 0.7);
  }
</style>
```

### Cambiar Textos

Edita `src/components/features/ContactForm.astro`:

```astro
<Input
  label="Tu nombre"  <!-- Personalizar -->
  placeholder="Ej: María González"  <!-- Personalizar -->
/>

<Button>
  <span class="button-text">Enviar ahora</span>  <!-- Personalizar -->
  <span class="button-loading">
    Procesando...  <!-- Personalizar -->
  </span>
</Button>
```

### Agregar Campo Personalizado

1. **Actualizar schema de validación**:

```typescript
// src/lib/validation.ts
export const contactFormSchema = z.object({
  // ... campos existentes ...

  // Nuevo campo
  company: z
    .string()
    .min(2, 'El nombre de la empresa es muy corto')
    .max(100, 'El nombre de la empresa es muy largo')
    .optional()
    .or(z.literal('')),
});
```

2. **Agregar al formulario**:

```astro
<!-- src/components/features/ContactForm.astro -->
<Input
  type="text"
  id={`${formId}-company`}
  name="company"
  label="Empresa (opcional)"
  placeholder="Mi Empresa S.A."
  ariaDescribedby={`${formId}-company-error`}
/>
<div class="error-message" id={`${formId}-company-error`}></div>
```

3. **Actualizar template de email**:

```typescript
// src/lib/email-service.ts
<table>
  <tr>
    <td>
      <p><strong>Empresa:</strong> ${data.company || 'No especificada'}</p>
    </td>
  </tr>
</table>
```

---

## Múltiples Formularios

### Formulario en Modal

```astro
---
import ContactForm from '../components/features/ContactForm.astro';
---

<!-- Botón para abrir modal -->
<button id="openContactModal">Contáctanos</button>

<!-- Modal -->
<div id="contactModal" class="modal hidden">
  <div class="modal-content">
    <button class="close">&times;</button>
    <h2>Envíanos un mensaje</h2>
    <ContactForm formId="modalContactForm" />
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal.hidden {
    display: none;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<script>
  const modal = document.getElementById('contactModal');
  const openBtn = document.getElementById('openContactModal');
  const closeBtn = modal?.querySelector('.close');

  openBtn?.addEventListener('click', () => {
    modal?.classList.remove('hidden');
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
  });

  // Cerrar al hacer click fuera del modal
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
</script>
```

### Formulario por Servicio

```astro
---
// src/pages/servicios/[slug].astro
import ContactForm from '../../components/features/ContactForm.astro';

const { slug } = Astro.params;
const serviceNames = {
  'tour-graphic': 'Tour Graphic',
  'tour-motor': 'Tour Motor',
  'tour-innovacion': 'Tour Innovación',
};
---

<section class="service-contact">
  <h2>¿Interesado en {serviceNames[slug]}?</h2>
  <ContactForm formId={`contact-${slug}`} />
</section>

<script define:vars={{ slug }}>
  // Pre-seleccionar el servicio
  document.addEventListener('DOMContentLoaded', () => {
    const serviceMap = {
      'tour-graphic': 'tour-graphic',
      'tour-motor': 'tour-motor',
      'tour-innovacion': 'tour-innovacion',
    };

    const select = document.querySelector(`#contact-${slug}-service`);
    if (select && serviceMap[slug]) {
      select.value = serviceMap[slug];
    }
  });
</script>
```

### Formulario Inline en Blog

```astro
---
// En un post de blog
import ContactForm from '../../../components/features/ContactForm.astro';
---

<article>
  <h1>Título del Post</h1>
  <p>Contenido del post...</p>

  <!-- CTA inline -->
  <aside class="inline-cta">
    <h3>¿Te gustó este artículo?</h3>
    <p>Contáctanos para saber más sobre nuestros servicios.</p>
    <ContactForm
      formId="blogContactForm"
      className="compact-form"
    />
  </aside>

  <p>Más contenido...</p>
</article>

<style>
  .inline-cta {
    background: #f9fafb;
    padding: 2rem;
    margin: 2rem 0;
    border-left: 4px solid #667eea;
  }

  :global(.compact-form) {
    max-width: 500px;
  }
</style>
```

---

## Integración con Analytics

### Google Analytics 4

```astro
<script>
  // En ContactForm.astro, después de submit exitoso

  if (result.success) {
    // Track conversión en GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        event_category: 'contact',
        event_label: data.service,
        value: 1,
      });
    }

    // Mostrar feedback al usuario
    showFeedback(result.message, 'success');
  }
</script>
```

### Facebook Pixel

```astro
<script>
  if (result.success) {
    // Track conversión en Facebook
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Contact Form',
        content_category: data.service,
      });
    }
  }
</script>
```

### Custom Analytics

```typescript
// src/lib/analytics.ts
export async function trackContactSubmission(data: {
  service: string;
  timestamp: number;
  source?: string;
}) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'contact_form_submit',
        ...data,
      }),
    });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
}
```

```astro
<!-- En ContactForm.astro -->
<script>
  import { trackContactSubmission } from '../../lib/analytics';

  // Después de submit exitoso
  if (result.success) {
    trackContactSubmission({
      service: data.service,
      timestamp: Date.now(),
      source: window.location.pathname,
    });
  }
</script>
```

---

## Custom Endpoints

### Enviar a Múltiples Destinatarios

```typescript
// src/pages/api/contact-sales.ts
import type { APIRoute } from 'astro';
import { validateContactForm } from '../../lib/validation';
import { sendContactEmail } from '../../lib/email-service';

export const POST: APIRoute = async ({ request }) => {
  // ... validación y rate limiting ...

  // Enviar a múltiples destinatarios
  const recipients = [
    'ventas@plandemedios.com',
    'info@plandemedios.com',
  ];

  for (const recipient of recipients) {
    await sendContactEmail(validationResult.data, recipient);
  }

  // ...
};
```

### Endpoint con Auto-respuesta

```typescript
// src/pages/api/contact-with-reply.ts
export const POST: APIRoute = async ({ request }) => {
  // ... procesar formulario ...

  // Enviar email al equipo
  await sendContactEmail(data);

  // Enviar auto-respuesta al cliente
  await sendAutoReply(data.email, data.name);

  return new Response(JSON.stringify({ success: true }));
};

async function sendAutoReply(email: string, name: string) {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Plan de Medios <contacto@plandemedios.com>',
    to: email,
    subject: 'Gracias por contactarnos',
    html: `
      <h2>Hola ${name},</h2>
      <p>Gracias por contactar a Plan de Medios.</p>
      <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
      <p>Saludos,<br>Equipo Plan de Medios</p>
    `,
  });
}
```

### Webhook a CRM

```typescript
// src/pages/api/contact-crm.ts
export const POST: APIRoute = async ({ request }) => {
  // ... validación ...

  // Enviar email
  await sendContactEmail(data);

  // Enviar a CRM (ej: HubSpot)
  await sendToCRM(data);

  return new Response(JSON.stringify({ success: true }));
};

async function sendToCRM(data: ContactFormData) {
  const hubspotEndpoint = 'https://api.hubapi.com/contacts/v1/contact';

  await fetch(hubspotEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify({
      properties: [
        { property: 'email', value: data.email },
        { property: 'firstname', value: data.name.split(' ')[0] },
        { property: 'phone', value: data.phone },
        { property: 'message', value: data.message },
      ],
    }),
  });
}
```

---

## Testing

### Test Manual con Datos de Prueba

```javascript
// En la consola del navegador

// Test 1: Envío válido
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+1234567890',
    service: 'tour-graphic',
    message: 'Este es un mensaje de prueba con al menos 10 caracteres',
  }),
})
.then(r => r.json())
.then(console.log);

// Test 2: Email inválido
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'email-invalido',
    service: 'tour-graphic',
    message: 'Mensaje de prueba',
  }),
})
.then(r => r.json())
.then(console.log);
// Debería retornar error de validación

// Test 3: Rate Limiting
for (let i = 0; i < 4; i++) {
  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Test ${i}`,
      email: `test${i}@example.com`,
      service: 'tour-graphic',
      message: 'Mensaje de prueba para rate limiting',
    }),
  })
  .then(r => r.json())
  .then(data => console.log(`Request ${i}:`, data));
}
// El 4to debería retornar 429
```

### Test Automatizado con Playwright

```typescript
// tests/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit successfully with valid data', async ({ page }) => {
    await page.goto('/');

    // Llenar formulario
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.selectOption('[name="service"]', 'tour-graphic');
    await page.fill('[name="message"]', 'This is a test message');

    // Submit
    await page.click('button[type="submit"]');

    // Verificar mensaje de éxito
    await expect(page.locator('.form-feedback.success')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/');

    await page.fill('[name="email"]', 'invalid-email');
    await page.fill('[name="email"]', ''); // Trigger blur

    // Verificar error
    await expect(page.locator('#contactForm-email-error')).toContainText('email válido');
  });

  test('should enforce rate limiting', async ({ page }) => {
    await page.goto('/');

    // Enviar 4 veces
    for (let i = 0; i < 4; i++) {
      await page.fill('[name="name"]', `User ${i}`);
      await page.fill('[name="email"]', `user${i}@example.com`);
      await page.selectOption('[name="service"]', 'tour-graphic');
      await page.fill('[name="message"]', 'Test message');
      await page.click('button[type="submit"]');

      if (i < 3) {
        await expect(page.locator('.form-feedback.success')).toBeVisible();
      } else {
        await expect(page.locator('.form-feedback.error')).toContainText('límite');
      }

      // Reset form
      await page.reload();
    }
  });
});
```

---

## Casos de Uso Avanzados

### Formulario Multi-paso

```astro
---
// Componente ContactFormMultiStep.astro
---

<div class="multi-step-form">
  <div class="steps">
    <div class="step active" data-step="1">Paso 1: Información</div>
    <div class="step" data-step="2">Paso 2: Servicio</div>
    <div class="step" data-step="3">Paso 3: Mensaje</div>
  </div>

  <form id="multiStepForm">
    <!-- Paso 1 -->
    <div class="form-step active" data-step="1">
      <Input name="name" label="Nombre" />
      <Input name="email" label="Email" />
      <Button type="button" class="next-step">Siguiente</Button>
    </div>

    <!-- Paso 2 -->
    <div class="form-step" data-step="2">
      <Input type="select" name="service" label="Servicio" />
      <Button type="button" class="prev-step">Anterior</Button>
      <Button type="button" class="next-step">Siguiente</Button>
    </div>

    <!-- Paso 3 -->
    <div class="form-step" data-step="3">
      <Input type="textarea" name="message" label="Mensaje" />
      <Button type="button" class="prev-step">Anterior</Button>
      <Button type="submit">Enviar</Button>
    </div>
  </form>
</div>

<script>
  // Lógica de navegación entre pasos
  // ... implementación ...
</script>
```

### Formulario con Subida de Archivos

```astro
<form id="contactWithFiles" enctype="multipart/form-data">
  <!-- Campos normales -->
  <Input name="name" label="Nombre" />
  <Input name="email" label="Email" />

  <!-- Campo de archivo -->
  <div class="file-upload">
    <label>Adjuntar archivo (opcional)</label>
    <input
      type="file"
      name="attachment"
      accept=".pdf,.doc,.docx"
      max-size="5000000"
    />
    <small>Máximo 5MB. Formatos: PDF, DOC, DOCX</small>
  </div>

  <Button type="submit">Enviar</Button>
</form>

<script>
  // Manejar archivo en el submit
  // Nota: Requiere endpoint modificado para manejar FormData
</script>
```

---

## Conclusión

Estos ejemplos cubren los casos de uso más comunes. El formulario es altamente flexible y puede adaptarse a prácticamente cualquier necesidad.

Para más información, consulta:
- `CONTACT-FORM-README.md` - Referencia completa
- `CONTACT-FORM-SETUP.md` - Guía de configuración
- `CONTACT-FORM-ALTERNATIVES.md` - Opciones de integración

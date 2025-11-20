# Implementaciones Alternativas del Formulario de Contacto

Este documento proporciona implementaciones completas para Formspree y EmailJS como alternativas a Resend.

## Tabla de Contenidos

- [Implementación con Formspree](#implementación-con-formspree)
- [Implementación con EmailJS](#implementación-con-emailjs)
- [Comparación de Rendimiento](#comparación-de-rendimiento)

---

## Implementación con Formspree

Formspree es ideal para sitios estáticos y prototipos rápidos que no requieren backend personalizado.

### Ventajas

- Sin configuración de servidor
- Setup en 5 minutos
- Funciona con sitios estáticos
- AJAX y validación incluida
- reCAPTCHA integrado
- Auto-respuesta al usuario

### Configuración Completa

#### 1. Crear Formulario en Formspree

1. Regístrate en [Formspree.io](https://formspree.io)
2. Crea nuevo form
3. Copia tu Form ID: `https://formspree.io/f/YOUR_FORM_ID`

#### 2. Variante Simple: Cambiar Endpoint

La forma más simple es cambiar el endpoint del API:

```astro
---
// src/pages/index.astro o donde uses ContactForm
import ContactForm from '../components/features/ContactForm.astro';
---

<ContactForm apiEndpoint="https://formspree.io/f/YOUR_FORM_ID" />
```

El formulario actual ya funcionará con Formspree porque:
- Formspree acepta JSON en formato similar
- Nuestro schema de validación es compatible
- El manejo de errores funciona

#### 3. Variante Avanzada: ContactForm Personalizado

Si quieres más control, crea una variante específica:

**`src/components/features/ContactFormFormspree.astro`**

```astro
---
/**
 * ContactForm con Formspree
 * Variante optimizada para Formspree con características adicionales
 */

import Input from '../ui/Input.astro';
import Button from '../ui/Button.astro';

interface Props {
  formId?: string;
  formspreeId: string; // REQUIRED: Tu Formspree form ID
  className?: string;
}

const { formId = 'contactForm', formspreeId, className = '' } = Astro.props;
const formspreeEndpoint = `https://formspree.io/f/${formspreeId}`;
---

<form
  class={`contact-form ${className}`}
  id={formId}
  data-formspree-endpoint={formspreeEndpoint}
  novalidate
>
  <!-- Formspree usa _replyto automáticamente para reply-to -->
  <input type="hidden" name="_replyto" value="" id={`${formId}-replyto-hidden`} />

  <!-- Subject personalizado -->
  <input type="hidden" name="_subject" value="Nuevo contacto desde Plan de Medios" />

  <Input
    type="text"
    id={`${formId}-name`}
    name="name"
    label="Nombre completo"
    placeholder="Juan Pérez"
    required={true}
  />
  <div class="error-message" id={`${formId}-name-error`}></div>

  <Input
    type="email"
    id={`${formId}-email`}
    name="email"
    label="Email"
    placeholder="juan@empresa.com"
    required={true}
  />
  <div class="error-message" id={`${formId}-email-error`}></div>

  <Input
    type="tel"
    id={`${formId}-phone`}
    name="phone"
    label="Teléfono"
    placeholder="+1 234 567 890"
  />

  <Input
    type="select"
    id={`${formId}-service`}
    name="service"
    label="Servicio de interés"
    required={true}
  >
    <option value="">Selecciona un servicio</option>
    <option value="tour-graphic">Tour Graphic</option>
    <option value="tour-motor">Tour Motor</option>
    <option value="tour-innovacion">Tour Innovación</option>
    <option value="otro">Otro</option>
  </Input>

  <Input
    type="textarea"
    id={`${formId}-message`}
    name="message"
    label="Mensaje"
    placeholder="Cuéntanos sobre tu proyecto..."
    rows={5}
    required={true}
  />

  <div class="form-feedback"></div>

  <Button type="submit" variant="primary" fullWidth={true} showArrow={true}>
    <span class="button-text">Enviar mensaje</span>
    <span class="button-loading" style="display: none;">Enviando...</span>
  </Button>
</form>

<style>
  /* Mismos estilos que ContactForm.astro */
  .contact-form {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .error-message {
    min-height: 0;
    margin-top: -0.75rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #dc2626;
  }

  .form-feedback {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    display: none;
  }

  .form-feedback.visible { display: block; }
  .form-feedback.success {
    background-color: #d1fae5;
    color: #065f46;
  }
  .form-feedback.error {
    background-color: #fee2e2;
    color: #991b1b;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach((formElement) => {
      const form = formElement as HTMLFormElement;
      const endpoint = form.dataset.formspreeEndpoint!;
      const feedback = form.querySelector('.form-feedback') as HTMLElement;
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Set replyto from email field
        const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
        const replytoInput = form.querySelector('[name="_replyto"]') as HTMLInputElement;
        if (replytoInput) replytoInput.value = emailInput.value;

        // Show loading
        const btnText = submitBtn.querySelector('.button-text') as HTMLElement;
        const btnLoading = submitBtn.querySelector('.button-loading') as HTMLElement;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        try {
          const formData = new FormData(form);
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            // Success
            feedback.textContent = 'Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.';
            feedback.className = 'form-feedback visible success';
            form.reset();
          } else {
            // Error
            const data = await response.json();
            feedback.textContent = data.error || 'Error al enviar. Por favor intenta nuevamente.';
            feedback.className = 'form-feedback visible error';
          }
        } catch (error) {
          feedback.textContent = 'Error de conexión. Verifica tu internet e intenta nuevamente.';
          feedback.className = 'form-feedback visible error';
        } finally {
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
          submitBtn.disabled = false;
        }
      });
    });
  });
</script>
```

**Uso:**

```astro
<ContactFormFormspree formspreeId="xyzabc123" />
```

#### 4. Configuración Avanzada en Formspree

En el dashboard de Formspree:

**Auto-respuesta**:
```
Gracias por contactar a Plan de Medios.

Hemos recibido tu mensaje sobre {{ service }} y nos pondremos en contacto contigo pronto.

Saludos,
Equipo Plan de Medios
```

**Redirects** (opcional):
Después del envío, redirigir a: `/gracias`

**Webhooks** (avanzado):
Enviar datos a tu CRM o Google Sheets automáticamente.

---

## Implementación con EmailJS

EmailJS permite enviar emails directamente desde el navegador usando tu propia cuenta de email.

### Ventajas

- Usa tu cuenta Gmail/Outlook existente
- Totalmente desde cliente (no backend)
- Templates personalizables
- 200 emails/mes gratis
- Funciona en sitios estáticos

### Configuración Completa

#### 1. Setup en EmailJS

1. Regístrate en [EmailJS.com](https://www.emailjs.com)
2. Conecta tu servicio de email (Gmail recomendado)
3. Crea un template de email
4. Obtén tus credenciales

#### 2. Instalar SDK

```bash
npm install @emailjs/browser
```

#### 3. Configurar Variables de Entorno

```env
# .env
PUBLIC_EMAILJS_SERVICE_ID=service_abc123
PUBLIC_EMAILJS_TEMPLATE_ID=template_contact
PUBLIC_EMAILJS_PUBLIC_KEY=user_xyz789
```

#### 4. Crear Template en EmailJS

En EmailJS dashboard:

**Subject:**
```
Nuevo contacto: {{from_name}} - {{service_name}}
```

**Content (HTML):**
```html
<h2>Nuevo mensaje de contacto</h2>

<p><strong>Nombre:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{user_email}}</p>
<p><strong>Teléfono:</strong> {{phone}}</p>
<p><strong>Servicio:</strong> {{service_name}}</p>

<h3>Mensaje:</h3>
<p>{{message}}</p>

<hr>
<p><small>Enviado desde Plan de Medios</small></p>
```

**Reply-to:** `{{user_email}}`

#### 5. Crear ContactForm para EmailJS

**`src/components/features/ContactFormEmailJS.astro`**

```astro
---
import Input from '../ui/Input.astro';
import Button from '../ui/Button.astro';

interface Props {
  formId?: string;
  className?: string;
}

const { formId = 'contactForm', className = '' } = Astro.props;
---

<form class={`contact-form ${className}`} id={formId}>
  <Input
    type="text"
    id={`${formId}-name`}
    name="from_name"
    label="Nombre completo"
    placeholder="Juan Pérez"
    required={true}
  />

  <Input
    type="email"
    id={`${formId}-email`}
    name="user_email"
    label="Email"
    placeholder="juan@empresa.com"
    required={true}
  />

  <Input
    type="tel"
    id={`${formId}-phone`}
    name="phone"
    label="Teléfono"
    placeholder="+1 234 567 890"
  />

  <Input
    type="select"
    id={`${formId}-service`}
    name="service"
    label="Servicio de interés"
    required={true}
  >
    <option value="">Selecciona un servicio</option>
    <option value="Tour Graphic">Tour Graphic</option>
    <option value="Tour Motor">Tour Motor</option>
    <option value="Tour Innovación">Tour Innovación</option>
    <option value="Otro">Otro</option>
  </Input>
  <!-- Campo oculto para mostrar nombre del servicio en template -->
  <input type="hidden" name="service_name" id={`${formId}-service-name`} />

  <Input
    type="textarea"
    id={`${formId}-message`}
    name="message"
    label="Mensaje"
    placeholder="Cuéntanos sobre tu proyecto..."
    rows={5}
    required={true}
  />

  <div class="form-feedback"></div>

  <Button type="submit" variant="primary" fullWidth={true}>
    <span class="button-text">Enviar mensaje</span>
    <span class="button-loading" style="display: none;">Enviando...</span>
  </Button>
</form>

<style>
  .contact-form {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .form-feedback {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    display: none;
  }

  .form-feedback.visible { display: block; }
  .form-feedback.success {
    background-color: #d1fae5;
    color: #065f46;
  }
  .form-feedback.error {
    background-color: #fee2e2;
    color: #991b1b;
  }
</style>

<script>
  import emailjs from '@emailjs/browser';

  // Inicializar EmailJS con tu Public Key
  const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach((formElement) => {
      const form = formElement as HTMLFormElement;
      const feedback = form.querySelector('.form-feedback') as HTMLElement;
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      // Update service_name cuando cambia el select
      const serviceSelect = form.querySelector('[name="service"]') as HTMLSelectElement;
      const serviceNameInput = form.querySelector('[name="service_name"]') as HTMLInputElement;

      serviceSelect?.addEventListener('change', () => {
        if (serviceNameInput) {
          serviceNameInput.value = serviceSelect.options[serviceSelect.selectedIndex].text;
        }
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación básica
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Update service name
        if (serviceNameInput && serviceSelect) {
          serviceNameInput.value = serviceSelect.options[serviceSelect.selectedIndex].text;
        }

        // Show loading
        const btnText = submitBtn.querySelector('.button-text') as HTMLElement;
        const btnLoading = submitBtn.querySelector('.button-loading') as HTMLElement;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        try {
          // Enviar con EmailJS
          const result = await emailjs.sendForm(
            import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
            import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
            form
          );

          console.log('EmailJS Success:', result);

          // Success
          feedback.textContent = 'Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.';
          feedback.className = 'form-feedback visible success';
          form.reset();

        } catch (error) {
          console.error('EmailJS Error:', error);

          // Error
          feedback.textContent = 'Error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente.';
          feedback.className = 'form-feedback visible error';

        } finally {
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
          submitBtn.disabled = false;
        }
      });
    });
  });
</script>
```

**Uso:**

```astro
<ContactFormEmailJS />
```

#### 6. Rate Limiting con EmailJS

EmailJS tiene rate limiting integrado, pero puedes agregar el tuyo:

```typescript
// Rate limit simple en localStorage
function checkRateLimit(): boolean {
  const lastSubmit = localStorage.getItem('lastContactSubmit');
  if (lastSubmit) {
    const timeSince = Date.now() - parseInt(lastSubmit);
    const minutesSince = timeSince / 1000 / 60;

    if (minutesSince < 5) {
      return false; // Too soon
    }
  }

  localStorage.setItem('lastContactSubmit', Date.now().toString());
  return true;
}

// En el submit handler:
if (!checkRateLimit()) {
  feedback.textContent = 'Debes esperar 5 minutos entre envíos.';
  feedback.className = 'form-feedback visible error';
  return;
}
```

---

## Comparación de Rendimiento

### Tiempo de Carga

| Método | Bundle Size | First Load | TTI Impact |
|--------|-------------|------------|------------|
| **Resend (SSR)** | 0 KB cliente | ~50ms | Ninguno |
| **Formspree** | 0 KB adicional | ~100ms | Mínimo |
| **EmailJS** | ~25 KB | ~150ms | Bajo |

### Confiabilidad

| Aspecto | Resend | Formspree | EmailJS |
|---------|--------|-----------|---------|
| **Uptime** | 99.9% | 99.5% | 99% |
| **Deliverability** | Excelente | Buena | Depende del provider |
| **Spam Score** | Bajo | Medio | Alto |
| **Rate Limits** | API-based | Subscription | Quota-based |

### Experiencia de Usuario

| Feature | Resend | Formspree | EmailJS |
|---------|--------|-----------|---------|
| **Loading Speed** | Rápido | Medio | Medio |
| **Error Handling** | Robusto | Básico | Básico |
| **Validation** | Server+Client | Básico | Solo cliente |
| **Offline** | No funciona | No funciona | No funciona |

### Costos (Mensual)

| Plan | Resend | Formspree | EmailJS |
|------|--------|-----------|---------|
| **Gratis** | 3,000 | 50 | 200 |
| **Tier 1** | $20 (50k) | $10 (1k) | $7 (1k) |
| **Tier 2** | $50 (100k) | $40 (10k) | $15 (5k) |

---

## Recomendaciones por Caso de Uso

### Startup/Producción
**Usa: Resend**
- Mejor deliverability
- Profesional
- Escalable
- Templates hermosos

### Prototipo/MVP
**Usa: Formspree**
- Setup más rápido
- Sin backend
- Suficiente para validar

### Portfolio/Blog Personal
**Usa: EmailJS**
- Gratis y simple
- Usa tu Gmail
- Suficiente para bajo volumen

### E-commerce
**Usa: Resend + Webhook**
- Confirmaciones de pedido
- Recuperación de carritos
- Notificaciones críticas

### Landing Page
**Usa: Formspree**
- Solo necesitas leads
- No justifica backend
- Integra con Zapier/Make

---

## Migración entre Servicios

### De Formspree a Resend

1. Mantén Formspree funcionando
2. Configura Resend
3. Actualiza variables de entorno
4. Cambia endpoint: `/api/contact`
5. Prueba ambos en paralelo
6. Desactiva Formspree

### De EmailJS a Resend

1. Instala dependencias backend
2. Configura Resend
3. Reemplaza ContactFormEmailJS con ContactForm
4. Actualiza importaciones
5. Elimina EmailJS del bundle

### Código Portable

Para facilitar migración, abstrae el servicio:

```typescript
// src/lib/contact-service.ts
export interface ContactService {
  send(data: ContactFormData): Promise<boolean>;
}

// Implementa para cada servicio
// Cambia implementación sin tocar UI
```

---

## Conclusión

- **Mejor opción general**: Resend
- **Más rápido setup**: Formspree
- **Más económico**: EmailJS (low volume)
- **Mejor para escalar**: Resend

Todas las opciones están documentadas y listas para usar. Elige según tus necesidades actuales, pero diseña para migrar fácilmente en el futuro.

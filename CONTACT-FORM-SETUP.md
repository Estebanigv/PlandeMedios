# Guía de Configuración del Formulario de Contacto

Esta guía detalla cómo configurar el formulario de contacto de Plan de Medios con diferentes servicios de email.

## Tabla de Contenidos

- [Resumen](#resumen)
- [Arquitectura](#arquitectura)
- [Opción 1: Resend (Recomendada)](#opción-1-resend-recomendada)
- [Opción 2: Formspree](#opción-2-formspree)
- [Opción 3: EmailJS](#opción-3-emailjs)
- [Modo Desarrollo](#modo-desarrollo)
- [Troubleshooting](#troubleshooting)
- [Seguridad](#seguridad)

---

## Resumen

El sistema de formulario de contacto incluye:

- **Validación robusta** con Zod (cliente y servidor)
- **Rate limiting** para prevenir spam (3 envíos cada 15 minutos por IP)
- **Honeypot field** para detección de bots
- **Estados de UI** (loading, success, error)
- **Validación en tiempo real** al salir de cada campo
- **Mensajes de error amigables** en español
- **Accesibilidad completa** (ARIA labels)
- **Soporte multi-servicio** (fácil cambio de proveedor)

### Comparación Rápida de Opciones

| Característica | Resend | Formspree | EmailJS |
|----------------|--------|-----------|---------|
| **Configuración** | Media | Fácil | Fácil |
| **Backend requerido** | Sí | No | No |
| **Precio inicial** | Gratis | Gratis | Gratis |
| **Límite gratuito** | 3,000/mes | 50/mes | 200/mes |
| **Deliverability** | Excelente | Buena | Media |
| **Personalización** | Alta | Media | Media |
| **Producción** | ✅ Sí | ⚠️ Limitado | ⚠️ Limitado |

**Recomendación**: Usa **Resend** para producción y **Formspree** para prototipos rápidos.

---

## Arquitectura

### Estructura de Archivos

```
src/
├── lib/
│   ├── validation.ts          # Schema de validación Zod (compartido)
│   ├── rate-limit.ts          # Rate limiting en memoria
│   └── email-service.ts       # Abstracción de proveedores de email
├── pages/
│   └── api/
│       └── contact.ts         # API endpoint
└── components/
    └── features/
        └── ContactForm.astro  # Componente de formulario
```

### Flujo de Datos

```
Usuario → ContactForm (validación cliente)
         ↓
    POST /api/contact
         ↓
    Rate Limit Check → Honeypot Check → Validación Server
         ↓
    Email Provider (Resend/otros)
         ↓
    Respuesta al cliente
```

---

## Opción 1: Resend (Recomendada)

### ¿Por qué Resend?

- API moderna y simple
- Excelente deliverability (menos spam folder)
- Templates HTML profesionales incluidos
- Dashboard con analytics
- Webhooks para eventos de email
- 3,000 emails gratis/mes

### Configuración Paso a Paso

#### 1. Crear Cuenta en Resend

1. Ve a [https://resend.com/signup](https://resend.com/signup)
2. Crea tu cuenta (gratis)
3. Verifica tu email

#### 2. Verificar Dominio (Producción)

Para producción, necesitas verificar tu dominio:

1. En el dashboard de Resend, ve a **Domains**
2. Click en **Add Domain**
3. Ingresa tu dominio: `plandemedios.com`
4. Agrega los registros DNS proporcionados:

```dns
Type: TXT
Name: resend._domainkey
Value: [valor proporcionado por Resend]

Type: TXT
Name: @
Value: [valor SPF proporcionado]
```

5. Espera la verificación (puede tomar hasta 48 horas)

**Para testing**: Puedes usar `onboarding@resend.dev` sin verificar dominio.

#### 3. Crear API Key

1. Ve a **API Keys** en el dashboard
2. Click **Create API Key**
3. Nombre: "Plan de Medios Production"
4. Permisos: **Sending access**
5. Copia la API key (la verás solo una vez)

#### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Resend Configuration
RESEND_API_KEY=re_123456789abcdefghijklmnopqrstuvwxyz

# Para testing (sin dominio verificado)
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=tu-email@example.com

# Para producción (con dominio verificado)
# RESEND_FROM_EMAIL=Plan de Medios <contacto@plandemedios.com>
# RESEND_TO_EMAIL=info@plandemedios.com
```

#### 5. Probar en Desarrollo

```bash
npm run dev
```

1. Abre `http://localhost:4321`
2. Llena el formulario de contacto
3. Envía el formulario
4. Verifica que recibiste el email en `RESEND_TO_EMAIL`

#### 6. Verificar en Dashboard

1. Ve a **Emails** en el dashboard de Resend
2. Deberías ver tu email enviado
3. Click para ver detalles (estado, opens, clicks, etc.)

### Personalizar Template de Email

Edita `src/lib/email-service.ts` en el método `createEmailTemplate()`:

```typescript
private createEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <!-- Tu HTML personalizado aquí -->
    </html>
  `;
}
```

### Rate Limits de Resend

- **Plan Gratuito**: 3,000 emails/mes, 100 emails/día
- **Plan Pro**: $20/mes, 50,000 emails/mes
- Para más: [https://resend.com/pricing](https://resend.com/pricing)

---

## Opción 2: Formspree

### ¿Cuándo usar Formspree?

- Prototipo rápido o MVP
- No quieres configurar backend
- Tráfico bajo (< 50 envíos/mes en plan gratuito)
- No necesitas personalización avanzada

### Configuración Paso a Paso

#### 1. Crear Cuenta

1. Ve a [https://formspree.io/register](https://formspree.io/register)
2. Crea tu cuenta gratuita
3. Verifica tu email

#### 2. Crear Nuevo Form

1. En el dashboard, click **+ New Form**
2. Nombre: "Plan de Medios - Contacto"
3. Email: Donde quieres recibir los mensajes
4. Click **Create Form**
5. Copia el **Form ID** (algo como `xyzabc123`)

#### 3. Actualizar ContactForm.astro

En tu página que usa el formulario (ej: `src/pages/index.astro`):

```astro
---
import ContactForm from '../components/features/ContactForm.astro';
---

<!-- Cambia el apiEndpoint al endpoint de Formspree -->
<ContactForm apiEndpoint="https://formspree.io/f/xyzabc123" />
```

#### 4. Configurar Validación (Opcional)

En Formspree dashboard:

1. Ve a tu form → **Settings**
2. **Validation**: Activa validación de email
3. **reCAPTCHA**: Opcional, para más seguridad
4. **Confirmations**: Personaliza mensaje de confirmación

#### 5. Personalizar Email de Notificación

1. Ve a **Settings** → **Email Notifications**
2. Personaliza:
   - Subject line
   - Reply-to (usar el email del remitente)
   - CC/BCC si necesitas

#### 6. Webhook (Avanzado)

Si quieres integrar con otros servicios:

1. Ve a **Settings** → **Integrations**
2. Agrega Webhook URL
3. Formspree enviará los datos a tu webhook

### Limitaciones

- **Plan Gratuito**: 50 envíos/mes
- Branding de Formspree en emails
- Menos control sobre deliverability
- Dependes de servicio externo

Para más: [https://formspree.io/pricing](https://formspree.io/pricing)

---

## Opción 3: EmailJS

### ¿Cuándo usar EmailJS?

- Necesitas email desde cliente (sin backend)
- Proyecto estático en Netlify/Vercel
- Quieres usar tu cuenta Gmail/Outlook
- Presupuesto muy limitado

### Configuración Paso a Paso

#### 1. Crear Cuenta

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (gratis)
3. Verifica tu email

#### 2. Conectar Email Service

1. En dashboard, ve a **Email Services**
2. Click **Add New Service**
3. Selecciona tu proveedor:
   - Gmail (recomendado para testing)
   - Outlook
   - Yahoo
   - Custom SMTP
4. Conecta tu cuenta y autoriza EmailJS
5. Copia el **Service ID** (ej: `service_abc123`)

#### 3. Crear Email Template

1. Ve a **Email Templates**
2. Click **Create New Template**
3. Configura:

**Template ID**: `contact_form`

**Subject**: `Nuevo contacto de {{from_name}}`

**Content**:
```
Nombre: {{from_name}}
Email: {{reply_to}}
Teléfono: {{phone}}
Servicio: {{service}}

Mensaje:
{{message}}
```

4. Guarda y copia el **Template ID**

#### 4. Obtener Public Key

1. Ve a **Account** → **General**
2. Copia tu **Public Key** (ej: `user_abc123xyz`)

#### 5. Instalar SDK de EmailJS

```bash
npm install @emailjs/browser
```

#### 6. Modificar ContactForm.astro

Reemplaza el script completo con:

```astro
<script>
  import emailjs from '@emailjs/browser';

  // Inicializar EmailJS
  emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form') as HTMLFormElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        from_name: formData.get('name'),
        reply_to: formData.get('email'),
        phone: formData.get('phone') || 'N/A',
        service: formData.get('service'),
        message: formData.get('message'),
      };

      try {
        await emailjs.send(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
          data
        );

        alert('Mensaje enviado exitosamente!');
        form.reset();
      } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar. Intenta nuevamente.');
      }
    });
  });
</script>
```

#### 7. Configurar Variables de Entorno

En `.env`:

```env
PUBLIC_EMAILJS_SERVICE_ID=service_abc123
PUBLIC_EMAILJS_TEMPLATE_ID=contact_form
PUBLIC_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

### Limitaciones

- **Plan Gratuito**: 200 emails/mes
- Email enviado desde cliente (menos seguro)
- Puede ser bloqueado por ad-blockers
- Rate limit por el proveedor de email (Gmail, etc.)

Para más: [https://www.emailjs.com/pricing/](https://www.emailjs.com/pricing/)

---

## Modo Desarrollo

Sin configuración, el formulario funciona en modo desarrollo:

```typescript
// En src/lib/email-service.ts
if (!provider) {
  console.log('[Email] Development mode - Email would be sent:', {
    to: 'configured-email@example.com',
    from: data.email,
    name: data.name,
    // ...
  });
}
```

Los emails se registran en la consola del servidor en lugar de enviarse.

### Ventajas

- Desarrollo sin configuración
- No gastas cuota de emails
- Pruebas rápidas

### Cómo activar

Simplemente NO configures las variables de entorno. El sistema detectará automáticamente y usará modo dev.

---

## Troubleshooting

### El formulario no se envía

**Síntoma**: Click en enviar, pero no pasa nada.

**Soluciones**:

1. **Verifica la consola del navegador**
   ```javascript
   // Busca errores como:
   // - Validation errors
   // - Network errors
   // - CORS errors
   ```

2. **Verifica que el API endpoint está correcto**
   ```astro
   <ContactForm apiEndpoint="/api/contact" />
   ```

3. **Verifica que Astro está en modo SSR/Hybrid**
   ```javascript
   // astro.config.mjs
   export default defineConfig({
     output: 'server', // o 'hybrid'
   });
   ```

### Error 429: Rate Limit

**Síntoma**: "Demasiadas solicitudes"

**Soluciones**:

1. **Espera 15 minutos** (ventana de rate limit)
2. **Cambia de red** (diferente IP)
3. **Para desarrollo, desactiva temporalmente**:
   ```typescript
   // En src/pages/api/contact.ts
   // Comenta temporalmente:
   // const rateLimitResult = checkRateLimit(clientIP);
   ```

### Emails no llegan (Resend)

**Posibles causas**:

1. **API Key incorrecta**
   - Verifica que copiaste bien la key
   - La key debe empezar con `re_`

2. **Dominio no verificado**
   - Usa `onboarding@resend.dev` para testing
   - Verifica records DNS para producción

3. **Email en spam**
   - Revisa carpeta spam
   - Configura SPF/DKIM correctamente
   - Agrega remitente a contactos

4. **Verifica dashboard de Resend**
   - Ve a Emails → deberías ver el intento
   - Click para ver error específico

### Validación falla

**Síntoma**: Errores en campos válidos

**Soluciones**:

1. **Verifica el schema en `validation.ts`**
2. **Verifica nombres de campos coincidan**:
   ```astro
   <Input name="email" /> <!-- debe coincidir con schema -->
   ```

3. **Revisa caracteres especiales**:
   ```typescript
   // El schema valida caracteres específicos
   // Ajusta regex si necesitas más flexibilidad
   ```

### CORS Errors

**Síntoma**: Error de CORS en consola

**Solución**:

El endpoint ya tiene headers CORS configurados:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  // ...
};
```

Si sigues teniendo problemas:
1. Verifica que estás usando POST
2. Verifica Content-Type: application/json
3. Para producción, restringe origin específico

---

## Seguridad

### Medidas Implementadas

1. **Validación Server-side**
   - Nunca confíes solo en validación cliente
   - Zod valida tipos y formatos

2. **Rate Limiting**
   - 3 envíos cada 15 minutos por IP
   - Previene spam automático
   - Headers de rate limit incluidos

3. **Honeypot Field**
   ```astro
   <input name="_honeypot" class="honeypot" />
   ```
   - Invisible para usuarios
   - Los bots lo llenan
   - Rechaza silenciosamente

4. **Sanitización**
   - Zod trim() y toLowerCase()
   - Regex para validar formatos
   - Previene inyección

5. **Variables de Entorno**
   - API keys NUNCA en código
   - `.env` en `.gitignore`
   - Prefijo PUBLIC_ solo cuando necesario

### Mejoras Adicionales (Opcional)

#### reCAPTCHA v3

Para mayor protección:

```bash
npm install @google-cloud/recaptcha-enterprise
```

Agrega a `contact.ts`:
```typescript
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

// Verifica token antes de rate limit
const isHuman = await verifyRecaptcha(body.recaptchaToken);
if (!isHuman) {
  return new Response(/* error */);
}
```

#### Verificación de Email

Implementa double opt-in:

1. Envía email de confirmación
2. Usuario click en link
3. Entonces procesa el contacto

#### Logging Avanzado

Integra con servicio de logs:

```typescript
import * as Sentry from '@sentry/node';

try {
  // ... send email
} catch (error) {
  Sentry.captureException(error);
  // ...
}
```

### Buenas Prácticas

1. **Nunca expongas API keys**
   ```typescript
   // ❌ MAL
   const apiKey = 'hardcoded-key';

   // ✅ BIEN
   const apiKey = import.meta.env.RESEND_API_KEY;
   ```

2. **Valida siempre en servidor**
   ```typescript
   // ✅ Validación cliente Y servidor
   // Cliente: UX mejorado
   // Servidor: Seguridad real
   ```

3. **Limita tamaño de datos**
   ```typescript
   message: z.string().max(5000) // Ya implementado
   ```

4. **Monitorea intentos fallidos**
   ```typescript
   console.warn('[Contact API] Failed attempt:', {
     ip: clientIP,
     reason: 'validation',
   });
   ```

5. **Actualiza dependencias**
   ```bash
   npm audit
   npm update
   ```

---

## Monitoreo y Analytics

### Métricas Clave a Trackear

1. **Tasa de Conversión**
   - Visitas vs envíos
   - Campos con más errores
   - Tiempo de completado

2. **Tasa de Éxito**
   - Envíos exitosos vs fallidos
   - Tipos de errores comunes
   - Rate limits activados

3. **Deliverability**
   - Emails enviados vs recibidos
   - Tasa de rebote
   - Emails en spam

### Implementar Analytics

```typescript
// En ContactForm.astro script
if (result.success) {
  // Track conversión
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
      event_category: 'contact',
      event_label: data.service,
    });
  }
}
```

### Dashboard Recomendado

Para Resend, usa su dashboard built-in:
- Opens
- Clicks
- Bounces
- Complaints

---

## Recursos Adicionales

### Documentación Oficial

- **Resend**: [https://resend.com/docs](https://resend.com/docs)
- **Formspree**: [https://help.formspree.io](https://help.formspree.io)
- **EmailJS**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Zod**: [https://zod.dev](https://zod.dev)

### Comunidad

- **Resend Discord**: [https://resend.com/discord](https://resend.com/discord)
- **Astro Discord**: [https://astro.build/chat](https://astro.build/chat)

### Alternativas

Si ninguna de las opciones funciona, considera:

- **SendGrid**: API robusta, más compleja
- **Mailgun**: Bueno para volúmenes altos
- **AWS SES**: Muy económico, requiere AWS
- **Postmark**: Excelente para transaccionales

---

## Siguiente Paso

1. ✅ Elige tu opción de email service
2. ✅ Sigue la guía paso a paso
3. ✅ Prueba en desarrollo
4. ✅ Prueba en producción
5. ✅ Configura monitoreo
6. ✅ Documenta tu configuración para tu equipo

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación del servicio elegido.

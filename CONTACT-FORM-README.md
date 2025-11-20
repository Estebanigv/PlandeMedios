# Sistema de Formulario de Contacto - Plan de Medios

Sistema robusto de formulario de contacto con validación, rate limiting, y soporte multi-servicio.

## Inicio Rápido

### Opción 1: Resend (Recomendada para Producción)

```bash
# 1. Configurar variables de entorno
cp .env.example .env

# 2. Editar .env y agregar:
RESEND_API_KEY=re_tu_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=tu-email@example.com

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Probar formulario en http://localhost:4321
```

### Opción 2: Formspree (Más Simple)

```astro
<!-- En tu página -->
<ContactForm apiEndpoint="https://formspree.io/f/YOUR_FORM_ID" />
```

### Opción 3: EmailJS (Cliente)

Ver `CONTACT-FORM-ALTERNATIVES.md` para implementación completa.

## Características

- ✅ Validación robusta (cliente y servidor) con Zod
- ✅ Rate limiting (3 envíos / 15 minutos por IP)
- ✅ Honeypot field para spam prevention
- ✅ Estados de UI (loading, success, error)
- ✅ Validación en tiempo real
- ✅ Mensajes de error amigables
- ✅ Accesibilidad completa (ARIA)
- ✅ Email templates profesionales HTML
- ✅ Soporte multi-servicio (fácil cambio)

## Estructura de Archivos

```
src/
├── lib/
│   ├── validation.ts          # Schema Zod compartido
│   ├── rate-limit.ts          # Rate limiting
│   └── email-service.ts       # Abstracción de email
├── pages/
│   └── api/
│       └── contact.ts         # API endpoint
└── components/
    └── features/
        └── ContactForm.astro  # Componente UI
```

## API Endpoint

**POST** `/api/contact`

### Request Body

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+1234567890",
  "service": "tour-graphic",
  "message": "Mensaje del cliente"
}
```

### Response (Success)

```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente...",
  "messageId": "abc123"
}
```

### Response (Error)

```json
{
  "success": false,
  "error": "Descripción del error",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

### Response (Rate Limited)

```json
{
  "success": false,
  "error": "Demasiadas solicitudes...",
  "retryAfter": 60
}
```

HTTP Status: `429`

## Validación

Todos los campos son validados con Zod:

```typescript
{
  name: string (2-100 chars, solo letras y espacios),
  email: string (formato email válido),
  phone: string? (opcional, solo números y símbolos),
  service: enum ['tour-graphic', 'tour-motor', 'tour-innovacion', 'otro'],
  message: string (10-5000 chars)
}
```

## Rate Limiting

- **Límite**: 3 requests / 15 minutos
- **Por**: IP address
- **Almacenamiento**: En memoria (sliding window)
- **Headers incluidos**:
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
  - `Retry-After` (cuando limitado)

## Seguridad

1. **Validación Server-side**: Nunca confía solo en cliente
2. **Rate Limiting**: Previene spam automático
3. **Honeypot**: Campo oculto detecta bots
4. **Sanitización**: Zod trim() y validación
5. **Environment Variables**: API keys nunca en código
6. **CORS**: Configurado apropiadamente

## Modo Desarrollo

Sin configuración, el sistema funciona en modo dev:

```typescript
// Emails se registran en consola en lugar de enviarse
[Email] Development mode - Email would be sent: {
  to: 'configured-email@example.com',
  from: 'juan@example.com',
  // ...
}
```

Esto permite desarrollo sin gastar cuota de emails.

## Configuración de Producción

### Variables de Entorno Requeridas

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=contacto@plandemedios.com
RESEND_TO_EMAIL=info@plandemedios.com
```

### Verificar Dominio en Resend

1. Agregar dominio en dashboard
2. Configurar DNS records (SPF, DKIM)
3. Esperar verificación
4. Actualizar FROM_EMAIL con dominio verificado

## Documentación Completa

- **Setup Detallado**: `CONTACT-FORM-SETUP.md`
- **Alternativas (Formspree/EmailJS)**: `CONTACT-FORM-ALTERNATIVES.md`

## Troubleshooting

### El formulario no envía

1. Verifica consola del navegador por errores
2. Verifica que Astro está en modo `server` o `hybrid`
3. Verifica el endpoint en Network tab

### Error 429: Rate Limit

- Espera 15 minutos o cambia de red/IP
- Para dev, comenta temporalmente el rate limit check

### Emails no llegan

1. Verifica API key es correcta
2. Usa `onboarding@resend.dev` para testing
3. Revisa dashboard de Resend por errores
4. Verifica carpeta spam

### Validación falla

- Verifica nombres de campos coinciden con schema
- Revisa regex si usas caracteres especiales
- Consola muestra errores específicos de Zod

## Personalización

### Cambiar Template de Email

Edita `src/lib/email-service.ts`:

```typescript
private createEmailTemplate(data: ContactFormData): string {
  return `<!-- Tu HTML aquí -->`;
}
```

### Modificar Rate Limits

Edita `src/lib/rate-limit.ts`:

```typescript
export const RATE_LIMIT_CONFIG = {
  maxRequests: 5,        // Cambiar límite
  windowMs: 10 * 60 * 1000  // Cambiar ventana
};
```

### Agregar Campos

1. Actualiza schema en `validation.ts`
2. Agrega Input en `ContactForm.astro`
3. Actualiza template en `email-service.ts`

## Monitoreo

### Métricas Recomendadas

- Tasa de conversión (visitas → envíos)
- Tasa de éxito (enviados → recibidos)
- Errores de validación más comunes
- Rate limits activados

### Logs

Todos los eventos importantes se registran:

```typescript
console.log('[Contact API] Email sent successfully:', {...});
console.warn('[Contact API] Rate limit exceeded:', {...});
console.error('[Contact API] Email send failed:', {...});
```

Filtra por `[Contact` en tus logs de producción.

## Testing

### Test Manual

1. Llena el formulario con datos válidos
2. Verifica email recibido
3. Intenta enviar 4 veces → debe activar rate limit
4. Verifica honeypot: llena campo oculto → debe rechazar silenciosamente

### Test de Validación

Prueba estos casos:

- Email inválido → debe mostrar error
- Nombre muy corto → debe mostrar error
- Sin seleccionar servicio → debe mostrar error
- Mensaje vacío → debe mostrar error

## Próximos Pasos

1. ✅ Configura email service (Resend/Formspree/EmailJS)
2. ✅ Prueba en desarrollo
3. ✅ Personaliza templates
4. ✅ Configura monitoreo
5. ✅ Prueba en producción
6. ✅ Configura analytics (opcional)

## Soporte

- **Resend**: [https://resend.com/docs](https://resend.com/docs)
- **Formspree**: [https://help.formspree.io](https://help.formspree.io)
- **EmailJS**: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- **Zod**: [https://zod.dev](https://zod.dev)

## Licencia

Este código es parte del proyecto Plan de Medios.

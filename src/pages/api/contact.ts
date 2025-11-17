/**
 * Contact Form API Endpoint
 *
 * Handles contact form submissions with comprehensive validation,
 * rate limiting, and email delivery.
 *
 * Features:
 * - Server-side validation with Zod
 * - Rate limiting to prevent spam
 * - Honeypot field for bot detection
 * - Structured error responses
 * - Support for multiple email providers
 *
 * Usage:
 * POST /api/contact
 * Content-Type: application/json
 *
 * Body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "phone": "+1234567890", // optional
 *   "service": "tour-graphic",
 *   "message": "I'm interested in your services"
 * }
 */

import type { APIRoute } from 'astro';
import { validateContactForm } from '../../lib/validation';
import { checkRateLimit, getClientIP } from '../../lib/rate-limit';
import { sendContactEmail } from '../../lib/email-service';

/**
 * POST handler for contact form submissions
 */
export const POST: APIRoute = async ({ request }) => {
  // Set CORS headers for cross-origin requests (if needed)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // 1. Rate Limiting Check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${clientIP}`);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Demasiadas solicitudes. Por favor intenta más tarde.',
          retryAfter: rateLimitResult.retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfter || 60),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            ...corsHeaders,
          },
        }
      );
    }

    // 2. Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('[Contact API] Invalid JSON:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Formato de datos inválido',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // 3. Honeypot Check (spam prevention)
    if (body._honeypot && body._honeypot.length > 0) {
      console.warn('[Contact API] Honeypot triggered for IP:', clientIP);

      // Return success to fool bots, but don't actually send email
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mensaje enviado exitosamente',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // 4. Validate form data
    const validationResult = validateContactForm(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      console.warn('[Contact API] Validation failed:', errors);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Los datos del formulario contienen errores',
          errors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // 5. Send email
    const emailResult = await sendContactEmail(validationResult.data);

    if (!emailResult.success) {
      console.error('[Contact API] Email send failed:', emailResult.error);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // 6. Success response
    console.log('[Contact API] Email sent successfully:', {
      messageId: emailResult.messageId,
      from: validationResult.data.email,
      service: validationResult.data.service,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.',
        messageId: emailResult.messageId,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    // Catch-all error handler
    console.error('[Contact API] Unexpected error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor. Por favor intenta nuevamente.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

/**
 * OPTIONS handler for CORS preflight requests
 */
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

/**
 * GET handler - returns API information
 */
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      name: 'Contact API',
      version: '1.0.0',
      methods: ['POST'],
      description: 'Endpoint para manejar envíos del formulario de contacto',
      documentation: '/docs/api/contact',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

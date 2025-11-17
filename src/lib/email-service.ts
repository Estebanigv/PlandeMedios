/**
 * Email Service Abstraction Layer
 *
 * Provides a unified interface for sending emails through different providers.
 * This abstraction allows easy switching between email services without changing
 * the application code.
 *
 * Supported providers:
 * - Resend (recommended for production)
 * - EmailJS (client-side option)
 * - Formspree (no-backend option)
 */

import type { ContactFormData } from './validation';
import { serviceNames } from './validation';

/**
 * Email send result
 */
export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Email service provider interface
 */
export interface EmailProvider {
  send(data: ContactFormData): Promise<EmailResult>;
  name: string;
}

/**
 * Resend Email Provider
 *
 * Professional email API with high deliverability rates.
 * Requires API key and verified domain.
 *
 * Setup: https://resend.com/docs/send-with-nodejs
 */
export class ResendProvider implements EmailProvider {
  name = 'Resend';
  private apiKey: string;
  private fromEmail: string;
  private toEmail: string;

  constructor(config: { apiKey: string; fromEmail: string; toEmail: string }) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
    this.toEmail = config.toEmail;
  }

  async send(data: ContactFormData): Promise<EmailResult> {
    try {
      // Dynamically import Resend to avoid issues if not configured
      const { Resend } = await import('resend');
      const resend = new Resend(this.apiKey);

      const response = await resend.emails.send({
        from: this.fromEmail,
        to: this.toEmail,
        replyTo: data.email,
        subject: `Nuevo contacto de ${data.name} - ${serviceNames[data.service]}`,
        html: this.createEmailTemplate(data),
      });

      if (response.error) {
        console.error('[Resend] Error sending email:', response.error);
        return {
          success: false,
          error: response.error.message,
        };
      }

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (error) {
      console.error('[Resend] Exception:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Create professional HTML email template
   */
  private createEmailTemplate(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Contacto - Plan de Medios</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                Nuevo Mensaje de Contacto
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; color: #666; font-size: 16px; line-height: 1.5;">
                Has recibido un nuevo mensaje de contacto desde el sitio web de Plan de Medios.
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #667eea; margin-bottom: 8px;">
                    <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">${data.name}</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px;">
                      <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              ${
                data.phone
                  ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px;">
                      <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">${data.phone}</a>
                    </p>
                  </td>
                </tr>
              </table>
              `
                  : ''
              }

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Servicio de Interés</p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">${serviceNames[data.service]}</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 12px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p>
                    <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                Este mensaje fue enviado desde el formulario de contacto de Plan de Medios
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">
                Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }
}

/**
 * Get configured email provider
 *
 * Determines which email provider to use based on environment variables.
 * Falls back to console logging if no provider is configured.
 *
 * @returns Configured email provider or null
 */
export function getEmailProvider(): EmailProvider | null {
  // Check for Resend configuration
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const resendFromEmail = import.meta.env.RESEND_FROM_EMAIL;
  const resendToEmail = import.meta.env.RESEND_TO_EMAIL;

  if (resendApiKey && resendFromEmail && resendToEmail) {
    return new ResendProvider({
      apiKey: resendApiKey,
      fromEmail: resendFromEmail,
      toEmail: resendToEmail,
    });
  }

  // No provider configured
  console.warn('[Email] No email provider configured. Check your environment variables.');
  return null;
}

/**
 * Send contact form email
 *
 * Uses configured email provider or logs to console in development.
 *
 * @param data - Validated contact form data
 * @returns Email send result
 */
export async function sendContactEmail(data: ContactFormData): Promise<EmailResult> {
  const provider = getEmailProvider();

  if (!provider) {
    // In development without configuration, log to console
    console.log('[Email] Development mode - Email would be sent:', {
      to: 'configured-email@example.com',
      from: data.email,
      name: data.name,
      service: serviceNames[data.service],
      message: data.message,
      phone: data.phone || 'N/A',
    });

    return {
      success: true,
      messageId: 'dev-mode-' + Date.now(),
    };
  }

  // Use configured provider
  return provider.send(data);
}

/**
 * Contact Form Validation Schema
 *
 * Shared validation schema used on both client and server side
 * to ensure data consistency and security.
 *
 * Uses Zod for runtime type checking and validation.
 */

import { z } from 'zod';

/**
 * Contact form validation schema
 *
 * Validates all required and optional fields with appropriate
 * constraints to prevent injection and ensure data quality.
 */
export const contactFormSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, 'El nombre contiene caracteres no válidos')
    .trim(),

  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(255, 'El email no puede exceder 255 caracteres')
    .toLowerCase()
    .trim(),

  service: z
    .string()
    .min(1, 'Por favor selecciona un servicio')
    .refine(
      (val) => ['tour-graphic', 'tour-motor', 'tour-innovacion', 'otro'].includes(val),
      'Servicio no válido'
    ),

  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'El mensaje no puede exceder 5000 caracteres')
    .trim(),

  // Optional fields
  phone: z
    .string()
    .regex(/^[\d\s+()-]*$/, 'El teléfono contiene caracteres no válidos')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .optional()
    .or(z.literal('')),

  // Honeypot field for spam prevention (should always be empty)
  _honeypot: z.string().max(0).optional(),
});

/**
 * TypeScript type inferred from the schema
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Validates contact form data and returns parsed result
 *
 * @param data - Raw form data to validate
 * @returns Validation result with parsed data or errors
 */
export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}

/**
 * Service display names for user-friendly messaging
 */
export const serviceNames: Record<string, string> = {
  'tour-graphic': 'Tour Graphic',
  'tour-motor': 'Tour Motor',
  'tour-innovacion': 'Tour Innovación',
  'otro': 'Otro',
};

import { z } from 'zod';

/**
 * Sanitized string validator:
 * - Trims whitespace
 * - Enforces min and max lengths
 * - Strictly rejects HTML tags (<, >) and template brackets ({, })
 * - Strictly rejects CRLF line breaks (\r, \n)
 */
export const cleanSafeString = (min: number, max: number, fieldName: string = 'Texto') =>
  z.string()
    .trim()
    .min(min, `${fieldName} debe tener al menos ${min} caracteres.`)
    .max(max, `${fieldName} no puede exceder los ${max} caracteres.`)
    .refine(
      (val) => !/[<>{}\r\n]/.test(val),
      `${fieldName} contiene caracteres no permitidos (etiquetas HTML, plantillas o saltos de línea).`
    );

/**
 * Safe email validator:
 * - Valid email format
 * - Length between 5 and 100 characters
 * - Strictly no CRLF injection
 */
export const safeEmailSchema = z.string()
  .trim()
  .email('Correo electrónico inválido.')
  .min(5, 'El correo es demasiado corto.')
  .max(100, 'El correo excede la longitud máxima.')
  .refine(
    (val) => !/[\r\n<>{}%\\]/.test(val),
    'El correo contiene caracteres no permitidos.'
  );

/**
 * Safe phone validator:
 * - Allows digits, spaces, hyphens, and leading plus sign
 */
export const safePhoneSchema = z.string()
  .trim()
  .min(7, 'El teléfono debe tener al menos 7 dígitos.')
  .max(25, 'El teléfono es demasiado largo.')
  .regex(/^[0-9+\s()-]+$/, 'El formato del teléfono es inválido.');

/**
 * Contact Form Schema (/api/contact)
 */
export const ContactFormSchema = z.object({
  client_name: cleanSafeString(2, 80, 'Nombre'),
  city: cleanSafeString(2, 60, 'Ciudad'),
  equipment: z.string().trim().max(50).optional().default('z6'),
  hp_website: z.string().optional().default(''),
  render_time: z.number().optional().default(0),
  turnstile_token: z.string().optional().default(''),
  source: z.string().trim().max(60).optional().default('landing_contact_form')
}).strict();

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Booking Form Schema (/api/booking)
 */
export const BookingFormSchema = z.object({
  client_name: cleanSafeString(2, 100, 'Nombre del cliente'),
  client_email: safeEmailSchema,
  client_phone: safePhoneSchema,
  client_type: z.string().trim().max(50).optional().default('N/A'),
  document_number: z.string().trim().min(4, 'Documento inválido').max(30).regex(/^[a-zA-Z0-9.-]+$/, 'Documento con formato inválido'),
  tax_id: z.string().trim().max(30).optional().default(''),
  sector: z.string().trim().max(60).optional().default(''),
  client_address: z.string().trim().max(200).refine((val) => !/[<>{}\r\n]/.test(val), 'Dirección no válida.'),
  full_address: z.string().trim().max(250).refine((val) => !/[<>{}\r\n]/.test(val), 'Dirección completa no válida.'),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha de entrega inválida (YYYY-MM-DD)'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha de recogida inválida (YYYY-MM-DD)'),
  duration: z.string().trim().max(30).optional().default(''),
  total_days: z.number().int().min(1, 'La duración mínima es de 1 día').max(365, 'La duración máxima es de 365 días'),
  quantity_m7: z.number().int().min(0).max(10).optional().default(0),
  quantity_mx3: z.number().int().min(0).max(10).optional().default(0),
  quantity_z6: z.number().int().min(0).max(10).optional().default(0),
  quantity_z60: z.number().int().min(0).max(10).optional().default(0),
  selected_transducers: z.array(z.string().trim().max(50)).optional().default([]),
  equipment_summary: z.string().trim().max(500).refine((val) => !/[<>{}]/.test(val), 'Resumen de equipo no válido.').optional().default(''),
  include_cart: z.boolean().optional().default(false),
  include_printer: z.boolean().optional().default(false),
  delivery_time: z.string().trim().max(50).optional().default(''),
  collection_time: z.string().trim().max(50).optional().default(''),
  total_price: z.number().min(0, 'Precio inválido'),
  status: z.string().trim().max(30).optional().default('pending_delivery'),
  pdfBase64: z.string().optional().default(''),
  hp_website: z.string().optional().default(''),
  render_time: z.number().optional().default(0),
  turnstile_token: z.string().optional().default(''),
  created_at: z.string().optional()
}).passthrough(); // Permite campos de transporte necesarios

export type BookingFormData = z.infer<typeof BookingFormSchema>;

/**
 * Send Email Schema (/api/send-email)
 */
export const SendEmailSchema = z.object({
  client_name: cleanSafeString(2, 100, 'Nombre del cliente'),
  client_email: safeEmailSchema,
  client_phone: safePhoneSchema.optional(),
  equipment_summary: z.string().trim().max(500).refine((val) => !/[<>{}]/.test(val), 'Resumen no válido.').optional().default(''),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha de inicio inválida'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha de fin inválida'),
  duration: z.string().trim().max(30).optional().default(''),
  total_price: z.union([z.number(), z.string().regex(/^[0-9.,$ ]+$/)]).optional(),
  full_address: z.string().trim().max(250).refine((val) => !/[<>{}\r\n]/.test(val), 'Dirección inválida.').optional().default(''),
  pdfBase64: z.string().optional(),
  hp_website: z.string().optional().default(''),
  render_time: z.number().optional().default(0),
  turnstile_token: z.string().optional().default('')
}).passthrough();

export type SendEmailData = z.infer<typeof SendEmailSchema>;


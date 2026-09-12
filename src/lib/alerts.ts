import { supabase } from '@/lib/supabase';

export interface AlertPayload {
  client_name: string;
  client_email: string;
  client_phone: string;
  client_type?: string;
  document_number?: string;
  tax_id?: string;
  full_address: string;
  start_date: string;
  end_date: string;
  delivery_time?: string;
  collection_time?: string;
  total_days: number | string;
  equipment_summary: string;
  total_price: number | string;
}

function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('3')) {
    cleaned = `57${cleaned}`;
  }
  return cleaned;
}

function formatTemplate(template: string, data: AlertPayload): string {
  const now = new Date();
  const dateFormatted = now.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const formattedPrice = typeof data.total_price === 'number'
    ? `$${data.total_price.toLocaleString('es-CO')} COP`
    : (data.total_price || '$0 COP');

  const replacements: Record<string, string> = {
    '{{fecha_solicitud}}': dateFormatted,
    '{{client_name}}': data.client_name || 'No especificado',
    '{{document_number}}': data.document_number || 'No especificado',
    '{{client_type}}': data.client_type || 'Cliente Directo',
    '{{client_phone}}': data.client_phone || 'No especificado',
    '{{tax_id}}': data.tax_id || 'N/A',
    '{{client_email}}': data.client_email || 'No especificado',
    '{{full_address}}': data.full_address || 'Por coordinar',
    '{{start_date}}': data.start_date || 'No especificada',
    '{{delivery_time}}': data.delivery_time || 'Por coordinar',
    '{{end_date}}': data.end_date || 'No especificada',
    '{{collection_time}}': data.collection_time || 'Por coordinar',
    '{{total_days}}': String(data.total_days || 1),
    '{{equipment_summary}}': data.equipment_summary || 'Equipo no especificado',
    '{{total_price}}': formattedPrice,
  };

  let message = template;
  for (const [tag, val] of Object.entries(replacements)) {
    message = message.replaceAll(tag, val);
  }

  return message;
}

/**
 * Envía las alertas por WhatsApp consultando la configuración centralizada en el CRM
 */
export async function triggerWhatsAppAlerts(payload: AlertPayload): Promise<void> {
  try {
    if (!supabase) return;

    // Obtener la configuración guardada desde el CRM
    const { data, error } = await supabase
      .from('equipment_settings')
      .select('value')
      .eq('key', 'rental_alerts_config')
      .maybeSingle();

    if (error || !data?.value) {
      console.warn('[WhatsApp Alert] Configuración de alertas no encontrada en Supabase');
      return;
    }

    const config = data.value;
    if (!config.enabled || !config.apiUrl || !config.apiKey || !config.instanceName) {
      console.info('[WhatsApp Alert] Alertas desactivadas o configuración incompleta');
      return;
    }

    const phoneNumbers: string[] = Array.isArray(config.phoneNumbers) ? config.phoneNumbers : [];
    if (phoneNumbers.length === 0) {
      return;
    }

    const messageText = formatTemplate(config.messageTemplate, payload);
    const cleanUrl = config.apiUrl.replace(/\/$/, '');
    const endpoint = `${cleanUrl}/message/sendText/${config.instanceName}`;

    // Enviar a cada número configurado
    for (const rawNumber of phoneNumbers) {
      const cleanNumber = normalizePhoneNumber(rawNumber);
      if (!cleanNumber) continue;

      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.apiKey,
          },
          body: JSON.stringify({
            number: cleanNumber,
            text: messageText,
            options: {
              delay: 1000,
              presence: 'composing',
              linkPreview: false,
            },
          }),
        });
      } catch (sendErr) {
        console.error(`[WhatsApp Alert] Error enviando a ${rawNumber}:`, sendErr);
      }
    }

    console.info('[WhatsApp Alert] Alertas de WhatsApp procesadas exitosamente');
  } catch (err) {
    console.error('[WhatsApp Alert] Error general procesando alertas:', err);
  }
}

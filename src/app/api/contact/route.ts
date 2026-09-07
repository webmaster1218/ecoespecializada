import { NextResponse } from 'next/server';
import { getClientIp, checkRateLimit, isValidOrigin, isBotSubmission } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  'https://n8n.srv1054162.hstgr.cloud/webhook/20114322-9cd8-4eea-91c4-3d8ff32a4c71';

export async function POST(req: Request) {
  try {
    // 1. Validar origen de la petición (anti-CSRF y anti-scripts externos)
    if (!isValidOrigin(req)) {
      return NextResponse.json(
        { error: 'Origen no autorizado.' },
        { status: 403 }
      );
    }

    // 2. Rate Limiting por IP (máximo 4 solicitudes cada 5 minutos)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`contact:${clientIp}`, 4, 5 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: `Demasiados intentos. Por favor espera ${rateCheck.resetInSeconds} segundos.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { client_name, city, equipment, hp_website, render_time, source } = body;

    // 3. Verificación Anti-Bot (Honeypot + Time-gate)
    const botCheck = isBotSubmission({ hp_website, render_time });
    if (botCheck.isBot) {
      console.warn(`[Anti-Spam] Bot bloqueado silenciosamente (${botCheck.reason}) desde IP ${clientIp}`);
      // Respuesta 200 silenciosa para engañar al bot
      return NextResponse.json({
        success: true,
        message: 'Solicitud procesada correctamente.',
      });
    }

    // 4. Validación básica de campos
    const cleanName = String(client_name || '').trim();
    const cleanCity = String(city || '').trim();

    if (!cleanName || cleanName.length < 2 || cleanName.length > 120) {
      return NextResponse.json(
        { error: 'Por favor ingresa un nombre válido.' },
        { status: 400 }
      );
    }

    if (!cleanCity || cleanCity.length < 2 || cleanCity.length > 100) {
      return NextResponse.json(
        { error: 'Por favor ingresa una ciudad válida.' },
        { status: 400 }
      );
    }

    // 5. Enviar de manera segura a n8n desde el backend
    const webhookPayload = {
      client_name: cleanName,
      city: cleanCity,
      equipment: equipment || 'z6',
      created_at: new Date().toISOString(),
      source: source || 'landing_contact_form',
      ip: clientIp,
    };

    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('[Contact API] Error al reenviar a webhook n8n:', webhookResponse.status);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Contact API] Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}

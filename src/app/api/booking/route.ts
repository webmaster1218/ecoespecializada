import { NextResponse } from 'next/server';
import { getClientIp, checkRateLimit, isValidOrigin, isBotSubmission } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  'https://n8n.srv1054162.hstgr.cloud/webhook/20114322-9cd8-4eea-91c4-3d8ff32a4c71';

export async function POST(req: Request) {
  try {
    // 1. Validar origen de la petición
    if (!isValidOrigin(req)) {
      return NextResponse.json(
        { error: 'Origen no autorizado.' },
        { status: 403 }
      );
    }

    // 2. Rate Limiting por IP (máximo 4 solicitudes cada 5 minutos)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`booking:${clientIp}`, 4, 5 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: `Demasiados intentos. Por favor espera ${rateCheck.resetInSeconds} segundos antes de volver a intentar.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { hp_website, render_time } = body;

    // 3. Verificación Anti-Bot (Honeypot + Time-gate)
    const botCheck = isBotSubmission({ hp_website, render_time });
    if (botCheck.isBot) {
      console.warn(`[Anti-Spam Booking] Bot bloqueado silenciosamente (${botCheck.reason}) desde IP ${clientIp}`);
      return NextResponse.json({
        success: true,
        message: 'Reserva procesada correctamente.',
      });
    }

    // 4. Enviar de manera segura a n8n desde el backend
    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        ip: clientIp,
      }),
    });

    if (!webhookResponse.ok) {
      console.error('[Booking API] Error al reenviar a webhook n8n:', webhookResponse.status);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Booking API] Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al procesar la reserva.' },
      { status: 500 }
    );
  }
}

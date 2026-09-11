import { NextResponse } from 'next/server';
import { getClientIp, checkRateLimit, isValidOrigin, isBotSubmission } from '@/lib/rate-limit';
import { BookingFormSchema } from '@/lib/validations/forms';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

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

    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json(
        { error: 'Cuerpo de solicitud inválido o ausente.' },
        { status: 400 }
      );
    }

    // 3. Verificación Anti-Bot (Honeypot + Time-gate)
    const { hp_website, render_time } = rawBody;
    const botCheck = isBotSubmission({ hp_website, render_time });
    if (botCheck.isBot) {
      console.warn(`[Anti-Spam Booking] Bot bloqueado silenciosamente (${botCheck.reason}) desde IP ${clientIp}`);
      return NextResponse.json({
        success: true,
        message: 'Reserva procesada correctamente.',
      });
    }

    // 4. Validación Estricta con Zod (rechaza inyecciones XSS, CRLF, plantillas)
    const parseResult = BookingFormSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map((e) => e.message);
      return NextResponse.json(
        {
          error: 'Datos de la reserva inválidos.',
          details: errorMessages,
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // 5. Verificación Criptográfica Cloudflare Turnstile (Anti-Bot)
    if (process.env.TURNSTILE_SECRET_KEY) {
      const turnstileCheck = await verifyTurnstileToken(validData.turnstile_token, clientIp);
      if (!turnstileCheck.success) {
        return NextResponse.json(
          { error: turnstileCheck.error || 'Verificación de seguridad fallida.' },
          { status: 400 }
        );
      }
    }

    // Reserva validada con éxito. Ya no depende de n8n.
    return NextResponse.json({
      success: true,
      message: 'Reserva validada correctamente.',
    });
  } catch (error: any) {
    console.error('[Booking API] Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al procesar la reserva.' },
      { status: 500 }
    );
  }
}

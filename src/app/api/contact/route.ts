import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getClientIp, checkRateLimit, isValidOrigin, isBotSubmission } from '@/lib/rate-limit';
import { ContactFormSchema } from '@/lib/validations/forms';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

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
          error: `Demasiados intentos. Por favor espera ${rateCheck.resetInSeconds} segundos antes de reintentar.`,
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
      console.warn(`[Anti-Spam Contact] Bot bloqueado silenciosamente (${botCheck.reason}) desde IP ${clientIp}`);
      return NextResponse.json({
        success: true,
        message: 'Solicitud procesada correctamente.',
      });
    }

    // 4. Validación Estricta con Zod (rechaza inyecciones HTML, CRLF, plantillas)
    const parseResult = ContactFormSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map((e) => e.message);
      return NextResponse.json(
        {
          error: 'Datos del formulario inválidos.',
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

    // 6. Enviar notificación directa por correo al equipo comercial (sin intermediarios ni n8n)
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_PORT === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        await transporter.sendMail({
          from: `"Alquiler de Ecógrafos - Web" <${SMTP_USER}>`,
          to: [SMTP_USER, 'ecoespecializada@gmail.com'],
          subject: `📢 Nuevo Contacto Web: ${validData.client_name} (${validData.city})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
              <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">Nuevo Mensaje de Contacto</h2>
              <p><strong>Nombre:</strong> ${validData.client_name}</p>
              <p><strong>Ciudad:</strong> ${validData.city}</p>
              <p><strong>Equipo de interés:</strong> ${validData.equipment}</p>
              <p><strong>Origen:</strong> ${validData.source}</p>
              <p style="font-size: 11px; color: #64748b; margin-top: 20px;">IP de origen: ${clientIp} | Fecha: ${new Date().toLocaleString('es-CO')}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('[Contact API] Error al enviar notificación por correo:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud procesada correctamente.',
    });
  } catch (error: any) {
    console.error('[Contact API] Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}

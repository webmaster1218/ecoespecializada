import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            client_name,
            client_email,
            equipment_summary,
            start_date,
            end_date,
            total_price,
            full_address
        } = body;

        // Usar variables de entorno para las credenciales
        const SMTP_HOST = process.env.SMTP_HOST;
        const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
        const SMTP_USER = process.env.SMTP_USER;
        const SMTP_PASS = process.env.SMTP_PASS;

        // Validación de configuración
        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            console.error('ERROR DE CONFIGURACIÓN SMTP: Faltan variables de entorno.', {
                hasHost: !!SMTP_HOST,
                hasUser: !!SMTP_USER,
                hasPass: !!SMTP_PASS
            });
            return NextResponse.json({
                error: 'Error de configuración del servidor de correo. Por favor, reinicia el servidor de desarrollo para cargar el archivo .env.',
                code: 'CONFIG_ERROR'
            }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 587, // True para puerto 465, false para otros
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
            tls: {
                // Ayuda a evitar errores de certificado en algunos servidores de hosting
                rejectUnauthorized: false
            },
            // Aumentar el tiempo de espera para evitar timeouts en servidores lentos
            connectionTimeout: 10000,
            greetingTimeout: 10000,
        });

        const mailOptions = {
            from: `"Alquiler de Ecógrafos" <${SMTP_USER}>`,
            to: client_email,
            bcc: SMTP_USER,
            subject: '✅ Confirmación de Solicitud de Reserva - Alquiler de Ecógrafos',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; mx-auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; margin: 20px auto; }
                    .header { background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { padding: 30px; background-color: #ffffff; }
                    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; background-color: #f9fafb; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
                    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-radius: 8px; }
                    .info-item { margin-bottom: 10px; }
                    .label { font-weight: bold; color: #4b5563; font-size: 13px; text-transform: uppercase; }
                    .value { font-size: 15px; color: #111827; }
                    .highlight { color: #2563eb; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin:0;">¡Hola, ${client_name}!</h1>
                        <p style="margin: 10px 0 0; opacity: 0.9;">Hemos recibido tu solicitud de reserva</p>
                    </div>
                    <div class="content">
                        <p>Gracias por confiar en <strong>Alquiler de Ecógrafos</strong>. Queremos confirmarte que tu información ha sido registrada correctamente en nuestro sistema.</p>
                        
                        <p style="font-size: 16px; color: #1e40af; font-weight: bold; background-color: #eff6ff; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
                            🚀 En un momento un asesor se pondrá en contacto contigo para finalizar los detalles y confirmar la disponibilidad.
                        </p>

                        <h3 style="border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-top: 30px;">Resumen de tu solicitud:</h3>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                            <div style="margin-bottom: 12px;">
                                <span style="display:block; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Cliente</span>
                                <span style="font-size: 14px; font-weight: 600; color: #1e293b;">${client_name} - ${body.client_phone || 'N/A'}</span>
                                <span style="display:block; font-size: 13px; color: #64748b;">${client_email}</span>
                            </div>
                            <div style="margin-bottom: 12px;">
                                <span style="display:block; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Equipos</span>
                                <span style="font-size: 14px; font-weight: 600; color: #1e293b;">${equipment_summary}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; gap: 20px;">
                                <div style="flex: 1;">
                                    <span style="display:block; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase;">Desde</span>
                                    <span style="font-size: 14px; color: #1e293b;">${start_date}</span>
                                </div>
                                <div style="flex: 1;">
                                    <span style="display:block; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase;">Hasta</span>
                                    <span style="font-size: 14px; color: #1e293b;">${end_date}</span>
                                </div>
                            </div>
                            <div style="margin-top: 12px;">
                                <span style="display:block; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase;">Ubicación</span>
                                <span style="font-size: 14px; color: #1e293b;">${full_address}</span>
                            </div>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: bold; color: #1e293b;">Inversión estimada:</span>
                                <span style="font-size: 18px; font-weight: 800; color: #2563eb;">$${total_price.toLocaleString()} COP</span>
                            </div>
                        </div>

                        <p style="margin-top: 30px;">Si tienes alguna duda urgente, puedes contactarnos directamente:</p>
                        <div style="text-align: center;">
                            <a href="https://wa.me/573147175217" class="button" style="color: white !important;">Hablar con un asesor por WhatsApp</a>
                        </div>
                    </div>
                    <div class="footer">
                        <p>© 2026 Alquiler de Ecógrafos Medellín. Todos los derechos reservados.</p>
                        <p>info@alquilerdeecografos.com | +57 314 717 5217</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('SERVER ERROR:', error);
        return NextResponse.json({
            error: error.message,
            code: error.code,
            command: error.command
        }, { status: 500 });
    }
}

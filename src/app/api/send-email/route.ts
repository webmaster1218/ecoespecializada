import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            client_name,
            client_email,
            client_phone,
            equipment_summary,
            start_date,
            end_date,
            duration,
            total_price,
            full_address,
            pdfBase64
        } = body;

        // Usar variables de entorno para las credenciales
        const SMTP_HOST = process.env.SMTP_HOST;
        const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
        const SMTP_USER = process.env.SMTP_USER;
        const SMTP_PASS = process.env.SMTP_PASS;

        // Validación de configuración
        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            return NextResponse.json({
                error: 'Error de configuración del servidor de correo.',
                code: 'CONFIG_ERROR'
            }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"Alquiler de Ecógrafos" <${SMTP_USER}>`,
            to: client_email,
            bcc: SMTP_USER,
            subject: `📄 Contrato de Alquiler y Confirmación - ${client_name}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f4f7f9; }
                    .wrapper { background-color: #f4f7f9; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                    .header { background-color: #0a161e; color: #ffffff; padding: 40px 20px; text-align: center; }
                    .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
                    .content { padding: 40px 30px; }
                    .welcome-text { font-size: 18px; color: #0070c0; font-weight: bold; margin-bottom: 20px; }
                    .bank-box { background-color: #f8fbff; border: 1px solid #d0e3ff; border-radius: 12px; padding: 25px; margin: 30px 0; }
                    .bank-title { font-weight: bold; color: #004a80; font-size: 14px; text-transform: uppercase; margin-bottom: 15px; display: block; }
                    .bank-details { font-size: 16px; color: #111; line-height: 1.4; border-left: 4px solid #0070c0; padding-left: 15px; }
                    .action-banner { background-color: #fff4e5; border-left: 4px solid #ff9900; padding: 15px; margin: 20px 0; font-weight: 500; }
                    .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    .info-table td { padding: 12px 0; border-bottom: 1px solid #eee; }
                    .label { color: #666; font-size: 12px; text-transform: uppercase; font-weight: bold; width: 40%; }
                    .value { color: #111; font-weight: 600; font-size: 14px; }
                    .footer { text-align: center; padding: 30px; background-color: #0a161e; color: #999; font-size: 12px; }
                    .footer a { color: #0070c0; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="container">
                        <div class="header">
                            <h1>ALQUILER DE ECOGRAFOS</h1>
                            <p style="font-size: 14px; opacity: 0.8; margin-top: 10px;">Especialistas en alquiler de ecógrafos</p>
                        </div>
                        <div class="content">
                            <p class="welcome-text">¡Hola, ${client_name}!</p>
                            <p>Hemos recibido tu solicitud y hemos generado el contrato correspondiente. Para avanzar con el proceso, por favor sigue estos pasos:</p>
                            
                            <div class="action-banner">
                                🔔 Por favor, revisa el <strong>contrato adjunto</strong>, fírmalo y envíanoslo de vuelta por este mismo medio o vía WhatsApp.
                            </div>

                            <div class="bank-box">
                                <span class="bank-title">Información Bancaria para Pagos:</span>
                                <div class="bank-details">
                                    <strong>BANCOLOMBIA</strong><br/>
                                    Cuenta Corriente: <strong>37666021081</strong><br/>
                                    A nombre de: <strong>ECO ESPECIALIZADA SAS</strong><br/>
                                </div>
                            </div>

                            <h3 style="margin-top: 40px; border-bottom: 2px solid #0070c0; padding-bottom: 5px;">Detalles de la Solicitud:</h3>
                            <table class="info-table">
                                <tr>
                                    <td class="label">Equipo(s)</td>
                                    <td class="value">${equipment_summary}</td>
                                </tr>
                                <tr>
                                    <td class="label">Periodo</td>
                                    <td class="value">${duration || `${start_date} hasta ${end_date}`}</td>
                                </tr>
                                <tr>
                                    <td class="label">Ubicación</td>
                                    <td class="value">${full_address}</td>
                                </tr>
                                <tr>
                                    <td class="label">Inversión</td>
                                    <td class="value" style="color: #0070c0; font-size: 18px;">$${total_price.toLocaleString()} COP</td>
                                </tr>
                            </table>

                            <p style="margin-top: 40px;">Si tienes alguna pregunta, no dudes en contactarnos vía WhatsApp al <a href="https://wa.me/573005212664" style="color: #25d366; text-decoration: none; font-weight: bold;">+57 300 5212664</a> o respondiendo a este correo.</p>
                        </div>
                        <div class="footer">
                            <p><strong>Alquiler de Ecógrafos</strong></p>
                            <p>Medellín, Colombia</p>
                            <p><a href="https://alquilerdeecografos.com">www.alquilerdeecografos.com</a></p>
                            <p style="margin-top: 20px;">Este es un mensaje automático generado desde nuestro sistema de reservas.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
            attachments: pdfBase64 ? [{
                filename: `Contrato_Alquiler_Ecografos_${client_name.replace(/\s+/g, '_')}.pdf`,
                content: pdfBase64,
                encoding: 'base64'
            }] : []
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('SERVER ERROR:', error);
        return NextResponse.json({
            error: error.message,
            code: error.code
        }, { status: 500 });
    }
}

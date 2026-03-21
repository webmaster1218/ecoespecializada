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
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
                    .header { background-color: #0a161e; color: #ffffff; padding: 40px 20px; text-align: center; }
                    .header h1 { margin: 0; font-size: 26px; letter-spacing: 1px; text-transform: uppercase; }
                    .content { padding: 40px 30px; }
                    .welcome-text { font-size: 22px; color: #0070c0; font-weight: bold; margin-bottom: 20px; }
                    
                    .step-card { background-color: #ffffff; border: 1px solid #e1e8ed; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
                    .step-number { background-color: #0070c0; color: white; border-radius: 50%; width: 30px; height: 30px; display: inline-block; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px; }
                    .step-title { font-size: 18px; font-weight: bold; color: #0a161e; }
                    
                    .wa-button { background-color: #25d366; color: white; padding: 15px 25px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: bold; margin-top: 10px; font-size: 16px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3); }
                    
                    .bank-box { background-color: #f0f7ff; border: 2px dashed #0070c0; border-radius: 12px; padding: 25px; margin: 30px 0; }
                    .bank-title { font-weight: bold; color: #004a80; font-size: 16px; margin-bottom: 10px; display: block; }
                    
                    .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #fafafa; border-radius: 8px; overflow: hidden; }
                    .info-table td { padding: 15px; border-bottom: 1px solid #eee; }
                    .label { color: #666; font-size: 13px; text-transform: uppercase; font-weight: bold; width: 35%; }
                    .value { color: #111; font-weight: 600; font-size: 15px; }
                    
                    .help-banner { background-color: #fff4e5; border-radius: 8px; padding: 20px; border-left: 5px solid #ff9900; margin-top: 30px; }
                    .footer { text-align: center; padding: 30px; background-color: #0a161e; color: #999; font-size: 13px; }
                    .footer a { color: #0070c0; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="container">
                        <div class="header">
                            <h1>ALQUILER DE ECOGRAFOS</h1>
                            <p style="font-size: 14px; opacity: 0.8; margin-top: 10px;">Tu contrato está listo para firmar</p>
                        </div>
                        <div class="content">
                            <p class="welcome-text">¡Hola, ${client_name}! 👋</p>
                            <p>Para confirmar tu reserva y recibir tu equipo, por favor sigue estos <b>4 pasos muy sencillos</b>:</p>
                            
                            <!-- PASO 1 -->
                            <div class="step-card">
                                <span class="step-number">1</span>
                                <span class="step-title">Descarga tu contrato</span>
                                <p style="margin-left: 45px; color: #444;">Al final de este correo verás un archivo adjunto que dice: <b>"Contrato_Alquiler...pdf"</b>. Haz clic para abrirlo.</p>
                            </div>

                            <!-- PASO 2 -->
                            <div class="step-card">
                                <span class="step-number">2</span>
                                <span class="step-title">Firma el documento</span>
                                <p style="margin-left: 45px; color: #444;">Elige la opción más fácil para ti:</p>
                                <ul style="margin-left: 45px; color: #444;">
                                    <li><b>Opción A (Más fácil):</b> Imprime el papel, fírmalo con un esfero y tómale una <b>foto clara</b> con tu celular.</li>
                                    <li><b>Opción B:</b> Fírmalo digitalmente si sabes cómo hacerlo desde tu PC o celular.</li>
                                </ul>
                            </div>

                            <!-- PASO 3 -->
                            <div class="step-card">
                                <span class="step-number">3</span>
                                <span class="step-title">Envíanos el contrato firmado</span>
                                <p style="margin-left: 45px; color: #444;">Mándanos la foto o el archivo por aquí:</p>
                                <div style="text-align: center; margin-top: 15px;">
                                    <a href="https://wa.me/573003608621?text=Hola! Aquí envío mi contrato firmado: ${client_name}" class="wa-button">
                                        📲 Enviar por WhatsApp
                                    </a>
                                    <p style="font-size: 14px; color: #666; margin-top: 10px;">O responde directamente a este correo adjuntando la foto.</p>
                                </div>
                            </div>

                            <!-- PASO 4 -->
                            <div class="step-card">
                                <span class="step-number">4</span>
                                <span class="step-title">Realiza el pago</span>
                                <p style="margin-left: 45px; color: #444;">Una vez enviado el contrato, realiza el pago a esta cuenta:</p>
                                <div class="bank-box">
                                    <span class="bank-title">DATOS BANCARIOS:</span>
                                    <strong>BANCOLOMBIA</strong><br/>
                                    Cuenta Corriente: <b style="font-size: 18px; color: #0070c0;">37666021081</b><br/>
                                    A nombre de: <b>ECO ESPECIALIZADA SAS</b><br/>
                                </div>
                            </div>

                            <div class="help-banner">
                                <p style="margin: 0; font-weight: bold; color: #a35d00;">⚠️ ¿Tienes alguna duda o no sabes cómo firmar?</p>
                                <p style="margin: 5px 0 0 0;">No te preocupes, llámanos o escríbenos al <b>+57 300 3608621</b> y nosotros te guiaremos paso a paso.</p>
                            </div>

                            <h3 style="margin-top: 40px; color: #0a161e; border-bottom: 2px solid #eee; padding-bottom: 10px;">Resumen de tu pedido:</h3>
                            <table class="info-table">
                                <tr>
                                    <td class="label">Equipo</td>
                                    <td class="value">${equipment_summary}</td>
                                </tr>
                                <tr>
                                    <td class="label">Periodo</td>
                                    <td class="value">${duration || `${start_date} hasta ${end_date}`}</td>
                                </tr>
                                <tr>
                                    <td class="label">VALOR TOTAL</td>
                                    <td class="value" style="color: #0070c0; font-size: 18px;">$${total_price.toLocaleString()} COP</td>
                                </tr>
                            </table>
                        </div>
                        <div class="footer">
                            <p><strong>Alquiler de Ecógrafos SAS</strong></p>
                            <p>Medellín, Colombia</p>
                            <p><a href="https://alquilerdeecografos.com">www.alquilerdeecografos.com</a></p>
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

import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        envKeys: Object.keys(process.env).filter(key => key.includes('SMTP') || key.includes('NEXT_PUBLIC')),
        nodeEnv: process.env.NODE_ENV,
        smtp_user: process.env.SMTP_USER ? 'Definido' : 'No definido',
        smtp_pass: process.env.SMTP_PASS ? 'Definido' : 'No definido',
        smtp_host: process.env.SMTP_HOST || 'No definido',
        smtp_port: process.env.SMTP_PORT || 'No definido',
        message: "Si ves 'No definido', es que Hostinger requiere que reinicies la app Node.js o guardes de nuevo las variables."
    });
}

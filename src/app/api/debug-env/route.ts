import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        envKeys: Object.keys(process.env).filter(key => key.includes('SMTP') || key.includes('NEXT_PUBLIC')),
        nodeEnv: process.env.NODE_ENV,
        message: "Si ves SMTP_USER, SMTP_PASS y SMTP_HOST en envKeys, las variables están bien cargadas."
    });
}

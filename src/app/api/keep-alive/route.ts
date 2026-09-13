import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json({ status: 'error', message: 'Supabase not configured' }, { status: 500 });
        }

        // Realizamos una consulta muy ligera para mantener la conexión activa
        let { error } = await supabase
            .from('configuracion_equipos')
            .select('clave')
            .limit(1);

        if (error) {
            const fallback = await supabase
                .from('equipment_settings')
                .select('key')
                .limit(1);
            error = fallback.error;
        }

        if (error) {
            console.error('Keep-alive error:', error);
            return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
        }

        return NextResponse.json({ 
            status: 'ok', 
            message: 'Supabase connection is active',
            timestamp: new Date().toISOString()
        }, { status: 200 });

    } catch (err) {
        console.error('Keep-alive unexpected error:', err);
        return NextResponse.json({ status: 'error', message: 'Unexpected error' }, { status: 500 });
    }
}

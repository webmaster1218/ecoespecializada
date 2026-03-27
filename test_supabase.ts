import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
    const { data, error } = await supabase
            .from('bookings')
            .select('quantity_z6, quantity_z60, quantity_m7')
            .limit(1);
    
    console.log("Supabase Error Details:", JSON.stringify(error, null, 2));
}

testSupabase();

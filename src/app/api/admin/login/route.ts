import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    console.log('========================================');
    console.log('🚀 LOGIN API CALLED');
    console.log('========================================');

    try {
        const body = await request.json();
        console.log('📦 Request body:', body);

        const { username, password } = body;

        if (!username || !password) {
            console.log('❌ Missing username or password');
            return NextResponse.json(
                { error: 'Username and password required' },
                { status: 400 }
            );
        }

        // Create Supabase client directly here
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        console.log('🔗 Supabase URL:', supabaseUrl);
        console.log('🔑 Has Supabase Key:', !!supabaseKey);

        if (!supabaseUrl || !supabaseKey) {
            console.log('❌ Supabase not configured');
            return NextResponse.json(
                { error: 'Database not configured - missing environment variables' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        console.log('🔍 Querying admin_users for username:', username);

        const { data: users, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .eq('is_active', true);

        console.log('📊 Query result - Users:', users);
        console.log('📊 Query result - Error:', error);

        if (error) {
            console.log('❌ Supabase error:', error.message);
            return NextResponse.json(
                { error: 'Database error: ' + error.message },
                { status: 500 }
            );
        }

        if (!users || users.length === 0) {
            console.log('❌ User not found');
            return NextResponse.json(
                { error: 'User not found' },
                { status: 401 }
            );
        }

        const user = users[0]; // Take the first matching user

        console.log('🔐 Password comparison:');
        console.log('  - Provided:', password);
        console.log('  - Stored:', user.password_hash);
        console.log('  - Match:', password === user.password_hash);

        if (password !== user.password_hash) {
            console.log('❌ Password mismatch');
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        console.log('✅ Login successful!');

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                full_name: user.full_name
            }
        });

    } catch (error: any) {
        console.log('💥 EXCEPTION:', error);
        return NextResponse.json(
            { error: 'Server error: ' + error.message },
            { status: 500 }
        );
    }
}

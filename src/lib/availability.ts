import { supabase } from '@/lib/supabase';

export interface AvailabilityResult {
    z6: number;
    z60: number;
    m7: number;
    mx3: number;
    available: boolean;
}

// Fallback stock if Supabase fails or table is empty
const DEFAULT_STOCK = {
    z6: 2,
    z60: 1,
    m7: 1,
    mx3: 1
};

/**
 * Fetches the current total inventory from Supabase settings
 */
export async function getTotalStock(): Promise<{ z6: number; z60: number; m7: number; mx3: number }> {
    try {
        if (!supabase) return DEFAULT_STOCK;

        // Try Spanish table configuracion_equipos first
        let data: any = null;
        const { data: esData, error: esErr } = await supabase
            .from('configuracion_equipos')
            .select('valor')
            .in('clave', ['inventario', 'inventory'])
            .limit(1);

        if (!esErr && esData && esData.length > 0 && esData[0]?.valor) {
            data = { value: esData[0].valor };
        } else {
            // Fallback to equipment_settings
            const { data: legacyData } = await supabase
                .from('equipment_settings')
                .select('value')
                .eq('key', 'inventory')
                .single();
            data = legacyData;
        }

        if (!data || !data.value) {
            console.warn('Inventory setting not found, using default stock');
            return DEFAULT_STOCK;
        }

        return {
            z6: typeof data.value.z6 === 'number' ? data.value.z6 : DEFAULT_STOCK.z6,
            z60: typeof data.value.z60 === 'number' ? data.value.z60 : DEFAULT_STOCK.z60,
            m7: typeof data.value.m7 === 'number' ? data.value.m7 : DEFAULT_STOCK.m7,
            mx3: typeof data.value.mx3 === 'number' ? data.value.mx3 : DEFAULT_STOCK.mx3
        };
    } catch (err) {
        console.error('Error fetching total stock:', err);
        return DEFAULT_STOCK;
    }
}

/**
 * Checks availability for equipment in a given date range.
 * Returns the maximum number of units available for each type.
 */
export async function checkAvailability(startDate?: string, endDate?: string, excludeId?: string | number): Promise<AvailabilityResult> {
    try {
        const totalStock = await getTotalStock();

        // If no dates are provided, return the total stock as "available"
        if (!startDate || !endDate || !supabase) {
            return {
                ...totalStock,
                available: totalStock.z6 > 0 || totalStock.z60 > 0 || totalStock.m7 > 0 || totalStock.mx3 > 0
            };
        }

        // Sum up blocked quantities
        let blockedZ6 = 0;
        let blockedZ60 = 0;
        let blockedM7 = 0;
        let blockedMx3 = 0;

        // 1. Try Spanish table 'alquileres'
        let hasFetchedRentals = false;
        try {
            let esQuery = supabase
                .from('alquileres')
                .select('cantidad_z6, cantidad_z60, cantidad_m7, cantidad_mx3')
                .filter('estado', 'not.in', '(cancelado,completado,cancelled,completed)')
                .lte('fecha_inicio', endDate)
                .gte('fecha_fin', startDate);

            if (excludeId) esQuery = esQuery.neq('id', excludeId);
            const { data: esData, error: esErr } = await esQuery;

            if (!esErr && esData) {
                hasFetchedRentals = true;
                esData.forEach(r => {
                    blockedZ6 += (r.cantidad_z6 || 0);
                    blockedZ60 += (r.cantidad_z60 || 0);
                    blockedM7 += (r.cantidad_m7 || 0);
                    blockedMx3 += (r.cantidad_mx3 || 0);
                });
            }
        } catch {
            // Table might not exist yet
        }

        // 2. Fallback to 'bookings' if 'alquileres' was not fetched
        if (!hasFetchedRentals) {
            let query = supabase
                .from('bookings')
                .select('quantity_z6, quantity_z60, quantity_m7, quantity_mx3')
                .filter('status', 'not.in', '(cancelled,completed)')
                .lte('start_date', endDate)
                .gte('end_date', startDate);

            if (excludeId) query = query.neq('id', excludeId);
            const { data: bookings, error } = await query;

            if (error) {
                console.warn('Fallback checking bookings without quantity_mx3:', error.message);
                const { data: bFallback } = await supabase
                    .from('bookings')
                    .select('quantity_z6, quantity_z60, quantity_m7')
                    .filter('status', 'not.in', '(cancelled,completed)')
                    .lte('start_date', endDate)
                    .gte('end_date', startDate);

                if (bFallback) {
                    bFallback.forEach(b => {
                        blockedZ6 += (b.quantity_z6 || 0);
                        blockedZ60 += (b.quantity_z60 || 0);
                        blockedM7 += (b.quantity_m7 || 0);
                    });
                }
            } else if (bookings) {
                bookings.forEach(b => {
                    blockedZ6 += (b.quantity_z6 || 0);
                    blockedZ60 += (b.quantity_z60 || 0);
                    blockedM7 += (b.quantity_m7 || 0);
                    blockedMx3 += (b.quantity_mx3 || 0);
                });
            }
        }

        // 3. Query technical blocks from 'bloqueos_equipos'
        try {
            const { data: blocks, error: blocksErr } = await supabase
                .from('bloqueos_equipos')
                .select('cantidad_z6, cantidad_z60, cantidad_m7, cantidad_mx3')
                .lte('fecha_inicio', endDate)
                .gte('fecha_fin', startDate);

            if (!blocksErr && blocks && blocks.length > 0) {
                blocks.forEach(b => {
                    blockedZ6 += (b.cantidad_z6 || 0);
                    blockedZ60 += (b.cantidad_z60 || 0);
                    blockedM7 += (b.cantidad_m7 || 0);
                    blockedMx3 += (b.cantidad_mx3 || 0);
                });
            }
        } catch {
            // Graceful fallback if table not yet created
        }

        // Calculate available stock
        const availableZ6 = Math.max(0, totalStock.z6 - blockedZ6);
        const availableZ60 = Math.max(0, totalStock.z60 - blockedZ60);
        const availableM7 = Math.max(0, totalStock.m7 - blockedM7);
        const availableMx3 = Math.max(0, totalStock.mx3 - blockedMx3);

        return {
            z6: availableZ6,
            z60: availableZ60,
            m7: availableM7,
            mx3: availableMx3,
            available: availableZ6 > 0 || availableZ60 > 0 || availableM7 > 0 || availableMx3 > 0
        };

    } catch (err) {
        console.warn('Availability check failed (Supabase might be paused) - falling back to default stock:', err);
        const fallbackStock = await getTotalStock();
        return {
            ...fallbackStock,
            available: true
        };
    }
}

/**
 * Finds the next available start date for a specific model given a duration.
 * Scans the next 60 days.
 */
export async function getNextAvailableDate(model: 'z6' | 'z60' | 'm7' | 'mx3', durationDays: number): Promise<string | null> {
    try {
        const totalStock = await getTotalStock();
        
        if (!supabase) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toISOString().split('T')[0];
        }

        const today = new Date();
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() + 1);

        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 60);

        let activeRentals: { start_date: string; end_date: string; qty: number }[] = [];

        // 1. Try Spanish table 'alquileres'
        try {
            const { data: esRentals, error: esErr } = await supabase
                .from('alquileres')
                .select(`fecha_inicio, fecha_fin, cantidad_${model}`)
                .in('estado', ['confirmado', 'en_camino', 'entregado', 'por_confirmar'])
                .lte('fecha_inicio', maxDate.toISOString())
                .gte('fecha_fin', checkDate.toISOString());

            if (!esErr && esRentals && esRentals.length > 0) {
                esRentals.forEach(r => {
                    activeRentals.push({
                        start_date: r.fecha_inicio,
                        end_date: r.fecha_fin,
                        qty: (r[`cantidad_${model}` as keyof typeof r] as number) || 0
                    });
                });
            }
        } catch {
            // Table might not exist yet
        }

        // 2. Fallback to 'bookings' if alquileres was empty
        if (activeRentals.length === 0) {
            try {
                const { data: bookings } = await supabase
                    .from('bookings')
                    .select(`start_date, end_date, quantity_${model}`)
                    .in('status', ['confirmed', 'pending_delivery', 'delivered', 'pending_pickup'])
                    .lte('start_date', maxDate.toISOString())
                    .gte('end_date', checkDate.toISOString());

                if (bookings) {
                    bookings.forEach(b => {
                        activeRentals.push({
                            start_date: b.start_date,
                            end_date: b.end_date,
                            qty: (b[`quantity_${model}` as keyof typeof b] as number) || 0
                        });
                    });
                }
            } catch {
                // Table might not exist
            }
        }

        // 3. Technical blocks from 'bloqueos_equipos'
        try {
            const { data: blocks } = await supabase
                .from('bloqueos_equipos')
                .select(`fecha_inicio, fecha_fin, cantidad_${model}`)
                .lte('fecha_inicio', maxDate.toISOString())
                .gte('fecha_fin', checkDate.toISOString());

            if (blocks) {
                blocks.forEach(b => {
                    activeRentals.push({
                        start_date: b.fecha_inicio,
                        end_date: b.fecha_fin,
                        qty: (b[`cantidad_${model}` as keyof typeof b] as number) || 0
                    });
                });
            }
        } catch {
            // Table might not exist yet
        }

        const stock = totalStock[model];

        while (checkDate <= maxDate) {
            let isWindowAvailable = true;

            for (let i = 0; i < durationDays; i++) {
                const currentDay = new Date(checkDate);
                currentDay.setDate(currentDay.getDate() + i);
                const dateStr = currentDay.toISOString().split('T')[0];

                let usage = 0;
                activeRentals.forEach(b => {
                    if (b.start_date <= dateStr && b.end_date >= dateStr) {
                        usage += b.qty;
                    }
                });

                if (stock - usage <= 0) {
                    isWindowAvailable = false;
                    break;
                }
            }

            if (isWindowAvailable) {
                return checkDate.toISOString().split('T')[0];
            }

            checkDate.setDate(checkDate.getDate() + 1);
        }

        return null;
    } catch (err) {
        console.warn('Next available date check failed - falling back to tomorrow:', err);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }
}

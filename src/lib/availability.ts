import { supabase } from '@/lib/supabase';

export interface AvailabilityResult {
    z6: number;
    z60: number;
    available: boolean;
}

const TOTAL_STOCK = {
    z6: 2,
    z60: 2
};

/**
 * Checks availability for equipment in a given date range.
 * Returns the maximum number of units available for each type.
 */
export async function checkAvailability(startDate: string, endDate: string): Promise<AvailabilityResult> {
    try {
        if (!supabase) {
            console.warn('Supabase not configured - returning maximum availability');
            return {
                z6: TOTAL_STOCK.z6,
                z60: TOTAL_STOCK.z60,
                available: true
            };
        }

        // Query bookings that overlap with the requested range
        // Condition: (start_date <= requested_end) AND (end_date >= requested_start)
        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('quantity_z6, quantity_z60')
            // Match calendar logic: count everything except cancelled and completed
            .not('status', 'in', '("cancelled", "completed")')
            .lte('start_date', endDate)
            .gte('end_date', startDate);

        if (error) {
            console.error('Error checking availability:', error);
            throw error;
        }

        // Sum up blocked quantities
        let blockedZ6 = 0;
        let blockedZ60 = 0;

        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                blockedZ6 += (booking.quantity_z6 || 0);
                blockedZ60 += (booking.quantity_z60 || 0);
            });
        }

        // Calculate available stock
        // Ensure we don't return negative numbers if overbooked manually
        const availableZ6 = Math.max(0, TOTAL_STOCK.z6 - blockedZ6);
        const availableZ60 = Math.max(0, TOTAL_STOCK.z60 - blockedZ60);

        return {
            z6: availableZ6,
            z60: availableZ60,
            available: availableZ6 > 0 || availableZ60 > 0
        };

    } catch (err) {
        console.error('Availability check failed:', err);
        // Fallback or re-throw? 
        // Logic: if check fails, maybe assume no availability to prevent overbooking?
        // Or assume full availability? Safer to return 0.
        return { z6: 0, z60: 0, available: false };
    }
}

/**
 * Finds the next available start date for a specific model given a duration.
 * Scans the next 60 days.
 */
export async function getNextAvailableDate(model: 'z6' | 'z60', durationDays: number): Promise<string | null> {
    if (!supabase) {
        // Return tomorrow as next available date if Supabase is not configured
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    const today = new Date();
    // Start checking from tomorrow
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 60); // Check next 60 days

    // 1. Fetch all active bookings for this model in the next 60 days
    const { data: bookings } = await supabase
        .from('bookings')
        .select(`start_date, end_date, quantity_${model}`)
        //.in('status', ['confirmed', 'pending_delivery', 'delivered', 'pending_pickup']) -- Fixed syntax error potential
        .filter('status', 'in', '("confirmed","pending_delivery","delivered","pending_pickup")')
        .lte('start_date', maxDate.toISOString())
        .gte('end_date', checkDate.toISOString());

    const activeBookings = bookings || [];
    const stock = TOTAL_STOCK[model];

    // 2. Iterate day by day to find a gap of 'durationDays'
    while (checkDate <= maxDate) {
        let isWindowAvailable = true;

        // Check if the window [checkDate, checkDate + duration] is clear
        for (let i = 0; i < durationDays; i++) {
            const currentDay = new Date(checkDate);
            currentDay.setDate(currentDay.getDate() + i);
            const dateStr = currentDay.toISOString().split('T')[0];

            // Count usage on this specific day
            let usage = 0;
            activeBookings.forEach(b => {
                if (b.start_date <= dateStr && b.end_date >= dateStr) {
                    usage += (b[`quantity_${model}` as keyof typeof b] as number) || 0;
                }
            });

            if (stock - usage <= 0) {
                isWindowAvailable = false;
                break; // Stop checking this window, try next start date
            }
        }

        if (isWindowAvailable) {
            return checkDate.toISOString().split('T')[0];
        }

        // Increment start date
        checkDate.setDate(checkDate.getDate() + 1);
    }

    return null; // No slot found
}

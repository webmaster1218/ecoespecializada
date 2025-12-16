"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.custom.css";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const locales = {
    'es': es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    resource: any;
    allDay: boolean;
    style?: any;
}

export default function BookingsCalendar({ onEditBooking }: { onEditBooking?: (booking: any) => void }) {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [view, setView] = useState<View>('month');
    const [date, setDate] = useState(new Date()); // Control date state

    const fetchBookings = async () => {
        if (!supabase) {
            console.warn('Supabase not configured - showing demo data');
            setEvents([]);
            return;
        }

        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .neq('status', 'cancelled');

        if (error) {
            console.error('Error fetching bookings:', error);
            return;
        }

        if (data) {
            const mappedEvents: CalendarEvent[] = data.map(booking => {
                let titleParts = [];
                if (booking.quantity_z6 > 0) titleParts.push(`${booking.quantity_z6}x Z6`);
                if (booking.quantity_z60 > 0) titleParts.push(`${booking.quantity_z60}x Z60`);

                const title = `${titleParts.join(', ')} - ${booking.client_name}`;
                const isZ6 = booking.quantity_z6 > 0;
                const isZ60 = booking.quantity_z60 > 0;

                // Color Logic based on Logistics Status (Status overrides Model color)
                let bgColor = '#3b82f6'; // Default Blue

                switch (booking.status) {
                    case 'pending_delivery':
                        bgColor = '#f59e0b'; // Amber 500 (Yellow/Orange)
                        break;
                    case 'delivered':
                        bgColor = '#10b981'; // Emerald 500 (Green)
                        break;
                    case 'pending_pickup':
                        bgColor = '#ef4444'; // Red 500
                        break;
                    case 'completed':
                        bgColor = '#64748b'; // Slate 500 (Gray)
                        break;
                    default:
                        // Fallback to equipment based if status is unknown/confirmed
                        if (isZ6 && isZ60) bgColor = '#8b5cf6';
                        else if (isZ60) bgColor = '#3b82f6'; // Make Z60 blue
                        else bgColor = '#0ea5e9'; // Z6 Sky blue
                        break;
                }

                const start = new Date(booking.start_date + 'T00:00:00');
                const end = new Date(booking.end_date + 'T23:59:59');

                return {
                    id: booking.id,
                    title: title,
                    start: start,
                    end: end,
                    allDay: true,
                    resource: booking,
                    style: { backgroundColor: bgColor }
                };
            });
            setEvents(mappedEvents);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const eventStyleGetter = (event: CalendarEvent) => {
        return {
            className: 'rbc-event-custom',
            style: {
                backgroundColor: event.style?.backgroundColor
            }
        };
    };

    // Handler for navigation (Next/Back/Today)
    const onNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    // Handler for View Change
    const onView = (newView: View) => {
        setView(newView);
    };

    if (!isSupabaseConfigured) {
        return (
            <div className="w-full h-[600px] md:h-[750px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center p-8">
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4">
                        <svg className="w-12 h-12 mx-auto mb-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuración Requerida</h3>
                        <p className="text-gray-600 mb-4">Las variables de entorno de Supabase no están configuradas.</p>
                        <div className="bg-gray-100 p-3 rounded text-sm text-gray-700 text-left">
                            <p className="font-semibold mb-2">Variables necesarias en Vercel:</p>
                            <code className="block bg-white p-2 rounded border border-gray-200 text-xs">
                                NEXT_PUBLIC_SUPABASE_URL<br/>
                                NEXT_PUBLIC_SUPABASE_ANON_KEY
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] md:h-[750px]">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}

                // Controlled Props
                view={view}
                onView={onView}
                date={date}
                onNavigate={onNavigate}
                onSelectEvent={(event) => onEditBooking && onEditBooking(event.resource)}

                views={['month', 'week', 'agenda']}
                culture="es"
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Agenda",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                    noEventsInRange: "No hay reservas en este rango."
                }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
}

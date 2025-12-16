"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.custom.css";
import { supabase } from "@/lib/supabase";

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

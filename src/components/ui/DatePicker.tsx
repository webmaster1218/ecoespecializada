"use client";

import { useState, useRef, useEffect } from "react";
import {
    format, isSameDay, isBefore, startOfToday
} from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar, IconChevronDown } from "@tabler/icons-react";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label: string;
    minDate?: string;
    error?: string;
    labelClassName?: string;
}

export default function CustomDatePicker({ value, onChange, label, minDate, error, labelClassName }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedDate = value ? new Date(value + 'T12:00:00') : undefined;
    const min = minDate ? new Date(minDate + 'T00:00:00') : startOfToday();

    return (
        <div className="relative" ref={containerRef}>
            <label className={labelClassName || "text-sm font-bold text-slate-700 ml-1 block"}>{label} <span className="text-red-500">*</span></label>
            <div className="relative group">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full pl-9 pr-7 py-3 rounded-2xl bg-white border text-left outline-none font-semibold transition-all flex items-center shadow-sm text-xs sm:text-sm ${error ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'
                        }`}
                >
                    <IconCalendar className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} size={16} />
                    <span className={value ? "text-slate-700" : "text-slate-500 font-medium"}>
                        {value ? format(new Date(value + 'T12:00:00'), "dd/MM/yyyy") : "dd/mm/aaaa"}
                    </span>
                    <IconChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} size={14} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-[100] mt-2 p-0 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 origin-top"
                    >
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                if (date) {
                                    onChange(format(date, "yyyy-MM-dd"));
                                    setIsOpen(false);
                                }
                            }}
                            disabled={(date) => isBefore(date, min) && !isSameDay(date, min)}
                            locale={es}
                            initialFocus
                        />
                        <div className="p-3 bg-slate-50/50 border-t border-slate-50 flex justify-between gap-2">
                            <button
                                onClick={() => { onChange(format(new Date(), "yyyy-MM-dd")); setIsOpen(false); }}
                                className="flex-1 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-white transition-colors border border-transparent hover:border-blue-100"
                            >
                                Seleccionar Hoy
                            </button>
                            <button
                                onClick={() => { onChange(""); setIsOpen(false); }}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-700 transition-colors"
                            >
                                Limpiar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

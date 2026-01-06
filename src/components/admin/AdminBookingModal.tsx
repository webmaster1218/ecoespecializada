"use client";

import { useState, useEffect } from "react";
import { IconX, IconDeviceHeartMonitor, IconUser, IconCalendar, IconMapPin, IconClock, IconTag, IconPlus, IconMinus } from "@tabler/icons-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { checkAvailability } from "@/lib/availability";
import CustomDatePicker from "@/components/ui/DatePicker";

interface AdminBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    bookingToEdit?: any;
}

export default function AdminBookingModal({ isOpen, onClose, onSuccess, bookingToEdit }: AdminBookingModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [availableStock, setAvailableStock] = useState({ z6: 2, z60: 2 });
    const [isCheckingStock, setIsCheckingStock] = useState(false);
    const [formData, setFormData] = useState({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        clientAddress: "",
        clientType: "medico",
        documentNumber: "",
        taxId: "",
        startDate: "",
        endDate: "",
        deliveryTime: "",
        collectionTime: "",
        quantityZ6: 0,
        quantityZ60: 0,
        includeCart: false,
        includePrinter: false,
        selectedTransducers: [] as string[],
        status: "pending_delivery",
        notes: ""
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (bookingToEdit && isOpen) {
            setFormData({
                clientName: bookingToEdit.client_name || "",
                clientPhone: bookingToEdit.client_phone || "",
                clientEmail: bookingToEdit.client_email || "",
                clientAddress: bookingToEdit.client_address || "",
                clientType: bookingToEdit.client_type || "medico",
                documentNumber: bookingToEdit.document_number || "",
                taxId: bookingToEdit.tax_id || "",
                startDate: bookingToEdit.start_date || "",
                endDate: bookingToEdit.end_date || "",
                deliveryTime: bookingToEdit.delivery_time || "",
                collectionTime: bookingToEdit.collection_time || "",
                quantityZ6: bookingToEdit.quantity_z6 || 0,
                quantityZ60: bookingToEdit.quantity_z60 || 0,
                includeCart: bookingToEdit.include_cart || false,
                includePrinter: bookingToEdit.include_printer || false,
                selectedTransducers: bookingToEdit.selected_transducers || [],
                status: bookingToEdit.status || "pending_delivery",
                notes: bookingToEdit.notes || ""
            });
        } else if (!bookingToEdit && isOpen) {
            setFormData({
                clientName: "",
                clientPhone: "",
                clientEmail: "",
                clientAddress: "",
                clientType: "medico",
                documentNumber: "",
                taxId: "",
                startDate: "",
                endDate: "",
                deliveryTime: "",
                collectionTime: "",
                quantityZ6: 0,
                quantityZ60: 0,
                includeCart: false,
                includePrinter: false,
                selectedTransducers: [],
                status: "pending_delivery",
                notes: ""
            });
        }
    }, [bookingToEdit, isOpen]);

    useEffect(() => {
        const fetchStock = async () => {
            if (formData.startDate && formData.endDate) {
                setIsCheckingStock(true);
                try {
                    const result = await checkAvailability(formData.startDate, formData.endDate);
                    // If we are editing, we should add back the units already booked in this specific booking 
                    // to accurately reflect "available for this booking"
                    let extraZ6 = 0;
                    let extraZ60 = 0;
                    if (bookingToEdit) {
                        extraZ6 = bookingToEdit.quantity_z6 || 0;
                        extraZ60 = bookingToEdit.quantity_z60 || 0;
                    }

                    setAvailableStock({
                        z6: result.z6 + extraZ6,
                        z60: result.z60 + extraZ60
                    });
                } catch (error) {
                    console.error("Stock check error:", error);
                } finally {
                    setIsCheckingStock(false);
                }
            }
        };

        const timeoutId = setTimeout(fetchStock, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.startDate, formData.endDate, bookingToEdit]);

    const toggleTransducer = (t: string) => {
        setFormData(prev => ({
            ...prev,
            selectedTransducers: prev.selectedTransducers.includes(t)
                ? prev.selectedTransducers.filter(item => item !== t)
                : [...prev.selectedTransducers, t]
        }));
    };

    const executeDelete = async () => {
        if (!bookingToEdit) return;
        setIsLoading(true);
        try {
            if (!supabase) throw new Error('Supabase no está configurado');
            const { error } = await supabase.from('bookings').delete().eq('id', bookingToEdit.id);
            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar reserva: " + (error as any).message);
        } finally {
            setIsLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const getTotalPrice = () => {
        const PRICES = { z6: 350000, z60: 550000 };
        const CART_COST = 50000;
        const PRINTER_COST = 120000;
        const SHIPPING_COST = 50000;

        if (!formData.startDate || !formData.endDate) return 0;

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const days = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

        const subtotal = ((formData.quantityZ6 * PRICES.z6) + (formData.quantityZ60 * PRICES.z60)) * days;
        const cartTotal = formData.includeCart ? CART_COST : 0;
        const printerTotal = formData.includePrinter ? PRINTER_COST : 0;

        return subtotal + SHIPPING_COST + cartTotal + printerTotal;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!supabase) throw new Error('Supabase no está configurado');

            const finalTotal = getTotalPrice();

            const payload = {
                client_name: formData.clientName,
                client_phone: formData.clientPhone,
                client_email: formData.clientEmail,
                client_type: formData.clientType,
                client_address: formData.clientAddress,
                document_number: formData.documentNumber,
                tax_id: formData.taxId,
                start_date: formData.startDate,
                end_date: formData.endDate,
                delivery_time: formData.deliveryTime,
                collection_time: formData.collectionTime,
                quantity_z6: formData.quantityZ6,
                quantity_z60: formData.quantityZ60,
                include_cart: formData.includeCart,
                include_printer: formData.includePrinter,
                selected_transducers: formData.selectedTransducers,
                status: formData.status,
                total_price: finalTotal,
                notes: formData.notes
            };

            let error;
            if (bookingToEdit) {
                const { error: updateError } = await supabase.from('bookings').update(payload).eq('id', bookingToEdit.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase.from('bookings').insert(payload);
                error = insertError;
            }

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al guardar reserva: " + (error as any).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 md:p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl md:rounded-[40px] w-full max-w-5xl shadow-2xl relative overflow-hidden my-auto border border-slate-200">
                {/* Header */}
                <div className={`p-6 md:p-8 flex justify-between items-center text-white transition-colors shadow-lg
                    ${formData.status === 'pending_delivery' ? 'bg-amber-500' : ''}
                    ${formData.status === 'delivered' ? 'bg-emerald-600' : ''}
                    ${formData.status === 'pending_pickup' ? 'bg-red-500' : ''}
                    ${formData.status === 'completed' ? 'bg-slate-700' : ''}
                    ${!['pending_delivery', 'delivered', 'pending_pickup', 'completed'].includes(formData.status) ? 'bg-blue-600' : ''}
                `}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                            <IconDeviceHeartMonitor size={32} />
                        </div>
                        <div>
                            <h3 className="font-black text-2xl tracking-tight leading-none mb-1">
                                {bookingToEdit ? 'Gestionar Logística' : 'Nueva Reserva Manual'}
                            </h3>
                            <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">EcoAlquiler Admin</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all hover:rotate-90">
                        <IconX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

                        {/* Column 1: Client Information */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3">
                                    <IconUser size={16} /> Datos del Cliente
                                </h4>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Nombre Completo</label>
                                        <input required type="text" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                            value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 items-start">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Documento (CC)</label>
                                            <input required type="text" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                                value={formData.documentNumber} onChange={e => setFormData({ ...formData, documentNumber: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block flex justify-between">NIT / RUT <span className="text-[8px] opacity-40 lowercase">Opcional</span></label>
                                            <input type="text" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                                value={formData.taxId} onChange={e => setFormData({ ...formData, taxId: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Teléfono WhatsApp</label>
                                        <input required type="text" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                            value={formData.clientPhone} onChange={e => setFormData({ ...formData, clientPhone: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Email</label>
                                        <input type="email" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                            value={formData.clientEmail} onChange={e => setFormData({ ...formData, clientEmail: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Tipo de Cliente</label>
                                        <select className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white outline-none font-semibold text-sm cursor-pointer"
                                            value={formData.clientType} onChange={e => setFormData({ ...formData, clientType: e.target.value })}>
                                            <option value="medico">Médico Independiente</option>
                                            <option value="clinica">Clínica / IPS</option>
                                            <option value="movil">Servicio Móvil</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Logistics & Schedule */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3">
                                    <IconClock size={16} /> Logística y Horarios
                                </h4>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 items-start">
                                        <div className="space-y-1.5">
                                            <CustomDatePicker
                                                label="Fecha Entrega"
                                                value={formData.startDate}
                                                onChange={date => setFormData({ ...formData, startDate: date })}
                                                labelClassName="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Horario Entrega</label>
                                            <select required className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white font-semibold outline-none text-xs md:text-sm cursor-pointer h-[50px] md:h-[52px]"
                                                value={formData.deliveryTime} onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })}>
                                                <option value="">Selección...</option>
                                                <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
                                                <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                                                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                                                <option value="Tarde (2:00 PM - 5:00 PM)">Tarde (2-5PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 items-start">
                                        <div className="space-y-1.5">
                                            <CustomDatePicker
                                                label="Fecha Recogida"
                                                value={formData.endDate}
                                                onChange={date => setFormData({ ...formData, endDate: date })}
                                                minDate={formData.startDate}
                                                labelClassName="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Horario Recogida</label>
                                            <select required className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 bg-slate-50 focus:bg-white font-semibold outline-none text-xs md:text-sm cursor-pointer h-[50px] md:h-[52px]"
                                                value={formData.collectionTime} onChange={e => setFormData({ ...formData, collectionTime: e.target.value })}>
                                                <option value="">Selección...</option>
                                                <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                                                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                                                <option value="Mañana (8:00 AM - 12:00 PM)">Mañana (8-12PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Dirección Completa</label>
                                        <div className="relative">
                                            <IconMapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                                            <textarea required rows={2} className="w-full border-2 border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 bg-slate-50 focus:bg-white font-semibold outline-none resize-none text-sm"
                                                placeholder="Calle 123 #45-67, Edificio... Medellín"
                                                value={formData.clientAddress} onChange={e => setFormData({ ...formData, clientAddress: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 block">Estado del Servicio</label>
                                        <select className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3.5 bg-slate-50 focus:bg-white font-bold text-slate-800 outline-none text-sm cursor-pointer"
                                            value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="pending_delivery">🟡 Pendiente de Entregar</option>
                                            <option value="delivered">🟢 Entregado (En Cliente)</option>
                                            <option value="pending_pickup">🔴 Pendiente por Recoger</option>
                                            <option value="completed">⚫ Finalizado</option>
                                            <option value="cancelled">❌ Cancelado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Equipment & Extras */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3">
                                    <IconTag size={16} /> Equipaje y Transductores
                                </h4>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col items-center bg-slate-50 p-4 rounded-3xl border border-slate-100 relative group">
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-2">Mindray Z6</span>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setFormData(p => ({ ...p, quantityZ6: Math.max(0, p.quantityZ6 - 1) }))}
                                                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                                    <IconMinus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-black text-xl text-slate-800">{formData.quantityZ6}</span>
                                                <button type="button"
                                                    disabled={formData.quantityZ6 >= availableStock.z6}
                                                    onClick={() => setFormData(p => ({ ...p, quantityZ6: Math.min(availableStock.z6, p.quantityZ6 + 1) }))}
                                                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed">
                                                    <IconPlus size={14} />
                                                </button>
                                            </div>
                                            <div className="absolute -top-2 right-2 px-2 py-0.5 bg-blue-600 text-[8px] font-black text-white rounded-full shadow-sm">
                                                Disp: {availableStock.z6 - formData.quantityZ6}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center bg-slate-50 p-4 rounded-3xl border border-slate-100 relative group">
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-2">Mindray Z60</span>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setFormData(p => ({ ...p, quantityZ60: Math.max(0, p.quantityZ60 - 1) }))}
                                                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                                    <IconMinus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-black text-xl text-slate-800">{formData.quantityZ60}</span>
                                                <button type="button"
                                                    disabled={formData.quantityZ60 >= availableStock.z60}
                                                    onClick={() => setFormData(p => ({ ...p, quantityZ60: Math.min(availableStock.z60, p.quantityZ60 + 1) }))}
                                                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed">
                                                    <IconPlus size={14} />
                                                </button>
                                            </div>
                                            <div className="absolute -top-2 right-2 px-2 py-0.5 bg-blue-600 text-[8px] font-black text-white rounded-full shadow-sm">
                                                Disp: {availableStock.z60 - formData.quantityZ60}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">Transductores</span>
                                        <div className="flex flex-wrap gap-2">
                                            {['Convexo', 'Lineal', 'Transvaginal', 'Sectorial'].map(t => (
                                                <button key={t} type="button" onClick={() => toggleTransducer(t)}
                                                    className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${formData.selectedTransducers.includes(t) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'}`}>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${formData.includeCart ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`} onClick={() => setFormData(p => ({ ...p, includeCart: !p.includeCart }))}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.includeCart ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    🛒
                                                </div>
                                                <span className="text-xs font-black text-slate-700">Base Rodable (Carrito)</span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.includeCart ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                                                {formData.includeCart && <IconX size={12} className="text-white rotate-45" stroke={4} />}
                                            </div>
                                        </div>

                                        <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${formData.includePrinter ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`} onClick={() => setFormData(p => ({ ...p, includePrinter: !p.includePrinter }))}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.includePrinter ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    🖨️
                                                </div>
                                                <span className="text-xs font-black text-slate-700">Impresora Sony</span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.includePrinter ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                                                {formData.includePrinter && <IconX size={12} className="text-white rotate-45" stroke={4} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            {bookingToEdit && (
                                <button disabled={isLoading} type="button" onClick={() => setShowDeleteConfirm(true)}
                                    className="px-8 bg-red-50 text-red-600 font-bold py-4 rounded-2xl hover:bg-red-100 transition-all flex items-center gap-2">
                                    Eliminar Reserva
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                            <div className="text-right hidden sm:block mr-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inversión Total</p>
                                <p className="text-2xl font-black text-slate-900 leading-none">${getTotalPrice().toLocaleString()}</p>
                            </div>
                            <button disabled={isLoading} type="submit"
                                className="flex-1 md:flex-none px-12 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 text-lg">
                                {isLoading ? 'Procesando...' : (bookingToEdit ? 'Actualizar Logística' : 'Guardar Nueva Reserva')}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Delete Confirmation Overlay */}
                {showDeleteConfirm && (
                    <div className="absolute inset-0 z-[110] bg-white/95 backdrop-blur-md flex items-center justify-center p-8">
                        <div className="text-center max-w-sm">
                            <div className="w-24 h-24 bg-red-100 text-red-600 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-inner transform -rotate-12">
                                <IconX size={48} />
                            </div>
                            <h4 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">¿Borrar Registro?</h4>
                            <p className="text-slate-500 mb-10 font-bold leading-relaxed">Esta acción es permanente y liberará los equipos seleccionados en el calendario.</p>
                            <div className="flex gap-4 justify-center">
                                <button onClick={() => setShowDeleteConfirm(false)} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-2xl transition-all">
                                    Cancelar
                                </button>
                                <button onClick={executeDelete} className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-600/30 transition-all">
                                    Sí, Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


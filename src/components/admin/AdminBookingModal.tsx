"use client";

import { useState, useEffect } from "react";
import { IconX, IconDeviceHeartMonitor } from "@tabler/icons-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { checkAvailability } from "@/lib/availability";

interface AdminBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AdminBookingModal({ isOpen, onClose, onSuccess, bookingToEdit }: AdminBookingModalProps & { bookingToEdit?: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        clientAddress: "",
        clientType: "medico",
        startDate: "",
        endDate: "",
        quantityZ6: 0,
        quantityZ60: 0,
        includeCart: false,
        status: "pending_delivery", // Default for new
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
                startDate: bookingToEdit.start_date || "",
                endDate: bookingToEdit.end_date || "",
                quantityZ6: bookingToEdit.quantity_z6 || 0,
                quantityZ60: bookingToEdit.quantity_z60 || 0,
                includeCart: bookingToEdit.include_cart || false,
                status: bookingToEdit.status || "pending_delivery",
                notes: ""
            });
        } else if (!bookingToEdit && isOpen) {
            // Reset if creating new
            setFormData({
                clientName: "",
                clientPhone: "",
                clientEmail: "",
                clientAddress: "",
                clientType: "medico",
                startDate: "",
                endDate: "",
                quantityZ6: 0,
                quantityZ60: 0,
                includeCart: false,
                status: "pending_delivery",
                notes: ""
            });
        }
    }, [bookingToEdit, isOpen]);

    const executeDelete = async () => {
        if (!bookingToEdit) return;

        setIsLoading(true);
        try {
            if (!supabase) {
                throw new Error('Supabase no está configurado');
            }

            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', bookingToEdit.id);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!supabase) {
                throw new Error('Supabase no está configurado. Por favor configura las variables de entorno.');
            }
            // ... (Price calc logic remains same)
            const PRICES = { z6: 350000, z60: 550000 };
            const CART_COST = 50000;
            const SHIPPING_COST = 20000;

            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const days = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

            const subtotal = ((formData.quantityZ6 * PRICES.z6) + (formData.quantityZ60 * PRICES.z60)) * days;
            const cartTotal = formData.includeCart ? CART_COST : 0;
            const finalTotal = subtotal + SHIPPING_COST + cartTotal;

            const payload = {
                client_name: formData.clientName,
                client_phone: formData.clientPhone,
                client_email: formData.clientEmail || 'admin-entry@manual.com',
                client_type: formData.clientType,
                client_address: formData.clientAddress,
                start_date: formData.startDate,
                end_date: formData.endDate,
                quantity_z6: formData.quantityZ6,
                quantity_z60: formData.quantityZ60,
                include_cart: formData.includeCart,
                status: formData.status, // Use selected status
                total_price: finalTotal
            };

            // ... (Insert/Update logic remains same)
            let error;
            if (bookingToEdit) {
                const { error: updateError } = await supabase
                    .from('bookings')
                    .update(payload)
                    .eq('id', bookingToEdit.id);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-[30px] w-full max-w-2xl shadow-2xl relative overflow-hidden my-auto">
                {/* Header */}
                <div className={`p-6 flex justify-between items-center text-white transition-colors
                    ${formData.status === 'pending_delivery' ? 'bg-amber-500' : ''}
                    ${formData.status === 'delivered' ? 'bg-emerald-600' : ''}
                    ${formData.status === 'pending_pickup' ? 'bg-red-500' : ''}
                    ${formData.status === 'completed' ? 'bg-slate-500' : ''}
                    ${!['pending_delivery', 'delivered', 'pending_pickup', 'completed'].includes(formData.status) ? 'bg-blue-600' : ''}
                `}>
                    <h3 className="font-bold text-xl flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                            <IconDeviceHeartMonitor size={24} />
                        </div>
                        {bookingToEdit ? 'Gestionar Logística' : 'Nueva Reserva'}
                    </h3>
                    <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white">
                        <IconX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* Status Selector - Prominent for Logistics */}
                    <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Estado del Servicio</label>
                        <select
                            className="w-full text-lg font-bold bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="pending_delivery">🟡 Pendiente de Entregar</option>
                            <option value="delivered">🟢 Entregado (En Cliente)</option>
                            <option value="pending_pickup">🔴 Pendiente por Recoger</option>
                            <option value="completed">⚫ Finalizado</option>
                            <option value="cancelled">❌ Cancelado</option>
                        </select>
                    </div>

                    {/* Sección 1: Cliente */}
                    <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">Datos del Cliente</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Nombre Cliente</label>
                                <input required type="text"
                                    className="w-full border rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Teléfono</label>
                                <input required type="text"
                                    className="w-full border rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    value={formData.clientPhone} onChange={e => setFormData({ ...formData, clientPhone: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Email</label>
                                <input type="email"
                                    className="w-full border rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    value={formData.clientEmail} onChange={e => setFormData({ ...formData, clientEmail: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Tipo Cliente</label>
                                <select
                                    className="w-full border rounded-xl px-4 py-3 bg-slate-50 focus:bg-white outline-none"
                                    value={formData.clientType} onChange={e => setFormData({ ...formData, clientType: e.target.value })}>
                                    <option value="medico">Médico Independiente</option>
                                    <option value="clinica">Clínica / IPS</option>
                                    <option value="movil">Servicio Móvil</option>
                                </select>
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-sm font-bold text-slate-700">Dirección de Entrega</label>
                                <input required type="text"
                                    className="w-full border rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    placeholder="Dirección completa con ciudad"
                                    value={formData.clientAddress} onChange={e => setFormData({ ...formData, clientAddress: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Fechas y Equipos */}
                    <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">Reserva</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Desde</label>
                                <input required type="date"
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                    value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Hasta</label>
                                <input required type="date"
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                    value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-between border-2 border-slate-100 rounded-xl p-3 hover:border-blue-100 transition-colors">
                                <span className="font-bold text-slate-700">Mindray Z6</span>
                                <input type="number" min="0" max="5"
                                    className="w-16 text-center font-bold border rounded-lg py-1"
                                    value={formData.quantityZ6} onChange={e => setFormData({ ...formData, quantityZ6: parseInt(e.target.value) || 0 })} />
                            </div>
                            <div className="flex items-center justify-between border-2 border-slate-100 rounded-xl p-3 hover:border-blue-100 transition-colors">
                                <span className="font-bold text-slate-700">Mindray Z60</span>
                                <input type="number" min="0" max="5"
                                    className="w-16 text-center font-bold border rounded-lg py-1"
                                    value={formData.quantityZ60} onChange={e => setFormData({ ...formData, quantityZ60: parseInt(e.target.value) || 0 })} />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <input
                                type="checkbox"
                                id="cart_check"
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                checked={formData.includeCart}
                                onChange={e => setFormData({ ...formData, includeCart: e.target.checked })}
                            />
                            <label htmlFor="cart_check" className="font-medium text-slate-700 cursor-pointer select-none">
                                Incluir Base Rodable (Carrito) - <span className="text-blue-600 font-bold">+$50,000</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                        {bookingToEdit && (
                            <button
                                disabled={isLoading}
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-6 bg-red-100 text-red-600 font-bold py-4 rounded-xl hover:bg-red-200 transition-all"
                            >
                                Eliminar
                            </button>
                        )}
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
                        >
                            {isLoading ? 'Guardando...' : (bookingToEdit ? 'Actualizar Reserva' : 'Confirmar Reserva Manual')}
                        </button>
                    </div>
                </form>

                {/* Delete Confirmation Overlay */}
                {showDeleteConfirm && (
                    <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
                        <div className="text-center max-w-sm">
                            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <IconX size={40} />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">¿Eliminar Reserva?</h4>
                            <p className="text-slate-500 mb-8 font-medium">Esta acción no se puede deshacer. Se borrará permanentemente del calendario.</p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={executeDelete}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all"
                                >
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

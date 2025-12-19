"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconUser, IconBuildingHospital, IconAmbulance, IconCheck,
    IconChevronRight, IconChevronLeft, IconCalendar, IconMapPin,
    IconDeviceHeartMonitor, IconTruckDelivery, IconShoppingCart,
    IconAlertCircle, IconPlus, IconMinus, IconTag
} from "@tabler/icons-react";
import Image from "next/image";

type BookingStep = 1 | 2 | 3 | 4;

interface BookingData {
    // Step 1
    name: string;
    email: string;
    phone: string;
    documentNumber: string;
    taxId: string;
    clientType: 'medico' | 'clinica' | 'movil' | '';

    // Step 2
    startDate: string;
    endDate: string;
    quantities: {
        z6: number;
        z60: number;
    };
    includeCart: boolean;

    // Step 3
    city: string;
    address: string;
}

const INITIAL_DATA: BookingData = {
    name: '', email: '', phone: '', documentNumber: '', taxId: '', clientType: '',
    startDate: '', endDate: '',
    quantities: { z6: 0, z60: 0 },
    includeCart: false,
    city: '', address: ''
};

const SHIPPING_COST = 50000;
const CART_COST = 50000;
import { checkAvailability, getNextAvailableDate } from "@/lib/availability";
import { supabase } from "@/lib/supabase";

const PRICES = {
    z6: 350000,
    z60: 550000
};

export default function BookingWizard() {
    const [step, setStep] = useState<BookingStep>(1);
    const [formData, setFormData] = useState<BookingData>(INITIAL_DATA);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Dynamic Availability State
    const [maxAvailability, setMaxAvailability] = useState<{ z6: number; z60: number }>({ z6: 0, z60: 0 });
    const [availabilitySuggestions, setAvailabilitySuggestions] = useState<{ z6: string | null; z60: string | null }>({ z6: null, z60: null });
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check Availability when dates change
    useEffect(() => {
        const fetchAvailability = async () => {
            if (formData.startDate && formData.endDate) {
                setIsCheckingAvailability(true);
                setAvailabilitySuggestions({ z6: null, z60: null }); // Reset suggestions
                // Reset quantities if dates change to avoid holding invalid stock
                setFormData(prev => ({ ...prev, quantities: { z6: 0, z60: 0 } }));

                const result = await checkAvailability(formData.startDate, formData.endDate);

                // Calculate duration for suggestions
                const start = new Date(formData.startDate);
                const end = new Date(formData.endDate);
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

                // Check for suggestions if out of stock
                let suggestionZ6 = null;
                let suggestionZ60 = null;

                if (result.z6 === 0) {
                    suggestionZ6 = await getNextAvailableDate('z6', days);
                }
                if (result.z60 === 0) {
                    suggestionZ60 = await getNextAvailableDate('z60', days);
                }

                setMaxAvailability({ z6: result.z6, z60: result.z60 });
                setAvailabilitySuggestions({ z6: suggestionZ6, z60: suggestionZ60 });
                setIsCheckingAvailability(false);
            }
        };

        const timeoutId = setTimeout(() => {
            if (formData.startDate && formData.endDate) {
                fetchAvailability();
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [formData.startDate, formData.endDate]);

    const saveBooking = async () => {
        try {
            setIsSubmitting(true);

            // Re-check availability one last time
            const check = await checkAvailability(formData.startDate, formData.endDate);
            if (formData.quantities.z6 > check.z6 || formData.quantities.z60 > check.z60) {
                alert("Lo sentimos, otro usuario acaba de reservar uno de los equipos seleccionados. Por favor ajusta tu selección.");
                setIsSubmitting(false);
                // Refresh availability
                setMaxAvailability({ z6: check.z6, z60: check.z60 });
                return false;
            }

            const totalPrice = getTotalPrice();

            if (!supabase) {
                alert('Lo sentimos, el sistema no está disponible en este momento. Por favor inténtalo más tarde.');
                setIsSubmitting(false);
                return false;
            }

            const { error } = await supabase.from('bookings').insert({
                client_name: formData.name,
                client_email: formData.email,
                client_phone: formData.phone,
                client_type: formData.clientType,
                client_document: formData.documentNumber,
                client_tax_id: formData.taxId,
                client_address: `${formData.address}, ${formData.city}`,
                start_date: formData.startDate,
                end_date: formData.endDate,
                quantity_z6: formData.quantities.z6,
                quantity_z60: formData.quantities.z60,
                include_cart: formData.includeCart,
                total_price: totalPrice,
                status: 'pending_delivery'
            });

            if (error) throw error;

            // Send to Webhook
            try {
                const webhookUrl = "https://n8n.srv1054162.hstgr.cloud/webhook/20114322-9cd8-4eea-91c4-3d8ff32a4c71";
                // Generate Equipment Summary
                const summaryParts = [];
                if (formData.quantities.z60 > 0) {
                    summaryParts.push(`ECOGRAFO Z60${formData.includeCart ? ' CON CARRITO' : ''}`);
                }
                if (formData.quantities.z6 > 0) {
                    summaryParts.push(`ECOGRAFO Z6${formData.includeCart ? ' CON CARRITO' : ''}`);
                }
                const equipmentSummary = summaryParts.join(' / ');

                const payload = {
                    client_name: formData.name,
                    client_email: formData.email,
                    client_phone: formData.phone,
                    client_type: formData.clientType,
                    document_number: formData.documentNumber,
                    tax_id: formData.taxId,
                    sector: formData.city,
                    client_address: formData.address,
                    full_address: `${formData.address}, ${formData.city}`,
                    start_date: formData.startDate,
                    end_date: formData.endDate,
                    quantity_z6: formData.quantities.z6,
                    quantity_z60: formData.quantities.z60,
                    equipment_summary: equipmentSummary,
                    include_cart: formData.includeCart,
                    total_price: totalPrice,
                    status: 'pending_delivery',
                    created_at: new Date().toISOString()
                };

                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }).catch(err => console.error("Error sending to webhook:", err));

            } catch (webhookErr) {
                console.error("Webhook error:", webhookErr);
                // We don't fail the booking if only the webhook fails
            }

            return true;

        } catch (err) {
            console.error(err);
            alert("Hubo un error guardando tu reserva. Por favor intenta de nuevo.");
            setIsSubmitting(false);
            return false;
        }
    };

    const updateData = (field: keyof BookingData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const updateQuantity = (model: 'z6' | 'z60', delta: number) => {
        setFormData(prev => {
            const current = prev.quantities[model];
            const max = maxAvailability[model]; // Use dynamic max
            const newValue = Math.min(Math.max(0, current + delta), max);

            return {
                ...prev,
                quantities: {
                    ...prev.quantities,
                    [model]: newValue
                }
            };
        });
        if (errors.quantities) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.quantities;
                return newErrors;
            });
        }
    };

    // Calculate days whenever dates change
    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setTotalDays(diffDays > 0 ? diffDays : 0);
        }
    }, [formData.startDate, formData.endDate]);

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
            if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
            else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Correo inválido";
            if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
            if (!formData.documentNumber.trim()) newErrors.documentNumber = "El documento es obligatorio";
            if (!formData.taxId.trim()) newErrors.taxId = formData.clientType === 'clinica' ? "El NIT es obligatorio" : "El RUT es obligatorio";
            if (!formData.clientType) newErrors.clientType = "Selecciona un tipo de cliente";
        } else if (currentStep === 2) {
            if (!formData.startDate) newErrors.startDate = "Fecha de inicio requerida";
            if (!formData.endDate) newErrors.endDate = "Fecha de fin requerida";

            const totalUnits = formData.quantities.z6 + formData.quantities.z60;
            if (totalUnits === 0) newErrors.quantities = "Selecciona al menos un equipo";
        } else if (currentStep === 3) {
            if (!formData.city.trim()) newErrors.city = "El sector es obligatorio";
            if (!formData.address.trim()) newErrors.address = "La dirección es obligatoria";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const nextStep = async () => {
        if (validateStep(step)) {
            if (step === 3) {
                // Submit data
                const success = await saveBooking();
                if (success) {
                    setStep(4);
                }
            } else {
                setStep(prev => Math.min(prev + 1, 4) as BookingStep);
            }
        }
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as BookingStep);

    // Pricing Logic
    const getTotalPrice = () => {
        const z6Price = formData.quantities.z6 * PRICES.z6;
        const z60Price = formData.quantities.z60 * PRICES.z60;
        const dailyRate = z6Price + z60Price;

        const days = totalDays > 0 ? totalDays : 1;
        const subtotal = dailyRate * days;

        // Cart cost applies once per full order or per unit? Assuming per order for now or maybe per unit if cart is generic? 
        // Let's assume the cart option adds one cart per order or maybe we should scale it?
        // For simplicity: Cart Fee is flat for now based on previous code, but logically should perhaps be per unit.
        // User didn't specify, keeping it flat but assuming 'Include Carts' means carts for all units or just a general service fee.
        // Let's keep it flat: "Base Rodable" = 50k total (maybe it's a rental fee per reservation). 
        // Actually, usually it's per unit. Let's make it smarter: If carts selected, add 50k * total units? 
        // Returning to original logic: it was a toggle. Let's keep it simple: Fixed cost for "Service Cart/Stand".
        const cartTotal = formData.includeCart ? CART_COST : 0;

        return subtotal + SHIPPING_COST + cartTotal;
    };

    return (
        <section className="py-10 md:py-16 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden" id="reservar">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-8" data-aos="fade-up">
                    <span className="block text-xs uppercase tracking-[0.2em] text-blue-200 font-bold mb-2">RESERVA FÁCIL</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">Reserva tu Equipo <span className="text-blue-100">en Minutos</span></h2>
                    <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">Proceso 100% digital. Reserva tu <strong>ecógrafo en Medellín</strong> o cualquier ciudad del país en minutos.</p>
                </div>

                {/* Wizard Component */}
                <div className="max-w-4xl mx-auto bg-white overflow-hidden shadow-2xl rounded-[30px] border border-slate-100">

                    {/* Progress Bar */}
                    <div className="border-b border-slate-100 p-6 bg-white">
                        <div className="flex justify-between items-center max-w-2xl mx-auto relative">
                            {/* Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 rounded-full -z-0"></div>
                            <div className={`absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full -z-0 transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                            {/* Steps */}
                            {[1, 2, 3].map((num) => (
                                <div key={num} className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4 border-white ${step >= num
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                                    : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {step > num ? <IconCheck size={20} stroke={3} /> : num}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between max-w-2xl mx-auto mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
                            <span>Datos</span>
                            <span>Equipos</span>
                            <span>Entrega</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-8 min-h-[350px]">
                        {step < 4 && (
                            <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="bg-white p-2.5 rounded-xl text-emerald-600 shadow-sm z-10 flex-shrink-0">
                                    <IconTag size={24} stroke={1.5} />
                                </div>
                                <div className="z-10">
                                    <h4 className="font-bold text-emerald-900 leading-tight text-sm">¡10% de Descuento en tu Primera Reserva!</h4>
                                    <p className="text-emerald-700 text-xs font-medium mt-0.5">Automáticamente aplicado al finalizar tu solicitud.</p>
                                </div>
                            </div>
                        )}
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">Información de Contacto</h3>
                                        <p className="text-slate-500 text-sm mt-1">Todos los campos son obligatorios</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Nombre Completo <span className="text-red-500">*</span></label>
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.name ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 group-hover:border-blue-300'}`}
                                                    placeholder="Ej. Dr. Alejandro Gómez"
                                                    value={formData.name}
                                                    onChange={(e) => updateData('name', e.target.value)}
                                                />
                                                {errors.name && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.name}</span>}
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Correo Electrónico <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.email ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder="doctor@ejemplo.com"
                                                value={formData.email}
                                                onChange={(e) => updateData('email', e.target.value)}
                                            />
                                            {errors.email && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.email}</span>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Teléfono / WhatsApp <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.phone ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder="+57 300 123 4567"
                                                value={formData.phone}
                                                onChange={(e) => updateData('phone', e.target.value)}
                                            />
                                            {errors.phone && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.phone}</span>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">N° de Documento <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.documentNumber ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder="C.C. / C.E."
                                                value={formData.documentNumber}
                                                onChange={(e) => updateData('documentNumber', e.target.value)}
                                            />
                                            {errors.documentNumber && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.documentNumber}</span>}
                                        </div>
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">
                                                {formData.clientType === 'clinica' ? 'NIT' : 'RUT'} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.taxId ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder={formData.clientType === 'clinica' ? 'NIT de la empresa' : 'RUT personal'}
                                                value={formData.taxId}
                                                onChange={(e) => updateData('taxId', e.target.value)}
                                            />
                                            {errors.taxId && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.taxId}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Tipo de Cliente <span className="text-red-500">*</span></label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'medico', label: 'Médico Indep.', icon: IconUser },
                                                { id: 'clinica', label: 'Clínica / IPS', icon: IconBuildingHospital },
                                                { id: 'movil', label: 'Servicio Móvil', icon: IconAmbulance },
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => updateData('clientType', type.id as any)}
                                                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${formData.clientType === type.id
                                                        ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-md scale-[1.02]'
                                                        : errors.clientType ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className={`p-3 rounded-full ${formData.clientType === type.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                                        <type.icon size={24} />
                                                    </div>
                                                    <span className="font-bold text-sm leading-tight">{type.label}</span>
                                                    <span className={`text-[10px] md:text-[11px] leading-tight opacity-80 ${formData.clientType === type.id ? 'text-blue-500' : 'text-slate-400'}`}>
                                                        {type.id === 'medico' && "Para consultorios"}
                                                        {type.id === 'clinica' && "Corporativo / IPS"}
                                                        {type.id === 'movil' && "Domiciliario"}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.clientType && <span className="text-xs text-red-500 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.clientType}</span>}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">Selecciona tus Fechas</h3>
                                        <p className="text-slate-500 text-sm mt-1">Primero indícanos cuándo lo necesitas para ver disponibilidad</p>
                                    </div>

                                    {/* Dates Section */}
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Fecha Inicio <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <IconCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        type="date"
                                                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border outline-none font-medium text-slate-700 shadow-sm ${errors.startDate ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                        value={formData.startDate}
                                                        onChange={(e) => updateData('startDate', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Fecha Fin <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <IconCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        type="date"
                                                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border outline-none font-medium text-slate-700 shadow-sm ${errors.endDate ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                        value={formData.endDate}
                                                        onChange={(e) => updateData('endDate', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {(errors.startDate || errors.endDate) && (
                                            <span className="text-xs text-red-500 flex items-center gap-1"><IconAlertCircle size={12} /> Selecciona fechas válidas</span>
                                        )}
                                        {totalDays > 0 && (
                                            <div className="flex justify-between items-center bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl text-sm font-medium">
                                                <span>Duración del alquiler:</span>
                                                <span className="font-bold">{totalDays} días</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Availability / Equipment Selection */}
                                    <div className="pt-3 border-t border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-between">
                                            Equipos Disponibles
                                            {/* Just a visual indicator that availability is checked */}
                                            {isCheckingAvailability ? (
                                                <span className="text-[10px] uppercase bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold animate-pulse">Verificando...</span>
                                            ) : (formData.startDate && formData.endDate && (
                                                <span className="text-[10px] uppercase bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Verificado</span>
                                            ))}
                                        </h4>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'z6', name: 'Mindray Z6', price: PRICES.z6, img: '/images/z6/z6-abierto-izquierda.webp', desc: 'Ideal Obstetricia' },
                                                { id: 'z60', name: 'Mindray Z60', price: PRICES.z60, img: '/images/z60/z-60-abierto-izquierda.webp', badge: 'Popular', desc: 'Calidad Superior' }
                                            ].map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`relative p-3 rounded-[20px] border-2 transition-all duration-300 ${formData.quantities[item.id as 'z6' | 'z60'] > 0
                                                        ? 'border-blue-500 bg-gradient-to-b from-blue-50/80 to-white shadow-lg'
                                                        : 'border-slate-100 bg-white hover:border-blue-200'
                                                        }`}
                                                >
                                                    {item.badge && (
                                                        <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-[18px] shadow-sm">{item.badge}</span>
                                                    )}

                                                    <div className="flex items-start gap-3 mb-3">
                                                        <div className="w-16 h-16 relative bg-slate-50 rounded-lg p-1 border border-slate-100 flex-shrink-0">
                                                            <Image src={item.img} alt={item.name} fill className="object-contain p-1" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-900 leading-tight text-sm">{item.name}</h4>
                                                            <p className="text-[10px] text-slate-500 mb-0.5">{item.desc}</p>
                                                            <div className="text-blue-700 font-bold text-sm">
                                                                ${item.price.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Counter UI */}
                                                    <div className="flex items-center justify-between bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                                                        <button
                                                            onClick={() => updateQuantity(item.id as 'z6' | 'z60', -1)}
                                                            className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${formData.quantities[item.id as 'z6' | 'z60'] > 0 ? 'bg-white text-slate-700 shadow-sm hover:text-blue-600' : 'text-slate-300 cursor-not-allowed'}`}
                                                            disabled={formData.quantities[item.id as 'z6' | 'z60'] === 0}
                                                        >
                                                            <IconMinus size={14} stroke={3} />
                                                        </button>

                                                        <span className="font-bold text-slate-900 w-6 text-center text-sm">
                                                            {formData.quantities[item.id as 'z6' | 'z60']}
                                                        </span>

                                                        <button
                                                            onClick={() => updateQuantity(item.id as 'z6' | 'z60', 1)}
                                                            className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${formData.quantities[item.id as 'z6' | 'z60'] < maxAvailability[item.id as 'z6' | 'z60'] ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                                                            disabled={formData.quantities[item.id as 'z6' | 'z60'] >= maxAvailability[item.id as 'z6' | 'z60']}
                                                        >
                                                            <IconPlus size={14} stroke={3} />
                                                        </button>
                                                    </div>

                                                    {availabilitySuggestions[item.id as 'z6' | 'z60'] && (
                                                        <div className="mt-2 text-[10px] text-amber-600 font-medium bg-amber-50 p-1.5 rounded-lg border border-amber-100 flex items-start gap-1">
                                                            <IconCalendar size={12} className="flex-shrink-0 mt-0.5" />
                                                            <span>
                                                                No disponible. Próxima: <strong className="text-amber-700">{availabilitySuggestions[item.id as 'z6' | 'z60']}</strong>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {errors.quantities && <span className="text-xs text-red-500 flex items-center mt-2 gap-1"><IconAlertCircle size={12} /> {errors.quantities}</span>}
                                    </div>

                                    {/* Cart Option */}
                                    <div className={`p-3 rounded-2xl border transition-colors ${formData.includeCart ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                                                <Image src="/images/cart_thumbnail.png" alt="Carrito" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">Incluir Base Rodable</h4>
                                                        <p className="text-slate-500 text-[10px]">Facilita el transporte</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold text-slate-900 text-sm">+${CART_COST.toLocaleString()}</div>
                                                        <label className="relative inline-flex items-center cursor-pointer mt-0.5">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={formData.includeCart}
                                                                onChange={(e) => updateData('includeCart', e.target.checked)}
                                                            />
                                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Footer */}
                                    <div className="bg-slate-900 text-white p-4 rounded-[20px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="relative z-10">
                                            <p className="text-slate-400 text-xs font-medium mb-1">Total Estimado</p>
                                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                                ${getTotalPrice().toLocaleString()}
                                            </div>
                                            <p className="text-[11px] text-blue-300/70 font-medium mt-1">*Incluye costo de envío*</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end relative z-10">
                                            <div className="text-xs text-slate-400 mb-1">
                                                {formData.quantities.z6 + formData.quantities.z60} Equipos
                                            </div>
                                            {totalDays > 0 && <div className="text-xs text-slate-500">{totalDays} días</div>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">Información de Entrega</h3>
                                        <p className="text-slate-500 text-sm mt-1">¿Dónde te llevamos los equipos?</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Sector <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <IconMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    type="text"
                                                    className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border outline-none shadow-sm font-medium text-slate-700 ${errors.city ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                    placeholder="Ej. Laureles, Poblado..."
                                                    value={formData.city}
                                                    onChange={(e) => updateData('city', e.target.value)}
                                                />
                                            </div>
                                            {errors.city && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.city}</span>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Dirección Exacta <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none shadow-sm font-medium text-slate-700 ${errors.address ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                placeholder="Calle, Carrera, Número, Oficina..."
                                                value={formData.address}
                                                onChange={(e) => updateData('address', e.target.value)}
                                            />
                                            {errors.address && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.address}</span>}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-[20px] border border-blue-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 relative z-10 text-base">
                                            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                <IconDeviceHeartMonitor size={16} />
                                            </div>
                                            Resumen de Reserva
                                        </h4>

                                        <ul className="space-y-2 relative z-10">
                                            {/* Quantities Breakdown */}
                                            {formData.quantities.z6 > 0 && (
                                                <li className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-600">{formData.quantities.z6}x Mindray Z6</span>
                                                    <span className="font-semibold text-slate-800">${(formData.quantities.z6 * PRICES.z6 * totalDays).toLocaleString()}</span>
                                                </li>
                                            )}
                                            {formData.quantities.z60 > 0 && (
                                                <li className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-600">{formData.quantities.z60}x Mindray Z60</span>
                                                    <span className="font-semibold text-slate-800">${(formData.quantities.z60 * PRICES.z60 * totalDays).toLocaleString()}</span>
                                                </li>
                                            )}

                                            <div className="h-px bg-blue-200/50 my-2"></div>

                                            <li className="flex justify-between items-center">
                                                <span className="text-slate-500 text-sm">Días de Alquiler</span>
                                                <span className="font-bold text-slate-800">{totalDays} días</span>
                                            </li>
                                            <li className="flex justify-between items-center">
                                                <span className="text-slate-500 text-sm">Envío</span>
                                                <span className="font-bold text-slate-800">${SHIPPING_COST.toLocaleString()}</span>
                                            </li>
                                            {formData.includeCart && (
                                                <li className="flex justify-between items-center">
                                                    <span className="text-slate-500 text-sm">Base Rodable (Carrito)</span>
                                                    <span className="font-bold text-slate-800">${CART_COST.toLocaleString()}</span>
                                                </li>
                                            )}
                                            <li className="pt-4 mt-2 border-t border-blue-200/50 flex justify-between items-center">
                                                <span className="text-slate-600 font-semibold">Total a Pagar</span>
                                                <span className="text-2xl font-extrabold text-blue-600">${getTotalPrice().toLocaleString()}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12 flex flex-col items-center justify-center h-full"
                                >
                                    <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        >
                                            <IconCheck size={60} className="text-green-600" stroke={3} />
                                        </motion.div>
                                        <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">¡Solicitud Realizada!</h3>
                                    <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                                        Hemos recibido tu solicitud de reserva. Un asesor comercial se pondrá en contacto contigo al <strong className="text-slate-900">{formData.phone}</strong> para coordinar el pago y la entrega.
                                    </p>
                                    <button
                                        onClick={() => { setStep(1); setFormData(INITIAL_DATA); }}
                                        className="text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:-translate-x-1 transition-transform"><IconChevronLeft size={20} /></span> Hacer otra reserva
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Actions */}
                    {step < 4 && (
                        <div className="p-4 md:p-6 border-t border-slate-100 flex justify-between bg-slate-50 items-center">
                            {step > 1 ? (
                                <button
                                    onClick={prevStep}
                                    className="px-4 py-3 md:px-5 md:py-3 rounded-full font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base"
                                >
                                    <IconChevronLeft size={18} className="md:w-5 md:h-5" /> <span className="hidden xs:inline">Anterior</span>
                                </button>
                            ) : <div></div>}

                            <button
                                onClick={nextStep}
                                disabled={isSubmitting}
                                className={`btn-primary px-6 py-3 md:px-8 md:py-3 shadow-xl shadow-blue-500/20 hover:shadow-blue-600/30 flex items-center gap-2 text-base md:text-lg w-auto ml-auto ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {isSubmitting ? 'Procesando...' : (step === 3 ? 'Confirmar Reserva' : 'Continuar')} <IconChevronRight size={20} className="md:w-[22px]" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
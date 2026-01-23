"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconUser, IconBuildingHospital, IconAmbulance, IconCheck,
    IconChevronRight, IconChevronLeft, IconCalendar, IconMapPin,
    IconDeviceHeartMonitor, IconTruckDelivery, IconShoppingCart,
    IconAlertCircle, IconPlus, IconMinus, IconTag, IconPrinter, IconClock
} from "@tabler/icons-react";
import Image from "next/image";
import CustomDatePicker from "@/components/ui/DatePicker";

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
    includePrinter: boolean;

    // Step 3
    city: string;
    address: string;

    // Transducers (Step 2)
    selectedTransducers: string[];

    // Time Ranges (Step 2)
    deliveryTime: string;
    collectionTime: string;
}

const INITIAL_DATA: BookingData = {
    name: '', email: '', phone: '', documentNumber: '', taxId: '', clientType: '',
    startDate: '', endDate: '',
    quantities: { z6: 0, z60: 0 },
    includeCart: false,
    includePrinter: false,
    city: '', address: '',
    selectedTransducers: [],
    deliveryTime: '',
    collectionTime: ''
};

const SHIPPING_COST = 50000;
const CART_COST = 50000;
const PRINTER_COST = 120000;
import { checkAvailability, getNextAvailableDate } from "@/lib/availability";

const PRICES = {
    z6: 350000,
    z60: 550000
};

export default function BookingWizard() {
    const router = useRouter();
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
            const totalPrice = getTotalPrice();

            // Send to Webhook
            const webhookUrl = "https://n8n.srv1054162.hstgr.cloud/webhook/20114322-9cd8-4eea-91c4-3d8ff32a4c71";

            // Generate Equipment Summary
            const summaryParts = [];
            if (formData.quantities.z60 > 0) {
                summaryParts.push(`ECOGRAFO Z60${formData.includeCart ? ' CON CARRITO' : ''}`);
            }
            if (formData.quantities.z6 > 0) {
                summaryParts.push(`ECOGRAFO Z6${formData.includeCart ? ' CON CARRITO' : ''}`);
            }
            if (formData.includePrinter) {
                summaryParts.push('IMPRESORA');
            }
            if (formData.selectedTransducers?.length > 0) {
                summaryParts.push(`TRANSDUCTORES: ${formData.selectedTransducers.join(', ')}`);
            }
            if (formData.deliveryTime) {
                summaryParts.push(`ENTREGA: ${formData.deliveryTime}`);
            }
            if (formData.collectionTime) {
                summaryParts.push(`RECOGIDA: ${formData.collectionTime}`);
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
                total_days: totalDays,
                quantity_z6: formData.quantities.z6,
                quantity_z60: formData.quantities.z60,
                selected_transducers: formData.selectedTransducers || [],
                equipment_summary: equipmentSummary,
                include_cart: formData.includeCart,
                include_printer: formData.includePrinter,
                delivery_time: formData.deliveryTime,
                collection_time: formData.collectionTime,
                total_price: totalPrice,
                status: 'pending_delivery',
                created_at: new Date().toISOString()
            };

            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Re-estableciendo el envío de correo con diagnóstico detallado
            try {
                const emailResponse = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!emailResponse.ok) {
                    const errorDetails = await emailResponse.json();
                    console.error("DEBUG - Email Error:", JSON.stringify(errorDetails, null, 2));
                    alert(`⚠️ Error al enviar correo: ${errorDetails.error || 'Error desconocido'}\n\nRevisa la configuración de Hostinger.`);
                }
            } catch (emailErr) {
                console.error("Critical error calling email API:", emailErr);
                alert("❌ Error crítico al intentar conectar con el servicio de correos.");
            }

            return true;

        } catch (err) {
            console.error("Error in saveBooking:", err);
            // Even if webhook fails, we return true to allow redirection if that's the desired UX,
            // but usually we want to know if it failed.
            // Given the instruction "solo debe enviar y redireccionar", I'll allow the redirect.
            return true;
        } finally {
            setIsSubmitting(false);
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

    const toggleTransducer = (name: string) => {
        setFormData(prev => {
            const current = prev.selectedTransducers || [];
            const updated = current.includes(name)
                ? current.filter(t => t !== name)
                : [...current, name];
            return { ...prev, selectedTransducers: updated };
        });
        if (errors.transducers) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.transducers;
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
            // RUT/NIT no obligatorio según requerimiento
            // if (!formData.taxId.trim()) newErrors.taxId = formData.clientType === 'clinica' ? "El NIT es obligatorio" : "El RUT es obligatorio";
            if (!formData.clientType) newErrors.clientType = "Selecciona un tipo de cliente";
        } else if (currentStep === 2) {
            const today = new Date().toISOString().split('T')[0];
            if (!formData.startDate) {
                newErrors.startDate = "Fecha de inicio requerida";
            } else if (formData.startDate < today) {
                newErrors.startDate = "La fecha no puede ser anterior a hoy";
            }

            if (!formData.endDate) {
                newErrors.endDate = "Fecha de fin requerida";
            } else if (formData.endDate < formData.startDate) {
                newErrors.endDate = "La fecha de fin debe ser posterior a la de inicio";
            }

            if (!formData.deliveryTime) newErrors.deliveryTime = "Horario de entrega requerido";
            if (!formData.collectionTime) newErrors.collectionTime = "Horario de recogida requerido";

            const totalUnits = formData.quantities.z6 + formData.quantities.z60;
            if (totalUnits === 0) newErrors.quantities = "Selecciona al menos un equipo";

            if (totalUnits > 0 && (formData.selectedTransducers || []).length === 0) {
                newErrors.transducers = "Selecciona al menos un transductor";
            }
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
                    router.push('/gracias');
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
        // Let's keep it flat: "Base Rodable" = 50k total (maybe it's a rental fee per reservation). 
        // Actually, usually it's per unit. Let's make it smarter: If carts selected, add 50k * total units? 
        // Returning to original logic: it was a toggle. Let's keep it simple: Fixed cost for "Service Cart/Stand".
        const cartTotal = formData.includeCart ? CART_COST : 0;
        const printerTotal = formData.includePrinter ? PRINTER_COST : 0;

        return subtotal + SHIPPING_COST + cartTotal + printerTotal;
    };

    return (
        <section className="py-10 md:py-16 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden" id="reservar">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-8" data-aos="fade-up">
                    <span className="block text-xs uppercase tracking-[0.2em] text-blue-200 font-bold mb-2">RESERVA FÁCIL</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Personaliza tu <span className="text-blue-400">solución</span>
                    </h2>
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
                                    <h4 className="font-bold text-emerald-900 leading-tight text-sm">¡10% de descuento en tu primera reserva!</h4>
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
                                        <h3 className="text-2xl font-bold text-slate-900">Información de contacto</h3>
                                        <p className="text-slate-500 text-sm mt-1">Todos los campos son obligatorios</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Nombre completo <span className="text-red-500">*</span></label>
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
                                            <label className="text-sm font-bold text-slate-700 ml-1">Correo electrónico <span className="text-red-500">*</span></label>
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
                                            <label className="text-sm font-bold text-slate-700 ml-1">N° de documento <span className="text-red-500">*</span></label>
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
                                                {formData.clientType === 'clinica' ? 'NIT ' : 'RUT'}
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.taxId ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder={formData.clientType === 'clinica' ? 'Agregar para la facturacion electronica' : 'Agregar para la facturacion electronica'}
                                                value={formData.taxId}
                                                onChange={(e) => updateData('taxId', e.target.value)}
                                            />
                                            {errors.taxId && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.taxId}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Tipo de cliente <span className="text-red-500">*</span></label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'medico', label: 'Médico indep.', icon: IconUser },
                                                { id: 'clinica', label: 'Clínica / IPS', icon: IconBuildingHospital },
                                                { id: 'movil', label: 'Servicio móvil', icon: IconAmbulance },
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => updateData('clientType', type.id as any)}
                                                    aria-label={`Seleccionar tipo de cliente: ${type.label}`}
                                                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${formData.clientType === type.id
                                                        ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-md scale-[1.02]'
                                                        : errors.clientType ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className={`p-3 rounded-full ${formData.clientType === type.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                                        <type.icon size={24} />
                                                    </div>
                                                    <span className="font-bold text-sm leading-tight">{type.label}</span>
                                                    <span className={`text-[10px] md:text-[11px] leading-tight opacity-100 ${formData.clientType === type.id ? 'text-blue-600' : 'text-slate-500'}`}>
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
                                        <h3 className="text-2xl font-bold text-slate-900">Agenda tu reserva</h3>
                                        <p className="text-slate-500 text-sm mt-1">Selecciona las fechas y horarios para la entrega y recogida.</p>
                                    </div>

                                    {/* Dates & Times Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-5 rounded-[24px] border border-slate-100">
                                        {/* Start Date & Time */}
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <CustomDatePicker
                                                    label="Fecha de entrega"
                                                    value={formData.startDate}
                                                    onChange={(val) => updateData('startDate', val)}
                                                    error={errors.startDate}
                                                    minDate={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Horario de entrega <span className="text-red-500">*</span></label>
                                                <div className="relative group">
                                                    <IconClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                                    <select
                                                        className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white border outline-none font-medium text-slate-700 shadow-sm transition-all appearance-none ${errors.deliveryTime ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                        value={formData.deliveryTime}
                                                        onChange={(e) => updateData('deliveryTime', e.target.value)}
                                                    >
                                                        <option value="">Selecciona horario</option>
                                                        <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
                                                        <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                                                        <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <IconChevronRight size={16} className="rotate-90" />
                                                    </div>
                                                </div>
                                                {errors.deliveryTime && <p className="text-[10px] text-red-500 ml-1">{errors.deliveryTime}</p>}
                                            </div>
                                        </div>

                                        {/* End Date & Time */}
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <CustomDatePicker
                                                    label="Fecha de recogida"
                                                    value={formData.endDate}
                                                    onChange={(val) => updateData('endDate', val)}
                                                    error={errors.endDate}
                                                    minDate={formData.startDate || new Date().toISOString().split('T')[0]}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Horario de recogida <span className="text-red-500">*</span></label>
                                                <div className="relative group">
                                                    <IconClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                                    <select
                                                        className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white border outline-none font-medium text-slate-700 shadow-sm transition-all appearance-none ${errors.collectionTime ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                        value={formData.collectionTime}
                                                        onChange={(e) => updateData('collectionTime', e.target.value)}
                                                    >
                                                        <option value="">Selecciona horario</option>
                                                        <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                                                        <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <IconChevronRight size={16} className="rotate-90" />
                                                    </div>
                                                </div>
                                                {errors.collectionTime && <p className="text-[10px] text-red-500 ml-1">{errors.collectionTime}</p>}
                                            </div>
                                        </div>

                                        {totalDays > 0 && (
                                            <div className="md:col-span-2 flex justify-between items-center bg-blue-600/5 text-blue-700 px-4 py-2.5 rounded-2xl text-sm font-bold border border-blue-100/50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                                    <span>Duración total del servicio:</span>
                                                </div>
                                                <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-xs shadow-sm">{totalDays} {totalDays === 1 ? 'Día' : 'Días'}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Availability / Equipment Selection */}
                                    <div className="pt-2">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center justify-between">
                                            Equipos disponibles
                                            {isCheckingAvailability ? (
                                                <span className="text-[10px] uppercase bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold animate-pulse">Verificando...</span>
                                            ) : (formData.startDate && formData.endDate && (
                                                <span className="text-[10px] uppercase bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">Stock verificado</span>
                                            ))}
                                        </h4>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'z6', name: 'Mindray Z6', price: PRICES.z6, img: '/images/z6/z6-abierto-izquierda.webp', desc: 'Ideal obstetricia' },
                                                { id: 'z60', name: 'Mindray Z60', price: PRICES.z60, img: '/images/z60/z-60-abierto-izquierda.webp', badge: 'Más popular', desc: 'Calidad superior' }
                                            ].map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`relative p-4 rounded-[28px] border-2 transition-all duration-300 ${formData.quantities[item.id as 'z6' | 'z60'] > 0
                                                        ? 'border-blue-500 bg-white shadow-xl shadow-blue-500/5 translate-y-[-2px]'
                                                        : 'border-slate-100 bg-slate-50/30 hover:border-slate-200'
                                                        }`}
                                                >
                                                    {item.badge && (
                                                        <span className="absolute -top-2 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">{item.badge}</span>
                                                    )}

                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="w-20 h-20 relative bg-white rounded-2xl p-2 border border-slate-100 flex-shrink-0 shadow-sm">
                                                            <Image src={item.img} alt={item.name} fill className="object-contain p-1" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-900 leading-tight">{item.name}</h4>
                                                            <p className="text-[11px] text-slate-500 mb-1">{item.desc}</p>
                                                            <div className="inline-flex items-center gap-1.5 text-blue-600 font-extrabold text-lg">
                                                                <span className="text-sm font-medium">$</span>
                                                                {item.price.toLocaleString()}
                                                                <span className="text-[10px] text-slate-400 font-medium ml-1">/ día</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-slate-100 shadow-inner">
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); updateQuantity(item.id as 'z6' | 'z60', -1); }}
                                                            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${formData.quantities[item.id as 'z6' | 'z60'] > 0 ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'text-slate-200 cursor-not-allowed'}`}
                                                            disabled={formData.quantities[item.id as 'z6' | 'z60'] === 0}
                                                        >
                                                            <IconMinus size={16} stroke={3} />
                                                        </button>

                                                        <div className="flex flex-col items-center">
                                                            <span className="font-extrabold text-slate-900 text-base">
                                                                {formData.quantities[item.id as 'z6' | 'z60']}
                                                            </span>
                                                            <span className="text-[8px] uppercase font-bold text-slate-400 tracking-tighter">Unidades</span>
                                                        </div>

                                                        <button
                                                            onClick={(e) => { e.preventDefault(); updateQuantity(item.id as 'z6' | 'z60', 1); }}
                                                            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${formData.quantities[item.id as 'z6' | 'z60'] < maxAvailability[item.id as 'z6' | 'z60'] ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                                                            disabled={formData.quantities[item.id as 'z6' | 'z60'] >= maxAvailability[item.id as 'z6' | 'z60']}
                                                        >
                                                            <IconPlus size={16} stroke={3} />
                                                        </button>
                                                    </div>

                                                    {availabilitySuggestions[item.id as 'z6' | 'z60'] && (
                                                        <div className="mt-3 text-[10px] text-amber-600 font-bold bg-amber-50 p-2 rounded-xl border border-amber-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                                                            <IconCalendar size={14} className="flex-shrink-0" />
                                                            <span>
                                                                Sin stock. Próxima fecha disponible: <strong className="text-amber-800 underline">{availabilitySuggestions[item.id as 'z6' | 'z60']}</strong>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {errors.quantities && <span className="text-xs text-red-500 flex items-center mt-2 gap-1"><IconAlertCircle size={12} /> {errors.quantities}</span>}
                                    </div>

                                    {/* Transductors Selection */}
                                    <div className="pt-2">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center justify-between">
                                            Selección de transductores
                                            <span className="text-[10px] uppercase bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Puedes elegir varios</span>
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {[
                                                { id: 'Transvaginal', label: 'Transvaginal', desc: 'Ginecología/obst.' },
                                                { id: 'Convexo', label: 'Convexo', desc: 'Abdominal/general' },
                                                { id: 'Lineal', label: 'Lineal', desc: 'Pequeñas partes/vasc.' }
                                            ].map((t) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => toggleTransducer(t.id)}
                                                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${(formData.selectedTransducers || []).includes(t.id)
                                                        ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-md ring-4 ring-blue-500/5'
                                                        : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-bold text-sm tracking-tight">{t.label}</span>
                                                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${(formData.selectedTransducers || []).includes(t.id) ? 'border-blue-500 bg-blue-500 shadow-sm' : 'border-slate-200 bg-white'}`}>
                                                                {(formData.selectedTransducers || []).includes(t.id) && <IconCheck size={12} className="text-white" stroke={4} />}
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] leading-tight opacity-70 font-medium">{t.desc}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.transducers && <span className="text-xs text-red-500 flex items-center mt-2 gap-1"><IconAlertCircle size={12} /> {errors.transducers}</span>}
                                    </div>

                                    {/* Extras Section */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Cart Option */}
                                        <div className={`p-3 rounded-2xl border transition-colors ${formData.includeCart ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                                                    <Image src="/images/cart_thumbnail.webp" alt="Carrito" fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 text-sm">Incluir base rodable</h4>
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
                                                                    aria-label="Incluir base rodable"
                                                                />
                                                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Printer Option */}
                                        <div className={`p-3 rounded-2xl border transition-colors ${formData.includePrinter ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                                                    <Image src="/images/printer_sony.webp" alt="Impresora Sony" fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 text-sm">Incluir impresora</h4>
                                                            <p className="text-slate-500 text-[10px]"></p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-slate-900 text-sm">+${PRINTER_COST.toLocaleString()}</div>
                                                            <label className="relative inline-flex items-center cursor-pointer mt-0.5">
                                                                <input
                                                                    type="checkbox"
                                                                    className="sr-only peer"
                                                                    checked={formData.includePrinter}
                                                                    onChange={(e) => updateData('includePrinter', e.target.checked)}
                                                                    aria-label="Incluir impresora"
                                                                />
                                                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Footer */}
                                    <div className="bg-slate-900 text-white p-4 rounded-[20px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="relative z-10">
                                            <p className="text-slate-500 text-xs font-medium mb-1">Total estimado</p>
                                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                                ${getTotalPrice().toLocaleString()}
                                            </div>
                                            <p className="text-[11px] text-blue-300/70 font-medium mt-1">*Costo de envío y recogida $50.000*</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end relative z-10">
                                            <div className="text-xs text-slate-500 mb-1">
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
                                        <h3 className="text-2xl font-bold text-slate-900">Información de entrega</h3>
                                        <p className="text-slate-500 text-sm mt-1">¿Dónde te llevamos los equipos?</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Sector <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <IconMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    type="text"
                                                    className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border outline-none shadow-sm font-medium text-slate-700 ${errors.city ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                    placeholder="Ej. Laureles, Poblado..."
                                                    value={formData.city}
                                                    onChange={(e) => updateData('city', e.target.value)}
                                                    aria-label="Sector de entrega"
                                                />
                                            </div>
                                            {errors.city && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.city}</span>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Dirección exacta <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none shadow-sm font-medium text-slate-700 ${errors.address ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                placeholder="Calle, Carrera, Número, Oficina..."
                                                value={formData.address}
                                                onChange={(e) => updateData('address', e.target.value)}
                                                aria-label="Dirección exacta de entrega"
                                            />
                                            {errors.address && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.address}</span>}
                                        </div>

                                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                                            <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm flex-shrink-0">
                                                <IconClock size={20} stroke={2} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-blue-900">Compromiso de puntualidad</h4>
                                                <p className="text-xs text-blue-700/80 leading-relaxed font-medium">
                                                    Respetamos estrictamente los horarios de entrega y recogida seleccionados para garantizar el mejor servicio.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-[20px] border border-blue-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 relative z-10 text-base">
                                            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                <IconDeviceHeartMonitor size={16} />
                                            </div>
                                            Resumen de reserva
                                        </h3>

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

                                            {formData.selectedTransducers?.length > 0 && (
                                                <li className="flex flex-col gap-1 py-1">
                                                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Transductor incluido</span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {formData.selectedTransducers.map(t => (
                                                            <span key={t} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </li>
                                            )}

                                            <div className="h-px bg-blue-200/50 my-2"></div>

                                            <li className="flex justify-between items-center">
                                                <span className="text-slate-500 text-sm">Días de alquiler</span>
                                                <span className="font-bold text-slate-800">{totalDays} días</span>
                                            </li>
                                            <li className="flex justify-between items-center">
                                                <span className="text-slate-500 text-sm">Envío</span>
                                                <span className="font-bold text-slate-800">${SHIPPING_COST.toLocaleString()}</span>
                                            </li>
                                            {formData.includeCart && (
                                                <li className="flex justify-between items-center">
                                                    <span className="text-slate-500 text-sm">Base rodable (carrito)</span>
                                                    <span className="font-bold text-slate-800">${CART_COST.toLocaleString()}</span>
                                                </li>
                                            )}
                                            {formData.includePrinter && (
                                                <li className="flex justify-between items-center">
                                                    <span className="text-slate-500 text-sm">Impresora Sony BP</span>
                                                    <span className="font-bold text-slate-800">${PRINTER_COST.toLocaleString()}</span>
                                                </li>
                                            )}
                                            <li className="pt-4 mt-2 border-t border-blue-200/50 flex justify-between items-center">
                                                <span className="text-slate-600 font-semibold">Total a pagar</span>
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
                                    <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">¡Solicitud realizada!</h3>
                                    <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                                        Hemos recibido tu solicitud de reserva. Un asesor comercial se pondrá en contacto contigo al <strong className="text-slate-900">{formData.phone}</strong> para coordinar el pago y la entrega.
                                    </p>
                                    <button
                                        onClick={() => { setStep(1); setFormData(INITIAL_DATA); }}
                                        className="text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2 group"
                                        aria-label="Hacer otra reserva"
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
                                {isSubmitting ? 'Procesando...' : (step === 3 ? 'Confirmar reserva' : 'Continuar')} <IconChevronRight size={20} className="md:w-[22px]" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
}
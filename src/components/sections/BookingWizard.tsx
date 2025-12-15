"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconUser, IconBuildingHospital, IconAmbulance, IconCheck, IconChevronRight, IconChevronLeft, IconCalendar, IconMapPin, IconDeviceHeartMonitor, IconTruckDelivery, IconShoppingCart, IconAlertCircle } from "@tabler/icons-react";
import Image from "next/image";

type BookingStep = 1 | 2 | 3 | 4;

interface BookingData {
    // Step 1
    name: string;
    email: string;
    phone: string;
    clientType: 'medico' | 'clinica' | 'movil' | '';

    // Step 2
    equipment: 'z6' | 'z60' | '';
    includeCart: boolean;
    startDate: string;
    endDate: string;

    // Step 3
    city: string;
    address: string;
}

const INITIAL_DATA: BookingData = {
    name: '', email: '', phone: '', clientType: '',
    equipment: '', includeCart: false, startDate: '', endDate: '',
    city: '', address: ''
};

const SHIPPING_COST = 20000;
const CART_COST = 50000;

export default function BookingWizard() {
    const [step, setStep] = useState<BookingStep>(1);
    const [formData, setFormData] = useState<BookingData>(INITIAL_DATA);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateData = (field: keyof BookingData, value: string | boolean) => {
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
            if (!formData.clientType) newErrors.clientType = "Selecciona un tipo de cliente";
        } else if (currentStep === 2) {
            if (!formData.equipment) newErrors.equipment = "Selecciona un equipo";
            if (!formData.startDate) newErrors.startDate = "Fecha de inicio requerida";
            if (!formData.endDate) newErrors.endDate = "Fecha de fin requerida";
        } else if (currentStep === 3) {
            if (!formData.city.trim()) newErrors.city = "La ciudad es obligatoria";
            if (!formData.address.trim()) newErrors.address = "La dirección es obligatoria";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(prev => Math.min(prev + 1, 4) as BookingStep);
        }
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as BookingStep);

    // Pricing Logic
    const getEquipmentPrice = () => {
        if (!formData.equipment) return 0;
        return formData.equipment === 'z6' ? 350000 : 380000;
    };

    const getTotalPrice = () => {
        const dailyRate = getEquipmentPrice();
        const days = totalDays > 0 ? totalDays : 1;
        const subtotal = dailyRate * days;
        const cartTotal = formData.includeCart ? CART_COST : 0;
        return subtotal + SHIPPING_COST + cartTotal;
    };

    return (
        <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden" id="reservar">
            {/* Background Decorations matching Landing Page */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <span className="block text-xs uppercase tracking-[0.2em] text-blue-200 font-bold mb-3">RESERVA FÁCIL</span>
                    <h2 className="text-4xl font-bold mb-4 text-white">Reserva tu Equipo <span className="text-blue-100">en Minutos</span></h2>
                    <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">Proceso 100% digital. Sin papeleos innecesarios. Recibe tu ecógrafo en 48 horas.</p>
                </div>

                {/* Wizard Component - Opaque White Card */}
                <div className="max-w-4xl mx-auto bg-white overflow-hidden shadow-2xl rounded-[30px] border border-slate-100">

                    {/* Progress Bar */}
                    <div className="border-b border-slate-100 p-8 bg-white">
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
                        <div className="flex justify-between max-w-2xl mx-auto mt-3 text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
                            <span>Datos</span>
                            <span>Equipo</span>
                            <span>Entrega</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">Información de Contacto</h3>
                                        <p className="text-slate-500 text-sm mt-1">Todos los campos son obligatorios</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Nombre Completo <span className="text-red-500">*</span></label>
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    className={`w-full px-5 py-4 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.name ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 group-hover:border-blue-300'}`}
                                                    placeholder="Ej. Dr. Alejandro Gómez"
                                                    value={formData.name}
                                                    onChange={(e) => updateData('name', e.target.value)}
                                                />
                                                {errors.name && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.name}</span>}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Correo Electrónico <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                className={`w-full px-5 py-4 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.email ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder="doctor@ejemplo.com"
                                                value={formData.email}
                                                onChange={(e) => updateData('email', e.target.value)}
                                            />
                                            {errors.email && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.email}</span>}
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Teléfono / WhatsApp <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                className={`w-full px-5 py-4 rounded-2xl bg-white border outline-none transition-all font-medium text-slate-700 shadow-sm ${errors.phone ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300'}`}
                                                placeholder="+57 300 123 4567"
                                                value={formData.phone}
                                                onChange={(e) => updateData('phone', e.target.value)}
                                            />
                                            {errors.phone && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.phone}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Tipo de Cliente <span className="text-red-500">*</span></label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: 'medico', label: 'Médico Indep.', icon: IconUser },
                                                { id: 'clinica', label: 'Clínica / IPS', icon: IconBuildingHospital },
                                                { id: 'movil', label: 'Servicio Móvil', icon: IconAmbulance },
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => updateData('clientType', type.id as any)}
                                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${formData.clientType === type.id
                                                        ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-md scale-[1.02]'
                                                        : errors.clientType ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className={`p-3 rounded-full ${formData.clientType === type.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                                        <type.icon size={24} />
                                                    </div>
                                                    <span className="font-bold text-sm">{type.label}</span>
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
                                    className="space-y-8"
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">Selección de Equipo</h3>
                                        <p className="text-slate-500 text-sm mt-1">Todos los equipos son portátiles por defecto</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { id: 'z6', name: 'Mindray Z6', price: 350000, img: '/images/z6/z6-abierto-izquierda.webp', desc: 'Ideal Obstetricia' },
                                            { id: 'z60', name: 'Mindray Z60', price: 380000, img: '/images/z60/z-60-abierto-izquierda.webp', badge: 'Popular', desc: 'Calidad Superior' }
                                        ].map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => updateData('equipment', item.id as any)}
                                                className={`relative p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-300 group ${formData.equipment === item.id
                                                    ? 'border-blue-500 bg-gradient-to-b from-blue-50/80 to-white shadow-xl scale-[1.02]'
                                                    : errors.equipment ? 'border-red-300 bg-red-50/30' : 'border-slate-100 bg-white hover:border-blue-300 hover:shadow-lg'
                                                    }`}
                                            >
                                                {item.badge && (
                                                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-[22px] shadow-sm">{item.badge}</span>
                                                )}
                                                <div className="flex items-center gap-5">
                                                    <div className="w-24 h-24 relative bg-slate-50 rounded-xl p-2 border border-slate-100 group-hover:scale-105 transition-transform">
                                                        <Image src={item.img} alt={item.name} fill className="object-contain p-1" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                                                        <p className="text-sm text-slate-500 mb-2">{item.desc}</p>
                                                        <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                                                            ${item.price.toLocaleString()}<span className="text-[10px] font-normal opacity-70">/día</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Checkmark circle if selected */}
                                                {formData.equipment === item.id && (
                                                    <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                                        <IconCheck size={16} stroke={3} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.equipment && <span className="text-xs text-red-500 flex items-center justify-center -mt-4 gap-1"><IconAlertCircle size={12} /> {errors.equipment}</span>}

                                    {/* Cart Option */}
                                    <div className={`p-4 rounded-2xl border transition-colors ${formData.includeCart ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                                                <Image src="/images/cart_thumbnail.png" alt="Carrito" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-slate-900">Incluir Base Rodable (Carrito)</h4>
                                                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">OPCIONAL</span>
                                                </div>
                                                <p className="text-slate-500 text-xs mt-1">Facilita el transporte intrahospitalario del equipo.</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900">+${CART_COST.toLocaleString()}</div>
                                                <label className="relative inline-flex items-center cursor-pointer mt-1">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={formData.includeCart}
                                                        onChange={(e) => updateData('includeCart', e.target.checked)}
                                                    />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Fechas de Alquiler <span className="text-red-500">*</span></label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative">
                                                <IconCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    type="date"
                                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white border outline-none font-medium text-slate-700 shadow-sm ${errors.startDate ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                    onChange={(e) => updateData('startDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="relative">
                                                <IconCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    type="date"
                                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white border outline-none font-medium text-slate-700 shadow-sm ${errors.endDate ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                    onChange={(e) => updateData('endDate', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {totalDays > 0 && (
                                            <p className="text-sm text-green-600 font-medium text-right px-2">
                                                Periodo seleccionado: {totalDays} {totalDays === 1 ? 'día' : 'días'}
                                            </p>
                                        )}
                                        {(errors.startDate || errors.endDate) && (
                                            <span className="text-xs text-red-500 flex items-center justify-end gap-1"><IconAlertCircle size={12} /> Selecciona fechas válidas</span>
                                        )}
                                    </div>

                                    <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="relative z-10">
                                            <p className="text-slate-400 text-sm font-medium mb-1">Total Estimado</p>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <IconTruckDelivery className="text-blue-400" size={16} />
                                                    <span className="text-xs text-slate-400">Envío ($20.000)</span>
                                                </div>
                                                {formData.includeCart && (
                                                    <div className="flex items-center gap-2">
                                                        <IconShoppingCart className="text-indigo-400" size={16} />
                                                        <span className="text-xs text-slate-400">Carrito ($50.000)</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent relative z-10">
                                            ${getTotalPrice().toLocaleString()}
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
                                    className="space-y-8"
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">Información de Entrega</h3>
                                        <p className="text-slate-500 text-sm mt-1">¿Dónde te llevamos el equipo?</p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Ciudad <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <IconMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    type="text"
                                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white border outline-none shadow-sm font-medium text-slate-700 ${errors.city ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                    placeholder="Ej. Medellín, Bogotá..."
                                                    value={formData.city}
                                                    onChange={(e) => updateData('city', e.target.value)}
                                                />
                                            </div>
                                            {errors.city && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.city}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Dirección Exacta <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                className={`w-full px-5 py-4 rounded-2xl bg-white border outline-none shadow-sm font-medium text-slate-700 ${errors.address ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                                                placeholder="Calle, Carrera, Número, Oficina..."
                                                value={formData.address}
                                                onChange={(e) => updateData('address', e.target.value)}
                                            />
                                            {errors.address && <span className="text-xs text-red-500 mt-1 flex items-center gap-1"><IconAlertCircle size={12} /> {errors.address}</span>}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 p-8 rounded-[24px] border border-blue-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                                        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-3 relative z-10 text-lg">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                <IconDeviceHeartMonitor size={18} />
                                            </div>
                                            Resumen de Reserva
                                        </h4>

                                        <ul className="space-y-4 relative z-10">
                                            <li className="flex justify-between items-center pb-4 border-b border-blue-200/50">
                                                <span className="text-slate-500 text-sm">Equipo</span>
                                                <span className="font-bold text-slate-800 uppercase bg-white px-3 py-1 rounded-md shadow-sm text-sm border border-slate-100">{formData.equipment || 'No seleccionado'}</span>
                                            </li>
                                            <li className="flex justify-between items-center pb-4 border-b border-blue-200/50">
                                                <span className="text-slate-500 text-sm">Días de Alquiler</span>
                                                <span className="font-bold text-slate-800">{totalDays} días</span>
                                            </li>
                                            <li className="flex justify-between items-center pb-4 border-b border-blue-200/50">
                                                <span className="text-slate-500 text-sm">Envío</span>
                                                <span className="font-bold text-slate-800">${SHIPPING_COST.toLocaleString()}</span>
                                            </li>
                                            {formData.includeCart && (
                                                <li className="flex justify-between items-center pb-4 border-b border-blue-200/50">
                                                    <span className="text-slate-500 text-sm">Base Rodable (Carrito)</span>
                                                    <span className="font-bold text-slate-800">${CART_COST.toLocaleString()}</span>
                                                </li>
                                            )}
                                            <li className="pt-2 flex justify-between items-center">
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
                                    <h3 className="text-4xl font-bold text-slate-900 mb-4">¡Reserva Recibida!</h3>
                                    <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                                        Un asesor comercial experto te contactará en breve al <strong className="text-slate-900">{formData.phone}</strong> para finalizar los detalles de tu {formData.equipment === 'z6' ? 'Mindray Z6' : formData.equipment === 'z60' ? 'Mindray Z60' : 'equipo'}.
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
                        <div className="p-6 md:p-8 border-t border-slate-100 flex justify-between bg-slate-50 items-center">
                            {step > 1 ? (
                                <button
                                    onClick={prevStep}
                                    className="px-4 py-3 md:px-6 md:py-4 rounded-full font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base"
                                >
                                    <IconChevronLeft size={18} className="md:w-5 md:h-5" /> <span className="hidden xs:inline">Anterior</span>
                                </button>
                            ) : <div></div>}

                            <button
                                onClick={nextStep}
                                className="btn-primary px-6 py-3 md:px-10 md:py-4 shadow-xl shadow-blue-500/20 hover:shadow-blue-600/30 flex items-center gap-2 text-base md:text-lg w-auto ml-auto"
                            >
                                {step === 3 ? 'Confirmar' : 'Continuar'} <IconChevronRight size={20} className="md:w-[22px]" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

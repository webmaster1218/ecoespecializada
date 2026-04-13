"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const BookingsCalendar = dynamic(() => import("@/components/admin/BookingsCalendar"), { ssr: false });
const AdminBookingModal = dynamic(() => import("@/components/admin/AdminBookingModal"), { ssr: false });
const StockSettingsModal = dynamic(() => import("@/components/admin/StockSettingsModal"), { ssr: false });
import Image from "next/image";
import { getTotalStock, checkAvailability } from "@/lib/availability";
import { Settings } from "lucide-react";

export default function CalendarPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [isBlockingMode, setIsBlockingMode] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [initialDateRange, setInitialDateRange] = useState<{ start: string, end: string } | null>(null);
    const [totalInventory, setTotalInventory] = useState({ z6: 0, z60: 0, m7: 0 });
    const [availableToday, setAvailableToday] = useState({ z6: 0, z60: 0, m7: 0 });

    const fetchInventory = async () => {
        const stock = await getTotalStock();
        setTotalInventory(stock);
        const today = new Date().toISOString().split('T')[0];
        const available = await checkAvailability(today, today);
        setAvailableToday({ z6: available.z6, z60: available.z60, m7: available.m7 });
    };

    useEffect(() => {
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
            setIsLoading(false);
            fetchInventory();
        } else {
            router.push("/login");
        }
    }, [router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium font-sans">Verificando sesión...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 md:px-8 md:py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="relative w-32 h-10 overflow-hidden">
                        <Image
                            src="/images/logo/logo_alquilerdeecografos.webp"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm md:text-base font-bold text-slate-900 leading-tight">
                            Panel Administrativo
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            Alquiler de Ecógrafos
                        </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowStockModal(true)}
                        className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-bold px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all border border-slate-200 flex items-center gap-2 text-xs md:text-sm"
                    >
                        <Settings size={16} />
                        <span className="hidden md:inline">Ajustar Stock</span>
                    </button>
                    <button
                        onClick={() => { setSelectedBooking(null); setInitialDateRange(null); setIsBlockingMode(true); setShowModal(true); }}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all shadow-md flex items-center gap-2 text-xs md:text-sm"
                    >
                        <span className="hidden md:inline">Bloquear Fechas</span><span className="md:hidden">Bloquear</span>
                    </button>
                    <button
                        onClick={() => { setSelectedBooking(null); setInitialDateRange(null); setIsBlockingMode(false); setShowModal(true); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 md:px-6 md:py-2.5 rounded-full transition-all shadow-lg hover:shadow-blue-600/20 flex items-center gap-2 text-xs md:text-sm"
                    >
                        <span className="text-base md:text-lg">+</span> <span className="hidden md:inline">Nueva Reserva</span><span className="md:hidden">Reserva</span>
                    </button>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("admin_auth");
                            router.push("/login");
                        }}
                        className="text-xs md:text-sm text-slate-500 hover:text-red-600 font-semibold px-2 py-2 md:px-4 hover:bg-red-50 rounded-full transition-colors flex items-center gap-1"
                    >
                        <span className="hidden md:inline">Salir</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="p-3 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Calendar Section (75%) */}
                    <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px] md:min-h-[600px] p-2 md:p-6 overflow-hidden">
                        <BookingsCalendar
                            key={showModal ? 'refresh' : 'view'}
                            onEditBooking={(booking) => {
                                setSelectedBooking(booking);
                                setInitialDateRange(null);
                                setIsBlockingMode(booking.status === 'maintenance');
                                setShowModal(true);
                            }}
                            onCreateBooking={(start, end) => {
                                setSelectedBooking(null);
                                // Format dates to YYYY-MM-DD
                                const formatDate = (d: Date) => d.toISOString().split('T')[0];
                                setInitialDateRange({ start: formatDate(start), end: formatDate(end) });
                                setIsBlockingMode(false);
                                setShowModal(true);
                            }}
                        />
                    </div>

                    {/* Sidebar Section (25%) */}
                    <div className="space-y-6">
                        {/* Legend Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                                Estados de Logística
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm ring-2 ring-amber-100"></div>
                                    <span className="text-sm font-medium text-slate-600">Pendiente de Entregar</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm ring-2 ring-emerald-100"></div>
                                    <span className="text-sm font-medium text-slate-600">Entregado (En Cliente)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm ring-2 ring-red-100"></div>
                                    <span className="text-sm font-medium text-slate-600">Pendiente por Recoger</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-slate-500 shadow-sm ring-2 ring-slate-100"></div>
                                    <span className="text-sm font-medium text-slate-600">Finalizado / Completado</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-blue-600 shadow-sm ring-2 ring-blue-100"></div>
                                    <span className="text-sm font-medium text-slate-600">Otros (Sin estado)</span>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <h3 className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                                Stock de Equipos
                            </h3>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 px-1">
                                <span>Equipo</span>
                                <div className="flex gap-4">
                                    <span>Hoy</span>
                                    <span>Total</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Mindray Z6', sub: 'Gama Media', avail: availableToday.z6, total: totalInventory.z6 },
                                    { label: 'Mindray Z60', sub: 'Gama Alta', avail: availableToday.z60, total: totalInventory.z60 },
                                    { label: 'Mindray M7', sub: 'Premium', avail: availableToday.m7, total: totalInventory.m7 },
                                ].map(({ label, sub, avail, total }) => (
                                    <div key={label} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-slate-700 text-sm">{label}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{sub}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`px-2.5 py-1 rounded-md font-black text-sm border ${
                                                avail === 0
                                                    ? 'bg-red-50 border-red-200 text-red-600'
                                                    : avail < total
                                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                            }`}>
                                                {avail}
                                            </div>
                                            <div className="bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-200 font-black text-slate-500 text-sm">
                                                {total}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>Libre</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>Parcial</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>Sin disp.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AdminBookingModal
                isOpen={showModal}
                bookingToEdit={selectedBooking}
                initialDateRange={initialDateRange}
                isBlockingMode={isBlockingMode}
                onClose={() => { setShowModal(false); setSelectedBooking(null); setInitialDateRange(null); setIsBlockingMode(false); }}
                onSuccess={() => {
                    window.location.reload();
                }}
            />

            <StockSettingsModal
                isOpen={showStockModal}
                onClose={() => setShowStockModal(false)}
                onSuccess={() => {
                    fetchInventory();
                }}
            />
        </div>
    );
}

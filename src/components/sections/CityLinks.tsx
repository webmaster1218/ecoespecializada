"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const CITIES = [
    { name: "Bogotá", href: "/colombia/bogota" },
    { name: "Medellín", href: "/colombia/medellin" },
    { name: "Cali", href: "/colombia/cali" },
    { name: "Barranquilla", href: "/colombia/barranquilla" },
    { name: "Cartagena", href: "/colombia/cartagena" },
    { name: "Bucaramanga", href: "/colombia/bucaramanga" },
    { name: "Pereira", href: "/colombia/pereira" },
    { name: "Cúcuta", href: "/colombia/cucuta" },
];

export default function CityLinks({ currentCity }: { currentCity?: string }) {
    return (
        <section className="py-12 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
                <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-6">Nuestra Cobertura Nacional</span>
                <h3 className="text-xl font-bold text-slate-900 mb-8">
                    También ofrecemos Alquiler y Venta en:
                </h3>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                    {CITIES.map((city) => (
                        city.name !== currentCity && (
                            <Link
                                key={city.name}
                                href={city.href}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 font-semibold text-sm group"
                            >
                                <MapPin size={16} className="text-blue-500 group-hover:text-white transition-colors" />
                                {city.name}
                            </Link>
                        )
                    ))}
                </div>
                <div className="mt-10">
                    <Link 
                        href="/colombia" 
                        className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                    >
                        Ver toda nuestra cobertura en Colombia →
                    </Link>
                </div>
            </div>
        </section>
    );
}

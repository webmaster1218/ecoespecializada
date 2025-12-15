"use client";

import { ScenariosSlider } from "@/components/ui/scenarios-slider";

const scenarios = [
    {
        id: 3,
        title: "Medicina Interna",
        subtitle: "Diagnóstico Abdominal",
        description: "Sondeo rápido y preciso. Identifique patologías hepáticas, renales y vesiculares en segundos con transductores convexos de alta densidad.",
        imageSrc: "/images/clinical/medicina_interna.png",
        thumbnailSrc: "/images/clinical/medicina_interna.png"
    },
    {
        id: 1,
        title: "Veterinaria",
        subtitle: "Diagnóstico Animal",
        description: "Imágenes nítidas para el cuidado de pequeñas especies. Evalúe anomalías abdominales y cardíacas en perros y gatos con nuestros equipos Mindray Vetus.",
        imageSrc: "/images/clinical/veterinaria.png",
        thumbnailSrc: "/images/clinical/veterinaria.png"
    },
    {
        id: 2,
        title: "Ginecología y Obstetricia",
        subtitle: "Salud Femenina",
        description: "Monitorización fetal detallada. Visualice el desarrollo del embarazo con claridad excepcional 3D/4D para brindar tranquilidad total.",
        imageSrc: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Cardiología",
        subtitle: "Ecocardiografía",
        description: "Análisis estructural del corazón. Modos Doppler Color y CW para visualización de flujo sanguíneo y función valvular avanzada.",
        imageSrc: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Musculoesquelético",
        subtitle: "Tejidos Blandos",
        description: "Visualización superior de tendones y nervios. Herramienta esencial para fisiatría, ortopedia y medicina deportiva.",
        imageSrc: "https://images.unsplash.com/photo-1584515933487-9d3005c010c7?q=80&w=1000&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1584515933487-9d3005c010c7?q=80&w=150&h=150&auto=format&fit=crop"
    }
];

export default function ClinicalApplications() {
    return (
        <div className="w-full bg-slate-50 py-24 lg:py-32">
            <div className="container mx-auto px-4 mb-16 text-center" data-aos="fade-up">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                    Versatilidad Clínica
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                    La mejor solución <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">del Mercado</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    Desde clínicas veterinarias en El Poblado hasta centros de radiología en Medellín. Nuestros ecógrafos Mindray se adaptan a su entorno ofreciendo diagnósticos confiables. <br />
                    <span className="text-sm font-semibold text-blue-500 mt-4 block opacity-80">*Estas son solo ALGUNAS de las especialidades que atendemos.</span>
                </p>
            </div>

            <ScenariosSlider scenarios={scenarios} className="py-0 bg-transparent mb-16" />

            <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                <a href="#reservar" className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all group text-lg">
                    Obtén la Mejor Solución del Mercado
                    <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
            </div>
        </div>
    );
}

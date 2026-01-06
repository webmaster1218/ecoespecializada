"use client";

import { ScenariosSlider } from "@/components/ui/scenarios-slider";

const scenarios = [
    {
        id: 3,
        title: "Medicina Interna",
        subtitle: "Diagnóstico abdominal",
        description: "Sondeo rápido y preciso. Identifique patologías hepáticas, renales y vesiculares en segundos con transductores convexos de alta densidad.",
        imageSrc: "/images/clinical/medicina_interna.png",
        thumbnailSrc: "/images/clinical/medicina_interna.png"
    },
    {
        id: 1,
        title: "Veterinaria",
        subtitle: "Diagnóstico animal",
        description: "Imágenes nítidas para el cuidado de pequeñas especies. Evalúe anomalías abdominales y cardíacas en perros y gatos con nuestros equipos Mindray Vetus.",
        imageSrc: "/images/clinical/veterinaria.png",
        thumbnailSrc: "/images/clinical/veterinaria.png"
    },
    {
        id: 2,
        title: "Ginecología y Obstetricia",
        subtitle: "Salud femenina",
        description: "Monitorización fetal detallada. Visualice el desarrollo del embarazo con claridad excepcional para brindar tranquilidad total.",
        imageSrc: "/images/clinical/ginecologia_v2.png",
        thumbnailSrc: "/images/clinical/ginecologia_v2.png"
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
        subtitle: "Tejidos blandos",
        description: "Visualización superior de tendones y nervios. Herramienta esencial para fisiatría, ortopedia y medicina deportiva.",
        imageSrc: "/images/clinical/msk_v2.png",
        thumbnailSrc: "/images/clinical/msk_v2.png"
    },
    {
        id: 6,
        title: "Radiología",
        subtitle: "Diagnóstico avanzado",
        description: "Diagnóstico especializado de alta resolución. Optimice el flujo de trabajo en radiología convencional y doppler avanzado con herramientas de cuantificación precisa.",
        imageSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "Cirujanos Plásticos",
        subtitle: "Guía quirúrgica",
        description: "Visualización superior para procedimientos estéticos y reconstructivos. Identifique trayectos vasculares y estructuras dérmicas con máxima seguridad.",
        imageSrc: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=150&h=150&auto=format&fit=crop"
    }
];

export default function ClinicalApplications() {
    return (
        <div className="w-full bg-slate-50 py-24 lg:py-32">
            <div className="container mx-auto px-4 mb-16 text-center" data-aos="fade-up">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                    Versatilidad clínica
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                    La mejor solución <span className="text-blue-600">del mercado</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    Desde clínicas veterinarias en El Poblado hasta centros de radiología en Medellín. Nuestros ecógrafos Mindray se adaptan a su entorno ofreciendo diagnósticos confiables. Estas son algunas de la especialidades en las que se suele usar.<br />
                </p>
            </div>

            <ScenariosSlider scenarios={scenarios} className="py-0 bg-transparent mb-16" />

            <div className="container mx-auto px-2 text-center" data-aos="fade-up">
                <a href="#reservar" className="btn-primary text-lg">
                    Obtén la mejor solución del mercado
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import Advantages from "@/components/sections/Advantages";
import ProductCatalog from "@/components/sections/ProductCatalog";
import Comparison from "@/components/sections/Comparison";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import BookingWizard from "@/components/sections/BookingWizard";
import HowItWorks from "@/components/sections/HowItWorks";
import LogoLoop from "@/components/sections/LogoLoop";
import AdditionalServices from "@/components/sections/AdditionalServices";
import ClinicalApplications from "@/components/sections/ClinicalApplications";
import AboutUs from "@/components/sections/AboutUs";
import FAQ from "@/components/sections/FAQ";
import Image from "next/image";
import CityLinks from "@/components/sections/CityLinks";

import Hero from "@/components/sections/Hero";

export const metadata: Metadata = {
    title: "Alquiler y Venta de Ecógrafos en Bucaramanga | Mindray | Santander",
    description:
        "Líderes en ALQUILER y VENTA de ecógrafos Mindray en Bucaramanga y Santander. Entrega en Floridablanca, Girón y Piedecuesta. Certificados INVIMA.",
    keywords: ["alquiler ecógrafo Bucaramanga", "venta ecógrafo Bucaramanga", "ecógrafo Mindray Bucaramanga", "equipos médicos Santander", "ecógrafo portátil Bucaramanga"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/bucaramanga" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Bucaramanga | Ecoespecializada",
        description: "Equipos Mindray certificados con entrega en Bucaramanga y todo Santander. Servicio ágil para médicos y clínicas bumanguesas.",
        url: "https://alquilerdeecografos.com/colombia/bucaramanga",
    },
};

const faqBucaramanga = [
    {
        question: "¿Hacen entrega de ecógrafos en Bucaramanga y el Área Metropolitana?",
        answer:
            "Sí, enviamos a Bucaramanga, Floridablanca, Girón y Piedecuesta. También cubrimos municipios de Santander como San Gil, Barrancabermeja y Socorro. Tiempo de entrega: 24 a 48 horas hábiles.",
    },
    {
        question: "¿Cuánto tarda el ecógrafo en llegar a la Ciudad Bonita?",
        answer:
            "Desde nuestras instalaciones en Medellín hasta Bucaramanga, el tiempo de tránsito es de 24 a 48 horas hábiles por transportadora certificada. El equipo llega listo para usar.",
    },
    {
        question: "¿Puedo alquilar un ecógrafo para eventos o jornadas médicas en Santander?",
        answer:
            "¡Claro que sí! El servicio es completamente flexible para bumangueses. Desde 1 día para jornadas o brigadas comunitarias hasta meses con tarifa preferencial. Sin permanencia mínima.",
    },
    {
        question: "¿Los equipos cumplen normativas INVIMA para operar en Santander?",
        answer:
            "Todos los ecógrafos Mindray Z6 y Z60 tienen registro sanitario INVIMA vigente y certificación de calibración, cumpliendo el 100% de las normativas para operar en cualquier departamento de Colombia.",
    },
    {
        question: "¿Tienen soporte técnico disponible para consultorios en Bucaramanga?",
        answer:
            "Contamos con soporte técnico remoto disponible todos los días. Si la falla no se resuelve remotamente, reemplazamos el equipo en el menor tiempo posible para que no pierdas tus consultas.",
    },
    {
        question: "¿Cómo solicito el servicio desde Bucaramanga?",
        answer:
            "Es muy sencillo: escríbenos por WhatsApp indicando que eres de Bucaramanga, cotizamos juntos, firmas el contrato digital y pagas de forma segura por transferencia o link. En 24-48 h tienes el equipo.",
    },
];

export default function BucaramangaPage() {
    return (
        <>
            <Hero
                badgeText="Disponibilidad inmediata — Bucaramanga"
                headline={(
                    <>
                        Alquila tu ecógrafo <br />
                        <span className="text-gradient">en Bucaramanga</span> y sigue facturando.
                    </>
                )}
                subheadline={(
                    <>
                        <strong>Alquiler y venta de ecógrafos en Bucaramanga</strong> y todo el Área Metropolitana. Entregamos en Floridablanca, Girón, Piedecuesta y toda Santander. Mindray Z6 y Z60 con certificación INVIMA en 24 a 48 horas.
                    </>
                )}
                ctaText="Cotizar para Bucaramanga"
                whatsappText="WhatsApp Bucaramanga"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Bucaramanga&type=phone_number&app_absent=0"
                imageAlt="Ecógrafo Mindray Z60 disponible en Bucaramanga"
                availabilityText="Cobertura en Bucaramanga"
                availabilitySubtext="Área Metropolitana"
            />

            <Advantages city="Bucaramanga" />

            <ProductCatalog city="Bucaramanga" />

            <BookingWizard />

            <HowItWorks />

            <ClinicalApplications city="Bucaramanga" />

            <Comparison city="Bucaramanga" />

            <AboutUs city="Bucaramanga" />

            <AdditionalServices />

            <LogoLoop />

            {/* ── FAQ LOCAL ── */}
            <section className="py-24 bg-slate-50" id="faq-bucaramanga">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Resolvemos tus dudas</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">
                            Preguntas frecuentes — <span className="text-gradient">Bucaramanga</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Todo lo que necesitas saber sobre el servicio de alquiler de ecógrafos en La Ciudad Bonita.</p>
                    </div>
                    <div className="space-y-4">
                        {faqBucaramanga.map((item, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-slate-800 hover:text-blue-600 transition-colors list-none">
                                    {item.question}
                                    <span className="ml-4 text-blue-500 group-open:rotate-180 transition-transform duration-200 text-xl leading-none">↓</span>
                                </summary>
                                <p className="px-6 pb-6 text-slate-600 leading-relaxed">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <a
                            href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20servicio%20en%20Bucaramanga&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex"
                        >
                            💬 Hablar con un asesor en Bucaramanga
                        </a>
                    </div>
                </div>
            </section>

            <CityLinks currentCity="Bucaramanga" />
            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Bucaramanga - Ecoespecializada",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/bucaramanga",
                        "url": "https://alquilerdeecografos.com/bucaramanga",
                        "telephone": "+573003608621",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Carrera 43A # 1-50",
                            "addressLocality": "Medellín",
                            "addressRegion": "Antioquia",
                            "postalCode": "050021",
                            "addressCountry": "CO"
                        },
                        "areaServed": {
                            "@type": "State",
                            "name": "Santander"
                        }
                    })
                }}
            />
        </>
    );
}

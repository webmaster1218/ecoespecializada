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
    title: "Alquiler y Venta de Ecógrafos en Barranquilla | Mindray | Costa Caribe",
    description:
        "Líderes en ALQUILER y VENTA de ecógrafos Mindray en Barranquilla y la Costa Caribe. Entrega en El Prado, Altamira y toda La Arenosa. Certificados INVIMA.",
    keywords: ["alquiler ecógrafo Barranquilla", "venta ecógrafo Barranquilla", "ecógrafo Mindray Barranquilla", "equipos médicos Costa Atlántica", "ecógrafo portátil Barranquilla"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/barranquilla" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Barranquilla | Alquiler de ecografos",
        description: "Equipos Mindray certificados con entrega en Barranquilla y toda la Costa Caribe. Servicio ágil para médicos y clínicas barranquilleras.",
        url: "https://alquilerdeecografos.com/colombia/barranquilla",
    },
};

const faqBarranquilla = [
    {
        question: "¿Hacen entrega de ecógrafos en Barranquilla y la Costa Caribe?",
        answer:
            "Claro que sí, costeño. Enviamos a toda Barranquilla — El Prado, Altamira, Villa Santos, El Centro — y también a municipios del Atlántico como Soledad, Malambo y más. Tiempo de entrega: 24 a 48 horas hábiles.",
    },
    {
        question: "¿Cuánto tarda el equipo en llegar a Barranquilla?",
        answer:
            "Desde nuestras instalaciones en Medellín, el envío a Barranquilla tarda entre 24 y 48 horas hábiles por transporte certificado. El equipo llega listo para usar, calibrado y en perfecto estado.",
    },
    {
        question: "¿Puedo alquilar un ecógrafo para una jornada o brigada en Barranquilla?",
        answer:
            "¡Por supuesto! El servicio es flexible. Desde un día para brigadas de salud o jornadas especiales hasta semanas o meses para tu consultorio. Sin contratos forzosos ni cláusulas escondidas.",
    },
    {
        question: "¿Los equipos cumplen con los requisitos del sistema de salud en la Costa?",
        answer:
            "Todos los ecógrafos Mindray Z6 y Z60 tienen registro sanitario INVIMA vigente y certificación de calibración, válidos en toda Colombia incluyendo Barranquilla y el Atlántico.",
    },
    {
        question: "¿El calor de la Costa afecta el rendimiento del equipo?",
        answer:
            "Los equipos Mindray están diseñados para funcionar en rangos de temperatura tropical. Todos salen de nuestras instalaciones con mantenimiento preventivo y verificación técnica completada.",
    },
    {
        question: "¿Qué pasa si el equipo tiene un problema durante mi consulta en Barranquilla?",
        answer:
            "Ofrecemos soporte técnico remoto disponible todos los días. En caso de falla no resuelta a distancia, coordinamos el reemplazo del equipo para que no pierdas tus consultas ni tus pacientes.",
    },
];

export default function BarranquillaPage() {
    return (
        <>
            <Hero
                badgeText="Disponibilidad inmediata — Barranquilla"
                headline={(
                    <>
                        Alquila tu ecógrafo <br />
                        <span className="text-gradient">en Barranquilla</span> y sigue facturando.
                    </>
                )}
                subheadline={(
                    <>
                        <strong>Alquiler y venta de ecógrafos en Barranquilla</strong> y toda la Costa Caribe. Equipo Mindray Z6 y Z60 certificado INVIMA. Entregamos en El Prado, Altamira, Villa Santos y el resto de La Arenosa en 24 a 48 horas.
                    </>
                )}
                ctaText="Cotizar para Barranquilla"
                whatsappText="WhatsApp Barranquilla"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Barranquilla&type=phone_number&app_absent=0"
                imageAlt="Ecógrafo Mindray Z60 disponible en Barranquilla"
                availabilityText="Cobertura en Barranquilla"
                availabilitySubtext="Costa Caribe"
            />

            <Advantages city="Barranquilla" />

            <ProductCatalog city="Barranquilla" />

            <BookingWizard />

            <HowItWorks />

            <ClinicalApplications city="Barranquilla" />

            <Comparison city="Barranquilla" />

            <AboutUs city="Barranquilla" />

            <AdditionalServices />

            <LogoLoop />

            {/* ── FAQ LOCAL ── */}
            <section className="py-24 bg-slate-50" id="faq-barranquilla">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Resolvemos tus dudas</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">
                            Preguntas frecuentes — <span className="text-gradient">Barranquilla</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Todo lo que necesitas saber sobre el servicio de alquiler de ecógrafos en La Arenosa.</p>
                    </div>
                    <div className="space-y-4">
                        {faqBarranquilla.map((item, i) => (
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
                            href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20servicio%20en%20Barranquilla&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex"
                        >
                            💬 Hablar con un asesor en Barranquilla
                        </a>
                    </div>
                </div>
            </section>

            <CityLinks currentCity="Barranquilla" />
            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Barranquilla - Alquiler de ecografos",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/barranquilla",
                        "url": "https://alquilerdeecografos.com/barranquilla",
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
                            "name": "Atlántico"
                        }
                    })
                }}
            />
        </>
    );
}

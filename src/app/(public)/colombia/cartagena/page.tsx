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
    title: "Alquiler y Venta de Ecógrafos en Cartagena | Mindray | Ciudad Heroica",
    description:
        "Líderes en ALQUILER y VENTA de ecógrafos Mindray en Cartagena de Indias y Bolívar. Entrega en Bocagrande, Manga y toda la Ciudad Heroica. Certificados INVIMA.",
    keywords: ["alquiler ecógrafo Cartagena", "venta ecógrafo Cartagena", "ecógrafo Mindray Cartagena", "equipos médicos Bolívar", "ecógrafo portátil Cartagena de Indias"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/cartagena" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Cartagena | Ecoespecializada",
        description: "Equipos Mindray certificados con entrega en Cartagena y Bolívar. Servicio ágil para médicos y clínicas cartageneras.",
        url: "https://alquilerdeecografos.com/colombia/cartagena",
    },
};

const faqCartagena = [
    {
        question: "¿Hacen entrega de ecógrafos en Cartagena y el departamento de Bolívar?",
        answer:
            "Sí, hacemos envíos a Cartagena de Indias y municipios de Bolívar. Cubrimos Bocagrande, Manga, El Cabrero, Getsemaní, Pie de la Popa y el Centro Histórico. Tiempo de entrega: 24 a 48 horas hábiles.",
    },
    {
        question: "¿Cuánto tarda el ecógrafo en llegar a Cartagena?",
        answer:
            "Desde Medellín, el tiempo de tránsito a Cartagena es de 24 a 48 horas hábiles. El equipo sale calibrado, embalado y listo para conectarse en tu consultorio al recibirlo.",
    },
    {
        question: "¿Tienen servicio para atender brigadas médicas o turismo de salud en Cartagena?",
        answer:
            "Sí, Cartagena tiene una fuerte industria de turismo médico. Manejamos alquileres desde 1 día para jornadas puntuales, brigadas o atención a pacientes internacionales. Total flexibilidad.",
    },
    {
        question: "¿Los equipos tienen registro INVIMA para operar en Cartagena?",
        answer:
            "Todos nuestros ecógrafos Mindray tienen registro sanitario INVIMA vigente y certificación de calibración, cumpliendo las normativas exigidas en todo el territorio colombiano.",
    },
    {
        question: "¿Qué pasa si el equipo tiene falla durante la consulta?",
        answer:
            "Contamos con soporte técnico remoto disponible todos los días. Si el problema requiere reemplazo físico del equipo, coordinamos el cambio en el menor tiempo posible para proteger tu agenda.",
    },
    {
        question: "¿Cómo es el proceso de pago desde Cartagena?",
        answer:
            "100% digital y seguro: comunícate por WhatsApp, cotizamos juntos, firmas el contrato digital y pagas por transferencia o link de pago. Sin presencia física necesaria.",
    },
];

export default function CartagenaPage() {
    return (
        <>
            <Hero
                badgeText="Disponibilidad inmediata — Cartagena"
                headline={(
                    <>
                        Alquila tu ecógrafo <br />
                        <span className="text-gradient">en Cartagena</span> y sigue facturando.
                    </>
                )}
                subheadline={(
                    <>
                        <strong>Alquiler y venta de ecógrafos en Cartagena de Indias</strong> y todo Bolívar. Mindray Z6 y Z60 certificados INVIMA, entregamos en Bocagrande, Manga, Getsemaní y toda la ciudad en 24 a 48 horas.
                    </>
                )}
                ctaText="Cotizar para Cartagena"
                whatsappText="WhatsApp Cartagena"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Cartagena&type=phone_number&app_absent=0"
                imageAlt="Ecógrafo Mindray Z60 disponible en Cartagena"
                availabilityText="Cobertura en Cartagena"
                availabilitySubtext="Bolívar completo"
            />

            <Advantages city="Cartagena" />

            <ProductCatalog city="Cartagena" />

            <BookingWizard />

            <HowItWorks />

            <ClinicalApplications city="Cartagena" />

            <Comparison city="Cartagena" />

            <AboutUs city="Cartagena" />

            <AdditionalServices />

            <LogoLoop />

            {/* ── FAQ LOCAL ── */}
            <section className="py-24 bg-slate-50" id="faq-cartagena">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Resolvemos tus dudas</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">
                            Preguntas frecuentes — <span className="text-gradient">Cartagena</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Todo lo que necesitas saber sobre el servicio de alquiler de ecógrafos en la Ciudad Heroica.</p>
                    </div>
                    <div className="space-y-4">
                        {faqCartagena.map((item, i) => (
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
                            href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20servicio%20en%20Cartagena&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex"
                        >
                            💬 Hablar con un asesor en Cartagena
                        </a>
                    </div>
                </div>
            </section>

            <CityLinks currentCity="Cartagena" />
            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Cartagena - Ecoespecializada",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/cartagena",
                        "url": "https://alquilerdeecografos.com/cartagena",
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
                            "name": "Bolívar"
                        }
                    })
                }}
            />
        </>
    );
}

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
    title: "Alquiler de Ecógrafos en Cúcuta | Equipos en Caobos y Riviera",
    description:
        "Respaldo y tecnología para los médicos de Norte de Santander. Alquiler de ecógrafos Mindray con entrega en Caobos, La Riviera y el sector Blanco.",
    keywords: ["alquiler ecógrafo Cúcuta", "venta ecógrafo Cúcuta", "ecógrafo Mindray Cúcuta", "equipos médicos Norte de Santander", "ecógrafo portátil Cúcuta", "arriendo ecógrafo Cúcuta"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/cucuta" },
    openGraph: {
        title: "Alquiler de Ecógrafos en Cúcuta | Alquiler de ecografos",
        description: "Tecnología de punta para la salud en la frontera. Servicio ágil cerca a la Clínica Norte y Clínica San José.",
        url: "https://alquilerdeecografos.com/colombia/cucuta",
    },
};

const faqCucuta = [
    {
        question: "¿Hacen entrega de ecógrafos en Cúcuta y Norte de Santander?",
        answer:
            "Claro que sí. Enviamos a Cúcuta, Los Patios, Villa del Rosario, El Zulia y Ocaña. También llegamos a otros municipios de Norte de Santander. Tiempo de entrega: 24 a 48 horas hábiles desde Medellín.",
    },
    {
        question: "¿Cuánto tarda el equipo en llegar a Cúcuta?",
        answer:
            "Desde nuestras instalaciones en Medellín hasta Cúcuta, el tiempo de tránsito es de 24 a 48 horas hábiles por transportadora certificada. El equipo llega calibrado y listo para conectar.",
    },
    {
        question: "¿Pueden atender clínicas y consultorios cerca de la frontera en Cúcuta?",
        answer:
            "Sí, atendemos consultorios y clínicas en toda el Área Metropolitana de Cúcuta. Los equipos cuentan con registro INVIMA colombiano y están listos para operar en cualquier instalación del lado colombiano.",
    },
    {
        question: "¿Los equipos tienen registro sanitario INVIMA para operar en Norte de Santander?",
        answer:
            "Todos los ecógrafos Mindray Z6 y Z60 tienen registro sanitario INVIMA vigente y certificación de calibración vigente, válidos en todo el territorio colombiano incluyendo Cúcuta.",
    },
    {
        question: "¿Puedo alquilar un ecógrafo solo por días para brigadas en la región?",
        answer:
            "¡Por supuesto! El servicio es totalmente flexible. Desde 1 día para brigadas, jornadas o atención especial hasta contratos mensuales con tarifa preferencial. Sin permanencia mínima.",
    },
    {
        question: "¿Cómo solicito el servicio desde Cúcuta?",
        answer:
            "Escríbenos por WhatsApp indicando que eres de Cúcuta o Norte de Santander, cotizamos juntos, firmas el contrato digital y pagas de forma segura por transferencia bancaria o link. En 24-48 h tienes el equipo.",
    },
];

export default function CucutaPage() {
    return (
        <>
            <Hero
                badgeText="Disponibilidad inmediata — Cúcuta"
                headline={(
                    <>
                        Alquila tu ecógrafo <br />
                        <span className="text-gradient">en Cúcuta</span> y sigue facturando.
                    </>
                )}
                subheadline={(
                    <>
                        <strong>Alquiler y venta de ecógrafos en Cúcuta</strong> y todo Norte de Santander. Entregamos en Los Patios, Villa del Rosario, El Zulia y toda la región. Mindray Z6 y Z60 con certificación INVIMA. Disponibles en 24 a 48 horas.
                    </>
                )}
                ctaText="Cotizar para Cúcuta"
                whatsappText="WhatsApp Cúcuta"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20C%C3%BAcuta&type=phone_number&app_absent=0"
                imageAlt="Ecógrafo Mindray Z60 disponible en Cúcuta"
                availabilityText="Cobertura en Cúcuta"
                availabilitySubtext="Norte de Santander"
            />

            <Advantages 
                city="Cúcuta" 
                title="Tecnología de frontera para los médicos de Cúcuta"
                subtitle="Llegamos a barrios como Caobos, La Riviera y Blanco. El respaldo que los médicos de la frontera necesitan para su consulta diaria."
            />

            <ProductCatalog city="Cúcuta" />

            <BookingWizard 
                city="Cúcuta" 
                titleText="Planes a tu medida"
                titleHighlight="en Cúcuta"
            />

            <HowItWorks 
                city="Cúcuta" 
                title="Logística ágil en la Frontera"
            />

            <ClinicalApplications city="Cúcuta" />

            <Comparison 
                city="Cúcuta" 
                titleText="Soluciones ágiles de"
                titleHighlight="ecografía en Norte de Santander"
                subtitle="Descubre por qué nuestro alquiler de bajo riesgo es la mejor inversión para especialistas en Cúcuta y municipios aledaños."
            />

            <AboutUs 
                city="Cúcuta" 
                titleText="Compromiso con la"
                titleHighlight="salud de los cucuteños"
                description="Comprometidos con la salud en Norte de Santander, ofrecemos equipos Mindray certificados y soporte biomédico cerca a la Clínica Norte y Clínica San José."
            />

            <AdditionalServices />

            <LogoLoop />

            {/* ── FAQ LOCAL ── */}
            <section className="py-24 bg-slate-50" id="faq-cucuta">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Resolvemos tus dudas</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">
                            Preguntas frecuentes — <span className="text-gradient">Cúcuta</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Todo lo que necesitas saber sobre el servicio de alquiler de ecógrafos en Cúcuta y Norte de Santander.</p>
                    </div>
                    <div className="space-y-4">
                        {faqCucuta.map((item, i) => (
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
                            href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20servicio%20en%20C%C3%BAcuta&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex"
                        >
                            💬 Hablar con un asesor en Cúcuta
                        </a>
                    </div>
                </div>
            </section>

            <CityLinks currentCity="Cúcuta" />
            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Cúcuta - Alquiler de ecografos",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/cucuta",
                        "url": "https://alquilerdeecografos.com/cucuta",
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
                            "name": "Norte de Santander"
                        }
                    })
                }}
            />
        </>
    );
}

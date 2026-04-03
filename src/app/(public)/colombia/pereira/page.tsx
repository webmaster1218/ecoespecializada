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
    title: "Alquiler y Venta de Ecógrafos en Pereira | Mindray | Eje Cafetero",
    description:
        "Líderes en ALQUILER y VENTA de ecógrafos Mindray en Pereira y el Eje Cafetero. Entrega en Dosquebradas, Santa Rosa y toda la región. Certificados INVIMA.",
    keywords: ["alquiler ecógrafo Pereira", "venta ecógrafo Pereira", "ecógrafo Mindray Pereira", "equipos médicos Eje Cafetero", "ecógrafo portátil Risaralda", "arriendo ecógrafo Pereira"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/pereira" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Pereira | Ecoespecializada",
        description: "Equipos Mindray certificados con entrega en Pereira y el Eje Cafetero. Servicio ágil para médicos y clínicas risaraldenses.",
        url: "https://alquilerdeecografos.com/colombia/pereira",
    },
};

const faqPereira = [
    {
        question: "¿Hacen entrega de ecógrafos en Pereira y el Eje Cafetero?",
        answer:
            "Sí, cubrimos Pereira, Dosquebradas, Santa Rosa de Cabal y todo Risaralda. También llegamos a Armenia (Quindío) y Manizales (Caldas). El tiempo de entrega es de 24 a 48 horas hábiles.",
    },
    {
        question: "¿Cuánto tarda el equipo en llegar a la Perla del Otún?",
        answer:
            "Desde Medellín hasta Pereira, el tiempo de tránsito is de 24 a 48 horas hábiles. El equipo llega calibrado, verificado y listo para usar en tu consultorio al recibirlo.",
    },
    {
        question: "¿Puedo alquilar por un solo día para una brigada o jornada en Risaralda?",
        answer:
            "¡Claro! El servicio es completamente flexible: desde 1 día para brigadas, hasta semanas o meses con tarifa preferencial. Sin mínimos de alquiler ni cláusulas de permanencia.",
    },
    {
        question: "¿Los equipos tienen registro INVIMA para operar en el Eje Cafetero?",
        answer:
            "Todos los ecógrafos Mindray Z6 y Z60 tienen registro sanitario INVIMA vigente y certificación de calibración, cumpliendo todas las exigencias normativas del sector salud en Colombia.",
    },
    {
        question: "¿El servicio cubre también Armenia y Manizales?",
        answer:
            "Sí, el Eje Cafetero está completamente cubierto. Enviamos a Armenia, Calarcá, Manizales, Villamaría y municipios vecinos. El tiempo de entrega puede variar hasta 48 horas dependiendo de la ubicación exacta.",
    },
    {
        question: "¿Cómo solicito el ecógrafo desde Pereira?",
        answer:
            "Escríbenos por WhatsApp indicando que eres de Pereira, cotizamos juntos, firmas el contrato digital y pagas por transferencia o link de pago. En 24-48 h tienes el equipo en tu consultorio.",
    },
];

export default function PereiraPage() {
    return (
        <>
            <Hero
                badgeText="Disponibilidad inmediata — Pereira"
                headline={(
                    <>
                        Alquila tu ecógrafo <br />
                        <span className="text-gradient">en Pereira</span> y sigue facturando.
                    </>
                )}
                subheadline={(
                    <>
                        <strong>Alquiler y venta de ecógrafos en Pereira</strong> y todo el Eje Cafetero. Entregamos en Dosquebradas, Santa Rosa, Armenia y Manizales. Mindray Z6 y Z60 certificados INVIMA. Listos en 24 a 48 horas.
                    </>
                )}
                ctaText="Cotizar para Pereira"
                whatsappText="WhatsApp Pereira"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Pereira&type=phone_number&app_absent=0"
                imageAlt="Ecógrafo Mindray Z60 disponible en Pereira"
                availabilityText="Cobertura en Pereira"
                availabilitySubtext="Eje Cafetero"
            />

            <Advantages city="Pereira" />

            <ProductCatalog city="Pereira" />

            <BookingWizard />

            <HowItWorks />

            <ClinicalApplications city="Pereira" />

            <Comparison city="Pereira" />

            <AboutUs city="Pereira" />

            <AdditionalServices />

            <LogoLoop />

            {/* ── FAQ LOCAL ── */}
            <section className="py-24 bg-slate-50" id="faq-pereira">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Resolvemos tus dudas</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">
                            Preguntas frecuentes — <span className="text-gradient">Pereira</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Todo lo que necesitas saber sobre el servicio de alquiler de ecógrafos en la Perla del Otún.</p>
                    </div>
                    <div className="space-y-4">
                        {faqPereira.map((item, i) => (
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
                            href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20servicio%20en%20Pereira&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex"
                        >
                            💬 Hablar con un asesor en Pereira
                        </a>
                    </div>
                </div>
            </section>

            <CityLinks currentCity="Pereira" />
            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Pereira - Ecoespecializada",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/pereira",
                        "url": "https://alquilerdeecografos.com/pereira",
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
                            "name": "Risaralda"
                        }
                    })
                }}
            />
        </>
    );
}

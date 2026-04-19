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
    title: "Alquiler de Ecógrafos en Cali | Servicio en Tequendama y Ciudad Jardín",
    description:
        "La solución premium para médicos de Cali y el Valle. Alquiler de ecógrafos Mindray con cobertura en Tequendama, San Fernando y Ciudad Jardín. Certificados INVIMA.",
    keywords: ["alquiler ecógrafo Cali", "venta ecógrafo Cali", "ecógrafo Mindray Cali", "equipos médicos Valle del Cauca", "ecógrafo portátil Cali", "arriendo ecógrafo Cali"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/cali" },
    openGraph: {
        title: "Alquiler de Ecógrafos en Cali | Alquiler de ecografos",
        description: "Equipos Mindray certificados en la Sultana del Valle. Servicio ágil cerca a la Clínica Valle del Lili e Imbanaco.",
        url: "https://alquilerdeecografos.com/colombia/cali",
    },
};

const faqCali = [
    {
        question: "¿Hacen entrega de ecógrafos en Cali y el Valle del Cauca?",
        answer:
            "Sí, enviamos a Cali y a todo el Valle del Cauca. Cubrimos barrios como Granada, Ciudad Jardín, Centenario, Chipichape y el resto de la ciudad. El despacho sale en 24 a 48 horas hábiles.",
    },
    {
        question: "¿Cuánto tarda el equipo en llegar a Cali?",
        answer:
            "Desde Medellín, el tiempo de tránsito a Cali es de 24 a 48 horas hábiles por mensajería certificada. El equipo llega calibrado, embalado con protección anti-golpe y listo para usar.",
    },
    {
        question: "¿Puedo alquilar solo por un día para una brigada de salud en Cali?",
        answer:
            "¡Claro que sí! El servicio es completamente flexible. Puedes alquilar desde 1 día para jornadas puntuales o brigadas comunitarias. Sin permanencia mínima ni penalidades.",
    },
    {
        question: "¿Los ecógrafos están certificados para operar en el sistema de salud en Cali?",
        answer:
            "Todos nuestros equipos Mindray cuentan con registro sanitario INVIMA vigente y certificación de calibración, cumpliendo con todos los requisitos del sistema de salud colombiano para operar en cualquier ciudad.",
    },
    {
        question: "¿Tienen servicio de mantenimiento para cuando el equipo esté en Cali?",
        answer:
            "Contamos con soporte técnico remoto disponible todos los días. Si el problema no se puede resolver a distancia, coordinamos el reemplazo del equipo en el menor tiempo posible para que no pierdas consultas.",
    },
    {
        question: "¿Cómo solicito un ecógrafo desde Cali?",
        answer:
            "Es muy sencillo: escríbenos por WhatsApp indicando que eres de Cali, confirmamos disponibilidad, firmamos el contrato digital y realizas el pago de forma segura. En 24-48 horas tienes el equipo en tu consultorio.",
    },
];

export default function CaliPage() {
    return (
        <>
            <Hero
                badgeText="Disponibilidad inmediata — Cali"
                headline={(
                    <>
                        Alquila tu ecógrafo <br />
                        <span className="text-gradient">en Cali</span> y sigue facturando.
                    </>
                )}
                subheadline={(
                    <>
                        Somos la mejor opción para <strong>alquiler y venta de ecógrafos en Cali</strong> y el Valle del Cauca. Entregamos en Granada, Ciudad Jardín, Centenario y todo Cali. Equipo Mindray Z6 y Z60 con certificación INVIMA en 24 a 48 horas.
                    </>
                )}
                ctaText="Cotizar para Cali"
                whatsappText="WhatsApp Cali"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Cali&type=phone_number&app_absent=0"
                imageAlt="Ecógrafo Mindray Z60 disponible en Cali"
                availabilityText="Cobertura en Cali"
                availabilitySubtext="Valle del Cauca"
            />

            <Advantages 
                city="Cali" 
                title="Beneficios de la ecografía avanzada en Cali"
                subtitle="Cobertura total en el clúster médico de Tequendama y San Fernando. Entregas en menos de 24h en Ciudad Jardín y Juanambú."
            />

            <ProductCatalog city="Cali" />

            <BookingWizard 
                city="Cali" 
                titleText="Configura tu"
                titleHighlight="equipo para Cali"
            />

            <HowItWorks 
                city="Cali" 
                title="Proceso de entrega rápida en Cali"
            />

            <ClinicalApplications city="Cali" />

            <Comparison 
                city="Cali" 
                titleText="Alquiler vs Compra: La elección"
                titleHighlight="inteligente en el Valle"
                subtitle="Compara nuestro modelo de cero riesgo y descubre por qué los especialistas de la Sultana del Valle eligen nuestro alquiler premium."
            />

            <AboutUs 
                city="Cali" 
                titleText="Líderes en"
                titleHighlight="equipos médicos para Cali"
                description="Líderes en tecnología médica en el Valle del Cauca, brindando soporte prioritario cerca de la Clínica Valle del Lili e Imbanaco para asegurar la continuidad de tu consulta."
            />

            <AdditionalServices />

            <LogoLoop />

            {/* ── FAQ LOCAL ── */}
            <section className="py-24 bg-slate-50" id="faq-cali">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Resolvemos tus dudas</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">
                            Preguntas frecuentes — <span className="text-gradient">Cali</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Todo lo que necesitas saber sobre el servicio de alquiler de ecógrafos en la Sultana del Valle.</p>
                    </div>
                    <div className="space-y-4">
                        {faqCali.map((item, i) => (
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
                            href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20servicio%20en%20Cali&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex"
                        >
                            💬 Hablar con un asesor en Cali
                        </a>
                    </div>
                </div>
            </section>

            <CityLinks currentCity="Cali" />
            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Cali - Alquiler de ecografos",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/colombia/cali",
                        "url": "https://alquilerdeecografos.com/colombia/cali",
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
                            "name": "Valle del Cauca"
                        }
                    })
                }}
            />
        </>
    );
}

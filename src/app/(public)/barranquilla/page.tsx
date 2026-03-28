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

export const metadata: Metadata = {
    title: "Alquiler y Venta de Ecógrafos en Barranquilla | Mindray Z6 y Z60 | Costa Atlántica",
    description:
        "Alquila o compra ecógrafos Mindray en Barranquilla y la Costa Caribe. Entrega en El Prado, Altamira, Villa Santos y toda La Arenosa. Certificados INVIMA. ¡Cotiza ya!",
    keywords: ["alquiler ecógrafo Barranquilla", "venta ecógrafo Barranquilla", "ecógrafo Mindray Barranquilla", "equipos médicos Costa Atlántica", "ecógrafo portátil Barranquilla"],
    alternates: { canonical: "https://alquilerdeecografos.com/barranquilla" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Barranquilla",
        description: "Equipos Mindray certificados con entrega en Barranquilla y toda la Costa Caribe. Servicio ágil para médicos y clínicas barranquilleras.",
        url: "https://alquilerdeecografos.com/barranquilla",
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

            {/* ── HERO LOCAL ── */}
            <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-36 lg:pt-44 pb-32" id="inicio">
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-50/80 blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10 grid lg:grid-cols-2 gap-12 pt-10">
                    {/* Text content - centered on mobile, left-aligned on desktop */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                            <span>✓</span> Disponibilidad inmediata — Barranquilla
                        </div>

                        <h1 className="text-5xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            Alquila tu ecógrafo{" "}
                            <span className="text-gradient">en Barranquilla</span>
                            <br />
                            y sigue facturando.
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                            <strong>Alquiler y venta de ecógrafos en Barranquilla</strong> y toda la Costa Caribe.
                            Equipo Mindray Z6 y Z60 certificado INVIMA. Entregamos en El Prado,
                            Altamira, Villa Santos y el resto de La Arenosa en 24 a 48 horas.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                            <a href="#reservar" className="btn-primary w-full sm:w-auto justify-center">
                                Cotizar para Barranquilla
                                <span className="ml-2 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    🔥 Disponible
                                </span>
                            </a>
                            <a
                                href="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Barranquilla&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-slate-600 bg-white border border-slate-200 hover:border-green-400 hover:text-green-600 transition-all shadow-sm text-center"
                            >
                                💬 WhatsApp Barranquilla
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8 border-t border-slate-100 w-full">
                            {[
                                { icon: "🏖️", text: "Costa Caribe cubierta" },
                                { icon: "⭐", text: "4.9/5 calificación" },
                                { icon: "🛡️", text: "Garantía INVIMA" },
                                { icon: "🚚", text: "Entrega en 24-48 h" },
                            ].map((t) => (
                                <div key={t.text} className="flex items-center gap-2 text-sm text-slate-600 font-medium whitespace-nowrap">
                                    <span>{t.icon}</span> {t.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-100 blur-3xl opacity-60" />
                        <div className="absolute w-[320px] h-[320px] rounded-full border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white shadow-2xl shadow-blue-200/40" />
                        <Image
                            src="/images/z60/z-60-abierto-izquierda.webp"
                            alt="Ecógrafo Mindray Z60 disponible en Barranquilla"
                            width={480}
                            height={480}
                            className="relative z-10 w-[350px] md:w-[420px] object-contain drop-shadow-2xl"
                            style={{ mixBlendMode: "multiply" }}
                            priority
                        />
                        <div className="absolute bottom-4 right-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 z-20 min-w-[230px]">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12l5 5l10-10" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Cobertura en Barranquilla</p>
                                <p className="text-base font-bold text-green-600 leading-none">Costa Caribe</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Envío certificado en 24-48 h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Advantages city="Barranquilla" />

            <ProductCatalog city="Barranquilla" />

            <BookingWizard />

            <HowItWorks />

            <ClinicalApplications />

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

            <Testimonials />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Barranquilla - Ecoespecializada",
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

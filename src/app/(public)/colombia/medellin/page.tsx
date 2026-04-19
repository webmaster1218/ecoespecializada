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
import CityLinks from "@/components/sections/CityLinks";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const ExperienceVideo = dynamic(() => import("@/components/sections/ExperienceVideo"), { ssr: true });

export const metadata: Metadata = {
    title: "Alquiler de Ecógrafos en Medellín | Mindray en El Poblado y Laureles",
    description:
        "Alquiler de ecógrafos Mindray en Medellín. Entrega inmediata en El Poblado, Laureles, Envigado y cercanías a la Torre Médica El Tesoro. Equipos de alta gama con respaldo técnico.",
    keywords: ["alquiler ecógrafo Medellín", "venta ecógrafo Medellín", "ecógrafo Mindray Medellín", "equipos médicos Medellín", "ecógrafo portátil Medellín", "arriendo ecógrafo Medellín"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia/medellin" },
    openGraph: {
        title: "Alquiler de Ecógrafos en Medellín | Alquiler de ecografos",
        description: "Potencia tu consultorio en Medellín con ecografía avanzada. Cubrimos El Poblado, Laureles y todas las zonas médicas de la ciudad.",
        url: "https://alquilerdeecografos.com/colombia/medellin",
    },
};

export default function MedellinPage() {
    return (
        <main>
            <Hero
                badgeText="Disponibilidad inmediata en Medellín"
                headline={(
                    <>
                        Alquila tu ecógrafo por día, <br />
                        <span className="text-gradient">
                            Recibe tu equipo rápido y sigue facturando.
                        </span>
                    </>
                )}
                subheadline={(
                    <>
                        La solución de <strong>alquiler de ecógrafos en Medellín</strong> que tu consultorio necesita. Equipos Mindray de alta gama con entrega inmediata en <strong>El Poblado, Laureles, Envigado</strong> y cercanías a la Torre Médica El Tesoro.
                    </>
                )}
                ctaText="Cotizar para Medellín"
                whatsappText="WhatsApp Medellín"
                whatsappLink="https://api.whatsapp.com/send/?phone=573003608621&text=Hola,%20quiero%20cotizar%20un%20ec%C3%B3grafo%20para%20Medell%C3%ADn&type=phone_number&app_absent=0"
            />
            <ExperienceVideo />
            <Advantages 
                city="Medellín" 
                title="Equipos de ecografía con respaldo total en Medellín"
                subtitle="Entregas inmediatas y soporte técnico en El Poblado, Laureles, Belén y Envigado. Cubrimos toda el área metropolitana."
            />
            <ProductCatalog city="Medellín" />
            <ClinicalApplications city="Medellín" />
            <BookingWizard 
                city="Medellín" 
                titleText="Personaliza tu"
                titleHighlight="reserva en Medellín"
            />
            <HowItWorks 
                city="Medellín" 
                title="Tu ecógrafo en Medellín en 4 pasos"
            />
            <Comparison 
                city="Medellín" 
                titleText="¿Por qué los médicos de Medellín"
                titleHighlight="eligen el alquiler premium?"
                subtitle="Descubre por qué los médicos de la ciudad prefieren nuestro modelo flexible vs la descapitalización por compra."
            />
            <AboutUs 
                city="Medellín" 
                titleText="Especialistas en"
                titleHighlight="ecografía para Medellín"
                description="Con más de 10 años de experiencia, somos el aliado preferido de consultorios en la Torre Médica El Tesoro e Intermédica, ofreciendo respaldo inmediato."
            />
            <LogoLoop />
            <CityLinks currentCity="Medellín" />
            <AdditionalServices />
            <Testimonials />
            <FAQ city="Medellín" />
            <Footer />

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Alquiler de Ecógrafos en Medellín - Alquiler de ecografos",
                        "image": "https://alquilerdeecografos.com/images/z60/z-60-abierto-izquierda.webp",
                        "@id": "https://alquilerdeecografos.com/colombia/medellin",
                        "url": "https://alquilerdeecografos.com/colombia/medellin",
                        "telephone": "+573003608621",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Carrera 43A # 1-50",
                            "addressLocality": "Medellín",
                            "addressRegion": "Antioquia",
                            "postalCode": "050021",
                            "addressCountry": "CO"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 6.2089,
                            "longitude": -75.567
                        },
                        "openingHoursSpecification": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            "opens": "08:00",
                            "closes": "18:00"
                        },
                        "areaServed": {
                            "@type": "City",
                            "name": "Medellín"
                        }
                    })
                }}
            />
        </main>
    );
}

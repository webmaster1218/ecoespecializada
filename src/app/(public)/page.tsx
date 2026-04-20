import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";

const ExperienceVideo = dynamic(() => import("@/components/sections/ExperienceVideo"), { ssr: true });
const Advantages = dynamic(() => import("@/components/sections/Advantages"), { ssr: true });
const ProductCatalog = dynamic(() => import("@/components/sections/ProductCatalog"), { ssr: true });
const ClinicalApplications = dynamic(() => import("@/components/sections/ClinicalApplications"), { ssr: true });
const BookingWizard = dynamic(() => import("@/components/sections/BookingWizard"), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), { ssr: true });
const Comparison = dynamic(() => import("@/components/sections/Comparison"), { ssr: true });
const AboutUs = dynamic(() => import("@/components/sections/AboutUs"), { ssr: true });
const LogoLoop = dynamic(() => import("@/components/sections/LogoLoop"), { ssr: true });
const CityLinks = dynamic(() => import("@/components/sections/CityLinks"), { ssr: true });
const AdditionalServices = dynamic(() => import("@/components/sections/AdditionalServices"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });

export const metadata: Metadata = {
    title: "Alquiler de ecógrafos | Alquiler y Venta de Ecógrafos en Colombia | Mindray Z6 y Z60",
    description:
        "Líderes en alquiler y venta de ecógrafos Mindray en Colombia. Entrega inmediata en Medellín, Bogotá, Cali, Barranquilla y más. Equipos certificados INVIMA con respaldo total.",
    keywords: ["alquiler de ecógrafos", "venta de ecógrafos", "ecógrafos Mindray Colombia", "equipos médicos", "alquiler ecógrafo medellin", "alquiler ecografo bogota"],
    alternates: { canonical: "https://alquilerdeecografos.com" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Colombia | Alquiler de ecógrafos",
        description: "Equipos de ecografía de alta gama con cobertura nacional. Soluciones flexibles para médicos y especialistas en toda Colombia.",
        url: "https://alquilerdeecografos.com",
    },
};

export default function Home() {
    return (
        <main>
            <Hero
                badgeText="Cobertura en toda Colombia"
                headline={(
                    <>
                        Alquiler y Venta de Ecógrafos <br />
                        <span className="text-gradient">
                            Soluciones avanzadas para médicos.
                        </span>
                    </>
                )}
                subheadline={(
                    <>
                        Llegamos a todo el territorio nacional con equipos Mindray de alta gama. <strong>Alquiler y venta con entrega inmediata</strong> en las principales ciudades: Bogotá, Medellín, Cali, Barranquilla y más. Soporte técnico y calidad garantizada.
                    </>
                )}
                ctaText="Ver servicios"
                whatsappText="Consultar disponibilidad nacional"
                availabilityText="Cobertura Nacional"
                availabilitySubtext="Toda Colombia"
            />
            <ExperienceVideo />
            <Advantages city="Colombia" />
            <ProductCatalog city="Colombia" />
            <ClinicalApplications city="Colombia" />
            <BookingWizard />
            <HowItWorks />
            <Comparison city="Colombia" />
            <AboutUs city="Colombia" />
            <LogoLoop />
            <CityLinks />
            <AdditionalServices />
            <Testimonials />
            <FAQ />
            <Footer />
        </main>
    );
}

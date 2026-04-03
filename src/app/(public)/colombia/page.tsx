import Hero from "@/components/sections/Hero";
import Comparison from "@/components/sections/Comparison";
import LogoLoop from "@/components/sections/LogoLoop";
import ProductCatalog from "@/components/sections/ProductCatalog";
import BookingWizard from "@/components/sections/BookingWizard";
import ClinicalApplications from "@/components/sections/ClinicalApplications";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutUs from "@/components/sections/AboutUs";
import AdditionalServices from "@/components/sections/AdditionalServices";
import Advantages from "@/components/sections/Advantages";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ExperienceVideo from "@/components/sections/ExperienceVideo";
import Footer from "@/components/layout/Footer";
import CityLinks from "@/components/sections/CityLinks";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Alquiler y Venta de Ecógrafos en Colombia | Mindray Z6 y Z60 | Envíos Nacionales",
    description:
        "ALQUILER y VENTA de ecógrafos Mindray en toda Colombia. Cobertura en Bogotá, Medellín, Cali, Barranquilla, Cartagena y toda la nación. Equipos certificados con entrega inmediata.",
    keywords: ["alquiler ecógrafos Colombia", "venta ecógrafos Colombia", "ecógrafo Mindray Colombia", "equipos médicos Colombia", "arriendo de ecógrafos"],
    alternates: { canonical: "https://alquilerdeecografos.com/colombia" },
    openGraph: {
        title: "Alquiler y Venta de Ecógrafos en Colombia | Ecoespecializada",
        description: "Equipos Mindray certificados con entrega en las principales ciudades de Colombia. Servicio ágil y respaldo técnico garantizado.",
        url: "https://alquilerdeecografos.com/colombia",
    },
};

export default function ColombiaLandingPage() {
    return (
        <main>
            <Hero 
                badgeText="Cobertura en toda Colombia"
                headline={(
                    <>
                        Alquila o compra tu ecógrafo <br />
                        <span className="text-gradient">en cualquier ciudad</span> de Colombia.
                    </>
                )}
                subheadline={(
                    <>
                        Llegamos a todo el territorio nacional. <strong>Alquiler y venta de ecógrafos Mindray</strong> en Bogotá, Medellín, Cali, Barranquilla y más. Equipos certificados con soporte técnico y entrega rápida.
                    </>
                )}
                ctaText="Ver ciudades disponibles"
                whatsappText="Consultar cobertura nacional"
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

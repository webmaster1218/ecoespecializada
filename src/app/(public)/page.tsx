
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
const ExperienceVideo = dynamic(() => import("@/components/sections/ExperienceVideo"), { ssr: true });
import Footer from "@/components/layout/Footer";

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

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceVideo />
      <Advantages />
      <ProductCatalog />
      <ClinicalApplications />
      <BookingWizard />
      <HowItWorks />
      <Comparison />
      <AboutUs />
      <LogoLoop />
      <CityLinks currentCity="Medellín" />
      <AdditionalServices />
      <Testimonials />
      <FAQ />

      <Footer />
    </main>
  );
}

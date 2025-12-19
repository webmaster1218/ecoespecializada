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

import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoLoop />
      <Comparison />
      <ProductCatalog />
      <BookingWizard />
      <ClinicalApplications />
      <HowItWorks />
      <AboutUs />
      <AdditionalServices />
      <Advantages />
      <Testimonials />
      <FAQ />

      <Footer />
    </main>
  );
}

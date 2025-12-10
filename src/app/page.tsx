import Link from "next/link";
import Hero from "@/components/sections/Hero";
import Comparison from "@/components/sections/Comparison";
import ProductCatalog from "@/components/sections/ProductCatalog";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutUs from "@/components/sections/AboutUs";
import Advantages from "@/components/sections/Advantages";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Comparison />
      <ProductCatalog />
      <HowItWorks />
      <AboutUs />
      <Advantages />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}

import Image from "next/image";
import Hero from "@/components/sections/Hero";
import Comparison from "@/components/sections/Comparison";
import ProductCatalog from "@/components/sections/ProductCatalog";
import Advantages from "@/components/sections/Advantages";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Comparison />
      <ProductCatalog />
      <Advantages />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}

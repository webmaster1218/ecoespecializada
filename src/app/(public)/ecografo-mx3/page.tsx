"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/Footer";
import LogoLoop from "@/components/sections/LogoLoop";
import CallButton from "@/components/ui/CallButton";

const whatsappNumber = "573003608621";
const whatsappMessage = encodeURIComponent("Hola, quiero alquilar el ecógrafo Mindray MX3");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const navLinks = [
  { name: "Inicio", href: "/#inicio" },
  { name: "Características", href: "#caracteristicas" },
  { name: "Tecnología", href: "#tecnologia" },
  { name: "Nosotros", href: "/#nosotros" }
];

export default function EcografoMX3Page() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleBack = useCallback(() => {
    if (canGoBack) router.back();
    else router.push("/");
  }, [router, canGoBack]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-blue-100 selection:text-blue-900">

      {/* Home-style Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "top-0" : "top-0"}`}>
        {/* Branding Bar - Matches Home */}
        <div className={`bg-white border-b border-slate-100 flex justify-center items-center gap-2 transition-all duration-300 overflow-hidden ${scrolled ? "h-0 py-0 opacity-0 border-transparent" : "h-10 py-2 opacity-100"}`}>
          <span className="text-[10px] md:text-xs font-medium text-slate-500 tracking-tight">Una marca de</span>
          <Image
            src="/images/logo/equibiomedic-new.webp"
            alt="Equibiomedic Logo"
            width={100}
            height={20}
            className="h-4 w-auto object-contain"
          />
        </div>

        <div className={`transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md h-[4.5rem]" : "bg-white/80 h-20"} backdrop-blur-md border-b border-white/10 flex items-center`}>
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-12">
              <Link href="/" className="block relative h-8 w-24 md:h-10 md:w-36 shrink-0">
                <Image
                  src="/images/logo/logo_alquilerdeecografos.webp"
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </Link>

              <button onClick={handleBack} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Volver</span>
              </button>

              {/* Desktop Menu - Home Style */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[0.9rem] font-semibold text-[#1e293b] hover:text-blue-600 transition-colors relative group/link"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover/link:w-full"></span>
                  </a>
                ))}

                {/* Dropdown Equipos */}
                <div className="relative group/dropdown">
                  <span className="text-[0.9rem] font-semibold text-[#1e293b] hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1">
                    Equipos
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 flex flex-col overflow-hidden">
                    <Link href="/ecografo-z6/" className="px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">Mindray Z6</Link>
                    <Link href="/ecografo-z60/" className="px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors border-t border-slate-50">Mindray Z60</Link>
                    <Link href="/ecografo-mx3/" className="px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors border-t border-slate-50">Mindray MX3</Link>
                    <Link href="/ecografo-m7/" className="px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors border-t border-slate-50">Mindray M7</Link>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop CTAs - Home Style */}
              <div className="hidden md:flex items-center gap-3 px-2">
                <CallButton
                  text="Llamar"
                  subtext="300 3608621"
                  variant="highlight"
                  className="!py-2 !px-5 !text-xs"
                />
                <Link href="/#reservar" className="btn-primary !py-3 !px-6 !text-[13px] !font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20 rounded-full">
                  <span className="text-lg">📅</span> Separar equipo
                </Link>
              </div>

              {/* Mobile Menu Toggle - Home Style */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-slate-50 rounded-xl text-slate-600"
                aria-label="Menu"
              >
                <m.span
                  animate={isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current rounded-full"
                />
                <m.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-current rounded-full"
                />
                <m.span
                  animate={isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current rounded-full"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Home Style */}
        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-b border-slate-100 shadow-2xl"
            >
              <div className="px-6 py-8 flex flex-col gap-5">
                <button onClick={() => { setIsMenuOpen(false); handleBack(); }} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-slate-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <span className="font-bold text-sm uppercase tracking-wider text-slate-700">Volver</span>
                </button>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[1.1rem] font-semibold text-[#1e293b] hover:text-blue-600 transition-colors py-1 px-3"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="flex flex-col gap-3 mt-2">
                    <div className="text-[1.1rem] font-bold text-[#1e293b] px-3">Equipos</div>
                    <Link href="/ecografo-z6/" onClick={() => setIsMenuOpen(false)} className="text-[1rem] font-medium text-slate-500 hover:text-blue-600 transition-colors py-1 px-5 border-l-2 border-slate-100 ml-4 hover:border-blue-500">Mindray Z6</Link>
                    <Link href="/ecografo-z60/" onClick={() => setIsMenuOpen(false)} className="text-[1rem] font-medium text-slate-500 hover:text-blue-600 transition-colors py-1 px-5 border-l-2 border-slate-100 ml-4 hover:border-blue-500">Mindray Z60</Link>
                    <Link href="/ecografo-mx3/" onClick={() => setIsMenuOpen(false)} className="text-[1rem] font-medium text-slate-500 hover:text-blue-600 transition-colors py-1 px-5 border-l-2 border-slate-100 ml-4 hover:border-blue-500">Mindray MX3</Link>
                    <Link href="/ecografo-m7/" onClick={() => setIsMenuOpen(false)} className="text-[1rem] font-medium text-slate-500 hover:text-blue-600 transition-colors py-1 px-5 border-l-2 border-slate-100 ml-4 hover:border-blue-500">Mindray M7</Link>
                </div>


                <div className="pt-6 mt-2 border-t border-slate-100 flex flex-col gap-4">
                  <CallButton
                    text="Llamar ahora"
                    subtext="300 3608621"
                    variant="highlight"
                    className="w-full justify-center"
                  />
                  <Link
                    href="/#reservar"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full text-center !py-4 text-base font-bold rounded-xl"
                  >
                    Separar equipo
                  </Link>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white -z-10"></div>
        <div className="absolute left-0 top-0 w-full h-full bg-[url('/images/grid.svg')] opacity-[0.05] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                ZST+ Ultraportátil de Alta Definición
              </div>

              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 w-fit animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Disponible ahora en stock
              </div>

              <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Ecógrafo <br />
                <span className="text-gradient">Mindray MX3</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                La revolución de la ecografía portátil en el punto de atención. Ultracompacto, liviano (3.5 - 3.8 kg) y alimentado por la plataforma avanzada de software ZST+ para una resolución excepcional en cualquier lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CallButton
                  text="Solicitar Alquiler"
                  subtext="Respuesta inmediata"
                  iconType="whatsapp"
                  variant="primary"
                  href={whatsappUrl}
                  className="w-full sm:w-auto"
                />
                <Link
                  href="#caracteristicas"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-600 bg-white border-2 border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-300 pointer-events-auto"
                >
                  Explorar características
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="bg-slate-100 p-1 rounded-lg shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold leading-tight uppercase tracking-wide">Certificado INVIMA</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="bg-slate-100 p-1 rounded-lg shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold leading-tight uppercase tracking-wide">Garantía Repuesto</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="bg-slate-100 p-1 rounded-lg shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold leading-tight uppercase tracking-wide">Soporte 24/7</span>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[380px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:mx-0"
            >
              {/* Layer 1: Atmosphere Glow */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute z-10 h-[300px] w-[300px] rounded-full bg-blue-100 blur-3xl lg:h-[500px] lg:w-[500px]"
              />

              {/* Layer 2: The Pedestal */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute z-20 h-[220px] w-[220px] md:h-[450px] md:w-[450px] rounded-full border border-blue-50 bg-gradient-to-b from-blue-50/50 to-white shadow-2xl shadow-blue-200/40"
              />

              <Image
                src="/images/mx3/mx3.jpeg"
                alt="Ecógrafo Mindray MX3"
                width={500}
                height={500}
                className="relative z-30 w-full max-w-[480px] object-contain drop-shadow-2xl"
                priority
              />

              {/* Floating feature card */}
              <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-4 left-0 md:left-4 z-20 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Disponibilidad</p>
                    <p className="text-xs text-slate-500">Inmediata para envío</p>
                  </div>
                </div>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="py-12 md:py-24 bg-white border-t border-slate-100 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
              Demostración de Equipo
            </span>
            <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-slate-900 mb-6 tracking-tight">
              Mira el <span className="text-gradient">Mindray MX3</span> en acción
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Descubre su factor de forma extremadamente portátil, panel sellado impermeable y controles táctiles avanzados de respuesta inmediata.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/80 bg-slate-950 aspect-video relative">
            <video 
              src="/images/mx3/mx3-equipo-completo.mp4" 
              controls 
              className="w-full h-full object-cover"
              poster="/images/mx3/mx3.jpeg"
            />
          </div>
        </div>
      </section>

      {/* Gallery & Highlights Section */}
      <section id="caracteristicas" className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 animate-on-scroll">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
              Ergonomía superior
            </span>
            <h2 className="text-3xl md:text-[3rem] font-extrabold text-slate-900 mb-6 tracking-tight">Diseñado para la <span className="text-gradient">Movilidad</span></h2>
            <p className="text-base md:text-lg text-slate-600">El MX3 cuenta con tecnologías de grado médico en un chasis ultraliviano sellado, ideal para entornos dinámicos y visitas domiciliarias.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="relative h-48 mb-6 flex items-center justify-center">
                <span className="text-6xl">⚖️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 relative z-10">Chasis Ultraligero</h3>
              <p className="text-sm md:text-base text-slate-600 relative z-10">Con un peso aproximado de solo 3.5 a 3.8 kg, es el ecógrafo de diagnóstico premium más portátil y manejable de Mindray.</p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative h-48 mb-6 flex items-center justify-center">
                <span className="text-6xl">💻</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 relative z-10">Monitor LED HD 15.6"</h3>
              <p className="text-sm md:text-base text-slate-600 relative z-10">Pantalla antirreflejo de alta resolución con amplio ángulo de visión y capacidad de inclinación ajustable de hasta 185°.</p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="relative h-48 mb-6 flex items-center justify-center">
                <span className="text-6xl">🧼</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 relative z-10">Desinfección Total</h3>
              <p className="text-sm md:text-base text-slate-600 relative z-10">Panel de control completamente liso y sellado, impermeable a fluidos. Facilita una limpieza hospitalaria rápida y segura.</p>
            </m.div>
          </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section id="tecnologia" className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 skew-y-3 origin-bottom-right transform scale-110 -z-10"></div>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-100 rounded-[3rem] blur-2xl opacity-40"></div>
              <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-white/40">
                <Image src="/images/mx3/mx3.jpeg" alt="Tecnología ZST+" width={600} height={600} className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </m.div>

            <div className="space-y-8 md:space-y-10">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                  CÓMO TRABAJA EL MX3
                </span>
                <h2 className="text-3xl md:text-[3rem] font-extrabold text-slate-900 mb-6 tracking-tight">Arquitectura <span className="text-gradient">ZST+ Basada en Software</span></h2>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">Equipado con procesamiento acústico en dominio de canal para imágenes enfocadas uniformemente, sin necesidad de focos manuales.</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Enfoque Dinámico por Píxel</h3>
                    <p className="text-slate-600 text-base leading-relaxed">Garantiza una nitidez óptima de la imagen desde los tejidos más superficiales hasta la profundidad de penetración máxima.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Compensación de Velocidad del Sonido</h3>
                    <p className="text-slate-600 text-base leading-relaxed">Algoritmos avanzados que optimizan la resolución de contraste detectando y ajustando la propagación acústica según el tejido del paciente.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Herramientas Inteligentes (Smart OB / NT / B-Line)</h3>
                    <p className="text-slate-600 text-base leading-relaxed">Automatización de mediciones fetales, translucidez nucal, rastreo de flujo y evaluación de líneas B pulmonares en tiempo récord.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Specifications Table */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">Ficha Técnica Mindray MX3</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider">
                  <th className="p-4 md:p-5">Especificación</th>
                  <th className="p-4 md:p-5">Detalle Técnico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Monitor</td>
                  <td className="p-4 md:p-5">LED de 15.6 pulgadas en alta definición (1080p)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Ángulo ajustable</td>
                  <td className="p-4 md:p-5">Hasta 185 grados de inclinación</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Peso</td>
                  <td className="p-4 md:p-5">3.5 kg a 3.8 kg (incluye batería)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Almacenamiento</td>
                  <td className="p-4 md:p-5">Disco SSD de 256 GB para Raw Data e iStation™</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Alimentación</td>
                  <td className="p-4 md:p-5">Carga rápida magnética y batería de 90 minutos de uso continuo</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Modos de Imagen</td>
                  <td className="p-4 md:p-5">Modo B, M (Anatómico, Anatómico Curvo), Doppler Color, PW Doppler, Power Doppler, HR Flow, Glazing Flow</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 bg-slate-50/50 text-slate-900 font-bold">Conectividad</td>
                  <td className="p-4 md:p-5">3x Puertos USB (2x A, 1x C), HDMI, Ethernet, Wi-Fi, DICOM 3.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-white.svg')] opacity-[0.05] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-[3rem] font-extrabold tracking-tight mb-6 leading-tight">
            Alquila hoy tu <br />
            <span className="text-blue-200">Mindray MX3</span>
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto leading-relaxed">
            Consigue el mejor equipo portátil de última generación en Colombia con servicio biomédico certificado y mantenimiento preventivo incluido.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <CallButton
              text="Chatear por WhatsApp"
              subtext="Asesoría inmediata"
              iconType="whatsapp"
              variant="highlight"
              href={whatsappUrl}
              className="w-full sm:w-auto"
            />
            <Link
              href="/#reservar"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl"
            >
              Separar equipo
            </Link>
          </div>
        </div>
      </section>

      <LogoLoop />
      <Footer />
    </main>
  );
}

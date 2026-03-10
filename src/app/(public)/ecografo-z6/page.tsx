"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

const whatsappNumber = "573005212664";
const whatsappMessage = encodeURIComponent("Hola, quiero alquilar el ecógrafo Z6");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function EcografoZ6Page() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-blue-100 selection:text-blue-900">
      
      {/* Custom Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm top-0">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Volver al Inicio</span>
          </Link>
          <div className="hidden sm:block">
            <Link href="/" className="block">
              <Image
                src="/images/logo/logo_alquilerdeecografos.webp"
                alt="Logo"
                width={160}
                height={45}
                className="h-auto w-auto"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white -z-10"></div>
        <div className="absolute left-0 top-0 w-full h-full bg-[url('/images/grid.svg')] opacity-[0.05] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
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
                Rendimiento Portátil Versátil
              </div>
              
              <h1 className="text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Ecógrafo <br/>
                <span className="text-gradient">Mindray Z6</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                La combinación perfecta entre portabilidad y diagnóstico Doppler a color. Optimiza tu flujo de trabajo en cualquier lugar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  Solicitar Alquiler
                </a>
                <a 
                  href="#caracteristicas" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-600 bg-white border-2 border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-all duration-300 pointer-events-auto"
                >
                  Explorar características
                </a>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center -mx-4 lg:mx-0"
            >
              {/* Layer 1: Atmosphere Glow */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute z-10 h-[300px] w-[300px] rounded-full bg-blue-100 blur-3xl lg:h-[500px] lg:w-[500px]"
              />

              {/* Layer 2: The Pedestal */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute z-20 h-[280px] w-[280px] rounded-full border border-blue-50 bg-gradient-to-b from-blue-50/50 to-white shadow-2xl shadow-blue-200/40 lg:h-[450px] lg:w-[450px]"
              />
              
              <Image
                src="/images/z6/z6-abierto-izquierda.webp"
                alt="Ecógrafo Mindray Z6"
                width={500}
                height={500}
                className="relative z-30 w-full max-w-[480px] object-contain drop-shadow-2xl"
                priority
              />
              
              {/* Floating feature card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-10 -left-4 md:left-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery & Highlights Section */}
      <section id="caracteristicas" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 animate-on-scroll">
                <h2 className="text-[3rem] font-extrabold text-slate-900 mb-6 tracking-tight">Equilibrio entre <span className="text-gradient">Potencia y Movilidad</span></h2>
                <p className="text-lg text-slate-600">El Mindray Z6 está diseñado para ser tu aliado en diagnósticos rápidos y precisos sin importar la ubicación.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </div>
                    <div className="relative h-48 mb-6 flex items-center justify-center">
                        <Image src="/images/z6/z6-espalda.webp" alt="Mindray Z6 Frontal" width={300} height={300} className="object-contain h-full drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Flujo de Trabajo Inteligente</h3>
                    <p className="text-slate-600 relative z-10">Teclas rápidas personalizables y optimización de imagen en un solo botón para ahorrar tiempo valioso.</p>
                </motion.div>

                <motion.div 
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
                        <Image src="/images/z6/z6-abierto-derecha.webp" alt="Mindray Z6 Vista Trasera" width={300} height={300} className="object-contain h-full drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Pantalla Ajustable</h3>
                    <p className="text-slate-600 relative z-10">Monitor de 15 pulgadas con sistema basculante que asegura la mejor visibilidad en cualquier ángulo clínico.</p>
                </motion.div>

                <motion.div 
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
                        <Image src="/images/z6/z6.webp" alt="Mindray Z6 Lateral" width={300} height={300} className="object-contain h-full drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Color Doppler</h3>
                    <p className="text-slate-600 relative z-10">Tecnología de Doppler pulsado y color que proporciona una sensibilidad excepcional para estudios vasculares.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 skew-y-3 origin-bottom-right transform scale-110 -z-10"></div>
        <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-100 rounded-[3rem] blur-2xl opacity-40"></div>
                    <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-white/40">
                         <Image src="/images/z6/z6-abierto-derecha.webp" alt="Mindray Z6 Detalle" width={600} height={600} className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700" />
                    </div>
                </motion.div>
                
                <div className="space-y-10">
                    <div>
                        <h2 className="text-[3rem] font-extrabold text-slate-900 mb-6 tracking-tight">Tecnología de <span className="text-gradient">Imagen Avanzada</span></h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">El Z6 hereda el legado de Mindray en calidad de imagen, ofreciendo herramientas de gama alta en un formato portátil.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-5">
                            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">iBeam™ e iClear™</h3>
                                <p className="text-slate-600 text-lg">Reduce el ruido de la imagen y mejora la resolución de contraste para una visualización más clara de los tejidos.</p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Imágenes Armónicas PSH™</h3>
                                <p className="text-slate-600 text-lg">Obtén una mejor resolución de contraste proporcionando una calidad de imagen más nítida con excelente resolución.</p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">iStation™</h3>
                                <p className="text-slate-600 text-lg">Sistema de gestión de información de pacientes único de Mindray que permite integrar, revisar y archivar datos de forma eficiente.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section - Redesigned to match Home */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden"
            >
                {/* Decorative background element matching Hero */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>

                <div className="relative z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-8 tracking-wide border border-blue-100 uppercase">
                        Solución Rentable
                    </div>
                    
                    <h2 className="text-[3rem] font-extrabold text-slate-900 mb-8 leading-tight">
                        ¿Listo para alquilar tu <br className="hidden md:block"/>
                        <span className="text-gradient">Mindray Z6?</span>
                    </h2>
                    
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium">
                        La mejor relación costo-beneficio para tu consulta. Equipos garantizados, entrega inmediata y soporte permanente.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a 
                          href={whatsappUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-green-500 rounded-full shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 hover:bg-green-600 min-w-[280px]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                          </svg>
                          Chatear con un Asesor
                        </a>
                        
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="flex text-amber-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.1.21-.45.45l-2.845-2.06a1 1 0 00-1.175 0l-2.845 2.06c-.35.24-.75-.471-.45-1.391l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-slate-500 font-semibold italic text-sm">"Excelente equipo y soporte técnico"</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

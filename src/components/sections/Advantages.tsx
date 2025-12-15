

export default function Advantages() {
    const advantages = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            title: "Aliados Directos",
            desc: "Sin intermediarios. Especialistas Mindray con soporte técnico nacional certificado."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            ),
            title: "Logística Flash",
            desc: "Despachos inmediatos a ciudades principales. Puesta en marcha en < 48 horas."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            ),
            title: "Disponibilidad 24/7",
            desc: "Stock permanente de equipos. Listos para entrega inmediata en cualquier momento del día."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            ),
            title: "Experiencia",
            desc: "Más de 10 años en el mercado colombiano. Más de 500 equipos entregados y presencia en 50+ ciudades."
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden" id="ventajas">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="block text-xs uppercase tracking-[0.2em] text-blue-200 font-bold mb-3">Beneficios Exclusivos</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">¿Por qué elegir <span className="text-blue-200">Alquiler de Ecógrafos?</span></h2>
                    <p className="text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">Reducimos su riesgo operativo y maximizamos su rentabilidad clínica con un servicio diseñado para profesionales.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advantages.map((adv, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-[30px] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                {adv.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">{adv.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

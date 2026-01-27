
import { memo } from "react";

function Advantages() {
    const advantages = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
            title: "Cero inversión inicial",
            desc: "Ideal para Independientes. Inicie su práctica privada hoy mismo sin descapitalizarse comprando equipos costosos."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            title: "Respaldo",
            desc: "Soporte biomédico prioritario, mantenimientos incluidos y cumplimiento normativo INVIMA total."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            ),
            title: "Disponibilidad inmediata",
            desc: "Stock permanente en Medellín. Puesta en marcha en su consultorio en menos de 24 horas."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            ),
            title: "Sin cláusulas ocultas",
            desc: "Contratos claros y transparentes. Flexibilidad para aumentar o cambiar equipos según la demanda de sus pacientes."
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-900 relative overflow-hidden" id="ventajas">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="block text-xs uppercase tracking-[0.2em] text-blue-200 font-bold mb-3">Beneficios exclusivos</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                        Por qué elegir <span className="text-blue-400">alquilerdeecografos.com</span>
                    </h2>    <p className="text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">Reducimos su riesgo operativo y maximizamos su rentabilidad clínica con un servicio diseñado para profesionales.</p>
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

export default memo(Advantages);

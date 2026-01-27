import { IconShieldCheck, IconLock, IconFileDescription, IconUserCheck, IconClock, IconBuildingSkyscraper } from "@tabler/icons-react";

export const metadata = {
    title: "Políticas de Privacidad y Devoluciones | Alquiler de Ecógrafos Colombia",
    description: "Política de tratamiento de datos, privacidad y políticas de devolución de Alquiler de Ecógrafos Colombia.",
};

export default function PoliciesPage() {
    return (
        <main className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                        Marco Legal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Políticas de Privacidad y <span className="text-blue-600">Devoluciones</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, presentamos nuestra política de privacidad para garantizar la protección de sus derechos.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Sección 1: Responsable */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconBuildingSkyscraper size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">1. Identificación del Responsable</h2>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 text-sm md:text-base space-y-2 border border-slate-200/60">
                            <p><strong className="text-slate-900">Razón Social:</strong> Alquiler de Ecógrafos Colombia</p>
                            <p><strong className="text-slate-900">NIT:</strong> 900.000.000-0</p>
                            <p><strong className="text-slate-900">Dirección Principal:</strong> Calle 123 # 45-67, Medellín, Colombia</p>
                            <p><strong className="text-slate-900">Email:</strong>info@alquilerdeecografos.com</p>
                            <p><strong className="text-slate-900">Teléfono:</strong> (601) 000-0000</p>
                            <p><strong className="text-slate-900">Sitio Web:</strong> www.alquilerdeecografos.com.co</p>
                        </div>
                    </div>

                    {/* Sección 2: Finalidades */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconFileDescription size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">2. Finalidades del Tratamiento</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">
                                Los datos personales recolectados serán utilizados para los siguientes fines específicos relacionados con nuestro objeto social de alquiler de equipos médicos:
                            </p>
                            <ul className="space-y-3 list-disc pl-5">
                                <li>
                                    <strong>Ejecución Contractual:</strong> Gestión de contratos de arrendamiento de ecógrafos, facturación, y cobro de cartera.
                                </li>
                                <li>
                                    <strong>Control Operativo:</strong> Seguimiento y trazabilidad de la maquinaria arrendada, programación de mantenimientos preventivos y logística de entrega/recogida.
                                </li>
                                <li>
                                    <strong>Análisis Comercial:</strong> Estudios de mercado, estadísticas de uso y evaluación de la calidad del servicio.
                                </li>
                                <li>
                                    <strong>Comunicaciones:</strong> Envío de notificaciones vía SMS, email o WhatsApp sobre el estado de sus solicitudes, vencimientos de contratos o novedades del servicio.
                                </li>
                                <li>
                                    <strong>Seguridad:</strong> Verificación de identidad y estudios de crédito para la aprobación de alquileres de equipos de alto valor.
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm border border-yellow-100">
                                <strong>Nota sobre Datos Sensibles:</strong> Para el tratamiento de datos sensibles o de menores de edad, se solicitará siempre autorización previa, expresa e informada, indicando que la respuesta a preguntas sobre estos datos es facultativa.
                            </div>
                        </div>
                    </div>

                    {/* Sección 3: Derechos */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconUserCheck size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">3. Derechos de los Titulares</h2>
                        </div>
                        <div className="text-slate-600 leading-relaxed">
                            <p className="mb-4">
                                Como titular de sus datos personales, usted tiene derecho a:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Acceso y Consulta</strong>
                                    Conocer qué datos suyos estamos tratando de forma gratuita.
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Actualización y Rectificación</strong>
                                    Corregir datos parciales, inexactos o incompletos.
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Supresión</strong>
                                    Solicitar la eliminación de sus datos cuando no exista un deber legal o contractual de conservarlos.
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Revocación</strong>
                                    Revocar la autorización otorgada para el tratamiento de datos.
                                </div>
                            </div>
                            <p>
                                Para ejercer estos derechos, puede enviar su solicitud a través del correo electrónico <strong>info@alquilerdeecografos.com</strong> o mediante nuestra página web. Sus solicitudes (Peticiones, Quejas, Reclamos - PQRS) serán atendidas en un plazo máximo de <strong>10 a 15 días hábiles</strong>.
                            </p>
                            <p className="mt-4 text-sm text-slate-500">
                                Si considera que sus derechos han sido vulnerados, puede acudir a la <strong>Superintendencia de Industria y Comercio (SIC)</strong>. Implementamos medidas de seguridad técnicas, humanas y administrativas estrictas para evitar la adulteración, pérdida, consulta o acceso no autorizado de su información.
                            </p>
                        </div>
                    </div>

                    {/* Sección 4: Procedimiento y Retención */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconClock size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">4. Procedimientos y Retención</h2>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <IconShieldCheck className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <strong className="block text-slate-900">Recolección Autorizada</strong>
                                    <p>Solo recolectamos datos con autorización previa, explícita e informada del titular. Nuestras bases de datos están registradas según aplique en el Registro Nacional de Bases de Datos (RNBD) de la SIC.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <IconLock className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <strong className="block text-slate-900">Periodo de Retención</strong>
                                    <p>Los datos personales se conservarán mientras subsista la relación contractual o comercial. Una vez finalizada:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <li>Datos de clientes/proveedores: Hasta <strong>10 años</strong> post-contractuales por razones contables y fiscales.</li>
                                        <li>Datos laborales: Hasta <strong>30 años</strong> post-contractuales para fines pensionales.</li>
                                    </ul>
                                    <p className="mt-2">Una vez cumplidos estos plazos y finalizadas las finalidades, procederemos a la destrucción segura o anonimización de la información.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección 5: Devoluciones y Cancelaciones */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconFileDescription size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">5. Política de Devoluciones y Cancelaciones</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Entendemos que pueden surgir imprevistos. Nuestra política de cancelaciones y devoluciones busca ser justa tanto para el cliente como para la operatividad de nuestros equipos.
                            </p>
                            <ul className="space-y-3 list-disc pl-5">
                                <li>
                                    <strong>Cancelaciones:</strong> Las reservas pueden cancelarse sin costo hasta <strong>24 horas antes</strong> de la fecha de inicio del alquiler. Cancelaciones con menos de 24 horas de antelación tendrán un cargo administrativo del 20% del valor del primer día de alquiler.
                                </li>
                                <li>
                                    <strong>Devolución Anticipada:</strong> Si decide devolver el equipo antes de finalizar el periodo contratado, se recalculará la tarifa según los días efectivos de uso. No se aplicarán multas, pero se perderán los descuentos por volumen de tiempo si el nuevo periodo no cumple con las condiciones originales.
                                </li>
                                <li>
                                    <strong>Fallas del Equipo:</strong> En el improbable caso de falla técnica no imputable al usuario, reemplazaremos el equipo en el menor tiempo posible (sujeto a disponibilidad) o reembolsaremos el 100% del dinero proporcional a los días no disfrutados.
                                </li>
                                <li>
                                    <strong>Garantía de Satisfacción:</strong> Si al momento de la entrega el equipo no cumple con las especificaciones técnicas acordadas, puede rechazar la recepción y obtener un reembolso completo inmediato.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-slate-500 text-sm">
                            Última actualización: Diciembre 2025
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

import { IconShieldCheck, IconLock, IconFileDescription, IconUserCheck, IconClock, IconBuildingSkyscraper, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export const metadata = {
    title: "Políticas de Privacidad y Devoluciones | Alquiler de Ecógrafos Colombia",
    description: "Política de tratamiento de datos, privacidad y políticas de devolución de Alquiler de Ecógrafos Colombia.",
};

export default function PoliciesPage() {
    return (
        <main className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
                        <IconArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                </div>
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                        Marco Legal Colombiano
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Políticas de Privacidad y <span className="text-blue-600">Devoluciones</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        En cumplimiento de la Ley Estatutaria 1581 de 2012 de Protección de Datos Personales, el Decreto Reglamentario 1377 de 2013 y demás normas que los modifiquen o adicionen, presentamos nuestra política de privacidad para garantizar la protección de sus derechos.
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
                            <p><strong className="text-slate-900">Razón Social:</strong> Alquiler de Ecógrafos Colombia (Respaldado por Equibiomedic)</p>
                            <p><strong className="text-slate-900">Dirección Principal:</strong> Diagonal 47a #17sur-162 CS 105, Santa María de los Ángeles, Medellín, Antioquia</p>
                            <p><strong className="text-slate-900">Email:</strong> info@alquilerdeecografos.com</p>
                            <p><strong className="text-slate-900">Teléfono (WhatsApp):</strong> +57 300 521 2664</p>
                            <p><strong className="text-slate-900">Sitio Web:</strong> alquilerdeecografos.com</p>
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
                                Los datos personales recolectados serán utilizados para los siguientes fines específicos relacionados con nuestro objeto social de alquiler de equipos médicos ecógrafos de marcas como Mindray:
                            </p>
                            <ul className="space-y-3 list-disc pl-5">
                                <li>
                                    <strong>Ejecución Contractual:</strong> Gestión de contratos de arrendamiento de ecógrafos, facturación, y cobro de cartera.
                                </li>
                                <li>
                                    <strong>Control Operativo:</strong> Seguimiento y trazabilidad de los equipos médicos arrendados, programación de mantenimientos preventivos y correctivos, y logística de entrega/recogida.
                                </li>
                                <li>
                                    <strong>Soporte y Capacitación:</strong> Gestión de inducciones y soporte técnico 24/7 sobre el uso de los equipos Mindray Z6 y Z60 u otros rentados.
                                </li>
                                <li>
                                    <strong>Comunicaciones Comerciales:</strong> Envío de notificaciones vía SMS, correo electrónico o WhatsApp sobre el estado de sus reservas, renovaciones o disponibilidad inmediata de equipos.
                                </li>
                                <li>
                                    <strong>Seguridad:</strong> Verificación de identidad y estudios de viabilidad financiera para la entrega de equipos médicos de alto valor.
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm border border-yellow-100">
                                <strong>Tratamiento de Datos Sensibles:</strong> Alquiler de Ecógrafos Colombia no requiere recolectar datos sensibles. En caso de llegar a ser necesario, se solicitará autorización expresa de acuerdo con el artículo 6 de la Ley 1581 de 2012, indicando que las respuestas a preguntas sobre estos datos son enteramente facultativas.
                            </div>
                        </div>
                    </div>

                    {/* Sección 3: Derechos */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconUserCheck size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">3. Derechos de los Titulares (Ley 1581 de 2012)</h2>
                        </div>
                        <div className="text-slate-600 leading-relaxed">
                            <p className="mb-4">
                                Como titular de sus datos personales, en virtud del artículo 8 de la Ley estatutaria, usted tiene derecho a:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Acceso y Consulta</strong>
                                    Conocer, actualizar y rectificar sus datos personales frente a los Responsables o Encargados del Tratamiento.
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Prueba de Autorización</strong>
                                    Solicitar prueba de la autorización otorgada al Responsable del Tratamiento.
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Quejas ante la SIC</strong>
                                    Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <strong className="block text-slate-900 mb-1">Supresión y Revocación</strong>
                                    Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios, derechos y garantías legales.
                                </div>
                            </div>
                            <p>
                                Para ejercer sus derechos (Peticiones, Consultas o Reclamos), puede contactarnos al correo <strong>info@alquilerdeecografos.com</strong>. Toda consulta será atendida en un término máximo de diez (10) días hábiles; los reclamos en quince (15) días hábiles, conforme a lo establecido en los artículos 14 y 15 de la Ley Estatutaria.
                            </p>
                        </div>
                    </div>

                    {/* Sección 4: Procedimiento y Retención */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-lg border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <IconClock size={24} stroke={1.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">4. Retención y Medidas de Seguridad</h2>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <IconShieldCheck className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <strong className="block text-slate-900">Seguridad de la Información</strong>
                                    <p>Adoptamos las medidas técnicas, humanas y administrativas necesarias para otorgar seguridad a los registros y evitar su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento, dando cumplimiento al principio de seguridad de la normativa colombiana.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <IconLock className="text-blue-500" size={20} />
                                </div>
                                <div>
                                    <strong className="block text-slate-900">Periodo de Retención</strong>
                                    <p>Los datos personales se conservarán únicamente durante el tiempo que sea razonable y necesario, de acuerdo con las finalidades que justificaron el tratamiento, atendiendo a las disposiciones legales aplicables (comerciales, contables y tributarias de Colombia), tales como la retención de documentación contable hasta por <strong>10 años</strong>.</p>
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
                            <h2 className="text-2xl font-bold text-slate-900">5. Política de Devoluciones, Soporte y Cancelaciones</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Respaldamos nuestros servicios bajo la normativa del Estatuto del Consumidor (Ley 1480 de 2011) aplicable a servicios y contratos de arrendamiento.
                            </p>
                            <ul className="space-y-3 list-disc pl-5">
                                <li>
                                    <strong>Soporte Técnico Especializado 24/7:</strong> Ante cualquier falla técnica reportada, procedemos con un soporte inicial. En el improbable caso de persistir el inconveniente, reemplazaremos el ecógrafo en el menor tiempo posible, sin costo por reparaciones ordinarias.
                                </li>
                                <li>
                                    <strong>Calidad Garantizada:</strong> Los equipos entregados cuentan con certificación INVIMA e ISO 9001:2015 vigente, asegurando un funcionamiento óptimo en el punto de encuentro en clínicas de Medellín y Colombia.
                                </li>
                                <li>
                                    <strong>Cancelaciones PRE-Envío:</strong> Si cancela la solicitud formal antes de la habilitación o el envío del equipo, se podría cobrar en proporción a los gastos administrativos (verificación crediticia o estudios) generados, si no ha transcurrido el tiempo del derecho de retracto en canales no tradicionales.
                                </li>
                                <li>
                                    <strong>Terminación Anticipada:</strong> Se recalculará la tarifa efectivamente utilizada por la clínica o consultorio, eliminando cualquier beneficio del valor mensual que dependía del tiempo de compromiso, según lo pactado en las cláusulas de arrendamiento firmado.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-slate-500 text-sm">
                            Última actualización: Febrero 2026
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

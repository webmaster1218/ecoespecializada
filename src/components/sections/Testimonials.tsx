import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Testimonials() {
    const testimonials = [
        {
            quote: "La nitidez del Z60 cambió mis diagnósticos a domicilio. El respaldo de Equibiomedic se nota en cada detalle. Muy recomendados.",
            name: "Dr. Carlos Martínez",
            designation: "Ginecólogo Obstetra - Bogotá",
            src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=3540&auto=format&fit=crop"
        },
        {
            quote: "Necesitaba un equipo urgente para una brigada de salud. En 24 horas ya lo tenía en Cali calibrado y listo. Excelente servicio.",
            name: "Dra. Ana M. Torres",
            designation: "Medicina General - Cali",
            src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=3387&auto=format&fit=crop"
        },
        {
            quote: "El modelo de alquiler me permitió iniciar mi consultorio privado sin endeudarme con los bancos. Los equipos están como nuevos.",
            name: "Dr. Jorge Valencia",
            designation: "Radiólogo - Medellín",
            src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=3464&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-20 bg-gray-50" id="testimonios">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm uppercase tracking-wider text-blue-600 font-semibold">Testimonios</span>
                    <h2 className="text-4xl font-bold mt-2 mb-4">
                        Lo que dicen <span className="text-gradient">tus colegas</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Profesionales de la salud que confían en nuestros equipos para brindar el mejor diagnóstico.
                    </p>
                </div>
                <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
        </section>
    );
}

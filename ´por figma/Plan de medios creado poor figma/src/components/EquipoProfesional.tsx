import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Linkedin, Mail } from "lucide-react";

export function EquipoProfesional() {
  const profesionales = [
    {
      nombre: "María González",
      rol: "Director de Contenidos",
      imagen: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzAyMzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      linkedin: "#",
      email: "mgonzalez@plandemedios.cl"
    },
    {
      nombre: "Carlos Mendoza",
      rol: "Jefe de Producción Audiovisual",
      imagen: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzAyMzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      linkedin: "#",
      email: "cmendoza@plandemedios.cl"
    },
    {
      nombre: "Andrea Silva",
      rol: "Estratega de Medios",
      imagen: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzAyMzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      linkedin: "#",
      email: "asilva@plandemedios.cl"
    },
  ];

  return (
    <section id="equipo" className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
            <span className="text-xs tracking-widest uppercase text-teal-400">
              Profesionales expertos en contenido y comunicación
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
          </div>
          <h2 className="text-5xl md:text-6xl tracking-tight text-white mb-6">
            Conecta con un equipo especializado
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Un equipo con experiencia real en contenido, medios, comunicación estratégica 
            y producción audiovisual.
          </p>
        </div>

        {/* Grid de Profesionales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {profesionales.map((p, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Imagen */}
                <div className="relative w-full h-80 lg:h-96 overflow-hidden">
                  <ImageWithFallback
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Social links overlay - appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={p.linkedin}
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      aria-label={`LinkedIn de ${p.nombre}`}
                    >
                      <Linkedin size={20} className="text-white" />
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      aria-label={`Email de ${p.nombre}`}
                    >
                      <Mail size={20} className="text-white" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 bg-gradient-to-b from-slate-900/50 to-slate-950/90 backdrop-blur-sm">
                  <h3 className="text-xl text-white mb-2">
                    {p.nombre}
                  </h3>
                  <p className="text-sm text-teal-400 uppercase tracking-wide">
                    {p.rol}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="mt-4 h-px w-12 bg-gradient-to-r from-teal-500 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA adicional */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl text-white">¿Quieres trabajar con nosotros?</h3>
            <p className="text-gray-400 max-w-md">
              Estamos siempre buscando talento para unirse a nuestro equipo de profesionales
            </p>
            <a
              href="mailto:rrhh@plandemedios.cl"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all"
            >
              <Mail size={18} />
              Envía tu CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

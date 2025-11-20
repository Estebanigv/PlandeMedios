import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const platforms = [
  {
    name: "TOUR GRAPHIC",
    tagline: "Gran Formato Digital",
    description: "Especialistas en publicidad digital de gran formato. Diseñamos, distribuimos e instalamos pantallas LED y soluciones de vía pública a nivel nacional.",
    features: [
      "Diseño creativo de alto impacto",
      "Distribución estratégica",
      "Instalación nacional",
      "Gestión integral de campañas"
    ],
    image: "https://images.unsplash.com/photo-1629150154933-a42577786d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBiaWxsYm9hcmQlMjBhZHZlcnRpc2luZ3xlbnwxfHx8fDE3NjMwODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "TOUR MOTOR",
    tagline: "Plataforma Automotriz",
    description: "Plataforma audiovisual especializada en el sector automotor. Producción eficiente y de bajo costo con difusión en múltiples medios digitales y tradicionales.",
    features: [
      "Contenido audiovisual especializado",
      "Cobertura de eventos automotrices",
      "Difusión multicanal",
      "Producción eficiente"
    ],
    image: "https://images.unsplash.com/photo-1636446704248-87d51e963e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjMwODEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-gray-700 to-gray-900"
  },
  {
    name: "TOUR INNOVACIÓN",
    tagline: "Contenido Tech & Startups",
    description: "Contenido audiovisual y editorial enfocado en innovación, tecnología y emprendimiento. Difundimos el desarrollo y avance de la innovación en Chile y Latinoamérica.",
    features: [
      "Cobertura de innovación y tecnología",
      "Contenido editorial especializado",
      "Videos y documentales tech",
      "Ecosistema startup"
    ],
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjI5NzkwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-emerald-600 to-teal-700"
  }
];

export function Platforms() {
  return (
    <section id="plataformas" className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-teal-400 to-transparent" />
            <span className="text-sm uppercase tracking-wider text-teal-400">Nuestras Plataformas</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white tracking-tight">
            Contenido Especializado por Industria
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Tres plataformas verticales enfocadas en entregar contenido de calidad 
            y valor para audiencias específicas.
          </p>
        </div>

        {/* Platforms */}
        <div className="space-y-12">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content */}
                <div className={`p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br ${platform.color} ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="text-white/80 mb-2">{platform.tagline}</div>
                      <h3 className="text-white mb-4">
                        {platform.name}
                      </h3>
                    </div>

                    <p className="text-white/90 text-lg leading-relaxed">
                      {platform.description}
                    </p>

                    <ul className="space-y-3">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/90">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black w-fit mt-4"
                    >
                      Conocer más
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative h-96 lg:h-auto ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <ImageWithFallback
                    src={platform.image}
                    alt={platform.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
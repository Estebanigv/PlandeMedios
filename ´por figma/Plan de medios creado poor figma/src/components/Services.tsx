import { Video, FileText, Monitor, Share2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Video,
    title: "Contenido Audiovisual",
    description: "Producción de video profesional para múltiples plataformas. Desde spots publicitarios hasta contenido orgánico para redes sociales.",
    features: ["Spots publicitarios", "Contenido para RRSS", "Videos corporativos", "Streaming en vivo"]
  },
  {
    icon: FileText,
    title: "Contenido Editorial",
    description: "Creación de contenido escrito estratégico que posiciona marcas y genera conversaciones relevantes con tu audiencia.",
    features: ["Artículos de marca", "Notas de prensa", "Contenido web", "Newsletters"]
  },
  {
    icon: Monitor,
    title: "Gran Formato Digital",
    description: "Diseño y distribución de publicidad en pantallas LED y gran formato. Instalación y gestión a nivel nacional.",
    features: ["Pantallas LED", "Vía pública", "Diseño creativo", "Instalación nacional"]
  },
  {
    icon: Share2,
    title: "Distribución y Medios",
    description: "Estrategia de distribución multicanal para maximizar el alcance y engagement de tu contenido.",
    features: ["Planificación de medios", "Distribución digital", "RRSS estratégicas", "Medios tradicionales"]
  },
  {
    icon: TrendingUp,
    title: "Estrategia de Comunicación",
    description: "Consultoría integral en comunicación y marketing para marcas que buscan impacto y resultados medibles.",
    features: ["Estrategia de marca", "Marketing digital", "Análisis de audiencia", "Medición de resultados"]
  }
];

export function Services() {
  return (
    <section id="servicios" className="relative py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-50 to-teal-50 rounded-full blur-3xl opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-teal-600 to-transparent" />
            <span className="text-sm uppercase tracking-wider text-teal-600">Nuestros Servicios</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900 tracking-tight">
            Generación de Contenido en Diferentes Formatos
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ofrecemos soluciones integrales de contenido y comunicación, 
            adaptadas a las necesidades de tu marca y audiencia.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="text-white" size={28} />
                </div>
                
                <h3 className="mb-4">{service.title}</h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
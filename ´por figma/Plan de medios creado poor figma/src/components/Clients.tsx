import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink } from "lucide-react";

const clients = [
  {
    name: "Startup Tech A",
    category: "Tecnología",
    project: "Campaña de lanzamiento multiplataforma",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjI5NzkwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Fintech Innovadora",
    category: "Finanzas",
    project: "Contenido editorial y video marketing",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzYzMDgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "E-commerce Leader",
    category: "Retail",
    project: "Estrategia de contenido y RRSS",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyOTY4Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Health Tech",
    category: "Salud",
    project: "Comunicación integral y PR digital",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjI5NzkwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Green Energy Corp",
    category: "Energía",
    project: "Producción audiovisual y distribución",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjI5NzkwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "EdTech Platform",
    category: "Educación",
    project: "Contenido educativo y marketing digital",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzYzMDgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Clients() {
  return (
    <section id="clientes" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-black text-white rounded-full">
            Casos de Éxito
          </div>
          <h2 className="mb-6">
            Clientes TOUR INNOVACIÓN
          </h2>
          <p className="text-xl text-gray-600">
            Empresas de tecnología, innovación y emprendimiento que confían 
            en nuestra plataforma para amplificar su mensaje.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <Card 
              key={index}
              className="group border-0 shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <ImageWithFallback
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm">{client.category}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h4 className="mb-2">{client.name}</h4>
                <p className="text-gray-600">
                  {client.project}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            ¿Quieres ser parte de nuestros casos de éxito?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById("contacto");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="underline hover:text-black transition-colors"
          >
            Conversemos sobre tu proyecto
          </button>
        </div>
      </div>
    </section>
  );
}

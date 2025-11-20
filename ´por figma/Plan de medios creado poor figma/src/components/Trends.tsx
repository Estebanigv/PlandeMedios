import { ArrowRight, Mic, Video, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const trends = [
  {
    category: "Comunicación Digital",
    title: "Canales Digitales y Nueva Comunicación",
    excerpt: "Cómo las marcas están adaptando sus estrategias de comunicación a los nuevos canales digitales emergentes.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzYzMDgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles
  },
  {
    category: "Metaverso",
    title: "Sociedad del Metaverso: Nuevas Oportunidades",
    excerpt: "El metaverso como plataforma de comunicación y engagement para marcas que buscan innovar.",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjI5NzkwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles
  },
  {
    category: "Marketing",
    title: "Eficiencia en Marketing & Publicidad",
    excerpt: "Estrategias para optimizar presupuestos y maximizar ROI en campañas digitales y tradicionales.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyOTY4Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles
  },
  {
    category: "Branding",
    title: "Promesa de Marca y Confianza",
    excerpt: "La importancia de construir y mantener la confianza de los consumidores en un mercado saturado.",
    image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBtYWdhemluZXxlbnwxfHx8fDE3NjMwMDgyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles
  },
  {
    category: "Cultura Digital",
    title: "Comunicación de Marca en la Era del Meme",
    excerpt: "Cómo las marcas están usando memes y cultura digital para conectar con audiencias jóvenes.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzYzMDgxMjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles
  },
  {
    category: "E-commerce",
    title: "Valoración de la Marca en E-commerce",
    excerpt: "Estrategias para destacar y generar valor de marca en plataformas de comercio electrónico.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyOTY4Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: ShoppingCart
  },
  {
    category: "Audio Marketing",
    title: "Podcast: Definición y Crecimiento",
    excerpt: "El auge de los podcasts como medio de contenido y marketing para marcas B2B y B2C.",
    image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBtYWdhemluZXxlbnwxfHx8fDE3NjMwMDgyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Mic
  },
  {
    category: "Video Marketing",
    title: "Uso de Videos en Marketing B2B",
    excerpt: "Cómo el contenido audiovisual se ha convertido en herramienta esencial para el marketing corporativo.",
    image: "https://images.unsplash.com/photo-1762761655348-57ae89875ee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB2aWRlbyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzYzMDgxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Video
  }
];

export function Trends() {
  return (
    <section id="tendencias" className="relative py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-teal-100/30 to-emerald-100/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-teal-600 to-transparent" />
            <span className="text-sm uppercase tracking-wider text-teal-600">Insights & Tendencias</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900 tracking-tight">
            Contenido Editorial sobre Marketing y Comunicación
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Exploramos las tendencias que están transformando la comunicación, 
            el marketing y los medios digitales.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-black">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-96 lg:h-auto">
                <ImageWithFallback
                  src={trends[0].image}
                  alt={trends[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-12 lg:p-16 flex flex-col justify-center text-white">
                <div className="text-white/60 mb-4">{trends[0].category}</div>
                <h3 className="text-white mb-6">
                  {trends[0].title}
                </h3>
                <p className="text-white/80 text-lg mb-8">
                  {trends[0].excerpt}
                </p>
                <button className="flex items-center gap-2 text-white hover:gap-4 transition-all">
                  Leer artículo
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trends Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trends.slice(1).map((trend, index) => (
            <Card 
              key={index} 
              className="group border-0 shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={trend.image}
                  alt={trend.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm">{trend.category}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h4 className="mb-3">{trend.title}</h4>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {trend.excerpt}
                </p>
                <button className="flex items-center gap-2 text-black group-hover:gap-4 transition-all">
                  Leer más
                  <ArrowRight size={18} />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
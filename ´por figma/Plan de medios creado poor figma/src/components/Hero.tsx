import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm tracking-wide uppercase text-teal-300 font-medium">
                Agencia de contenidos y planificación de medios
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
              Contenido y medios que{" "}
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                conectan marcas
              </span>{" "}
              con audiencias reales
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Diseñamos, producimos y distribuimos contenido multiformato para marcas que necesitan 
              presencia en múltiples plataformas: gran formato, audiovisual, digital y editorial.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200">Planificación de medios + generación de contenido</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200">Plataformas especializadas: Tour Graphic, Tour Motor, Tour Innovación</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200">Estrategia, producción y distribución en un solo equipo</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <PrimaryButton
                onClick={() => scrollToSection("contacto")}
              >
                Agenda una reunión
                <ArrowRight className="w-5 h-5" />
              </PrimaryButton>
              <SecondaryButton
                onClick={() => scrollToSection("plataformas")}
              >
                Ver plataformas de contenido
              </SecondaryButton>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-sm">+10 años en contenidos y medios</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm">Clientes en sectores automotor, innovación y retail</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Composition */}
          <div className="order-1 lg:order-2 relative">
            {/* Glow effect behind cards */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 blur-3xl scale-110" />
            
            {/* Main Grid */}
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
              {/* Tour Graphic - Large Featured Card */}
              <div className="col-span-2 relative group">
                {/* Glassmorphic container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-500/10 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759548845680-8fb15e1f95e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYmlsbGJvYXJkJTIwY2l0eXNjYXBlJTIwbmlnaHR8ZW58MXx8fHwxNzYzMDgyODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tour Graphic - Gran Formato Digital"
                    className="w-full h-72 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-900/50 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full mb-4 w-fit shadow-lg">
                      <div className="w-2 h-2 bg-teal-600 rounded-full" />
                      <span className="text-xs uppercase tracking-wider">Tour Graphic</span>
                    </div>
                    <h3 className="text-white text-2xl lg:text-3xl mb-2">Gran Formato Digital</h3>
                    <p className="text-teal-200 text-sm">Pantallas LED y contenido para espacios públicos</p>
                  </div>
                </div>
                
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>

              {/* Tour Motor */}
              <div className="relative group">
                <div className="relative rounded-xl overflow-hidden shadow-xl shadow-slate-500/10 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1665491641078-1f8b275c8108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzMDY0NDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tour Motor"
                    className="w-full h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full mb-3 w-fit shadow-lg">
                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                      <span className="text-xs uppercase tracking-wider">Tour Motor</span>
                    </div>
                    <h4 className="text-white text-lg lg:text-xl mb-1">Sector Automotor</h4>
                    <p className="text-slate-300 text-xs">Contenido especializado</p>
                  </div>
                </div>
                
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-500/20 to-slate-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>

              {/* Tour Innovación */}
              <div className="relative group">
                <div className="relative rounded-xl overflow-hidden shadow-xl shadow-emerald-500/10 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1761123261084-53c40fe1e607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwd29ya3NwYWNlJTIwbW9uaXRvcnxlbnwxfHx8fDE3NjMwODI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tour Innovación"
                    className="w-full h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full mb-3 w-fit shadow-lg">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      <span className="text-xs uppercase tracking-wider">Tour Innovación</span>
                    </div>
                    <h4 className="text-white text-lg lg:text-xl mb-1">Tech & Startups</h4>
                    <p className="text-emerald-200 text-xs">Innovación y tendencias</p>
                  </div>
                </div>
                
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Bottom fade edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

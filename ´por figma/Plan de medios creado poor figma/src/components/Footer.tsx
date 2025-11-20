import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Glow suave arriba del footer */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-[60%] -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Marca + descripción */}
          <div className="md:col-span-2 space-y-5">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                <span className="text-sm tracking-tight text-white">
                  PM
                </span>
              </div>
              <span className="text-sm tracking-[0.14em] text-white uppercase">
                Plan de Medios
              </span>
            </button>
            
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Agencia de contenidos y planificación de medios. Diseñamos,
              producimos y distribuimos contenido multiformato para marcas
              que necesitan presencia en múltiples plataformas.
            </p>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-[11px] tracking-[0.16em] text-teal-400 uppercase">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              <span>Contenido · Medios · Innovación</span>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 rounded-lg flex items-center justify-center transition-all group"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.16em] text-teal-400 uppercase">
              Navegación
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-left hover:text-white transition-colors group flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-gray-600 group-hover:bg-teal-400 rounded-full transition-colors" />
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("plataformas")}
                className="text-left hover:text-white transition-colors group flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-gray-600 group-hover:bg-teal-400 rounded-full transition-colors" />
                Plataformas
              </button>
              <button
                onClick={() => scrollToSection("tendencias")}
                className="text-left hover:text-white transition-colors group flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-gray-600 group-hover:bg-teal-400 rounded-full transition-colors" />
                Tendencias
              </button>
              <button
                onClick={() => scrollToSection("equipo")}
                className="text-left hover:text-white transition-colors group flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-gray-600 group-hover:bg-teal-400 rounded-full transition-colors" />
                Equipo profesional
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-left hover:text-white transition-colors group flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-gray-600 group-hover:bg-teal-400 rounded-full transition-colors" />
                Contáctanos
              </button>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.16em] text-teal-400 uppercase">
              Contacto
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-teal-400" />
                </div>
                <a
                  href="mailto:contacto@plandemedios.cl"
                  className="hover:text-white transition-colors"
                >
                  contacto@plandemedios.cl
                </a>
              </div>
              <div className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-teal-400" />
                </div>
                <a
                  href="tel:+56900000000"
                  className="hover:text-white transition-colors"
                >
                  +56 9 0000 0000
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-teal-400" />
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Santiago, Chile<br />
                  <span className="text-xs text-gray-500">Operación en múltiples regiones</span>
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contacto")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-700 px-4 py-2.5 text-xs text-white hover:shadow-lg hover:shadow-teal-500/30 transition-all group"
            >
              Agenda una reunión
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Plan de Medios. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <button className="hover:text-gray-300 transition-colors">
              Política de privacidad
            </button>
            <span className="text-gray-700">·</span>
            <button className="hover:text-gray-300 transition-colors">
              Términos de uso
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

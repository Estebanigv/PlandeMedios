import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                <span className="text-white">PM</span>
              </div>
              <span className="tracking-tight text-white">PLAN DE MEDIOS</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("plataformas")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Plataformas
            </button>
            <button
              onClick={() => scrollToSection("tendencias")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Tendencias
            </button>
            <button
              onClick={() => scrollToSection("equipo")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Equipo
            </button>
            <Button 
              onClick={() => scrollToSection("contacto")}
              className="bg-black hover:bg-gray-800"
            >
              Contacto
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-white/10">
            <button
              onClick={() => scrollToSection("servicios")}
              className="block w-full text-left py-2 text-gray-300 hover:text-white"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("plataformas")}
              className="block w-full text-left py-2 text-gray-300 hover:text-white"
            >
              Plataformas
            </button>
            <button
              onClick={() => scrollToSection("tendencias")}
              className="block w-full text-left py-2 text-gray-300 hover:text-white"
            >
              Tendencias
            </button>
            <button
              onClick={() => scrollToSection("equipo")}
              className="block w-full text-left py-2 text-gray-300 hover:text-white"
            >
              Equipo
            </button>
            <Button 
              onClick={() => scrollToSection("contacto")}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white"
            >
              Contacto
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
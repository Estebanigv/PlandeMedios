import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log("Form submitted:", formData);
    alert("¡Gracias por contactarnos! Te responderemos pronto.");
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const whatsappNumber = "+56912345678";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría conocer más sobre sus servicios");

  return (
    <section id="contacto" className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
            <span className="text-sm uppercase tracking-wider text-teal-400">Contacto</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white tracking-tight">
            Conversemos sobre tu Proyecto
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Estamos listos para ayudarte a crear contenido que conecte con tu audiencia. 
            Contáctanos y descubre cómo podemos potenciar tu marca.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-300">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-300">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block mb-2 text-gray-300">
                    Empresa
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-gray-300">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-300">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full min-h-32 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all">
                Enviar mensaje
                <Send className="ml-2" size={18} />
              </Button>
            </form>

            {/* WhatsApp Button */}
            <div className="mt-8">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-green-500/50 bg-white/5 text-green-400 hover:bg-green-500/10 hover:border-green-400"
                >
                  <Phone className="mr-2" size={18} />
                  Contactar por WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="mb-2 text-white">Email</h4>
                    <p className="text-gray-400">contacto@plandemedios.cl</p>
                    <p className="text-gray-400">ventas@plandemedios.cl</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="mb-2 text-white">Teléfono</h4>
                    <p className="text-gray-400">+56 2 1234 5678</p>
                    <p className="text-gray-400">+56 9 8765 4321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="mb-2 text-white">Oficina</h4>
                    <p className="text-gray-400">
                      Av. Providencia 1234, Of. 567<br />
                      Providencia, Santiago<br />
                      Chile
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <h4 className="mb-4 text-white">Horarios de Atención</h4>
                <div className="space-y-2 text-gray-400">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
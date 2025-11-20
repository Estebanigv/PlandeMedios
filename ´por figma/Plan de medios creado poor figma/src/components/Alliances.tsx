export function Alliances() {
  const alliances = [
    { name: "Google", color: "text-gray-800" },
    { name: "Meta", color: "text-blue-600" },
    { name: "Amazon AWS", color: "text-orange-600" },
    { name: "Microsoft", color: "text-blue-700" },
    { name: "Adobe", color: "text-red-600" },
    { name: "Salesforce", color: "text-blue-500" },
    { name: "HubSpot", color: "text-orange-500" },
    { name: "LinkedIn", color: "text-blue-700" },
    { name: "Twitter", color: "text-blue-400" },
    { name: "YouTube", color: "text-red-600" },
    { name: "Spotify", color: "text-green-600" },
    { name: "TikTok", color: "text-black" }
  ];

  return (
    <section id="alianzas" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-black text-white rounded-full">
            Alianzas Estratégicas
          </div>
          <h2 className="mb-6">
            Trabajamos con las Mejores Plataformas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Colaboramos con líderes tecnológicos y de medios para ofrecer 
            soluciones integrales a nuestros clientes.
          </p>
        </div>

        {/* Alliances Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {alliances.map((alliance, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              <span className={`text-center ${alliance.color} group-hover:scale-110 transition-transform`}>
                {alliance.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            ¿Quieres ser nuestro aliado estratégico?{" "}
            <button className="underline hover:text-black transition-colors">
              Hablemos
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

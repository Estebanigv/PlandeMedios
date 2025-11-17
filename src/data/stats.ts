/**
 * Statistics Configuration
 * Centralized statistics for hero section and other data displays
 */

export interface Stat {
  number: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
  description?: string;
}

export interface StatsConfig {
  hero: Stat[];
  company?: Stat[];
  performance?: Stat[];
}

export const statsConfig: StatsConfig = {
  // Hero section stats
  hero: [
    {
      number: 3,
      label: "Plataformas Especializadas",
      description: "Tour Graphic, Tour Motor y Tour Innovación"
    },
    {
      number: 100,
      suffix: "+",
      label: "Proyectos Realizados",
      description: "Proyectos exitosos entregados a nuestros clientes"
    },
    {
      number: 10,
      suffix: "+",
      label: "Años de Experiencia",
      description: "Años de trayectoria en el mercado"
    }
  ],

  // Company stats (optional - can be used in other sections)
  company: [
    {
      number: 50,
      suffix: "+",
      label: "Clientes Satisfechos",
      description: "Empresas que confían en nuestros servicios"
    },
    {
      number: 15,
      label: "Profesionales",
      description: "Equipo especializado en diferentes áreas"
    },
    {
      number: 98,
      suffix: "%",
      label: "Tasa de Satisfacción",
      description: "Clientes que recomendarían nuestros servicios"
    }
  ],

  // Performance stats (optional)
  performance: [
    {
      number: 200,
      suffix: "+",
      label: "Contenidos Creados",
      description: "Piezas de contenido producidas mensualmente"
    },
    {
      number: 24,
      suffix: "/7",
      label: "Soporte",
      description: "Disponibilidad para nuestros clientes premium"
    },
    {
      number: 5,
      label: "Días Promedio",
      description: "Tiempo de entrega de proyectos estándar"
    }
  ]
};

// Export for convenience
export const heroStats = statsConfig.hero;
export const companyStats = statsConfig.company;
export const performanceStats = statsConfig.performance;

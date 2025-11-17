/**
 * Team Configuration
 * Centralized team information, values, and company culture
 */

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  specialties?: string[];
}

export interface CompanyValue {
  title: string;
  description: string;
  icon?: string;
}

export interface TeamConfig {
  members: TeamMember[];
  values: CompanyValue[];
  culture: {
    mission: string;
    vision: string;
    motto?: string;
  };
}

export const teamConfig: TeamConfig = {
  // Team members
  members: [
    {
      name: "Juan Pérez",
      role: "Director Creativo",
      bio: "Con más de 10 años de experiencia en diseño gráfico y dirección creativa.",
      image: "/team/juan-perez.jpg",
      social: {
        linkedin: "https://linkedin.com/in/juanperez",
        email: "juan@plandemedios.com"
      },
      specialties: ["Diseño Gráfico", "Branding", "Dirección de Arte"]
    },
    {
      name: "María González",
      role: "Directora de Estrategia Digital",
      bio: "Especialista en marketing digital y estrategias de contenido.",
      image: "/team/maria-gonzalez.jpg",
      social: {
        linkedin: "https://linkedin.com/in/mariagonzalez",
        email: "maria@plandemedios.com"
      },
      specialties: ["Marketing Digital", "Estrategia de Contenido", "SEO"]
    },
    {
      name: "Carlos Rodríguez",
      role: "Director de Innovación",
      bio: "Experto en tecnologías emergentes y soluciones innovadoras.",
      image: "/team/carlos-rodriguez.jpg",
      social: {
        linkedin: "https://linkedin.com/in/carlosrodriguez",
        email: "carlos@plandemedios.com"
      },
      specialties: ["Innovación Digital", "IA", "Automatización"]
    }
  ],

  // Company values
  values: [
    {
      title: "Creatividad",
      description: "Innovamos constantemente para ofrecer soluciones únicas y efectivas.",
      icon: "lightbulb"
    },
    {
      title: "Calidad",
      description: "Nos comprometemos con la excelencia en cada proyecto que realizamos.",
      icon: "star"
    },
    {
      title: "Colaboración",
      description: "Trabajamos en equipo con nuestros clientes para alcanzar objetivos comunes.",
      icon: "users"
    },
    {
      title: "Innovación",
      description: "Utilizamos las últimas tecnologías para mantenernos a la vanguardia.",
      icon: "rocket"
    },
    {
      title: "Compromiso",
      description: "Nos dedicamos al éxito de cada proyecto con pasión y profesionalismo.",
      icon: "heart"
    },
    {
      title: "Resultados",
      description: "Enfocados en generar impacto medible y valor real para nuestros clientes.",
      icon: "chart"
    }
  ],

  // Company culture
  culture: {
    mission: "Transformar ideas en experiencias visuales impactantes que generen resultados medibles para nuestros clientes.",
    vision: "Ser la agencia de referencia en generación de contenido multiplataforma, reconocida por nuestra creatividad, innovación y resultados excepcionales.",
    motto: "Transformamos ideas en experiencias visuales impactantes"
  }
};

// Export for convenience
export const teamMembers = teamConfig.members;
export const companyValues = teamConfig.values;
export const companyCulture = teamConfig.culture;

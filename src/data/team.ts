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
      name: "José Luis Andraca",
      role: "Gerente General",
      bio: "Líder con amplia trayectoria en medios y comunicación de marca.",
      image: "/images/Equipo/JoseAndraca.jpeg",
      social: {
        email: "joseluis.andraca@plandemedios.cl"
      }
    },
    {
      name: "Romina Andraca",
      role: "Administración y Finanzas",
      bio: "Gestión administrativa y financiera de la empresa.",
      image: "/images/Equipo/RominaAndraca.jpeg",
      social: {
        email: "romina.andraca@plandemedios.cl"
      }
    },
    {
      name: "Hortencia Fritz",
      role: "Editora General",
      bio: "Especialista en contenido editorial y gestión de proyectos de innovación.",
      image: "/images/Equipo/HortenciaFritz.jpeg",
      social: {
        email: "hortencia.fritz@plandemedios.cl"
      }
    },
    {
      name: "César Olate",
      role: "Realizador Audiovisual",
      bio: "Profesional en producción y realización de contenido audiovisual.",
      image: "/images/Equipo/CesarOlate.png",
      social: {
        email: "cesar.olate@plandemedios.cl"
      }
    },
    {
      name: "Jaime San Martín",
      role: "Realizador Audiovisual",
      bio: "Especialista en producción audiovisual y dirección de contenido.",
      image: "/images/Equipo/Jaime San Martín.jpeg",
      social: {
        email: "jaime.sanmartin@plandemedios.cl"
      }
    },
    {
      name: "Viviana Carrillo",
      role: "Diseño y Redes Sociales",
      bio: "Especialista en diseño visual y gestión de redes sociales.",
      image: "/images/Equipo/VivianaCarrillo.png",
      social: {
        email: "viviana.carrillo@plandemedios.cl"
      }
    },
    {
      name: "Sandra Andraca",
      role: "Marketing de Contenidos",
      bio: "Creación y gestión de estrategias de contenido para marcas.",
      image: "/images/Equipo/SandraAndraca.png",
      social: {
        email: "Sandra.andraca@plandemedios.cl"
      }
    },
    {
      name: "Verónica Gómez",
      role: "Marketing de Contenidos",
      bio: "Especialista en marketing de contenidos y estrategia digital.",
      image: "/images/Equipo/VeronicaGomez.jpeg",
      social: {
        email: "veronica.gomez@plandemedios.cl"
      }
    },
    {
      name: "Jessica Rivas",
      role: "Área Gráfica Digital",
      bio: "Diseñadora especializada en formatos digitales y grandes formatos.",
      image: "/images/Equipo/Jessica Rivas.jpeg",
      social: {
        email: "jessica.rivas@plandemedios.cl"
      }
    },
    {
      name: "Diego Bustamante",
      role: "Analista de Operaciones",
      bio: "Gestión y optimización de operaciones y procesos.",
      image: "/images/Equipo/Diego Bustamante.png",
      social: {
        email: "diego.bustamante@plandemedios.cl"
      }
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
    mission: "Desarrollar contenidos relevantes y transformadores para las audiencias de hoy, en alianza con los medios.",
    vision: "Ser la empresa de referencia en desarrollo de contenido audiovisual, editorial y publicitario, conectando marcas con sus audiencias de manera efectiva.",
    motto: "Comunicación de marca para las audiencias actuales"
  }
};

// Export for convenience
export const teamMembers = teamConfig.members;
export const companyValues = teamConfig.values;
export const companyCulture = teamConfig.culture;

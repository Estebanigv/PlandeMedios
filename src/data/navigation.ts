/**
 * Navigation Configuration
 * Centralized navigation items for header, footer, and other navigation elements
 */

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
  children?: NavItem[];
}

export interface NavigationConfig {
  main: NavItem[];
  footer: {
    quickLinks: NavItem[];
    services: NavItem[];
  };
}

export const navigationConfig: NavigationConfig = {
  // Main navigation (Header)
  main: [
    {
      name: "Inicio",
      href: "#inicio",
      ariaLabel: "Ir a la sección de inicio"
    },
    {
      name: "Servicios",
      href: "#servicios",
      ariaLabel: "Ver nuestros servicios"
    },
    {
      name: "Equipo",
      href: "#equipo",
      ariaLabel: "Conocer a nuestro equipo"
    },
    {
      name: "Alianzas",
      href: "#alianzas",
      ariaLabel: "Ver nuestras alianzas estratégicas"
    },
    {
      name: "Clientes",
      href: "#clientes",
      ariaLabel: "Ver nuestros clientes"
    },
    {
      name: "Tendencias",
      href: "#tendencias",
      ariaLabel: "Explorar tendencias del mercado"
    },
    {
      name: "Contacto",
      href: "#contacto",
      ariaLabel: "Contactar con nosotros"
    }
  ],

  // Footer navigation
  footer: {
    quickLinks: [
      {
        name: "Servicios",
        href: "#servicios"
      },
      {
        name: "Equipo",
        href: "#equipo"
      },
      {
        name: "Tendencias",
        href: "#tendencias"
      },
      {
        name: "Contacto",
        href: "#contacto"
      }
    ],
    services: [
      {
        name: "Tour Graphic",
        href: "#tour-graphic"
      },
      {
        name: "Tour Motor",
        href: "#tour-motor"
      },
      {
        name: "Tour Innovación",
        href: "#tour-innovacion"
      }
    ]
  }
};

// Export for convenience
export const { main: mainNav, footer: footerNav } = navigationConfig;

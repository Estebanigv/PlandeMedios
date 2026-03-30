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
  // Main navigation (Header) — según sitemap propuesto
  main: [
    {
      name: "Inicio",
      href: "#inicio",
      ariaLabel: "Ir a la sección de inicio"
    },
    {
      name: "Equipo",
      href: "#equipo",
      ariaLabel: "Conocer a nuestro equipo"
    },
    {
      name: "Servicios",
      href: "#servicios",
      ariaLabel: "Ver nuestros servicios"
    },
    {
      name: "Cifras",
      href: "#cifras",
      ariaLabel: "Ver nuestras cifras y clientes"
    },
    {
      name: "Noticias",
      href: "#noticias",
      ariaLabel: "Ver últimas noticias"
    }
  ],

  // Footer navigation
  footer: {
    quickLinks: [
      {
        name: "Equipo",
        href: "#equipo"
      },
      {
        name: "Servicios",
        href: "#servicios"
      },
      {
        name: "Noticias",
        href: "#noticias"
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
        name: "Tour Innovación",
        href: "#tour-innovacion"
      }
    ]
  }
};

// Export for convenience
export const { main: mainNav, footer: footerNav } = navigationConfig;

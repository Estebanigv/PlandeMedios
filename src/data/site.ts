/**
 * Site Configuration
 * Centralized configuration for site-wide information
 */

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  ogImage: string;
  author: string;
  language: string;
  locale: string;
  contact: ContactInfo;
  businessHours: BusinessHours;
  legal: LegalInfo;
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneFormatted: string;
  address: {
    street?: string;
    city: string;
    country: string;
    full: string;
  };
}

export interface BusinessHours {
  weekdays: string;
  weekdaysDetailed?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  };
  weekend?: string;
  timezone?: string;
}

export interface LegalInfo {
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  cookiePolicyUrl?: string;
  companyName?: string;
  taxId?: string;
}

export const siteConfig: SiteConfig = {
  name: "Plan de Medios",
  tagline: "Comunicación de marca para las audiencias actuales",
  // Meta description: 155 chars, keywords principales incluidos
  description: "Agencia de contenido audiovisual y planificación de medios en Chile. Tour Innovación en CNN Chile, T13, Canal 13C, Mega 2 y Emol TV. Tour Graphic en grandes formatos.",
  url: process.env.PUBLIC_SITE_URL || "https://www.plandemedios.cl",
  logo: "/logo-plandemedios.png",
  ogImage: "/og-image.png",
  author: "Plan de Medios",
  language: "es",
  locale: "es_CL",

  contact: {
    email: process.env.PUBLIC_CONTACT_EMAIL || "contacto@plandemedios.cl",
    phone: process.env.PUBLIC_CONTACT_PHONE || "+56977771499",
    phoneFormatted: process.env.PUBLIC_CONTACT_PHONE_FORMATTED || "+56 9 7777 1499",
    address: {
      street: process.env.PUBLIC_ADDRESS_STREET,
      city: process.env.PUBLIC_ADDRESS_CITY || "Santiago",
      country: process.env.PUBLIC_ADDRESS_COUNTRY || "CL",
      full: process.env.PUBLIC_ADDRESS_FULL || "Santiago, Chile"
    }
  },

  businessHours: {
    weekdays: "Lunes a Viernes: 9:00 - 18:00",
    weekdaysDetailed: {
      monday: "9:00 - 18:00",
      tuesday: "9:00 - 18:00",
      wednesday: "9:00 - 18:00",
      thursday: "9:00 - 18:00",
      friday: "9:00 - 18:00"
    },
    weekend: "Cerrado",
    timezone: "America/Santiago"
  },

  legal: {
    privacyPolicyUrl: "/politica-privacidad",
    termsOfServiceUrl: "/terminos-servicio",
    companyName: "Plan de Medios"
  }
};

// Export individual properties for convenience
export const { name, tagline, description, url, contact, businessHours } = siteConfig;

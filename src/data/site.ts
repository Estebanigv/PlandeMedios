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
  tagline: "Contenido y medios que conectan marcas con audiencias reales",
  description: "Estrategia integral de contenido y planificación de medios. Creamos, producimos y distribuimos contenido que genera resultados medibles para tu marca.",
  url: process.env.PUBLIC_SITE_URL || "https://www.plandemedios.com",
  logo: "/logo.png",
  ogImage: "/og-image.jpg",
  author: "Plan de Medios",
  language: "es",
  locale: "es_ES",

  contact: {
    email: process.env.PUBLIC_CONTACT_EMAIL || "info@plandemedios.com",
    phone: process.env.PUBLIC_CONTACT_PHONE || "+1234567890",
    phoneFormatted: process.env.PUBLIC_CONTACT_PHONE_FORMATTED || "+1 (234) 567-890",
    address: {
      street: process.env.PUBLIC_ADDRESS_STREET,
      city: process.env.PUBLIC_ADDRESS_CITY || "Tu Ciudad",
      country: process.env.PUBLIC_ADDRESS_COUNTRY || "País",
      full: process.env.PUBLIC_ADDRESS_FULL || "Tu Ciudad, País"
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
    timezone: "America/New_York"
  },

  legal: {
    privacyPolicyUrl: "/politica-privacidad",
    termsOfServiceUrl: "/terminos-servicio",
    companyName: "Plan de Medios LLC"
  }
};

// Export individual properties for convenience
export const { name, tagline, description, url, contact, businessHours } = siteConfig;

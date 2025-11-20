/**
 * Social Media Configuration
 * Centralized social media links and profiles
 */

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel?: string;
  username?: string;
}

export interface SocialConfig {
  links: SocialLink[];
  handles: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export const socialConfig: SocialConfig = {
  links: [
    {
      name: "LinkedIn",
      url: process.env.PUBLIC_SOCIAL_LINKEDIN || "https://www.linkedin.com/company/plandemedios",
      icon: "linkedin",
      ariaLabel: "Visitar nuestro perfil de LinkedIn",
      username: "plandemedios"
    },
    {
      name: "Facebook",
      url: process.env.PUBLIC_SOCIAL_FACEBOOK || "https://www.facebook.com/plandemedios",
      icon: "facebook",
      ariaLabel: "Visitar nuestra página de Facebook",
      username: "plandemedios"
    },
    {
      name: "Instagram",
      url: process.env.PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/plandemedios",
      icon: "instagram",
      ariaLabel: "Visitar nuestro perfil de Instagram",
      username: "@plandemedios"
    },
    {
      name: "Twitter",
      url: process.env.PUBLIC_SOCIAL_TWITTER || "https://twitter.com/plandemedios",
      icon: "twitter",
      ariaLabel: "Visitar nuestro perfil de Twitter",
      username: "@plandemedios"
    }
  ],

  handles: {
    twitter: "@plandemedios",
    instagram: "@plandemedios",
    facebook: "plandemedios",
    linkedin: "plandemedios"
  }
};

// Export for convenience
export const socialLinks = socialConfig.links;
export const socialHandles = socialConfig.handles;

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
      url: process.env.PUBLIC_SOCIAL_LINKEDIN || "https://www.linkedin.com/company/tour-innovaci%C3%B3n/",
      icon: "linkedin",
      ariaLabel: "Visitar nuestro perfil de LinkedIn de Tour Innovación",
      username: "tour-innovacion"
    },
    {
      name: "Instagram",
      url: process.env.PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/tour_innovacion",
      icon: "instagram",
      ariaLabel: "Visitar nuestro perfil de Instagram @tour_innovacion",
      username: "@tour_innovacion"
    },
    {
      name: "TikTok",
      url: process.env.PUBLIC_SOCIAL_TIKTOK || "https://www.tiktok.com/@tour_innovacion",
      icon: "tiktok",
      ariaLabel: "Visitar nuestro perfil de TikTok @tour_innovacion",
      username: "@tour_innovacion"
    }
  ],

  handles: {
    instagram: "@tour_innovacion",
    linkedin: "tour-innovacion"
  }
};

// Export for convenience
export const socialLinks = socialConfig.links;
export const socialHandles = socialConfig.handles;

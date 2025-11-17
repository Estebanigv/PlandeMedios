// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.plandemedios.com',

  // Output mode configuration
  // For static hosting (Netlify, Vercel, etc.) without adapter: use 'static' + Formspree/EmailJS
  // For server-side rendering with Resend: set to 'server' and install an adapter
  // See CONTACT-FORM-SETUP.md for deployment options
  output: 'static',

  // Image optimization configuration
  image: {
    // Default image format (webp is modern and efficient)
    format: ['webp', 'avif'],
    // Image quality (80 is a good balance between quality and file size)
    quality: 80,
    // Enable remote image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },

  integrations: [
    tailwind(),
    sitemap({
      // Customize sitemap configuration
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),

      // Filter out any pages you don't want in the sitemap
      filter: (page) => !page.includes('/admin') && !page.includes('/draft'),

      // Custom entries for dynamic routes
      customPages: [
        // Add any custom pages or routes here if needed
      ],

      // Generate separate sitemaps for different content types
      serialize(item) {
        // Home page gets highest priority
        if (item.url === 'https://www.plandemedios.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }

        // Blog posts get medium priority
        if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }

        // Service pages get high priority
        if (item.url.includes('/servicios/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        }

        return item;
      }
    })
  ],

  // Build optimizations
  build: {
    // Inline small assets to reduce HTTP requests
    inlineStylesheets: 'auto',
    // Enable asset splitting for better caching
    assetsPrefix: undefined,
  },

  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minify output
      minify: 'esbuild',
      // Optimize chunks
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  },

  // Compression
  compressHTML: true,
});
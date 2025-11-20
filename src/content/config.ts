import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Plan de Medios'),
    image: z.string().optional(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    icon: z.string(),
    color: z.enum(['primary', 'secondary', 'accent']),
    features: z.array(z.string()),
    order: z.number(),
    image: z.string().optional(),
    cta: z.object({
      text: z.string(),
      url: z.string(),
    }).optional(),
  }),
});

export const collections = {
  blog,
  services,
};

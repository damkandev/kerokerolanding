import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    authorImage: z.string().optional(),
    collaborators: z.array(z.object({
      name: z.string(),
      image: z.string().optional(),
      url: z.string().optional(),
    })).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };

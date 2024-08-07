
import { z } from 'astro:content';

export const businessSchema = z.object({
    title: z.string(),
    description: z.string(),
    preview: z.string(),
    // Transform string to Date object
    type: z.string(),
    heroImage: z.string(),
    longitude: z.number().nullable(),
    latitude: z.number().nullable(),
    additionalImages: z.array(z.string()),
})
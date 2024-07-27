
import { z } from 'astro:content';

export const placeSchema = z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    type: z.string(),
    heroImage: z.string(),
    longitude: z.number().nullable(),
    latitude: z.number().nullable(),
})

import { z } from 'astro:content';

export const businessCategorySchema = z.object({
    name: z.string(),
});
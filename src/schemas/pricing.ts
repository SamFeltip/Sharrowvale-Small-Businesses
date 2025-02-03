import { z } from "astro:schema";

export const pricingSchema = () =>
    z.object({
        name: z.string(),
        description: z.string().optional(),
        priceSterling: z.number(),
        frequency: z.string(),
    });

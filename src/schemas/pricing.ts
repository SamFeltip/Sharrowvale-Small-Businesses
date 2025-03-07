import { z } from "astro:schema";

export const pricingSchema = () =>
    z.object({
        name: z.string(),
        href: z.string(),
        description: z.string().optional(),
        callToAction: z.string().optional(),
        priceSterling: z.number(),
        frequency: z.string(),
    });

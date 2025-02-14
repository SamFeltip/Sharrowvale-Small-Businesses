import { z } from "astro:schema";

export const contactSchema = () =>
    z.object({
        description: z.string(),
        value: z.union([z.number(), z.string()]),
        href: z.string(),
    });

import { z } from "astro:content";

export const faqSchema = () =>
    z.object({
        preview: z.string(),
    });

import { reference, z } from "astro:content";

export const promotionSchema = z.object({
    title: z.string(),
    body: z.string(),
    location: z.string().optional(),
    image: z.string(),
    business: z.string(reference("businesses")).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});
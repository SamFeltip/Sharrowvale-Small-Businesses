import { reference, z } from "astro:content";

export const promotionSchema = z.object({
    title: z.string(),
    body: z.string(),
    location: z.string().optional(),
    textPosition: z.enum([
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "center",
    ]),
    image: z.string(),
    background: z.string(),
    business: z.string(reference("businesses")).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    href: z.string().optional(),
});

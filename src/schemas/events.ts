import { reference, z, type ImageFunction } from "astro:content";

export const eventSchema = ({ image }: { image: ImageFunction }) =>
    z.object({
        name: z.string(),
        author: z.string().optional(),
        description: z.string(),
        preview: z.string().optional(),

        heroImage: image(),
        bannerImage: image(),

        dateTimes: z.array(z.string().datetime()),

        publishDate: z.date(),

        tags: z.array(reference("tags")),
        categories: z.array(reference("categories")),

        promotedBusiness: reference("businesses").optional(),

        websiteLink: z.string().url().optional(),
    });

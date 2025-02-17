import { reference, z, type ImageFunction } from "astro:content";

export const articleSchema = ({ image }: { image: ImageFunction }) =>
    z.object({
        name: z.string(),
        author: z.string().optional(),
        description: z.string(),
        preview: z.string().optional(),

        heroImage: image(),
        bannerImage: image(),

        dateTime: z.string().datetime().optional(),
        publishDate: z.string().date(),

        tags: z.array(reference("tags")),
        categories: z.array(reference("categories")),

        promotedBusiness: reference("businesses").optional(),

        websiteLink: z.string().url().optional(),
    });


import { reference, z, type ImageFunction } from 'astro:content';

export const articleSchema =  ({image}: { image: ImageFunction }) => z.object({
    name: z.string(),
    author: z.string().optional(),

    heroImage: image(),
    bannerImage: image(),

    dateTime: z.string().datetime().optional(),

    categories: z.array(reference("category")),
    articleCategories: z.array(reference("articleCategory")),  

    websiteLink: z.string().url().nullable(),
});
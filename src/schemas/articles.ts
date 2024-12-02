
import { reference, z, type ImageFunction } from 'astro:content';

export const articleSchema =  ({image}: { image: ImageFunction }) => z.object({
    name: z.string(),
    author: z.string().optional(),

    heroImage: image(),
    bannerImage: image(),

    dateTime: z.string().datetime().optional(),
    publishDate: z.string().date().optional(),

    tags: z.array(reference("tags")),
    articleCategories: z.array(reference("articleCategory")),  

    websiteLink: z.string().url().nullable(),
});
import { reference, z, type ImageFunction } from 'astro:content';
import { boolean } from 'astro:schema';

export const categorySchema = ({image}: { image: ImageFunction }) => z.object({
	name: z.string(),
	description: z.string(),
    relatedCategories: z.array(reference("category")),
	promotedBusinesses: z.array(reference("businesses")),
	bannerImage: image(),
	heroImage: image(),
	isPage: z.boolean().default(false),
})
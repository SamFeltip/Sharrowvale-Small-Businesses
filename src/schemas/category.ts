import { reference, z, type ImageFunction } from 'astro:content';

export const categorySchema = ({image}: { image: ImageFunction }) => z.object({
	name: z.string(),
	description: z.string().optional(),
    relatedCategories: z.array(reference("category")),
	promotedBusinesses: z.array(reference("businesses")),
	bannerImage: image(),
	heroImage: image(),
	isPage: z.boolean().default(false),
	isGridLayout: z.boolean().default(false),
})
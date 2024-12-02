import { reference, z, type ImageFunction } from 'astro:content';

export const categorySchema = ({image}: { image: ImageFunction }) => z.object({
	name: z.string(),
	description: z.string().optional(),
	promotedArticles: z.array(reference("article")).optional(),
	bannerImage: image(),
	isGridLayout: z.boolean().default(false),
	heroImage: image().optional(),
})
import { reference, z, type ImageFunction } from 'astro:content';

export const articleCategorySchema = ({image}: { image: ImageFunction }) => z.object({
	name: z.string(),
	description: z.string().optional(),
	promotedArticles: z.array(reference("article")).optional(),
	bannerImage: image(),
	heroImage: image().optional(),
})
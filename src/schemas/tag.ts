import { reference, z, type ImageFunction } from 'astro:content';

export const tagSchema = ({image}: { image: ImageFunction }) => z.object({
	name: z.string(),
	description: z.string().optional(),
    relatedTags: z.array(reference("tag")),
	promotedBusinesses: z.array(reference("businesses")),
	bannerImage: image(),
	heroImage: image(),
	isPage: z.boolean().default(false),
	isVisible: z.boolean().default(true) // used to hide tag from appearing in lists
})
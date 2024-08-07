import { defineCollection } from 'astro:content';

import { businessSchema as businessSchema } from '../schemas/businesses';

const placeCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: businessSchema,
});

export const collections = { "businesses": placeCollection };
import { defineCollection } from 'astro:content';

import { placeSchema } from '../schemas/places';

const placeCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: placeSchema,
});

export const collections = { "places": placeCollection };
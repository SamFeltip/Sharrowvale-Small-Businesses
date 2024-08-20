import { defineCollection } from 'astro:content';

import { businessSchema as businessSchema } from '../schemas/businesses';

import { businessCategorySchema as businessCategorySchema } from '../schemas/businessCategory';

const businesses = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: businessSchema,
});

const businessCatCollection = defineCollection({
	type: 'data',
	// Type-check frontmatter using a schema
	schema: businessCategorySchema,
});

export const collections = { "businesses": businesses, "business-category": businessCatCollection };
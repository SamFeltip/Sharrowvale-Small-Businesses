import { defineCollection, reference, z } from 'astro:content';

import { businessSchema } from '@/schemas/businesses';

import { categorySchema } from '@/schemas/category';
import { promotionSchema as promotionSchema } from '@/schemas/promotion';

const businesses = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: businessSchema,
});

const catCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: categorySchema,
});

const promotionCollection = defineCollection({
	type: 'data',
	schema: promotionSchema,
});

export const collections = {
	"businesses": businesses,
	"category": catCollection,
	"promotion": promotionCollection
};
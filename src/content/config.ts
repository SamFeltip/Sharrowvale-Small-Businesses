import { defineCollection } from 'astro:content';

import { businessSchema as businessSchema } from '@/schemas/businesses';

import { businessCategorySchema as businessCategorySchema } from '@/schemas/businessCategory';
import { promotionSchema as promotionSchema } from '@/schemas/promotion';

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

const promotionCollection = defineCollection({
	type: 'data',
	schema: promotionSchema,
});

export const collections = {
	"businesses": businesses,
	"business-category": businessCatCollection,
	"promotion": promotionCollection
};
import { defineCollection, reference, z } from 'astro:content';

import { businessSchema } from '@/schemas/businesses';
import { articleSchema } from '@/schemas/articles';
import { tagSchema } from '@/schemas/tag';
import { articleCategorySchema } from '@/schemas/articleCategory';
import { promotionSchema } from '@/schemas/promotion';

const businesses = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: businessSchema,
});

const articles = defineCollection({
	type: 'content',
	schema: articleSchema,
});

const articleCategories = defineCollection({
	type: 'content',
	schema: articleCategorySchema,
});

const tagCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: tagSchema,
});

const promotionCollection = defineCollection({
	type: 'data',
	schema: promotionSchema,
});

export const collections = {
	"businesses": businesses,
	"tags": tagCollection,
	"promotion": promotionCollection,
	"articles": articles,
	"articleCategories": articleCategories,
};
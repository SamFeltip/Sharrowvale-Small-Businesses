import { defineCollection, reference, z } from 'astro:content';

import { businessSchema } from '@/schemas/businesses';
import { articleSchema } from '@/schemas/articles';
import { categorySchema } from '@/schemas/category';
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
	"promotion": promotionCollection,
	"articles": articles,
	"articleCategories": articleCategories,
};
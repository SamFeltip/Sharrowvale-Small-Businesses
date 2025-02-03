import { defineCollection, reference, z } from "astro:content";

import { businessSchema } from "@/schemas/businesses";
import { articleSchema } from "@/schemas/articles";
import { tagSchema } from "@/schemas/tag";
import { categorySchema } from "@/schemas/category";
import { glob } from "astro/loaders";

const businessCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./businesses",
    }),

    schema: businessSchema,
});

const articleCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./articles",
    }),

    schema: articleSchema,
});

const categoryCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./categories",
    }),

    schema: categorySchema,
});

const tagCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./tags",
    }),

    // Type-check frontmatter using a schema
    schema: tagSchema,
});

export const collections = {
    businesses: businessCollection,
    tags: tagCollection,
    articles: articleCollection,
    categories: categoryCollection,
};
